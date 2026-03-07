"use client";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function AboutPage() {
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

      {/* ─── HERO BANNER ─── */}
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
            background: "radial-gradient(circle, rgba(196,149,106,0.1) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 700 }}>
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
            About
          </p>
          <h1
            style={{
              fontFamily: serif,
              color: "#FFFFFF",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            The Research Behind{" "}
            <span style={{ fontStyle: "italic", color: "#C4956A" }}>the Platform</span>
          </h1>
          <p
            style={{
              fontFamily: sans,
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Advancing the science of positively energizing leadership through
            rigorous research and evidence-based assessment.
          </p>
        </div>
      </section>

      {/* ─── TEAM CARD ─── */}
      <section style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            background: "#FFFFFF",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            border: "1px solid #EDE5D8",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          {/* Photo placeholder */}
          <div
            style={{
              flex: "0 0 280px",
              minHeight: 320,
              background: "#F7F3EE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(139,111,94,0.12)",
                border: "1px solid #EDE5D8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontFamily: sans,
                color: "#8B6F5E",
                textAlign: "center",
                padding: 20,
              }}
            >
              Team Photo
              <br />
              Placeholder
            </div>
          </div>

          {/* Bio */}
          <div style={{ padding: "48px", flex: "1 1 300px" }}>
            <p
              style={{
                fontFamily: sans,
                color: "#C4956A",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Lead Researcher
            </p>
            <h2
              style={{
                fontFamily: serif,
                fontSize: 32,
                fontWeight: 400,
                color: "#1C1410",
                marginBottom: 4,
              }}
            >
              [Researcher Name]
            </h2>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                color: "#8B6F5E",
                marginBottom: 24,
                fontStyle: "italic",
              }}
            >
              [Title / Affiliation]
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 15,
                lineHeight: 1.8,
                color: "#666",
                fontWeight: 300,
                margin: 0,
              }}
            >
              [Bio paragraph — describe the researcher&apos;s background, expertise in positive
              organizational scholarship, and their role in developing the Positively Energizing
              Leadership Scale. This section should highlight their academic credentials, research
              interests, and contributions to the field.]
            </p>
          </div>
        </div>
      </section>

      {/* ─── RESEARCH MISSION ─── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
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
            Our Mission
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300,
              color: "#1C1410",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: 28,
            }}
          >
            Bridging research and{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>practice</span>
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 16,
              lineHeight: 1.9,
              color: "#666",
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            The Positively Energizing Leadership Scale (PELS) was developed through a rigorous,
            multi-phase research program grounded in positive organizational scholarship. Our work
            draws on decades of research demonstrating that leaders who exhibit virtuous behaviors
            — such as gratitude, compassion, integrity, and generosity — generate relational energy
            that predicts extraordinary organizational outcomes.
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 16,
              lineHeight: 1.9,
              color: "#666",
              fontWeight: 300,
              margin: 0,
            }}
          >
            This platform translates that research into a practical, accessible tool. By completing
            the PELS assessment, leaders and organizations gain evidence-based insights into how
            they energize others — and how they can cultivate the virtuous behaviors that drive
            engagement, well-being, and performance.
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
