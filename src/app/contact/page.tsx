import React from "react";
import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getProfessionalServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us — Schedule Your Digital Strategy Consultation",
  description:
    "Connect with UNIQOVA's digital specialists. Request a proposal for e-commerce marketplace management, website development, mobile apps, or brand identity.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact UNIQOVA — Project Inquiries & Discovery Consultation",
    description: "Start your project with UNIQOVA. We help ambitious brands dominate marketplaces, engineering, and branding.",
    url: "https://uniquova.com/contact",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/contact_hero_bg.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "Contact UNIQOVA Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact UNIQOVA — Digital Agency Consultation",
    description: "Schedule your project discovery call with our digital directors.",
    images: ["/images/contact_hero_bg.jpg?v=1"],
  },
};

export default function ContactPage() {
  const schemas = [
    getProfessionalServiceSchema(),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact Us", url: "/contact" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ContactClient />
    </>
  );
}
