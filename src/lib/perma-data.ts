// ============================================================
// PERMA+4 WORKPLACE WELL-BEING SCALE — CORE DATA
// 29-item scale measuring 9 dimensions of workplace well-being
// Donaldson, S. I., & Donaldson, S. I. (2020)
// ============================================================

// ─── 9 SUBSCALES ────────────────────────────────────────────

export interface PermaSubscale {
  key: string;
  label: string;
  shortLabel: string;
  color: string;
  items: number[];
}

export const PERMA_SUBSCALES: PermaSubscale[] = [
  { key: "PE", label: "Positive Emotion", shortLabel: "Positive\nEmotion", color: "#E8A87C", items: [1, 2, 3] },
  { key: "EN", label: "Engagement", shortLabel: "Engagement", color: "#D4A373", items: [4, 5, 6] },
  { key: "REL", label: "Relationships", shortLabel: "Relationships", color: "#C4956A", items: [7, 8, 9, 10] },
  { key: "MEAN", label: "Meaning", shortLabel: "Meaning", color: "#8B6F5E", items: [11, 12, 13] },
  { key: "ACC", label: "Accomplishment", shortLabel: "Accomplish-\nment", color: "#85A392", items: [14, 15, 16] },
  { key: "PH", label: "Physical Health", shortLabel: "Physical\nHealth", color: "#7FB069", items: [17, 18, 19, 20] },
  { key: "MIND", label: "Mindset", shortLabel: "Mindset", color: "#6B9AC4", items: [21, 22, 23] },
  { key: "ES", label: "Economic Security", shortLabel: "Economic\nSecurity", color: "#B5838D", items: [24, 25, 26] },
  { key: "ENV", label: "Environment", shortLabel: "Environment", color: "#97C1A9", items: [27, 28, 29] },
];

// ─── 29 ITEMS ───────────────────────────────────────────────

export interface PermaItem {
  id: number;
  subscaleKey: string;
  text: string;
}

export const PERMA_ITEMS: PermaItem[] = [
  // Positive Emotion (PE)
  { id: 1, subscaleKey: "PE", text: "I feel joy in a typical workday." },
  { id: 2, subscaleKey: "PE", text: "Overall, I feel enthusiastic about my work." },
  { id: 3, subscaleKey: "PE", text: "I love my job." },

  // Engagement (EN)
  { id: 4, subscaleKey: "EN", text: "I typically become absorbed while I am working on something that challenges my abilities." },
  { id: 5, subscaleKey: "EN", text: "I lose track of time while doing something I enjoy at work." },
  { id: 6, subscaleKey: "EN", text: "When I am working on something I enjoy, I forget everything else around me." },

  // Relationships (REL)
  { id: 7, subscaleKey: "REL", text: "I can receive support from others when I need it." },
  { id: 8, subscaleKey: "REL", text: "I feel appreciated by my workers." },
  { id: 9, subscaleKey: "REL", text: "I trust my colleagues." },
  { id: 10, subscaleKey: "REL", text: "My colleagues bring out my best self." },

  // Meaning (MEAN)
  { id: 11, subscaleKey: "MEAN", text: "My work is meaningful." },
  { id: 12, subscaleKey: "MEAN", text: "I understand what makes my job meaningful." },
  { id: 13, subscaleKey: "MEAN", text: "The work I do serves a greater purpose." },

  // Accomplishment (ACC)
  { id: 14, subscaleKey: "ACC", text: "I set goals that help me achieve my career aspirations." },
  { id: 15, subscaleKey: "ACC", text: "I typically accomplish what I set out to do in my job." },
  { id: 16, subscaleKey: "ACC", text: "I am generally satisfied with my performance at work." },

  // Physical Health (PH)
  { id: 17, subscaleKey: "PH", text: "I typically feel physically healthy." },
  { id: 18, subscaleKey: "PH", text: "I am rarely sick." },
  { id: 19, subscaleKey: "PH", text: "I can typically overcome sources of physical distress (e.g., insomnia, injuries, vision issues, etc.)" },
  { id: 20, subscaleKey: "PH", text: "I feel in control of my physical health." },

  // Mindset (MIND)
  { id: 21, subscaleKey: "MIND", text: "I believe I can improve my job skills through hard work." },
  { id: 22, subscaleKey: "MIND", text: "I believe my job will allow me to develop in the future." },
  { id: 23, subscaleKey: "MIND", text: "I have a bright future at my current work organization." },

  // Economic Security (ES)
  { id: 24, subscaleKey: "ES", text: "I am comfortable with my current income." },
  { id: 25, subscaleKey: "ES", text: "I could lose several months of pay due to serious illness, and still have my economic security." },
  { id: 26, subscaleKey: "ES", text: "In the event of a financial emergency, I have adequate savings." },

  // Environment (ENV)
  { id: 27, subscaleKey: "ENV", text: "My physical work environment (e.g., office space) allows me to focus on my work." },
  { id: 28, subscaleKey: "ENV", text: "There is plenty of natural light in my workplace." },
  { id: 29, subscaleKey: "ENV", text: "I can conveniently access nature in my work environment (e.g., parks, oceans, mountains, etc.)" },
];

