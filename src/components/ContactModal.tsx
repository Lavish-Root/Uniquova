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
        <div className="p-6 sm:p-8 overflow-y-auto bg-gradient-to-br from-white via-[#FAF9FF] to-primary/[0.03] text-dark relative overflow-hidden">
          {/* Brand ambient glow orbs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl pointer-events-none" />

          {successData ? (
            <div className="text-center py-8 space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-black text-dark">Inquiry Confirmed!</h4>
              <p className="text-sm text-dark-muted max-w-md mx-auto leading-relaxed font-medium">
                {successData.message}
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-xl p-3 inline-block text-xs font-mono text-primary font-bold shadow-xs">
                Reference ID: {successData.leadId}
              </div>

              <div className="pt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gradient-to-r from-primary via-[#6836F5] to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white font-bold text-sm px-8 py-3.5 rounded-[14px] shadow-[0_8px_25px_rgba(117,69,245,0.35)] hover:shadow-[0_12px_32px_rgba(117,69,245,0.5)] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
              {errorMsg && (
                <div className="flex items-center gap-3 p-3.5 rounded-[16px] bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                    Your Name <span className="text-primary font-bold">*</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                    <User className="w-5 h-5 text-primary shrink-0" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                    Email Address <span className="text-primary font-bold">*</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                    Phone / WhatsApp <span className="text-dark-muted/60 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
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

                {/* Company */}
                <div>
                  <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                    Company / Brand <span className="text-dark-muted/60 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                    <Building2 className="w-5 h-5 text-primary shrink-0" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Studios"
                      className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                  Service Required <span className="text-primary font-bold">*</span>
                </label>
                <div className="flex items-center gap-3 rounded-[25px] px-4 py-3 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-primary shrink-0" />
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-dark text-sm font-medium cursor-pointer [&>option]:bg-white [&>option]:text-dark"
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
                <label className="block text-[11px] font-bold text-dark/80 uppercase tracking-wider mb-2">
                  Project Description &amp; Goals <span className="text-primary font-bold">*</span>
                </label>
                <div className="flex items-start gap-3 rounded-[22px] px-4 py-3.5 bg-[#F8F7FD] text-dark shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border border-purple-200/70 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_20px_rgba(117,69,245,0.15)] transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your brand, current challenges, target launch timeline, or expected metrics..."
                    className="bg-transparent border-none outline-none w-full text-dark placeholder:text-dark-muted/50 text-sm font-medium resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="https://wa.me/919876543210?text=Hello%20UNIQUOVA%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Or quick-chat on WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-[#6836F5] to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white font-bold text-sm px-8 py-3.5 rounded-[14px] shadow-[0_8px_25px_rgba(117,69,245,0.35)] hover:shadow-[0_12px_32px_rgba(117,69,245,0.5)] hover:scale-[1.01] border border-white/20 transition-all duration-300 ease-in-out cursor-pointer active:scale-95 disabled:opacity-70"
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
