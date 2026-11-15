"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      isDropdown: true,
    },
    { name: "Our Work", href: "/our-work" },
    { name: "Industries", href: "/industries" },
    { name: "Contact", href: "/contact" },
  ];

  const servicesList = [
    {
      name: "E-commerce Solutions",
      desc: "Amazon, Flipkart, Catalog & PPC growth",
      href: "/services/ecommerce",
      icon: ShoppingCart,
      badge: "Popular",
    },
    {
      name: "Website Development",
      desc: "High-performance web apps & Next.js stores",
      href: "/services/web-development",
      icon: Code,
      badge: "Fast",
    },
    {
      name: "App Development",
      desc: "Native iOS & Android mobile apps",
      href: "/services/app-development",
      icon: Smartphone,
      badge: null,
    },
    {
      name: "Branding",
      desc: "Visual identity, logos & market strategy",
      href: "/services/branding",
      icon: PenTool,
      badge: null,
    },
    {
      name: "Graphic Designing",
      desc: "High-impact social & marketing creatives",
      href: "/services/graphic-design",
      icon: Palette,
      badge: null,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-[0_4px_25px_rgba(117,69,245,0.06)] border-b border-border/70"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Center Floating Pill Navigation - Desktop (as seen in reference design) */}
          <nav className="hidden lg:flex items-center">
            <div className="bg-white/85 backdrop-blur-md border border-[#EAE6F4] shadow-[0_4px_24px_rgba(117,69,245,0.06)] rounded-full px-3 py-1.5 flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.isDropdown) {
                  return (
                    <div
                      key={link.name}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                          servicesOpen || pathname.startsWith("/services")
                            ? "text-primary bg-primary-light/60"
                            : "text-dark/90 hover:text-primary hover:bg-softBg"
                        }`}
                        aria-expanded={servicesOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180 text-primary" : "text-dark-muted"
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {servicesOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-[0_20px_50px_rgba(117,69,245,0.15)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="px-3 py-2 border-b border-border/60 mb-1 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-dark-muted">
                              Core Capabilities
                            </span>
                            <span className="text-[11px] text-primary font-medium flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Full Service
                            </span>
                          </div>

                          <div className="space-y-1">
                            {servicesList.map((service) => {
                              const ServiceIcon = service.icon;
                              return (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-primary-light/50 group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                                    <ServiceIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                                        {service.name}
                                      </p>
                                      {service.badge && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                          {service.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-dark-muted truncate mt-0.5">
                                      {service.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="mt-2 pt-2 border-t border-border/60 text-center">
                            <Link
                              href="/services"
                              onClick={() => setServicesOpen(false)}
                              className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 py-1"
                            >
                              Explore All 5 Services <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white px-5 py-2 rounded-full shadow-[0_2px_10px_rgba(117,69,245,0.3)]"
                        : "text-dark/90 hover:text-primary hover:bg-softBg px-4 py-2 rounded-full"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Action Button (Let's Talk) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="group relative inline-flex items-center gap-2 bg-dark hover:bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(21,19,35,0.15)] hover:shadow-[0_8px_24px_rgba(117,69,245,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 bg-dark text-white text-xs font-semibold px-3.5 py-2 rounded-full"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-dark hover:text-primary hover:bg-softBg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-2xl border-b border-border shadow-xl p-6 transition-all duration-300 z-50">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="py-2 border-b border-border/50">
                    <div className="flex items-center justify-between font-bold text-dark mb-2">
                      <span>Services</span>
                      <span className="text-xs text-primary font-semibold">5 Services</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pl-2">
                      {servicesList.map((s) => (
                        <Link
                          key={s.name}
                          href={s.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 text-sm font-medium text-dark-muted hover:text-primary py-1"
                        >
                          <s.icon className="w-4 h-4 text-primary" />
                          <span>{s.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2 transition-colors ${
                    isActive ? "text-primary font-bold" : "text-dark hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-border">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full shadow-glow-sm"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

