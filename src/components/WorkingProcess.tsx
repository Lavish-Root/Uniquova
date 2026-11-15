import React from "react";
import { Compass, Lightbulb, Code2, Rocket } from "lucide-react";
import { PROCESS_STEPS } from "@/data/agencyData";

const stepIcons = [Compass, Lightbulb, Code2, Rocket];

export default function WorkingProcess() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200">
            <span>Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight mb-4">
            Our Working <span className="gradient-text">Process</span>
          </h2>

          <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed">
            A battle-tested four-step execution framework designed to eliminate guesswork, accelerate
            delivery, and ensure long-term commercial success.
          </p>
        </div>

        {/* Desktop Horizontal Process Timeline / Mobile Vertical Cards */}
        <div className="relative">

          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-primary-200 via-primary to-primary-dark -translate-y-12 z-0 rounded-full opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = stepIcons[idx];
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-sm hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-primary/40 group-hover:text-primary transition-colors">
                        {step.number}
                      </span>

                      <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                        <StepIcon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary mb-4">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-dark-muted leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-4 border-t border-border/70 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-softBg text-dark-muted border border-border/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
