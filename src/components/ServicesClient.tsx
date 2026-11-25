"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { SERVICES_DATA } from "@/data/agencyData";
import ServicesSection from "@/components/ServicesSection";

const iconMap = {
  ShoppingCart: ShoppingCart,
  Code: Code,
  Smartphone: Smartphone,
  PenTool: PenTool,
  Palette: Palette,
};

export default function ServicesClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeModalService, setActiveModalService] = useState("E-commerce Solutions");

  const openInquiry = (serviceName: string) => {
    setActiveModalService(serviceName);
    setIsContactOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 purple-mesh-bg relative overflow-hidden">
        {/* Subtle geometric dot grid for depth */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#7545F5 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
              World-Class Services Crafted for{" "}
              <span className="gradient-text">Scalable Impact.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              Explore our comprehensive digital agency capabilities. From Amazon &amp; Flipkart marketplace scaling
              to high-performance web engineering, mobile apps, and iconic branding, we deliver end-to-end execution.
            </p>
          </div>
        </div>
      </section>

      {/* Core Digital Services Interactive Flowing Showcase */}
      <ServicesSection onSelectService={openInquiry} />

      {/* Services List with Rich Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES_DATA.map((service, index) => {
            const Icon = iconMap[service.iconName];
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative ${isEven ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {service.slug === "graphic-design" && <span id="graphic-designing" className="sr-only -top-24 absolute" />}
                {/* Content Side */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200/60">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{service.badge}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight leading-tight mb-3">
                    {service.title}
                  </h2>
                  <p className="text-base font-semibold text-primary mb-4">{service.tagline}</p>

                  <p className="text-base text-dark-muted leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2.5 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-dark mb-2">
                      Included Capabilities:
                    </p>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-sm text-dark font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 bg-dark hover:bg-primary text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200"
                    >
                      <span>View Full Service Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openInquiry(service.title)}
                      className="inline-flex items-center gap-2 bg-softBg hover:bg-primary-light text-primary font-bold text-sm px-6 py-3.5 rounded-full border border-primary/20 transition-all duration-200"
                    >
                      <span>Inquire Now</span>
                    </button>
                  </div>
                </div>

                {/* Deliverables Card Side */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="bg-[#FAF9FF] border border-border rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-sm border border-border">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-dark">Core Deliverables</h3>
                        <p className="text-xs text-dark-muted">Verified project outputs</p>
                      </div>
                    </div>

                    <div className="space-y-3 relative z-10 mb-8">
                      {service.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="bg-white p-3.5 rounded-xl border border-border flex items-start gap-3 text-xs sm:text-sm font-medium text-dark shadow-xs">
                          <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            {dIdx + 1}
                          </span>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border/80 pt-6 relative z-10">
                      <p className="text-xs font-bold uppercase tracking-wider text-dark-muted mb-3">
                        Key Commercial Benefits:
                      </p>
                      <ul className="space-y-2">
                        {service.benefits.map((ben, bIdx) => (
                          <li key={bIdx} className="text-xs text-dark-muted flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inquiry CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService={activeModalService}
      />
    </main>
  );
}