// ─── LIKERT SCALE (1–7) ───────────────────────────────────

export const PERMA_LIKERT = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Somewhat Disagree" },
  { value: 4, label: "Neither Agree nor Disagree" },
  { value: 5, label: "Somewhat Agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly Agree" },
];

// ─── SCORING ────────────────────────────────────────────────

export interface PermaScore {
  subscaleScores: Record<string, number>;
  totalMean: number;
  highest: { key: string; label: string; score: number };
  lowest: { key: string; label: string; score: number };
}

export function scorePerma(responses: Record<number, number>): PermaScore {
  const subscaleScores: Record<string, number> = {};

  PERMA_SUBSCALES.forEach((sub) => {
    const values = sub.items.map((id) => responses[id]).filter(Boolean);
    subscaleScores[sub.key] = values.length > 0
      ? values.reduce((sum, v) => sum + v, 0) / values.length
      : 0;
  });

  // Total mean = mean of all 29 raw items (not mean of means)
  const allValues = Object.values(responses).filter(Boolean);
  const totalMean = allValues.length > 0
    ? allValues.reduce((sum, v) => sum + v, 0) / allValues.length
    : 0;

  // Find highest and lowest
  const sorted = PERMA_SUBSCALES
    .map((sub) => ({ key: sub.key, label: sub.label, score: subscaleScores[sub.key] }))
    .sort((a, b) => b.score - a.score);

  return {
    subscaleScores,
    totalMean,
    highest: sorted[0],
    lowest: sorted[sorted.length - 1],
  };
}

// ─── INTERPRETATION ─────────────────────────────────────────

type InterpretationLevel = "Strong" | "Moderate" | "Developing" | "Low";

