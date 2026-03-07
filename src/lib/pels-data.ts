// ============================================================
// PELS PLATFORM — CORE DATA
// Scale items, scoring logic, and intervention library
// ============================================================

// ─── 18-ITEM PELS SCALE ─────────────────────────────────────
// Items validated across 603 participants (α = .97–.98)
// Stem: "Please rate the extent to which you agree or disagree
//        with the following statements about your direct supervisor."
// Scale: 1 (Strongly Disagree) → 7 (Strongly Agree)

export const PELS_ITEMS = [
  {
    id: 1,
    attribute: "Gratitude",
    text: "My supervisor expresses genuine gratitude for my contributions.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 2,
    attribute: "Confidence",
    text: "My supervisor instills confidence in me.",
    subdomain: "Relational Energy",
  },
  {
    id: 3,
    attribute: "Humility",
    text: "My supervisor demonstrates humility in interactions with others.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 4,
    attribute: "Forgiveness",
    text: "My supervisor responds to mistakes with understanding rather than blame.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 5,
    attribute: "Empathic Listening",
    text: "My supervisor listens empathically when I share concerns or ideas.",
    subdomain: "Relational Energy",
  },
  {
    id: 6,
    attribute: "Trust",
    text: "My supervisor demonstrates trust in my ability to do my work well.",
    subdomain: "Relational Energy",
  },
  {
    id: 7,
    attribute: "Meaning",
    text: "My supervisor helps me find meaning and purpose in my work.",
    subdomain: "Relational Energy",
  },
  {
    id: 8,
    attribute: "Positive Energy",
    text: "My supervisor creates a sense of positive energy in our interactions.",
    subdomain: "Relational Energy",
  },
  {
    id: 9,
    attribute: "Authenticity",
    text: "My supervisor is authentic and genuine in how they engage with others.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 10,
    attribute: "Compassion",
    text: "My supervisor demonstrates genuine compassion for those they lead.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 11,
    attribute: "Care for Well-Being",
    text: "My supervisor genuinely cares about my well-being.",
    subdomain: "Relational Energy",
  },
  {
    id: 12,
    attribute: "Optimism",
    text: "My supervisor promotes optimism and a positive outlook, even during challenges.",
    subdomain: "Relational Energy",
  },
  {
    id: 13,
    attribute: "Integrity",
    text: "My supervisor consistently acts with integrity and strong moral principles.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 14,
    attribute: "Psychological Safety",
    text: "My supervisor creates an environment where I feel psychologically safe.",
    subdomain: "Relational Energy",
  },
  {
    id: 15,
    attribute: "Encouragement",
    text: "My supervisor actively encourages my growth and contributions.",
    subdomain: "Relational Energy",
  },
  {
    id: 16,
    attribute: "High Standards",
    text: "My supervisor holds high standards while supporting me in meeting them.",
    subdomain: "Virtuous Behavior",
  },
  {
    id: 17,
    attribute: "Connection",
    text: "My supervisor builds genuine, high-quality connections with members of our team.",
    subdomain: "Relational Energy",
  },
  {
    id: 18,
    attribute: "Development",
    text: "My supervisor invests in my personal and professional development.",
    subdomain: "Relational Energy",
  },
];

export const LIKERT_LABELS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Somewhat Disagree" },
  { value: 4, label: "Neither Agree nor Disagree" },
  { value: 5, label: "Somewhat Agree" },
  { value: 6, label: "Agree" },
  { value: 7, label: "Strongly Agree" },
];

// ─── SCORING & INTERPRETATION ───────────────────────────────
// Mean score range: 1.0 – 7.0
// Based on normative data from validation studies (N=603)

export type PELSCategory = "Flourishing" | "Thriving" | "Developing" | "Emerging";

export interface PELSScore {
  total: number;
  mean: number;
  category: PELSCategory;
  percentile: string;
  description: string;
  color: string;
  bgColor: string;
}

