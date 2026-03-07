import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

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

  // Use service role to read and update access_codes
  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check if code exists and is active and unused
  const { data: accessCode, error: fetchError } = await serviceClient
    .from("access_codes")
    .select("*")
    .eq("code", code)
    .eq("is_active", true)
    .is("used_by", null)
    .single();

  if (fetchError || !accessCode) {
    return NextResponse.json(
      { error: "Invalid or already used code" },
      { status: 400 }
    );
  }

  // Mark code as used
  await serviceClient
    .from("access_codes")
    .update({ used_by: user.id, used_at: new Date().toISOString() })
    .eq("id", accessCode.id);

  // Grant access to user
  await serviceClient
    .from("profiles")
    .update({ has_paid: true, access_code_used: code })
    .eq("id", user.id);

  return NextResponse.json({ success: true });
}
