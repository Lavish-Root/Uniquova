"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import TeamSection from "@/components/TeamSection";
import {
  Sparkles,
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
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About UNIQUOVA</span>
            </div>

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight leading-tight">
                Our Story: Built on the Belief that Quality Drives Growth
              </h2>
              <p className="text-base text-dark-muted leading-relaxed">
                UNIQUOVA was founded to bridge the gap between creative branding studios that lack technical rigor
                and traditional dev shops that neglect conversion-focused design.
              </p>
              <p className="text-base text-dark-muted leading-relaxed">
                We assembled a world-class in-house collective of e-commerce marketplace managers,
                Next.js full-stack engineers, mobile app developers, and brand architects. By removing
                intermediaries and unifying these competencies, we provide our clients with an unfair
                competitive advantage in speed, quality, and measurable ROI.
              </p>

              <div className="pt-4 grid grid-cols-3 gap-6 border-t border-border">
                <div>
                  <p className="text-3xl font-extrabold text-primary">250+</p>
                  <p className="text-xs text-dark-muted mt-1 font-medium">Projects Shipped</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-primary">99.2%</p>
                  <p className="text-xs text-dark-muted mt-1 font-medium">On-Time Delivery</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-primary">3.4x</p>
                  <p className="text-xs text-dark-muted mt-1 font-medium">Average Client ROI</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="bg-gradient-to-tr from-primary-light to-white p-8 rounded-3xl border border-border/80 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
                
                <h3 className="text-2xl font-bold text-dark mb-4 relative z-10">
                  Our Mission &amp; Vision
                </h3>

                <div className="space-y-6 relative z-10">
                  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Our Mission</p>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      To empower ambitious businesses worldwide with high-performing e-commerce ecosystems,
                      bulletproof software architectures, and compelling brand storytelling that converts.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Our Vision</p>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      To become the global benchmark for creative technology agencies—where aesthetic elegance,
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
      <section className="py-20 bg-[#FAF9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-base text-dark-muted">
              The fundamental principles that guide every client interaction, line of code, and creative deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-card-hover hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">{val.title}</h3>
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