const SUBSCALE_DESCRIPTIONS: Record<string, Record<InterpretationLevel, string>> = {
  PE: {
    Strong: "You experience high levels of positive emotion at work, which fuels creativity and resilience.",
    Moderate: "You experience adequate positive emotion at work, with room to cultivate more joy and enthusiasm.",
    Developing: "Your positive emotions at work may be inconsistent — intentional practices could help.",
    Low: "You may be experiencing limited positive emotion at work, which can affect motivation and energy.",
  },
  EN: {
    Strong: "You regularly experience deep engagement and flow states in your work.",
    Moderate: "You experience engagement at work but may not consistently reach flow states.",
    Developing: "You may find it difficult to become fully absorbed in your work tasks.",
    Low: "Deep engagement at work appears to be rare — finding more challenging or interesting tasks could help.",
  },
  REL: {
    Strong: "You have strong, supportive workplace relationships that bring out your best.",
    Moderate: "Your workplace relationships are generally positive, with room for deeper connection.",
    Developing: "Your workplace relationships may lack consistency in support and appreciation.",
    Low: "Building stronger workplace connections could significantly improve your well-being.",
  },
  MEAN: {
    Strong: "You have a clear sense of meaning and purpose in your work.",
    Moderate: "You find your work meaningful overall, though this sense may not always feel salient.",
    Developing: "Your connection to meaning at work may benefit from reflection and intentional alignment.",
    Low: "Reconnecting with the purpose behind your work could be a powerful growth area.",
  },
  ACC: {
    Strong: "You set and achieve goals effectively, with strong satisfaction in your performance.",
    Moderate: "You generally accomplish what you set out to do, with room to sharpen goal-setting.",
    Developing: "Your sense of accomplishment at work may be inconsistent or undersupported.",
    Low: "Clearer goals and more frequent wins could help build your sense of achievement.",
  },
  PH: {
    Strong: "You feel physically healthy and in control of your physical well-being.",
    Moderate: "Your physical health is adequate, though there may be areas to improve.",
    Developing: "Physical health challenges may be affecting your energy and performance at work.",
    Low: "Investing in physical health could have a significant positive impact on your work life.",
  },
  MIND: {
    Strong: "You have a strong growth mindset and see a bright future in your organization.",
    Moderate: "You generally believe in your ability to grow, with some uncertainty about the future.",
    Developing: "Your mindset about growth and future opportunities may need reinforcement.",
    Low: "A shift in mindset toward growth and possibility could open new pathways for you.",
  },
  ENV: {
    Strong: "Your physical work environment supports focus, health, and well-being.",
    Moderate: "Your work environment is adequate but could better support your productivity.",
    Developing: "Your work environment may be hindering your ability to focus and thrive.",
    Low: "Significant improvements to your work environment could boost your well-being.",
  },
  ES: {
    Strong: "You feel financially secure, which provides a strong foundation for well-being.",
    Moderate: "You have adequate financial security, though some concerns may remain.",
    Developing: "Financial concerns may be creating stress that affects your work well-being.",
    Low: "Economic security is a significant concern — addressing it could reduce stress considerably.",
  },
};

export function getPermaInterpretation(
  subscaleKey: string,
  score: number
): { level: InterpretationLevel; text: string } {
  let level: InterpretationLevel;
  if (score >= 5.5) level = "Strong";
  else if (score >= 4.0) level = "Moderate";
  else if (score >= 2.5) level = "Developing";
  else level = "Low";

  const text = SUBSCALE_DESCRIPTIONS[subscaleKey]?.[level] || "";
  return { level, text };
}

// ─── LEADERSHIP CONNECTION (for PDF) ────────────────────────

const LEADERSHIP_CONNECTIONS: Record<string, string> = {
  PE: "Positive emotions at work are amplified by positively energizing leaders who create upward spirals of vitality.",
  EN: "Engagement deepens when leaders provide autonomy, challenge, and support — key elements of energizing leadership.",
  REL: "Workplace relationships thrive under leaders who model trust, empathy, and genuine connection.",
  MEAN: "Leaders who help employees connect their work to a larger purpose strengthen this dimension.",
  ACC: "Accomplishment is supported by leaders who set high standards while providing encouragement and resources.",
  PH: "Leaders who model and support healthy behaviors contribute to employees' physical well-being.",
  MIND: "Growth mindset flourishes under leaders who invest in development and communicate belief in potential.",
  ENV: "Leaders influence the physical and psychological environment in which work takes place.",
  ES: "While not always within a leader's direct control, advocacy for fair compensation reflects care for well-being.",
};

export function getPermaRelationToLeadership(
  subscaleKey: string,
  permaScore: number,
  pelsCategory: string
): string {
  const connection = LEADERSHIP_CONNECTIONS[subscaleKey] || "";
  const interpretation = getPermaInterpretation(subscaleKey, permaScore);

  if (interpretation.level === "Strong" || interpretation.level === "Moderate") {
    return `${connection} Your ${interpretation.level.toLowerCase()} score here, combined with a ${pelsCategory} leadership profile, suggests a supportive alignment between your well-being and leadership experience.`;
  }
  return `${connection} Your ${interpretation.level.toLowerCase()} score here, alongside a ${pelsCategory} leadership profile, suggests this may be an area where additional support — from your leader or through personal practice — could make a meaningful difference.`;
}
