"use client";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function SystematicReviewPage() {
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
            Systematic Review
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
            Leader Positive{" "}
            <span style={{ fontStyle: "italic", color: "#C4956A" }}>Relational Energy</span>
          </h1>
          <p
            style={{
              fontFamily: sans,
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 560,
              margin: "0 auto 16px",
            }}
          >
            A Systematic Review
          </p>
          <p
            style={{
              fontFamily: sans,
              color: "rgba(255,255,255,0.4)",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            Cabrera, V., Keelin, C., Shapiro, J., &amp; Donaldson, S.I. (2025)
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

          {/* Overview */}
          <h2 style={sectionHeading}>Overview</h2>
          <p style={bodyText}>
            This systematic review synthesizes <strong style={{ fontWeight: 500, color: "#1C1410" }}>18 empirical studies</strong> spanning
            1998&ndash;2024, examining how positive leadership characteristics generate relational
            energy in followers and subsequently drive work performance outcomes. The review
            encompasses research conducted across multiple industries and countries, providing
            a comprehensive picture of the mechanisms through which leaders energize their teams.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Key Finding 1 */}
          <h2 style={sectionHeading}>
            Key Finding 1: Positive Leadership Generates{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Relational Energy</span>
          </h2>
          <p style={bodyText}>
            The review identifies specific positive leadership characteristics that generate
            relational energy in followers. These include <strong style={{ fontWeight: 500, color: "#1C1410" }}>humility, authenticity,
            servant leadership, humor, work passion, and trust-building</strong>. Leaders who
            consistently exhibit these characteristics create a relational context in which
            followers experience heightened vitality, motivation, and psychological resourcefulness.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Key Finding 2 */}
          <h2 style={sectionHeading}>
            Key Finding 2: Relational Energy Drives{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Work Performance</span>
          </h2>
          <p style={bodyText}>
            Relational energy leads to improved work performance outcomes across multiple
            dimensions, including <strong style={{ fontWeight: 500, color: "#1C1410" }}>job performance, creativity, service performance,
            and customer engagement</strong>. Followers who experience higher relational energy
            from their leaders demonstrate greater capacity for sustained effort, innovative
            thinking, and meaningful engagement with their work.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Key Finding 3 */}
          <h2 style={sectionHeading}>
            Key Finding 3: Relational Energy as a{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Mediator</span>
          </h2>
          <p style={bodyText}>
            A critical finding across four independent studies is that relational energy <strong style={{ fontWeight: 500, color: "#1C1410" }}>mediates</strong> the
            relationship between positive leadership and work performance. This means that
            positive leadership characteristics do not directly drive performance — rather,
            they first generate relational energy in followers, which in turn produces
            performance improvements. This mediation pathway provides a clear mechanism
            for understanding <em>how</em> positive leadership works.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Visual Model */}
          <h2 style={sectionHeading}>The Mediation Model</h2>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #EDE5D8",
              padding: "40px 32px",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: "1 1 180px",
                  padding: "20px 16px",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #F7F3EE 0%, #EDE5D8 100%)",
                  border: "1px solid #EDE5D8",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: "#C4956A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                  Antecedent
                </p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: "#1C1410", margin: 0 }}>
                  Positive Leadership Characteristics
                </p>
              </div>

              <div style={{ flex: "0 0 48px", textAlign: "center" }}>
                <span style={{ fontFamily: sans, fontSize: 24, color: "#C4956A" }}>&rarr;</span>
              </div>

              <div
                style={{
                  flex: "1 1 180px",
                  padding: "20px 16px",
                  borderRadius: 16,
                  background: "rgba(196,149,106,0.08)",
                  border: "1px solid rgba(196,149,106,0.25)",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: "#C4956A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                  Mediator
                </p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: "#1C1410", margin: 0 }}>
                  Followers&apos; Relational Energy
                </p>
              </div>

              <div style={{ flex: "0 0 48px", textAlign: "center" }}>
                <span style={{ fontFamily: sans, fontSize: 24, color: "#C4956A" }}>&rarr;</span>
              </div>

              <div
                style={{
                  flex: "1 1 180px",
                  padding: "20px 16px",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #F7F3EE 0%, #EDE5D8 100%)",
                  border: "1px solid #EDE5D8",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: "#C4956A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                  Outcome
                </p>
                <p style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: "#1C1410", margin: 0 }}>
                  Work Performance Outcomes
                </p>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Practical Implications */}
          <h2 style={sectionHeading}>Practical Implications</h2>
          <p style={bodyText}>
            The findings suggest that leadership development programs should emphasize
            the cultivation of specific positive characteristics that generate relational
            energy. Organizations seeking to improve performance outcomes should invest in
            developing leaders who demonstrate:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 20,
            }}
          >
            {["Humility", "Authenticity", "Humor", "Trust-Building", "Servant Leadership", "Work Passion"].map((trait) => (
              <div
                key={trait}
                style={{
                  padding: "16px 20px",
                  borderRadius: 12,
                  background: "#FFFFFF",
                  border: "1px solid #EDE5D8",
                  textAlign: "center",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: "#8B6F5E", margin: 0 }}>
                  {trait}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

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
              Full Citation
            </p>
            <p style={{ fontFamily: sans, fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>
              Cabrera, V., Keelin, C., Shapiro, J., &amp; Donaldson, S.I. (2025). Leader positive relational energy:
              A systematic review. <em>International Journal of Applied Positive Psychology</em>.
              DOI: 10.1007/s41042-024-00214-w
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
