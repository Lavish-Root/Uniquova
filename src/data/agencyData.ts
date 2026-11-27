export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  tagline: string;
  badge: string;
  iconName: "ShoppingCart" | "Code" | "Smartphone" | "PenTool" | "Palette";
  features: string[];
  deliverables: string[];
  benefits: string[];
  workflow: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  isSubService?: boolean;
  category?: string;
}

export const SERVICE_BG_IMAGES: Record<string, string> = {
  ecommerce: "/images/services/ecommerce_solution_bg.jpg?v=3",
  "amazon-account-management": "/images/services/ecommerce_bg_1.jpg",
  "flipkart-account-management": "/images/services/ecommerce_bg_3.jpg",
  "amazon-ppc-management": "/images/services/ecom_digital_retail.jpg",
  "ecommerce-catalog-management": "/images/services/ecom_packages.jpg",
  "web-development": "/images/services/web_dev_bg.jpg",
  "app-development": "/images/services/app_dev_bg.jpg",
  branding: "/images/services/branding_bg.jpg?v=3",
  "graphic-designing": "/images/services/graphic_design_bg.jpg?v=3",
  "graphic-design": "/images/services/graphic_design_bg.jpg?v=3",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-commerce Solutions",
    tagline: "Sell. Grow. Scale.",
    badge: "Marketplace & Growth",
    category: "E-commerce",
    shortDesc: "End-to-end management and scaling for Amazon, Flipkart, and direct-to-consumer digital storefronts.",
    iconName: "ShoppingCart",
    features: [
      "Amazon marketplace management",
      "Flipkart marketplace management",
      "Product listing optimization",
      "Product catalog management",
      "Marketplace advertising and PPC",
      "Storefront management",
      "E-commerce account health support",
    ],
    deliverables: [
      "Optimized A+ Content & High-Converting Bullet Points",
      "Targeted Keyword Research & Competitor Benchmarking",
      "PPC Campaign Architecture & Bid Management",
      "Weekly ROAS and Buy-Box Monitoring Reports",
      "Inventory Forecasting & Brand Registry Support",
    ],
    benefits: [
      "Higher organic ranking across top search queries",
      "Lower ACoS and maximized return on ad spend",
      "Seamless day-to-day operations with dedicated marketplace specialists",
      "Proactive protection against listing suppressions and policy flags",
    ],
    workflow: [
      { step: "01", title: "Marketplace Audit", desc: "Comprehensive review of listings, catalog health, indexation, and ad spend efficiency." },
      { step: "02", title: "Catalog & SEO Overhaul", desc: "Keyword-rich title, bullet, and image restructuring with consumer-intent copywriting." },
      { step: "03", title: "Ad Strategy & Launch", desc: "Precision sponsored ads, video campaigns, and brand defense targeting." },
      { step: "04", title: "Ongoing Scale", desc: "Daily bid management, negative keywords, inventory alerts, and monthly growth scaling." },
    ],
    faqs: [
      {
        q: "Which marketplaces do you actively manage?",
        a: "We specialize in Amazon (IN, US, UK, UAE) and Flipkart, along with Shopify and WooCommerce headless integrations.",
      },
      {
        q: "How fast can we see improvement in sales?",
        a: "Listing enhancements and PPC restructuring typically show indexed keyword rank improvement and lower ACoS within 2 to 4 weeks.",
      },
      {
        q: "Do you handle account suspension issues?",
        a: "Yes, our team assists with Plan of Action (POA) documentation and policy compliance to restore suspended ASINs or seller privileges.",
      },
    ],
  },
  {
    id: "amazon-account-management",
    slug: "amazon-account-management",
    title: "Amazon Seller Account Management",
    tagline: "Launch. Rank #1. Dominate.",
    badge: "Amazon Partner & FBA",
    isSubService: true,
    category: "E-commerce",
    shortDesc: "Full-funnel Amazon Seller Central management in India and globally. FBA logistics, Buy Box defense, listing SEO, policy compliance, and revenue scaling.",
    iconName: "ShoppingCart",
    features: [
      "Amazon Seller Central daily account operations & monitoring",
      "Amazon Brand Registry & storefront design",
      "FBA inventory forecasting & shipment creation",
      "Buy Box monitoring & automated repricing strategy",
      "Negative review management & customer feedback compliance",
      "Account health defense & suppression resolution",
    ],
    deliverables: [
      "Fully Optimized ASIN Titles, 5 Bullets & Search Terms",
      "A+ Brand Story & EBC Enhanced Content Design",
      "Weekly Account Health & Buy Box Share Reports",
      "FBA Restock Limits & Inwarding Management",
      "Competitor Price Tracking & Hijacker Elimination",
    ],
    benefits: [
      "Consistent 95%+ Buy Box retention across high-velocity ASINs",
      "Zero unaddressed policy flags or unexpected listing suppressions",
      "Top organic rank on high-volume Indian search queries",
      "Dedicated Amazon marketplace manager with direct communication channels",
    ],
    workflow: [
      { step: "01", title: "Account & ASIN Audit", desc: "Deep diagnostic of account health, suppressed listings, indexation, and competitor pricing." },
      { step: "02", title: "Listing & Brand Overhaul", desc: "Restructuring titles, bullet points, backend search terms, and Brand Registry assets." },
      { step: "03", title: "FBA & Inventory Sync", desc: "Calibrating stock levels, setting up FBA shipments, and configuring price defense." },
      { step: "04", title: "Scale & Market Defense", desc: "Continuous Buy Box tracking, review acquisition, and quarterly business reviews." },
    ],
    faqs: [
      {
        q: "Do you manage Amazon accounts outside India (US, UK, UAE)?",
        a: "Yes, our team actively manages Amazon accounts across Amazon.in, Amazon.com (US), Amazon.co.uk, and Amazon.ae, including Global Selling tax and shipping workflows.",
      },
      {
        q: "Can you help restore a suspended Amazon seller account or blocked ASIN?",
        a: "Yes. We analyze the root cause cited by Seller Performance, draft a comprehensive Plan of Action (POA), and assist with appeal submission.",
      },
      {
        q: "How do you coordinate with our warehouse or inventory team?",
        a: "We establish shared inventory dashboards, set automated low-stock threshold alerts, and assist with FBA inbound shipment labeling.",
      },
    ],
  },
  {
    id: "flipkart-account-management",
    slug: "flipkart-account-management",
    title: "Flipkart Seller Account Management",
    tagline: "Grow. Scale. Win Big Billion Days.",
    badge: "Flipkart Marketplace",
    isSubService: true,
    category: "E-commerce",
    shortDesc: "Complete Flipkart seller portal management for Indian retail brands. Catalog onboarding, Flipkart Fulfillment (FBF), tier upgrades, and festive sales campaigns.",
    iconName: "ShoppingCart",
    features: [
      "Flipkart Seller Hub setup and daily operational management",
      "Flipkart Fulfillment (FBF) inwarding and SLA adherence",
      "Tier upgrade strategies (Bronze to Silver to Gold/Platinum)",
      "Flipkart Product Listing Ads (PLA) and SmartROI management",
      "Return rate minimization and customer dispute handling",
      "Big Billion Days (BBD) and festive sale preparation",
    ],
    deliverables: [
      "Flipkart-Compliant Catalog Sheets & Attribute Mapping",
      "SmartROI Campaign Setup & Bid Dayparting",
      "Tier Upgrade Tracking & SLA Scorecard Optimization",
      "Flipkart Brand Mall & SuperCoin Promotion Setup",
      "Weekly Settlement Reconciliation & Dispute Filings",
    ],
    benefits: [
      "Upgrade to Gold/Platinum tiers for lower commission fees and higher search placement",
      "Eliminate order cancellation penalties and late dispatch flags",
      "Multiplied sales volume during Big Billion Days and Grand Kitchen/Fashion days",
      "Seamless integration between Flipkart and your domestic fulfillment centers",
    ],
    workflow: [
      { step: "01", title: "Seller Hub Diagnostic", desc: "Auditing seller tier status, dispatch breaches, return metrics, and catalog errors." },
      { step: "02", title: "Catalog Clean-Up", desc: "Fixing invalid vertical attributes, brand approvals, and missing quality score inputs." },
      { step: "03", title: "FBF & Logistics Optimization", desc: "Onboarding products to Flipkart Fulfillment to unlock the F-Assured badge." },
      { step: "04", title: "Promotions & Paid Acceleration", desc: "Participating in exclusive Flipkart promotions and running high-ROI ad campaigns." },
    ],
    faqs: [
      {
        q: "How important is the Flipkart F-Assured badge?",
        a: "The F-Assured badge signals reliability to buyers and significantly boosts product click-through and conversion rates, often resulting in 30% to 50% sales lift.",
      },
      {
        q: "How do you help manage high return rates on Flipkart?",
        a: "We audit sizing charts, product imagery clarity, and customer return reasons, updating listing descriptions to eliminate buyer confusion.",
      },
    ],
  },
  {
    id: "amazon-ppc-management",
    slug: "amazon-ppc-management",
    title: "Amazon PPC & Marketplace Advertising",
    tagline: "Lower ACoS. Maximize ROAS. Scale Profits.",
    badge: "Marketplace Ads",
    isSubService: true,
    category: "E-commerce",
    shortDesc: "Data-backed advertising operations across Amazon and marketplaces. Sponsored Products, Sponsored Brands Video, Sponsored Display, and aggressive ACoS reduction.",
    iconName: "ShoppingCart",
    features: [
      "Sponsored Products (Automatic, Broad, Phrase, Exact campaigns)",
      "Sponsored Brands & high-converting Sponsored Brands Video (SBV)",
      "Sponsored Display audience targeting & competitor ASIN conquesting",
      "Negative keyword harvesting & budget leak elimination",
      "Dynamic bid placement multipliers (Top of Search vs Rest of Search)",
      "Total ACoS (TACoS) monitoring and profit margin defense",
    ],
    deliverables: [
      "Custom Campaign Architecture (Discovery, Target, Defense, Conquest)",
      "Weekly Search Term Mining & Negative Keyword List Updates",
      "Bid Adjustment Logs & ROAS Benchmark Dashboard",
      "Creative Assets for Video Ads and Storefront Headers",
      "Monthly Profitability & Blended Organic/Paid Impact Reports",
    ],
    benefits: [
      "Drastic drop in wasted ad spend through systematic negative keyword pruning",
      "Top-of-search dominance for your category's most profitable search terms",
      "Balanced TACoS ensuring advertising expands organic ranking without draining margins",
      "Proactive defense of your own product detail pages from competitor ad placements",
    ],
    workflow: [
      { step: "01", title: "Search Term & Ad Audit", desc: "Analyzing past 90 days of ad reports to isolate bleeding keywords and high-performing targets." },
      { step: "02", title: "Architecture Rebuild", desc: "Structuring isolated campaigns by match type and ASIN velocity to prevent cross-bidding." },
      { step: "03", title: "Bid Optimization & Negatives", desc: "Implementing daily bid refinements, dayparting adjustments, and negative phrase additions." },
      { step: "04", title: "Scale High-Performing ASINs", desc: "Expanding into Sponsored Brands Video and category conquesting as profitability stabilizes." },
    ],
    faqs: [
      {
        q: "What is a realistic target ACoS for Amazon sellers in India?",
        a: "Depending on your gross profit margin and category competition, healthy target ACoS typically ranges from 15% to 25% for mature products, with higher targets accepted during initial launch phases.",
      },
      {
        q: "How does Amazon PPC impact organic ranking?",
        a: "Paid conversions generate sales velocity on specific search queries, which directly improves organic search placement in Amazon's search algorithm.",
      },
    ],
  },
  {
    id: "ecommerce-catalog-management",
    slug: "ecommerce-catalog-management",
    title: "E-commerce Catalog Management & Listing Optimization",
    tagline: "Structure. Optimize. Convert.",
    badge: "Listing & Catalog",
    isSubService: true,
    category: "E-commerce",
    shortDesc: "End-to-end catalog taxonomy, flat file bulk uploads, listing SEO optimization, and parent-child variation architecture for hundreds of SKUs.",
    iconName: "ShoppingCart",
    features: [
      "Comprehensive listing SEO: titles, bullet points, backend search terms",
      "Parent-child variation grouping (color, size, multipack combinations)",
      "Category taxonomy mapping and classification tree alignment",
      "Flat file creation, bulk error fixing (8541, 8040, 5665 brand authorization)",
      "Suppressed listing identification and immediate restoration",
      "Cross-marketplace catalog synchronization (Amazon, Flipkart, Meesho, Shopify)",
    ],
    deliverables: [
      "Master Cleaned Product Catalog with Standardized Attributes",
      "Keyword-Optimized Listing Copy tailored to Buyer Search Intent",
      "Parent-Child Relationship Architecture across All Variations",
      "Error-Free Category Flat Files Ready for Marketplace Ingestion",
      "Monthly Catalog Health & Suppressed ASIN Audit",
    ],
    benefits: [
      "Higher search discoverability through complete, rich attribute indexing",
      "Consolidate scattered customer reviews into unified variation listings",
      "Rapid time-to-market when launching new seasonal collections or SKUs",
      "Zero revenue loss from suppressed listings sitting unnoticed in your dashboard",
    ],
    workflow: [
      { step: "01", title: "Catalog Discovery & Scrape", desc: "Exporting existing catalog files to flag missing attributes, formatting bugs, and suppressions." },
      { step: "02", title: "Keyword & Taxonomy Research", desc: "Mapping high-intent category keywords and identifying the optimal browse nodes." },
      { step: "03", title: "Bulk Optimization & Upload", desc: "Crafting persuasive listing copy, assembling parent-child trees, and uploading flat files." },
      { step: "04", title: "Quality Verification", desc: "Verifying live indexing on marketplace search pages and resolving any ingest flags." },
    ],
    faqs: [
      {
        q: "Can you fix Amazon error 8541 (single-matching error)?",
        a: "Yes. Error 8541 happens when your submitted attribute conflicts with existing Amazon catalog data. We resolve these with flat-file partial updates or brand support tickets.",
      },
      {
        q: "How many SKUs can your catalog team handle?",
        a: "Our team regularly handles catalogs ranging from single-digit flagship SKUs to comprehensive 10,000+ SKU multi-category inventory feeds.",
      },
    ],
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Website Development",
    tagline: "Build. Perform. Excel.",
    badge: "Full-Stack & Performance",
    shortDesc: "High-performance business websites, headless e-commerce stores, and custom web applications.",
    iconName: "Code",
    features: [
      "Business websites",
      "E-commerce websites",
      "Landing pages with ultra-high conversion",
      "Custom web applications",
      "UI/UX design & design systems",
      "Website maintenance & security audits",
    ],
    deliverables: [
      "Blazing-fast Next.js / React production codebases",
      "Tailwind CSS custom styling with responsive mobile-first grids",
      "Accessible, semantic markup optimized for 95+ Google Lighthouse scores",
      "Complete CMS integration (Sanity, Strapi, WordPress, or custom headless)",
      "Automated SSL, SEO metadata, and CDN deployment setup",
    ],
    benefits: [
      "Lightning load speeds resulting in reduced bounce rates",
      "Flawless responsiveness across phones, tablets, and wide monitors",
      "Modular architectures that scale effortlessly as your traffic spikes",
      "Clear conversion funnels designed to turn anonymous clicks into high-ticket leads",
    ],
    workflow: [
      { step: "01", title: "Architecture & Wireframes", desc: "User journey mapping, information hierarchy, and interactive Figma wireframes." },
      { step: "02", title: "UI/UX & Prototyping", desc: "Pixel-perfect visual design, micro-interactions, and design token specifications." },
      { step: "03", title: "Modern Engineering", desc: "Clean TypeScript code, responsive Tailwind implementation, and API integrations." },
      { step: "04", title: "QA & Deployment", desc: "Cross-browser testing, SEO checklist, speed benchmarking, and CI/CD hosting rollout." },
    ],
    faqs: [
      {
        q: "Which tech stack do you recommend for high-growth businesses?",
        a: "We primarily build with Next.js, React, TypeScript, and Tailwind CSS backed by scalable Node/Cloudflare infrastructure.",
      },
      {
        q: "Will our internal team be able to edit page copy and images?",
        a: "Absolutely. We configure intuitive visual headless CMS setups so non-technical staff can create and update pages with ease.",
      },
      {
        q: "Do you offer post-launch support and hosting maintenance?",
        a: "Yes, we provide flexible monthly maintenance packages covering software updates, backups, security monitoring, and speed optimizations.",
      },
    ],
  },
  {
    id: "app-development",
    slug: "app-development",
    title: "App Development",
    tagline: "Innovate. Engage. Grow.",
    badge: "iOS & Android",
    shortDesc: "Native and cross-platform mobile apps engineered for fluid performance, security, and user retention.",
    iconName: "Smartphone",
    features: [
      "Android applications",
      "iOS applications",
      "Cross-platform applications (Flutter / React Native)",
      "Custom business applications",
      "Secure REST & GraphQL API integration",
    ],
    deliverables: [
      "Compiled iOS (.ipa) and Android (.aab) store-ready application binaries",
      "Clean architectural code with state management (Redux, Zustand, or Riverpod)",
      "Push notification systems (Firebase Cloud Messaging, OneSignal)",
      "Payment gateway integration (Stripe, Razorpay, In-App Purchases)",
      "Full App Store and Google Play compliance review and submission",
    ],
    benefits: [
      "Direct channel to engage customers on their most personal devices",
      "Native-level 60fps animations and frictionless checkout experiences",
      "Offline caching and real-time syncing for mission-critical business tools",
      "Continuous analytics tracking to optimize retention and user lifetime value",
    ],
    workflow: [
      { step: "01", title: "Product Blueprint", desc: "Defining user personas, MVP feature scope, system architecture, and API specs." },
      { step: "02", title: "Mobile UX/UI Design", desc: "Apple Human Interface and Google Material Design aligned flows and interactions." },
      { step: "03", title: "Agile Sprints", desc: "Bi-weekly builds with integrated testing, real-device QA, and backend integrations." },
      { step: "04", title: "Store Submission", desc: "Full submission handling, screenshot design, privacy compliance, and launch monitoring." },
    ],
    faqs: [
      {
        q: "Should we build cross-platform or native apps?",
        a: "For over 85% of commercial applications, modern cross-platform frameworks (React Native/Flutter) save up to 40% development cost while delivering identical 60fps performance across both platforms.",
      },
      {
        q: "Do you assist with Google Play and Apple App Store approvals?",
        a: "Yes! We manage the entire developer account configuration, submission assets, privacy declarations, and review process.",
      },
    ],
  },
  {
    id: "branding",
    slug: "branding",
    title: "Branding",
    tagline: "Define. Differentiate.",
    badge: "Identity & Strategy",
    shortDesc: "Strategic brand identities that establish authority, captivate audiences, and foster deep customer loyalty.",
    iconName: "PenTool",
    features: [
      "Brand identity development",
      "Logo design & monogram systems",
      "Brand strategy & positioning",
      "Brand guidelines & design systems",
      "Visual identity systems",
      "Brand positioning & messaging frameworks",
    ],
    deliverables: [
      "Master vector logo files (SVG, EPS, PNG, PDF in all colorways)",
      "Comprehensive 30+ page Brand Guidelines document",
      "Curated typography rules, color palettes, and accessibility ratios",
      "Business stationery suite (cards, letterheads, invoice templates)",
      "Social media brand kit and avatar/header asset templates",
    ],
    benefits: [
      "Instantly recognizable presence that commands premium pricing",
      "Consistent visual language across every digital and print touchpoint",
      "Deep emotional resonance with your exact target demographic",
      "Clear positioning that makes competitors look obsolete",
    ],
    workflow: [
      { step: "01", title: "Brand Discovery", desc: "Auditing industry trends, competitor positioning, and brand values." },
      { step: "02", title: "Moodboards & Concepts", desc: "Exploring 3 distinct conceptual directions with color theory and typography." },
      { step: "03", title: "Design Refinement", desc: "Precision geometry crafting, lockup variations, and responsive scaling tests." },
      { step: "04", title: "System Delivery", desc: "Comprehensive brand book, export bundles, and asset handover package." },
    ],
    faqs: [
      {
        q: "What is included in the Brand Guidelines book?",
        a: "It details clear usage rules for your logo, clearance space, primary and secondary color palettes with HEX/RGB/CMYK codes, typography hierarchy, imagery style, and do's and don'ts.",
      },
      {
        q: "Who owns the copyright of the brand assets?",
        a: "You receive 100% full intellectual property and commercial copyright ownership upon project sign-off and final payment.",
      },
    ],
  },
  {
    id: "graphic-design",
    slug: "graphic-design",
    title: "Graphic Designing",
    tagline: "Create. Communicate.",
    badge: "Creative & Visuals",
    shortDesc: "High-impact visual creatives that stop the scroll, elevate campaigns, and accelerate customer conversion.",
    iconName: "Palette",
    features: [
      "Social media creatives (Instagram, LinkedIn, X)",
      "Advertising creatives for Meta, Google & TikTok ads",
      "Product creatives & 3D mockups",
      "Marketing banners & web promo assets",
      "Brochures, pitch decks and promotional materials",
    ],
    deliverables: [
      "High-res print-ready and digital formats (Figma, AI, PSD, PNG, WebP)",
      "CTR-optimized ad variants engineered for A/B split testing",
      "Interactive digital brochure and investor pitch deck presentations",
      "Custom product packaging and unboxing visuals",
      "Monthly on-demand design retainer support",
    ],
    benefits: [
      "Consistent visual excellence that builds authority in your niche",
      "Higher click-through rates and decreased ad acquisition costs",
      "Rapid turnaround on urgent campaign launches and seasonal sales",
      "Cohesive storytelling that aligns with your master brand guidelines",
    ],
    workflow: [
      { step: "01", title: "Creative Brief", desc: "Aligning on goals, target audiences, sizes, formats, and call-to-actions." },
      { step: "02", title: "Visual Ideation", desc: "Developing persuasive headline concepts, visual metaphors, and layout drafts." },
      { step: "03", title: "Production & Polish", desc: "High-craft graphic execution, color grading, and typography balancing." },
      { step: "04", title: "Multi-Format Exports", desc: "Exporting across all target platform dimensions ready for instant publishing." },
    ],
    faqs: [
      {
        q: "Can you provide designs in source formats like Figma or Adobe Illustrator?",
        a: "Yes, all source layered files (Figma, AI, PSD) along with production-ready WebP, PNG, and PDF exports are delivered.",
      },
      {
        q: "Do you design ad creatives specifically tailored to Meta and Google guidelines?",
        a: "Yes, our designs strictly comply with platform safe zones, 20% text density recommendations, and conversion best practices.",
      },
    ],
  },
];

