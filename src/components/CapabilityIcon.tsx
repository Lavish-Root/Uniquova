"use client";

import React from "react";
import {
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  TrendingUp,
  Package,
  Layers,
  Sparkles,
  Database,
  Cpu,
  Globe,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

export const CAPABILITY_ICON_OPTIONS = [
  { key: "pen", label: "Pen Tool (Branding)", category: "Branding" },
  { key: "palette", label: "Color Palette (Design)", category: "Graphic Design" },
  { key: "sparkles", label: "Sparkles (Creatives)", category: "Graphic Design" },
  { key: "smartphone", label: "Mobile Device (Apps)", category: "Mobile" },
  { key: "layers", label: "Layers (Flutter/Native)", category: "Mobile" },
  { key: "code", label: "Code Brackets (Web Dev)", category: "Web Dev" },
  { key: "nextjs", label: "Next.js Logo", category: "Web Dev" },
  { key: "react", label: "React.js Logo", category: "Web Dev" },
  { key: "typescript", label: "TypeScript Logo", category: "Web Dev" },
  { key: "tailwind", label: "Tailwind CSS Logo", category: "UI/UX" },
  { key: "cart", label: "Shopping Cart (WooCommerce)", category: "E-commerce" },
  { key: "shopify", label: "Shopify Bag", category: "E-commerce" },
  { key: "amazon", label: "Amazon Marketplace", category: "E-commerce" },
  { key: "flipkart", label: "Flipkart Scale", category: "E-commerce" },
  { key: "trending", label: "Trending Growth (PPC/ROAS)", category: "E-commerce" },
  { key: "package", label: "Package Box (Listing/A+)", category: "E-commerce" },
  { key: "database", label: "Database / Cloud", category: "Infrastructure" },
  { key: "cpu", label: "AI & Tech Processing", category: "Tech" },
  { key: "globe", label: "Global Web", category: "Web Dev" },
  { key: "shield", label: "Shield / Security", category: "Trust" },
  { key: "zap", label: "Zap / Performance", category: "Tech" },
  { key: "star", label: "Star / Quality", category: "Trust" },
] as const;

interface CapabilityIconProps {
  iconKey: string;
  className?: string;
}

export default function CapabilityIcon({ iconKey, className = "w-5 h-5" }: CapabilityIconProps) {
  const normKey = (iconKey || "").toLowerCase().trim();

  switch (normKey) {
    case "amazon":
      return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24">
          <path d="M13.957 10.45c0 1.54-.04 2.8-.95 4.02-.73.97-1.74 1.48-2.73 1.48-1.37 0-2.14-.99-2.14-2.45 0-2.88 2.53-3.41 5.82-3.41v.36zm3.01 7.47c-.22.18-.54.2-.77.06-.99-.86-1.16-1.28-1.69-2.07-1.62 1.63-2.76 2.07-4.82 2.07-2.48 0-4.42-1.52-4.42-4.42 0-2.27 1.39-3.81 3.25-4.46 1.62-.57 3.9-.67 5.56-.87v-.33c0-.9-.18-1.92-.81-2.58-.57-.61-1.42-.87-2.29-.87-1.55 0-2.94.75-3.32 2.27-.06.27-.27.49-.55.51l-2.61-.27c-.27-.04-.5-.25-.46-.55.65-3.23 3.42-4.46 6.94-4.46 1.84 0 3.73.49 4.97 1.84 1.55 1.65 1.43 3.86 1.43 6.09v4.44c0 1.37.57 1.98 1.11 2.73.19.26.2.59.02.82l-1.94 1.98zM21.7 19.88c-.28.27-.69.29-.97.05-2.76-2.3-6.72-3.6-11.45-3.6-4.14 0-8.08 1.07-11.23 2.97-.33.2-.76.12-.98-.21-.21-.32-.12-.76.21-.97 3.39-2.04 7.64-3.19 12-3.19 5.09 0 9.35 1.4 12.31 3.87.31.26.37.7.11 1.08z"/>
        </svg>
      );
    case "nextjs":
      return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24">
          <path d="M11.998 0C5.372 0 0 5.372 0 11.998c0 6.626 5.372 11.998 11.998 11.998 6.626 0 11.998-5.372 11.998-11.998C23.996 5.372 18.624 0 11.998 0zm6.182 17.518l-6.84-9.357v9.357H9.28V6.48h2.06l6.84 9.358V6.48h2.06v11.038h-2.06z"/>
        </svg>
      );
    case "flipkart":
      return (
        <div className={`${className} rounded bg-current flex items-center justify-center font-black text-[10px] italic leading-none shrink-0`}>
          <span className="text-white">f</span>
        </div>
      );
    case "react":
      return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24">
          <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm9.5-2.5c-.06-.55-.22-1.09-.48-1.59-1.07-2.07-3.69-3.26-6.88-3.41.6-1.53.84-3.14.7-4.63-.16-1.66-1.07-3.05-2.5-3.79-.81-.42-1.72-.58-2.62-.48-1.87.21-3.4 1.51-4.14 3.49-.66 1.77-.6 3.75.14 5.71C2.55 7.15.54 9.17.07 11.45c-.26 1.25-.08 2.51.52 3.61 1.09 1.99 3.58 3.16 6.57 3.39-.58 1.48-.83 3.03-.71 4.46.16 1.78 1.15 3.25 2.72 4.02.73.36 1.53.51 2.33.45 1.99-.15 3.63-1.48 4.39-3.56.63-1.73.57-3.65-.15-5.57 3.25-.38 5.37-1.67 6.32-3.8.44-.99.55-2.06.44-3.05z"/>
        </svg>
      );
    case "shopify":
      return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24">
          <path d="M15.337 23.979l7.213-1.564c.594-.13.882-.782.593-1.325l-6.495-12.23-3.693 2.062 2.382 13.057zm-3.053-15.03l-4.908-1.42 2.72-2.737c.71-.715 1.745-.889 2.628-.445l.933.473-1.373 4.129zm-6.223-.746l-4.57 14.072c-.183.565.178 1.157.755 1.237l6.096.843-2.281-16.152zm11.751-2.936l-2.074-1.053c-1.848-.937-4.041-.57-5.529.924l-3.327 3.349-3.957-1.144c-.754-.219-1.539.189-1.803.939l-2.617 7.422 7.027 1.488 6.55-3.655 5.73 10.787 5.76-1.249-5.76-17.798z"/>
        </svg>
      );
    case "typescript":
      return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm14.887 8.257h2.825v10.597h-2.825V8.257zm-8.887 0h7.33v2.316H10.84v8.281H8.015v-8.281H5.125V8.257z"/>
        </svg>
      );
    case "tailwind":
      return (
        <svg className={`${className} fill-current`} viewBox="0 0 24 24">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
      );
    case "pen":
      return <PenTool className={className} />;
    case "palette":
      return <Palette className={className} />;
    case "smartphone":
    case "mobile":
      return <Smartphone className={className} />;
    case "trending":
    case "growth":
      return <TrendingUp className={className} />;
    case "package":
    case "box":
      return <Package className={className} />;
    case "layers":
      return <Layers className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "cart":
    case "shopping":
      return <ShoppingCart className={className} />;
    case "code":
      return <Code className={className} />;
    case "database":
      return <Database className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "globe":
      return <Globe className={className} />;
    case "shield":
      return <ShieldCheck className={className} />;
    case "star":
      return <Star className={className} />;
    case "zap":
      return <Zap className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
