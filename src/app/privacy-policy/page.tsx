import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "UNIQUOVA's commitment to data protection, client confidentiality, and intellectual property safety.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" },
  ]);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <JsonLd data={breadcrumbSchema} />
      <Navbar />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 purple-mesh-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-dark tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-dark-muted">Last Updated: November 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-purple text-dark-muted space-y-6">
          <p>
            At <strong>UNIQUOVA</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), we take your privacy and data security with the utmost seriousness. This Privacy Policy details our practices regarding the collection, handling, and protection of information gathered through our website and client engagements.
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide when inquiring about our services, requesting a discovery consultation, or communicating with us. This includes your name, work email address, phone number, company name, and project specifications.
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">2. Use of Information</h2>
          <p>
            The collected information is solely used to prepare custom project proposals, schedule discovery calls, deliver contracted services, and provide customer support. We never sell, rent, or lease client information to third parties.
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">3. Data Protection &amp; Confidentiality</h2>
          <p>
            All client proprietary details, software repositories, marketplace credentials, and branding assets are safeguarded under strict internal access controls and standard Non-Disclosure Agreements (NDAs).
          </p>

          <h2 className="text-xl font-bold text-dark pt-4">4. Contact Us</h2>
          <p>
            For questions or requests concerning your personal information, please contact us at <a href="mailto:privacy@uniquova.com" className="text-primary font-semibold">privacy@uniquova.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
