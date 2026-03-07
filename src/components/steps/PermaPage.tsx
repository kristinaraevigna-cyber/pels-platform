"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { AssessmentData } from "@/lib/types";
import { PERMA_SUBSCALES, PERMA_ITEMS } from "@/lib/perma-data";

interface PermaPageProps {
  data: AssessmentData;
  onUpdate: (d: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PermaPage({
  data,
  onUpdate,
  onNext,
  onBack,
}: PermaPageProps) {
  const [responses, setResponses] = useState<Record<number, number>>(
    data.perma_responses || {}
  );
  const [showValidation, setShowValidation] = useState(false);

  const answered = Object.keys(responses).length;
  const total = PERMA_ITEMS.length;
  const allAnswered = answered === total;

  const setResponse = (itemId: number, value: number) => {
    const updated = { ...responses, [itemId]: value };
    setResponses(updated);
    onUpdate({ perma_responses: updated });
  };

  const handleContinue = () => {
    if (!allAnswered) {
      setShowValidation(true);
      // Scroll to first unanswered
      const firstUnanswered = PERMA_ITEMS.find((i) => !responses[i.id]);
      if (firstUnanswered) {
        document.getElementById(`perma-item-${firstUnanswered.id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl text-stone-800 mb-3" style={{ fontWeight: 300 }}>
          Workplace Well-Being Profile
        </h2>
        <p
          className="text-stone-500 text-base sm:text-lg mb-2"
          style={{ fontFamily: "sans-serif", fontWeight: 300 }}
        >
          The PERMA+4 scale measures 9 dimensions of well-being at work.
        </p>
        <p
          className="text-stone-400 text-sm mb-6"
          style={{ fontFamily: "sans-serif", fontWeight: 300 }}
        >
          Rate each statement on a scale of 1 (Strongly Disagree) to 7 (Strongly Agree).
        </p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-sm"
          style={{ fontFamily: "sans-serif" }}
        >
          <span className="w-5 h-5 rounded-full bg-[#8B6F5E] text-white text-xs flex items-center justify-center font-bold">
            {answered}
          </span>
          of {total} answered
          {allAnswered && <span className="text-[#8B6F5E] ml-1">&#10003; Complete</span>}
        </div>
      </div>

      {/* Scale reminder */}
      <div className="bg-stone-50 rounded-2xl px-4 sm:px-6 py-4 mb-8 border border-stone-200">
        <p
          className="text-xs text-stone-500 text-center mb-3"
          style={{
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Response Scale
        </p>
        <div
          className="flex justify-between text-xs text-stone-500"
          style={{ fontFamily: "sans-serif" }}
        >
          <span>1 = Strongly Disagree</span>
          <span className="hidden sm:inline">4 = Neutral</span>
          <span>7 = Strongly Agree</span>
        </div>
        <div className="flex justify-between mt-1.5">
          {[1, 2, 3, 4, 5, 6, 7].map((v) => (
            <div key={v} className="w-6 sm:w-8 h-1 rounded-full bg-stone-200" />
          ))}
        </div>
      </div>

      {/* Items grouped by subscale */}
      <div className="space-y-10">
        {PERMA_SUBSCALES.map((subscale) => {
          const subscaleItems = PERMA_ITEMS.filter(
            (item) => item.subscaleKey === subscale.key
          );

          return (
            <div key={subscale.key}>
              {/* Subscale header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: subscale.color }}
                />
                <h3
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    color: "#8B6F5E",
                  }}
                >
                  {subscale.label}
                </h3>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {subscaleItems.map((item) => {
                  const selected = responses[item.id];
                  const unanswered = showValidation && !selected;

                  return (
                    <motion.div
                      key={item.id}
                      id={`perma-item-${item.id}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.id * 0.02 }}
                      className={`rounded-2xl border p-4 sm:p-6 transition-all duration-200 ${
                        unanswered
                          ? "border-rose-200 bg-rose-50"
                          : selected
                          ? "border-[#C4956A]/30 bg-[#F7F3EE]"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      {/* Item text */}
                      <div className="flex items-start gap-4 mb-5">
                        <span
                          className="flex-shrink-0 text-xs text-stone-400 mt-0.5 w-6 text-right"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {item.id}
                        </span>
                        <p className="text-stone-800 text-base leading-snug">
                          {item.text}
                        </p>
                      </div>

                      {/* 1–7 Likert buttons */}
                      <div className="sm:ml-10">
                        <div className="perma-likert-grid grid grid-cols-7 gap-1 sm:gap-1.5">
                          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <button
                              key={value}
                              onClick={() => setResponse(item.id, value)}
                              className={`flex items-center justify-center min-h-[44px] py-2.5 rounded-xl border text-xs
                                transition-all duration-150 cursor-pointer
                                ${
                                  selected === value
                                    ? "border-[#8B6F5E] bg-[#8B6F5E] text-white shadow-md"
                                    : "border-stone-200 bg-white text-stone-600 hover:border-[#C4956A] hover:bg-[#C4956A]/5"
                                }`}
                              style={{
                                fontFamily: "sans-serif",
                                fontWeight: selected === value ? 600 : 400,
                              }}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 px-1">
                          <span
                            className="text-[10px] sm:text-xs text-stone-400"
                            style={{ fontFamily: "sans-serif" }}
                          >
                            Strongly Disagree
                          </span>
                          <span
                            className="text-[10px] sm:text-xs text-stone-400"
                            style={{ fontFamily: "sans-serif" }}
                          >
                            Strongly Agree
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-12 space-y-4">
        {showValidation && !allAnswered && (
          <p
            className="text-center text-sm text-rose-600"
            style={{ fontFamily: "sans-serif" }}
          >
            Please answer all {total} items to continue. {total - answered} item
            {total - answered !== 1 ? "s" : ""} remaining.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 min-h-[44px] rounded-full border border-stone-200 text-stone-600 text-sm hover:bg-stone-50 transition-colors"
            style={{ fontFamily: "sans-serif" }}
          >
            &larr; Back
          </button>
          <button
            onClick={handleContinue}
            className={`flex-1 py-4 min-h-[44px] rounded-full text-white text-base sm:text-lg transition-all duration-200
              ${
                allAnswered
                  ? "bg-[#8B6F5E] hover:bg-[#7A6050] hover:shadow-lg cursor-pointer"
                  : "bg-stone-300 cursor-pointer"
              }`}
            style={{ fontFamily: "sans-serif" }}
          >
            {allAnswered
              ? "Continue to PELS Assessment \u2192"
              : `Answer all ${total - answered} remaining items`}
          </button>
        </div>
      </div>
    </div>
  );
}
