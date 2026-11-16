import React from "react";
import type { Metadata } from "next";
import OurWorkClient from "@/components/OurWorkClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio — Proven Client Growth",
  description:
    "Explore UNIQOVA's client case studies. Documented results in Amazon marketplace growth, headless e-commerce engineering, mobile applications, and brand identities.",
  alternates: {
    canonical: "/our-work",
  },
  openGraph: {
    title: "Client Case Studies & Portfolio — UNIQOVA",
    description:
      "Proven commercial growth: +182% e-commerce revenue, 100/100 Lighthouse performance, and iconic brand launches.",
    url: "https://uniquova.com/our-work",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/our_work_hero_bg.jpg?v=4",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA Portfolio and Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Portfolio — UNIQOVA",
    description: "Verified results: E-commerce scaling, web development, mobile apps, and branding.",
    images: ["/images/our_work_hero_bg.jpg?v=4"],
  },
};

export default function OurWorkPage() {
  const schemas = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Our Work", url: "/our-work" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <OurWorkClient />
    </>
  );
}
