import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const { password, count = 1, prefix = "PELS" } = await request.json();

  // Verify admin password
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (count === 0) {
    // Just a password verification request
    return NextResponse.json({ codes: [] });
  }

  const supabase = createServiceClient();
  const codes: string[] = [];

  for (let i = 0; i < Math.min(count, 100); i++) {
    const random = crypto.randomBytes(4).toString("hex").toUpperCase();
    codes.push(`${prefix}-${random}`);
  }

  const { data, error } = await supabase
    .from("access_codes")
    .insert(codes.map((code) => ({ code, created_by: "admin" })))
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ codes: data });
}