export function scorePELS(responses: Record<number, number>): PELSScore {
  const values = Object.values(responses).filter(Boolean);
  if (values.length < 18) throw new Error("Incomplete responses");

  const total = values.reduce((sum, v) => sum + v, 0);
  const mean = total / 18;

  let category: PELSCategory;
  let percentile: string;
  let description: string;
  let color: string;
  let bgColor: string;

  if (mean >= 5.5) {
    category = "Flourishing";
    percentile = "Top 25%";
    description =
      "Your leader demonstrates exceptional positively energizing leadership. Research shows leaders in this range are strongly associated with employee flourishing, high engagement, and sustained well-being. Their virtuous behaviors and relational energy create powerful upward spirals of vitality and performance.";
    color = "text-emerald-700";
    bgColor = "bg-emerald-50 border-emerald-200";
  } else if (mean >= 4.0) {
    category = "Thriving";
    percentile = "Top 50%";
    description =
      "Your leader demonstrates solid positively energizing leadership. They regularly exhibit virtuous behaviors and generate meaningful relational energy, contributing positively to your engagement and well-being. There is meaningful opportunity to grow into an even more energizing presence.";
    color = "text-blue-700";
    bgColor = "bg-blue-50 border-blue-200";
  } else if (mean >= 2.5) {
    category = "Developing";
    percentile = "Bottom 50%";
    description =
      "Your leader shows some positively energizing behaviors but inconsistently. Research suggests that leaders in this range may be depleting rather than generating relational energy in some interactions, which can affect employee engagement and well-being over time. Targeted development opportunities could make a meaningful difference.";
    color = "text-amber-700";
    bgColor = "bg-amber-50 border-amber-200";
  } else {
    category = "Emerging";
    percentile = "Bottom 25%";
    description =
      "Your responses suggest limited presence of positively energizing leadership behaviors. This may be significantly affecting your engagement and well-being at work. The evidence-based practices below are designed to support you, and may be worth discussing with your leader or HR partner.";
    color = "text-rose-700";
    bgColor = "bg-rose-50 border-rose-200";
  }

  return { total, mean, category, percentile, description, color, bgColor };
}

// ─── OPEN-ENDED INTAKE QUESTIONS ────────────────────────────

export const STORY_PROMPTS = [
  {
    id: "story_one",
    title: "Story One: A Moment of Energy",
    prompt:
      "Think of a specific time when your leader made you feel energized, valued, or inspired at work. Describe what happened — what did your leader say or do, and how did it affect you? (Please write at least 3–5 sentences.)",
    placeholder:
      "For example: 'There was a time when I was really struggling with a project deadline...'",
    required: true,
  },
  {
    id: "story_two",
    title: "Story Two: A Moment of Care",
    prompt:
      "Think of a specific time when your leader showed genuine care for your well-being — either professionally or personally. What did they do, and what did it mean to you?",
    placeholder:
      "For example: 'During a particularly stressful period at work, my leader...'",
    required: false,
  },
];

export const WELLBEING_QUESTIONS = [
  {
    id: "wellbeing_q1",
    question:
      "How does your leader show that they care about your well-being at work? Please describe as specifically as possible.",
    placeholder: "Think about specific words, actions, or behaviors you have noticed...",
  },
  {
    id: "wellbeing_q2",
    question:
      "What does your leader do that most positively affects your energy and motivation at work?",
    placeholder: "What specific behaviors or qualities leave you feeling more energized?",
  },
  {
    id: "wellbeing_q3",
    question:
      "If you could change one thing about how your leader supports your well-being or growth at work, what would it be?",
    placeholder: "There are no wrong answers — this helps identify growth opportunities...",
  },
];

// ─── EVIDENCE-BASED INTERVENTIONS ───────────────────────────
// From: Burke, J., Dunne, P.J., Meehan, T., O'Boyle, C.A., & van Nieuwerburgh, C. (2023).
// Positive Health: 100+ Research-Based Positive Psychology and Lifestyle Medicine Tools.
// Routledge. DOI: 10.4324/9781003279594

export interface Intervention {
  id: string;
  title: string;
  category: string;
  icon: string;
  tagline: string;
  description: string;
  practice: string;
  evidence: string;
  duration: string;
  frequency: string;
  forScoreRange: PELSCategory[];
  relatedPELAttribute: string;
  source: string;
}

