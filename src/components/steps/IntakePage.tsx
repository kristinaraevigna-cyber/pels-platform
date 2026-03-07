"use client";

import { useState } from "react";
import type { AssessmentData } from "@/lib/types";
import {
  TENURE_OPTIONS,
  ORG_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  RACE_OPTIONS,
} from "@/lib/pels-data";
import StepWrapper from "@/components/StepWrapper";

interface IntakePageProps {
  data: AssessmentData;
  onUpdate: (d: Partial<AssessmentData>) => void;
  onNext: () => void;
}

export default function IntakePage({ data, onUpdate, onNext }: IntakePageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.respondent_name?.trim()) e.name = "Please enter your name";
    if (!data.respondent_role?.trim()) e.role = "Please enter your role";
    if (!data.respondent_org_level) e.org_level = "Please select your organizational level";
    if (!data.respondent_tenure) e.tenure = "Please select how long you've worked with your supervisor";
    if (!data.consent_given) e.consent = "Consent is required to proceed";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <StepWrapper
      title="Tell Us About You"
      subtitle="This context helps personalize your results. All responses are confidential and used for research purposes only."
      onNext={handleNext}
    >
      <div className="space-y-8">
        {/* Personal Info */}
        <Section title="About You">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your Name" required error={errors.name}>
              <input
                type="text"
                value={data.respondent_name || ""}
                onChange={(e) => onUpdate({ respondent_name: e.target.value })}
                className={inputClass(errors.name)}
                placeholder="First name is fine"
              />
            </Field>
            <Field label="Your Email" hint="Optional — to receive your report">
              <input
                type="email"
                value={data.respondent_email || ""}
                onChange={(e) => onUpdate({ respondent_email: e.target.value })}
                className={inputClass()}
                placeholder="name@example.com"
              />
            </Field>
            <Field label="Your Role / Job Title" required error={errors.role}>
              <input
                type="text"
                value={data.respondent_role || ""}
                onChange={(e) => onUpdate({ respondent_role: e.target.value })}
                className={inputClass(errors.role)}
                placeholder="e.g. Product Manager"
              />
            </Field>
            <Field label="Organization (optional)">
              <input
                type="text"
                value={data.respondent_org || ""}
                onChange={(e) => onUpdate({ respondent_org: e.target.value })}
                className={inputClass()}
                placeholder="Company or organization name"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <Field label="Gender Identity" hint="Optional">
              <SelectField
                value={data.respondent_gender || ""}
                onChange={(v) => onUpdate({ respondent_gender: v })}
                options={GENDER_OPTIONS}
                placeholder="Select..."
              />
            </Field>
            <Field label="Race / Ethnicity" hint="Optional">
              <SelectField
                value={data.respondent_race || ""}
                onChange={(v) => onUpdate({ respondent_race: v })}
                options={RACE_OPTIONS}
                placeholder="Select..."
              />
            </Field>
            <Field label="Organizational Level" required error={errors.org_level}>
              <SelectField
                value={data.respondent_org_level || ""}
                onChange={(v) => onUpdate({ respondent_org_level: v })}
                options={ORG_LEVEL_OPTIONS}
                placeholder="Select..."
                error={errors.org_level}
              />
            </Field>
          </div>
        </Section>

        {/* About Your Leader */}
        <Section title="About Your Supervisor">
          <p className="text-sm text-stone-500 mb-4 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
            Think about the direct supervisor or manager you currently report to. Your responses
            throughout this assessment will be about this specific person.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="How long have you worked with your supervisor?"
              required
              error={errors.tenure}
            >
              <SelectField
                value={data.respondent_tenure || ""}
                onChange={(v) => onUpdate({ respondent_tenure: v })}
                options={TENURE_OPTIONS}
                placeholder="Select tenure..."
                error={errors.tenure}
              />
            </Field>
            <Field label="Your supervisor's gender identity" hint="Optional">
              <SelectField
                value={data.leader_gender || ""}
                onChange={(v) => onUpdate({ leader_gender: v })}
                options={GENDER_OPTIONS}
                placeholder="Select..."
              />
            </Field>
          </div>
        </Section>

        {/* Consent */}
        <Section title="Informed Consent">
          <div
            className={`rounded-xl p-5 border ${
              errors.consent ? "border-rose-300 bg-rose-50" : "border-stone-200 bg-stone-50"
            }`}
          >
            <p className="text-sm text-stone-600 leading-relaxed mb-4" style={{ fontFamily: "sans-serif" }}>
              This assessment is part of ongoing research on positively energizing leadership. Your
              responses are confidential and will be used only in aggregate for research purposes.
              No individually identifying information will be shared without your permission. You may
              stop at any time without penalty.
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(data as any).consent_given || false}
                onChange={(e) => onUpdate({ consent_given: e.target.checked } as any)}
                className="mt-1 w-4 h-4 rounded border-stone-300 text-[#8B6F5E] focus:ring-[#C4956A]"
              />
              <span className="text-sm text-stone-700" style={{ fontFamily: "sans-serif" }}>
                I understand and agree to participate in this research. I consent to my anonymous
                responses being used for research and to receive a personalized report.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-rose-600 mt-2" style={{ fontFamily: "sans-serif" }}>
                {errors.consent}
              </p>
            )}
          </div>
        </Section>
      </div>
    </StepWrapper>
  );
}

// ── Sub-components ──────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="text-xs tracking-[0.2em] uppercase text-[#8B6F5E] mb-4"
        style={{ fontFamily: "sans-serif", fontWeight: 600 }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-sm text-stone-700 mb-1.5"
        style={{ fontFamily: "sans-serif", fontWeight: 500 }}
      >
        {label}
        {required && <span className="text-[#C4956A] ml-1">*</span>}
        {hint && (
          <span className="text-stone-400 font-normal ml-1.5 text-xs">({hint})</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-rose-600 mt-1" style={{ fontFamily: "sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass(error)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-xl border px-4 py-3 text-stone-800 text-sm bg-white transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40 focus:border-[#C4956A]
    ${error ? "border-rose-300" : "border-stone-200 hover:border-stone-300"}`;
}
