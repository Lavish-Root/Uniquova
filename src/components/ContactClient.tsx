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
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { trackEvent } from "@/components/Analytics";
import { CompanyInfo, DEFAULT_COMPANY_INFO, formatWhatsAppUrl } from "@/data/agencyData";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("E-commerce Solutions");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; leadId: string } | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);

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
            <div className="lg:col-span-7">
              <div className="bg-[#FAF9FF] border border-border rounded-3xl p-8 sm:p-10 shadow-sm relative">
                {successData ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-dark">Thank You!</h3>
                    <p className="text-base text-dark-muted max-w-md mx-auto leading-relaxed">
                      {successData.message}
                    </p>

                    <div className="bg-white border border-border rounded-xl p-3 inline-block text-xs font-mono text-primary font-bold">
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
                        className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-extrabold text-dark mb-1">
                        Project Brief Details
                      </h3>
                      <p className="text-xs text-dark-muted">
                        Please provide as much context as possible.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Maya Sharma"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark placeholder:text-dark-muted/60 text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                          Work Email <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="maya@brand.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark placeholder:text-dark-muted/60 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp <span className="text-dark-muted font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark placeholder:text-dark-muted/60 text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                          Company / Brand Name <span className="text-dark-muted font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Aurora Retail"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark placeholder:text-dark-muted/60 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                        Core Service Required <span className="text-primary">*</span>
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark text-sm outline-none transition-all"
                      >
                        <option value="Amazon Account Management">Amazon Seller Account Management</option>
                        <option value="Flipkart Account Management">Flipkart Seller Account Management</option>
                        <option value="Amazon PPC Management">Amazon PPC &amp; Marketplace Advertising</option>
                        <option value="Catalog Management">Catalog Management &amp; Listing Optimization</option>
                        <option value="E-commerce Solutions">E-commerce Solutions (Multi-Channel Overview)</option>
                        <option value="Website Development">Website Development (Next.js, Headless E-com, Custom Web Apps)</option>
                        <option value="App Development">App Development (iOS, Android, Cross-Platform)</option>
                        <option value="Branding">Branding (Identity, Strategy, Logo, Design Systems)</option>
                        <option value="Graphic Designing">Graphic Designing (Social Media, Performance Ads, Collaterals)</option>
                        <option value="Integrated Agency Package">All-In-One Integrated Growth Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                        Project Overview &amp; Goals <span className="text-primary">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us about your brand, current challenges, expected milestones, budget range, and timeline..."
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-dark placeholder:text-dark-muted/60 text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white font-bold text-base py-4 rounded-full shadow-glow-sm disabled:opacity-70 transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
