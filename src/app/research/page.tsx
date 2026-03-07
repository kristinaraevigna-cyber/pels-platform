"use client";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function ResearchPage() {
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
          minHeight: 420,
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
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(196,149,106,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 740 }}>
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
            Research
          </p>
          <h1
            style={{
              fontFamily: serif,
              color: "#FFFFFF",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            The Science of Positively{" "}
            <span style={{ fontStyle: "italic", color: "#C4956A" }}>
              Energizing Leadership
            </span>
          </h1>
          <p
            style={{
              fontFamily: sans,
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            The PELS platform is grounded in peer-reviewed research from leading scholars
            in positive psychology and organizational science.
          </p>
        </div>
      </section>

      {/* ─── RESEARCH CARDS ─── */}
      <section style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
          }}
        >
          {/* Card 1: Systematic Review */}
          <a
            href="/research/systematic-review"
            style={{
              textDecoration: "none",
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "40px 32px",
              border: "1px solid #EDE5D8",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C4956A",
                marginBottom: 12,
              }}
            >
              Systematic Review
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: 24,
                fontWeight: 400,
                color: "#1C1410",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Leader Positive Relational Energy
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.7,
                marginBottom: 16,
                flex: 1,
              }}
            >
              A comprehensive systematic review of 18 empirical studies examining
              how positive leadership characteristics generate relational energy
              and drive work performance outcomes.
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: "#8B6F5E",
                fontStyle: "italic",
                marginBottom: 16,
              }}
            >
              Cabrera, V., Keelin, C., Shapiro, J., &amp; Donaldson, S.I. (2025)
            </p>
            <span
              style={{
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 600,
                color: "#C4956A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Read more &rarr;
            </span>
          </a>

          {/* Card 2: Cameron */}
          <a
            href="/research/cameron"
            style={{
              textDecoration: "none",
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "40px 32px",
              border: "1px solid #EDE5D8",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C4956A",
                marginBottom: 12,
              }}
            >
              Foundational Work
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: 24,
                fontWeight: 400,
                color: "#1C1410",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Cameron&apos;s Positively Energizing Leadership
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.7,
                marginBottom: 16,
                flex: 1,
              }}
            >
              The theoretical foundation: the heliotropic effect, virtuous behaviors as
              the mechanism for generating relational energy, and positive leadership
              strategies for extraordinary performance.
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: "#8B6F5E",
                fontStyle: "italic",
                marginBottom: 16,
              }}
            >
              Cameron, K.S. (2021, 2012)
            </p>
            <span
              style={{
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 600,
                color: "#C4956A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Read more &rarr;
            </span>
          </a>

          {/* Card 3: PELS Validation */}
          <a
            href="/research/pels-validation"
            style={{
              textDecoration: "none",
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "40px 32px",
              border: "1px solid #EDE5D8",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C4956A",
                marginBottom: 12,
              }}
            >
              Validation Study
            </p>
            <h3
              style={{
                fontFamily: serif,
                fontSize: 24,
                fontWeight: 400,
                color: "#1C1410",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              PELS Scale Development &amp; Validation
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.7,
                marginBottom: 16,
                flex: 1,
              }}
            >
              The first validated psychometric measure of positively energizing leadership,
              developed with 603 participants across two independent samples with
              exceptional reliability (&alpha; = .97&ndash;.98).
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: "#8B6F5E",
                fontStyle: "italic",
                marginBottom: 16,
              }}
            >
              Shea et al.
            </p>
            <span
              style={{
                fontFamily: sans,
                fontSize: 12,
                fontWeight: 600,
                color: "#C4956A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Read more &rarr;
            </span>
          </a>

          {/* Card 4: Current Research — IN PROGRESS */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "40px 32px",
              border: "2px dashed rgba(196,149,106,0.4)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C4956A",
                  margin: 0,
                }}
              >
                Current Research
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
            <h3
              style={{
                fontFamily: serif,
                fontSize: 24,
                fontWeight: 400,
                color: "#1C1410",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Longitudinal Study: PELS, Relational Energy &amp; PERMA+4
            </h3>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.7,
                marginBottom: 16,
                flex: 1,
              }}
            >
              Donaldson and Shea are currently conducting a longitudinal study examining
              the dynamic relationships between Positively Energizing Leadership, relational
              energy, and workplace well-being as measured by the PERMA+4 framework. The
              study also includes an Item Response Theory (IRT) analysis to develop a
              refined, shortened version of the PELS scale — maintaining psychometric rigor
              while reducing respondent burden. This ongoing research builds on the original
              PELS validation work and aims to establish the longitudinal predictive validity
              of positively energizing leadership on employee flourishing over time.
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: "#8B6F5E",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              Donaldson, S.I. &amp; Shea, K.
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
