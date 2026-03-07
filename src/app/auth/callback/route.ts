import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // If an explicit redirect was provided, use it
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      // Check if this user has already paid
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("has_paid")
          .eq("id", user.id)
          .single();

        if (profile?.has_paid) {
          // Existing paid user → go straight to assessment
          return NextResponse.redirect(`${origin}/assessment`);
        }
      }

      // New user or unpaid user → payment page
      return NextResponse.redirect(`${origin}/payment`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
