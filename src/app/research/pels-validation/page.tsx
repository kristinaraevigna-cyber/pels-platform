"use client";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function PelsValidationPage() {
  const sectionHeading: React.CSSProperties = {
    fontFamily: serif,
    fontSize: "clamp(24px, 3vw, 32px)",
    fontWeight: 400,
    color: "#1C1410",
    lineHeight: 1.2,
    marginBottom: 20,
  };

  const bodyText: React.CSSProperties = {
    fontFamily: sans,
    fontSize: 15,
    fontWeight: 300,
    color: "#666",
    lineHeight: 1.85,
    marginBottom: 20,
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
        {["Home", "About", "Research", "Contact"].map((label) => {
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

      {/* ─── HERO ─── */}
      <section
        style={{
          background: "linear-gradient(165deg, #1C1410 0%, #2C2420 40%, #1C1410 100%)",
          minHeight: 400,
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
            right: "-5%",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 720 }}>
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
            Validation Study
          </p>
          <h1
            style={{
              fontFamily: serif,
              color: "#FFFFFF",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Validation of the{" "}
            <span style={{ fontStyle: "italic", color: "#C4956A" }}>
              Positively Energizing Leadership Scale
            </span>
          </h1>
          <p
            style={{
              fontFamily: sans,
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            Shea et al.
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Back link */}
          <a
            href="/research"
            style={{
              fontFamily: sans,
              fontSize: 13,
              color: "#C4956A",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.05em",
              display: "inline-block",
              marginBottom: 40,
            }}
            onMouseOver={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
            onMouseOut={(e) => { e.currentTarget.style.textDecoration = "none"; }}
          >
            &larr; Back to Research
          </a>

          {/* Purpose */}
          <h2 style={sectionHeading}>Purpose</h2>
          <p style={bodyText}>
            The Positively Energizing Leadership Scale (PELS) represents the{" "}
            <strong style={{ fontWeight: 500, color: "#1C1410" }}>first validated psychometric measure</strong>{" "}
            of positively energizing leadership. While the theoretical foundations of positively
            energizing leadership have been well-established by Cameron and others, the field
            lacked a rigorous, validated instrument for measuring this construct. The PELS
            fills this critical gap, providing researchers and practitioners with a reliable
            tool for assessing how leaders generate relational energy through virtuous behaviors.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Methods */}
          <h2 style={sectionHeading}>Methods</h2>
          <p style={bodyText}>
            The PELS was developed through a multi-phase validation process following best
            practices in psychometric scale development. The study involved{" "}
            <strong style={{ fontWeight: 500, color: "#1C1410" }}>603 participants across two independent samples</strong>,
            ensuring robust cross-validation of the instrument&apos;s factor structure and
            psychometric properties. The development process included item generation,
            exploratory factor analysis, confirmatory factor analysis, and criterion validity
            testing.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Psychometric Properties */}
          <h2 style={sectionHeading}>
            Psychometric{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Properties</span>
          </h2>
          <p style={bodyText}>
            The PELS demonstrates exceptional psychometric properties across all validation
            criteria:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              marginBottom: 20,
            }}
          >
            {[
              { value: "\u03B1 = .97\u2013.98", label: "Cronbach's Alpha" },
              { value: "\u03C9 = .98", label: "McDonald's Omega" },
              { value: "CFA Confirmed", label: "Factor Structure" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  border: "1px solid #EDE5D8",
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontFamily: serif, fontSize: 32, fontWeight: 300, color: "#8B6F5E", marginBottom: 4, lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", margin: 0 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Two Subdomains */}
          <h2 style={sectionHeading}>Two Subdomains</h2>
          <p style={bodyText}>
            The PELS consists of 18 items organized into two theoretically and empirically
            distinct subdomains:
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
            <div
              style={{
                flex: "1 1 280px",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #EDE5D8",
                padding: "28px",
              }}
            >
              <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: "#C4956A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                Subdomain 1
              </p>
              <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: "#1C1410", marginBottom: 8 }}>
                Relational Energy
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "#888", lineHeight: 1.7, marginBottom: 8 }}>
                9 items measuring the degree to which a leader generates vitality,
                enthusiasm, inspiration, and motivation in their followers.
              </p>
              <p style={{ fontFamily: sans, fontSize: 13, color: "#AAA", margin: 0 }}>
                9 items
              </p>
            </div>
            <div
              style={{
                flex: "1 1 280px",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #EDE5D8",
                padding: "28px",
              }}
            >
              <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: "#C4956A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
                Subdomain 2
              </p>
              <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, color: "#1C1410", marginBottom: 8 }}>
                Virtuous Behavior
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "#888", lineHeight: 1.7, marginBottom: 8 }}>
                9 items measuring the degree to which a leader demonstrates gratitude,
                compassion, integrity, forgiveness, humility, kindness, generosity, and trust.
              </p>
              <p style={{ fontFamily: sans, fontSize: 13, color: "#AAA", margin: 0 }}>
                9 items
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Criterion Validity */}
          <h2 style={sectionHeading}>
            Criterion{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Validity</span>
          </h2>
          <p style={bodyText}>
            The PELS demonstrates strong criterion validity, significantly predicting key
            organizational outcomes:
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
            <div
              style={{
                flex: "1 1 240px",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #EDE5D8",
                padding: "32px 24px",
                textAlign: "center",
                borderTop: "3px solid #C4956A",
              }}
            >
              <p style={{ fontFamily: serif, fontSize: 40, fontWeight: 300, color: "#C4956A", marginBottom: 4, lineHeight: 1 }}>
                &beta; = .56
              </p>
              <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: "#888", margin: 0 }}>
                Predicts Employee Engagement
              </p>
            </div>
            <div
              style={{
                flex: "1 1 240px",
                background: "#FFFFFF",
                borderRadius: 20,
                border: "1px solid #EDE5D8",
                padding: "32px 24px",
                textAlign: "center",
                borderTop: "3px solid #C4956A",
              }}
            >
              <p style={{ fontFamily: serif, fontSize: 40, fontWeight: 300, color: "#C4956A", marginBottom: 4, lineHeight: 1 }}>
                &beta; = .57
              </p>
              <p style={{ fontFamily: sans, fontSize: 13, fontWeight: 500, color: "#888", margin: 0 }}>
                Predicts Employee Well-Being
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Incremental Validity */}
          <h2 style={sectionHeading}>
            Incremental{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Validity</span>
          </h2>
          <p style={bodyText}>
            A particularly important finding is that the PELS{" "}
            <strong style={{ fontWeight: 500, color: "#1C1410" }}>predicts outcomes above and beyond</strong>{" "}
            existing measures of transformational leadership, authentic leadership, and
            virtuous leadership. This establishes positively energizing leadership as a
            distinct construct that captures unique variance in employee engagement and
            well-being not accounted for by other established leadership frameworks.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Implications */}
          <h2 style={sectionHeading}>Implications</h2>
          <p style={bodyText}>
            The PELS provides researchers and practitioners with a rigorous, validated tool
            for measuring and developing positively energizing leadership. Organizations can
            use the instrument to identify leaders who excel at generating relational energy,
            to benchmark leadership development interventions, and to track the impact of
            positive leadership on key outcomes over time.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Longitudinal Study Teaser */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "2px dashed rgba(196,149,106,0.4)",
              padding: "32px",
              marginBottom: 40,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C4956A",
                  margin: 0,
                }}
              >
                Building on This Work
              </p>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C4956A",
                  background: "rgba(196,149,106,0.12)",
                  border: "1px solid rgba(196,149,106,0.3)",
                  padding: "3px 10px",
                  borderRadius: 100,
                }}
              >
                In Progress
              </span>
            </div>
            <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "#888", lineHeight: 1.8, margin: 0 }}>
              Donaldson and Shea are currently conducting a longitudinal study examining
              relational energy, PERMA+4 well-being, and an IRT-based refinement of the
              PELS scale. This ongoing research aims to establish the longitudinal predictive
              validity of positively energizing leadership on employee flourishing over time.
            </p>
          </div>

          {/* Citation */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              border: "1px solid #EDE5D8",
              padding: "28px 32px",
            }}
          >
            <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4956A", marginBottom: 12 }}>
              Citation
            </p>
            <p style={{ fontFamily: sans, fontSize: 14, color: "#666", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
              [Full citation — Shea et al. — to be added]
            </p>
          </div>
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
