"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TrustedByCompanies from "@/components/TrustedByCompanies";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import FeaturedProjects from "@/components/FeaturedProjects";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const ContactModal = dynamic(() => import("@/components/ContactModal"), {
  ssr: false,
});

export default function HomeClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState("E-commerce Solutions");

  // Always start homepage at the top (Hero / "Your Vision...") on reload/refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      const raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  const handleOpenContactWithService = (serviceTitle: string) => {
    setSelectedServiceForModal(serviceTitle);
    setIsContactOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col selection:bg-primary/20 selection:text-primary-dark">
      {/* Navigation Bar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Section 1: Hero (with Section 2: Trusted By integrated) */}
      <Hero onOpenContact={() => setIsContactOpen(true)} />

      {/* Selected Work: Framer-inspired Scroll-Driven Showcase Section */}
      <SelectedWorkSection />

      {/* Trusted by companies Section: Founder stories & bento deliverables */}
      <TrustedByCompanies onOpenContact={() => setIsContactOpen(true)} />

      {/* Section 3: Our Services */}
      <ServicesSection onSelectService={handleOpenContactWithService} />

      {/* Section 4: Why Choose UNIQUOVA? */}
      <WhyChooseUs />

      {/* Section 5: Our Working Process */}
      <WorkingProcess />

      {/* Section 6: Featured Projects */}
      <FeaturedProjects />

      {/* Section 7: Industries We Serve */}
      <IndustriesSection />

      {/* Section 8: Testimonials */}
      <TestimonialsSection />

      {/* Section 9: FAQ */}
      <FAQSection onOpenContact={() => setIsContactOpen(true)} />

      {/* Section 10: Contact CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      {/* Section 11: Footer */}
      <Footer />

      {/* Interactive Contact & Lead Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService={selectedServiceForModal}
      />
    </main>
  );
}
