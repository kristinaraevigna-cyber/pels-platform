"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E8E0D8",
  borderRadius: "12px",
  padding: "14px 16px",
  fontSize: "15px",
  fontFamily: sans,
  backgroundColor: "#FFFFFF",
  color: "#1C1410",
  outline: "none",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: sans,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#8B6F5E",
  marginBottom: "8px",
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/assessment";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://pels-platform.onrender.com/auth/callback",
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "28px",
            fontWeight: 400,
            color: "#1C1410",
            marginBottom: "8px",
          }}
        >
          Welcome Back
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: "14px",
            fontWeight: 300,
            color: "#999",
          }}
        >
          Sign in to access your assessment
        </p>
      </div>

      {/* Google Sign-In */}
      <button
        onClick={handleGoogleSignIn}
        type="button"
        style={{
          width: "100%",
          padding: "14px 16px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8E0D8",
          borderRadius: "100px",
          fontSize: "15px",
          fontFamily: sans,
          fontWeight: 500,
          color: "#333",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#F9F7F5";
          e.currentTarget.style.borderColor = "#C4956A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#FFFFFF";
          e.currentTarget.style.borderColor = "#E8E0D8";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          margin: "24px 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E0D8" }} />
        <span
          style={{
            fontFamily: sans,
            fontSize: "12px",
            color: "#BBB",
            textTransform: "lowercase",
          }}
        >
          or
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E0D8" }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C4956A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D8")}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C4956A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D8")}
          />
        </div>

        {error && (
          <div
            style={{
              fontFamily: sans,
              fontSize: "14px",
              color: "#B91C1C",
              backgroundColor: "#FEF2F2",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: loading ? "#C4B5A8" : "#8B6F5E",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "100px",
            fontSize: "16px",
            fontFamily: sans,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "#7A6050";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "#8B6F5E";
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer link */}
      <p
        style={{
          textAlign: "center",
          marginTop: "24px",
          fontFamily: sans,
          fontSize: "14px",
          color: "#999",
        }}
      >
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          style={{
            color: "#C4956A",
            fontWeight: 600,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Sign up
        </a>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
