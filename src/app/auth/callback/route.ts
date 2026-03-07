import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("[auth/callback] No code parameter in URL");
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] Code exchange failed:", error.message, error);
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  console.log("[auth/callback] Session established for user:", data.session?.user?.id);

  // Check payment status
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("has_paid")
    .eq("id", data.session.user.id)
    .single();

  if (profileError) {
    console.error("[auth/callback] Profile lookup failed:", profileError.message);
    // User is authenticated but profile lookup failed — send to payment as safe default
    return NextResponse.redirect(`${origin}/payment`);
  }

  if (profile?.has_paid) {
    return NextResponse.redirect(`${origin}/assessment`);
  }

  return NextResponse.redirect(`${origin}/payment`);
}