export const INTERVENTIONS: Intervention[] = [
  // ── FEELING GOOD TOOLS ──────────────────────────────
  {
    id: "gratitude-journal",
    title: "Gratitude Journaling",
    category: "Feeling-Good Tools",
    icon: "✍️",
    tagline: "Build a daily appreciation practice that rewires positivity",
    description:
      "Gratitude journaling is one of the most well-researched positive psychology interventions. It involves writing down things you are grateful for on a regular basis, shifting attention toward positive experiences in your work and life.",
    practice:
      "Each evening, write down three to five specific things you are grateful for at work. Be as specific as possible — not just 'my team' but 'the way my colleague offered to help me during Tuesday's presentation.' Aim to write for 10–15 minutes, 3 times per week.",
    evidence:
      "Research shows that gratitude journaling significantly increases positive emotions, life satisfaction, and subjective well-being, while reducing symptoms of depression and anxiety (Seligman et al., 2005). In the workplace, gratitude has been linked to improved job satisfaction and interpersonal relationships.",
    duration: "10–15 minutes",
    frequency: "3× per week",
    forScoreRange: ["Developing", "Emerging", "Thriving"],
    relatedPELAttribute: "Gratitude",
    source: "Burke et al. (2023), Chapter 5: Feeling-Good Tools",
  },
  {
    id: "strengths-use",
    title: "Strengths Spotting at Work",
    category: "Feeling-Good Tools",
    icon: "💪",
    tagline: "Identify and intentionally apply your core character strengths",
    description:
      "Using your character strengths in new ways is a cornerstone positive psychology intervention. Understanding and deploying your unique strengths at work leads to greater engagement, meaning, and well-being.",
    practice:
      "Complete the free VIA Character Strengths Survey at viacharacter.org (takes ~15 minutes). Review your top 5 signature strengths. Each day for the next week, find at least one intentional new way to use one of your top strengths at work. Reflect on how it felt at the end of the day.",
    evidence:
      "Using strengths in new ways is associated with increased happiness and reduced depressive symptoms (Seligman et al., 2005). In organizational settings, strengths use is linked to higher engagement, intrinsic motivation, and performance.",
    duration: "15 min survey + 5–10 min daily reflection",
    frequency: "Daily for 1 week, then weekly",
    forScoreRange: ["Flourishing", "Thriving", "Developing", "Emerging"],
    relatedPELAttribute: "Development",
    source: "Burke et al. (2023), Chapter 5: Feeling-Good Tools",
  },
  {
    id: "reminiscing",
    title: "Positive Reminiscing",
    category: "Feeling-Good Tools",
    icon: "🌟",
    tagline: "Revisit positive memories to amplify present well-being",
    description:
      "Positive reminiscing involves deliberately reflecting on and savoring positive past experiences at work. This practice activates positive emotions and helps counterbalance the negativity bias that can cloud our perception of our work environment.",
    practice:
      "Set aside 15–20 minutes. Close your eyes and vividly recall a time at work when you felt truly engaged, valued, or proud. Replay the memory in detail — who was there, what happened, how you felt. Then write about it. Notice how the memory affects your current emotional state.",
    evidence:
      "Reminiscing about positive experiences strengthens positive emotional memories and increases well-being (Burke et al., 2023). It activates the parasympathetic nervous system, reducing stress and increasing feelings of connection.",
    duration: "15–20 minutes",
    frequency: "Weekly",
    forScoreRange: ["Developing", "Emerging"],
    relatedPELAttribute: "Positive Energy",
    source: "Burke et al. (2023), Chapter 5: Feeling-Good Tools",
  },

  // ── RELATIONSHIP TOOLS ──────────────────────────────
  {
    id: "capitalisation",
    title: "Active-Constructive Responding",
    category: "Relationship Tools",
    icon: "🤝",
    tagline: "Amplify positive events through enthusiastic, engaged responses",
    description:
      "Capitalisation is the act of sharing good news with others who respond enthusiastically and constructively. When leaders respond to employees' good news with genuine enthusiasm and elaboration, it amplifies positive emotions and strengthens relationships — a core component of positively energizing leadership.",
    practice:
      "When a colleague or team member shares good news, practice the 'Active-Constructive Response': (1) Express genuine enthusiasm — 'That's wonderful!' (2) Ask elaborating questions that help them relive the experience — 'Tell me more, how did it happen?' (3) Recognize their effort — 'You worked really hard for this.' Practice this intentionally 2–3 times per week.",
    evidence:
      "Active-constructive responding to positive events has been shown to increase positive affect, relationship satisfaction, and feelings of being understood and cared for (Gable et al., 2004). It is a key mechanism through which leaders transmit relational energy.",
    duration: "5–10 minutes per interaction",
    frequency: "2–3× per week",
    forScoreRange: ["Flourishing", "Thriving", "Developing"],
    relatedPELAttribute: "Care for Well-Being",
    source: "Burke et al. (2023), Chapter 7: Relationship Tools",
  },
  {
    id: "forgiveness",
    title: "Workplace Forgiveness Practice",
    category: "Relationship Tools",
    icon: "🕊️",
    tagline: "Release resentment and rebuild positive relational energy",
    description:
      "Forgiveness is a deliberate decision to let go of resentment and thoughts of revenge following a perceived wrong, replacing them with compassion and goodwill. In workplace contexts, forgiveness predicts lower stress and higher well-being, and is a key attribute of positively energizing leaders.",
    practice:
      "Identify a work situation where you have held onto hurt or frustration. Try the REACH method: (R) Recall the hurt objectively; (E) Empathize — try to understand the other person's perspective; (A) Give the Altruistic gift of forgiveness; (C) Commit to forgive; (H) Hold onto forgiveness when doubts arise. Journal about the process.",
    evidence:
      "Forgiveness interventions significantly reduce anxiety, anger, and stress while increasing hope, life satisfaction, and compassion (Worthington et al., 2015). In organizational settings, forgiveness supports high-quality connections and relational energy.",
    duration: "20–30 minutes",
    frequency: "As needed; revisit monthly",
    forScoreRange: ["Developing", "Emerging"],
    relatedPELAttribute: "Forgiveness",
    source: "Burke et al. (2023), Chapter 7: Relationship Tools",
  },
  {
    id: "kindness",
    title: "Random Acts of Kindness at Work",
    category: "Relationship Tools",
    icon: "💛",
    tagline: "Boost your own well-being while energizing those around you",
    description:
      "Deliberately performing acts of kindness toward colleagues activates positive emotions, strengthens social bonds, and creates energy-generating interactions — directly reflecting the relational energy mechanism at the heart of positively energizing leadership.",
    practice:
      "Once per week, perform five acts of kindness toward colleagues in a single day. They can be small: bring coffee to a colleague, write a specific compliment, offer to help with a task, recognize someone's contribution in a meeting, or check in on someone who seemed stressed. Notice the effect on your own energy.",
    evidence:
      "Performing five acts of kindness in a single day significantly increases positive affect and well-being (Lyubomirsky et al., 2005). Kindness activates reward centers in the brain, benefiting the giver as much as the receiver.",
    duration: "Varies — typically 1–5 minutes each",
    frequency: "1 dedicated 'kindness day' per week",
    forScoreRange: ["Flourishing", "Thriving", "Developing", "Emerging"],
    relatedPELAttribute: "Compassion",
    source: "Burke et al. (2023), Chapter 7: Relationship Tools",
  },

  // ── CALMING / RESTORATION TOOLS ─────────────────────
  {
    id: "meditation-mindfulness",
    title: "Mindfulness Meditation",
    category: "Calming Tools",
    icon: "🧘",
    tagline: "Cultivate calm, reduce burnout, and restore psychological resources",
    description:
      "Mindfulness meditation involves deliberately focusing attention on present-moment experience without judgment. It is one of the most researched psychological interventions and directly builds the psychological resources that support engagement with positively energizing leadership.",
    practice:
      "Start with 10 minutes daily. Sit comfortably, close your eyes, and focus on your breathing — the sensation of air entering and leaving your body. When your mind wanders (it will), gently bring it back without judgment. Apps like Insight Timer, Calm, or Headspace can guide you. Build to 20 minutes over 4 weeks.",
    evidence:
      "Mindfulness meditation significantly reduces anxiety, stress, and burnout while improving focus, emotional regulation, and well-being (Keng et al., 2011). An 8-week online program (12 min/day) improved hedonic and eudaimonic well-being, compassion, and gratitude (Ivtzan et al., 2016).",
    duration: "10–20 minutes",
    frequency: "Daily",
    forScoreRange: ["Developing", "Emerging", "Thriving"],
    relatedPELAttribute: "Psychological Safety",
    source: "Burke et al. (2023), Chapter 2: Calming Tools",
  },
  {
    id: "nature-exposure",
    title: "Nature Breaks",
    category: "Calming Tools",
    icon: "🌿",
    tagline: "Restore cognitive resources and reduce stress through nature contact",
    description:
      "Spending time in or near natural environments — even briefly — activates the parasympathetic nervous system, restores attention, and reduces stress hormones. Nature exposure is a powerful, accessible tool for maintaining the psychological resources needed to thrive at work.",
    practice:
      "Take at least one 15–20 minute walk in a natural setting (park, trail, garden, or near water) each workday, ideally during lunch. Leave your phone behind or on silent. Notice three specific things in nature — a sound, a texture, a color. When outdoors isn't possible, use the 'Imagine yourself in nature' technique: close your eyes and vividly picture a peaceful natural setting for 5–10 minutes.",
    evidence:
      "Nature walks reduce symptoms of depression, anxiety, anger, and fatigue (Bowler et al., 2010). They lower systolic and diastolic blood pressure, resting heart rate, and cortisol levels. Even imagining nature produces measurable restorative effects (Ryan et al., 2010).",
    duration: "15–20 minutes",
    frequency: "Daily or 5× per week",
    forScoreRange: ["Developing", "Emerging", "Thriving", "Flourishing"],
    relatedPELAttribute: "Positive Energy",
    source: "Burke et al. (2023), Chapter 2: Calming Tools",
  },

  // ── MEANING-MAKING TOOLS ─────────────────────────────
  {
    id: "meaning-exploration",
    title: "Work Meaning Exploration",
    category: "Meaning-Making Tools",
    icon: "🔭",
    tagline: "Clarify what gives your work purpose and amplify it",
    description:
      "Exploring and articulating the sources of meaning in your work strengthens purpose, motivation, and psychological well-being. This intervention helps you identify and lean into the aspects of your work that align with your values and strengths.",
    practice:
      "Set aside 30 minutes for a 'meaning audit' of your work. Respond to these questions in writing: (1) What aspects of my work feel most meaningful? (2) Who benefits from what I do, and how? (3) What would be lost if I stopped doing this work? (4) What values does my work allow me to express? Review your responses and identify one specific action this week that deepens your connection to meaning at work.",
    evidence:
      "Eudaimonic well-being — which includes a sense of meaning and purpose — is a stronger predictor of long-term well-being than hedonic pleasure alone. Meaning at work is associated with greater engagement, lower burnout, and better physical health outcomes.",
    duration: "30–45 minutes",
    frequency: "Monthly or quarterly",
    forScoreRange: ["Developing", "Emerging"],
    relatedPELAttribute: "Meaning",
    source: "Burke et al. (2023), Chapter 6: Meaning-Making Tools",
  },
  {
    id: "positive-identity",
    title: "Positive Work Identity",
    category: "Meaning-Making Tools",
    icon: "🪞",
    tagline: "Strengthen your professional identity and sense of purpose",
    description:
      "Building a positive work identity involves clarifying who you are at your best professionally — your core values, strengths, and contributions — and acting from that foundation. This is particularly valuable when leadership energy is inconsistent or depleting.",
    practice:
      "Write a 'Best Possible Professional Self' narrative (15–20 minutes): Imagine yourself in the future, when everything has gone as well as it possibly could professionally. You have worked hard and reached your most important goals. Write in as much detail as possible about what you are doing, how you feel, and what you have achieved. Then re-read it each morning for one week.",
    evidence:
      "Best Possible Self writing consistently increases optimism, positive affect, and well-being, and reduces anxiety (Peters et al., 2010). It activates the motivational system and supports goal pursuit.",
    duration: "20–30 minutes initial + 5 min daily",
    frequency: "Write quarterly; review daily for 1 week",
    forScoreRange: ["Developing", "Emerging", "Thriving"],
    relatedPELAttribute: "Authenticity",
    source: "Burke et al. (2023), Chapter 6: Meaning-Making Tools",
  },

  // ── COPING TOOLS ─────────────────────────────────────
  {
    id: "expressive-writing",
    title: "Expressive Writing",
    category: "Coping Tools",
    icon: "📓",
    tagline: "Process difficult experiences and release their emotional hold",
    description:
      "Expressive writing involves writing about your deepest thoughts and feelings surrounding challenging work experiences. This technique helps you process difficult emotions, gain cognitive clarity, and reduce the mental load of unresolved workplace stress.",
    practice:
      "Choose a challenging work experience or relationship that has been affecting you. For 4 consecutive days, write about it for 15–20 minutes, exploring your deepest thoughts and feelings. Don't worry about grammar or structure. On day 4, try to find one thing you have learned or one way you have grown through the experience.",
    evidence:
      "Expressive writing significantly reduces psychological distress, anxiety, and rumination, and improves immune function and physical health (Pennebaker & Chung, 2011). It is particularly effective for processing interpersonal stressors at work.",
    duration: "15–20 minutes",
    frequency: "4 consecutive days",
    forScoreRange: ["Developing", "Emerging"],
    relatedPELAttribute: "Psychological Safety",
    source: "Burke et al. (2023), Chapter 4: Coping Tools",
  },
  {
    id: "optimism-training",
    title: "Cultivating Optimism",
    category: "Coping Tools",
    icon: "☀️",
    tagline: "Build a realistic yet positive outlook on your work future",
    description:
      "Optimism is not wishful thinking — it is a practiced cognitive style that involves identifying realistic positive possibilities and explanatory styles. Leaders who model optimism generate relational energy; this intervention helps you build your own regardless of your leader's style.",
    practice:
      "Practice the 'Three Good Things' technique: each evening, write down three specific things that went well at work today and why they went well. Focus on your own actions and choices. Also practice reframing: when you notice a negative thought about work, ask 'What else could be true?' and 'What opportunity might be present here?'",
    evidence:
      "Practicing optimism through Three Good Things journaling significantly increases well-being and reduces depressive symptoms with effects lasting up to 6 months (Seligman et al., 2005). Optimism training improves coping, resilience, and performance.",
    duration: "10–15 minutes",
    frequency: "Daily for 1 week; then 3× per week",
    forScoreRange: ["Developing", "Emerging", "Thriving"],
    relatedPELAttribute: "Optimism",
    source: "Burke et al. (2023), Chapter 4: Coping Tools",
  },

  // ── ENERGISING TOOLS ─────────────────────────────────
  {
    id: "physical-activity",
    title: "Movement Breaks",
    category: "Energising Tools",
    icon: "🏃",
    tagline: "Restore physical and mental energy through regular movement",
    description:
      "Physical activity is one of the most powerful evidence-based tools for improving mental health, energy, and well-being. Regular movement builds the physiological resources that support psychological engagement with positive leadership experiences.",
    practice:
      "Integrate three 10–15 minute movement breaks into your workday. This can be a brisk walk, stretching, or light exercise. If possible, take at least one outdoors. Additionally, aim for 150 minutes of moderate aerobic activity per week (e.g., 30 min × 5 days). Start where you are and build gradually.",
    evidence:
      "Regular physical activity is associated with significant reductions in depression (by up to 48%) and anxiety, and large improvements in energy, sleep, and cognitive function (Stubbs et al., 2017). Even brief movement breaks improve mood and mental clarity.",
    duration: "10–30 minutes",
    frequency: "Daily (3 micro-breaks per day)",
    forScoreRange: ["Flourishing", "Thriving", "Developing", "Emerging"],
    relatedPELAttribute: "Positive Energy",
    source: "Burke et al. (2023), Chapter 3: Energising Tools",
  },

  // ── PROSPECTING TOOLS ────────────────────────────────
  {
    id: "hope-building",
    title: "Hope and Goal Pathways",
    category: "Prospecting Tools",
    icon: "🌅",
    tagline: "Build pathways toward your professional goals",
    description:
      "Hope theory distinguishes between the will to achieve goals (agency) and the ways to achieve them (pathways). Building hope at work means identifying meaningful goals and generating multiple routes toward them — a critical resource when workplace support feels limited.",
    practice:
      "Identify one meaningful professional goal. For 20 minutes, write about: (1) Why this goal matters to you; (2) Three different pathways you could take to achieve it; (3) Potential obstacles for each pathway and how you would navigate them; (4) One small step you can take this week. Review monthly and adjust pathways as needed.",
    evidence:
      "Hope interventions increase subjective well-being, work engagement, and performance (Snyder et al., 2002). Hope is a component of psychological capital (PsyCap), which predicts both individual and organizational performance outcomes.",
    duration: "20–30 minutes",
    frequency: "Monthly",
    forScoreRange: ["Developing", "Emerging", "Thriving"],
    relatedPELAttribute: "Confidence",
    source: "Burke et al. (2023), Chapter 8: Prospecting Tools",
  },
  {
    id: "storytelling",
    title: "Strengths-Based Storytelling",
    category: "Emerging Tools",
    icon: "📖",
    tagline: "Use narrative to reconnect with your professional identity and resilience",
    description:
      "Storytelling is a powerful emerging tool in positive psychology. Sharing and reflecting on stories of when you were at your best — personally or professionally — activates identity-affirming narratives that sustain motivation and resilience in challenging work contexts.",
    practice:
      "Write a 'peak experience' story from your work life — a time when you performed at your best, overcame a significant challenge, or made a meaningful impact. Include what the situation was, what you did, and what the outcome was. Then identify: what strengths and values did this story reveal about you? Read the story back to yourself once a week for a month.",
    evidence:
      "Narrative identity work is associated with increased self-understanding, coherence, and psychological well-being. Strengths-based stories activate self-efficacy and provide an emotional reservoir to draw from during difficulties.",
    duration: "30–45 minutes",
    frequency: "Write quarterly; review weekly",
    forScoreRange: ["Flourishing", "Thriving", "Developing", "Emerging"],
    relatedPELAttribute: "Authenticity",
    source: "Burke et al. (2023), Chapter 9: Emerging Tools",
  },
];