export const WHY_CHOOSE_US_DATA = [
  {
    id: "integrated",
    title: "Integrated Digital Solutions",
    description:
      "No more juggling disconnected agencies. We unify e-commerce, web development, apps, branding, and graphic design under one collaborative team.",
    stat: "100%",
    statLabel: "End-to-End Synergy",
  },
  {
    id: "business-focused",
    title: "Business-Focused Approach",
    description:
      "We measure success not by vanity metrics, but by your bottom-line profitability, qualified leads, ROAS, and enterprise customer lifetime value.",
    stat: "3.4x",
    statLabel: "Average Client ROI",
  },
  {
    id: "creative-thinking",
    title: "Creative Thinking",
    description:
      "Distinctive, award-grade aesthetics that make your company stand out in saturated digital spaces and command premium positioning.",
    stat: "50+",
    statLabel: "Design Accolades",
  },
  {
    id: "tech-execution",
    title: "Technology-Driven Execution",
    description:
      "Modern codebases built with Next.js, TypeScript, and modern cloud architectures that ensure lightning speed, security, and zero downtime.",
    stat: "99.9%",
    statLabel: "Uptime & Performance",
  },
  {
    id: "scalable",
    title: "Scalable Solutions",
    description:
      "Whether you're an early-stage startup or a high-volume multi-channel enterprise, our systems are built to scale gracefully as you expand.",
    stat: "10x",
    statLabel: "Traffic Scalability",
  },
  {
    id: "client-centric",
    title: "Client-Centric Collaboration",
    description:
      "Transparent communication, dedicated project managers, shared Slack channels, and rapid turnaround with zero technical jargon.",
    stat: "98%",
    statLabel: "Client Satisfaction",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understand requirements & goals",
    description:
      "We deep dive into your business objectives, target audience demographics, competitive landscape, and key performance indicators to set clear benchmarks.",
    tags: ["Goal Setting", "Competitor Audit", "Target Persona", "Technical Scope"],
  },
  {
    number: "02",
    title: "Strategize",
    subtitle: "Plan the right roadmap",
    description:
      "We architect a tailored action plan detailing user experience wireframes, tech stack selection, milestone schedules, and growth projections.",
    tags: ["System Architecture", "Wireframing", "Roadmap", "Budget Optimization"],
  },
  {
    number: "03",
    title: "Create",
    subtitle: "Design, develop & implement",
    description:
      "Our multi-disciplinary team crafts pixel-perfect designs, writes clean maintainable code, configures e-commerce catalogs, and runs rigorous QA.",
    tags: ["UI/UX Prototyping", "Next.js & Mobile Dev", "E-com Setup", "Cross-Device QA"],
  },
  {
    number: "04",
    title: "Grow",
    subtitle: "Launch, optimize & scale",
    description:
      "We oversee seamless launch deployments, implement live analytics tracking, run conversion rate optimization, and provide proactive ongoing support.",
    tags: ["Production Launch", "Performance Tuning", "A/B Testing", "Continuous Scale"],
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  serviceCategory: string;
  client: string;
  description: string;
  vercelUrl: string;
  githubUrl?: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  logoUrl?: string;
  gallery?: string[];
  badges?: string[];
  tags?: string[];
  technologies: string[];
  impact: string;
  metrics: ProjectMetric[];
  featured?: boolean;
  createdAt?: string;
}

export const FEATURED_PROJECTS = [
  {
    id: "apex-commerce",
    title: "Apex Direct — D2C E-commerce Scaling",
    category: "E-commerce & Web",
    client: "Apex Lifestyle Co.",
    description:
      "Re-platformed legacy storefront to Next.js with automated Amazon marketplace inventory sync and high-converting product pages.",
    impact: "+182% Revenue Growth",
    metrics: [
      { label: "Conversion Rate", value: "+4.1%" },
      { label: "ACoS Reduction", value: "-28%" },
      { label: "Page Load", value: "0.8s" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Amazon Ads API", "Shopify Plus", "TypeScript"],
    featured: true,
    accent: "from-purple-500/20 to-indigo-500/10",
  },
  {
    id: "nova-saas",
    title: "NovaCloud — Enterprise SaaS Platform",
    category: "Web & UI/UX",
    client: "Nova Technologies",
    description:
      "Complete web application redesign and frontend architecture overhaul for an AI-powered operations monitoring suite.",
    impact: "3.2x User Engagement",
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Daily Active Users", value: "+140%" },
      { label: "Sign-up Flow Time", value: "-45%" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"],
    featured: true,
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    id: "zenith-app",
    title: "Zenith Health — Telemedicine App",
    category: "App Development",
    client: "Zenith Digital Healthcare",
    description:
      "Cross-platform iOS and Android healthcare app with encrypted patient consultations, appointment booking, and prescription tracking.",
    impact: "150K+ Active Users",
    metrics: [
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Booking Speed", value: "< 2 mins" },
      { label: "Crash-free Rate", value: "99.9%" },
    ],
    technologies: ["React Native", "WebRTC", "Node.js", "PostgreSQL", "HIPAA Compliant"],
    featured: true,
    accent: "from-blue-500/20 to-purple-500/10",
  },
  {
    id: "lumina-brand",
    title: "Lumina Organics — Global Brand Identity",
    category: "Branding & Design",
    client: "Lumina Beauty Group",
    description:
      "Full brand positioning, bespoke typography, eco-luxe packaging system, and cohesive visual identity guidelines across 20+ SKUs.",
    impact: "Sold Out in 48 Hours",
    metrics: [
      { label: "Brand Recall", value: "+84%" },
      { label: "Retail Distribution", value: "14 Countries" },
      { label: "Social Following", value: "+320%" },
    ],
    technologies: ["Visual Identity", "Packaging Design", "Figma", "3D Renderings", "Brand Guidelines"],
    featured: false,
    accent: "from-pink-500/20 to-purple-500/10",
  },
];

export interface IndustryMetric {
  label: string;
  value: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  tag: string;
  icon: string;
  image: string;
  accent: {
    bg: string;
    border: string;
    badge: string;
    badgeText: string;
    glow: string;
  };
  description: string;
  solutions: string[];
  metrics: IndustryMetric[];
  floatingBadges: { text: string; sub?: string }[];
  whyUniquova: string[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "retail",
    title: "E-commerce & Retail",
    tag: "Marketplaces & D2C Brands",
    icon: "ShoppingBag",
    image: "/images/industries/ecommerce.jpg",
    accent: {
      bg: "from-emerald-500/10 via-purple-500/5 to-transparent",
      border: "border-emerald-500/20",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      badgeText: "text-emerald-600",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    description:
      "Multi-channel marketplace domination, direct-to-consumer storefronts, inventory automation, and high-converting marketing campaigns that scale revenue rapidly.",
    solutions: ["Amazon & Flipkart PPC", "Shopify & Headless Stores", "A+ Product Content", "ROAS Optimization"],
    metrics: [
      { label: "Average GMV Scale", value: "+240%" },
      { label: "Managed Monthly GMV", value: "₹4.2Cr+" },
      { label: "Avg Product Rating", value: "4.8★" },
    ],
    floatingBadges: [
      { text: "🔥 +240% GMV Scale", sub: "Marketplace Scaling" },
      { text: "⭐ ROAS 4.8x", sub: "Ad Efficiency" },
    ],
    whyUniquova: [
      "End-to-end Amazon & Flipkart brand registry, A+ content, and algorithmic keyword positioning",
      "Headless Shopify architectures engineered for instantaneous mobile checkout conversions",
      "Automated ROAS telemetry and real-time inventory velocity management across multi-channels",
    ],
  },
  {
    id: "saas",
    title: "Technology & SaaS",
    tag: "Cloud Platforms & Modern APIs",
    icon: "Cpu",
    image: "/images/industries/saas.jpg",
    accent: {
      bg: "from-blue-500/10 via-primary/5 to-transparent",
      border: "border-blue-500/20",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      badgeText: "text-blue-600",
      glow: "rgba(59, 130, 246, 0.15)",
    },
    description:
      "Interactive product dashboards, high-converting lead generation web pages, and sleek application interfaces that reduce churn and empower developers.",
    solutions: ["Modern Web Apps", "Design Systems", "Developer Portals", "Conversion Rate Optimization"],
    metrics: [
      { label: "Cloud Uptime SLA", value: "99.98%" },
      { label: "User Activation Lift", value: "3.2x" },
      { label: "Core Web Vitals P95", value: "< 420ms" },
    ],
    floatingBadges: [
      { text: "⚡ 99.98% Cloud SLA", sub: "Enterprise Grade" },
      { text: "🚀 3.2x User Activation", sub: "Frictionless Flow" },
    ],
    whyUniquova: [
      "Enterprise Next.js architecture with instant server-side hydration and sub-second P95 loads",
      "Comprehensive design systems in Figma translated to reusable Tailwind component libraries",
      "Developer-focused interactive documentation, API explorer sandboxes, and self-serve onboarding",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & MedTech",
    tag: "HIPAA & Telehealth Platforms",
    icon: "HeartPulse",
    image: "/images/industries/healthcare.jpg",
    accent: {
      bg: "from-teal-500/10 via-primary/5 to-transparent",
      border: "border-teal-500/20",
      badge: "bg-teal-50 text-teal-700 border-teal-200",
      badgeText: "text-teal-600",
      glow: "rgba(20, 184, 166, 0.15)",
    },
    description:
      "HIPAA-conscious digital health platforms, patient booking systems, clinic branding, and accessible telemedicine mobile apps built for clinical trust.",
    solutions: ["Patient Portals", "Telehealth Mobile Apps", "Medical Brand Identity", "Regulatory-Ready Web"],
    metrics: [
      { label: "Security & Privacy", value: "100% HIPAA" },
      { label: "Patient Onboard Lift", value: "+65%" },
      { label: "Telehealth Sessions", value: "40k+" },
    ],
    floatingBadges: [
      { text: "🛡️ 100% HIPAA Compliant", sub: "Data Shield Verified" },
      { text: "🩺 40k+ Live Sessions", sub: "Telemedicine Platform" },
    ],
    whyUniquova: [
      "Strict HIPAA, ISO-27001, and Indian Digital Personal Data Protection (DPDP) compliance",
      "Encrypted doctor-patient teleconsultation video streams with electronic prescription delivery",
      "Accessibility-first WCAG AAA compliant interfaces designed for diverse patient demographics",
    ],
  },
  {
    id: "education",
    title: "Education & EdTech",
    tag: "Interactive LMS & Virtual Classrooms",
    icon: "GraduationCap",
    image: "/images/industries/education.jpg",
    accent: {
      bg: "from-amber-500/10 via-primary/5 to-transparent",
      border: "border-amber-500/20",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      badgeText: "text-amber-600",
      glow: "rgba(245, 158, 11, 0.15)",
    },
    description:
      "Engaging learning management systems, course landing funnels, virtual classrooms, and interactive student web portals designed for maximum retention.",
    solutions: ["Interactive LMS", "Student Portals", "Course Funnels", "Mobile Learning Apps"],
    metrics: [
      { label: "Course Completion", value: "84%" },
      { label: "Certified Learners", value: "10k+" },
      { label: "Video Stream Latency", value: "0 ms" },
    ],
    floatingBadges: [
      { text: "🎓 84% Completion Rate", sub: "Gamified Retention" },
      { text: "⚡ Zero-Lag Video Stream", sub: "Ultra-Fast Delivery" },
    ],
    whyUniquova: [
      "Gamified LMS platforms with real-time quiz evaluations, video chaptering, and verifiable certificates",
      "High-converting webinar and course landing funnels with automated WhatsApp notification drips",
      "Cross-device native-feel mobile learning web applications with offline content bookmarking",
    ],
  },
  {
    id: "fashion",
    title: "Lifestyle & Fashion",
    tag: "Haute Couture & Lookbook Stores",
    icon: "Sparkles",
    image: "/images/industries/fashion.jpg",
    accent: {
      bg: "from-rose-500/10 via-primary/5 to-transparent",
      border: "border-rose-500/20",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      badgeText: "text-rose-600",
      glow: "rgba(244, 63, 94, 0.15)",
    },
    description:
      "Ultra-chic editorial branding, lookbook digital experiences, fast mobile storefronts, and scroll-stopping social ad creatives tailored for luxury aesthetics.",
    solutions: ["Editorial Visual Systems", "High-Speed Catalogs", "Influencer Ad Kits", "Luxury Packaging"],
    metrics: [
      { label: "Meta & Social ROAS", value: "3.8x" },
      { label: "Mobile Catalog Speed", value: "0.8s" },
      { label: "Mobile Checkout Lift", value: "+48%" },
    ],
    floatingBadges: [
      { text: "✨ 3.8x Social Ad ROAS", sub: "High-CTR Creative" },
      { text: "📱 Sub-1s Mobile Catalog", sub: "Edge Cached" },
    ],
    whyUniquova: [
      "Haute-couture typography, interactive lookbook carousels, and 3D garment visualization",
      "Scroll-stopping social ad creatives tailored for Instagram Reels, Meta Ads, and TikTok formats",
      "Sub-second image catalog delivery powered by Next.js edge caching and WebP optimization",
    ],
  },
  {
    id: "startups",
    title: "Startups & Small Businesses",
    tag: "MVP Acceleration & Seed Capital",
    icon: "Rocket",
    image: "/images/industries/startups.jpg",
    accent: {
      bg: "from-purple-500/10 via-orange-500/5 to-transparent",
      border: "border-purple-500/20",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      badgeText: "text-purple-600",
      glow: "rgba(117, 69, 245, 0.15)",
    },
    description:
      "Fast-track MVPs, investor pitch decks, brand launches, and cost-effective digital marketing frameworks tailored to rapid market entry and traction.",
    solutions: ["Rapid MVP Launch", "Investor Pitch Decks", "Foundational Brand Kits", "Zero-to-One Marketing"],
    metrics: [
      { label: "MVP Build Sprint", value: "4 Weeks" },
      { label: "Client Capital Raised", value: "₹8.5Cr+" },
      { label: "Investor Readiness", value: "100%" },
    ],
    floatingBadges: [
      { text: "⏱️ 4-Week Rapid MVP", sub: "Zero-to-Launch" },
      { text: "📈 ₹8.5Cr+ Capital Raised", sub: "Investor Validated" },
    ],
    whyUniquova: [
      "Zero-to-One MVP architecture designed to launch live product into user hands within 30 days",
      "Investor-ready pitch decks, interactive clickable Figma prototypes, and traction dashboards",
      "Cost-efficient performance marketing playbooks that maximize runway and prove unit economics",
    ],
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  handle?: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  tag: string;
  platform?: "linkedin" | "twitter" | "verified";
  isUserSubmitted?: boolean;
  createdAt?: string;
}

export interface BrandPartnerItem {
  id: string;
  name: string;
  logoUrl: string;
  alt: string;
  websiteUrl?: string;
  order: number;
  active: boolean;
  createdAt?: string;
}

export interface CapabilityItem {
  id: string;
  name: string;
  category: string;
  track: 1 | 2;
  iconKey: string;
  order: number;
  active: boolean;
  createdAt?: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "1",
    name: "Vikram Singhania",
    handle: "@vikram_singhania",
    role: "Founder & CEO",
    company: "Aurum Retail Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote:
      "UNIQUOVA took our Amazon store from ₹4 Lakhs/month to over ₹32 Lakhs in under six months. Their marketplace team manages everything from PPC to A+ listings with incredible precision. Truly world-class execution.",
    rating: 5,
    tag: "E-commerce Growth",
    platform: "linkedin",
  },
  {
    id: "2",
    name: "Elena Rostova",
    handle: "@elena_rostova",
    role: "VP of Product",
    company: "Synapse Cloud Systems",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quote:
      "We hired UNIQUOVA to re-engineer our customer-facing web platform in Next.js. The page load speed dropped by 70%, and our lead conversions doubled within weeks. Their engineering discipline is exceptional.",
    rating: 5,
    tag: "Web Engineering",
    platform: "linkedin",
  },
  {
    id: "3",
    name: "Marcus Vance",
    handle: "@marcus_vance",
    role: "Managing Director",
    company: "Vance & Sterling Ventures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote:
      "The brand identity UNIQUOVA developed for our venture fund has set us apart on an international scale. Clean, minimalist, and commanding. We regularly receive compliments from our global partners.",
    rating: 5,
    tag: "Brand Identity",
    platform: "twitter",
  },
  {
    id: "4",
    name: "Pooja Hegde",
    handle: "@pooja_hegde",
    role: "Head of Marketing",
    company: "Kira Botanicals",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote:
      "Their graphic designing team produces scroll-stopping creatives at astonishing speed. Our Meta ad CPA reduced by 34% after running UNIQUOVA's new ad variants. They feel like a core part of our internal team.",
    rating: 5,
    tag: "Creative Strategy",
    platform: "linkedin",
  },
  {
    id: "5",
    name: "Aamir Khan",
    handle: "@aamir_k",
    role: "Co-Founder",
    company: "Pulse Logistics Tech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote:
      "The mobile application UNIQUOVA engineered for our fleet operators has 99.9% crash-free sessions across both iOS and Android. Smooth 60fps animations and seamless offline data synchronization.",
    rating: 5,
    tag: "App Development",
    platform: "linkedin",
  },
  {
    id: "6",
    name: "Sayantan Bera",
    handle: "@sayantan_b",
    role: "E-Commerce Director",
    company: "Apex D2C Brands",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    quote:
      "Managing Flipkart and Amazon simultaneously used to be a logistics nightmare. UNIQUOVA restructured our catalogs, lowered our ACoS by 28%, and won the buy-box consistently.",
    rating: 5,
    tag: "Marketplace Scale",
    platform: "twitter",
  },
  {
    id: "7",
    name: "Shreya Dhomane",
    handle: "@shreya_dhomane",
    role: "Product Lead",
    company: "Nova FinTech",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote:
      "The level of detail in UNIQUOVA's micro-animations and clean UI design systems is unmatched. It's rare to find an agency that balances cinematic visual craft and high performance this well.",
    rating: 5,
    tag: "UI/UX & Web",
    platform: "linkedin",
  },
  {
    id: "8",
    name: "Priti Verma",
    handle: "@priti_verma",
    role: "Creative Producer",
    company: "Velvet Luxe Studio",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    quote:
      "Great communication, pixel-perfect design deliverables, and high-converting marketing collaterals. UNIQUOVA helped us launch our summer campaign two weeks ahead of schedule.",
    rating: 5,
    tag: "Graphic Design",
    platform: "linkedin",
  },
  {
    id: "9",
    name: "Aarya Singh",
    handle: "@aarya_singh",
    role: "Founder",
    company: "Zest Pure Living",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    quote:
      "From brand positioning and logo design to our Shopify Plus store, UNIQUOVA built an identity that immediately resonated with our global audience. Highly recommend their strategic team.",
    rating: 5,
    tag: "Branding & Web",
    platform: "linkedin",
  },
];

export const FAQ_DATA = [
  {
    q: "What services does UNIQUOVA offer?",
    a: "UNIQUOVA is a full-service digital agency providing five integrated core capabilities: E-commerce Solutions (Amazon, Flipkart, cataloging & PPC), Website Development (business sites, e-commerce, custom web apps), App Development (iOS, Android, cross-platform), Branding (identity, strategy, guidelines, visual systems), and Graphic Designing (social, ad creatives, brochures & marketing collaterals).",
  },
  {
    q: "How does the project process work?",
    a: "We follow a proven four-stage framework: 01 Discover (understanding your goals, audience, and scope), 02 Strategize (architecting wireframes, tech stack, and execution roadmap), 03 Create (designing, developing, and rigorous testing), and 04 Grow (deployment, continuous optimization, and analytics tracking).",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on the project scale: brand identities and marketing creative sprints typically take 1 to 3 weeks; custom high-performance websites take 3 to 6 weeks; comprehensive e-commerce overhauls take 2 to 4 weeks; and mobile application builds range from 6 to 12 weeks with bi-weekly testable milestones.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes! We offer proactive monthly maintenance, cloud hosting management, marketplace daily PPC optimization, security patching, and creative design retainers so your business continues to excel long after launch.",
  },
  {
    q: "Can I hire UNIQUOVA for a single service?",
    a: "Absolutely. While many clients benefit from our integrated full-service approach, we frequently partner with clients exclusively for a specific requirement—such as Amazon marketplace management, a Next.js website redesign, or a complete brand identity revamp.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer transparent, value-based pricing: milestone-based fixed fees for well-defined web, app, and branding projects; and monthly retainer models for ongoing marketplace management, PPC ad operations, and continuous graphic design support.",
  },
  {
    q: "How can I start a project?",
    a: "Getting started is simple! Click 'Let's Talk' or 'Start Your Project' to submit your brief through our contact form. Our digital strategy team reviews your requirements and schedules a discovery call within 24 business hours.",
  },
];

export interface SocialLinkItem {
  url: string;
  enabled: boolean;
}

export interface SocialLinks {
  linkedin: SocialLinkItem;
  twitter: SocialLinkItem;
  instagram: SocialLinkItem;
  facebook: SocialLinkItem;
}

export interface CompanyInfo {
  email: string;
  emailLabel?: string;
  primaryPhone: string;
  primaryPhoneLabel?: string;
  secondaryPhone: string;
  secondaryPhoneLabel?: string;
  whatsappNumber: string;
  whatsappMessage?: string;
  officeName: string;
  address: string;
  tagline: string;
  socialLinks?: SocialLinks;
  lastUpdated?: string;
}

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  email: "hello@uniquova.com",
  emailLabel: "Inquiries & RFPs",
  primaryPhone: "+91 (0) 98765-43210",
  primaryPhoneLabel: "Mon – Fri, 9am – 6pm IST",
  secondaryPhone: "+91 (0) 98765-43211",
  secondaryPhoneLabel: "Mon – Sat, 9:30 AM – 7:00 PM IST",
  whatsappNumber: "+91 98765 43210",
  whatsappMessage: "Hello UNIQUOVA, I would like to discuss a digital project.",
  officeName: "UNIQUOVA Digital HQ",
  address: "Tech Park Corridor, Sector 4, Bangalore & New Delhi, India",
  tagline: "Your Vision. Our Expertise.",
  socialLinks: {
    linkedin: { url: "https://linkedin.com", enabled: true },
    twitter: { url: "https://twitter.com", enabled: true },
    instagram: { url: "https://instagram.com", enabled: true },
    facebook: { url: "https://facebook.com", enabled: true },
  },
  lastUpdated: "2026-11-17T03:00:00.000Z",
};

export function formatWhatsAppUrl(number: string, message?: string): string {
  const cleanDigits = (number || "919876543210").replace(/\D/g, "");
  const defaultMsg = message || "Hello UNIQUOVA, I would like to discuss a digital project.";
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(defaultMsg)}`;
}

export interface ClientQuery {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  description: string;
  source: "contact_modal" | "contact_page" | "whatsapp_cta" | "direct" | string;
  status: "new" | "contacted" | "in_progress" | "closed";
  notes?: string;
  receivedAt: string;
}

export interface SelectedWorkItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  isVideo?: boolean;
  videoSrc?: string;
  order?: number;
}

export const DEFAULT_SELECTED_WORK: SelectedWorkItem[] = [
  {
    id: "showcase-ruuster",
    title: "Ruuster AI — Manhattan Billboard Series",
    src: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_480.webp",
    alt: "Ruuster brand identity displayed on a building billboard in New York City",
    isVideo: false,
    order: 1,
  },
  {
    id: "showcase-euroteam",
    title: "Euroteam — Global Logistics Digital Platform",
    src: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_480.webp",
    alt: "Euroteam website homepage displayed on a laptop",
    isVideo: false,
    order: 2,
  },
  {
    id: "showcase-mark-os",
    title: "Mark OS — AI Content Review Platform",
    src: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp",
    alt: "MarkOS website homepage design showing AI-powered content review platform",
    isVideo: false,
    order: 3,
  },
  {
    id: "showcase-megahr",
    title: "Mega HR — AI Hiring Subway Takeover",
    src: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp",
    alt: "Mega HR brand identity posters on subway screens showing AI hiring platform",
    isVideo: false,
    order: 4,
  },
  {
    id: "showcase-credit-attorney",
    title: "The Credit Attorney — Visual Identity System",
    src: "/images/selected_work/HihuK51yaPuGKHmnXrlbzvzZM_480.webp",
    alt: "The Credit Attorney complete brand identity system showing logo and typography",
    isVideo: false,
    order: 5,
  },
  {
    id: "showcase-tablet-ux",
    title: "Mark OS — Tablet & Mobile Application UX",
    src: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp",
    alt: "Mark OS social media profile on a tablet showing the brand avatar and cover design",
    isVideo: false,
    order: 6,
  },
  {
    id: "showcase-delupay",
    title: "DeluPay — 3D Fintech Payments Identity",
    src: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
    alt: "DeluPay 3D brand visual with metallic phone on pink-purple gradient",
    isVideo: false,
    order: 7,
  },
  {
    id: "showcase-adv",
    title: "Advimagine — Manufacturing Art Precision",
    src: "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_480.webp",
    alt: "Website hero section on deep red background with glossy black 3D arrow",
    isVideo: false,
    order: 8,
  },
  {
    id: "showcase-twin",
    title: "TWIN Global — Digital Trade Ecosystem",
    src: "/images/selected_work/me7oqaVBqgeLO9RXw1QevAGsFlw_480.webp",
    alt: "TWIN design system showing typography, color palette, and UI components",
    isVideo: false,
    order: 9,
  },
  {
    id: "showcase-apex",
    title: "Apex E-Commerce — Multi-Channel Scale",
    src: "/images/portfolio/apex_ecommerce.jpg",
    alt: "E-Commerce store interface and growth analytics dashboard",
    isVideo: false,
    order: 10,
  },
];



