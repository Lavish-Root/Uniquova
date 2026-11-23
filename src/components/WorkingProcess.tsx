import React from "react";
import { Compass, Lightbulb, Code2, Rocket } from "lucide-react";
import { PROCESS_STEPS } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

const stepIcons = [Compass, Lightbulb, Code2, Rocket];

const PROCESS_GIFS: Record<string, string> = {
  "01": "/images/process/discover.gif",
  "02": "/images/process/strategize.gif",
  "03": "/images/process/create.gif",
  "04": "/images/process/grow.gif",
};

export default function WorkingProcess() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-16 lg:mb-20"
          badge={
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200">
              <span>A Transparent, Predictable Methodology</span>
            </div>
          }
          title={
            <>
              Our Working <span className="gradient-text">Process</span>
            </>
          }
          subtitle="A battle-tested four-step execution framework designed to eliminate guesswork, accelerate delivery, and ensure long-term commercial success."
        />

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
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-border/80 shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div className="flex flex-col">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl sm:text-4xl font-black text-primary/40 group-hover:text-primary transition-colors">
                        {step.number}
                      </span>

                      <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs border border-primary-200/50">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-black text-dark group-hover:text-primary transition-colors mb-1 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold text-primary tracking-wide mb-3">
                      {step.subtitle}
                    </p>

                    {/* Featured Live Looping Animated GIF Illustration (Replaces Dense Text) */}
                    <div className="my-2 py-2 flex items-center justify-center">
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={PROCESS_GIFS[step.number] || "/images/process/discover.gif"}
                          alt={`${step.title} — ${step.subtitle}`}
                          width={144}
                          height={144}
                          loading="lazy"
                          className="w-full h-full object-contain drop-shadow-sm select-none pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="pt-4 mt-2 border-t border-border/70 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-softBg text-dark-muted border border-border/80 group-hover:border-primary/20 group-hover:bg-primary-light/40 transition-colors"
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
