"use client";

import Image from "next/image";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'Inter', system-ui, -apple-system, sans-serif";

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ─── SECTION 1: HERO ─── */}
      <section
        style={{
          background: "linear-gradient(165deg, #1C1410 0%, #2C2420 40%, #1C1410 100%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top navbar with logo */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            padding: "24px 32px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontFamily: serif,
                fontSize: "20px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#C4956A",
                letterSpacing: "-0.01em",
              }}
            >
              Positively Energizing
            </span>
            <span
              style={{
                fontFamily: sans,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              LEADERSHIP
            </span>
          </div>
        </nav>

        {/* Hero content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px 80px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              marginBottom: "40px",
              padding: "8px 24px",
              borderRadius: "100px",
              border: "1px solid rgba(196,149,106,0.3)",
              background: "rgba(196,149,106,0.08)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C4956A",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Validated Research Instrument
            </p>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 300,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "800px",
              margin: "0 0 24px 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            The Leader Who
            <br />
            Energizes You
            <br />
            <span style={{ color: "#C4956A", fontStyle: "italic" }}>
              Changes Everything
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: sans,
              fontSize: "18px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              textAlign: "center",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 0 48px 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            Discover how your leader&rsquo;s energy shapes your well-being, engagement,
            and performance — through the first validated measure of positively
            energizing leadership.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStart}
            style={{
              fontFamily: sans,
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              padding: "18px 48px",
              backgroundColor: "#C4956A",
              color: "#1C1410",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D4A57A";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(196,149,106,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#C4956A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            BEGIN YOUR ASSESSMENT &rarr;
          </button>

          <p
            style={{
              fontFamily: sans,
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              marginTop: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Confidential &middot; 15 minutes &middot; Immediate personalized report
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0.4,
          }}
        >
          <p style={{ fontFamily: sans, fontSize: "10px", color: "#C4956A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Learn More
          </p>
          <span style={{ color: "#C4956A", fontSize: "18px" }}>&#8595;</span>
        </div>
      </section>

      {/* ─── SECTION 2: WHAT IS PEL ─── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left: Unsplash photo */}
          <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Diverse team collaborating in a meeting"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Text */}
          <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
            <p
              style={{
                fontFamily: sans,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C4956A",
                marginBottom: "16px",
              }}
            >
              What Is Positively Energizing Leadership?
            </p>
            <h2
              style={{
                fontFamily: serif,
                fontSize: "40px",
                fontWeight: 300,
                color: "#1C1410",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                marginBottom: "24px",
              }}
            >
              Leaders who create energy
              <br />
              <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>
                unlock human flourishing
              </span>
            </h2>
            <p
              style={{
                fontFamily: sans,
                fontSize: "16px",
                fontWeight: 300,
                color: "#666",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              Positively energizing leaders exhibit <strong style={{ fontWeight: 500, color: "#1C1410" }}>virtuous behaviors</strong> —
              compassion, integrity, forgiveness, and gratitude — while fostering{" "}
              <strong style={{ fontWeight: 500, color: "#1C1410" }}>relational energy</strong> that
              revitalizes the people around them.
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: "16px",
                fontWeight: 300,
                color: "#666",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              Research in Positive Organizational Scholarship shows this is the
              <strong style={{ fontWeight: 500, color: "#1C1410" }}> heliotropic effect</strong> —
              just as living systems lean toward light, people flourish when led by
              those who generate positive energy.
            </p>

            {/* Two pillars */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{
                  flex: "1 1 200px",
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: "#F7F3EE",
                  border: "1px solid #EDE5D8",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: "13px", fontWeight: 600, color: "#8B6F5E", marginBottom: "6px" }}>
                  Relational Energy
                </p>
                <p style={{ fontFamily: sans, fontSize: "13px", fontWeight: 300, color: "#888", lineHeight: 1.6 }}>
                  The vitality and uplift people feel from interacting with their leader
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 200px",
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: "#F7F3EE",
                  border: "1px solid #EDE5D8",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: "13px", fontWeight: 600, color: "#8B6F5E", marginBottom: "6px" }}>
                  Virtuous Behavior
                </p>
                <p style={{ fontFamily: sans, fontSize: "13px", fontWeight: 300, color: "#888", lineHeight: 1.6 }}>
                  Compassion, integrity, forgiveness, and gratitude in action
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHY IT MATTERS ─── */}
      <section
        style={{
          background: "linear-gradient(165deg, #1C1410 0%, #2C2420 100%)",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C4956A",
              marginBottom: "16px",
            }}
          >
            Why It Matters
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "44px",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            The research is{" "}
            <span style={{ fontStyle: "italic", color: "#C4956A" }}>clear</span>
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 64px",
            }}
          >
            Positively energizing leadership is one of the strongest predictors of
            employee well-being and engagement ever documented.
          </p>

          {/* Plain language cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: "✦",
                title: "Your Well-Being at Work",
                desc: "Research shows that your sense of well-being at work is largely explained by whether your leader positively energizes those around them.",
              },
              {
                icon: "◈",
                title: "Your Engagement",
                desc: "Whether you feel engaged, motivated, and energized at work is significantly shaped by your leader's capacity to generate positive relational energy.",
              },
              {
                icon: "◇",
                title: "Burnout & Exhaustion",
                desc: "Burnout is not just about workload — it is about energy. Leaders who deplete rather than generate relational energy are a primary driver of workplace exhaustion.",
              },
              {
                icon: "❋",
                title: "The Good News",
                desc: "Positively energizing leadership is not a fixed trait. It is a set of learnable, developable behaviors — and measuring it is the first step to growing it.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "36px 28px",
                  borderRadius: "20px",
                  border: "1px solid rgba(196,149,106,0.15)",
                  backgroundColor: "rgba(196,149,106,0.04)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    color: "#C4956A",
                    marginBottom: "16px",
                    lineHeight: 1,
                  }}
                >
                  {icon}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: THE RESEARCH ─── */}
      <section
        style={{
          backgroundColor: "#F7F3EE",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C4956A",
              marginBottom: "16px",
            }}
          >
            The Research
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "44px",
              fontWeight: 300,
              color: "#1C1410",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Rigorously developed.{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Empirically validated.</span>
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: "16px",
              fontWeight: 300,
              color: "#888",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto 56px",
            }}
          >
            The PELS was developed through a multi-phase validation study
            following the highest standards of psychometric instrument development.
          </p>

          {/* Research details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              marginBottom: "56px",
            }}
          >
            {[
              { value: "603", label: "Participants" },
              { value: "18", label: "Validated Items" },
              { value: "2", label: "Subdomains" },
              { value: "15 min", label: "Completion Time" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  padding: "32px 20px",
                  borderRadius: "20px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EDE5D8",
                }}
              >
                <p
                  style={{
                    fontFamily: serif,
                    fontSize: "48px",
                    fontWeight: 300,
                    color: "#8B6F5E",
                    letterSpacing: "-0.02em",
                    marginBottom: "4px",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#AAA",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Methodology note */}
          <div
            style={{
              padding: "32px 40px",
              borderRadius: "20px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #EDE5D8",
              textAlign: "left",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <p style={{ fontFamily: sans, fontSize: "13px", fontWeight: 600, color: "#8B6F5E", marginBottom: "12px" }}>
              Validation Methodology
            </p>
            <p style={{ fontFamily: sans, fontSize: "14px", fontWeight: 300, color: "#666", lineHeight: 1.7 }}>
              The PELS underwent exploratory factor analysis, confirmatory factor analysis,
              and convergent/discriminant validity testing. The 18-item scale measures two
              subdomains — <strong style={{ fontWeight: 500, color: "#1C1410" }}>Relational Energy</strong> (9 items)
              and <strong style={{ fontWeight: 500, color: "#1C1410" }}>Virtuous Behavior</strong> (9 items) —
              demonstrating excellent internal consistency and strong psychometric properties.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: HOW IT WORKS ─── */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: sans,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C4956A",
              marginBottom: "16px",
            }}
          >
            How It Works
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "44px",
              fontWeight: 300,
              color: "#1C1410",
              lineHeight: 1.15,
              marginBottom: "56px",
            }}
          >
            Four steps to{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>your personalized report</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            {[
              {
                step: "01",
                title: "Your Background",
                desc: "A brief intake about your role, organization, and the leader you'll be evaluating",
                svg: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="20" height="24" rx="3" />
                    <circle cx="16" cy="13" r="4" />
                    <path d="M10 24c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Leader Narratives",
                desc: "Share two short stories that capture how your leader energizes (or de-energizes) those around them",
                svg: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 27V7a2 2 0 012-2h8l2 2h2a2 2 0 012 2v3" />
                    <path d="M5 27a2 2 0 002 2h6" />
                    <path d="M16 15v14l4-3 4 3V15" />
                    <path d="M16 15h8a2 2 0 012 2v0" />
                    <path d="M16 15a2 2 0 00-2-2H5" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "The PELS Scale",
                desc: "Rate your leader on 18 validated items across relational energy and virtuous behavior",
                svg: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="22" width="4" height="6" rx="1" />
                    <rect x="14" y="16" width="4" height="12" rx="1" />
                    <rect x="22" y="10" width="4" height="18" rx="1" />
                    <path d="M6 6l6 4 6-3 8 2" />
                    <circle cx="6" cy="6" r="1.5" />
                    <circle cx="12" cy="10" r="1.5" />
                    <circle cx="18" cy="7" r="1.5" />
                    <circle cx="26" cy="9" r="1.5" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Your Report",
                desc: "Receive your personalized score, attribute profile, and evidence-based practices — downloadable as PDF",
                svg: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 4h10l6 6v18a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    <path d="M18 4v6h6" />
                    <path d="M16 18v8" />
                    <path d="M12 22l4 4 4-4" />
                  </svg>
                ),
              },
            ].map(({ step, svg, title, desc }) => (
              <div
                key={step}
                style={{
                  padding: "36px 24px",
                  borderRadius: "24px",
                  border: "1px solid #EDE5D8",
                  backgroundColor: "#FAFAF8",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #F7F3EE 0%, #EDE5D8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  {svg}
                </div>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#C4956A",
                    letterSpacing: "0.15em",
                    marginBottom: "8px",
                  }}
                >
                  STEP {step}
                </p>
                <p
                  style={{
                    fontFamily: serif,
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "#1C1410",
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#888",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FINAL CTA ─── */}
      <section
        style={{
          background: "linear-gradient(165deg, #C4956A 0%, #8B6F5E 100%)",
          padding: "120px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "44px",
              fontWeight: 300,
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Ready to discover your
            <br />
            <span style={{ fontStyle: "italic" }}>leadership energy profile?</span>
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            Take the validated 18-item assessment and receive your personalized
            report with evidence-based practices to support your well-being at work.
          </p>
          <button
            onClick={onStart}
            style={{
              fontFamily: sans,
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "20px 56px",
              backgroundColor: "#FFFFFF",
              color: "#8B6F5E",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)";
            }}
          >
            BEGIN ASSESSMENT &rarr;
          </button>
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
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "4px",
          }}
        >
          &copy; {new Date().getFullYear()} Positively Energizing Leadership Scale
        </p>
      </footer>
    </div>
  );
}
