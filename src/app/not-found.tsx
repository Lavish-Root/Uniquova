import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Home, ShoppingCart, Code, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved. Explore UNIQOVA's digital services or return to the homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const helpfulLinks = [
    { name: "Homepage", href: "/", icon: Home },
    { name: "E-commerce Solutions", href: "/services/ecommerce", icon: ShoppingCart },
    { name: "Website Development", href: "/services/web-development", icon: Code },
    { name: "Contact & Inquiries", href: "/contact", icon: MessageSquare },
  ];

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col justify-between selection:bg-primary/20 selection:text-primary-dark">
      <Navbar />

      <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 purple-mesh-bg relative overflow-hidden flex-1 flex items-center">
        {/* Ambient lighting orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <span>HTTP Status 404</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-dark tracking-tight mb-4">
            Page Not Found
          </h1>

          <p className="text-base sm:text-lg text-dark-muted max-w-xl mx-auto leading-relaxed mb-10">
            The link you clicked may be broken or the page may have been relocated.
            Use the links below to find what you need or get in touch with our team.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {helpfulLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-200 flex flex-col items-center text-center group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-dark group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Back to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
