import React from "react";
import type { Metadata } from "next";
import IndustriesClient from "@/components/IndustriesClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Industries We Serve — Sector-Specific Digital Solutions",
  description:
    "Tailored digital agency solutions across high-impact sectors: E-commerce & Retail, SaaS & Technology, Healthcare, EdTech, Fashion, and Startups.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve — UNIQOVA | Sector Expertise",
    description: "Industry-aligned digital growth frameworks for retail marketplaces, software platforms, and high-growth brands.",
    url: "https://uniquova.com/industries",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/industries_hero_bg.jpg?v=4",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA Industry Sector Expertise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve — UNIQOVA",
    description: "Tailored digital solutions for E-commerce, SaaS, Healthcare, and Startups.",
    images: ["/images/industries_hero_bg.jpg?v=4"],
  },
};

export default function IndustriesPage() {
  const schemas = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <IndustriesClient />
    </>
  );
}
