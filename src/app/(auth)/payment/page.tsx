"use client";

import { useState } from "react";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to start checkout");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const benefits = [
    "Complete 18-item validated PELS assessment",
    "29-item PERMA+4 well-being profile",
    "Personalized score and attribute profile",
    "Evidence-based intervention recommendations",
    "Downloadable PDF report",
  ];

  return (
    <>
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
          Access the Assessment
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
          Complete your one-time payment to unlock the full PELS assessment
          and receive your personalized leadership report.
        </p>
      </div>

      {/* Price + benefits card */}
      <div
        style={{
          backgroundColor: "#F7F3EE",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "1px solid #EDE5D8",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: sans,
              fontSize: "15px",
              fontWeight: 600,
              color: "#1C1410",
            }}
          >
            PELS Assessment + Report
          </span>
          <span
            style={{
              fontFamily: serif,
              fontSize: "32px",
              fontWeight: 400,
              color: "#8B6F5E",
              letterSpacing: "-0.02em",
            }}
          >
            $29
          </span>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "#E8E0D8",
            marginBottom: "16px",
          }}
        />

        <p
          style={{
            fontFamily: sans,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#8B6F5E",
            marginBottom: "12px",
          }}
        >
          What&apos;s Included
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {benefits.map((benefit) => (
            <li
              key={benefit}
              style={{
                fontFamily: sans,
                fontSize: "14px",
                fontWeight: 400,
                color: "#555",
                lineHeight: 1.5,
                padding: "6px 0",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <span style={{ color: "#8B6F5E", fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>
                &#10003;
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        <p
          style={{
            fontFamily: sans,
            fontSize: "12px",
            fontWeight: 300,
            color: "#AAA",
            marginTop: "12px",
          }}
        >
          One-time payment &middot; Lifetime access
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
        onClick={handleCheckout}
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
        {loading ? "Redirecting to checkout..." : "Proceed to Payment \u2192"}
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "16px",
          fontFamily: sans,
          fontSize: "12px",
          color: "#BBB",
        }}
      >
        Secure payment powered by Stripe
      </p>
    </>
  );
}
