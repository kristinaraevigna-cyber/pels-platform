"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import IntakePage from "@/components/steps/IntakePage";
import StoriesPage from "@/components/steps/StoriesPage";
import WellBeingPage from "@/components/steps/WellBeingPage";
import PermaPage from "@/components/steps/PermaPage";
import AssessmentPage from "@/components/steps/AssessmentPage";
import ResultsPage from "@/components/steps/ResultsPage";
import type { AssessmentData } from "@/lib/types";

export type Step = "intake" | "stories" | "wellbeing" | "perma" | "assessment" | "results";

const STEPS: Step[] = ["intake", "stories", "wellbeing", "perma", "assessment", "results"];
const STEP_LABELS = ["About You", "Your Stories", "Well-Being", "Well-Being Profile", "Assessment", "Your Results"];

export default function AssessmentFlowPage() {
  const [step, setStep] = useState<Step>("intake");
  const [data, setData] = useState<AssessmentData>({});
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  const stepIndex = STEPS.indexOf(step);
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  const updateData = (updates: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const goTo = (s: Step) => setStep(s);

  return (
    <div className="min-h-screen bg-[#F7F3EE]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Image
              src="/PEL 2.png"
              alt="Positively Energizing Leadership"
              width={160}
              height={48}
              className="hidden sm:block"
              style={{ objectFit: "contain", maxHeight: "40px", mixBlendMode: "multiply" }}
            />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-stone-400 font-medium">
                PELS Assessment
              </p>
              <p className="text-sm text-stone-700 font-medium truncate">
                {STEP_LABELS[stepIndex]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < stepIndex
                      ? "bg-[#8B6F5E]"
                      : i === stepIndex
                      ? "bg-[#C4956A] w-6"
                      : "bg-stone-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-sans text-stone-400 whitespace-nowrap">
              {step !== "results" ? `${stepIndex + 1} of ${STEPS.length}` : "Complete"}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-stone-100">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B6F5E] to-[#C4956A]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {step === "intake" && (
            <motion.div key="intake" {...pageTransition}>
              <IntakePage
                data={data}
                onUpdate={updateData}
                onNext={() => goTo("stories")}
              />
            </motion.div>
          )}
          {step === "stories" && (
            <motion.div key="stories" {...pageTransition}>
              <StoriesPage
                data={data}
                onUpdate={updateData}
                onNext={() => goTo("wellbeing")}
                onBack={() => goTo("intake")}
              />
            </motion.div>
          )}
          {step === "wellbeing" && (
            <motion.div key="wellbeing" {...pageTransition}>
              <WellBeingPage
                data={data}
                onUpdate={updateData}
                onNext={() => goTo("perma")}
                onBack={() => goTo("stories")}
              />
            </motion.div>
          )}
          {step === "perma" && (
            <motion.div key="perma" {...pageTransition}>
              <PermaPage
                data={data}
                onUpdate={updateData}
                onNext={() => goTo("assessment")}
                onBack={() => goTo("wellbeing")}
              />
            </motion.div>
          )}
          {step === "assessment" && (
            <motion.div key="assessment" {...pageTransition}>
              <AssessmentPage
                data={data}
                onUpdate={updateData}
                onNext={(id: string) => {
                  setAssessmentId(id);
                  goTo("results");
                }}
                onBack={() => goTo("perma")}
              />
            </motion.div>
          )}
          {step === "results" && (
            <motion.div key="results" {...pageTransition}>
              <ResultsPage data={data} assessmentId={assessmentId} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};
