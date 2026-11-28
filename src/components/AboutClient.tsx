"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import TeamSection from "@/components/TeamSection";
import StatsCounter from "@/components/ui/stats-counter";
import {
  Target,
  Eye,
  Award,
  Users,
  Shield,
  Zap,
} from "lucide-react";

export default function AboutClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const coreValues = [
    {
      title: "Radical Transparency",
      desc: "Clear timelines, open source-level honesty, and zero hidden costs or technical jargon.",
      icon: Eye,
    },
    {
      title: "Commercial Focus",
      desc: "Design and engineering that directly optimize conversions, ROAS, and recurring customer revenue.",
      icon: Target,
    },
    {
      title: "Craft & Precision",
      desc: "Pixel-perfect interfaces, accessible design tokens, and clean, modular production code.",
      icon: Award,
    },
    {
      title: "Speed with Stability",
      desc: "Rapid agile development cycles coupled with strict automated quality assurance.",
      icon: Zap,
    },
    {
      title: "Long-Term Partnership",
      desc: "We celebrate your victories and continuously iterate post-launch to maintain market leadership.",
      icon: Users,
    },
    {
      title: "Zero Compromise on Security",
      desc: "Enterprise-standard data safety, secure APIs, and compliant cloud architectures.",
      icon: Shield,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-28 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Studio Background Image - Positioned on the right side with True Alpha Mask */}
          <div
            className="absolute inset-y-0 right-0 w-full lg:w-3/4 xl:w-7/12 h-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)"
            }}
          >
            <img
              src="/images/about_hero_bg.jpg?v=1"
              alt="UNIQUOVA Creative Technology Agency Headquarters & Studio"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.06] brightness-[1.02]"
            />
            {/* Subtle Brand Theme Tint Overlay */}
            <div className="absolute inset-0 bg-[#7545F5]/[0.03] mix-blend-multiply" />

            {/* Top & Bottom seamless gradient transitions */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF9FF] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent" />
          </div>

          {/* Subtle geometric dot grid for depth */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(#7545F5 1.5px, transparent 1.5px)`,
              backgroundSize: "32px 32px"
            }}
          />

          {/* Ambient Glow Orbs */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-light/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
              Empowering Visionary Brands in the{" "}
              <span className="gradient-text">Digital Era.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              We are a full-service creative technology agency helping startups, e-commerce brands,
              and expanding enterprises turn bold visions into dominant digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Origin */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight leading-tight">
                Our Story: Built on the Belief that Quality Drives Growth
              </h2>
              <p className="text-base text-dark-muted leading-relaxed">
                UNIQUOVA was founded to bridge the gap between creative branding studios that lack technical rigor
                and traditional dev shops that neglect conversion-focused design.
              </p>
              <p className="text-base text-dark-muted leading-relaxed">
                We assembled a world-class in-house collective of{" "}
                <span className="whitespace-nowrap">e-commerce</span> marketplace managers,
                Next.js full-stack engineers, mobile app developers, and brand architects. By removing
                intermediaries and unifying these competencies, we provide our clients with an unfair
                competitive advantage in speed, quality, and measurable ROI.
              </p>

              <div className="pt-4 grid grid-cols-3 gap-4 sm:gap-6 border-t border-border">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                    <StatsCounter value={250} suffix="+" delay={0} />
                  </p>
                  <p className="text-xs text-dark-muted mt-1 font-medium">Projects Shipped</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                    <StatsCounter value={99.2} decimals={1} suffix="%" delay={0.08} />
                  </p>
                  <p className="text-xs text-dark-muted mt-1 font-medium">On-Time Delivery</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary">
                    <StatsCounter value={3.4} decimals={1} suffix="x" delay={0.16} />
                  </p>
                  <p className="text-xs text-dark-muted mt-1 font-medium">Average Client ROI</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="bg-gradient-to-tr from-primary-light to-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border/80 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />

                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-4 relative z-10 text-center sm:text-left">
                  Our Mission &amp; Vision
                </h3>

                <div className="space-y-4 sm:space-y-6 relative z-10">
                  <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border shadow-sm text-left">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5 sm:mb-2">Our Mission</p>
                    <p className="text-[13.5px] sm:text-sm text-dark-muted leading-relaxed text-pretty">
                      To empower ambitious businesses worldwide with high-performing{" "}
                      <span className="whitespace-nowrap">e-commerce</span> ecosystems,
                      bulletproof software architectures, and compelling brand storytelling that converts.
                    </p>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border shadow-sm text-left">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5 sm:mb-2">Our Vision</p>
                    <p className="text-[13.5px] sm:text-sm text-dark-muted leading-relaxed text-pretty">
                      To become the global benchmark for creative technology agencies &mdash; where aesthetic elegance,
                      engineering brilliance, and commercial profitability operate in total harmony.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-14 md:py-20 bg-[#FAF9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-3 md:mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-base text-dark-muted">
              The fundamental principles that guide every client interaction, line of code, and creative deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-border shadow-sm hover:shadow-card-hover hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 md:block mb-2.5 md:mb-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary-light text-primary flex items-center justify-center shrink-0 md:mb-6">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-dark leading-snug md:mb-2">
                      {val.title}
                    </h3>
                  </div>
                  <p className="text-sm text-dark-muted leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <TeamSection />

      {/* Contact CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
