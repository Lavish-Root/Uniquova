"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenContact?: () => void;
}

/**
 * Reusable diagonal swipe-mask fill overlay themed in UNIQUOVA's signature violet gradient.
 */
function SwipeMaskFill({ active = false }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-[#5030C7] via-[#7545F5] to-[#9E76FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        active
          ? "translate-y-0 rotate-0 scale-100"
          : "translate-y-[115%] rotate-[-4deg] scale-95 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100"
      )}
    />
  );
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      router.push("/contact");
    }
  };
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 280); // 280ms grace period so cursor movement between button and menu never drops
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close menus and reset navbar visibility on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setIsNavVisible(true);
  }, [pathname]);

  // Show navbar when scrolling down (or when scrolling up pauses/stops), smoothly animate away during active scroll-up
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setIsScrolled(window.scrollY > 20);

    const clearScrollStopTimer = () => {
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
        scrollStopTimerRef.current = null;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (servicesOpen || mobileMenuOpen || currentScrollY <= 30) {
        clearScrollStopTimer();
        setIsNavVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollYRef.current;
      if (Math.abs(delta) < 6) {
        return;
      }

      clearScrollStopTimer();

      if (delta > 0) {
        // Scrolling DOWN -> show navbar immediately
        setIsNavVisible(true);
      } else {
        // Actively scrolling UP -> smoothly hide navbar, and reveal automatically once scroll stops
        setIsNavVisible(false);
        scrollStopTimerRef.current = setTimeout(() => {
          setIsNavVisible(true);
          scrollStopTimerRef.current = null;
        }, 250);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearScrollStopTimer();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [servicesOpen, mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
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
    <motion.header
      initial={false}
      animate={{
        y: isNavVisible ? "0%" : "-108%",
        opacity: isNavVisible ? 1 : 0,
        rotateX: isNavVisible ? 0 : 10,
      }}
      transition={
        isNavVisible
          ? { duration: 0.56, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0.44, ease: [0.32, 0.72, 0, 1] }
      }
      style={{ transformOrigin: "top center", transformPerspective: 1200 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-5 transition-colors duration-300 will-change-transform",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_8px_32px_rgba(117,69,245,0.08)] border-b border-border/70"
          : "bg-transparent",
        !isNavVisible && "pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Center Floating Pill Navigation - Desktop with Branded Swipe-Mask Animation */}
          <nav className="hidden lg:flex items-center">
            <div className="bg-white/90 backdrop-blur-xl border border-[#EAE6F4] shadow-[0_8px_32px_rgba(117,69,245,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-full p-1.5 flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

                if (link.isDropdown) {
                  const isDropdownActive = servicesOpen || pathname.startsWith("/services");
                  return (
                    <div
                      key={link.name}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (timeoutRef.current) clearTimeout(timeoutRef.current);
                          setServicesOpen(!servicesOpen);
                        }}
                        className={cn(
                          "relative inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full text-sm font-semibold overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(117,69,245,0.28)]",
                          isDropdownActive && "shadow-[0_4px_16px_rgba(117,69,245,0.32)]"
                        )}
                        aria-expanded={servicesOpen}
                      >
                        <SwipeMaskFill active={isDropdownActive} />
                        <span
                          className={cn(
                            "relative z-10 inline-flex items-center gap-1.5 transition-colors duration-300",
                            isDropdownActive ? "text-white" : "text-dark/90 group-hover:text-white"
                          )}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={cn(
                              "w-3.5 h-3.5 transition-all duration-300",
                              servicesOpen ? "rotate-180" : "",
                              isDropdownActive ? "text-white" : "text-dark-muted group-hover:text-white"
                            )}
                          />
                        </span>
                      </button>

                      {/* Dropdown Menu Wrapper with Invisible Hover Bridge */}
                      {servicesOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-80"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {/* Invisible physical bridge overlay connecting button to menu */}
                          <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                          <div className="bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-[0_20px_50px_rgba(117,69,245,0.15)] p-2 animate-in fade-in slide-in-from-top-2 duration-200">
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
                                Explore All Capabilities <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
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
                    prefetch={true}
                    onMouseEnter={() => router.prefetch(link.href)}
                    className={cn(
                      "relative inline-flex items-center justify-center px-4 xl:px-5 py-2 rounded-full text-sm font-semibold overflow-hidden group transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(117,69,245,0.28)]",
                      isActive && "shadow-[0_4px_16px_rgba(117,69,245,0.32)]"
                    )}
                  >
                    <SwipeMaskFill active={isActive} />
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-300",
                        isActive ? "text-white" : "text-dark/90 group-hover:text-white"
                      )}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Action Button (Let's Talk) with Matching Swipe-Mask Fill */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleContactClick}
              className="group relative inline-flex items-center gap-2 bg-dark text-white text-sm font-semibold px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_4px_16px_rgba(21,19,35,0.16)] hover:shadow-[0_8px_26px_rgba(117,69,245,0.38)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <SwipeMaskFill />
              <span className="relative z-10">Let&apos;s Talk</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleContactClick}
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
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/95 backdrop-blur-2xl border-b border-border shadow-xl p-6 transition-all duration-300 z-50">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="py-2 border-b border-border/50">
                    <div className="flex items-center justify-between font-bold text-dark mb-2">
                      <span>Services</span>
                      <span className="text-xs text-primary font-semibold">All Capabilities</span>
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
                  className={`text-base font-semibold py-2 transition-colors ${isActive ? "text-primary font-bold" : "text-dark hover:text-primary"
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
    </motion.header>
  );
}

