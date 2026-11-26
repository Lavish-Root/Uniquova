"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Star, MessageSquarePlus } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export default function FloatingFeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Show the floating feedback button ONLY on the contact page (/contact)
  // Completely removed from the home page (/) and admin/CMS routes
  if (pathname !== "/contact") {
    return null;
  }

  return (
    <>
      {/* Floating Pill on the Left Side */}
      <aside aria-label="Customer Feedback" className="fixed bottom-7 left-6 z-40 select-none group">
        <div className="relative">
          {/* Subtle & Delicate Boundary Glow of Theme Color */}
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-primary via-purple-400 to-primary-dark opacity-35 blur-[3px] group-hover:opacity-60 group-hover:blur-[4px] transition-all duration-400 pointer-events-none" />

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative z-10 flex items-center gap-2.5 bg-white/95 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark text-dark hover:text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-[0_4px_16px_rgba(117,69,245,0.15)] hover:shadow-[0_6px_22px_rgba(117,69,245,0.28)] border border-primary/30 hover:border-white/40 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            title="Share your client feedback"
          >
            {/* Crisp Golden Star */}
            <div className="relative flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_1px_3px_rgba(251,191,36,0.5)]" />
            </div>

            <span className="tracking-tight font-bold transition-colors duration-300">Client Feedback</span>

            <div className="w-5 h-5 rounded-full bg-primary-light group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300 shadow-xs">
              <MessageSquarePlus className="w-3 h-3 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
          </button>
        </div>
      </aside>

      {/* Interactive Modal */}
      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
