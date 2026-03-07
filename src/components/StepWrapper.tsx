"use client";

interface StepWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  disabled?: boolean;
}

export default function StepWrapper({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Continue →",
  disabled = false,
}: StepWrapperProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Step header */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl text-stone-800 mb-3" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-2xl"
            style={{ fontFamily: "sans-serif", fontWeight: 300 }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="mb-10 sm:mb-12">{children}</div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 min-h-[44px] rounded-full border border-stone-200 text-stone-600 text-sm
              hover:bg-stone-50 transition-colors"
            style={{ fontFamily: "sans-serif" }}
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={disabled}
          className={`flex-1 py-4 min-h-[44px] rounded-full text-white text-base sm:text-lg transition-all duration-200
            ${disabled
              ? "bg-stone-300 cursor-not-allowed"
              : "bg-[#8B6F5E] hover:bg-[#7A6050] hover:shadow-lg cursor-pointer hover:scale-[1.01]"
            }`}
          style={{ fontFamily: "sans-serif", fontWeight: 400 }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
