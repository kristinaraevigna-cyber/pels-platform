"use client";

import Navbar from "@/components/Navbar";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

export default function AboutPage() {
  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── NAVBAR ─── */}
      <Navbar variant="fixed" />

      {/* ─── HERO BANNER ─── */}
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
              fontSize: "clamp(28px, 4vw, 52px)",
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
              fontSize: "clamp(14px, 2vw, 16px)",
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
      <section className="section-padding" style={{ backgroundColor: "#F7F3EE", padding: "80px 24px" }}>
        <div
          className="team-card"
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            background: "#FFFFFF",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            border: "1px solid #E8E0D8",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          {/* Photo */}
          <div
            className="team-card-photo"
            style={{
              flex: "0 0 320px",
              minHeight: 400,
              background: "#F7F3EE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kshea-headshot.jpg"
              alt="Kristina Shea"
              width={280}
              height={280}
              style={{
                width: "100%",
                maxWidth: 280,
                height: "auto",
                aspectRatio: "1",
                borderRadius: 20,
                objectFit: "cover",
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                display: "block",
              }}
            />
          </div>

          {/* Bio */}
          <div className="team-card-bio" style={{ padding: "48px", flex: "1 1 340px" }}>
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
                fontSize: "clamp(28px, 3vw, 36px)",
                fontWeight: 400,
                color: "#1C1410",
                marginBottom: 6,
              }}
            >
              Kristina Shea
            </h2>
            <p
              style={{
                fontFamily: sans,
                fontSize: 14,
                color: "#8B6F5E",
                marginBottom: 16,
                fontStyle: "italic",
              }}
            >
              PhD Candidate | Leadership Researcher | ICF-Certified Coach
            </p>

            {/* Credential badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {[
                "PhD Candidate \u00B7 University of Bologna",
                "ICF-Certified Coach",
                "Gallup Certified",
                "University of Pennsylvania MAPP",
              ].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: sans,
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#8B6F5E",
                    background: "rgba(196,149,106,0.1)",
                    border: "1px solid rgba(196,149,106,0.25)",
                    padding: "5px 14px",
                    borderRadius: 100,
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                `What happens when you combine 15+ years of finance leadership, cutting-edge well-being research, and a passion for unlocking human potential? You get Kristina Shea, a leader who's traded spreadsheets for breakthrough science and is now revolutionizing how we think about leader and leadership development, coaching, and human flourishing.`,
                `From her roots as Deputy Director of a major government agency, to working for many years in international non-profits, to the research labs of three prestigious universities, Kristina has always been driven by one question: How do we help people become the best versions of themselves?`,
                `Her journey took a pivotal turn during her Masters at Pepperdine University, where she discovered Appreciative Inquiry, an approach that flips traditional problem-solving on its head by focusing on what's already working brilliantly. This wasn't just an academic exercise — it was a complete mindset shift that led her to earn certifications from Gallup, become an ICF-certified coach, and dive headfirst into the University of Pennsylvania's renowned MAPP program.`,
                `Now, as a PhD candidate at the University of Bologna, where she studies leader and leadership development in the Italian and European context, Kristina is bridging the gap between rigorous academic research and real-world impact. Her work focuses on developing leadership interventions and research that enhance collective well-being — because she knows firsthand that sustainable success requires leaders who can thrive personally while creating environments where their teams flourish too.`,
                `With academic publications, book chapters, and proven well-being interventions under her belt, Kristina is now focused on delivering these evidence-based solutions at scale.`,
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: sans,
                    fontSize: "clamp(14px, 2vw, 15px)",
                    lineHeight: 1.85,
                    color: "#666",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESEARCH MISSION ─── */}
      <section className="section-padding" style={{ backgroundColor: "#FFFFFF", padding: "80px 24px" }}>
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
              fontSize: "clamp(24px, 3vw, 40px)",
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
              fontSize: "clamp(14px, 2vw, 16px)",
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
              fontSize: "clamp(14px, 2vw, 16px)",
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
