"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { AssessmentData } from "@/lib/types";
import {
  scorePELS,
  getPersonalizedInterventions,
  PELS_ITEMS,
  type PELSCategory,
  type Intervention,
} from "@/lib/pels-data";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

interface ResultsPageProps {
  data: AssessmentData;
  assessmentId: string | null;
}

export default function ResultsPage({ data, assessmentId }: ResultsPageProps) {
  const [expandedIntervention, setExpandedIntervention] = useState<string | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const responses = data.pels_responses || {};
  const score = scorePELS(responses);
  const interventions = getPersonalizedInterventions(score.category, responses, 5);

  // Build radar data from subdomain means
  const relationalItems = PELS_ITEMS.filter((i) => i.subdomain === "Relational Energy");
  const virtuousItems = PELS_ITEMS.filter((i) => i.subdomain === "Virtuous Behavior");

  const radarData = [
    ...relationalItems.map((item) => ({
      attribute: item.attribute,
      score: responses[item.id] || 0,
      fullMark: 7,
    })),
    ...virtuousItems.map((item) => ({
      attribute: item.attribute,
      score: responses[item.id] || 0,
      fullMark: 7,
    })),
  ];

  // Top 3 strengths and 3 growth areas
  const itemScores = PELS_ITEMS.map((item) => ({
    ...item,
    score: responses[item.id] || 0,
  })).sort((a, b) => b.score - a.score);
  const strengths = itemScores.slice(0, 3);
  const growthAreas = itemScores.slice(-3).reverse();

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    // Trigger the PDF API route
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, score, interventions, assessmentId }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PELS-Report-${data.respondent_name || "Assessment"}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("PDF generation encountered an error. Please try again.");
    } finally {
      setGeneratingPDF(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Hero score section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p
          className="text-xs tracking-[0.25em] uppercase text-[#8B6F5E] mb-4"
          style={{ fontFamily: "sans-serif", fontWeight: 600 }}
        >
          Your Results
        </p>
        <h2 className="text-5xl text-stone-800 mb-2" style={{ fontWeight: 300 }}>
          {data.respondent_name
            ? `${data.respondent_name.split(" ")[0]}'s`
            : "Your"}{" "}
          Leadership Profile
        </h2>
      </motion.div>

      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className={`rounded-3xl border-2 p-8 mb-10 text-center ${score.bgColor}`}
      >
        <div className="flex justify-center items-end gap-3 mb-3">
          <span className={`text-8xl ${score.color}`} style={{ fontWeight: 200, lineHeight: 1, letterSpacing: "-0.04em" }}>
            {score.mean.toFixed(1)}
          </span>
          <span className="text-stone-400 text-2xl mb-3" style={{ fontFamily: "sans-serif" }}>
            / 7.0
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span
            className={`text-2xl font-semibold ${score.color}`}
            style={{ letterSpacing: "-0.01em" }}
          >
            {score.category}
          </span>
          <span
            className="text-sm text-stone-500 bg-white/70 px-3 py-1 rounded-full"
            style={{ fontFamily: "sans-serif" }}
          >
            {score.percentile}
          </span>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-lg mx-auto" style={{ fontFamily: "sans-serif" }}>
          {score.description}
        </p>

        {/* Score bar */}
        <div className="mt-6 max-w-sm mx-auto">
          <div className="h-3 rounded-full bg-white/50">
            <motion.div
              className={`h-full rounded-full ${
                score.category === "Flourishing" ? "bg-emerald-500" :
                score.category === "Thriving" ? "bg-blue-500" :
                score.category === "Developing" ? "bg-amber-500" : "bg-rose-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${((score.mean - 1) / 6) * 100}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-stone-400 mt-1" style={{ fontFamily: "sans-serif" }}>
            <span>1.0</span>
            <span>4.0</span>
            <span>7.0</span>
          </div>
        </div>
      </motion.div>

      {/* Strengths & Growth Areas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid sm:grid-cols-2 gap-6 mb-10"
      >
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
          <h3
            className="text-xs tracking-[0.15em] uppercase text-emerald-700 mb-4"
            style={{ fontFamily: "sans-serif", fontWeight: 600 }}
          >
            Your Leader's Strengths
          </h3>
          <div className="space-y-3">
            {strengths.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-stone-700 text-sm font-medium">{item.attribute}</p>
                  <p className="text-stone-400 text-xs" style={{ fontFamily: "sans-serif" }}>{item.text}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-lg">{item.score}</span>
                  <span className="text-stone-400 text-xs">/7</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h3
            className="text-xs tracking-[0.15em] uppercase text-amber-700 mb-4"
            style={{ fontFamily: "sans-serif", fontWeight: 600 }}
          >
            Growth Opportunities
          </h3>
          <div className="space-y-3">
            {growthAreas.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-stone-700 text-sm font-medium">{item.attribute}</p>
                  <p className="text-stone-400 text-xs" style={{ fontFamily: "sans-serif" }}>{item.text}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-amber-600 font-bold text-lg">{item.score}</span>
                  <span className="text-stone-400 text-xs">/7</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Radar chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-3xl border border-stone-200 p-8 mb-10"
      >
        <h3 className="text-xl text-stone-800 mb-2">Leadership Attribute Profile</h3>
        <p className="text-sm text-stone-500 mb-6" style={{ fontFamily: "sans-serif" }}>
          Your scores across all 18 PELS attributes
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis
                dataKey="attribute"
                tick={{ fontSize: 11, fontFamily: "sans-serif", fill: "#6B7280" }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8B6F5E"
                fill="#C4956A"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Evidence-based interventions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-10"
      >
        <div className="mb-6">
          <h3 className="text-3xl text-stone-800 mb-2" style={{ fontWeight: 300 }}>
            Evidence-Based Practices for You
          </h3>
          <p className="text-stone-500 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
            Based on your results, here are personalized practices from{" "}
            <span className="text-[#8B6F5E] font-medium">Burke et al. (2023), <em>Positive Health</em></span>{" "}
            — all rigorously validated to strengthen your well-being and resilience at work,
            regardless of your leadership environment.
          </p>
        </div>

        <div className="space-y-4">
          {interventions.map((intervention, i) => (
            <InterventionCard
              key={intervention.id}
              intervention={intervention}
              index={i}
              expanded={expandedIntervention === intervention.id}
              onToggle={() =>
                setExpandedIntervention(
                  expandedIntervention === intervention.id ? null : intervention.id
                )
              }
            />
          ))}
        </div>
      </motion.div>

      {/* Download report */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="text-center bg-gradient-to-br from-[#8B6F5E] to-[#6B5249] rounded-3xl p-10 text-white"
      >
        <p className="text-4xl mb-3">📄</p>
        <h3 className="text-2xl mb-3" style={{ fontWeight: 300 }}>
          Download Your Full Report
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm mx-auto" style={{ fontFamily: "sans-serif" }}>
          Your personalized PDF includes your complete PELS score, attribute profile, your
          leader stories, and all evidence-based practices with full instructions.
        </p>
        <button
          onClick={handleDownloadPDF}
          disabled={generatingPDF}
          className="px-10 py-4 bg-white text-[#8B6F5E] rounded-full text-base font-semibold
            hover:bg-stone-50 transition-all duration-200 hover:shadow-xl disabled:opacity-60"
          style={{ fontFamily: "sans-serif" }}
        >
          {generatingPDF ? "Generating Report…" : "Download PDF Report →"}
        </button>
        <p className="text-white/40 text-xs mt-4" style={{ fontFamily: "sans-serif" }}>
          Reference: Burke et al. (2023). Positive Health. Routledge. DOI: 10.4324/9781003279594
        </p>
      </motion.div>
    </div>
  );
}

// ── Intervention card ─────────────────────────────────────────

function InterventionCard({
  intervention,
  index,
  expanded,
  onToggle,
}: {
  intervention: Intervention;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-stone-200 bg-white overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-stone-50 transition-colors"
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">{intervention.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h4 className="text-stone-800 font-semibold text-base">{intervention.title}</h4>
            <span
              className="text-xs px-2 py-0.5 rounded-full bg-[#8B6F5E]/10 text-[#8B6F5E]"
              style={{ fontFamily: "sans-serif" }}
            >
              {intervention.category}
            </span>
          </div>
          <p className="text-stone-500 text-sm" style={{ fontFamily: "sans-serif" }}>
            {intervention.tagline}
          </p>
          <div className="flex gap-4 mt-2">
            <span className="text-xs text-stone-400" style={{ fontFamily: "sans-serif" }}>
              ⏱ {intervention.duration}
            </span>
            <span className="text-xs text-stone-400" style={{ fontFamily: "sans-serif" }}>
              🔁 {intervention.frequency}
            </span>
          </div>
        </div>
        <span className={`text-stone-400 transition-transform ${expanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-4 ml-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8B6F5E] mb-2" style={{ fontFamily: "sans-serif", fontWeight: 600 }}>
              What It Is
            </p>
            <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
              {intervention.description}
            </p>
          </div>
          <div className="bg-[#F7F3EE] rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-[#8B6F5E] mb-2" style={{ fontFamily: "sans-serif", fontWeight: 600 }}>
              How to Practice
            </p>
            <p className="text-stone-700 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
              {intervention.practice}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8B6F5E] mb-2" style={{ fontFamily: "sans-serif", fontWeight: 600 }}>
              The Evidence
            </p>
            <p className="text-stone-500 text-sm leading-relaxed italic" style={{ fontFamily: "sans-serif" }}>
              {intervention.evidence}
            </p>
          </div>
          <p className="text-xs text-stone-400" style={{ fontFamily: "sans-serif" }}>
            Source: {intervention.source}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
