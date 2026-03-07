"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  textAlign: "center",
  letterSpacing: "0.1em",
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

export default function AccessCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/access-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/assessment");
          router.refresh();
        }, 1500);
      } else {
        const data = await res.json();
        setError(
          data.error || "Invalid or expired code. Please try again or continue to payment."
        );
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
          Do You Have an Access Code?
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: "14px",
            fontWeight: 300,
            color: "#999",
            lineHeight: 1.6,
          }}
        >
          If you have an academic or institutional access code,
          enter it below for complimentary access.
        </p>
      </div>

      {/* Success state */}
      {success ? (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 17l7 7L26 8" />
            </svg>
          </div>
          <p
            style={{
              fontFamily: sans,
              fontSize: "16px",
              fontWeight: 600,
              color: "#22C55E",
              marginBottom: "8px",
            }}
          >
            Access granted!
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: "13px",
              fontWeight: 300,
              color: "#999",
            }}
          >
            Redirecting to your assessment...
          </p>
        </div>
      ) : (
        <>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Access Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. PELS-XXXX"
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
              disabled={loading || !code.trim()}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor:
                  loading || !code.trim() ? "#D4BFA8" : "#C4956A",
                color: "#1C1410",
                border: "none",
                borderRadius: "100px",
                fontSize: "16px",
                fontFamily: sans,
                fontWeight: 500,
                cursor: loading || !code.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading && code.trim())
                  e.currentTarget.style.backgroundColor = "#D4A57A";
              }}
              onMouseLeave={(e) => {
                if (!loading && code.trim())
                  e.currentTarget.style.backgroundColor = "#C4956A";
              }}
            >
              {loading ? "Validating..." : "Apply Code"}
            </button>
          </form>

          {/* Skip to payment */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p
              style={{
                fontFamily: sans,
                fontSize: "14px",
                color: "#999",
                marginBottom: "4px",
              }}
            >
              Don&apos;t have a code?
            </p>
            <a
              href="/payment"
              style={{
                fontFamily: sans,
                fontSize: "15px",
                color: "#C4956A",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Continue to Payment &rarr;
            </a>
          </div>
        </>
      )}
    </>
  );
}