// Select personalized interventions based on PELS score and lowest items
export function getPersonalizedInterventions(
  category: PELSCategory,
  responses: Record<number, number>,
  count: number = 5
): Intervention[] {
  // Find lowest-scoring items
  const sortedItems = Object.entries(responses)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 6)
    .map(([id]) => parseInt(id));

  const lowestAttributes = sortedItems
    .map((id) => PELS_ITEMS.find((item) => item.id === id)?.attribute)
    .filter(Boolean);

  // Filter interventions relevant to this score range
  let eligible = INTERVENTIONS.filter((i) => i.forScoreRange.includes(category));

  // Prioritize interventions that match lowest-scoring attributes
  const prioritized = eligible.filter((i) =>
    lowestAttributes.includes(i.relatedPELAttribute)
  );
  const remaining = eligible.filter(
    (i) => !lowestAttributes.includes(i.relatedPELAttribute)
  );

  return [...prioritized, ...remaining].slice(0, count);
}

// ─── TENANT / DEMOGRAPHIC OPTIONS ───────────────────────────

export const TENURE_OPTIONS = [
  "Less than 6 months",
  "6 months – 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "More than 10 years",
];

export const ORG_LEVEL_OPTIONS = [
  "Individual Contributor",
  "Team Lead / Senior Contributor",
  "Manager",
  "Director / Senior Manager",
  "Vice President / Executive",
  "C-Suite",
  "Other",
];

export const GENDER_OPTIONS = [
  "Woman",
  "Man",
  "Non-binary",
  "Prefer to self-describe",
  "Prefer not to answer",
];

export const RACE_OPTIONS = [
  "Asian or Pacific Islander",
  "Black or African American",
  "Hispanic or Latino/a/x",
  "Indigenous or Alaska Native",
  "Middle Eastern or North African",
  "Multiracial",
  "White or European American",
  "Prefer to self-describe",
  "Prefer not to answer",
];
