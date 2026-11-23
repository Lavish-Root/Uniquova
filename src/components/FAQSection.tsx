"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { FAQ_DATA } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

interface FAQSectionProps {
  onOpenContact?: () => void;
}

export default function FAQSection({ onOpenContact }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-16"
          badge={
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions? We Have Answers.</span>
            </div>
          }
          title={
            <>
              Frequently Asked <span className="gradient-text">Questions</span>
            </>
          }
          subtitle="Everything you need to know about partnering with UNIQUOVA, our technical standards, and how we bring your digital vision to life."
        />

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setOpenIndex(idx)}
                onClick={() => toggleAccordion(idx)}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "border-primary/50 shadow-[0_8px_25px_rgba(117,69,245,0.08)] ring-1 ring-primary/10"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div
                  className="w-full text-left px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 select-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? "text-primary" : "text-dark"
                    }`}
                  >
                    {item.q}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-softBg text-dark-muted"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-dark-muted font-normal leading-relaxed border-t border-border/40 pt-4">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional inquiry prompt */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-dark">Have a custom question not listed here?</p>
              <p className="text-xs text-dark-muted">Speak directly with our digital team.</p>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="text-xs font-bold text-primary hover:text-primary-dark px-5 py-2.5 rounded-full bg-softBg hover:bg-primary-light border border-primary/20 transition-colors"
          >
            Ask a Specialist
          </button>
        </div>

      </div>
    </section>
  );
}

