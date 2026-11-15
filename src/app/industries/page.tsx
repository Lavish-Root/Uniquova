"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import { INDUSTRIES_DATA } from "@/data/agencyData";
import {
  ShoppingBag,
  Cpu,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  ShoppingBag: ShoppingBag,
  Cpu: Cpu,
  HeartPulse: HeartPulse,
  GraduationCap: GraduationCap,
  Sparkles: Sparkles,
  Rocket: Rocket,
};

export default function IndustriesPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 purple-mesh-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Domain Expertise</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
              Tailored Solutions for Your <br />
              <span className="gradient-text">Industry Sector.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              We understand that e-commerce brands have vastly different compliance, velocity,
              and scaling needs compared to SaaS platforms, healthcare providers, or lifestyle labels.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dives into Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = iconMap[ind.icon as keyof typeof iconMap] || Rocket;

            return (
              <div
                key={ind.id}
                className="bg-[#FAF9FF] rounded-3xl p-8 sm:p-12 border border-border hover:border-primary/40 transition-all shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center mb-6 shadow-sm border border-border">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-dark mb-4">
                      {ind.title}
                    </h2>

                    <p className="text-base text-dark-muted leading-relaxed mb-6">
                      {ind.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {ind.solutions.map((sol) => (
                        <div key={sol} className="flex items-center gap-2.5 text-sm font-semibold text-dark">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{sol}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsContactOpen(true)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      <span>Consult with our {ind.title} lead</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-dark-muted mb-4">
                      Why UNIQUOVA for {ind.title}
                    </h3>
                    <ul className="space-y-3 text-sm text-dark-muted">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>Pre-configured integrations and regulatory compliance checklists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>High-converting UI patterns tested against real industry benchmarks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>Continuous ROAS and engagement analytics tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
