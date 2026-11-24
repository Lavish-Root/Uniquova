import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import MoltenCursor from "@/components/MoltenCursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uniquova.com"),
  title: {
    default: "UNIQUOVA — Premium Full-Service Digital Agency | Your Vision. Our Expertise.",
    template: "%s | UNIQOVA",
  },
  description:
    "UNIQUOVA is India's leading full-service digital agency. We specialize in Amazon & Flipkart marketplace management, Next.js web development, mobile apps, branding, and graphic design to scale your business.",
  keywords: [
    "UNIQUOVA",
    "Digital Agency India",
    "E-commerce Management Services",
    "Amazon Account Management Services",
    "Flipkart Account Management",
    "Amazon PPC Management Services",
    "Product Listing Optimization",
    "Website Development Company India",
    "Mobile App Development Company India",
    "Branding Agency India",
    "Graphic Design Services",
  ],
  authors: [{ name: "UNIQUOVA", url: "https://uniquova.com" }],
  creator: "UNIQUOVA",
  publisher: "UNIQUOVA",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "UNIQUOVA — Premium Full-Service Digital Agency",
    description: "Your Vision. Our Digital Expertise. Premium e-commerce, web development, app development, and branding solutions.",
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
    title: "UNIQUOVA — Premium Full-Service Digital Agency",
    description: "Your Vision. Our Digital Expertise. Premium e-commerce, web development, app development, and branding.",
    images: ["/images/hero-reference.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className={`${plusJakartaSans.className} font-sans bg-white text-dark antialiased selection:bg-primary/20 selection:text-primary-dark`}>
        <MoltenCursor color="#8b5cf6" />
        {children}
        <FloatingFeedbackButton />
        <FloatingWhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
