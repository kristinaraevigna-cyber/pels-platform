"use client";

import { useState } from "react";
import type { AssessmentData } from "@/lib/types";
import { STORY_PROMPTS } from "@/lib/pels-data";
import StepWrapper from "@/components/StepWrapper";

interface StoriesPageProps {
  data: AssessmentData;
  onUpdate: (d: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StoriesPage({ data, onUpdate, onNext, onBack }: StoriesPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    const story = data.story_one?.trim();
    if (!story || story.split(" ").length < 15) {
      e.story_one = "Please share a bit more — at least a few sentences";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <StepWrapper
      title="Your Leadership Stories"
      subtitle="Narrative matters in leadership research. Before completing the scale, we'd like you to share a few brief stories about your direct supervisor."
      onNext={() => validate() && onNext()}
      onBack={onBack}
    >
      <div className="space-y-10">
        {/* Context note */}
        <div className="bg-[#F7F3EE] rounded-2xl p-6 border border-[#C4956A]/20">
          <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
            <span className="text-[#8B6F5E] font-semibold">Why stories?</span> Research on positively
            energizing leadership shows that how leaders make us feel through specific interactions
            matters enormously. Your stories help contextualize your scale responses and enrich the
            research. There are no right or wrong answers — just your honest experience.
          </p>
        </div>

        {STORY_PROMPTS.map((prompt) => {
          const value = data[prompt.id as keyof AssessmentData] as string || "";
          const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

          return (
            <div key={prompt.id} className="space-y-3">
              <div>
                <h3 className="text-xl text-stone-800 mb-1">
                  {prompt.title}
                  {!prompt.required && (
                    <span
                      className="text-stone-400 text-sm ml-2"
                      style={{ fontFamily: "sans-serif", fontWeight: 400 }}
                    >
                      (optional)
                    </span>
                  )}
                </h3>
                <p className="text-stone-600 leading-relaxed" style={{ fontFamily: "sans-serif", fontSize: "0.9rem" }}>
                  {prompt.prompt}
                </p>
              </div>

              <div className="relative">
                <textarea
                  value={value}
                  onChange={(e) =>
                    onUpdate({ [prompt.id]: e.target.value } as Partial<AssessmentData>)
                  }
                  rows={6}
                  placeholder={prompt.placeholder}
                  className={`w-full rounded-xl border px-5 py-4 text-stone-800 text-sm bg-white resize-none
                    leading-relaxed transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40 focus:border-[#C4956A]
                    placeholder:text-stone-300
                    ${errors[prompt.id] ? "border-rose-300" : "border-stone-200 hover:border-stone-300"}`}
                  style={{ fontFamily: "sans-serif" }}
                />
                <div className="flex justify-between items-center mt-1.5">
                  {errors[prompt.id] ? (
                    <p className="text-xs text-rose-600" style={{ fontFamily: "sans-serif" }}>
                      {errors[prompt.id]}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    className={`text-xs ml-auto ${wordCount > 10 ? "text-[#8B6F5E]" : "text-stone-400"}`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {wordCount} words
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </StepWrapper>
  );
}
