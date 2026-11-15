import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNIQUOVA — Premium Full-Service Digital Agency | Your Vision. Our Expertise.",
  description:
    "UNIQUOVA crafts innovative e-commerce solutions, website development, app development, branding and graphic designing to help your business scale faster, smarter and bigger.",
  keywords: [
    "UNIQUOVA",
    "Digital Agency",
    "E-commerce Solutions",
    "Amazon Marketplace Management",
    "Flipkart Marketplace",
    "Website Development",
    "App Development",
    "Branding",
    "Graphic Designing",
  ],
  authors: [{ name: "UNIQUOVA" }],
  openGraph: {
    title: "UNIQUOVA — Full-Service Digital Agency",
    description: "Your Vision. Our Digital Expertise. Premium e-commerce, web, app and branding solutions.",
    url: "https://uniquova.com",
    siteName: "UNIQUOVA",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-dark antialiased selection:bg-primary/20 selection:text-primary-dark">
        {children}
      </body>
    </html>
  );
}
