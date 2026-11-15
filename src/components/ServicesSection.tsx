"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SERVICES_DATA } from "@/data/agencyData";
import ServicesMarquee from "./ServicesMarquee";

const iconMap = {
  ShoppingCart: ShoppingCart,
  Code: Code,
  Smartphone: Smartphone,
  PenTool: PenTool,
  Palette: Palette,
};

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight mb-4">
            Our Core <span className="gradient-text">Digital Services</span>
          </h2>

          <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed">
            From scaling high-volume marketplace stores to architecting custom web and mobile
            applications, we deliver end-to-end digital excellence designed for scalable revenue.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName];

            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-3xl p-8 border border-border transition-all duration-300 hover:border-primary/40 hover:shadow-card-hover flex flex-col justify-between ${
                  index === 0 ? "lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Header: Icon & Category Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-softBg text-dark-muted border border-border">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-dark-muted leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Feature highlights list */}
                  <div className="space-y-2 mb-8 border-t border-border/60 pt-5">
                    {service.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-dark/90 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                    {service.features.length > 4 && (
                      <p className="text-[11px] text-dark-muted pl-6 font-medium">
                        + {service.features.length - 4} more specialized capabilities
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer: Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:text-primary-dark transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service.title);
                      }
                    }}
                    className="text-xs font-semibold text-dark-muted hover:text-dark px-3 py-1.5 rounded-full hover:bg-softBg transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Custom Enterprise & All-In-One Consultation */}
          <div className="bg-gradient-to-br from-dark via-[#1d1738] to-[#120e24] rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-primary/30 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-primary-300" />
                <span>Custom Bundle</span>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Need an Integrated Growth Strategy?
              </h3>

              <p className="text-sm text-purple-200/80 leading-relaxed mb-6">
                Combine e-commerce marketplace management with a custom Next.js storefront and
                cohesive branding to maximize revenue velocity.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-primary-300" />
                  <span>Dedicated Cross-Functional Team</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-primary-300" />
                  <span>Custom Service Scope & SLA</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-primary-300" />
                  <span>Direct Founder Slack Channel</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-glow-sm transition-all duration-200"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-lg font-bold text-dark">
              Not sure which service is right for your growth stage?
            </h4>
            <p className="text-sm text-dark-muted mt-1">
              Our digital strategists will audit your brand presence and map out a free roadmap.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-softBg hover:bg-primary-light text-primary font-bold text-sm px-6 py-3 rounded-full border border-primary/20 transition-all duration-200"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* FULL HORIZONTAL EDGE-TO-EDGE MARQUEE (Spans entire screen width) */}
      <div className="w-full mt-12 overflow-hidden relative z-10">
        <ServicesMarquee />
      </div>
    </section>
  );
}
