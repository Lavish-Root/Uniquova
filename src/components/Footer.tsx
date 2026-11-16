import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            <Logo variant="white" size="lg" />

            <p className="text-sm text-purple-200/70 font-normal leading-relaxed max-w-sm">
              UNIQUOVA is a full-service digital agency empowering startups, growing brands, and
              market leaders through integrated e-commerce solutions, high-performance web and mobile
              engineering, strategic branding, and visual design.
            </p>

            {/* Social Icons with custom SVG */}
            <div className="pt-2 flex items-center gap-3 text-purple-300">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.63 1.6 1.63.88 0 1.6-.75 1.6-1.63 0-.88-.72-1.6-1.6-1.6" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
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
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <a
                    href="mailto:hello@uniquova.com"
                    className="hover:text-white transition-colors font-medium"
                  >
                    hello@uniquova.com
                  </a>
                  <p className="text-[11px] text-purple-200/50">Inquiries & RFPs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-white transition-colors font-medium"
                  >
                    +91 (0) 98765-43210
                  </a>
                  <p className="text-[11px] text-purple-200/50">Mon – Fri, 9am – 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-purple-100">UNIQUOVA Digital HQ</p>
                  <p className="text-xs text-purple-200/60 leading-relaxed">
                    Tech Park Corridor, Sector 4, Bangalore & New Delhi, India
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
            &copy; {currentYear} UNIQUOVA Digital Agency. All rights reserved. Your Vision. Our Expertise.
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
