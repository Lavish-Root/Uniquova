"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  MessageSquare,
  User,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  defaultService = "E-commerce Solutions",
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(defaultService);
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; leadId: string } | null>(null);

  useEffect(() => {
    if (defaultService) {
      setService(defaultService);
    }
  }, [defaultService]);

  useEffect(() => {
    // ESC key closes modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
          lead_id: data.leadId,
          service_requested: service,
          source: "contact_modal",
        });
      }

      // Trigger celebratory confetti lazily
      import("canvas-confetti").then((module) => {
        const confettiFn = module.default;
        confettiFn({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#7545F5", "#5030C7", "#9E76FB", "#FFFFFF"],
        });
      }).catch(() => {});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDescription("");
    setSuccessData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-dark/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-purple-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast-Track Project Inquiry</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            Let&apos;s Build Your Next Digital Milestone
          </h3>
          <p className="text-sm text-purple-100 mt-1.5">
            Share your goals below and our digital strategists will prepare a tailored proposal.
          </p>
        </div>

        {/* Modal Body */}
        {/*
          From Uiverse.io by Praashoo7 - https://uiverse.io/Praashoo7/brave-moose-56
          MIT License, Copyright (c) Praashoo7 (Prashant)
        */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-[#171717] text-white">
          {successData ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-extrabold text-white">Inquiry Confirmed!</h4>
              <p className="text-sm text-[#d3d3d3] max-w-md mx-auto leading-relaxed">
                {successData.message}
              </p>

              <div className="bg-[#252525] border border-white/10 rounded-xl p-3 inline-block text-xs font-mono text-purple-300 font-bold">
                Reference ID: {successData.leadId}
              </div>

              <div className="pt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-[#252525] hover:bg-black text-white font-semibold text-sm px-8 py-3 rounded-[8px] border border-white/15 transition-all duration-400"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errorMsg && (
                <div className="flex items-center gap-3 p-3.5 rounded-[16px] bg-red-950/50 border border-red-500/30 text-red-200 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-[#d3d3d3] uppercase tracking-wider mb-2">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#171717] text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] border border-transparent focus-within:border-white/20 transition-all duration-300">
                    <User className="w-5 h-5 text-white shrink-0" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="bg-transparent border-none outline-none w-full text-[#d3d3d3] placeholder:text-[#666666] text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-[#d3d3d3] uppercase tracking-wider mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#171717] text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] border border-transparent focus-within:border-white/20 transition-all duration-300">
                    <Mail className="w-5 h-5 text-white shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="bg-transparent border-none outline-none w-full text-[#d3d3d3] placeholder:text-[#666666] text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-[#d3d3d3] uppercase tracking-wider mb-2">
                    Phone / WhatsApp <span className="text-[#888888] font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#171717] text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] border border-transparent focus-within:border-white/20 transition-all duration-300">
                    <Phone className="w-5 h-5 text-white shrink-0" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="bg-transparent border-none outline-none w-full text-[#d3d3d3] placeholder:text-[#666666] text-sm"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[11px] font-bold text-[#d3d3d3] uppercase tracking-wider mb-2">
                    Company / Brand <span className="text-[#888888] font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#171717] text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] border border-transparent focus-within:border-white/20 transition-all duration-300">
                    <Building2 className="w-5 h-5 text-white shrink-0" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Studios"
                      className="bg-transparent border-none outline-none w-full text-[#d3d3d3] placeholder:text-[#666666] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-[11px] font-bold text-[#d3d3d3] uppercase tracking-wider mb-2">
                  Service Required <span className="text-primary">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#171717] text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] border border-transparent focus-within:border-white/20 transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-white shrink-0" />
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-[#d3d3d3] text-sm cursor-pointer [&>option]:bg-[#171717] [&>option]:text-white"
                  >
                    <option value="E-commerce Solutions">E-commerce Solutions (Amazon, Flipkart, PPC)</option>
                    <option value="Website Development">Website Development (Next.js, Custom Web Apps)</option>
                    <option value="App Development">App Development (iOS, Android, Cross-Platform)</option>
                    <option value="Branding">Branding (Identity, Logo, Strategy, Guidelines)</option>
                    <option value="Graphic Designing">Graphic Designing (Social, Ad Creatives, Collaterals)</option>
                    <option value="Integrated Growth Package">Integrated All-In-One Growth Package</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-[11px] font-bold text-[#d3d3d3] uppercase tracking-wider mb-2">
                  Project Description &amp; Goals <span className="text-primary">*</span>
                </label>
                <div className="flex items-start gap-3 rounded-[22px] px-4 py-3.5 bg-[#171717] text-white shadow-[inset_2px_5px_10px_rgb(5,5,5)] border border-transparent focus-within:border-white/20 transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your brand, current challenges, target launch timeline, or expected metrics..."
                    className="bg-transparent border-none outline-none w-full text-[#d3d3d3] placeholder:text-[#666666] text-sm resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="https://wa.me/919876543210?text=Hello%20UNIQUOVA%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Or quick-chat on WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#252525] hover:bg-black text-white font-bold text-sm px-8 py-3.5 rounded-[8px] border border-white/10 hover:border-white/25 shadow-md transition-all duration-400 ease-in-out cursor-pointer active:scale-95 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
