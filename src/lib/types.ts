export type AssessmentData = {
  // Intake
  respondent_name?: string;
  respondent_email?: string;
  respondent_role?: string;
  respondent_org?: string;
  respondent_tenure?: string;
  respondent_gender?: string;
  respondent_race?: string;
  respondent_org_level?: string;
  leader_gender?: string;
  leader_tenure?: string;
  // Stories
  story_one?: string;
  story_two?: string;
  // Well-being
  wellbeing_q1?: string;
  wellbeing_q2?: string;
  wellbeing_q3?: string;
  // PERMA+4 responses
  perma_responses?: Record<number, number>;
  // PELS responses
  pels_responses?: Record<number, number>;
  // Consent
  consent_given?: boolean;
};
