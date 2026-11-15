import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Cpu,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { INDUSTRIES_DATA } from "@/data/agencyData";

const iconMap = {
  ShoppingBag: ShoppingBag,
  Cpu: Cpu,
  HeartPulse: HeartPulse,
  GraduationCap: GraduationCap,
  Sparkles: Sparkles,
  Rocket: Rocket,
};

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200">
            <span>Specialized Domain Knowledge</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight mb-4">
            Industries We <span className="gradient-text">Serve</span>
          </h2>

          <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed">
            Tailoring technology and creative strategies to the distinct operational realities,
            compliance frameworks, and consumer behaviors of each market sector.
          </p>
        </div>

        {/* 6 Industries Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = iconMap[ind.icon as keyof typeof iconMap] || Rocket;
            return (
              <div
                key={ind.id}
                className="bg-white rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-3">
                    {ind.title}
                  </h3>

                  <p className="text-sm text-dark-muted leading-relaxed mb-6">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-border/70 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-dark-muted mb-2">
                    Key Deliverables
                  </p>
                  {ind.solutions.map((sol) => (
                    <div key={sol} className="flex items-center gap-2 text-xs text-dark font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
          >
            <span>Explore Custom Industry Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

