"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { AssessmentData } from "@/lib/types";
import { PELS_ITEMS, LIKERT_LABELS, scorePELS } from "@/lib/pels-data";
import { PERMA_SUBSCALES, scorePerma } from "@/lib/perma-data";
import { createClient } from "@/lib/supabase";

interface AssessmentPageProps {
  data: AssessmentData;
  onUpdate: (d: Partial<AssessmentData>) => void;
  onNext: (assessmentId: string) => void;
  onBack: () => void;
}

export default function AssessmentPage({
  data,
  onUpdate,
  onNext,
  onBack,
}: AssessmentPageProps) {
  const [responses, setResponses] = useState<Record<number, number>>(
    data.pels_responses || {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const answered = Object.keys(responses).length;
  const total = PELS_ITEMS.length;
  const allAnswered = answered === total;

  const setResponse = (itemId: number, value: number) => {
    const updated = { ...responses, [itemId]: value };
    setResponses(updated);
    onUpdate({ pels_responses: updated });
  };

  const handleSubmit = async () => {
    if (!allAnswered) {
      setShowValidation(true);
      // Scroll to first unanswered
      const firstUnanswered = PELS_ITEMS.find((i) => !responses[i.id]);
      if (firstUnanswered) {
        document.getElementById(`item-${firstUnanswered.id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      console.log("[PELS Submit] Starting submission...");
      const score = scorePELS(responses);
      console.log("[PELS Submit] Score calculated:", score);

      // Build the assessment record
      const record: Record<string, unknown> = {
        respondent_name: data.respondent_name,
        respondent_email: data.respondent_email,
        respondent_role: data.respondent_role,
        respondent_org: data.respondent_org,
        respondent_tenure: data.respondent_tenure,
        respondent_gender: data.respondent_gender,
        respondent_race: data.respondent_race,
        respondent_org_level: data.respondent_org_level,
        leader_gender: data.leader_gender,
        story_one: data.story_one,
        story_two: data.story_two,
        wellbeing_q1: data.wellbeing_q1,
        wellbeing_q2: data.wellbeing_q2,
        wellbeing_q3: data.wellbeing_q3,
        pels_total: score.total,
        pels_mean: score.mean,
        pels_category: score.category,
        completed_at: new Date().toISOString(),
        consent_given: true,
      };

      // Add individual PELS item responses
      PELS_ITEMS.forEach((item) => {
        record[`pels_${item.id}`] = responses[item.id];
      });

      // Add PERMA+4 responses and computed scores
      const permaResponses = data.perma_responses || {};
      const permaCount = Object.keys(permaResponses).length;
      console.log("[PELS Submit] PERMA responses count:", permaCount);

      for (let i = 1; i <= 29; i++) {
        record[`perma_${i}`] = permaResponses[i] || null;
      }
      if (permaCount === 29) {
        const permaScore = scorePerma(permaResponses);
        console.log("[PELS Submit] PERMA score calculated:", permaScore);
        PERMA_SUBSCALES.forEach((sub) => {
          record[`perma_${sub.key.toLowerCase()}_mean`] = permaScore.subscaleScores[sub.key];
        });
        record.perma_total_mean = permaScore.totalMean;
      }

      console.log("[PELS Submit] Record keys:", Object.keys(record));

      const supabase = createClient();

      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log("[PELS Submit] Auth check — user:", user?.id || "none", "error:", authError?.message || "none");

      const { data: inserted, error: dbError } = await supabase
        .from("assessments")
        .insert(record)
        .select("id")
        .single();

      if (dbError) {
        console.error("[PELS Submit] DB error:", dbError);
        throw dbError;
      }

      console.log("[PELS Submit] Insert successful, id:", inserted.id);
      onUpdate({ pels_responses: responses });
      onNext(inserted.id);
    } catch (err: unknown) {
      console.error("[PELS Submit] Caught error:", err);
      const message = err instanceof Error ? err.message
        : typeof err === "object" && err !== null && "message" in err ? String((err as { message: unknown }).message)
        : "Unknown error";
      setError(`Failed to save: ${message}. Please try again or contact support.`);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl text-stone-800 mb-3" style={{ fontWeight: 300 }}>
          The PELS Assessment
        </h2>
        <p className="text-stone-500 text-base sm:text-lg mb-6" style={{ fontFamily: "sans-serif", fontWeight: 300 }}>
          Rate your direct supervisor on each of the following 18 statements.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-sm"
          style={{ fontFamily: "sans-serif" }}>
          <span className="w-5 h-5 rounded-full bg-[#8B6F5E] text-white text-xs flex items-center justify-center font-bold">
            {answered}
          </span>
          of {total} answered
          {allAnswered && <span className="text-[#8B6F5E] ml-1">✓ Complete</span>}
        </div>
      </div>

      {/* Scale reminder */}
      <div className="bg-stone-50 rounded-2xl px-4 sm:px-6 py-4 mb-8 border border-stone-200">
        <p className="text-xs text-stone-500 text-center mb-3" style={{ fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Response Scale
        </p>
        <div className="flex justify-between text-xs text-stone-500" style={{ fontFamily: "sans-serif" }}>
          <span>1 = Strongly Disagree</span>
          <span className="hidden sm:inline">4 = Neither/Nor</span>
          <span>7 = Strongly Agree</span>
        </div>
        <div className="flex justify-between mt-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((v) => (
            <div key={v} className="w-6 sm:w-8 h-1 rounded-full bg-stone-200" />
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-6">
        {PELS_ITEMS.map((item, index) => {
          const selected = responses[item.id];
          const unanswered = showValidation && !selected;

          return (
            <motion.div
              key={item.id}
              id={`item-${item.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`rounded-2xl border p-4 sm:p-6 transition-all duration-200 ${
                unanswered
                  ? "border-rose-200 bg-rose-50"
                  : selected
                  ? "border-[#C4956A]/30 bg-[#F7F3EE]"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              {/* Item header */}
              <div className="flex items-start gap-4 mb-5">
                <span
                  className="flex-shrink-0 text-xs text-stone-400 mt-0.5 w-6 text-right"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-xs text-[#8B6F5E] mb-1" style={{ fontFamily: "sans-serif", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.attribute}
                  </p>
                  <p className="text-stone-800 text-base leading-snug">{item.text}</p>
                </div>
              </div>

              {/* Likert buttons */}
              <div className="sm:ml-10">
                <div className="likert-row grid grid-cols-7 gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <button
                      key={value}
                      onClick={() => setResponse(item.id, value)}
                      className={`flex items-center justify-center min-h-[44px] py-2.5 rounded-xl border text-sm
                        transition-all duration-150 cursor-pointer
                        ${
                          selected === value
                            ? "border-[#8B6F5E] bg-[#8B6F5E] text-white shadow-md"
                            : "border-stone-200 bg-white text-stone-600 hover:border-[#C4956A] hover:bg-[#C4956A]/5"
                        }`}
                      style={{ fontFamily: "sans-serif", fontWeight: selected === value ? 600 : 400 }}
                    >
                      <span className="text-sm font-semibold">{value}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[10px] sm:text-xs text-stone-400" style={{ fontFamily: "sans-serif" }}>
                    Strongly Disagree
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400" style={{ fontFamily: "sans-serif" }}>
                    Strongly Agree
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Submit */}
      <div className="mt-12 space-y-4">
        {showValidation && !allAnswered && (
          <p className="text-center text-sm text-rose-600" style={{ fontFamily: "sans-serif" }}>
            Please answer all {total} items to continue. {total - answered} item
            {total - answered !== 1 ? "s" : ""} remaining.
          </p>
        )}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
            <p className="text-sm text-rose-700 mb-2" style={{ fontFamily: "sans-serif" }}>
              {error}
            </p>
            <button
              onClick={() => { setError(null); setSubmitting(false); }}
              className="text-xs text-rose-600 underline"
              style={{ fontFamily: "sans-serif" }}
            >
              Dismiss and try again
            </button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 min-h-[44px] rounded-full border border-stone-200 text-stone-600 text-sm hover:bg-stone-50 transition-colors"
            style={{ fontFamily: "sans-serif" }}
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`flex-1 py-4 min-h-[44px] rounded-full text-white text-base sm:text-lg transition-all duration-200
              ${
                allAnswered
                  ? "bg-[#8B6F5E] hover:bg-[#7A6050] hover:shadow-lg cursor-pointer"
                  : "bg-stone-300 cursor-pointer"
              } ${submitting ? "opacity-70" : ""}`}
            style={{ fontFamily: "sans-serif" }}
          >
            {submitting
              ? "Calculating your results…"
              : allAnswered
              ? "View My Results →"
              : `Answer all ${total - answered} remaining items`}
          </button>
        </div>
      </div>
    </div>
  );
}
