import React from "react";
import Link from "next/link";
import {
  Layers,
  TrendingUp,
  Lightbulb,
  Cpu,
  Maximize2,
  Users2,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { WHY_CHOOSE_US_DATA } from "@/data/agencyData";

const iconMap = [
  Layers,
  TrendingUp,
  Lightbulb,
  Cpu,
  Maximize2,
  Users2,
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200">
              <Zap className="w-3.5 h-3.5" />
              <span>The UNIQUOVA Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Built Around Your <br />
              <span className="gradient-text">Business Goals.</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-dark-muted leading-relaxed">
              We bridge the gap between imaginative creative design and rigorous engineering.
              Every line of code and every brand identity is crafted with one clear objective:
              driving measurable commercial results for your enterprise.
            </p>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {WHY_CHOOSE_US_DATA.map((pillar, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <div
                key={pillar.id}
                className="group relative bg-[#FAF9FF] hover:bg-white rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-primary-light text-primary flex items-center justify-center border border-border group-hover:border-primary-200 transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-dark group-hover:text-primary transition-colors">
                        {pillar.stat}
                      </span>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
                        {pillar.statLabel}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-dark-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Guaranteed Standards</span>
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Dedicated Partnership */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 sm:p-12 text-white shadow-glow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Outsourcing Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                Work directly with dedicated in-house specialists.
              </h3>
              <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
                No middle agents, no endless email chains. You get direct access to our senior
                developers, marketplace managers, and brand strategists committed to your growth.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white text-dark hover:bg-purple-50 font-bold text-sm px-6 py-4 rounded-full shadow-md transition-all duration-200"
              >
                <span>Learn About Our Culture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

