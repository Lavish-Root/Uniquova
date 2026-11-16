"use client";

import React, { useState, useEffect } from "react";
import { X, Star, CheckCircle2, ShieldCheck, Sparkles, Building, Briefcase, User, KeyRound, Upload, Trash2 } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

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

export default function FeedbackModal({ isOpen, onClose, initialService }: FeedbackModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    service: initialService || SERVICE_OPTIONS[0],
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
      setErrorMessage("Please select an image file (PNG, JPG, WebP).");
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

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setErrorMessage("");
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.quote.trim() || formData.quote.trim().length < 10) {
      setErrorMessage("Please provide feedback of at least 10 characters.");
      return;
    }

    if (!formData.code.trim()) {
      setErrorMessage("Please enter your client verification code (default: UNIQOVA2026).");
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
        setErrorMessage(result.error || "Failed to submit feedback. Please check your verification code.");
        setIsSubmitting(false);
        return;
      }

      // Also save to localStorage for instant optimistic client rendering
      try {
        const stored = JSON.parse(localStorage.getItem("uniqova_user_testimonials") || "[]");
        stored.unshift(result.testimonial);
        localStorage.setItem("uniqova_user_testimonials", JSON.stringify(stored));
      } catch {
        // LocalStorage fallback
      }

      // Notify any active testimonial components to refresh
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden z-10 my-8">
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 sm:p-8 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary-200" />
            <span>Client Voice</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Share Your Experience
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            Your review helps us celebrate client success and feature your brand on our official platform.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-dark mb-2">Testimonial Published!</h4>
              <p className="text-dark-muted text-sm max-w-md mx-auto mb-6">
                Thank you, <span className="font-bold text-dark">{formData.name}</span>. Your feedback has been verified and added to our services testimonial wall.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3.5 rounded-full transition-colors shadow-glow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Client Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm text-dark placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm text-dark placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Role & Service Taken */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Your Role / Title
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Founder &amp; CEO"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm text-dark placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Service You Engaged *
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
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Your Photo or Logo <span className="text-dark-muted font-normal lowercase">(optional)</span>
                </label>
                <div className="p-3.5 rounded-xl border border-dashed border-primary/30 bg-primary-light/10 hover:bg-primary-light/20 transition-all">
                  {formData.avatar ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={formData.avatar}
                          alt="Selected avatar"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary shadow-xs shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-dark truncate">Photo selected</p>
                          <p className="text-[10px] text-dark-muted">Included on your testimonial</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-bold px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-primary hover:underline">
                          Upload headshot or company logo
                        </span>
                        <p className="text-[10px] text-dark-muted">PNG, JPG, WebP</p>
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

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Your Overall Rating: <span className="text-primary">{formData.rating} / 5 Stars</span>
                </label>
                <div className="flex items-center gap-1.5 p-3 rounded-xl bg-softBg border border-border/80">
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
                        className={`w-7 h-7 ${
                          (hoverRating || formData.rating) >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-semibold text-dark-muted">
                    {formData.rating === 5 ? "Exceptional Results ⭐⭐⭐⭐⭐" : `${formData.rating} Stars`}
                  </span>
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Your Feedback / Testimonial *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Tell us how UNIQUOVA helped your business grow, improve conversions, or deliver technical excellence..."
                  className="w-full p-4 rounded-xl border border-border text-sm text-dark placeholder:text-dark-muted/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Client Verification Passcode */}
              <div className="bg-primary-light/50 p-4 rounded-2xl border border-primary-200">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Client Verification Code *</span>
                  </label>
                  <span className="text-[11px] text-dark-muted font-medium">Default: <code className="font-mono font-bold text-primary">UNIQOVA2026</code></span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Enter code (provided by UNIQOVA team, or UNIQOVA2026)"
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-200 text-sm font-mono text-dark bg-white focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <p className="text-[11px] text-dark-muted mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Protects our client review wall against unauthorized spam and automated bots.</span>
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-4 rounded-full transition-all shadow-glow-sm hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Verifying &amp; Publishing...</span>
                  ) : (
                    <>
                      <span>Submit Verified Testimonial</span>
                      <CheckCircle2 className="w-4 h-4" />
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
