"use client";

import Navbar from "@/components/Navbar";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function CameronPage() {
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
      <Navbar variant="fixed" />

      {/* ─── HERO ─── */}
      <section
        className="section-padding"
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
            left: "-5%",
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
            Foundational Work
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
            The Theoretical Foundation:{" "}
            <span style={{ fontStyle: "italic", color: "#C4956A" }}>
              Cameron&apos;s Positively Energizing Leadership
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
            Cameron, K.S. (2021, 2012)
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="section-padding" style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
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

          {/* The Core Theory */}
          <h2 style={sectionHeading}>The Core Theory</h2>
          <p style={bodyText}>
            Kim Cameron&apos;s research reveals that the most successful leaders share a defining
            characteristic: they <strong style={{ fontWeight: 500, color: "#1C1410" }}>energize others</strong>. This capacity to generate
            positive energy in the people around them is not merely one leadership trait among
            many — it is their most important influencing capacity. Leaders who positively
            energize others produce extraordinary results not through command and control,
            but through the relational energy they create in every interaction.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* The Heliotropic Effect */}
          <h2 style={sectionHeading}>
            The{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Heliotropic Effect</span>
          </h2>
          <p style={bodyText}>
            Cameron draws on a powerful metaphor from biology: just as living systems naturally
            lean toward light — plants turning toward the sun, organisms moving toward
            life-giving energy — people flourish in the presence of those who generate positive
            energy. This <strong style={{ fontWeight: 500, color: "#1C1410" }}>heliotropic effect</strong> suggests that
            the human tendency to gravitate toward positive energy is not merely a preference
            but a fundamental feature of living systems. Leaders who understand this principle
            can create environments where people naturally thrive.
          </p>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              border: "1px solid #EDE5D8",
              padding: "24px",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: "#8B6F5E", lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
              &ldquo;Just as plants turn toward sunlight to grow, people naturally flourish
              in the presence of leaders who generate positive energy.&rdquo;
            </p>
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Virtuous Behaviors */}
          <h2 style={sectionHeading}>
            Virtuous Behaviors as the{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Mechanism</span>
          </h2>
          <p style={bodyText}>
            What distinguishes positively energizing leaders is their consistent demonstration
            of virtuous behaviors. These are not mere strategies or techniques — they are
            character-based behaviors that reflect the highest aspirations of human nature.
            Cameron identifies several core virtues that serve as the mechanism through which
            leaders generate positive energy:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 14,
              marginBottom: 20,
            }}
          >
            {["Humility", "Gratitude", "Compassion", "Integrity", "Forgiveness"].map((v) => (
              <div
                key={v}
                style={{
                  padding: "18px 16px",
                  borderRadius: 14,
                  background: "#FFFFFF",
                  border: "1px solid #EDE5D8",
                  textAlign: "center",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: "#8B6F5E", margin: 0 }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
          <p style={bodyText}>
            These virtues are not just strategies to be deployed situationally — they are
            deeply held character strengths that positively energizing leaders embody
            consistently across interactions, creating a stable foundation of trust and energy.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Relational Energy */}
          <h2 style={sectionHeading}>
            Relational Energy as a{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Unique Resource</span>
          </h2>
          <p style={bodyText}>
            Cameron distinguishes relational energy from other forms of energy — physical,
            emotional, and mental. Unlike these other forms, which deplete with use,{" "}
            <strong style={{ fontWeight: 500, color: "#1C1410" }}>relational energy intensifies rather than depletes
            when activated</strong>. When a leader generates positive relational energy in an
            interaction, both the leader and the follower experience an increase in vitality,
            motivation, and capacity. This self-reinforcing quality makes relational energy
            a uniquely powerful resource for organizational life.
          </p>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Positive Leadership Strategies */}
          <h2 style={sectionHeading}>
            Positive Leadership{" "}
            <span style={{ fontStyle: "italic", color: "#8B6F5E" }}>Strategies</span>
          </h2>
          <p style={bodyText}>
            Cameron outlines four domains through which positive leadership operates to
            produce extraordinary performance:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
            {[
              { title: "Positive Climate", desc: "Fostering compassion, forgiveness, and gratitude within the organization to create an environment of psychological safety and trust." },
              { title: "Positive Communication", desc: "Using supportive, encouraging, and affirmative communication patterns that build connection and shared understanding." },
              { title: "Positive Relationships", desc: "Cultivating energy networks within organizations where positive relational energy flows freely between individuals." },
              { title: "Positive Meaning", desc: "Connecting people's work to a larger sense of purpose and contribution, enabling them to see the profound impact of their efforts." },
            ].map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 16,
                  border: "1px solid #EDE5D8",
                  padding: "24px",
                }}
              >
                <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: "#8B6F5E", marginBottom: 8 }}>
                  {title}
                </p>
                <p style={{ fontFamily: sans, fontSize: 14, fontWeight: 300, color: "#888", lineHeight: 1.7, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "#EDE5D8", margin: "40px 0" }} />

          {/* Citations */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              border: "1px solid #EDE5D8",
              padding: "24px",
            }}
          >
            <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4956A", marginBottom: 16 }}>
              Key References
            </p>
            <p style={{ fontFamily: sans, fontSize: 14, color: "#666", lineHeight: 1.8, marginBottom: 12 }}>
              Cameron, K.S. (2021). <em>Positively Energizing Leadership: Virtuous Actions
              and Relationships that Create High Performance</em>. Berrett-Koehler Publishers.
            </p>
            <p style={{ fontFamily: sans, fontSize: 14, color: "#666", lineHeight: 1.8, margin: 0 }}>
              Cameron, K.S. (2012). <em>Positive Leadership: Strategies for Extraordinary
              Performance</em>. Berrett-Koehler Publishers.
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
