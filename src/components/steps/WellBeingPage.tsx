"use client";

import { useState } from "react";
import type { AssessmentData } from "@/lib/types";
import { WELLBEING_QUESTIONS } from "@/lib/pels-data";
import StepWrapper from "@/components/StepWrapper";

interface WellBeingPageProps {
  data: AssessmentData;
  onUpdate: (d: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WellBeingPage({ data, onUpdate, onNext, onBack }: WellBeingPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    WELLBEING_QUESTIONS.forEach((q) => {
      const answer = (data[q.id as keyof AssessmentData] as string)?.trim();
      if (!answer || answer.split(/\s+/).length < 5) {
        e[q.id] = "Please provide a response — at least a few words";
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <StepWrapper
      title="Your Well-Being at Work"
      subtitle="These three open-ended questions explore how your leader specifically supports — or could better support — your well-being. Take your time."
      onNext={() => validate() && onNext()}
      onBack={onBack}
    >
      <div className="space-y-10">
        {WELLBEING_QUESTIONS.map((q, index) => {
          const value = data[q.id as keyof AssessmentData] as string || "";
          const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

          return (
            <div key={q.id} className="space-y-3">
              {/* Question number + text */}
              <div className="flex gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B6F5E]/10 text-[#8B6F5E] text-sm
                    flex items-center justify-center"
                  style={{ fontFamily: "sans-serif", fontWeight: 600 }}
                >
                  {index + 1}
                </span>
                <p className="text-stone-800 text-lg leading-snug pt-0.5">{q.question}</p>
              </div>

              <div className="ml-12">
                <textarea
                  value={value}
                  onChange={(e) =>
                    onUpdate({ [q.id]: e.target.value } as Partial<AssessmentData>)
                  }
                  rows={5}
                  placeholder={q.placeholder}
                  className={`w-full rounded-xl border px-5 py-4
                    text-stone-800 text-sm bg-white resize-none leading-relaxed
                    focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40 focus:border-[#C4956A]
                    placeholder:text-stone-300 transition-all duration-200
                    ${errors[q.id] ? "border-rose-300" : "border-stone-200 hover:border-stone-300"}`}
                  style={{ fontFamily: "sans-serif" }}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors[q.id] ? (
                    <p className="text-xs text-rose-600" style={{ fontFamily: "sans-serif" }}>
                      {errors[q.id]}
                    </p>
                  ) : (
                    <span className="text-xs text-[#C4956A]" style={{ fontFamily: "sans-serif" }}>Required</span>
                  )}
                  <p
                    className={`text-xs ${wordCount > 5 ? "text-[#8B6F5E]" : "text-stone-400"}`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {wordCount} words
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Transition notice */}
        <div className="rounded-2xl bg-gradient-to-br from-[#8B6F5E]/5 to-[#C4956A]/5 border border-[#C4956A]/20 p-6">
          <p className="text-sm text-stone-600 leading-relaxed text-center" style={{ fontFamily: "sans-serif" }}>
            <strong className="text-[#8B6F5E]">Next:</strong> The PERMA+4 Workplace Well-Being Profile —
            a 29-item scale measuring 9 dimensions of your well-being at work, followed by
            the 18-item PELS assessment. Together they take approximately 10–15 minutes.
          </p>
        </div>
      </div>
    </StepWrapper>
  );
}
