"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HorizontalPortfolioSection from "@/components/HorizontalPortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import FeaturedProjects from "@/components/FeaturedProjects";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function HomeClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState("E-commerce Solutions");

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

      {/* Section 2.5: Scroll-Driven Horizontal Showcase (Selected Work) */}
      <HorizontalPortfolioSection />

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
