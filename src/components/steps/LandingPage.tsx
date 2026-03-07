"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #F7F3EE 0%, #EDE5D8 40%, #E8DDD0 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, #C4956A22 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #8B6F5E22 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Image
            src="/PEL Logo.png"
            alt="Positively Energizing Leadership"
            width={220}
            height={220}
            priority
            style={{ objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 px-4 py-2 rounded-full border border-[#C4956A]/40 bg-white/50 backdrop-blur-sm"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#8B6F5E]"
            style={{ fontFamily: "sans-serif", fontWeight: 500 }}
          >
            Validated Research Instrument · University of Pennsylvania IRB #853470
          </p>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center max-w-3xl"
        >
          <h1
            className="text-5xl sm:text-7xl text-stone-800 leading-[1.1] mb-6"
            style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
          >
            How Energizing
            <br />
            <span className="italic text-[#8B6F5E]">Is Your Leader?</span>
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed mb-4" style={{ fontWeight: 300 }}>
            The Positively Energizing Leadership Scale (PELS) is the first validated
            measure of leaders' virtuous behavior and relational energy — two forces
            that powerfully predict your engagement and well-being at work.
          </p>
          <p className="text-base text-stone-500 leading-relaxed" style={{ fontWeight: 300 }}>
            Grounded in Positive Organizational Scholarship, this 15-minute assessment
            gives you a personalized score, evidence-based insights, and a downloadable
            report with practical interventions to support your well-being.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap justify-center gap-8 mt-12 mb-12"
        >
          {[
            { stat: "603", label: "Participants Validated" },
            { stat: "α = .98", label: "Internal Consistency" },
            { stat: "18", label: "Validated Items" },
            { stat: "15 min", label: "Completion Time" },
          ].map(({ stat, label }) => (
            <div key={stat} className="text-center">
              <p
                className="text-3xl text-[#8B6F5E]"
                style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
              >
                {stat}
              </p>
              <p
                className="text-xs text-stone-500 mt-1 tracking-widest uppercase"
                style={{ fontFamily: "sans-serif" }}
              >
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onStart}
            className="group relative px-12 py-5 bg-[#8B6F5E] text-white rounded-full text-lg transition-all duration-300 hover:bg-[#7A6050] hover:shadow-xl hover:shadow-[#8B6F5E]/20 hover:scale-105 active:scale-100"
            style={{ fontFamily: "sans-serif", fontWeight: 400, letterSpacing: "0.05em" }}
          >
            Begin Assessment
            <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className="text-xs text-stone-400" style={{ fontFamily: "sans-serif" }}>
            Your responses are confidential. Takes approximately 15 minutes.
          </p>
        </motion.div>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 max-w-2xl w-full"
        >
          <p
            className="text-center text-xs tracking-[0.2em] uppercase text-stone-400 mb-6"
            style={{ fontFamily: "sans-serif" }}
          >
            What to Expect
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Your Background", desc: "Brief context about you and your leader" },
              { num: "02", title: "Your Stories", desc: "2 short narratives about your leader's impact" },
              { num: "03", title: "Well-Being Questions", desc: "3 open-ended questions about your experience" },
              { num: "04", title: "The Scale + Report", desc: "18 items and your personalized PDF report" },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-stone-200/60">
                <p
                  className="text-[#C4956A] text-xs mb-2"
                  style={{ fontFamily: "sans-serif", fontWeight: 600 }}
                >
                  {num}
                </p>
                <p className="text-stone-800 text-sm font-semibold mb-1">{title}</p>
                <p className="text-stone-500 text-xs leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
