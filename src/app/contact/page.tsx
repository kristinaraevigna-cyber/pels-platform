"use client";

import { FormEvent } from "react";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function ContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:contact@pels-assessment.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: sans,
    border: "1px solid #EDE5D8",
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
    fontSize: 12,
    fontWeight: 600,
    color: "#1C1410",
    marginBottom: 8,
    letterSpacing: "0.05em",
  };

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── NAVBAR ─── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "16px 32px",
          gap: 24,
          background: "rgba(28,20,16,0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        {["Home", "About", "Contact"].map((label) => {
          const href = label === "Home" ? "/" : `/${label.toLowerCase()}`;
          return (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: sans,
                color: "rgba(255,255,255,0.7)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#C4956A"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              {label}
            </a>
          );
        })}
        <a
          href="/signup"
          style={{
            fontFamily: sans,
            background: "#C4956A",
            color: "#1C1410",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "8px 20px",
            borderRadius: 100,
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#D4A57A";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#C4956A";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Begin Assessment
        </a>
      </nav>

      {/* ─── HERO BANNER ─── */}
      <section
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

      {/* ─── CONTACT FORM ─── */}
      <section style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            background: "#FFFFFF",
            borderRadius: 24,
            padding: "48px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            border: "1px solid #EDE5D8",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#EDE5D8"; }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#EDE5D8"; }}
              />
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Subject</label>
              <select
                name="subject"
                required
                style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#EDE5D8"; }}
              >
                <option value="">Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Research Collaboration">Research Collaboration</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Media">Media</option>
              </select>
            </div>

            {/* Message */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="How can we help?"
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#C4956A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#EDE5D8"; }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                fontFamily: sans,
                background: "#C4956A",
                color: "#1C1410",
                border: "none",
                padding: "16px 32px",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.08em",
                borderRadius: 100,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#D4A57A";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(196,149,106,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#C4956A";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Below-form info */}
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
