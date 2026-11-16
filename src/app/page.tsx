import React from "react";
import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getProfessionalServiceSchema,
  getFaqSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "UNIQUOVA — Full-Service Digital Agency | E-commerce, Web, App & Branding",
  description:
    "UNIQUOVA is India's leading digital agency specializing in Amazon & Flipkart marketplace management, Next.js web development, mobile apps, branding, and graphic design.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "UNIQUOVA — Full-Service Digital Agency | Your Vision. Our Expertise.",
    description:
      "Scale faster, smarter, and bigger. Full-funnel marketplace management, modern web applications, native apps, and iconic brand identity.",
    url: "https://uniquova.com",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-reference.jpg",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA Full-Service Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UNIQUOVA — Full-Service Digital Agency",
    description:
      "Premium e-commerce management, web engineering, mobile apps, and branding tailored for high-growth businesses.",
    images: ["/images/hero-reference.jpg"],
  },
};

export default function HomePage() {
  const schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getProfessionalServiceSchema(),
    getFaqSchema(),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <HomeClient />
    </>
  );
}
