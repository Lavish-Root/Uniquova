import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing professional digital agency engagements and website usage at UNIQOVA.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms & Conditions", url: "/terms-and-conditions" },
  ]);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <JsonLd data={breadcrumbSchema} />
      <Navbar />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 purple-mesh-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-dark tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-dark-muted">Last Updated: November 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-purple text-dark-muted space-y-6">
          <p>
            Welcome to <strong>UNIQUOVA</strong>. By accessing our website or retaining our digital agency services, you agree to comply with and be bound by the following Terms &amp; Conditions.
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">1. Scope of Services</h2>
          <p>
            UNIQUOVA provides professional digital agency services including E-commerce Solutions, Website Development, App Development, Branding, and Graphic Designing. Detailed deliverables, milestones, and timelines are formally defined in individual Statements of Work (SOW) executed between UNIQUOVA and each client.
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">2. Intellectual Property</h2>
          <p>
            Upon receipt of full and final payment for contracted deliverables, all bespoke design assets, developed source code, brand guidelines, and creative materials created specifically for the client are transferred with 100% full commercial copyright to the client.
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">3. Contact</h2>
          <p>
            For legal inquiries regarding these terms, please contact us at <a href="mailto:legal@uniquova.com" className="text-primary font-semibold">legal@uniquova.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
