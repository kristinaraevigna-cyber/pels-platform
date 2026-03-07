import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { PELSScore, Intervention } from "@/lib/pels-data";
import { PELS_ITEMS } from "@/lib/pels-data";
import {
  PERMA_SUBSCALES,
  getPermaInterpretation,
  getPermaRelationToLeadership,
  type PermaScore,
} from "@/lib/perma-data";
import type { AssessmentData } from "@/lib/types";

// ─── Styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#2D2D2D",
  },
  // Cover page
  coverPage: {
    padding: 0,
    backgroundColor: "#3D2B22",
  },
  coverContent: {
    padding: 60,
    flex: 1,
  },
  coverBadge: {
    backgroundColor: "#C4956A22",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#C4956A44",
  },
  coverBadgeText: {
    fontSize: 8,
    color: "#C4956A",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  coverTitle: {
    fontSize: 42,
    color: "#F7F3EE",
    fontFamily: "Helvetica-Oblique",
    lineHeight: 1.2,
    marginBottom: 16,
  },
  coverSubtitle: {
    fontSize: 14,
    color: "#C4956A",
    letterSpacing: 1,
    marginBottom: 8,
  },
  coverName: {
    fontSize: 20,
    color: "#F7F3EE",
    marginBottom: 40,
    fontFamily: "Helvetica",
  },
  coverScore: {
    fontSize: 80,
    color: "#C4956A",
    fontFamily: "Helvetica",
    lineHeight: 1,
    marginBottom: 4,
  },
  coverCategory: {
    fontSize: 22,
    color: "#F7F3EE",
    fontFamily: "Helvetica",
    marginBottom: 8,
  },
  coverFooter: {
    position: "absolute",
    bottom: 40,
    left: 60,
    right: 60,
  },
  coverFooterText: {
    fontSize: 8,
    color: "#F7F3EE66",
    letterSpacing: 1,
  },
  // General
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 10,
    color: "#8B6F5E",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
    fontFamily: "Helvetica-Bold",
  },
  h2: {
    fontSize: 22,
    color: "#2D2D2D",
    marginBottom: 8,
    fontFamily: "Helvetica",
  },
  bodyText: {
    fontSize: 10,
    color: "#555555",
    lineHeight: 1.6,
    fontFamily: "Helvetica",
  },
  storyBox: {
    backgroundColor: "#F7F3EE",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#C4956A",
  },
  storyLabel: {
    fontSize: 8,
    color: "#8B6F5E",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  storyText: {
    fontSize: 10,
    color: "#444444",
    lineHeight: 1.6,
    fontFamily: "Helvetica-Oblique",
  },
  scoreCard: {
    backgroundColor: "#F7F3EE",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#C4956A33",
  },
  scoreNumber: {
    fontSize: 60,
    color: "#8B6F5E",
    fontFamily: "Helvetica",
    lineHeight: 1,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F0ECE7",
  },
  itemText: {
    fontSize: 9,
    color: "#555555",
    flex: 1,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  itemScore: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#8B6F5E",
    width: 30,
    textAlign: "right",
  },
  scoreBar: {
    height: 6,
    backgroundColor: "#E8E0D8",
    borderRadius: 3,
    marginTop: 8,
  },
  scoreBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8B6F5E",
  },
  interventionCard: {
    backgroundColor: "#F7F3EE",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  interventionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#2D2D2D",
    marginBottom: 4,
  },
  interventionMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  interventionMetaText: {
    fontSize: 8,
    color: "#8B6F5E",
    fontFamily: "Helvetica",
  },
  label: {
    fontSize: 8,
    color: "#8B6F5E",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    marginTop: 10,
  },
  referenceBox: {
    backgroundColor: "#F7F3EE",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  referenceText: {
    fontSize: 8,
    color: "#8B6F5E",
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E0D8",
    marginVertical: 16,
  },
  twoCol: {
    flexDirection: "row",
    gap: 16,
  },
  col: {
    flex: 1,
  },
  miniCard: {
    backgroundColor: "#F7F3EE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  attributeTag: {
    fontSize: 7,
    color: "#8B6F5E",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 50,
    fontSize: 9,
    color: "#BBBBBB",
  },
});

// ─── Component ───────────────────────────────────────────────

