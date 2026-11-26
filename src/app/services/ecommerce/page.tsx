import React from "react";
import type { Metadata } from "next";
import EcommerceServiceClient from "@/components/EcommerceServiceClient";
import JsonLd from "@/components/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema";
import { SERVICES_DATA } from "@/data/agencyData";

export const metadata: Metadata = {
  title: "E-commerce Solutions & Marketplace Management | Amazon, Flipkart & D2C — UNIQOVA",
  description:
    "Scale your brand to multi-crore marketplace dominance. End-to-end Amazon & Flipkart management, high-ROAS PPC, Buy Box protection, listing SEO, and headless Shopify D2C scaling.",
  alternates: {
    canonical: "/services/ecommerce",
  },
  openGraph: {
    title: "E-commerce Solutions & Marketplace Growth Agency — UNIQOVA",
    description:
      "Official Amazon Ads Verified & Flipkart Growth Partner. Multi-channel marketplace scaling, ACoS reduction, and Buy Box defense.",
    url: "https://uniquova.com/services/ecommerce",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/services/ecom_laptop_cart.jpg",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA E-commerce Marketplace Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Solutions & Marketplace Dominance — UNIQOVA",
    description:
      "Scale your brand on Amazon, Flipkart, and D2C Shopify. High-ROAS PPC, A+ Content, and Buy Box win rate optimization.",
    images: ["/images/services/ecom_laptop_cart.jpg"],
  },
};

export default function EcommercePage() {
  const ecomService = SERVICES_DATA.find((s) => s.slug === "ecommerce");

  const schemas: Record<string, unknown>[] = [];
  if (ecomService) {
    schemas.push(getServiceSchema(ecomService));
  }
  schemas.push(
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "E-commerce Solutions", url: "/services/ecommerce" },
    ])
  );

  return (
    <>
      <JsonLd data={schemas} />
      <EcommerceServiceClient />
    </>
  );
}
