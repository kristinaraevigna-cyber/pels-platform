import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/** Generate a cryptographically random code in PELS-XXXX-XXXX-XXXX format */
function generateCode(): string {
  const bytes = crypto.randomBytes(6); // 6 bytes = 12 hex chars
  const hex = bytes.toString("hex").toUpperCase();
  return `PELS-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`;
}

/** SHA-256 hash a code (normalized to uppercase, trimmed) */
function hashCode(code: string): string {
  return crypto
    .createHash("sha256")
    .update(code.trim().toUpperCase())
    .digest("hex");
}

export async function POST(request: Request) {
  const {
    password,
    count = 1,
    prefix: _prefix,
    cohortLabel = "",
    expiresInDays,
  } = await request.json();

  // Verify admin password
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (count === 0) {
    // Just a password verification request
    return NextResponse.json({ codes: [] });
  }

  const supabase = createServiceClient();
  const plaintextCodes: string[] = [];
  const rows: {
    code_hash: string;
    created_by: string;
    cohort_label: string | null;
    expires_at: string | null;
  }[] = [];

  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 86400000).toISOString()
    : null;

  for (let i = 0; i < Math.min(count, 100); i++) {
    const code = generateCode();
    plaintextCodes.push(code);
    rows.push({
      code_hash: hashCode(code),
      created_by: "admin",
      cohort_label: cohortLabel || null,
      expires_at: expiresAt,
    });
  }

  const { error } = await supabase.from("access_codes").insert(rows);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return plaintext codes to the admin (this is the ONLY time they are visible)
  return NextResponse.json({
    codes: plaintextCodes,
    cohortLabel: cohortLabel || null,
    expiresAt,
  });
}
