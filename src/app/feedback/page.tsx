import React, { Suspense } from "react";
import type { Metadata } from "next";
import FeedbackClient from "@/components/FeedbackClient";

export const metadata: Metadata = {
  title: "Client Feedback & Verified Reviews | UNIQOVA",
  description:
    "Submit your verified client review for UNIQOVA. Hear directly from founders and enterprise leaders scaling with our e-commerce, web, app, branding, and design teams.",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Client Feedback & Verified Reviews — UNIQOVA",
    description:
      "Submit verified client feedback and read how UNIQOVA powers growth for high-performance brands worldwide.",
    url: "https://uniquova.com/feedback",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Feedback & Verified Reviews — UNIQOVA",
    description: "Submit verified client reviews for UNIQOVA.",
  },
};

export const dynamic = "force-dynamic";

export default function FeedbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FeedbackClient />
    </Suspense>
  );
}
