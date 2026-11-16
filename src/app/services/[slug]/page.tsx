"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import {
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  ArrowRight,
  CheckCircle2,
  Layers,
  TrendingUp,
} from "lucide-react";
import { SERVICES_DATA } from "@/data/agencyData";

const iconMap = {
  ShoppingCart: ShoppingCart,
  Code: Code,
  Smartphone: Smartphone,
  PenTool: PenTool,
  Palette: Palette,
};

const SERVICE_BG_IMAGES: Record<string, string> = {
  ecommerce: "/images/services/ecom_laptop_cart.jpg",
  "web-development": "/images/services/web_dev_bg.jpg",
  "app-development": "/images/services/app_dev_bg.jpg",
  branding: "/images/services/branding_bg.jpg?v=3",
  "graphic-designing": "/images/services/graphic_design_bg.jpg?v=3",
  "graphic-design": "/images/services/graphic_design_bg.jpg?v=3",
};

export default function IndividualServicePage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Normalize slug mapping
  let lookupSlug = rawSlug;
  if (rawSlug === "graphic-design") lookupSlug = "graphic-designing";

  const service = SERVICES_DATA.find((s) => s.slug === lookupSlug || s.slug === rawSlug);

  if (!service) {
    return (
      <main className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="py-40 text-center max-w-xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-dark mb-4">Service Not Found</h1>
          <p className="text-dark-muted mb-6">The requested service does not exist.</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full"
          >
            <span>Back to All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const IconComponent = iconMap[service.iconName];
  const bgImage = SERVICE_BG_IMAGES[service.slug] || "/images/services/ecom_laptop_cart.jpg";

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section with Themed Background Image and Guaranteed Text Legibility */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Service Background Image - Positioned on the right side with True Alpha Mask */}
          <div 
            className="absolute inset-y-0 right-0 w-full lg:w-3/4 xl:w-7/12 h-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)"
            }}
          >
            <img
              src={bgImage}
              alt={`${service.title} Service Background`}
              className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.06] brightness-[1.02]"
            />
            {/* Subtle Brand Theme Tint Overlay */}
            <div className="absolute inset-0 bg-[#7545F5]/[0.03] mix-blend-multiply" />
            
            {/* Top & Bottom seamless gradient transitions */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF9FF] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
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

        {/* Content Container (z-10 guarantees it sits cleanly above background) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <IconComponent className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-4">
              {service.title}
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-bold text-primary mb-6">
              {service.tagline}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed mb-8 max-w-2xl">
              {service.shortDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-8 py-4 rounded-full shadow-glow-sm hover:shadow-glow transition-all duration-200"
              >
                <span>Inquire About {service.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#deliverables"
                className="inline-flex items-center gap-2 bg-white hover:bg-softBg text-dark font-semibold text-sm px-6 py-4 rounded-full border border-border shadow-xs transition-colors backdrop-blur-sm"
              >
                <span>View Deliverables &amp; Workflow</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Features & Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-4">
              Scope of <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-base text-dark-muted">
              Everything included under UNIQUOVA&apos;s {service.title.toLowerCase()} service framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9FF] p-6 rounded-2xl border border-border flex items-start gap-3.5 hover:border-primary/40 hover:bg-white hover:shadow-card transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-dark mb-1">{feature}</h3>
                  <p className="text-xs text-dark-muted">
                    Handled end-to-end by experienced in-house specialists.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Deliverables & Benefits */}
      <section id="deliverables" className="py-20 bg-[#FAF9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Deliverables Column */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>Tangible Outputs</span>
              </div>
              <h3 className="text-2xl font-extrabold text-dark mb-6">
                Deliverables You Receive
              </h3>

              <div className="space-y-4">
                {service.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="p-4 rounded-xl bg-softBg border border-border flex items-start gap-3 text-sm font-semibold text-dark">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {dIdx + 1}
                    </span>
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Column */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Commercial Growth</span>
                </div>
                <h3 className="text-2xl font-extrabold text-dark mb-6">
                  Key Strategic Benefits
                </h3>

                <div className="space-y-4">
                  {service.benefits.map((ben, bIdx) => (
                    <div key={bIdx} className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-3 text-sm font-medium text-dark">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-dark hover:bg-primary text-white font-semibold text-sm py-4 rounded-full transition-colors"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Workflow & Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-4">
              Our 4-Phase <span className="gradient-text">Execution Workflow</span>
            </h2>
            <p className="text-base text-dark-muted">
              How we systematically onboard, strategize, execute, and deliver results for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.workflow.map((wf) => (
              <div
                key={wf.step}
                className="p-6 rounded-3xl bg-[#FAF9FF] border border-border hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-primary/40 mb-4 block">
                    {wf.step}
                  </span>
                  <h3 className="text-lg font-bold text-dark mb-2">{wf.title}</h3>
                  <p className="text-xs text-dark-muted leading-relaxed">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: FAQs for this service */}
      {service.faqs.length > 0 && (
        <section className="py-20 bg-[#FAF9FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-dark tracking-tight mb-3">
                {service.title} FAQs
              </h2>
              <p className="text-sm text-dark-muted">
                Frequently asked questions specific to this engagement.
              </p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm"
                >
                  <h3 className="text-base font-bold text-dark mb-2">{faq.q}</h3>
                  <p className="text-sm text-dark-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section: Inquiry CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService={service.title}
      />
    </main>
  );
}
