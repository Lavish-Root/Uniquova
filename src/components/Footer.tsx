"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  PhoneCall,
  MapPin,
} from "lucide-react";
import Logo from "./Logo";
import { CompanyInfo, DEFAULT_COMPANY_INFO } from "@/data/agencyData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);

  useEffect(() => {
    // 1. Initial fetch from API with cache busting
    fetch(`/api/company-info?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.companyInfo) {
          setCompany(data.companyInfo);
        }
      })
      .catch(() => {});

    // 2. Real-time sync listener when CMS saves in same tab
    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CompanyInfo>;
      if (customEvt.detail) {
        setCompany(customEvt.detail);
      }
    };

    // 3. Cross-tab sync listener via localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "companyInfoUpdated") {
        fetch(`/api/company-info?t=${Date.now()}`, { cache: "no-store" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.companyInfo) {
              setCompany(data.companyInfo);
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener("companyInfoUpdated", handleUpdate);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("companyInfoUpdated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const services = [
    { name: "E-commerce Solutions", href: "/services/ecommerce" },
    { name: "Amazon Account Management", href: "/services/amazon-account-management" },
    { name: "Flipkart Account Management", href: "/services/flipkart-account-management" },
    { name: "Amazon PPC & Ads", href: "/services/amazon-ppc-management" },
    { name: "Catalog & Listing SEO", href: "/services/ecommerce-catalog-management" },
    { name: "Website Development", href: "/services/web-development" },
    { name: "App Development", href: "/services/app-development" },
    { name: "Branding", href: "/services/branding" },
    { name: "Graphic Designing", href: "/services/graphic-design" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Work", href: "/our-work" },
    { name: "Industries", href: "/industries" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/#faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

  return (
    <footer className="bg-[#100D1D] text-white pt-16 sm:pt-20 pb-12 border-t border-purple-950/40 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="white" size="lg" tagline={company.tagline} />

            <p className="text-sm text-purple-200/70 font-normal leading-relaxed max-w-sm">
              UNIQUOVA is a full-service digital agency empowering startups, growing brands, and
              market leaders through integrated e-commerce solutions, high-performance web and mobile
              engineering, strategic branding, and visual design.
            </p>

            {/* Social Icons with custom SVG - Dynamic CMS controlled */}
            <div className="pt-2 flex items-center gap-3 text-purple-300">
              {/* LinkedIn */}
              {company.socialLinks?.linkedin?.enabled !== false && Boolean(company.socialLinks?.linkedin?.url?.trim()) && (
                <a
                  href={company.socialLinks?.linkedin?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.63 1.6 1.63.88 0 1.6-.75 1.6-1.63 0-.88-.72-1.6-1.6-1.6" />
                  </svg>
                </a>
              )}

              {/* Twitter / X */}
              {company.socialLinks?.twitter?.enabled !== false && Boolean(company.socialLinks?.twitter?.url?.trim()) && (
                <a
                  href={company.socialLinks?.twitter?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {/* Instagram */}
              {company.socialLinks?.instagram?.enabled !== false && Boolean(company.socialLinks?.instagram?.url?.trim()) && (
                <a
                  href={company.socialLinks?.instagram?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}

              {/* Facebook */}
              {company.socialLinks?.facebook?.enabled !== false && Boolean(company.socialLinks?.facebook?.url?.trim()) && (
                <a
                  href={company.socialLinks?.facebook?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Five Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Core Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-sm text-purple-200/70 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary mr-1 transition-colors" />
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((q) => (
                <li key={q.name}>
                  <Link
                    href={q.href}
                    className="text-sm text-purple-200/70 hover:text-white transition-colors"
                  >
                    {q.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm text-purple-200/80">
              {/* Primary Inquiries Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <a
                    href={`mailto:${company.email || "hello@uniquova.com"}`}
                    className="hover:text-white transition-colors font-medium break-all"
                  >
                    {company.email || "hello@uniquova.com"}
                  </a>
                  <p className="text-[11px] text-purple-200/50">
                    {company.emailLabel || "Inquiries & RFPs"}
                  </p>
                </div>
              </div>

              {/* Contact Number 1 (Primary) */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <a
                    href={`tel:${(company.primaryPhone || "+919876543210").replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors font-medium"
                  >
                    {company.primaryPhone || "+91 (0) 98765-43210"}
                  </a>
                  <p className="text-[11px] text-purple-200/50">
                    {company.primaryPhoneLabel || "Mon – Fri, 9am – 6pm IST"}
                  </p>
                </div>
              </div>

              {/* Contact Number 2 (Secondary / Support) */}
              {company.secondaryPhone && (
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <div>
                    <a
                      href={`tel:${company.secondaryPhone.replace(/\s+/g, "")}`}
                      className="hover:text-white transition-colors font-medium"
                    >
                      {company.secondaryPhone}
                    </a>
                    <p className="text-[11px] text-purple-200/50">
                      {company.secondaryPhoneLabel || "Support & Direct Line"}
                    </p>
                  </div>
                </div>
              )}

              {/* Headquarters Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-purple-100">
                    {company.officeName || "UNIQUOVA Digital HQ"}
                  </p>
                  <p className="text-xs text-purple-200/60 leading-relaxed">
                    {company.address || "Tech Park Corridor, Sector 4, Bangalore & New Delhi, India"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open for Q1/Q2 Client Projects
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200/60 font-medium">
          <div>
            &copy; {currentYear} UNIQUOVA Digital Agency. All rights reserved. {company.tagline || "Your Vision. Our Expertise."}
          </div>

          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
