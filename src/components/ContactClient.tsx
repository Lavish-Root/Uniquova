"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  PhoneCall,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  Star,
  MessageSquarePlus,
  User,
  Building2,
} from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";
import ServiceSelect, { type ServiceSelectOption } from "@/components/ui/service-select";
import { trackEvent } from "@/components/Analytics";
import { CompanyInfo, DEFAULT_COMPANY_INFO, formatWhatsAppUrl } from "@/data/agencyData";

const CORE_SERVICE_OPTIONS: ServiceSelectOption[] = [
  {
    value: "Amazon Account Management",
    label: "Amazon Seller Account Management",
    subtitle: "Full storefront, A+ content & account health",
    icon: "amazon",
  },
  {
    value: "Flipkart Account Management",
    label: "Flipkart Seller Account Management",
    subtitle: "Catalog scaling & marketplace operations",
    icon: "flipkart",
  },
  {
    value: "Amazon PPC Management",
    label: "Amazon PPC & Marketplace Advertising",
    subtitle: "ROAS-driven sponsored ad campaigns",
    icon: "ppc",
  },
  {
    value: "Catalog Management",
    label: "Catalog Management & Listing Optimization",
    subtitle: "SEO titles, bullets & rich product variations",
    icon: "catalog",
  },
  {
    value: "E-commerce Solutions",
    label: "E-commerce Solutions",
    subtitle: "Multi-Channel Overview",
    icon: "ecommerce",
  },
  {
    value: "Website Development",
    label: "Website Development",
    subtitle: "Next.js, Headless E-com, Custom Web Apps",
    icon: "web",
  },
  {
    value: "App Development",
    label: "App Development",
    subtitle: "iOS, Android, Cross-Platform",
    icon: "app",
  },
  {
    value: "Branding",
    label: "Branding",
    subtitle: "Identity, Strategy, Logo, Design Systems",
    icon: "branding",
  },
  {
    value: "Graphic Designing",
    label: "Graphic Designing",
    subtitle: "Social Media, Performance Ads, Collaterals",
    icon: "design",
  },
  {
    value: "Integrated Agency Package",
    label: "All-In-One Integrated Growth Partnership",
    subtitle: "End-to-end multi-discipline agency team",
    badge: "Popular",
    icon: "integrated",
  },
];

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Amazon Account Management");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; leadId: string } | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("uniquova_company_info");
      if (cached) {
        setCompanyInfo(JSON.parse(cached));
      }
    } catch {
      // Ignore
    }

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CompanyInfo>;
      if (customEvt.detail) {
        setCompanyInfo(customEvt.detail);
        try {
          sessionStorage.setItem("uniquova_company_info", JSON.stringify(customEvt.detail));
        } catch {
          // Ignore
        }
      }
    };

    window.addEventListener("companyInfoUpdated", handleUpdate);
    return () => window.removeEventListener("companyInfoUpdated", handleUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccessData({ message: data.message, leadId: data.leadId });

      // Track lead generation conversion event
      trackEvent("generate_lead", {
        lead_id: data.leadId,
        service_requested: service,
      });

      import("canvas-confetti").then((module) => {
        const confettiFn = module.default;
        confettiFn({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#7545F5", "#5030C7", "#9E76FB", "#FFFFFF"],
        });
      }).catch(() => {});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred while submitting your message.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-28 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Executive Discovery Background Image - Positioned on the right side with True Alpha Mask */}
          <div 
            className="absolute inset-y-0 right-0 w-full lg:w-3/4 xl:w-7/12 h-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)"
            }}
          >
            <img
              src="/images/contact_hero_bg.jpg?v=1"
              alt="UNIQUOVA Executive Project Discovery and Consultation"
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
              Start Your Project with <br />
              <span className="gradient-text">UNIQUOVA.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              Whether you need to scale marketplace revenues, engineer a custom web or mobile platform,
              or forge an iconic brand identity, we are ready to partner.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Assurances */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-dark mb-3">
                  Let&apos;s Discuss Your Vision
                </h2>
                <p className="text-sm text-dark-muted leading-relaxed">
                  Fill out the form or reach out through direct business channels. Our strategy
                  directors respond to all qualified inquiries within 24 business hours.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#FAF9FF] border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark-muted">Email Inquiries</p>
                    <a
                      href={`mailto:${companyInfo.email || "hello@uniquova.com"}`}
                      onClick={() => trackEvent("email_click", { destination: companyInfo.email || "hello@uniquova.com" })}
                      className="text-base font-bold text-dark hover:text-primary transition-colors break-all"
                    >
                      {companyInfo.email || "hello@uniquova.com"}
                    </a>
                    <p className="text-xs text-dark-muted mt-0.5">
                      {companyInfo.emailLabel || "RFPs, partnerships & career queries"}
                    </p>
                  </div>
                </div>

                {/* Primary Phone Line */}
                <div className="p-5 rounded-2xl bg-[#FAF9FF] border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark-muted">Direct Line 1</p>
                    <a
                      href={`tel:${(companyInfo.primaryPhone || "+919876543210").replace(/\s+/g, "")}`}
                      onClick={() => trackEvent("phone_call_click", { number: companyInfo.primaryPhone || "+919876543210" })}
                      className="text-base font-bold text-dark hover:text-primary transition-colors"
                    >
                      {companyInfo.primaryPhone || "+91 (0) 98765-43210"}
                    </a>
                    <p className="text-xs text-dark-muted mt-0.5">
                      {companyInfo.primaryPhoneLabel || "Mon – Sat, 9:30 AM – 7:00 PM IST"}
                    </p>
                  </div>
                </div>

                {/* Secondary Phone Line (if configured) */}
                {companyInfo.secondaryPhone && (
                  <div className="p-5 rounded-2xl bg-[#FAF9FF] border border-border flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-dark-muted">Direct Line 2</p>
                      <a
                        href={`tel:${companyInfo.secondaryPhone.replace(/\s+/g, "")}`}
                        onClick={() => trackEvent("phone_call_click", { number: companyInfo.secondaryPhone })}
                        className="text-base font-bold text-dark hover:text-primary transition-colors"
                      >
                        {companyInfo.secondaryPhone}
                      </a>
                      <p className="text-xs text-dark-muted mt-0.5">
                        {companyInfo.secondaryPhoneLabel || "Support & Direct Line"}
                      </p>
                    </div>
                  </div>
                )}

                {/* WhatsApp Direct */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Instant WhatsApp Chat</p>
                    <a
                      href={formatWhatsAppUrl(
                        companyInfo.whatsappNumber || DEFAULT_COMPANY_INFO.whatsappNumber,
                        companyInfo.whatsappMessage || DEFAULT_COMPANY_INFO.whatsappMessage
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { platform: "whatsapp" })}
                      className="text-base font-bold text-emerald-900 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Connect with Lead Strategist</span>
                      <span>→</span>
                    </a>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Replies via WhatsApp ({companyInfo.whatsappNumber || "+91 98765 43210"})
                    </p>
                  </div>
                </div>

                {/* Operations Hub / Address */}
                <div className="p-5 rounded-2xl bg-[#FAF9FF] border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-dark-muted">Operations Hub</p>
                    <p className="text-sm font-bold text-dark">
                      {companyInfo.officeName || "UNIQUOVA Digital Agency"}
                    </p>
                    <p className="text-xs text-dark-muted mt-0.5 leading-relaxed">
                      {companyInfo.address || "Serving Clients Across India & Worldwide"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Assurances */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-xs text-dark font-medium">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Guaranteed response within 24 business hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-dark font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>Strict Non-Disclosure Agreement (NDA) on request</span>
                </div>
              </div>
            </div>

            {/* Right: Lead Inquiry Form */}
            {/*
              From Uiverse.io by Praashoo7 - https://uiverse.io/Praashoo7/brave-moose-56
              MIT License, Copyright (c) Praashoo7 (Prashant)
            */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-br from-white via-[#FAF9FF] to-primary/[0.04] border border-primary/25 rounded-[28px] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(117,69,245,0.12),0_10px_25px_-5px_rgba(0,0,0,0.03)] transition-all duration-400 ease-in-out hover:scale-[1.01] hover:border-primary/45 hover:shadow-[0_30px_75px_-15px_rgba(117,69,245,0.2),0_15px_30px_-5px_rgba(0,0,0,0.05)] relative group">
                {/* Brand ambient glow orbs clipped cleanly to card frame */}
                <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-200/35 rounded-full blur-3xl" />
                </div>

                {successData ? (
                  <div className="text-center py-12 space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl font-black text-dark">Thank You!</h3>
                    <p className="text-base text-dark-muted max-w-md mx-auto leading-relaxed font-medium">
                      {successData.message}
                    </p>

                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-3 inline-block text-xs font-mono text-primary font-bold shadow-xs">
                      Reference ID: {successData.leadId}
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => {
                          setSuccessData(null);
                          setName("");
                          setEmail("");
                          setPhone("");
                          setCompany("");
                          setDescription("");
                        }}
                        className="bg-gradient-to-r from-primary via-[#6836F5] to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white font-bold text-sm px-8 py-3.5 rounded-[14px] shadow-[0_8px_25px_rgba(117,69,245,0.35)] hover:shadow-[0_12px_32px_rgba(117,69,245,0.5)] transition-all duration-300 active:scale-95 cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                    <div className="text-center sm:text-left mb-2">
                      <h3 className="text-xl sm:text-2xl font-black text-dark mb-1.5 tracking-tight">
                        Project Brief <span className="gradient-text">Details.</span>
                      </h3>
                      <p className="text-xs text-dark-muted font-medium">
                        Please provide as much context as possible for your inquiry.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="flex items-center gap-3 p-4 rounded-[16px] bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                          Full Name <span className="text-primary font-bold">*</span>
                        </label>
                        <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 sm:py-3.5 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                          <User className="w-5 h-5 text-primary shrink-0" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Maya Sharma"
                            className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Work Email */}
                      <div>
                        <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                          Work Email <span className="text-primary font-bold">*</span>
                        </label>
                        <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 sm:py-3.5 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                          <svg className="w-5 h-5 text-primary shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                          </svg>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="maya@brand.com"
                            className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                          Phone / WhatsApp <span className="text-dark-muted/60 font-normal">(Optional)</span>
                        </label>
                        <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 sm:py-3.5 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                          <Phone className="w-5 h-5 text-primary shrink-0" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Company / Brand Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                          Company / Brand Name <span className="text-dark-muted/60 font-normal">(Optional)</span>
                        </label>
                        <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 sm:py-3.5 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                          <Building2 className="w-5 h-5 text-primary shrink-0" />
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Aurora Retail"
                            className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Core Service Required */}
                    <div>
                      <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                        Core Service Required <span className="text-primary font-bold">*</span>
                      </label>
                      <ServiceSelect
                        value={service}
                        onChange={setService}
                        options={CORE_SERVICE_OPTIONS}
                      />
                    </div>

                    {/* Project Overview & Goals */}
                    <div>
                      <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                        Project Overview &amp; Goals <span className="text-primary font-bold">*</span>
                      </label>
                      <div className="flex items-start gap-3 rounded-[22px] px-4 py-3.5 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                        <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <textarea
                          required
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Tell us about your brand, current challenges, expected milestones, budget range, and timeline..."
                          className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium resize-none"
                        />
                      </div>
                    </div>

                    {/* Buttons in Brave-Moose Uiverse Style with Brand Theme */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-[#6836F5] to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white font-bold text-sm py-3.5 px-6 rounded-[14px] shadow-[0_8px_25px_rgba(117,69,245,0.35)] hover:shadow-[0_12px_32px_rgba(117,69,245,0.5)] hover:scale-[1.01] border border-white/25 transition-all duration-300 ease-in-out cursor-pointer active:scale-95 disabled:opacity-70"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Submitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Project Inquiry</span>
                            <Send className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setName("");
                          setEmail("");
                          setPhone("");
                          setCompany("");
                          setDescription("");
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-50/80 hover:bg-primary-100 text-primary hover:text-primary-dark font-bold text-xs py-3.5 px-6 rounded-[14px] border border-primary/20 hover:border-primary/40 shadow-xs transition-all duration-300 ease-in-out cursor-pointer active:scale-95"
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Existing Client Feedback Section */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF9FF] via-white to-primary/[0.04] border border-primary/25 shadow-xs relative overflow-hidden group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-dark">Client Feedback</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="flow-root sm:flex sm:items-center sm:justify-between sm:gap-4">
                      <p className="text-xs text-dark-muted leading-relaxed inline sm:block">
                        Already partnered with UNIQOVA? Share your experience, project review, and feedback with our executive team.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsFeedbackModalOpen(true)}
                        className="float-right sm:float-none inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all active:scale-95 ml-1.5 sm:ml-0 mt-2 sm:mt-0 shrink-0 whitespace-nowrap"
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span>Leave Client Feedback</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Client Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
