import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SITE_URL = "https://pels-platform.onrender.com";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set(name, value);
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set(name, value, options);
        },
        remove(name: string, options: any) {
          request.cookies.set(name, "");
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set(name, "", options);
        },
      },
    }
  );

  // Refresh the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /assessment and /results — redirect to login if not authenticated
  if (
    !user &&
    (pathname.startsWith("/assessment") || pathname.startsWith("/results"))
  ) {
    return NextResponse.redirect(new URL(`/login?redirectTo=${pathname}`, SITE_URL));
  }

  // If logged-in user visits /login or /signup, redirect to /assessment
  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/assessment", SITE_URL));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
