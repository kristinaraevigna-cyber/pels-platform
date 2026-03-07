"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // The browser client automatically detects the code/tokens in the URL
    // and exchanges them for a session. We listen for the auth state change
    // and then redirect based on the user's payment status.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Check payment status and redirect
        const { data: profile } = await supabase
          .from("profiles")
          .select("has_paid")
          .eq("id", session.user.id)
          .single();

        if (profile?.has_paid) {
          router.replace("/assessment");
        } else {
          router.replace("/payment");
        }
      }
    });

    // Timeout fallback — if no session is established after 10s, redirect to login
    const timeout = setTimeout(() => {
      setError(true);
      setTimeout(() => router.replace("/login"), 3000);
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', system-ui, sans-serif",
          color: "#8B6F5E",
        }}
      >
        <p>Authentication failed. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#8B6F5E",
      }}
    >
      <p>Completing sign-in...</p>
    </div>
  );
}
