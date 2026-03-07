import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { headers } from "next/headers";

const MAX_ATTEMPTS_PER_HOUR = 5;
const BLOCK_DURATION_HOURS = 24;
const FAILURE_DELAY_MS = 500;

/** SHA-256 hash a code (normalized to uppercase, trimmed) */
function hashCode(code: string): string {
  return crypto
    .createHash("sha256")
    .update(code.trim().toUpperCase())
    .digest("hex");
}

/** Delay helper */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Get client IP from request headers */
function getClientIP(): string {
  const headerList = headers();
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  // Get current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const ip = getClientIP();
  const codeHash = hashCode(code);

  // --- Rate limiting ---
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();

  const { count: recentAttempts } = await serviceClient
    .from("access_code_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", oneHourAgo);

  if ((recentAttempts ?? 0) >= MAX_ATTEMPTS_PER_HOUR) {
    // Check if blocked (too many failures in the last 24 hours)
    await logAttempt(serviceClient, ip, codeHash, false, user.id);
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  // --- Look up code by hash ---
  const { data: accessCode, error: fetchError } = await serviceClient
    .from("access_codes")
    .select("*")
    .eq("code_hash", codeHash)
    .eq("is_active", true)
    .is("used_by", null)
    .single();

  if (fetchError || !accessCode) {
    // Log failed attempt
    await logAttempt(serviceClient, ip, codeHash, false, user.id);
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { error: "Invalid or already used access code." },
      { status: 400 }
    );
  }

  // --- Check expiry ---
  if (accessCode.expires_at && new Date(accessCode.expires_at) < new Date()) {
    await logAttempt(serviceClient, ip, codeHash, false, user.id);
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { error: "Invalid or already used access code." },
      { status: 400 }
    );
  }

  // --- Valid code: mark as used ---
  await serviceClient
    .from("access_codes")
    .update({
      used_by: user.id,
      used_at: new Date().toISOString(),
      attempt_count: (accessCode.attempt_count || 0) + 1,
    })
    .eq("id", accessCode.id);

  // Grant access to user
  await serviceClient
    .from("profiles")
    .update({ has_paid: true, has_promo_access: true })
    .eq("id", user.id);

  // Log successful attempt
  await logAttempt(serviceClient, ip, codeHash, true, user.id);

  return NextResponse.json({ success: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logAttempt(
  client: any,
  ip: string,
  codeHash: string,
  success: boolean,
  userId: string
) {
  await client.from("access_code_attempts").insert({
    ip_address: ip,
    attempted_code_hash: codeHash,
    success,
    user_id: userId,
  });
}
