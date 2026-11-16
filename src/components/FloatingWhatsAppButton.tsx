"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { CompanyInfo, DEFAULT_COMPANY_INFO, formatWhatsAppUrl } from "@/data/agencyData";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);

  // Auto-hide the message tooltip after 10 seconds, but show on hover
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch live company info and subscribe to CMS updates
  useEffect(() => {
    fetch("/api/company-info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.companyInfo) {
          setCompany(data.companyInfo);
        }
      })
      .catch(() => {});

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CompanyInfo>;
      if (customEvt.detail) {
        setCompany(customEvt.detail);
      }
    };

    window.addEventListener("companyInfoUpdated", handleUpdate);
    return () => window.removeEventListener("companyInfoUpdated", handleUpdate);
  }, []);

  // Do not show on CMS / admin routes
  if (
    pathname?.startsWith("/uniq_up") ||
    pathname?.includes("uniq_up") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  const whatsappUrl = formatWhatsAppUrl(
    company.whatsappNumber || DEFAULT_COMPANY_INFO.whatsappNumber,
    company.whatsappMessage || DEFAULT_COMPANY_INFO.whatsappMessage
  );

  const handleClick = () => {
    if (
      typeof window !== "undefined" &&
      typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function"
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "whatsapp_click", {
        location: "floating_whatsapp_widget",
      });
    }
  };

  return (
    <aside
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-7 right-6 z-40 select-none flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Greeting Popout Bubble */}
      {(showTooltip || isHovered) && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-emerald-200/80 shadow-[0_6px_24px_rgba(16,185,129,0.2)] px-4 py-2.5 rounded-2xl text-xs text-dark font-medium animate-in fade-in slide-in-from-right-4 duration-300 relative group">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="flex items-center gap-2 hover:opacity-85 transition-opacity"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-dark leading-tight flex items-center gap-1">
                Chat on WhatsApp
                <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide">
                  Online
                </span>
              </span>
              <span className="text-[10px] text-dark-muted font-normal">
                Typically replies in minutes
              </span>
            </div>
          </a>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
              setIsHovered(false);
            }}
            className="p-1 rounded-md text-dark-muted/50 hover:text-dark hover:bg-black/5 transition-colors ml-1 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Little arrow pointing to WhatsApp icon */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-white drop-shadow-xs" />
        </div>
      )}

      {/* Main Floating WhatsApp Circular Icon with Rich Animations */}
      <div className="relative group">
        {/* Pulsing Outer Radiation Wave 1 */}
        <span className="absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        {/* Pulsing Outer Wave 2 (Slightly slower) */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-[#25D366] opacity-60 blur-md group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Direct Link Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          title="Direct WhatsApp Chat with UNIQOVA"
          className="relative z-10 w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)] border-2 border-white/80 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group-hover:rotate-6 cursor-pointer"
        >
          {/* Official WhatsApp SVG Vector Icon */}
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
            className="w-8 h-8 text-white fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* Active online indicator pip */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
        </a>
      </div>
    </aside>
  );
}