interface PELSReportProps {
  data: AssessmentData;
  score: PELSScore;
  interventions: Intervention[];
  assessmentId: string | null;
  permaScore?: PermaScore | null;
}

export default function PELSReport({
  data,
  score,
  interventions,
  assessmentId,
  permaScore,
}: PELSReportProps) {
  const responses = data.pels_responses || {};
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const itemScores = PELS_ITEMS.map((item) => ({
    ...item,
    score: responses[item.id] || 0,
  }));
  const strengths = [...itemScores].sort((a, b) => b.score - a.score).slice(0, 3);
  const growthAreas = [...itemScores].sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <Document title="PELS Assessment Report" author="PELS Platform">
      {/* ── COVER PAGE ──────────────────────────────────── */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverContent}>
          <View style={styles.coverBadge}>
            <Text style={styles.coverBadgeText}>
              Positively Energizing Leadership Assessment
            </Text>
          </View>

          <Text style={styles.coverTitle}>
            Leadership{"\n"}Energy Report
          </Text>

          <Text style={styles.coverSubtitle}>Prepared for</Text>
          <Text style={styles.coverName}>
            {data.respondent_name || "Assessment Participant"}
          </Text>

          <View style={{ marginBottom: 40 }}>
            <Text style={styles.coverScore}>{score.mean.toFixed(1)}</Text>
            <Text style={{ fontSize: 12, color: "#C4956A", marginBottom: 4 }}>
              out of 7.0
            </Text>
            <Text style={styles.coverCategory}>{score.category}</Text>
            <Text style={{ fontSize: 11, color: "#F7F3EE99", maxWidth: 300, lineHeight: 1.5 }}>
              {score.description.substring(0, 150)}...
            </Text>
          </View>
        </View>

        <View style={styles.coverFooter}>
          <Text style={styles.coverFooterText}>
            {date} · PELS v1.0 · IRB #853470 University of Pennsylvania
            {assessmentId ? ` · ID: ${assessmentId.substring(0, 8)}` : ""}
          </Text>
        </View>
      </Page>

      {/* ── PAGE 2: ABOUT THE ASSESSMENT ─────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>About This Report</Text>
        <Text style={styles.h2}>The Positively Energizing Leadership Scale</Text>
        <Text style={[styles.bodyText, { marginBottom: 16 }]}>
          The Positively Energizing Leadership Scale (PELS) is the first validated psychometric
          instrument designed to measure positively energizing leadership — an emerging leadership
          approach that combines virtuous behavior and relational energy transmission to foster
          employee engagement and well-being.
        </Text>
        <Text style={[styles.bodyText, { marginBottom: 16 }]}>
          The 18-item PELS was developed and validated across two independent samples (N = 603)
          using exploratory factor analysis (EFA) and confirmatory factor analysis (CFA). It
          demonstrates excellent reliability (α = .97–.98) and predicts employee engagement
          (β = .56) and well-being (β = .57) above and beyond transformational, authentic, and
          virtuous leadership measures.
        </Text>

        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>Your Context</Text>
        <View style={styles.twoCol}>
          <View style={styles.col}>
            {data.respondent_role && (
              <InfoRow label="Role" value={data.respondent_role} />
            )}
            {data.respondent_org && (
              <InfoRow label="Organization" value={data.respondent_org} />
            )}
            {data.respondent_org_level && (
              <InfoRow label="Level" value={data.respondent_org_level} />
            )}
          </View>
          <View style={styles.col}>
            {data.respondent_tenure && (
              <InfoRow label="Tenure with Supervisor" value={data.respondent_tenure} />
            )}
            <InfoRow label="Date Completed" value={date} />
          </View>
        </View>

        <Text style={[styles.pageNumber]}>2</Text>
      </Page>

      {/* ── PAGE 3: YOUR SCORE ──────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Your Results</Text>

        <View style={styles.scoreCard}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8, marginBottom: 8 }}>
            <Text style={styles.scoreNumber}>{score.mean.toFixed(1)}</Text>
            <Text style={{ fontSize: 16, color: "#8B6F5E99", paddingBottom: 6 }}>/ 7.0</Text>
          </View>
          <Text style={{ fontSize: 20, color: "#8B6F5E", fontFamily: "Helvetica-Bold", marginBottom: 8 }}>
            {score.category} · {score.percentile}
          </Text>
          <View style={styles.scoreBar}>
            <View
              style={[styles.scoreBarFill, { width: `${((score.mean - 1) / 6) * 100}%` }]}
            />
          </View>
          <Text style={[styles.bodyText, { marginTop: 12 }]}>{score.description}</Text>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.label}>Your Leader's Top Strengths</Text>
            {strengths.map((item) => (
              <View key={item.id} style={styles.miniCard}>
                <Text style={styles.attributeTag}>{item.attribute}</Text>
                <Text style={[styles.bodyText, { fontSize: 9, marginBottom: 4 }]}>
                  {item.text}
                </Text>
                <Text style={{ fontSize: 14, color: "#22C55E", fontFamily: "Helvetica-Bold" }}>
                  {item.score}<Text style={{ fontSize: 9, color: "#999" }}>/7</Text>
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Growth Opportunities</Text>
            {growthAreas.map((item) => (
              <View key={item.id} style={styles.miniCard}>
                <Text style={styles.attributeTag}>{item.attribute}</Text>
                <Text style={[styles.bodyText, { fontSize: 9, marginBottom: 4 }]}>
                  {item.text}
                </Text>
                <Text style={{ fontSize: 14, color: "#F59E0B", fontFamily: "Helvetica-Bold" }}>
                  {item.score}<Text style={{ fontSize: 9, color: "#999" }}>/7</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.pageNumber}>3</Text>
      </Page>

      {/* ── PAGE 4: ALL 18 ITEMS ────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Complete Item Scores</Text>
        <Text style={styles.h2}>Your 18-Item Profile</Text>
        <Text style={[styles.bodyText, { marginBottom: 16 }]}>
          Scores on each item of the Positively Energizing Leadership Scale
          (1 = Strongly Disagree, 7 = Strongly Agree)
        </Text>

        {PELS_ITEMS.map((item) => {
          const s = responses[item.id] || 0;
          return (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.bodyText, { fontSize: 8, color: "#8B6F5E", marginBottom: 2 }]}>
                  {item.attribute}
                </Text>
                <Text style={styles.itemText}>{item.text}</Text>
              </View>
              <View style={{ width: 60, alignItems: "flex-end" }}>
                <Text style={styles.itemScore}>{s}</Text>
                <View style={{ width: 40, height: 3, backgroundColor: "#E8E0D8", borderRadius: 2, marginTop: 3 }}>
                  <View
                    style={{
                      width: `${(s / 7) * 100}%`,
                      height: 3,
                      backgroundColor: s >= 5 ? "#22C55E" : s >= 3 ? "#F59E0B" : "#EF4444",
                      borderRadius: 2,
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}

        <Text style={styles.pageNumber}>4</Text>
      </Page>

      {/* ── PAGE 5: PERMA+4 WELL-BEING PROFILE ───────────── */}
      {permaScore && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Workplace Well-Being Profile</Text>
          <Text style={styles.h2}>PERMA+4 Results</Text>
          <Text style={[styles.bodyText, { marginBottom: 16 }]}>
            The PERMA+4 Workplace Well-Being Scale (Donaldson &amp; Donaldson, 2020) measures
            9 dimensions of well-being at work on a 1–10 scale.
          </Text>

          {/* Total score callout */}
          <View style={{
            backgroundColor: "#F7F3EE",
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            borderWidth: 1,
            borderColor: "#C4956A33",
          }}>
            <Text style={{ fontSize: 36, color: "#8B6F5E", fontFamily: "Helvetica" }}>
              {permaScore.totalMean.toFixed(1)}
            </Text>
            <View>
              <Text style={{ fontSize: 10, color: "#8B6F5E99" }}>/ 10</Text>
              <Text style={{ fontSize: 10, color: "#555", marginTop: 2 }}>Overall Well-Being Mean</Text>
            </View>
          </View>

          {/* Horizontal bar chart using View elements */}
          {PERMA_SUBSCALES.map((sub) => {
            const subScore = permaScore.subscaleScores[sub.key] || 0;
            const interp = getPermaInterpretation(sub.key, subScore);
            return (
              <View key={sub.key} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                  <Text style={{ fontSize: 9, color: "#555", fontFamily: "Helvetica-Bold" }}>
                    {sub.label}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#8B6F5E", fontFamily: "Helvetica-Bold" }}>
                    {subScore.toFixed(1)} — {interp.level}
                  </Text>
                </View>
                <View style={{ height: 8, backgroundColor: "#E8E0D8", borderRadius: 4 }}>
                  <View
                    style={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: sub.color,
                      width: `${(subScore / 10) * 100}%`,
                    }}
                  />
                </View>
              </View>
            );
          })}

          {/* Highest/Lowest callout cards */}
          <View style={[styles.twoCol, { marginTop: 16 }]}>
            <View style={styles.col}>
              <Text style={styles.label}>Strongest Area</Text>
              <View style={styles.miniCard}>
                <Text style={styles.attributeTag}>{permaScore.highest.label}</Text>
                <Text style={{ fontSize: 16, color: "#22C55E", fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
                  {permaScore.highest.score.toFixed(1)}<Text style={{ fontSize: 9, color: "#999" }}>/10</Text>
                </Text>
                <Text style={[styles.bodyText, { fontSize: 8 }]}>
                  {getPermaInterpretation(permaScore.highest.key, permaScore.highest.score).text}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Growth Opportunity</Text>
              <View style={styles.miniCard}>
                <Text style={styles.attributeTag}>{permaScore.lowest.label}</Text>
                <Text style={{ fontSize: 16, color: "#F59E0B", fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
                  {permaScore.lowest.score.toFixed(1)}<Text style={{ fontSize: 9, color: "#999" }}>/10</Text>
                </Text>
                <Text style={[styles.bodyText, { fontSize: 8 }]}>
                  {getPermaInterpretation(permaScore.lowest.key, permaScore.lowest.score).text}
                </Text>
              </View>
            </View>
          </View>

          {/* Leadership connection */}
          <View style={{ marginTop: 12, backgroundColor: "#F7F3EE", borderRadius: 8, padding: 12 }}>
            <Text style={styles.label}>Connection to Leadership</Text>
            <Text style={[styles.bodyText, { fontSize: 8 }]}>
              {getPermaRelationToLeadership(permaScore.lowest.key, permaScore.lowest.score, score.category)}
            </Text>
          </View>

          {/* Citation */}
          <Text style={[styles.bodyText, { fontSize: 7, color: "#AAAAAA", marginTop: 12, fontFamily: "Helvetica-Oblique" }]}>
            Donaldson, S. I., &amp; Donaldson, S. I. (2020). The Positive Functioning at Work Scale.
            Journal of Well-Being Assessment, 4(2), 181–215. DOI: 10.1007/s41543-020-00033-1
          </Text>

          <Text style={styles.pageNumber}>5</Text>
        </Page>
      )}

      {/* ── PAGE 6: STORIES ─────────────────────────────── */}
      {(data.story_one || data.story_two || data.wellbeing_q1) && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Your Leadership Narratives</Text>
          <Text style={[styles.h2, { marginBottom: 4 }]}>Stories & Reflections</Text>
          <Text style={[styles.bodyText, { marginBottom: 20 }]}>
            These narratives provide rich qualitative context about your experience of
            leadership and form part of the research dataset.
          </Text>

          {data.story_one && (
            <View style={styles.storyBox}>
              <Text style={styles.storyLabel}>Story One — A Moment of Energy</Text>
              <Text style={styles.storyText}>{data.story_one}</Text>
            </View>
          )}

          {data.story_two && (
            <View style={styles.storyBox}>
              <Text style={styles.storyLabel}>Story Two — A Moment of Care</Text>
              <Text style={styles.storyText}>{data.story_two}</Text>
            </View>
          )}

          {data.wellbeing_q1 && (
            <View>
              <Text style={styles.label}>
                How does your leader show they care about your well-being?
              </Text>
              <Text style={[styles.bodyText, { marginBottom: 10 }]}>{data.wellbeing_q1}</Text>
            </View>
          )}
          {data.wellbeing_q2 && (
            <View>
              <Text style={styles.label}>
                What most positively affects your energy and motivation?
              </Text>
              <Text style={[styles.bodyText, { marginBottom: 10 }]}>{data.wellbeing_q2}</Text>
            </View>
          )}
          {data.wellbeing_q3 && (
            <View>
              <Text style={styles.label}>
                If you could change one thing about leadership support?
              </Text>
              <Text style={styles.bodyText}>{data.wellbeing_q3}</Text>
            </View>
          )}

          <Text style={styles.pageNumber}>6</Text>
        </Page>
      )}

      {/* ── INTERVENTIONS ────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Evidence-Based Practices</Text>
        <Text style={styles.h2}>Your Personalized Recommendations</Text>
        <Text style={[styles.bodyText, { marginBottom: 4 }]}>
          Based on your PELS score ({score.category}), the following evidence-based
          practices are recommended to strengthen your well-being at work.
        </Text>
        <Text style={[styles.bodyText, { marginBottom: 20, fontFamily: "Helvetica-Oblique", fontSize: 9 }]}>
          Source: Burke, J., Dunne, P.J., Meehan, T., O'Boyle, C.A., & van Nieuwerburgh, C. (2023).
          Positive Health: 100+ Research-Based Positive Psychology and Lifestyle Medicine Tools.
          Routledge. DOI: 10.4324/9781003279594
        </Text>

        {interventions.map((intervention) => (
          <View key={intervention.id} style={styles.interventionCard}>
            <Text style={styles.interventionTitle}>
              {intervention.icon} {intervention.title}
            </Text>
            <View style={styles.interventionMeta}>
              <Text style={styles.interventionMetaText}>⏱ {intervention.duration}</Text>
              <Text style={styles.interventionMetaText}>🔁 {intervention.frequency}</Text>
              <Text style={styles.interventionMetaText}>{intervention.category}</Text>
            </View>
            <Text style={[styles.bodyText, { marginBottom: 8 }]}>
              {intervention.description}
            </Text>
            <Text style={styles.label}>How to Practice</Text>
            <Text style={[styles.bodyText, { marginBottom: 4 }]}>
              {intervention.practice}
            </Text>
            <Text style={styles.label}>The Evidence</Text>
            <Text style={[styles.bodyText, { fontFamily: "Helvetica-Oblique", fontSize: 9 }]}>
              {intervention.evidence}
            </Text>
          </View>
        ))}

        <Text style={styles.pageNumber}>6</Text>
      </Page>

      {/* ── FINAL PAGE: REFERENCES ──────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>References & Citation</Text>
        <Text style={styles.h2}>Academic References</Text>

        <View style={styles.referenceBox}>
          <Text style={styles.referenceText}>
            Scale Reference (please cite when using the PELS):{"\n\n"}
            Burke, J., Dunne, P.J., Meehan, T., O'Boyle, C.A., & van Nieuwerburgh, C. (2023).{"\n"}
            Positive Health: 100+ Research-Based Positive Psychology and Lifestyle Medicine Tools.{"\n"}
            Routledge. DOI: 10.4324/9781003279594{"\n\n"}
            Cameron, K. S. (2021). Positively energizing leadership: Virtuous actions and{"\n"}
            relationships that create high performance. Berrett-Koehler Publishers.{"\n\n"}
            Owens, B., Baker, W., Sumpter, D., & Cameron, K. (2015). Relational energy at work:{"\n"}
            Implications for job engagement and job performance. Journal of Applied Psychology, 101.{"\n"}
            https://doi.org/10.1037/apl0000032{"\n\n"}
            Hobfoll, S. E. (1989). Conservation of resources: A new attempt at conceptualizing{"\n"}
            stress. American Psychologist, 44(3), 513–524.{"\n\n"}
            Seligman, M. E. P., Steen, T. A., Park, N., & Peterson, C. (2005). Positive{"\n"}
            psychology progress: Empirical validation of interventions. American Psychologist,{"\n"}
            60(5), 410–421.{"\n\n"}
            Donaldson, S. I., & Donaldson, S. I. (2020). The Positive Functioning at Work Scale:{"\n"}
            Psychometric Assessment, Validation, and Measurement Invariance. Journal of Well-Being{"\n"}
            Assessment, 4(2), 181–215. DOI: 10.1007/s41543-020-00033-1
          </Text>
        </View>

        <View style={styles.hr} />
        <Text style={[styles.bodyText, { fontSize: 8, color: "#AAAAAA", textAlign: "center" }]}>
          This report was generated by the PELS Platform · IRB Protocol #853470 ·
          University of Pennsylvania · {date}
          {assessmentId ? `\nAssessment ID: ${assessmentId}` : ""}
        </Text>
      </Page>
    </Document>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 8, color: "#8B6F5E", fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 11, color: "#2D2D2D", fontFamily: "Helvetica" }}>{value}</Text>
    </View>
  );
}
