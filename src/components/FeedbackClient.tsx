"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Building,
  Briefcase,
  User,
  ArrowRight,
  Send,
  Upload,
  Trash2,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Amazon Seller Account Management",
  "Flipkart Seller Account Management",
  "Amazon PPC & Marketplace Advertising",
  "E-commerce Catalog Management",
  "Website Development",
  "Mobile App Development",
  "Branding",
  "Graphic Designing",
];

export default function FeedbackClient() {
  const searchParams = useSearchParams();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    service: SERVICE_OPTIONS[0],
    rating: 5,
    quote: "",
    code: "",
    avatar: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle client-side optional avatar/photo upload with auto-resize
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image file must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 240;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.88);
          setFormData((prev) => ({ ...prev, avatar: compressed }));
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  // Auto-fill from query params if UNIQOVA sent a direct link (e.g. ?code=UNIQOVA2026&service=Website+Development)
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const nameParam = searchParams.get("name");
    const companyParam = searchParams.get("company");

    if (serviceParam && SERVICE_OPTIONS.includes(serviceParam)) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    if (nameParam) setFormData((prev) => ({ ...prev, name: nameParam }));
    if (companyParam) setFormData((prev) => ({ ...prev, company: companyParam }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.quote.trim() || formData.quote.trim().length < 10) {
      setErrorMessage("Please provide feedback of at least 10 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.error || "Failed to submit feedback. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Optimistic storage
      try {
        const stored = JSON.parse(localStorage.getItem("uniqova_user_testimonials") || "[]");
        stored.unshift(result.testimonial);
        localStorage.setItem("uniqova_user_testimonials", JSON.stringify(stored));
      } catch {
        // LocalStorage fallback
      }

      window.dispatchEvent(
        new CustomEvent("testimonialSubmitted", {
          detail: result.testimonial,
        })
      );

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 purple-mesh-bg relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#7545F5 1.5px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
            Share Your <span className="gradient-text">UNIQUOVA Journey</span>
          </h1>

          <p className="text-base sm:text-lg text-dark-muted font-normal max-w-2xl mx-auto leading-relaxed">
            Your insights inspire our team and guide fellow business leaders. Fill in the verified feedback form below to feature your brand on our official wall of client success.
          </p>
        </div>
      </section>

      {/* Main Feedback Form Section */}
      <section className="py-16 sm:py-24 bg-white flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: The Form */}
            <div className="lg:col-span-7 bg-[#FAF9FF] border border-border p-8 sm:p-10 rounded-3xl shadow-sm">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-dark mb-3">Thank You, {formData.name}!</h2>
                  <p className="text-dark-muted text-base max-w-md mx-auto mb-8">
                    Your verified client feedback has been recorded and is now live in our official services testimonial wall.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href="/#reviews"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-glow-sm"
                    >
                      <span>View on Homepage</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="inline-flex items-center gap-2 bg-white hover:bg-softBg text-dark font-semibold text-sm px-6 py-3.5 rounded-full border border-border transition-colors"
                    >
                      Submit Another Review
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-dark tracking-tight">Verified Feedback Form</h2>
                    <p className="text-xs text-dark-muted mt-1">Please provide accurate details of your business and engagement.</p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-2xl font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm text-dark bg-white placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                        Company / Brand Name *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Aurum Retail Labs"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm text-dark bg-white placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role and Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                        Your Role / Title
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g. Founder &amp; CEO"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm text-dark bg-white placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                        Service Received *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm text-dark bg-white focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        {SERVICE_OPTIONS.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Optional Photo / Logo Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                      Upload Photo or Brand Logo <span className="text-dark-muted font-normal lowercase">(optional)</span>
                    </label>
                    <div className="p-4 rounded-xl border border-dashed border-primary/30 bg-white hover:bg-primary-light/20 transition-all">
                      {formData.avatar ? (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={formData.avatar}
                              alt="Uploaded avatar"
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary shadow-xs shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-dark truncate">Custom photo attached</p>
                              <p className="text-[11px] text-dark-muted">Will be displayed on your verified review card</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-3.5 cursor-pointer">
                          <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-primary hover:underline">
                              Click to select your headshot or company logo
                            </span>
                            <p className="text-[11px] text-dark-muted mt-0.5">JPG, PNG or WebP &bull; Auto-scaled for fast loading</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                      Star Rating: <span className="text-primary font-black">{formData.rating} / 5</span>
                    </label>
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white border border-border">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              (hoverRating || formData.rating) >= star
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="ml-4 text-xs font-bold text-dark">
                        {formData.rating === 5 ? "5.0 — Outstanding Service ⭐" : `${formData.rating}.0 Stars`}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                      Your Testimonial Quote *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="Describe the measurable impact: sales growth, conversion uplift, engineering quality, or communication speed..."
                      className="w-full p-4 rounded-xl border border-border text-sm text-dark bg-white placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-base py-4 rounded-full transition-all shadow-glow-sm hover:shadow-glow disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Verifying &amp; Publishing...</span>
                    ) : (
                      <>
                        <span>Submit Verified Client Testimonial</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Live Card Preview & Info */}
            <div className="lg:col-span-5 space-y-8 sticky top-28">
              {/* Card Live Preview */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live SERP &amp; Wall Preview</span>
                </div>

                <h3 className="text-base font-bold text-dark mb-4">How your review card will appear:</h3>

                {/* Simulated Testimonial Card */}
                <div className="bg-[#FAF9FF] rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      {formData.avatar ? (
                        <img
                          src={formData.avatar}
                          alt="Preview Avatar"
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30 shadow-xs shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base ring-2 ring-primary/20 shrink-0">
                          {formData.name.trim() ? formData.name.trim().charAt(0).toUpperCase() : "U"}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-sm font-bold text-dark truncate">
                          {formData.name.trim() || "Your Name"}
                        </h4>
                        <p className="text-xs text-dark-muted font-medium truncate">
                          {formData.role.trim() ? `${formData.role.trim()}, ` : ""}
                          {formData.company.trim() || "Your Company"}
                        </p>
                      </div>
                    </div>

                    <p className="text-dark/90 font-normal text-sm leading-relaxed mb-4 italic">
                      &ldquo;{formData.quote.trim() || "Your testimonial quote will be showcased here on UNIQOVA's verified client wall..."}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(formData.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                      ))}
                    </div>

                    <span className="text-[11px] font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary-light truncate max-w-[150px]">
                      {formData.service}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust & Verification Notice */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-3xl p-6 text-xs text-dark/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Authentic Client Validation</span>
                </div>
                <p className="leading-relaxed">
                  We value real, verified relationships. Your review is indexed on Google and Schema.org rich results to validate genuine client collaborations.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService="Client Feedback"
      />
    </main>
  );
}
