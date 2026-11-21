export interface PortfolioShowcaseItem {
  id: string;
  number: string;
  title: string;
  category: string;
  deliverableType: string;
  description: string;
  tags: string[];
  image: string;
  widthClass: string;
  metricBadge: {
    value: string;
    label: string;
  };
  linkHref?: string;
}

export const PORTFOLIO_SHOWCASE_DATA: PortfolioShowcaseItem[] = [
  {
    id: "ecommerce-aura",
    number: "01",
    title: "Aura Home & Living",
    category: "E-Commerce Website Design",
    deliverableType: "Headless Storefront & Checkout Architecture",
    description:
      "Multi-channel Shopify Plus storefront with sub-second page loads, custom 3D product visualizer, and streamlined one-page checkout.",
    tags: ["Shopify Plus", "Next.js 14", "Headless Commerce", "Conversion CRO"],
    image: "/images/portfolio_showcase/ecommerce_showcase.jpg",
    widthClass: "w-[500px] sm:w-[580px] lg:w-[660px]",
    metricBadge: {
      value: "+182%",
      label: "Mobile Checkout GMV",
    },
    linkHref: "/services/ecommerce",
  },
  {
    id: "corporate-verastra",
    number: "02",
    title: "Verastra Global Technologies",
    category: "Corporate Website Development",
    deliverableType: "Enterprise Web Platform & Developer Portal",
    description:
      "Engineered with Next.js 14 server components, interactive API documentation, and WCAG AAA compliance across global cloud regions.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Enterprise Architecture"],
    image: "/images/portfolio_showcase/corporate_showcase.jpg",
    widthClass: "w-[540px] sm:w-[640px] lg:w-[720px]",
    metricBadge: {
      value: "100/100",
      label: "Lighthouse Performance",
    },
    linkHref: "/services/web-development",
  },
  {
    id: "mobile-pulsepay",
    number: "03",
    title: "PulsePay Mobile Ecosystem",
    category: "Mobile Application Design",
    deliverableType: "Cross-Platform iOS & Android Systems",
    description:
      "Intuitive financial dashboard with biometrics, real-time peer transfers, contactless payments, and high-frequency tactile micro-interactions.",
    tags: ["React Native", "iOS & Android", "Design System", "FinTech UI/UX"],
    image: "/images/portfolio_showcase/mobile_app_showcase.jpg",
    widthClass: "w-[440px] sm:w-[500px] lg:w-[560px]",
    metricBadge: {
      value: "4.9 ★",
      label: "App Store Rating",
    },
    linkHref: "/services/app-development",
  },
  {
    id: "branding-kroma",
    number: "04",
    title: "Kroma Studios & Atelier",
    category: "Branding and Identity",
    deliverableType: "Comprehensive Brand Guidelines & Typography",
    description:
      "End-to-end luxury brand positioning, custom variable typography suite, stationery design system, and multi-channel asset kits.",
    tags: ["Visual Identity", "Brand Strategy", "Typography", "Packaging"],
    image: "/images/portfolio_showcase/branding_showcase.jpg",
    widthClass: "w-[480px] sm:w-[560px] lg:w-[620px]",
    metricBadge: {
      value: "100%",
      label: "Cohesive Identity System",
    },
    linkHref: "/services/branding",
  },
  {
    id: "marketing-vanguard",
    number: "05",
    title: "Vanguard Launch Campaign",
    category: "Graphic Design & Marketing Creatives",
    deliverableType: "Editorial Creatives & High-CTR Social Kits",
    description:
      "Scroll-stopping social ad motion templates, large-format editorial print campaigns, and high-CTR marketing assets engineered for rapid ROAS.",
    tags: ["Editorial Design", "Performance Ads", "Motion Graphics", "Campaign Art"],
    image: "/images/portfolio_showcase/graphic_design_showcase.jpg",
    widthClass: "w-[480px] sm:w-[560px] lg:w-[620px]",
    metricBadge: {
      value: "4.6x",
      label: "Blended Ad ROAS",
    },
    linkHref: "/services/graphic-design",
  },
  {
    id: "dashboard-cloudguard",
    number: "06",
    title: "CloudGuard Observability Suite",
    category: "Dashboard & Web Application Design",
    deliverableType: "Real-Time Telemetry & Data Visualization",
    description:
      "High-density SaaS monitoring console featuring live websocket telemetry, incident management timelines, and modular widget customizers.",
    tags: ["SaaS Product UI", "Data Visualization", "Framer Motion", "Real-Time WebSockets"],
    image: "/images/portfolio_showcase/dashboard_showcase.jpg",
    widthClass: "w-[540px] sm:w-[640px] lg:w-[720px]",
    metricBadge: {
      value: "< 24ms",
      label: "Real-Time Query Latency",
    },
    linkHref: "/services/web-development",
  },
  {
    id: "marketplace-zenith",
    number: "07",
    title: "Zenith Activewear A+ Storefront",
    category: "Product & Marketplace Creatives",
    deliverableType: "Amazon & Flipkart Premium Brand Story",
    description:
      "Conversion-optimized Amazon Brand Store, A+ content modules with technical comparison matrices, and multi-angle lifestyle product carousels.",
    tags: ["Amazon Brand Registry", "Flipkart Ads", "A+ Enhanced Content", "E-Commerce Velocity"],
    image: "/images/portfolio_showcase/marketplace_showcase.jpg",
    widthClass: "w-[500px] sm:w-[600px] lg:w-[680px]",
    metricBadge: {
      value: "+240%",
      label: "Organic Marketplace Lift",
    },
    linkHref: "/services/ecommerce",
  },
];
