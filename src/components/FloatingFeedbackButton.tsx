"use client";

import React, { useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export default function FloatingFeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill on the Left Side */}
      <aside aria-label="Customer Feedback" className="fixed bottom-7 left-6 z-40 select-none group">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-[#12101F]/90 hover:bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-primary/30 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-glow hover:border-primary active:scale-95"
          title="Share your client feedback"
        >
          {/* Subtle amber star with pulse */}
          <div className="relative">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>

          <span className="tracking-tight">Client Feedback</span>

          <MessageSquarePlus className="w-3.5 h-3.5 text-purple-300 group-hover:text-white transition-colors" />
        </button>
      </aside>

      {/* Interactive Modal */}
      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
