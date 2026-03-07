"use client";

import { useState } from "react";

const sans = "'Inter', system-ui, -apple-system, sans-serif";

interface NavbarProps {
  variant?: "transparent" | "fixed";
}

export default function Navbar({ variant = "fixed" }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: variant === "transparent" ? "absolute" : "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background:
            variant === "transparent"
              ? "transparent"
              : "rgba(28,20,16,0.6)",
          backdropFilter: variant === "fixed" ? "blur(12px)" : undefined,
        }}
      >
        {/* Logo / brand — hidden on desktop to preserve right-aligned look */}
        <a
          href="/"
          className="nav-brand"
          style={{
            fontFamily: sans,
            color: "#C4956A",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          PELS
        </a>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {navLinks.map(({ label, href }) => (
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
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#C4956A";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {label}
            </a>
          ))}
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
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            minWidth: 44,
            minHeight: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C4956A"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="nav-mobile-menu"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 49,
          background: "rgba(28,20,16,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              fontFamily: sans,
              color: "rgba(255,255,255,0.8)",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ))}
        <a
          href="/signup"
          onClick={() => setOpen(false)}
          style={{
            fontFamily: sans,
            background: "#C4956A",
            color: "#1C1410",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "14px 40px",
            borderRadius: 100,
            marginTop: 8,
          }}
        >
          Begin Assessment
        </a>
      </div>
    </>
  );
}
