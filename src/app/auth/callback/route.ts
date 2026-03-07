import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(
        new URL("/login?error=auth_callback_failed", requestUrl.origin)
      );
    }

    if (data.user) {
      // Check if user has paid
      const { data: profile } = await supabase
        .from("profiles")
        .select("has_paid, has_promo_access")
        .eq("id", data.user.id)
        .single();

      if (profile?.has_paid || profile?.has_promo_access) {
        return NextResponse.redirect(
          new URL("/assessment", requestUrl.origin)
        );
      } else {
        return NextResponse.redirect(
          new URL("/access-code", requestUrl.origin)
        );
      }
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=auth_callback_failed", requestUrl.origin)
  );
}
