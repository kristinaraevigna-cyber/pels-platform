"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!signUpData.user) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // If promo code was entered, validate it
    if (promoCode.trim()) {
      const res = await fetch("/api/access-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim() }),
      });

      if (res.ok) {
        router.push("/assessment");
        router.refresh();
        return;
      }

      const data = await res.json();
      setError(data.error || "Invalid promo code. You can still pay to access.");
      setLoading(false);
      return;
    }

    // No promo code — redirect to payment
    router.push("/payment");
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
          Create Your Account
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: "14px",
            fontWeight: 300,
            color: "#999",
          }}
        >
          Join to discover your leadership energy profile
        </p>
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

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="At least 6 characters"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C4956A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D8")}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>
            Access Code{" "}
            <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: "normal", color: "#BBB" }}>
              (optional)
            </span>
          </label>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="e.g. PELS-XXXX"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C4956A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E8E0D8")}
          />
          <p
            style={{
              fontFamily: sans,
              fontSize: "12px",
              fontWeight: 300,
              color: "#AAA",
              marginTop: "6px",
              lineHeight: 1.5,
            }}
          >
            Have an academic access code? Enter it here for complimentary access.
          </p>
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
          {loading ? "Creating account..." : "Sign Up"}
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
        Already have an account?{" "}
        <a
          href="/login"
          style={{
            color: "#C4956A",
            fontWeight: 600,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          Sign in
        </a>
      </p>
    </>
  );
}
