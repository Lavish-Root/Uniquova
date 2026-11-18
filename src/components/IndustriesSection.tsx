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
                className="bg-white rounded-3xl p-6 sm:p-7 border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Visual Image Header */}
                  <div className="h-44 sm:h-48 rounded-2xl overflow-hidden mb-6 relative border border-border/70 shadow-2xs bg-softBg">
                    <img
                      src={ind.image}
                      alt={`${ind.title} Showcase`}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Sector Tag */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-dark shadow-xs border border-white/40">
                      {ind.tag}
                    </div>

                    {/* Floating Corner Metric */}
                    {ind.floatingBadges?.[0] && (
                      <div className="absolute bottom-3 right-3 bg-dark/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-white shadow-md border border-white/10">
                        {ind.floatingBadges[0].text}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                      {ind.title}
                    </h3>
                  </div>

                  <p className="text-sm text-dark-muted leading-relaxed mb-6">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-border/70 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                    Key Deliverables
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {ind.solutions.slice(0, 4).map((sol) => (
                      <div key={sol} className="flex items-center gap-1.5 text-xs text-dark font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{sol}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/industries#${ind.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore Sector Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
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

