"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { CompanyInfo, DEFAULT_COMPANY_INFO, formatWhatsAppUrl } from "@/data/agencyData";

interface ContactCTAProps {
  onOpenContact?: () => void;
}

export default function ContactCTA({ onOpenContact }: ContactCTAProps) {
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);

  useEffect(() => {
    // 1. Initial fetch from API with cache busting
    fetch(`/api/company-info?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.companyInfo) {
          setCompany(data.companyInfo);
        }
      })
      .catch(() => {});

    // 2. Real-time sync listener when CMS updates in same tab
    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CompanyInfo>;
      if (customEvt.detail) {
        setCompany(customEvt.detail);
      }
    };

    // 3. Cross-tab sync listener via localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "companyInfoUpdated") {
        fetch(`/api/company-info?t=${Date.now()}`, { cache: "no-store" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.companyInfo) {
              setCompany(data.companyInfo);
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener("companyInfoUpdated", handleUpdate);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("companyInfoUpdated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleWhatsAppClick = () => {
    // 1. Register click as lead inquiry in CMS
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "whatsapp_cta",
          name: "Direct WhatsApp Visitor",
          service: "Direct WhatsApp Project Chat",
          description: "Visitor clicked 'Chat on WhatsApp' from 'Have an Idea? Let's Make It Happen' CTA section.",
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    // 2. Track analytics event if available
    if (
      typeof window !== "undefined" &&
      typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function"
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "whatsapp_click", {
        location: "contact_cta",
      });
    }
  };

  const whatsappHref = formatWhatsAppUrl(company.whatsappNumber, company.whatsappMessage);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card with deep purple gradient */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#120e24] via-[#1a1438] to-[#0d091e] p-8 sm:p-14 lg:p-20 text-white shadow-2xl overflow-hidden border border-purple-500/20">
          {/* Ambient Purple Light Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-dark/30 rounded-full blur-[90px] pointer-events-none" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#7545f50a_1px,transparent_1px),linear-gradient(to_bottom,#7545f50a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider mb-6 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-primary-300" />
              <span>Let&apos;s Build Something Iconic</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6">
              Have an Idea? <br />
              <span className="bg-gradient-to-r from-primary-300 via-primary-200 to-white bg-clip-text text-transparent">
                Let&apos;s Make It Happen.
              </span>
            </h2>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-purple-200/90 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how UNIQUOVA can help your business move forward. From e-commerce
              marketplaces to custom web and mobile apps, our team is ready to scale your vision.
            </p>

            {/* Actions Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                type="button"
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-base px-9 py-4 rounded-full shadow-[0_12px_35px_rgba(117,69,245,0.45)] hover:shadow-[0_16px_45px_rgba(117,69,245,0.6)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-8 py-4 rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer hover:border-emerald-400/40"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Fast Response Guarantee */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-purple-200/80 font-medium pt-8 border-t border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Discovery calls scheduled within 24 hours
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span>Free scope assessment &amp; technical audit</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span>Direct NDA available upon request</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
