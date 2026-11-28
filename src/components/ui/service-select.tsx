"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Check,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Layers,
  Globe,
  Smartphone,
  PenTool,
  Palette,
  Rocket,
} from "lucide-react";

export type ServiceIconKey =
  | "amazon"
  | "flipkart"
  | "ppc"
  | "catalog"
  | "ecommerce"
  | "web"
  | "app"
  | "branding"
  | "design"
  | "integrated";

export interface ServiceSelectOption {
  value: string;
  label: string;
  subtitle?: string;
  badge?: string;
  icon?: ServiceIconKey;
}

const ICON_MAP: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  amazon: ShoppingCart,
  flipkart: ShoppingBag,
  ppc: TrendingUp,
  catalog: Layers,
  ecommerce: ShoppingCart,
  web: Globe,
  app: Smartphone,
  branding: PenTool,
  design: Palette,
  integrated: Rocket,
};

interface ServiceSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: ServiceSelectOption[];
  placeholder?: string;
}

/** Custom claymorphic dropdown styled for the brand's Core Service Required selector. */
export default function ServiceSelect({
  value,
  onChange,
  options,
  placeholder = "Select a service",
}: ServiceSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const keyboardNavRef = useRef(false);

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const SelectedIcon = selectedOption?.icon ? ICON_MAP[selectedOption.icon] : Sparkles;

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (keyboardNavRef.current && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" });
      keyboardNavRef.current = false;
    } else if (listRef.current && focusedIndex === -1) {
      listRef.current.scrollTop = 0;
    }
  }, [isOpen, focusedIndex]);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        keyboardNavRef.current = false;
        setFocusedIndex(-1);
      }
      return next;
    });
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      keyboardNavRef.current = true;
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      } else {
        setFocusedIndex((prev) => (prev + 1) % options.length);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      keyboardNavRef.current = true;
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : options.length - 1);
      } else {
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
      }
    } else if (event.key === "Enter" || event.key === " ") {
      if (isOpen) {
        event.preventDefault();
        const targetIdx = focusedIndex >= 0 ? focusedIndex : selectedIndex;
        if (targetIdx >= 0 && options[targetIdx]) {
          handleSelect(options[targetIdx].value);
        }
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative ${isOpen ? "z-50" : "z-20"}`}>
      {/* Claymorphism Trigger Pill */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-3 rounded-[25px] px-4 py-2.5 sm:py-3 bg-[#F8F7FD] text-left shadow-[inset_2px_4px_8px_rgba(117,69,245,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.85)] border transition-all duration-300 cursor-pointer touch-manipulation ${
          isOpen
            ? "border-primary ring-4 ring-primary/10 shadow-[inset_1px_2px_4px_rgba(117,69,245,0.06),0_0_22px_rgba(117,69,245,0.16)]"
            : "border-purple-200/70 hover:border-primary/45 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <SelectedIcon className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-dark truncate leading-tight">
              {selectedOption?.label || placeholder}
            </p>
            {selectedOption?.subtitle && (
              <p className="text-[11px] font-medium text-dark-muted truncate leading-tight mt-0.5">
                {selectedOption.subtitle}
              </p>
            )}
          </div>
        </div>

        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-primary text-white rotate-180 shadow-xs"
              : "bg-white/90 border border-purple-200/70 text-primary"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      {/* Branded Dropdown Listbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-[22px] bg-white border border-primary/25 shadow-[0_24px_60px_-12px_rgba(117,69,245,0.28),0_10px_25px_-5px_rgba(17,12,46,0.08)] overflow-hidden z-50"
          >
            {/* Scrollable Options (first 3 visible on open, scroll for rest) */}
            <div
              ref={listRef}
              className="max-h-[198px] overflow-y-auto overscroll-contain bg-white p-2 space-y-1"
            >
              {options.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = focusedIndex === idx;
                const OptionIcon = opt.icon ? ICON_MAP[opt.icon] : Sparkles;

                return (
                  <button
                    key={opt.value}
                    ref={(el) => {
                      optionRefs.current[idx] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer touch-manipulation border ${
                      isSelected
                        ? "bg-gradient-to-r from-primary/[0.12] via-primary/[0.07] to-white border-primary/35 shadow-xs"
                        : isHighlighted
                        ? "bg-[#F6F2FF] border-primary/20"
                        : "bg-white border-transparent hover:bg-[#F6F2FF] hover:border-primary/15"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? "bg-primary text-white shadow-[0_4px_14px_rgba(117,69,245,0.35)]"
                            : "bg-primary-light/70 text-primary border border-primary/15"
                        }`}
                      >
                        <OptionIcon className="w-4 h-4" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`text-xs sm:text-[13px] font-bold leading-snug truncate ${
                              isSelected ? "text-primary" : "text-dark"
                            }`}
                          >
                            {opt.label}
                          </span>
                          {opt.badge && (
                            <span className="text-[9px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        {opt.subtitle && (
                          <p className="text-[11px] font-medium text-dark-muted leading-snug mt-0.5 truncate">
                            {opt.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3 h-3 stroke-[2.75]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
