"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mbdzjvrw", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: sans,
    border: "1px solid #E8E0D8",
    borderRadius: 12,
    outline: "none",
    transition: "border-color 0.2s ease",
    color: "#1C1410",
    background: "#FFFFFF",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: sans,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#8B6F5E",
    marginBottom: 8,
  };

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── NAVBAR ─── */}
      <Navbar variant="fixed" />

      {/* ─── HERO BANNER ─── */}
      <section
        className="section-padding"
        style={{
          background: "linear-gradient(165deg, #1C1410 0%, #2C2420 40%, #1C1410 100%)",
          minHeight: 360,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 600 }}>
          <p
            style={{
              fontFamily: sans,
              color: "#C4956A",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontFamily: serif,
              color: "#FFFFFF",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Get in <span style={{ fontStyle: "italic", color: "#C4956A" }}>Touch</span>
          </h1>
        </div>
      </section>

      {/* ─── CONTACT FORM / SUCCESS ─── */}
      <section className="section-padding" style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
        <div
          className="contact-form-card"
          style={{
            maxWidth: 560,
            margin: "0 auto",
            background: "#FFFFFF",
            borderRadius: 24,
            padding: 48,
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            border: "1px solid #E8E0D8",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              {/* Gold checkmark */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(196,149,106,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4956A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 17l7 7L26 8" />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: serif,
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#1C1410",
                  marginBottom: 12,
                }}
              >
                Thank you!
              </h2>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 300,
                  color: "#888",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We&apos;ll be in touch within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E8E0D8"; }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E8E0D8"; }}
                />
              </div>

              {/* Subject */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Subject</label>
                <select
                  name="subject"
                  required
                  style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E8E0D8"; }}
                >
                  <option value="">Select a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Research Collaboration">Research Collaboration</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Media">Media</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help?"
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E8E0D8"; }}
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  style={{
                    fontFamily: sans,
                    fontSize: 14,
                    color: "#B91C1C",
                    backgroundColor: "#FEF2F2",
                    padding: "12px 16px",
                    borderRadius: 12,
                    marginBottom: 20,
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  fontFamily: sans,
                  background: submitting ? "#D4BFA8" : "#C4956A",
                  color: "#1C1410",
                  border: "none",
                  padding: "16px 32px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderRadius: 100,
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = "#D4A57A";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(196,149,106,0.3)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = "#C4956A";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Below-form info */}
        {!submitted && (
          <div style={{ maxWidth: 560, margin: "32px auto 0", textAlign: "center" }}>
            <p style={{ fontFamily: sans, fontSize: 15, color: "#666", marginBottom: 8 }}>
              Or email us directly at{" "}
              <a
                href="mailto:contact@pels-assessment.com"
                style={{ color: "#C4956A", textDecoration: "none", fontWeight: 600 }}
              >
                contact@pels-assessment.com
              </a>
            </p>
            <p style={{ fontFamily: sans, fontSize: 13, color: "#999", margin: 0 }}>
              We typically respond within 2 business days.
            </p>
          </div>
        )}
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          backgroundColor: "#1C1410",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: sans,
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 4,
          }}
        >
          &copy; {new Date().getFullYear()} Positively Energizing Leadership Scale
        </p>
      </footer>
    </div>
  );
}
