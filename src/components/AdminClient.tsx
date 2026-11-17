"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  ProjectItem,
  TestimonialItem,
  BrandPartnerItem,
  CapabilityItem,
  CompanyInfo,
  ClientQuery,
  DEFAULT_COMPANY_INFO,
  formatWhatsAppUrl,
} from "@/data/agencyData";
import CapabilityIcon, { CAPABILITY_ICON_OPTIONS } from "./CapabilityIcon";
import {
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Key,
  LogOut,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Search,
  Globe,
  X,
  Upload,
  ArrowUpRight,
  Mail,
  ShieldCheck,
  Clock,
  Send,
  Check,
  Star,
  MessageSquare,
  FolderKanban,
  Award,
  Menu,
  Code,
  Smartphone,
  ShoppingCart,
  Palette,
  PenTool,
  Layers,
  ChevronDown,
  Building2,
  Phone,
  PhoneCall,
  MapPin,
  MessageCircle,
  Save,
  Share2,
  Inbox,
  User,
  Building,
  Copy,
  FileText,
} from "lucide-react";

const CATEGORIES = [
  "Web Development",
  "Mobile App Development",
  "E-commerce Solutions",
  "Graphic Designing",
  "Branding",
] as const;

const SERVICE_CATEGORY_META: Record<
  string,
  {
    shortName: string;
    tagline: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    cardBorderHover: string;
  }
> = {
  All: {
    shortName: "All Projects",
    tagline: "Full production showcase",
    icon: Layers,
    accentColor: "from-primary to-primary-dark",
    badgeBg: "bg-primary-light",
    badgeText: "text-primary",
    cardBorderHover: "hover:border-primary/50",
  },
  "Web Development": {
    shortName: "Web Dev",
    tagline: "Full-Stack, Next.js & SaaS",
    icon: Code,
    accentColor: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    cardBorderHover: "hover:border-blue-400/50",
  },
  "Mobile App Development": {
    shortName: "Mobile Apps",
    tagline: "iOS, Android & Cross-Platform",
    icon: Smartphone,
    accentColor: "from-violet-600 to-purple-700",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    cardBorderHover: "hover:border-violet-400/50",
  },
  "E-commerce Solutions": {
    shortName: "E-Commerce",
    tagline: "Amazon, Shopify & Stores",
    icon: ShoppingCart,
    accentColor: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    cardBorderHover: "hover:border-emerald-400/50",
  },
  "Graphic Designing": {
    shortName: "Graphic Design",
    tagline: "Social Creatives & 3D Visuals",
    icon: Palette,
    accentColor: "from-rose-500 to-pink-600",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    cardBorderHover: "hover:border-rose-400/50",
  },
  Branding: {
    shortName: "Branding",
    tagline: "Identity Systems & Packaging",
    icon: PenTool,
    accentColor: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    cardBorderHover: "hover:border-amber-400/50",
  },
};

const REVIEW_SERVICE_CATEGORIES = [
  "All",
  "Amazon Seller Account Management",
  "Flipkart Seller Account Management",
  "Amazon PPC & Marketplace Advertising",
  "E-commerce Catalog Management",
  "E-commerce Solutions",
  "Website Development",
  "Mobile App Development",
  "Branding",
  "Graphic Designing",
] as const;

const CAPABILITY_CATEGORIES = [
  "All",
  "Web Dev",
  "E-commerce",
  "Mobile",
  "Graphic Design",
  "Branding",
  "UI/UX",
  "App Dev",
  "Tech",
] as const;

const MEDIA_PRESETS = [
  { label: "Web Development Preview", url: "/images/services/web_dev_bg.jpg" },
  { label: "Mobile App Preview", url: "/images/services/app_dev_bg.jpg" },
  { label: "E-commerce Retail & Cart", url: "/images/services/ecommerce_bg_1.jpg" },
  { label: "Digital Retail & Laptop", url: "/images/services/ecom_digital_retail.jpg" },
  { label: "Graphic Design Showcase", url: "/images/services/graphic_design_bg.jpg?v=3" },
  { label: "Brand Identity Design", url: "/images/services/branding_bg.jpg?v=3" },
  { label: "E-com Logistics & Warehouse", url: "/images/services/ecom_packages.jpg" },
];

const AVATAR_PRESETS = [
  { label: "Male Executive", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { label: "Female Executive", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
  { label: "Tech Director", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { label: "Product Lead", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
  { label: "Founder Woman", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { label: "Creative Director", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
];

const BRAND_LOGO_PRESETS = [
  { label: "PraanSewa", url: "/images/clients/praansewa.png" },
  { label: "VERASTRA", url: "/images/clients/verastra_clean.png" },
  { label: "Syaahi", url: "/images/clients/syaahi.png" },
  { label: "CloudGuard AI", url: "/images/clients/cloudguard.png" },
  { label: "Loopago", url: "/images/clients/loopago.png" },
  { label: "Amazon", url: "/images/clients/amazon.svg" },
  { label: "Flipkart", url: "/images/clients/flipkart_clean.svg" },
  { label: "Meesho", url: "/images/clients/meesho.png" },
];

export default function AdminClient() {
  // Authentication State
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Registered Admin Email
  const [adminEmail, setAdminEmail] = useState("lavishchouhan56@gmail.com");

  // Navigation tab: "projects" or "reviews" or "queries" or "brands" or "capabilities" or "company"
  const [currentTab, setCurrentTab] = useState<"projects" | "reviews" | "queries" | "brands" | "capabilities" | "company">("projects");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // COMPANY CONTACT & BRAND SETTINGS STATE
  // ==========================================
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);
  const [isLoadingCompanyInfo, setIsLoadingCompanyInfo] = useState(false);
  const [isSavingCompanyInfo, setIsSavingCompanyInfo] = useState(false);

  // Strict OTP Password Reset State: "request" -> "verify" -> "new_password"
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pwStep, setPwStep] = useState<"request" | "verify" | "new_password">("request");
  const [otpCode, setOtpCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);

  // ==========================================
  // PROJECTS STATE
  // ==========================================
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isProjectsMenuHovered, setIsProjectsMenuHovered] = useState(false);

  // Project Form State
  const [formData, setFormData] = useState({
    title: "",
    serviceCategory: "Web Development",
    client: "",
    description: "",
    vercelUrl: "",
    githubUrl: "",
    mediaType: "image" as "image" | "video",
    mediaUrl: "/images/services/web_dev_bg.jpg",
    technologies: "",
    impact: "+140% Conversion Uplift",
    metric1Label: "Lighthouse Score",
    metric1Value: "99/100",
    metric2Label: "Page Transition",
    metric2Value: "0.6s",
    metric3Label: "Conversion Rate",
    metric3Value: "+3.8%",
    featured: true,
  });

  // ==========================================
  // REVIEWS & FEEDBACK STATE
  // ==========================================
  const [reviews, setReviews] = useState<TestimonialItem[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [selectedReviewCategory, setSelectedReviewCategory] = useState<string>("All");
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number>(0);
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [deleteReviewConfirmId, setDeleteReviewConfirmId] = useState<string | null>(null);

  const [reviewFormData, setReviewFormData] = useState({
    name: "",
    company: "",
    role: "",
    service: "Amazon Seller Account Management",
    rating: 5,
    quote: "",
    avatar: "",
    platform: "verified" as "verified" | "linkedin" | "twitter",
    isUserSubmitted: false,
  });

  // ==========================================
  // CLIENT QUERIES & LEADS STATE
  // ==========================================
  const [queries, setQueries] = useState<ClientQuery[]>([]);
  const [isLoadingQueries, setIsLoadingQueries] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>("all");
  const [selectedQueryServiceFilter, setSelectedQueryServiceFilter] = useState<string>("All");
  const [deleteQueryConfirmId, setDeleteQueryConfirmId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>("");
  const [isUpdatingStatusId, setIsUpdatingStatusId] = useState<string | null>(null);

  // ==========================================
  // BRANDS STATE (Trusted By leading brands & businesses)
  // ==========================================
  const [brands, setBrands] = useState<BrandPartnerItem[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);
  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [deleteBrandConfirmId, setDeleteBrandConfirmId] = useState<string | null>(null);

  const [brandFormData, setBrandFormData] = useState({
    name: "",
    logoUrl: "/images/clients/praansewa.png",
    alt: "",
    websiteUrl: "",
    order: 1,
    active: true,
  });

  // ==========================================
  // CAPABILITIES MARQUEE STATE (Services & Capabilities Marquee)
  // ==========================================
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>([]);
  const [isLoadingCapabilities, setIsLoadingCapabilities] = useState(false);
  const [capabilitySearchQuery, setCapabilitySearchQuery] = useState("");
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<"all" | 1 | 2>("all");
  const [selectedCapabilityCategory, setSelectedCapabilityCategory] = useState<string>("All");
  const [isCapabilityModalOpen, setIsCapabilityModalOpen] = useState(false);
  const [editingCapabilityId, setEditingCapabilityId] = useState<string | null>(null);
  const [deleteCapabilityConfirmId, setDeleteCapabilityConfirmId] = useState<string | null>(null);

  const [capabilityFormData, setCapabilityFormData] = useState({
    name: "",
    category: "Web Dev",
    track: 1 as 1 | 2,
    iconKey: "code",
    order: 1,
    active: true,
  });

  // Notification Toast
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Countdown timer effect
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const interval = setInterval(() => {
      setOtpCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCountdown]);

  // Strictly enforce password requirement on every visit to /uniq_up
  useEffect(() => {
    // Clear any residual session tokens on mount so the password gate is always enforced
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("uniq_admin_key");
      localStorage.removeItem("uniq_admin_key");
    }
    setIsAuthenticated(false);
    setAdminPassword("");
    setLoginInput("");
    fetchAdminEmail();
  }, []);

  // Auto-lock CMS session after 20 minutes of inactivity for security
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsAuthenticated(false);
        setAdminPassword("");
        setLoginInput("");
        showToast("error", "CMS locked due to inactivity. Enter password to continue.");
      }, 20 * 60 * 1000);
    };

    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated]);

  const fetchAdminEmail = async (authKey?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (authKey) headers["x-admin-password"] = authKey;
      const res = await fetch("/api/admin/email", { headers });
      const data = await res.json();
      if (data.success && data.email) {
        setAdminEmail(data.email);
      }
    } catch {
      // ignore
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginInput }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAdminPassword(loginInput);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("uniq_admin_key");
        }
        setIsAuthenticated(true);
        fetchProjects();
        fetchReviews();
        fetchQueries(loginInput);
        fetchBrands();
        fetchCapabilities();
        fetchCompanyInfo();
        fetchAdminEmail(loginInput);
        showToast("success", "Welcome to UNIQOVA Operations Gateway");
      } else {
        setLoginError(data.message || "Invalid password. Access denied.");
      }
    } catch {
      setLoginError("Failed to authenticate. Please check network connection.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("uniq_admin_key");
      localStorage.removeItem("uniq_admin_key");
    }
    setIsAuthenticated(false);
    setAdminPassword("");
    setLoginInput("");
    showToast("success", "CMS Gateway locked. Master password required to re-enter.");
  };

  // -------------------------------------------------------------
  // PROJECTS API METHODS
  // -------------------------------------------------------------
  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch {
      showToast("error", "Failed to retrieve projects list");
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const openAddProjectModal = (preselectedCat?: string | React.MouseEvent) => {
    const validCatString = typeof preselectedCat === "string" ? preselectedCat : undefined;
    const chosenCategory =
      validCatString && CATEGORIES.includes(validCatString as (typeof CATEGORIES)[number])
        ? validCatString
        : selectedCategory !== "All" && CATEGORIES.includes(selectedCategory as (typeof CATEGORIES)[number])
        ? selectedCategory
        : "Web Development";

    setFormData({
      title: "",
      serviceCategory: chosenCategory,
      client: "",
      description: "",
      vercelUrl: "",
      githubUrl: "",
      mediaType: "image",
      mediaUrl: "/images/services/web_dev_bg.jpg",
      technologies: "",
      impact: "+140% Conversion Uplift",
      metric1Label: "Lighthouse Score",
      metric1Value: "99/100",
      metric2Label: "Page Transition",
      metric2Value: "0.6s",
      metric3Label: "Conversion Rate",
      metric3Value: "+3.8%",
      featured: true,
    });
    setEditingProjectId(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: ProjectItem) => {
    setFormData({
      title: project.title,
      serviceCategory: project.serviceCategory,
      client: project.client,
      description: project.description,
      vercelUrl: project.vercelUrl || "",
      githubUrl: project.githubUrl || "",
      mediaType: project.mediaType,
      mediaUrl: project.mediaUrl,
      technologies: (project.technologies || []).join(", "),
      impact: project.impact,
      metric1Label: project.metrics?.[0]?.label || "Lighthouse Score",
      metric1Value: project.metrics?.[0]?.value || "99/100",
      metric2Label: project.metrics?.[1]?.label || "Page Speed",
      metric2Value: project.metrics?.[1]?.value || "0.6s",
      metric3Label: project.metrics?.[2]?.label || "Conversion Uplift",
      metric3Value: project.metrics?.[2]?.value || "+38%",
      featured: Boolean(project.featured),
    });
    setEditingProjectId(project.id);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.serviceCategory || !formData.client || !formData.description) {
      showToast("error", "Please fill in all required fields");
      return;
    }

    const techArray = formData.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const metricsArray = [
      { label: formData.metric1Label, value: formData.metric1Value },
      { label: formData.metric2Label, value: formData.metric2Value },
      { label: formData.metric3Label, value: formData.metric3Value },
    ].filter((m) => m.label && m.value);

    const projectPayload = {
      title: formData.title,
      serviceCategory: formData.serviceCategory,
      client: formData.client,
      description: formData.description,
      vercelUrl: formData.vercelUrl,
      githubUrl: formData.githubUrl,
      mediaType: formData.mediaType,
      mediaUrl: formData.mediaUrl,
      technologies: techArray,
      impact: formData.impact,
      metrics: metricsArray,
      featured: formData.featured,
    };

    try {
      const isEditing = Boolean(editingProjectId);
      const url = "/api/projects";
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing
        ? JSON.stringify({ id: editingProjectId, ...projectPayload })
        : JSON.stringify(projectPayload);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", isEditing ? "Project updated successfully!" : "New project added successfully!");
        setIsProjectModalOpen(false);
        fetchProjects();
      } else {
        showToast("error", data.message || "Failed to save project");
      }
    } catch {
      showToast("error", "Network error while saving project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "Project deleted successfully");
        setDeleteConfirmId(null);
        fetchProjects();
      } else {
        showToast("error", data.message || "Failed to delete project");
      }
    } catch {
      showToast("error", "Error connecting to server to delete project");
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "File is too large. Please select an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setFormData((prev) => ({ ...prev, mediaUrl: compressed }));
          showToast("success", "Custom image loaded and compressed");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------
  // REVIEWS & TESTIMONIALS API METHODS
  // -------------------------------------------------------------
  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      if (data.success && Array.isArray(data.testimonials)) {
        setReviews(data.testimonials);
      }
    } catch {
      showToast("error", "Failed to retrieve testimonials list");
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const openAddReviewModal = () => {
    setReviewFormData({
      name: "",
      company: "",
      role: "",
      service: "Amazon Seller Account Management",
      rating: 5,
      quote: "",
      avatar: "",
      platform: "verified",
      isUserSubmitted: false,
    });
    setEditingReviewId(null);
    setIsReviewModalOpen(true);
  };

  const openEditReviewModal = (review: TestimonialItem) => {
    setReviewFormData({
      name: review.name,
      company: review.company || "",
      role: review.role || "",
      service: review.tag || "E-commerce Solutions",
      rating: review.rating || 5,
      quote: review.quote,
      avatar: review.avatar || "",
      platform: (review.platform as "verified" | "linkedin" | "twitter") || "verified",
      isUserSubmitted: Boolean(review.isUserSubmitted),
    });
    setEditingReviewId(review.id);
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewFormData.name.trim()) {
      showToast("error", "Please provide a client name");
      return;
    }
    if (!reviewFormData.quote.trim() || reviewFormData.quote.trim().length < 10) {
      showToast("error", "Feedback quote must be at least 10 characters");
      return;
    }

    try {
      const isEditing = Boolean(editingReviewId);
      const url = "/api/feedback";
      const method = isEditing ? "PUT" : "POST";

      const payload = {
        name: reviewFormData.name.trim(),
        company: reviewFormData.company.trim() || "Verified Client",
        role: reviewFormData.role.trim() || "Client",
        service: reviewFormData.service,
        tag: reviewFormData.service,
        rating: reviewFormData.rating,
        quote: reviewFormData.quote.trim(),
        avatar: reviewFormData.avatar,
        platform: reviewFormData.platform,
        isUserSubmitted: reviewFormData.isUserSubmitted,
      };

      const body = isEditing
        ? JSON.stringify({ id: editingReviewId, ...payload })
        : JSON.stringify(payload);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          "success",
          isEditing ? "Review updated successfully!" : "New review published to testimonials!"
        );
        setIsReviewModalOpen(false);
        setEditingReviewId(null);
        fetchReviews();
        if (data.testimonial) {
          window.dispatchEvent(
            new CustomEvent("testimonialSubmitted", { detail: data.testimonial })
          );
        }
      } else {
        showToast("error", data.error || data.message || "Failed to save review");
      }
    } catch {
      showToast("error", "Network error while saving review");
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      const res = await fetch(`/api/feedback?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "Review deleted successfully and removed from testimonials");
        setDeleteReviewConfirmId(null);
        fetchReviews();
        // Dispatch live event to immediately remove from any open views
        window.dispatchEvent(new CustomEvent("testimonialDeleted", { detail: { id } }));
        // Clean up local storage
        try {
          const local = JSON.parse(localStorage.getItem("uniqova_user_testimonials") || "[]");
          if (Array.isArray(local)) {
            const updated = local.filter((t: TestimonialItem) => t.id !== id);
            localStorage.setItem("uniqova_user_testimonials", JSON.stringify(updated));
          }
        } catch {
          // ignore
        }
      } else {
        showToast("error", data.error || data.message || "Failed to delete review");
      }
    } catch {
      showToast("error", "Error connecting to server to delete review");
    }
  };

  const handleReviewAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "File is too large. Please select an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 240;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          }
        } else {
          if (h > maxDim) {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL("image/jpeg", 0.88);
          setReviewFormData((prev) => ({ ...prev, avatar: compressed }));
          showToast("success", "Client avatar photo compressed and attached");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------
  // BRANDS API METHODS (Trusted By Leading Brands & Businesses)
  // -------------------------------------------------------------
  const fetchBrands = async () => {
    setIsLoadingBrands(true);
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();
      if (data.success && Array.isArray(data.brands)) {
        setBrands(data.brands);
      }
    } catch {
      showToast("error", "Failed to retrieve brand partners list");
    } finally {
      setIsLoadingBrands(false);
    }
  };

  const openAddBrandModal = () => {
    const nextOrder =
      brands.length > 0
        ? Math.max(...brands.map((b) => (typeof b.order === "number" ? b.order : 0))) + 1
        : 1;

    setBrandFormData({
      name: "",
      logoUrl: "/images/clients/praansewa.png",
      alt: "",
      websiteUrl: "",
      order: nextOrder,
      active: true,
    });
    setEditingBrandId(null);
    setIsBrandModalOpen(true);
  };

  const openEditBrandModal = (brand: BrandPartnerItem) => {
    setBrandFormData({
      name: brand.name,
      logoUrl: brand.logoUrl,
      alt: brand.alt || "",
      websiteUrl: brand.websiteUrl || "",
      order: brand.order ?? 1,
      active: brand.active ?? true,
    });
    setEditingBrandId(brand.id);
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandFormData.name.trim() || !brandFormData.logoUrl.trim()) {
      showToast("error", "Brand partner name and logo URL are required.");
      return;
    }

    const isEditing = !!editingBrandId;
    const url = "/api/brands";
    const method = isEditing ? "PUT" : "POST";

    const payload = {
      ...(isEditing ? { id: editingBrandId } : {}),
      name: brandFormData.name.trim(),
      logoUrl: brandFormData.logoUrl.trim(),
      alt: brandFormData.alt.trim() || brandFormData.name.trim(),
      websiteUrl: brandFormData.websiteUrl.trim(),
      order: Number(brandFormData.order) || 1,
      active: brandFormData.active,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          "success",
          isEditing
            ? `Brand partner "${brandFormData.name}" updated successfully!`
            : `Brand partner "${brandFormData.name}" added to homepage marquee!`
        );
        setIsBrandModalOpen(false);
        setEditingBrandId(null);
        fetchBrands();
        window.dispatchEvent(new CustomEvent("brandsUpdated"));
      } else {
        showToast("error", data.error || data.message || "Failed to save brand partner");
      }
    } catch {
      showToast("error", "Network error while saving brand partner");
    }
  };

  const handleToggleBrandActive = async (brand: BrandPartnerItem) => {
    try {
      const nextActive = !brand.active;
      const res = await fetch("/api/brands", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          id: brand.id,
          active: nextActive,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          "success",
          nextActive
            ? `${brand.name} is now ACTIVE in homepage marquee!`
            : `${brand.name} is now HIDDEN from homepage marquee.`
        );
        fetchBrands();
        window.dispatchEvent(new CustomEvent("brandsUpdated"));
      } else {
        showToast("error", data.error || data.message || "Failed to toggle brand status");
      }
    } catch {
      showToast("error", "Network error while updating brand status");
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      const res = await fetch(`/api/brands?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "Brand partner permanently removed from marquee.");
        setDeleteBrandConfirmId(null);
        fetchBrands();
        window.dispatchEvent(new CustomEvent("brandsUpdated"));
      } else {
        showToast("error", data.error || data.message || "Failed to delete brand partner");
      }
    } catch {
      showToast("error", "Network error while deleting brand partner");
    }
  };

  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "Logo file is too large. Please select an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setBrandFormData((prev) => ({ ...prev, logoUrl: result }));
        showToast("success", "Brand logo uploaded and attached!");
      }
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------
  // CAPABILITIES MARQUEE API METHODS (Services & Tech Marquee)
  // -------------------------------------------------------------
  const fetchCapabilities = async () => {
    setIsLoadingCapabilities(true);
    try {
      const res = await fetch("/api/capabilities");
      const data = await res.json();
      if (data.success && Array.isArray(data.capabilities)) {
        setCapabilities(data.capabilities);
      }
    } catch {
      showToast("error", "Failed to retrieve capabilities marquee list");
    } finally {
      setIsLoadingCapabilities(false);
    }
  };

  const openAddCapabilityModal = (defaultTrack?: 1 | 2) => {
    const track = defaultTrack || (selectedTrackFilter !== "all" ? selectedTrackFilter : 1);
    const trackItems = capabilities.filter((c) => c.track === track);
    const nextOrder =
      trackItems.length > 0
        ? Math.max(...trackItems.map((c) => (typeof c.order === "number" ? c.order : 0))) + 1
        : 1;

    setCapabilityFormData({
      name: "",
      category: "Web Dev",
      track: track,
      iconKey: "code",
      order: nextOrder,
      active: true,
    });
    setEditingCapabilityId(null);
    setIsCapabilityModalOpen(true);
  };

  const openEditCapabilityModal = (item: CapabilityItem) => {
    setCapabilityFormData({
      name: item.name,
      category: item.category,
      track: item.track || 1,
      iconKey: item.iconKey || "sparkles",
      order: item.order ?? 1,
      active: item.active ?? true,
    });
    setEditingCapabilityId(item.id);
    setIsCapabilityModalOpen(true);
  };

  const handleSaveCapability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capabilityFormData.name.trim() || !capabilityFormData.category.trim()) {
      showToast("error", "Capability name and category are required.");
      return;
    }

    const isEditing = !!editingCapabilityId;
    const url = "/api/capabilities";
    const method = isEditing ? "PUT" : "POST";

    const payload = {
      ...(isEditing ? { id: editingCapabilityId } : {}),
      name: capabilityFormData.name.trim(),
      category: capabilityFormData.category.trim(),
      track: capabilityFormData.track === 2 ? 2 : 1,
      iconKey: capabilityFormData.iconKey.trim().toLowerCase(),
      order: Number(capabilityFormData.order) || 1,
      active: capabilityFormData.active,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          "success",
          isEditing
            ? `Capability "${capabilityFormData.name}" updated successfully!`
            : `Capability "${capabilityFormData.name}" added to Track ${capabilityFormData.track}!`
        );
        setIsCapabilityModalOpen(false);
        setEditingCapabilityId(null);
        fetchCapabilities();
        window.dispatchEvent(new CustomEvent("capabilitiesUpdated"));
      } else {
        showToast("error", data.error || data.message || "Failed to save capability");
      }
    } catch {
      showToast("error", "Network error while saving capability");
    }
  };

  const handleToggleCapabilityActive = async (item: CapabilityItem) => {
    try {
      const nextActive = !item.active;
      const res = await fetch("/api/capabilities", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          id: item.id,
          active: nextActive,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(
          "success",
          nextActive
            ? `"${item.name}" enabled in Track ${item.track}`
            : `"${item.name}" hidden from marquee`
        );
        fetchCapabilities();
        window.dispatchEvent(new CustomEvent("capabilitiesUpdated"));
      } else {
        showToast("error", data.error || data.message || "Failed to toggle status");
      }
    } catch {
      showToast("error", "Network error updating status");
    }
  };

  const handleDeleteCapability = async (id: string) => {
    try {
      const res = await fetch(`/api/capabilities?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "Capability badge removed from marquee.");
        setDeleteCapabilityConfirmId(null);
        fetchCapabilities();
        window.dispatchEvent(new CustomEvent("capabilitiesUpdated"));
      } else {
        showToast("error", data.error || data.message || "Failed to delete capability");
      }
    } catch {
      showToast("error", "Network error while deleting capability");
    }
  };

  // -------------------------------------------------------------
  // CLIENT QUERIES & LEADS API METHODS
  // -------------------------------------------------------------
  const fetchQueries = async (overrideKey?: string) => {
    setIsLoadingQueries(true);
    try {
      const key = overrideKey || adminPassword || "";
      const headers: Record<string, string> = {};
      if (key) headers["x-admin-password"] = key;
      const res = await fetch(`/api/contact?t=${Date.now()}`, {
        headers,
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.queries)) {
        setQueries(data.queries);
      }
    } catch {
      showToast("error", "Failed to retrieve client inquiries");
    } finally {
      setIsLoadingQueries(false);
    }
  };

  const handleUpdateQueryStatus = async (
    id: string,
    newStatus: "new" | "contacted" | "in_progress" | "closed"
  ) => {
    setIsUpdatingStatusId(id);
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setQueries((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        showToast("success", `Lead status updated to ${newStatus.replace("_", " ")}`);
      } else {
        showToast("error", data.message || "Failed to update query status");
      }
    } catch {
      showToast("error", "Network error updating inquiry status");
    } finally {
      setIsUpdatingStatusId(null);
    }
  };

  const handleSaveQueryNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({ id, notes }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setQueries((prev) =>
          prev.map((q) => (q.id === id ? { ...q, notes } : q))
        );
        setEditingNotesId(null);
        showToast("success", "Admin internal note saved");
      } else {
        showToast("error", data.message || "Failed to save note");
      }
    } catch {
      showToast("error", "Network error saving note");
    }
  };

  const handleDeleteQuery = async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setQueries((prev) => prev.filter((q) => q.id !== id));
        setDeleteQueryConfirmId(null);
        showToast("success", "Inquiry removed from CMS database");
      } else {
        showToast("error", data.message || "Failed to delete inquiry");
      }
    } catch {
      showToast("error", "Network error while deleting inquiry");
    }
  };

  const openWhatsAppForClient = (query: ClientQuery) => {
    const rawPhone = query.phone || "";
    const cleanPhone = rawPhone.replace(/\D/g, "");
    const clientName = query.name && query.name !== "Direct WhatsApp Visitor" ? query.name : "there";
    const serviceName = query.service ? ` regarding ${query.service}` : "";

    if (cleanPhone.length >= 7) {
      const msg = encodeURIComponent(
        `Hello ${clientName}, this is UNIQOVA Operations${serviceName}. We reviewed your inquiry and would love to discuss next steps. When is a good time to connect?`
      );
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
    } else {
      const agencyWhatsApp = (companyInfo.whatsappNumber || "917014264008").replace(/\D/g, "");
      const msg = encodeURIComponent(
        `[Lead Follow-up: ${query.id}] ${query.name} (${query.email}) - Service: ${query.service || "Inquiry"}`
      );
      window.open(`https://wa.me/${agencyWhatsApp}?text=${msg}`, "_blank");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast("success", `Copied ${label} to clipboard: ${text}`);
    }
  };

  const formatQueryDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // -------------------------------------------------------------
  // COMPANY CONTACT & BRAND SETTINGS API METHODS
  // -------------------------------------------------------------
  const fetchCompanyInfo = async () => {
    setIsLoadingCompanyInfo(true);
    try {
      const res = await fetch(`/api/company-info?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.companyInfo) {
        setCompanyInfo(data.companyInfo);
      }
    } catch {
      showToast("error", "Failed to retrieve company contact info");
    } finally {
      setIsLoadingCompanyInfo(false);
    }
  };

  const toggleSocialVisibility = async (platform: "linkedin" | "twitter" | "instagram" | "facebook") => {
    const current = companyInfo.socialLinks || DEFAULT_COMPANY_INFO.socialLinks!;
    const isCurrentlyEnabled = current[platform]?.enabled !== false;
    const newEnabled = !isCurrentlyEnabled;

    const updatedSocialLinks = {
      ...current,
      [platform]: {
        ...current[platform],
        enabled: newEnabled,
      },
    };

    const updatedCompanyInfo: CompanyInfo = {
      ...companyInfo,
      socialLinks: updatedSocialLinks,
    };

    // 1. Immediate optimistic UI update
    setCompanyInfo(updatedCompanyInfo);

    const platformLabels: Record<string, string> = {
      linkedin: "LinkedIn",
      twitter: "Twitter / X",
      instagram: "Instagram",
      facebook: "Facebook",
    };
    const label = platformLabels[platform] || platform;

    // 2. Persist immediately to backend API
    try {
      const res = await fetch("/api/company-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(updatedCompanyInfo),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("success", `${label} is now ${newEnabled ? "Visible" : "Hidden"} on website`);
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("companyInfoUpdated", { detail: updatedCompanyInfo })
          );
          localStorage.setItem("companyInfoUpdated", Date.now().toString());
        }
      } else {
        showToast("error", data.message || `Failed to update ${label} visibility`);
      }
    } catch {
      showToast("error", `Network error updating ${label} visibility`);
    }
  };

  const handleSaveCompanyInfo = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!companyInfo.email.trim() || !companyInfo.primaryPhone.trim() || !companyInfo.address.trim()) {
      showToast("error", "Email, primary phone number, and address are required.");
      return;
    }

    setIsSavingCompanyInfo(true);
    try {
      const res = await fetch("/api/company-info", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(companyInfo),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "Company contact info & brand tagline saved successfully!");
        if (data.companyInfo) {
          setCompanyInfo(data.companyInfo);
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("companyInfoUpdated", { detail: data.companyInfo })
            );
            localStorage.setItem("companyInfoUpdated", Date.now().toString());
          }
        }
      } else {
        showToast("error", data.message || "Failed to update company information");
      }
    } catch {
      showToast("error", "Network error while saving company information");
    } finally {
      setIsSavingCompanyInfo(false);
    }
  };

  // -------------------------------------------------------------
  // STRICT OTP PASSWORD RESET HANDLERS
  // -------------------------------------------------------------
  const openPasswordResetModal = () => {
    setPwStep("request");
    setOtpCode("");
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setPwError("");
    setIsPasswordModalOpen(true);
  };

  // Step 1: Send OTP to lavishchouhan56@gmail.com
  const handleSendOtp = async () => {
    setPwError("");
    setPwLoading(true);

    try {
      const res = await fetch("/api/admin/otp/request", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.email) setAdminEmail(data.email);
        setPwStep("verify");
        setOtpCountdown(300); // 5 minutes
        showToast("success", `Verification code sent to ${data.email || adminEmail}!`);
      } else {
        setPwError(data.message || "Failed to generate OTP code.");
      }
    } catch {
      setPwError("Network error while connecting to email service.");
    } finally {
      setPwLoading(false);
    }
  };

  // Step 2: Verify OTP Code (Unlocks Step 3: New Password Window)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (!otpCode || otpCode.trim().length !== 6) {
      setPwError("Please enter the 6-digit verification code.");
      return;
    }

    setPwLoading(true);

    try {
      const res = await fetch("/api/admin/otp/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otpCode.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.resetToken) {
        setResetToken(data.resetToken);
        setPwStep("new_password");
        setPwError("");
        showToast("success", "OTP Verified! Create your new admin password.");
      } else {
        setPwError(data.message || "Invalid or expired verification code.");
      }
    } catch {
      setPwError("Verification failed. Please check network.");
    } finally {
      setPwLoading(false);
    }
  };

  // Step 3: Save New Admin Password
  const handleSaveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (!newPassword || newPassword.length < 6) {
      setPwError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      setPwError("Session expired. Please request a new OTP code.");
      setPwStep("request");
      return;
    }

    setPwLoading(true);

    try {
      const res = await fetch("/api/admin/otp/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("success", "Admin password successfully updated!");
        setIsPasswordModalOpen(false);
        setAdminPassword(newPassword);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("uniq_admin_key");
          localStorage.removeItem("uniq_admin_key");
        }
        setIsAuthenticated(true);
      } else {
        setPwError(data.message || "Failed to update password.");
      }
    } catch {
      setPwError("Error updating password. Please try again.");
    } finally {
      setPwLoading(false);
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.serviceCategory.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.client.toLowerCase().includes(query) ||
      (p.technologies || []).some((t) => t.toLowerCase().includes(query)) ||
      (p.vercelUrl || "").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const filteredReviews = reviews.filter((r) => {
    const matchesCategory =
      selectedReviewCategory === "All" ||
      (r.tag && r.tag.toLowerCase() === selectedReviewCategory.toLowerCase());

    const matchesRating =
      selectedRatingFilter === 0 ||
      (selectedRatingFilter === 3 ? (r.rating || 5) <= 3 : (r.rating || 5) === selectedRatingFilter);

    const q = reviewSearchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      r.name.toLowerCase().includes(q) ||
      (r.company && r.company.toLowerCase().includes(q)) ||
      (r.role && r.role.toLowerCase().includes(q)) ||
      r.quote.toLowerCase().includes(q) ||
      (r.tag && r.tag.toLowerCase().includes(q));

    return matchesCategory && matchesRating && matchesQuery;
  });

  // Calculate project statistics
  const stats = {
    total: projects.length,
    web: projects.filter((p) => p.serviceCategory === "Web Development").length,
    app: projects.filter((p) => p.serviceCategory === "Mobile App Development").length,
    ecom: projects.filter((p) => p.serviceCategory === "E-commerce Solutions").length,
    graphic: projects.filter((p) => p.serviceCategory === "Graphic Designing").length,
    branding: projects.filter((p) => p.serviceCategory === "Branding").length,
    design: projects.filter(
      (p) => p.serviceCategory === "Graphic Designing" || p.serviceCategory === "Branding"
    ).length,
  };

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return projects.length;
    return projects.filter((p) => p.serviceCategory === cat).length;
  };

  // Calculate review statistics
  const reviewStats = {
    total: reviews.length,
    userSubmitted: reviews.filter((r) => r.isUserSubmitted).length,
    fiveStars: reviews.filter((r) => r.rating === 5).length,
    avgRating:
      reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
        : "5.0",
  };

  // Calculate brand partner statistics
  const brandStats = {
    total: brands.length,
    active: brands.filter((b) => b.active).length,
    hidden: brands.filter((b) => !b.active).length,
    linked: brands.filter((b) => !!b.websiteUrl).length,
  };

  // Filtered brands by search
  const filteredBrands = brands.filter((brand) => {
    if (!brandSearchQuery.trim()) return true;
    const q = brandSearchQuery.toLowerCase();
    return (
      brand.name.toLowerCase().includes(q) ||
      (brand.alt && brand.alt.toLowerCase().includes(q)) ||
      (brand.websiteUrl && brand.websiteUrl.toLowerCase().includes(q))
    );
  });

  // Calculate capability statistics
  const capabilityStats = {
    total: capabilities.length,
    active: capabilities.filter((c) => c.active).length,
    track1: capabilities.filter((c) => c.track === 1).length,
    track2: capabilities.filter((c) => c.track === 2).length,
    hidden: capabilities.filter((c) => !c.active).length,
  };

  // Filtered capabilities by track, category, and search query
  const filteredCapabilities = capabilities.filter((cap) => {
    const matchesTrack = selectedTrackFilter === "all" || cap.track === selectedTrackFilter;
    const matchesCategory =
      selectedCapabilityCategory === "All" ||
      cap.category.toLowerCase() === selectedCapabilityCategory.toLowerCase();
    const q = capabilitySearchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      cap.name.toLowerCase().includes(q) ||
      cap.category.toLowerCase().includes(q) ||
      cap.iconKey.toLowerCase().includes(q);

    return matchesTrack && matchesCategory && matchesQuery;
  });

  // Calculate query / lead statistics
  const queryStats = {
    total: queries.length,
    newCount: queries.filter((q) => q.status === "new").length,
    contactedCount: queries.filter((q) => q.status === "contacted").length,
    inProgressCount: queries.filter((q) => q.status === "in_progress").length,
    closedCount: queries.filter((q) => q.status === "closed").length,
    whatsappCount: queries.filter((q) => q.source === "whatsapp_cta").length,
  };

  // Filtered queries by search, status, source, and service
  const filteredQueries = queries.filter((q) => {
    const matchesStatus =
      selectedStatusFilter === "all" || q.status === selectedStatusFilter;
    const matchesSource =
      selectedSourceFilter === "all" ||
      (selectedSourceFilter === "whatsapp" ? q.source === "whatsapp_cta" : q.source !== "whatsapp_cta");
    const matchesService =
      selectedQueryServiceFilter === "All" ||
      (q.service && q.service.toLowerCase().includes(selectedQueryServiceFilter.toLowerCase()));
    const s = querySearch.toLowerCase().trim();
    const matchesSearch =
      !s ||
      q.id.toLowerCase().includes(s) ||
      q.name.toLowerCase().includes(s) ||
      q.email.toLowerCase().includes(s) ||
      (q.phone && q.phone.toLowerCase().includes(s)) ||
      (q.company && q.company.toLowerCase().includes(s)) ||
      (q.service && q.service.toLowerCase().includes(s)) ||
      q.description.toLowerCase().includes(s) ||
      (q.notes && q.notes.toLowerCase().includes(s));

    return matchesStatus && matchesSource && matchesService && matchesSearch;
  });

  // Format countdown minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // -------------------------------------------------------------
  // VIEW 1: LOGIN GATEWAY
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FAF9FF] text-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Gradient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-200/40 rounded-full blur-[90px] pointer-events-none" />

        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-4 ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-100"
                : "bg-rose-50 border-rose-200 text-rose-800 shadow-rose-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        )}

        <div className="max-w-md w-full bg-white border border-border rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-3xl bg-primary-light/60 border border-primary-200/80 flex items-center justify-center shadow-sm hover:shadow-card hover:scale-105 transition-all duration-300">
                <Logo size="2xl" showText={false} />
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary border border-primary-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Internal CMS Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">
              UNIQ<span className="text-primary">OVA</span> CMS
            </h1>
            <p className="text-xs sm:text-sm text-dark-muted mt-1">
              Gateway for managing portfolio projects, live Vercel deployments &amp; client reviews.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                CMS Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  required
                  autoFocus
                  className="w-full bg-white border border-border rounded-2xl px-4 py-3.5 pr-12 text-sm text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 px-6 rounded-2xl shadow-glow-sm hover:shadow-glow transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Access CMS Dashboard</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* OTP Password Reset Option */}
          <div className="mt-5 pt-4 border-t border-border text-center">
            <button
              type="button"
              onClick={openPasswordResetModal}
              className="text-xs text-primary hover:text-primary-dark font-semibold inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Forgot Password? Reset via Email OTP</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs text-dark-muted hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              ← Back to UNIQOVA Homepage
            </Link>
          </div>
        </div>

        {/* STRICT OTP MODAL (ON LOGIN SCREEN) */}
        {isPasswordModalOpen && (
          <OtpPasswordResetModal
            pwStep={pwStep}
            setPwStep={setPwStep}
            adminEmail={adminEmail}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            pwLoading={pwLoading}
            pwError={pwError}
            otpCountdown={otpCountdown}
            formatTime={formatTime}
            handleSendOtp={handleSendOtp}
            handleVerifyOtp={handleVerifyOtp}
            handleSaveNewPassword={handleSaveNewPassword}
            onClose={() => setIsPasswordModalOpen(false)}
          />
        )}
      </main>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN CMS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF9FF] text-dark flex flex-col selection:bg-primary/20 selection:text-primary-dark">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-emerald-100"
              : "bg-rose-50 border-rose-200 text-rose-800 shadow-rose-100"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-dark-muted hover:text-dark text-xs font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* DESKTOP FIXED SIDEBAR (LEFT NAVIGATION)                   */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-40 bg-white border-r border-border shadow-[4px_0_24px_rgba(117,69,245,0.03)]">
        {/* Sidebar Header */}
        <div className="h-20 px-6 border-b border-border flex items-center justify-between">
          <Logo size="sm" showTagline={false} />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live CMS
          </span>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          {/* Main Navigation Group */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-dark-muted/60 px-3 mb-2.5">
              Content Management
            </p>
            <div className="space-y-1.5">
              {/* Tab 1: Portfolio Projects with hover-revealed sub-categories */}
              <div
                className="relative group"
                onMouseEnter={() => setIsProjectsMenuHovered(true)}
                onMouseLeave={() => setIsProjectsMenuHovered(false)}
              >
                <button
                  onClick={() => setCurrentTab("projects")}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    currentTab === "projects"
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm scale-[1.02]"
                      : "text-dark-muted hover:text-dark hover:bg-softBg border border-transparent hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        currentTab === "projects"
                          ? "bg-white/20 text-white"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      <FolderKanban className="w-4 h-4" />
                    </div>
                    <span className="tracking-tight text-sm font-bold">Portfolio Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                        currentTab === "projects"
                          ? "bg-white/25 text-white"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      {projects.length}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isProjectsMenuHovered ? "rotate-180" : ""
                      } ${currentTab === "projects" ? "text-white" : "text-dark-muted/60"}`}
                    />
                  </div>
                </button>

                {/* Sub-menu for Portfolio Categories - reveals on hover */}
                <div
                  className={`ml-4 pl-3.5 border-l-2 border-primary/25 space-y-1 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
                    isProjectsMenuHovered
                      ? "max-h-96 opacity-100 my-2 scale-y-100 visible"
                      : "max-h-0 opacity-0 my-0 scale-y-95 invisible pointer-events-none"
                  }`}
                >
                  <button
                    onClick={() => {
                      setCurrentTab("projects");
                      setSelectedCategory("All");
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      currentTab === "projects" && selectedCategory === "All"
                        ? "bg-primary-light text-primary font-black shadow-2xs"
                        : "text-dark-muted hover:text-dark hover:bg-softBg"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Layers className="w-3 h-3 shrink-0" />
                      <span className="truncate">All Categories</span>
                    </div>
                    <span className="text-[10px] opacity-75 font-black">{projects.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => {
                    const meta = SERVICE_CATEGORY_META[cat];
                    const IconComp = meta?.icon || FolderKanban;
                    const catCount = getCategoryCount(cat);
                    const isCatSelected = currentTab === "projects" && selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setCurrentTab("projects");
                          setSelectedCategory(cat);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                          isCatSelected
                            ? "bg-primary-light text-primary font-black shadow-2xs"
                            : "text-dark-muted hover:text-dark hover:bg-softBg"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <IconComp className="w-3 h-3 shrink-0" />
                          <span className="truncate">{meta?.shortName || cat}</span>
                        </div>
                        <span className="text-[10px] opacity-75 font-black">{catCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab 2: Client Reviews */}
              <button
                onClick={() => {
                  setCurrentTab("reviews");
                  if (reviews.length === 0) fetchReviews();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  currentTab === "reviews"
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm scale-[1.02]"
                    : "text-dark-muted hover:text-dark hover:bg-softBg border border-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      currentTab === "reviews"
                        ? "bg-white/20 text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight text-sm font-bold">Client Reviews</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                    currentTab === "reviews"
                      ? "bg-white/25 text-white"
                      : "bg-primary-light text-primary"
                  }`}
                >
                  {reviews.length}
                </span>
              </button>

              {/* Tab 3: Client Queries & Leads */}
              <button
                onClick={() => {
                  setCurrentTab("queries");
                  fetchQueries();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  currentTab === "queries"
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm scale-[1.02]"
                    : "text-dark-muted hover:text-dark hover:bg-softBg border border-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      currentTab === "queries"
                        ? "bg-white/20 text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Inbox className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight text-sm font-bold">Client Queries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {queryStats.newCount > 0 && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-900 animate-pulse shadow-xs"
                      title={`${queryStats.newCount} unread new leads`}
                    >
                      {queryStats.newCount} NEW
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                      currentTab === "queries"
                        ? "bg-white/25 text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    {queries.length}
                  </span>
                </div>
              </button>

              {/* Tab 3: Trusted Brands & Marquee */}
              <button
                onClick={() => {
                  setCurrentTab("brands");
                  if (brands.length === 0) fetchBrands();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  currentTab === "brands"
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm scale-[1.02]"
                    : "text-dark-muted hover:text-dark hover:bg-softBg border border-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      currentTab === "brands"
                        ? "bg-white/20 text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight text-sm font-bold">Trusted Brands</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                    currentTab === "brands"
                      ? "bg-white/25 text-white"
                      : "bg-primary-light text-primary"
                  }`}
                >
                  {brands.length}
                </span>
              </button>

              {/* Tab 4: Services & Capabilities Marquee */}
              <button
                onClick={() => {
                  setCurrentTab("capabilities");
                  if (capabilities.length === 0) fetchCapabilities();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  currentTab === "capabilities"
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm scale-[1.02]"
                    : "text-dark-muted hover:text-dark hover:bg-softBg border border-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      currentTab === "capabilities"
                        ? "bg-white/20 text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight text-sm font-bold">Services Marquee</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                    currentTab === "capabilities"
                      ? "bg-white/25 text-white"
                      : "bg-primary-light text-primary"
                  }`}
                >
                  {capabilities.length}
                </span>
              </button>

              {/* Tab 5: Contact & Brand Settings */}
              <button
                onClick={() => {
                  setCurrentTab("company");
                  fetchCompanyInfo();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  currentTab === "company"
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm scale-[1.02]"
                    : "text-dark-muted hover:text-dark hover:bg-softBg border border-transparent hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      currentTab === "company"
                        ? "bg-white/20 text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="tracking-tight text-sm font-bold">Contact &amp; Brand Info</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    currentTab === "company"
                      ? "bg-white/25 text-white"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  Live
                </span>
              </button>
            </div>
          </div>

          {/* Quick Previews & Shortcuts */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-dark-muted/60 px-3 mb-2.5">
              Live Website Previews
            </p>
            <div className="space-y-1">
              <Link
                href="/our-work"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-dark-muted hover:text-primary hover:bg-primary-light/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Live /our-work</span>
                </div>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>

              <Link
                href="/#testimonials"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-dark-muted hover:text-primary hover:bg-primary-light/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Live Testimonials</span>
                </div>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>

              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-dark-muted hover:text-primary hover:bg-primary-light/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  <span>Main Homepage</span>
                </div>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Admin Profile & Actions */}
        <div className="p-4 border-t border-border bg-softBg/50 space-y-3">
          {/* Admin Email Box */}
          <div className="p-3 rounded-2xl bg-white border border-border shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary block leading-none mb-0.5">
                Super Admin
              </span>
              <p className="text-xs font-mono font-bold text-dark truncate" title={adminEmail}>
                {adminEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openPasswordResetModal}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-primary-light text-dark-muted hover:text-primary border border-border text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Change Admin Password via OTP"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold text-rose-600 transition-all shadow-xs cursor-pointer"
              title="Sign Out of CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE DRAWER SIDEBAR                                     */}
      {/* ========================================================= */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="h-20 px-6 border-b border-border flex items-center justify-between">
              <Logo size="sm" showTagline={false} />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-xl text-dark-muted hover:text-dark hover:bg-softBg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Nav */}
            <div className="flex-1 p-5 space-y-6 overflow-y-auto">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-dark-muted/60 px-3 mb-2.5">
                  Content Management
                </p>
                <div className="space-y-1.5">
                  {/* Tab 1: Portfolio Projects */}
                  <div>
                    <button
                      onClick={() => {
                        setCurrentTab("projects");
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        currentTab === "projects"
                          ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm"
                          : "text-dark-muted hover:bg-softBg border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FolderKanban className="w-4 h-4" />
                        <span className="text-sm font-bold">Portfolio Projects</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-white/20">
                        {projects.length}
                      </span>
                    </button>

                    {currentTab === "projects" && (
                      <div className="ml-4 pl-3.5 border-l-2 border-primary/25 space-y-1 my-2">
                        <button
                          onClick={() => {
                            setSelectedCategory("All");
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                            selectedCategory === "All"
                              ? "bg-primary-light text-primary font-black"
                              : "text-dark-muted hover:text-dark hover:bg-softBg"
                          }`}
                        >
                          <span className="truncate">All Categories</span>
                          <span className="text-[10px] font-black opacity-75">{projects.length}</span>
                        </button>
                        {CATEGORIES.map((cat) => {
                          const catCount = getCategoryCount(cat);
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsSidebarOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                                selectedCategory === cat
                                  ? "bg-primary-light text-primary font-black"
                                  : "text-dark-muted hover:text-dark hover:bg-softBg"
                              }`}
                            >
                              <span className="truncate">{cat}</span>
                              <span className="text-[10px] font-black opacity-75">{catCount}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentTab("reviews");
                      if (reviews.length === 0) fetchReviews();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      currentTab === "reviews"
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm"
                        : "text-dark-muted hover:bg-softBg border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-bold">Client Reviews</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-white/20">
                      {reviews.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab("queries");
                      fetchQueries();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      currentTab === "queries"
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm"
                        : "text-dark-muted hover:bg-softBg border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Inbox className="w-4 h-4" />
                      <span className="text-sm font-bold">Client Queries</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {queryStats.newCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-900">
                          {queryStats.newCount} NEW
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-white/20">
                        {queries.length}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab("brands");
                      if (brands.length === 0) fetchBrands();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      currentTab === "brands"
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm"
                        : "text-dark-muted hover:bg-softBg border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-bold">Trusted Brands</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-white/20">
                      {brands.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab("capabilities");
                      if (capabilities.length === 0) fetchCapabilities();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      currentTab === "capabilities"
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm"
                        : "text-dark-muted hover:bg-softBg border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-bold">Services Marquee</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-white/20">
                      {capabilities.length}
                    </span>
                  </button>

                  {/* Tab 5: Contact & Brand Settings */}
                  <button
                    onClick={() => {
                      setCurrentTab("company");
                      fetchCompanyInfo();
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      currentTab === "company"
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm"
                        : "text-dark-muted hover:bg-softBg border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-bold">Contact &amp; Brand Info</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700">
                      Live
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-dark-muted/60 px-3 mb-2.5">
                  Live Previews
                </p>
                <div className="space-y-1">
                  <Link
                    href="/our-work"
                    target="_blank"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-dark-muted hover:text-primary"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      <span>Live /our-work</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-dark-muted/50" />
                  </Link>

                  <Link
                    href="/#testimonials"
                    target="_blank"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-dark-muted hover:text-primary"
                  >
                    <div className="flex items-center gap-2.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>Live Testimonials</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-dark-muted/50" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-border bg-softBg/50 space-y-3">
              <div className="p-3 rounded-2xl bg-white border border-border shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-bold text-xs shrink-0">
                  AD
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase text-primary">Super Admin</p>
                  <p className="text-xs font-mono font-bold text-dark truncate">{adminEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    openPasswordResetModal();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-border text-xs font-bold text-dark-muted"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Password</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA (RIGHT SIDE)                            */}
      {/* ========================================================= */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-border text-dark hover:bg-softBg transition-colors cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-dark-muted hidden sm:inline">CMS Dashboard</span>
              <span className="text-xs text-dark-muted/40 hidden sm:inline">/</span>
              <span className="text-xs sm:text-sm font-bold text-dark flex items-center gap-2">
                {currentTab === "projects" ? (
                  <>
                    <FolderKanban className="w-4 h-4 text-primary" />
                    <span>Portfolio Projects Management</span>
                  </>
                ) : currentTab === "reviews" ? (
                  <>
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span>Client Reviews &amp; Testimonials</span>
                  </>
                ) : currentTab === "queries" ? (
                  <>
                    <Inbox className="w-4 h-4 text-primary" />
                    <span>Client Inquiries &amp; Project Leads</span>
                  </>
                ) : currentTab === "brands" ? (
                  <>
                    <Award className="w-4 h-4 text-primary" />
                    <span>Trusted Brands &amp; Client Partners</span>
                  </>
                ) : currentTab === "capabilities" ? (
                  <>
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Services &amp; Capabilities Marquee</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>Contact Channels &amp; Brand Tagline</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Live Preview Link */}
            {currentTab === "projects" ? (
              <Link
                href="/our-work"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-xs font-semibold text-dark-muted hover:text-primary transition-all shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Live /our-work</span>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            ) : currentTab === "reviews" ? (
              <Link
                href="/#testimonials"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-xs font-semibold text-dark-muted hover:text-primary transition-all shadow-xs"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Live Testimonials</span>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            ) : currentTab === "queries" ? (
              <Link
                href="/contact"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-xs font-semibold text-dark-muted hover:text-primary transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>Live /contact</span>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            ) : currentTab === "brands" ? (
              <Link
                href="/"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-xs font-semibold text-dark-muted hover:text-primary transition-all shadow-xs"
              >
                <Award className="w-3.5 h-3.5 text-primary" />
                <span>Live Brands</span>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            ) : currentTab === "capabilities" ? (
              <Link
                href="/#services"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-xs font-semibold text-dark-muted hover:text-primary transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Live Services</span>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            ) : (
              <Link
                href="/contact"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-xs font-semibold text-dark-muted hover:text-primary transition-all shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-primary" />
                <span>Live Contact &amp; Footer</span>
                <ExternalLink className="w-3 h-3 text-dark-muted/50" />
              </Link>
            )}

            {/* Sync / Refresh Button */}
            <button
              onClick={
                currentTab === "projects"
                  ? fetchProjects
                  : currentTab === "reviews"
                  ? fetchReviews
                  : currentTab === "queries"
                  ? () => fetchQueries()
                  : currentTab === "brands"
                  ? fetchBrands
                  : currentTab === "capabilities"
                  ? fetchCapabilities
                  : fetchCompanyInfo
              }
              disabled={
                currentTab === "projects"
                  ? isLoadingProjects
                  : currentTab === "reviews"
                  ? isLoadingReviews
                  : currentTab === "queries"
                  ? isLoadingQueries
                  : currentTab === "brands"
                  ? isLoadingBrands
                  : currentTab === "capabilities"
                  ? isLoadingCapabilities
                  : isLoadingCompanyInfo
              }
              className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-primary-light/50 border border-border text-dark-muted hover:text-primary transition-all disabled:opacity-50 shadow-xs cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  (currentTab === "projects"
                    ? isLoadingProjects
                    : currentTab === "reviews"
                    ? isLoadingReviews
                    : currentTab === "queries"
                    ? isLoadingQueries
                    : currentTab === "brands"
                    ? isLoadingBrands
                    : currentTab === "capabilities"
                    ? isLoadingCapabilities
                    : isLoadingCompanyInfo)
                    ? "animate-spin text-primary"
                    : ""
                }`}
              />
            </button>

            {/* Primary Action Button */}
            {currentTab === "projects" ? (
              <button
                onClick={openAddProjectModal}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Project</span>
                <span className="sm:hidden">New Project</span>
              </button>
            ) : currentTab === "reviews" ? (
              <button
                onClick={openAddReviewModal}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Review</span>
                <span className="sm:hidden">New Review</span>
              </button>
            ) : currentTab === "queries" ? (
              <a
                href={formatWhatsAppUrl(companyInfo.whatsappNumber, companyInfo.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                title="Open WhatsApp with pre-configured concierge message"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span className="hidden sm:inline">Open Agency WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            ) : currentTab === "brands" ? (
              <button
                onClick={openAddBrandModal}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Brand Partner</span>
                <span className="sm:hidden">New Brand</span>
              </button>
            ) : currentTab === "capabilities" ? (
              <button
                onClick={() => openAddCapabilityModal()}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Capability Badge</span>
                <span className="sm:hidden">New Badge</span>
              </button>
            ) : null}
          </div>
        </header>

        {/* Content Body Container */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
          {/* ========================================================= */}
          {/* TAB 1: PORTFOLIO PROJECTS VIEW                             */}
          {/* ========================================================= */}
          {currentTab === "projects" && (
            <div>
              {/* Banner with Stats & Add Button */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
                <div>
                <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Portfolio Content Management</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">
                  Manage Client Projects &amp; Live Vercel Links
                </h1>
                <p className="text-sm text-dark-muted mt-1 max-w-2xl font-medium">
                  Publish projects with live Vercel deployments, screenshots, tech stacks, and measurable client outcomes.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={fetchProjects}
                  disabled={isLoadingProjects}
                  className="p-3.5 rounded-2xl bg-white hover:bg-primary-light/50 border border-border text-dark-muted hover:text-primary transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                  title="Refresh project list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingProjects ? "animate-spin text-primary" : ""}`} />
                </button>

                <button
                  onClick={openAddProjectModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Project</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid - Interactive Click-to-Filter */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
              {/* Total */}
              <button
                onClick={() => setSelectedCategory("All")}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-white border-primary shadow-glow-sm ring-2 ring-primary/20"
                    : "bg-white border-border hover:border-primary/40 hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-dark-muted font-bold">Total</p>
                  <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-2xl font-black text-dark mt-2">{stats.total}</p>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">All Disciplines</p>
              </button>

              {/* Web Development */}
              <button
                onClick={() => setSelectedCategory("Web Development")}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCategory === "Web Development"
                    ? "bg-white border-blue-500 shadow-glow-sm ring-2 ring-blue-500/20"
                    : "bg-white border-border hover:border-blue-400/50 hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">Web Dev</p>
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Code className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-2xl font-black text-dark mt-2">{stats.web}</p>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">Next.js &amp; SaaS</p>
              </button>

              {/* Mobile Apps */}
              <button
                onClick={() => setSelectedCategory("Mobile App Development")}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCategory === "Mobile App Development"
                    ? "bg-white border-violet-500 shadow-glow-sm ring-2 ring-violet-500/20"
                    : "bg-white border-border hover:border-violet-400/50 hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-violet-600 font-bold">Mobile Apps</p>
                  <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-2xl font-black text-dark mt-2">{stats.app}</p>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">iOS &amp; Android</p>
              </button>

              {/* E-Commerce */}
              <button
                onClick={() => setSelectedCategory("E-commerce Solutions")}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCategory === "E-commerce Solutions"
                    ? "bg-white border-emerald-500 shadow-glow-sm ring-2 ring-emerald-500/20"
                    : "bg-white border-border hover:border-emerald-400/50 hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">E-Commerce</p>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-2xl font-black text-dark mt-2">{stats.ecom}</p>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">Amazon &amp; Stores</p>
              </button>

              {/* Graphic Designing */}
              <button
                onClick={() => setSelectedCategory("Graphic Designing")}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCategory === "Graphic Designing"
                    ? "bg-white border-rose-500 shadow-glow-sm ring-2 ring-rose-500/20"
                    : "bg-white border-border hover:border-rose-400/50 hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-rose-600 font-bold">Graphic Design</p>
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Palette className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-2xl font-black text-dark mt-2">{stats.graphic}</p>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">Creatives &amp; 3D</p>
              </button>

              {/* Branding */}
              <button
                onClick={() => setSelectedCategory("Branding")}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCategory === "Branding"
                    ? "bg-white border-amber-500 shadow-glow-sm ring-2 ring-amber-500/20"
                    : "bg-white border-border hover:border-amber-400/50 hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">Branding</p>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <PenTool className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-2xl font-black text-dark mt-2">{stats.branding}</p>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">Identity &amp; Packaging</p>
              </button>
            </div>

            {/* Project Content Workspace */}
            <div className="space-y-6">
              {/* Search & Category Filter Bar */}
              <div className="bg-white border border-border rounded-2xl p-4 sm:p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-dark tracking-tight">
                      {selectedCategory === "All"
                        ? "All Portfolio Projects"
                        : `${selectedCategory}`}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-light text-primary text-xs font-black">
                      {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
                    </span>
                  </div>
                  <p className="text-xs text-dark-muted font-medium mt-0.5 truncate">
                    {selectedCategory === "All"
                      ? "Showing active client case studies across all digital disciplines"
                      : SERVICE_CATEGORY_META[selectedCategory]?.tagline ||
                        `Filtered projects for ${selectedCategory}`}
                  </p>
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-72 shrink-0">
                  <Search className="w-4 h-4 text-dark-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, client, tech..."
                    className="w-full bg-softBg/60 hover:bg-white focus:bg-white border border-border rounded-xl pl-10 pr-8 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark text-xs p-1 cursor-pointer"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Projects Cards Grid */}
              {filteredProjects.length === 0 ? (
                <div className="bg-white border border-border rounded-3xl p-12 text-center shadow-card">
                  <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary mx-auto flex items-center justify-center mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-1">No Projects Found</h3>
                  <p className="text-xs text-dark-muted max-w-md mx-auto mb-6 font-medium">
                    {searchQuery
                      ? `No projects matched "${searchQuery}". Try a different keyword.`
                      : `No projects in ${selectedCategory} yet. Click below to add your first project in this category!`}
                  </p>
                  <button
                    onClick={() =>
                      openAddProjectModal(selectedCategory !== "All" ? selectedCategory : undefined)
                    }
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-glow-sm hover:shadow-glow inline-flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      Add First {selectedCategory !== "All" ? selectedCategory : "Project"}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white border border-border rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-card"
                      >
                        {/* Media Preview Thumbnail */}
                        <div className="relative aspect-[16/10] bg-primary-light/20 overflow-hidden">
                          <img
                            src={project.mediaUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-dark border border-border shadow-xs">
                              {project.serviceCategory}
                            </span>
                            {project.featured && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-[10px] font-black text-dark shadow-xs">
                                FEATURED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                {project.client}
                              </span>
                              <span className="text-[11px] text-emerald-700 font-bold px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                                {project.impact}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>

                            <p className="text-xs text-dark-muted line-clamp-3 mb-4 leading-relaxed font-medium">
                              {project.description}
                            </p>

                            {/* Technologies Tags */}
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.technologies.slice(0, 4).map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-md bg-primary-light/60 border border-primary-200/60 text-[11px] text-primary-dark font-mono font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 4 && (
                                  <span className="px-2 py-0.5 rounded-md bg-softBg text-[11px] text-dark-muted font-medium">
                                    +{project.technologies.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Action Links & Buttons */}
                          <div className="pt-4 border-t border-border flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              {project.vercelUrl ? (
                                <a
                                  href={project.vercelUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-dark-muted hover:text-primary transition-colors truncate max-w-[180px] font-mono flex items-center gap-1"
                                >
                                  <Globe className="w-3 h-3 shrink-0" />
                                  <span className="truncate">
                                    {project.vercelUrl.replace("https://", "")}
                                  </span>
                                </a>
                              ) : (
                                <span className="text-[11px] text-dark-muted/50 italic">
                                  No Vercel URL
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditProjectModal(project)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-primary-light text-xs font-bold text-dark-muted hover:text-primary border border-border hover:border-primary/30 transition-all shadow-xs cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-primary" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => setDeleteConfirmId(project.id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-xs cursor-pointer"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        {/* ========================================================= */}
        {/* TAB 2: CLIENT REVIEWS & FEEDBACK MANAGEMENT VIEW           */}
        {/* ========================================================= */}
        {currentTab === "reviews" && (
          <div>
            {/* Banner with Stats & Add Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Client Testimonial &amp; Feedback Operations</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">
                  Review, Moderate &amp; Curate Testimonials
                </h1>
                <p className="text-sm text-dark-muted mt-1 max-w-2xl font-medium">
                  Manage all client endorsements. Any review you add or delete here automatically updates and syncs with the live website testimonials section.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={fetchReviews}
                  disabled={isLoadingReviews}
                  className="p-3.5 rounded-2xl bg-white hover:bg-primary-light/50 border border-border text-dark-muted hover:text-primary transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                  title="Refresh reviews list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingReviews ? "animate-spin text-primary" : ""}`} />
                </button>

                <button
                  onClick={openAddReviewModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Review</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid for Reviews */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-dark-muted font-bold">Total Reviews</p>
                <p className="text-2xl font-black text-dark mt-1">{reviewStats.total}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Active in testimonial carousel</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Client Submissions</p>
                <p className="text-2xl font-black text-dark mt-1">{reviewStats.userSubmitted}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Submitted via /feedback form</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-amber-600 font-bold">5-Star Ratings</p>
                <p className="text-2xl font-black text-dark mt-1">{reviewStats.fiveStars}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Maximum satisfaction score</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-primary font-bold">Average Rating</p>
                <p className="text-2xl font-black text-dark mt-1 flex items-center gap-1.5">
                  <span>{reviewStats.avgRating}</span>
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
                </p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Across all client engagements</p>
              </div>
            </div>

            {/* Filters: Category, Rating & Search */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  {REVIEW_SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedReviewCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        selectedReviewCategory === cat
                          ? "bg-primary text-white shadow-glow-sm"
                          : "bg-white text-dark-muted hover:text-primary hover:bg-primary-light/50 border border-border shadow-xs"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-dark-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    placeholder="Search by client, company, quote..."
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
                  />
                  {reviewSearchQuery && (
                    <button
                      onClick={() => setReviewSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Rating Filter Pills */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-dark-muted mr-1">
                  Filter Rating:
                </span>
                {[
                  { label: "All Ratings", val: 0 },
                  { label: "5 Stars", val: 5 },
                  { label: "4 Stars", val: 4 },
                  { label: "3 Stars & Below", val: 3 },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setSelectedRatingFilter(item.val)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRatingFilter === item.val
                        ? "bg-amber-400 text-dark font-bold shadow-xs"
                        : "bg-white text-dark-muted hover:text-dark hover:bg-primary-light/50 border border-border shadow-xs"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews Cards Grid */}
            {filteredReviews.length === 0 ? (
              <div className="bg-white border border-border rounded-3xl p-12 text-center my-8 shadow-card">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-1">No Reviews Found</h3>
                <p className="text-xs text-dark-muted max-w-md mx-auto mb-6 font-medium">
                  {reviewSearchQuery
                    ? `No testimonials matched "${reviewSearchQuery}". Try another keyword.`
                    : "No client reviews match this filter. Click the button below to add a new review!"}
                </p>
                <button
                  onClick={openAddReviewModal}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-glow-sm hover:shadow-glow inline-flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Review</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-border rounded-3xl p-6 hover:border-primary/40 hover:shadow-card-hover transition-all flex flex-col justify-between group shadow-card"
                  >
                    <div>
                      {/* Card Header: Client Info & Avatar */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 shrink-0 bg-primary-light/30"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors truncate">
                              {review.name}
                            </h4>
                            <p className="text-xs text-dark-muted truncate font-medium">
                              {review.role} • {review.company}
                            </p>
                          </div>
                        </div>

                        {/* Origin / Platform badge */}
                        <div className="shrink-0 flex flex-col items-end gap-1">
                          {review.isUserSubmitted ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>Web Submission</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-light border border-primary-200 text-[10px] font-bold text-primary">
                              <Award className="w-2.5 h-2.5" />
                              <span>Curated</span>
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-bold text-dark-muted/60 tracking-wider">
                            {review.platform || "verified"}
                          </span>
                        </div>
                      </div>

                      {/* Stars & Category Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < (review.rating || 5)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-dark-muted ml-1.5">
                            {(review.rating || 5).toFixed(1)}
                          </span>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full bg-softBg border border-border text-[11px] font-bold text-dark-muted truncate max-w-[170px]">
                          {review.tag}
                        </span>
                      </div>

                      {/* Quote Content */}
                      <div className="p-3.5 rounded-2xl bg-softBg border border-border mb-4">
                        <p className="text-xs text-dark-muted leading-relaxed italic line-clamp-4 font-medium">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Date & Actions */}
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[11px] text-dark-muted/60 font-mono">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Curated Showcase"}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditReviewModal(review)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-primary-light text-xs font-bold text-dark-muted hover:text-primary border border-border hover:border-primary/30 transition-all shadow-xs cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-primary" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteReviewConfirmId(review.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-xs cursor-pointer"
                          title="Delete review from testimonials"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: CLIENT INQUIRIES & LEADS MANAGEMENT                  */}
        {/* ========================================================= */}
        {currentTab === "queries" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Banner with Stats & Refresh Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider mb-3 border border-primary/20">
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Lead Pipeline &amp; Client Inquiries</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">
                  Client Inquiries, RFPs &amp; WhatsApp Leads
                </h1>
                <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl font-medium leading-relaxed">
                  Every project inquiry submitted via the website contact form, modal, or &ldquo;Chat on WhatsApp&rdquo; CTA button is captured here. Reply directly on WhatsApp, email, or telephone with one click.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => fetchQueries()}
                  disabled={isLoadingQueries}
                  className="p-3.5 rounded-2xl bg-white hover:bg-primary-light/50 border border-border text-dark-muted hover:text-primary transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                  title="Refresh inquiries from server"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingQueries ? "animate-spin text-primary" : ""}`} />
                </button>

                <a
                  href={formatWhatsAppUrl(companyInfo.whatsappNumber, companyInfo.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Test WhatsApp Concierge</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-dark-muted font-bold">Total Inquiries</p>
                  <Inbox className="w-4 h-4 text-primary" />
                </div>
                <p className="text-2xl font-black text-dark mt-2">{queryStats.total}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Recorded across all touchpoints</p>
              </div>

              <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all bg-gradient-to-br from-white to-amber-50/40">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-amber-700 font-bold">New / Uncontacted</p>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <p className="text-2xl font-black text-amber-900 mt-2">{queryStats.newCount}</p>
                <p className="text-[11px] text-amber-700/80 mt-0.5">Awaiting initial response</p>
              </div>

              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-dark-muted font-bold">In Progress / Contacted</p>
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-black text-dark mt-2">{queryStats.contactedCount + queryStats.inProgressCount}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Active client discussions</p>
              </div>

              <div className="bg-white border border-emerald-200/80 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all bg-gradient-to-br from-white to-emerald-50/40">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-emerald-800 font-bold">WhatsApp CTA Leads</p>
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-emerald-900 mt-2">{queryStats.whatsappCount}</p>
                <p className="text-[11px] text-emerald-700/80 mt-0.5">From &ldquo;Chat on WhatsApp&rdquo; CTA</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white border border-border rounded-2xl p-4 shadow-card space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-dark-muted/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                    placeholder="Search client name, email, phone, company, service or requirements..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-softBg text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:bg-white transition-all font-medium"
                  />
                  {querySearch && (
                    <button
                      onClick={() => setQuerySearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark text-xs p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Source Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-dark-muted uppercase tracking-wider shrink-0">Source:</span>
                  <select
                    value={selectedSourceFilter}
                    onChange={(e) => setSelectedSourceFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-border bg-white text-xs font-semibold text-dark focus:outline-hidden focus:border-primary cursor-pointer"
                  >
                    <option value="all">All Sources ({queries.length})</option>
                    <option value="forms">Website Forms &amp; Modal</option>
                    <option value="whatsapp">💬 WhatsApp CTA Clicks ({queryStats.whatsappCount})</option>
                  </select>
                </div>
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
                <span className="text-[11px] font-bold text-dark-muted uppercase tracking-wider mr-1">Status:</span>
                {[
                  { key: "all", label: "All Inquiries", count: queries.length },
                  { key: "new", label: "New", count: queryStats.newCount },
                  { key: "contacted", label: "Contacted", count: queryStats.contactedCount },
                  { key: "in_progress", label: "In Progress", count: queryStats.inProgressCount },
                  { key: "closed", label: "Closed", count: queryStats.closedCount },
                ].map((pill) => (
                  <button
                    key={pill.key}
                    onClick={() => setSelectedStatusFilter(pill.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedStatusFilter === pill.key
                        ? "bg-dark text-white border-dark shadow-xs"
                        : "bg-white text-dark-muted border-border hover:bg-softBg hover:text-dark"
                    }`}
                  >
                    <span>{pill.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                        selectedStatusFilter === pill.key ? "bg-white/20 text-white" : "bg-softBg text-dark-muted"
                      }`}
                    >
                      {pill.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Cards Grid */}
            {isLoadingQueries ? (
              <div className="p-16 rounded-3xl bg-white border border-border text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
                <p className="text-sm font-bold text-dark">Syncing client inquiries &amp; WhatsApp leads...</p>
              </div>
            ) : filteredQueries.length === 0 ? (
              <div className="p-16 rounded-3xl bg-white border border-border text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-primary-light text-primary mx-auto flex items-center justify-center">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-dark">No inquiries found</h3>
                <p className="text-xs sm:text-sm text-dark-muted max-w-md mx-auto">
                  {querySearch || selectedStatusFilter !== "all" || selectedSourceFilter !== "all"
                    ? "No inquiries match your current search or filter criteria. Try clearing filters."
                    : "No client inquiries have been submitted yet. Inquiries from the website contact forms and WhatsApp buttons will appear here in real time."}
                </p>
                {(querySearch || selectedStatusFilter !== "all" || selectedSourceFilter !== "all") && (
                  <button
                    onClick={() => {
                      setQuerySearch("");
                      setSelectedStatusFilter("all");
                      setSelectedSourceFilter("all");
                      setSelectedQueryServiceFilter("All");
                    }}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {filteredQueries.map((query) => {
                  const isWhatsAppLead = query.source === "whatsapp_cta";
                  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
                    new: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-300" },
                    contacted: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-300" },
                    in_progress: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-300" },
                    closed: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-300" },
                  };
                  const currentStatusStyle = statusColors[query.status] || statusColors.new;

                  return (
                    <div
                      key={query.id}
                      className={`bg-white border rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all space-y-5 ${
                        query.status === "new" ? "border-amber-300/80 ring-1 ring-amber-300/40" : "border-border"
                      }`}
                    >
                      {/* Top Bar: ID, Date, Source, and Status Dropdown */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/70">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-xl bg-softBg border border-border text-dark">
                            #{query.id}
                          </span>

                          {isWhatsAppLead ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold">
                              <MessageCircle className="w-3.5 h-3.5 fill-emerald-600/20 text-emerald-600" />
                              <span>WhatsApp CTA Lead</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-extrabold">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{query.source === "contact_page" ? "Contact Page" : "Modal Lead"}</span>
                            </span>
                          )}

                          <span className="text-[11px] text-dark-muted font-medium flex items-center gap-1 ml-1">
                            <Clock className="w-3.5 h-3.5 text-dark-muted/60" />
                            <span>{formatQueryDate(query.receivedAt)}</span>
                          </span>
                        </div>

                        {/* Status Selector Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-dark-muted tracking-wider">Status:</span>
                          <select
                            value={query.status}
                            disabled={isUpdatingStatusId === query.id}
                            onChange={(e) =>
                              handleUpdateQueryStatus(
                                query.id,
                                e.target.value as "new" | "contacted" | "in_progress" | "closed"
                              )
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary/20 ${currentStatusStyle.bg} ${currentStatusStyle.text} ${currentStatusStyle.border}`}
                          >
                            <option value="new">🟡 New Inquiry</option>
                            <option value="contacted">🔵 Contacted</option>
                            <option value="in_progress">🟣 In Progress</option>
                            <option value="closed">🟢 Closed / Won</option>
                          </select>
                        </div>
                      </div>

                      {/* Main Details: Client Information & Requested Service */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Client Identity Block */}
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center shrink-0 font-bold text-sm">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base font-extrabold text-dark tracking-tight">{query.name}</h4>
                              {query.company && (
                                <p className="text-xs text-dark-muted flex items-center gap-1 mt-0.5 font-medium">
                                  <Building className="w-3 h-3 text-dark-muted/70" />
                                  <span>{query.company}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 pt-2 text-xs">
                            {/* Email with copy */}
                            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-softBg border border-border/80">
                              <a
                                href={`mailto:${query.email}?subject=UNIQOVA%20Inquiry%20Follow-up%20%7C%20${query.id}`}
                                className="font-semibold text-primary hover:underline truncate flex items-center gap-1.5"
                                title="Send email"
                              >
                                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="truncate">{query.email}</span>
                              </a>
                              <button
                                onClick={() => copyToClipboard(query.email, "email")}
                                className="p-1 hover:bg-white rounded-lg text-dark-muted hover:text-dark transition-colors cursor-pointer"
                                title="Copy email address"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Phone with copy */}
                            {query.phone && (
                              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-softBg border border-border/80">
                                <a
                                  href={`tel:${query.phone}`}
                                  className="font-mono font-semibold text-dark hover:text-primary transition-colors truncate flex items-center gap-1.5"
                                  title="Dial phone"
                                >
                                  <Phone className="w-3.5 h-3.5 text-dark-muted shrink-0" />
                                  <span className="truncate">{query.phone}</span>
                                </a>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => copyToClipboard(query.phone || "", "phone number")}
                                    className="p-1 hover:bg-white rounded-lg text-dark-muted hover:text-dark transition-colors cursor-pointer"
                                    title="Copy phone number"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => openWhatsAppForClient(query)}
                                    className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-colors cursor-pointer"
                                    title="Chat with client on WhatsApp"
                                  >
                                    <MessageCircle className="w-3 h-3 fill-emerald-600/30" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Project Brief & Service Required Block */}
                        <div className="md:col-span-2 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                              <Sparkles className="w-3 h-3 text-purple-600" />
                              <span>{query.service}</span>
                            </span>
                          </div>

                          <div className="p-4 rounded-2xl bg-softBg/80 border border-border/80">
                            <p className="text-xs uppercase font-extrabold text-dark-muted/70 tracking-wider mb-1.5 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>Project Scope &amp; Client Brief:</span>
                            </p>
                            <p className="text-xs sm:text-sm text-dark leading-relaxed whitespace-pre-wrap font-medium">
                              {query.description}
                            </p>
                          </div>

                          {/* Admin Internal Notes */}
                          <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                                <Edit3 className="w-3 h-3" />
                                <span>Internal Operations Note:</span>
                              </span>
                              {editingNotesId !== query.id && (
                                <button
                                  onClick={() => {
                                    setEditingNotesId(query.id);
                                    setTempNotes(query.notes || "");
                                  }}
                                  className="text-[11px] text-primary hover:underline font-bold cursor-pointer"
                                >
                                  {query.notes ? "Edit Note" : "+ Add Note"}
                                </button>
                              )}
                            </div>

                            {editingNotesId === query.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  placeholder="Add internal notes on calls, pricing, or next steps..."
                                  rows={2}
                                  className="w-full p-2.5 rounded-xl border border-amber-300 bg-white text-xs text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                                />
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:bg-white text-dark-muted cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveQueryNotes(query.id, tempNotes)}
                                    className="px-3 py-1 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all cursor-pointer"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-dark-muted font-medium italic">
                                {query.notes || "No internal notes recorded yet."}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/70">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* 1-Click WhatsApp Chat Button */}
                          <button
                            type="button"
                            onClick={() => openWhatsAppForClient(query)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold text-xs shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4 fill-white/20" />
                            <span>Chat on WhatsApp</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </button>

                          {/* Email Client */}
                          <a
                            href={`mailto:${query.email}?subject=UNIQOVA%20Inquiry%20Follow-up%20%7C%20${query.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email</span>
                          </a>

                          {/* Call Client if phone available */}
                          {query.phone && (
                            <a
                              href={`tel:${query.phone}`}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-softBg hover:bg-slate-200 text-dark border border-border text-xs font-bold transition-all cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 text-primary" />
                              <span>Call</span>
                            </a>
                          )}
                        </div>

                        {/* Delete Inquiry Button */}
                        <button
                          type="button"
                          onClick={() => setDeleteQueryConfirmId(query.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs font-bold transition-all cursor-pointer"
                          title="Delete inquiry from CMS"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: TRUSTED BY BRANDS & MARQUEE MANAGEMENT            */}
        {/* ========================================================= */}
        {currentTab === "brands" && (
          <div>
            {/* Banner with Stats & Add Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider mb-3 border border-primary/20">
                  <Award className="w-3.5 h-3.5" />
                  <span>Client &amp; Enterprise Partners</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">
                  Trusted By Leading Brands &amp; Businesses
                </h1>
                <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl font-medium leading-relaxed">
                  Manage the client logos and brand partners rotating live in the homepage interactive marquee. Add new brand partners, update logos, set custom order, or toggle visibility with one click.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={fetchBrands}
                  disabled={isLoadingBrands}
                  className="p-3.5 rounded-2xl bg-white hover:bg-primary-light/50 border border-border text-dark-muted hover:text-primary transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                  title="Refresh brand list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingBrands ? "animate-spin text-primary" : ""}`} />
                </button>

                <button
                  onClick={openAddBrandModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Brand Partner</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid for Brands */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-dark-muted font-bold">Total Brands</p>
                <p className="text-2xl font-black text-dark mt-1">{brandStats.total}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Configured brand partners</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Active in Marquee</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">{brandStats.active}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Visible on homepage right now</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Hidden / Inactive</p>
                <p className="text-2xl font-black text-dark mt-1">{brandStats.hidden}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Excluded from marquee rotation</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-primary font-bold">Website Linked</p>
                <p className="text-2xl font-black text-primary mt-1">{brandStats.linked}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Clickable redirect logos</p>
              </div>
            </div>

            {/* Live Homepage Marquee Preview Strip */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-dark">
                    Live Homepage Marquee Preview
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-bold">
                    {brands.filter((b) => b.active).length} Active Logos
                  </span>
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Homepage</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Mini Marquee Container */}
              <div className="rounded-2xl border border-border/80 bg-softBg/60 p-4 sm:p-5 overflow-x-auto">
                <div className="flex items-center gap-8 min-w-max">
                  <div className="flex items-center gap-2 shrink-0 border-r border-border pr-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <div>
                      <p className="text-xs font-black text-dark tracking-tight">Trusted By</p>
                      <p className="text-[10px] text-dark-muted font-medium">Leading brands &amp; businesses</p>
                    </div>
                  </div>

                  {brands
                    .filter((b) => b.active)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((b) => (
                      <div
                        key={b.id}
                        className="group flex flex-col items-center gap-1 shrink-0 px-3 py-2 rounded-xl bg-white border border-border/80 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all"
                      >
                        {/* Logo Image */}
                        <div className="h-9 w-24 flex items-center justify-center">
                          <img
                            src={b.logoUrl}
                            alt={b.alt || b.name}
                            className="max-h-7 max-w-[85px] w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-dark-muted group-hover:text-primary transition-colors">
                          {b.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted/50" />
                <input
                  type="text"
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  placeholder="Search brand partners by name or website..."
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-10 py-2.5 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
                />
                {brandSearchQuery && (
                  <button
                    onClick={() => setBrandSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-dark-muted font-medium">
                <span>
                  Showing <strong>{filteredBrands.length}</strong> of {brands.length} partners
                </span>
                <button
                  onClick={openAddBrandModal}
                  className="sm:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-glow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Brand</span>
                </button>
              </div>
            </div>

            {/* Brands Cards Grid */}
            {isLoadingBrands ? (
              <div className="flex flex-col items-center justify-center py-20 text-dark-muted">
                <RefreshCw className="w-8 h-8 animate-spin text-primary mb-3" />
                <p className="text-sm font-semibold">Loading brand partners...</p>
              </div>
            ) : filteredBrands.length === 0 ? (
              <div className="bg-white border border-border rounded-3xl p-12 text-center text-dark-muted shadow-card">
                <div className="w-16 h-16 rounded-3xl bg-primary-light text-primary mx-auto flex items-center justify-center mb-4 shadow-xs">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-dark">No Brand Partners Found</h3>
                <p className="text-xs text-dark-muted mt-1 max-w-sm mx-auto">
                  {brandSearchQuery
                    ? `No partners match "${brandSearchQuery}". Clear your search query or add a new brand partner.`
                    : "No brand partners configured yet. Add your first brand logo to display in the marquee."}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  {brandSearchQuery && (
                    <button
                      onClick={() => setBrandSearchQuery("")}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark hover:bg-softBg transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={openAddBrandModal}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-glow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Brand Partner</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredBrands.map((brand, index) => (
                  <div
                    key={brand.id}
                    className="bg-white border border-border hover:border-primary/30 rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header: Order & Active Toggle */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-xl bg-softBg text-dark font-mono text-[11px] font-black border border-border/80">
                          #{brand.order ?? index + 1}
                        </span>

                        <button
                          onClick={() => handleToggleBrandActive(brand)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            brand.active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                          }`}
                          title={brand.active ? "Click to hide from marquee" : "Click to activate in marquee"}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              brand.active ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                            }`}
                          />
                          <span>{brand.active ? "Active" : "Hidden"}</span>
                        </button>
                      </div>

                      {/* Logo Canvas Preview */}
                      <div className="h-28 rounded-2xl bg-softBg/60 border border-border/70 flex items-center justify-center p-4 relative group-hover:bg-primary-light/20 group-hover:border-primary/20 transition-all overflow-hidden mb-4">
                        <img
                          src={brand.logoUrl}
                          alt={brand.alt || brand.name}
                          className="max-h-12 max-w-[140px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
                          onError={(e) => {
                            // fallback gracefully
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Brand Info */}
                      <div>
                        <h4 className="text-base font-extrabold text-dark tracking-tight">
                          {brand.name}
                        </h4>

                        {brand.websiteUrl ? (
                          <a
                            href={brand.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline mt-1 truncate max-w-full"
                          >
                            <Globe className="w-3 h-3 shrink-0" />
                            <span className="truncate">{brand.websiteUrl.replace(/^https?:\/\//, "")}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                          </a>
                        ) : (
                          <p className="text-xs text-dark-muted/50 mt-1">No website URL linked</p>
                        )}
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[11px] text-dark-muted/60 font-mono">
                        Order #{brand.order ?? index + 1}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditBrandModal(brand)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-primary-light text-xs font-bold text-dark-muted hover:text-primary border border-border hover:border-primary/30 transition-all shadow-xs cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-primary" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteBrandConfirmId(brand.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-xs cursor-pointer"
                          title="Delete brand partner from marquee"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SERVICES & CAPABILITIES MARQUEE                   */}
        {/* ========================================================= */}
        {currentTab === "capabilities" && (
          <div>
            {/* Banner with Stats & Add Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider mb-3 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Services &amp; Tech Marquee</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-dark tracking-tight">
                  Services &amp; Capabilities Badges
                </h1>
                <p className="text-xs sm:text-sm text-dark-muted mt-1 max-w-2xl font-medium leading-relaxed">
                  Manage the double-track capabilities and services badges rotating on the homepage. Edit badge titles, category tags, track direction (Track 1 moves left, Track 2 moves right), icons, sequence order, and visibility.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={fetchCapabilities}
                  disabled={isLoadingCapabilities}
                  className="p-3.5 rounded-2xl bg-white hover:bg-primary-light/50 border border-border text-dark-muted hover:text-primary transition-all disabled:opacity-50 shadow-xs cursor-pointer"
                  title="Refresh capabilities list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingCapabilities ? "animate-spin text-primary" : ""}`} />
                </button>

                <button
                  onClick={() => openAddCapabilityModal()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Capability Badge</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid for Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-dark-muted font-bold">Total Badges</p>
                <p className="text-2xl font-black text-dark mt-1">{capabilityStats.total}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Across both marquee tracks</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold">Active in Marquee</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">{capabilityStats.active}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Live on website right now</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-primary font-bold">Track 1 (Leftward)</p>
                <p className="text-2xl font-black text-primary mt-1">{capabilityStats.track1}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Top marquee row badges</p>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-bold">Track 2 (Rightward)</p>
                <p className="text-2xl font-black text-indigo-600 mt-1">{capabilityStats.track2}</p>
                <p className="text-[11px] text-dark-muted/60 mt-0.5">Bottom marquee row badges</p>
              </div>
            </div>

            {/* Live Double-Track Marquee Preview Box */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-card mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xs uppercase tracking-wider font-extrabold text-dark">
                    Live Double-Track Marquee Preview
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-bold">
                    {capabilities.filter((c) => c.active).length} Active Badges
                  </span>
                </div>
                <Link
                  href="/#services"
                  target="_blank"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Homepage Services</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Double Track Container */}
              <div className="rounded-2xl border border-border/80 bg-softBg/60 p-4 sm:p-5 space-y-3 overflow-x-auto">
                {/* Track 1 Strip */}
                <div className="flex items-center gap-3 min-w-max">
                  <span className="px-2.5 py-1 rounded-lg bg-primary text-white text-[10px] font-bold shrink-0 uppercase tracking-wider">
                    Track 1 (Left)
                  </span>
                  {capabilities
                    .filter((c) => c.active && c.track === 1)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="px-3.5 py-2 rounded-xl bg-white border border-border/80 flex items-center gap-2 shadow-xs shrink-0"
                      >
                        <div className="text-primary">
                          <CapabilityIcon iconKey={item.iconKey} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-extrabold text-dark whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-dark-muted tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Track 2 Strip */}
                <div className="flex items-center gap-3 min-w-max">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-bold shrink-0 uppercase tracking-wider">
                    Track 2 (Right)
                  </span>
                  {capabilities
                    .filter((c) => c.active && c.track === 2)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="px-3.5 py-2 rounded-xl bg-white border border-border/80 flex items-center gap-2 shadow-xs shrink-0"
                      >
                        <div className="text-indigo-600">
                          <CapabilityIcon iconKey={item.iconKey} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-extrabold text-dark whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-dark-muted tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted/50" />
                  <input
                    type="text"
                    value={capabilitySearchQuery}
                    onChange={(e) => setCapabilitySearchQuery(e.target.value)}
                    placeholder="Search capabilities by name, category, or tech..."
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-10 py-2.5 text-xs text-dark placeholder:text-dark-muted/40 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
                  />
                  {capabilitySearchQuery && (
                    <button
                      onClick={() => setCapabilitySearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Track Selector Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-softBg rounded-xl border border-border self-start sm:self-auto">
                  <button
                    onClick={() => setSelectedTrackFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTrackFilter === "all"
                        ? "bg-white text-primary shadow-xs"
                        : "text-dark-muted hover:text-dark"
                    }`}
                  >
                    All Tracks ({capabilities.length})
                  </button>
                  <button
                    onClick={() => setSelectedTrackFilter(1)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTrackFilter === 1
                        ? "bg-white text-primary shadow-xs"
                        : "text-dark-muted hover:text-dark"
                    }`}
                  >
                    Track 1 ({capabilities.filter((c) => c.track === 1).length})
                  </button>
                  <button
                    onClick={() => setSelectedTrackFilter(2)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTrackFilter === 2
                        ? "bg-white text-primary shadow-xs"
                        : "text-dark-muted hover:text-dark"
                    }`}
                  >
                    Track 2 ({capabilities.filter((c) => c.track === 2).length})
                  </button>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {CAPABILITY_CATEGORIES.map((cat) => {
                  const isSelected = selectedCapabilityCategory === cat;
                  const count =
                    cat === "All"
                      ? capabilities.length
                      : capabilities.filter(
                          (c) => c.category.toLowerCase() === cat.toLowerCase()
                        ).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCapabilityCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-glow-sm"
                          : "bg-white border-border text-dark-muted hover:text-dark hover:border-primary/30"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                          isSelected ? "bg-white/25 text-white" : "bg-softBg text-dark-muted"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges Grid */}
            {isLoadingCapabilities ? (
              <div className="flex flex-col items-center justify-center py-20 text-dark-muted">
                <RefreshCw className="w-8 h-8 animate-spin text-primary mb-3" />
                <p className="text-sm font-semibold">Loading capability badges...</p>
              </div>
            ) : filteredCapabilities.length === 0 ? (
              <div className="bg-white border border-border rounded-3xl p-12 text-center text-dark-muted shadow-card">
                <div className="w-16 h-16 rounded-3xl bg-primary-light text-primary mx-auto flex items-center justify-center mb-4 shadow-xs">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-dark">No Capabilities Found</h3>
                <p className="text-xs text-dark-muted mt-1 max-w-sm mx-auto">
                  {capabilitySearchQuery
                    ? `No badges match "${capabilitySearchQuery}". Clear your search or add a new badge.`
                    : "No capability badges configured yet. Add your first service badge to display in the marquee."}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  {capabilitySearchQuery && (
                    <button
                      onClick={() => setCapabilitySearchQuery("")}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark hover:bg-softBg transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => openAddCapabilityModal()}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-glow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Capability</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCapabilities.map((cap) => (
                  <div
                    key={cap.id}
                    className="bg-white border border-border hover:border-primary/30 rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row: Track & Active Toggle */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-black font-mono border ${
                            cap.track === 1
                              ? "bg-primary-light text-primary border-primary/20"
                              : "bg-indigo-50 text-indigo-700 border-indigo-200"
                          }`}
                        >
                          Track {cap.track} • #{cap.order}
                        </span>

                        <button
                          onClick={() => handleToggleCapabilityActive(cap)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            cap.active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                          }`}
                          title={cap.active ? "Click to hide from marquee" : "Click to activate in marquee"}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              cap.active ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                            }`}
                          />
                          <span>{cap.active ? "Active" : "Hidden"}</span>
                        </button>
                      </div>

                      {/* Icon Canvas & Badge Info */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary-light/70 text-primary flex items-center justify-center shrink-0 border border-primary/20 shadow-xs group-hover:scale-110 transition-transform">
                          <CapabilityIcon iconKey={cap.iconKey} className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-extrabold text-dark tracking-tight leading-snug">
                            {cap.name}
                          </h4>
                          <span className="inline-block mt-1 text-[10px] uppercase font-extrabold tracking-wider text-primary bg-primary-light/60 px-2 py-0.5 rounded-md">
                            {cap.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-mono text-dark-muted/60">
                        Icon: {cap.iconKey}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditCapabilityModal(cap)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-primary-light text-xs font-bold text-dark-muted hover:text-primary border border-border hover:border-primary/30 transition-all shadow-xs cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-primary" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteCapabilityConfirmId(cap.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-xs cursor-pointer"
                          title="Delete capability badge from marquee"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CONTACT CHANNELS & BRAND TAGLINE SETTINGS          */}
        {/* ========================================================= */}
        {currentTab === "company" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Header & Overview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-softBg to-primary-light/30 border border-border shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Company Profile &amp; Touchpoints</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                  Contact Channels &amp; Brand Settings
                </h2>
                <p className="text-sm text-dark-muted max-w-2xl leading-relaxed">
                  Directly manage your inquiries email, two phone lines, instant WhatsApp concierge number,
                  headquarters address, and the official <span className="font-semibold text-primary">&ldquo;Your Vision. Our Expertise.&rdquo;</span> tagline.
                  Changes save directly and update live across the entire website.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Reset all contact and brand fields to default UNIQOVA values?")) {
                      setCompanyInfo(DEFAULT_COMPANY_INFO);
                      showToast("success", "Reset form to default company settings. Click Save to persist.");
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 border border-border hover:border-rose-300 text-dark-muted hover:text-rose-600 text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Preview Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-dark-muted flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Live Website Previews (Instant Synchronized Rendering)</span>
                </h3>
                <span className="text-[11px] text-dark-muted/70 font-mono">
                  Footer &bull; WhatsApp Concierge &bull; Brand Header
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview 1: Footer Contact Block (Dark Theme Mirror) */}
                <div className="rounded-3xl bg-[#0F0D1B] text-white p-6 border border-purple-900/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300/80">
                        Footer Preview
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        Live Preview
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                      CONTACT US
                    </h4>

                    <div className="space-y-3.5 text-xs text-purple-200/90">
                      {/* Email */}
                      <div className="flex items-start gap-2.5">
                        <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">
                            {companyInfo.email || "hello@uniquova.com"}
                          </p>
                          <p className="text-[10px] text-purple-300/60">
                            {companyInfo.emailLabel || "Inquiries & RFPs"}
                          </p>
                        </div>
                      </div>

                      {/* Phone 1 */}
                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">
                            {companyInfo.primaryPhone || "+91 (0) 98765-43210"}
                          </p>
                          <p className="text-[10px] text-purple-300/60">
                            {companyInfo.primaryPhoneLabel || "Mon – Fri, 9am – 6pm IST"}
                          </p>
                        </div>
                      </div>

                      {/* Phone 2 (Optional) */}
                      {companyInfo.secondaryPhone && (
                        <div className="flex items-start gap-2.5">
                          <PhoneCall className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate">
                              {companyInfo.secondaryPhone}
                            </p>
                            <p className="text-[10px] text-purple-300/60">
                              {companyInfo.secondaryPhoneLabel || "Secondary Contact"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Office Address */}
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-semibold text-white">
                            {companyInfo.officeName || "UNIQUOVA Digital HQ"}
                          </p>
                          <p className="text-[10px] text-purple-300/60 leading-relaxed">
                            {companyInfo.address || "Tech Park Corridor, Sector 4, Bangalore & New Delhi, India"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Icons Live Preview */}
                    <div className="pt-3.5 mt-3.5 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-purple-300/70 font-semibold uppercase tracking-wider">
                        Social Channels:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {companyInfo.socialLinks?.linkedin?.enabled !== false && Boolean(companyInfo.socialLinks?.linkedin?.url?.trim()) && (
                          <span
                            className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold border border-white/10"
                            title="LinkedIn (Visible)"
                          >
                            in
                          </span>
                        )}
                        {companyInfo.socialLinks?.twitter?.enabled !== false && Boolean(companyInfo.socialLinks?.twitter?.url?.trim()) && (
                          <span
                            className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold border border-white/10"
                            title="Twitter / X (Visible)"
                          >
                            𝕏
                          </span>
                        )}
                        {companyInfo.socialLinks?.instagram?.enabled !== false && Boolean(companyInfo.socialLinks?.instagram?.url?.trim()) && (
                          <span
                            className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold border border-white/10"
                            title="Instagram (Visible)"
                          >
                            ig
                          </span>
                        )}
                        {companyInfo.socialLinks?.facebook?.enabled !== false && Boolean(companyInfo.socialLinks?.facebook?.url?.trim()) && (
                          <span
                            className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-bold border border-white/10"
                            title="Facebook (Visible)"
                          >
                            fb
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 text-[10px] text-purple-300/60 truncate">
                    &copy; {new Date().getFullYear()} UNIQUOVA Digital Agency. {companyInfo.tagline}
                  </div>
                </div>

                {/* Preview 2: Floating WhatsApp Concierge Widget */}
                <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0a2318] to-emerald-900 text-white p-6 border border-emerald-700/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                        WhatsApp Concierge
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Online</span>
                      </span>
                    </div>

                    {/* Popout bubble mockup */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-200 text-dark shadow-lg mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          <MessageCircle className="w-4 h-4 fill-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-dark leading-tight">
                            Chat on WhatsApp
                          </p>
                          <p className="text-[10px] text-dark-muted">
                            Replies in under 5 minutes
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Active
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-emerald-300/70 font-bold">
                          Assigned WhatsApp Number
                        </span>
                        <p className="font-mono font-bold text-sm text-emerald-100">
                          {companyInfo.whatsappNumber || "+91 98765 43210"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-emerald-300/70 font-bold">
                          Default Greeting Message
                        </span>
                        <p className="text-[11px] text-emerald-200/80 italic line-clamp-2">
                          &ldquo;{companyInfo.whatsappMessage || "Hi UNIQOVA Team! I'm interested in discussing a new digital project."}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-emerald-500/20 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-300/70">
                      Destination: wa.me
                    </span>
                    <a
                      href={formatWhatsAppUrl(companyInfo.whatsappNumber, companyInfo.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <span>Test WhatsApp Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Preview 3: Official Brand Identity & Tagline */}
                <div className="rounded-3xl bg-white border border-border p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
                        Brand Identity Preview
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-light text-primary font-bold">
                        Tagline Sync
                      </span>
                    </div>

                    {/* Logo with tagline mockup */}
                    <div className="p-4 rounded-2xl bg-softBg/80 border border-border/80 flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary font-black text-xl shrink-0">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-baseline">
                          <span className="font-black text-lg text-dark tracking-tight">UNIQUOVA</span>
                          <span className="text-primary font-black text-lg leading-none ml-0.5">.</span>
                        </div>
                        <p className="text-xs font-semibold text-primary tracking-tight">
                          {companyInfo.tagline || "Your Vision. Our Expertise."}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-dark-muted">
                      <p className="font-medium text-dark">Where this tagline displays:</p>
                      <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                        <li>Main Header Logo Subtitle</li>
                        <li>Footer &amp; CMS Login Gateways</li>
                        <li>Page Metadata &amp; Search Engine Snippets</li>
                        <li>Official Copyright &amp; Legal Notices</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] text-dark-muted font-mono">
                    <span>Status: Dynamic Sync</span>
                    <span className="text-emerald-600 font-bold">&bull; Verified Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editing Form Cards */}
            <form onSubmit={handleSaveCompanyInfo} className="space-y-6">
              {/* CARD 1: Email Address */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-border shadow-xs">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-dark">
                      1. Official Inquiries Email Address
                    </h3>
                    <p className="text-xs text-dark-muted">
                      RFP submissions, partnership queries, and client communication address.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-dark-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={companyInfo.email}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, email: e.target.value })
                        }
                        placeholder="hello@uniquova.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <span className="text-[11px] text-dark-muted mt-1 block">
                      Used for mailto: links in Header, Contact, and Footer.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Email Label / Subtitle
                    </label>
                    <input
                      type="text"
                      value={companyInfo.emailLabel}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, emailLabel: e.target.value })
                      }
                      placeholder="Inquiries & RFPs"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <span className="text-[11px] text-dark-muted mt-1 block">
                      Appears beneath the email in the footer.
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 2: Two Contact Phone Numbers */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-border shadow-xs">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-dark">
                      2. Direct Contact Phone Numbers (Two Dedicated Lines)
                    </h3>
                    <p className="text-xs text-dark-muted">
                      Provide both primary sales line and secondary support/management line.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Number 1 (Primary) */}
                  <div className="p-5 rounded-2xl bg-softBg/60 border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Contact Line 1 (Primary)</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Required
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        value={companyInfo.primaryPhone}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, primaryPhone: e.target.value })
                        }
                        placeholder="+91 (0) 98765-43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark mb-1.5">
                        Availability Hours / Subtitle
                      </label>
                      <input
                        type="text"
                        value={companyInfo.primaryPhoneLabel}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, primaryPhoneLabel: e.target.value })
                        }
                        placeholder="Mon – Fri, 9am – 6pm IST"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Contact Number 2 (Secondary) */}
                  <div className="p-5 rounded-2xl bg-softBg/60 border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Contact Line 2 (Secondary / Support)</span>
                      </span>
                      <span className="text-[10px] font-bold text-dark-muted bg-white px-2 py-0.5 rounded-md border border-border">
                        Optional
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark mb-1.5">
                        Second Phone Number
                      </label>
                      <input
                        type="text"
                        value={companyInfo.secondaryPhone}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, secondaryPhone: e.target.value })
                        }
                        placeholder="+91 (0) 98765-43211"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark mb-1.5">
                        Second Line Subtitle / Label
                      </label>
                      <input
                        type="text"
                        value={companyInfo.secondaryPhoneLabel}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, secondaryPhoneLabel: e.target.value })
                        }
                        placeholder="Support & Direct Line"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: Instant WhatsApp Concierge Number */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-border shadow-xs">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-emerald-600 text-transparent" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-dark">
                      3. WhatsApp Concierge &amp; Floating Chat Settings
                    </h3>
                    <p className="text-xs text-dark-muted">
                      Direct click-to-chat integration for floating pop-up widget and contact channels.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      WhatsApp Number (With Country Code) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={companyInfo.whatsappNumber}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, whatsappNumber: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-mono"
                      />
                    </div>
                    <span className="text-[11px] text-dark-muted mt-1 block">
                      Auto-sanitized to international format (e.g. <code>919876543210</code> for <code>wa.me/919876543210</code>).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Pre-filled Chat Message
                    </label>
                    <input
                      type="text"
                      value={companyInfo.whatsappMessage}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, whatsappMessage: e.target.value })
                      }
                      placeholder="Hi UNIQOVA Team! I'm interested in discussing a project."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                    <span className="text-[11px] text-dark-muted mt-1 block">
                      The pre-filled text in WhatsApp when clients click to chat.
                    </span>
                  </div>
                </div>

                {/* Generated WhatsApp link showcase */}
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-950 font-mono truncate">
                    <span className="font-bold text-emerald-700 shrink-0">Live URL:</span>
                    <span className="truncate">{formatWhatsAppUrl(companyInfo.whatsappNumber, companyInfo.whatsappMessage)}</span>
                  </div>
                  <a
                    href={formatWhatsAppUrl(companyInfo.whatsappNumber, companyInfo.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Test Chat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Homepage CTA Live Mirror Preview */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-dark flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>Homepage CTA &ldquo;Chat on WhatsApp&rdquo; Mirror</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Auto-Tracks Inquiries in CMS
                    </span>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-[#120e24] via-[#1a1438] to-[#0d091e] p-6 sm:p-8 text-white border border-purple-500/20 shadow-xl relative overflow-hidden">
                    <div className="text-center space-y-3 relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-purple-200 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-purple-300" />
                        <span>Let&apos;s Build Something Iconic</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Have an Idea? <br className="hidden sm:inline" />Let&apos;s Make It Happen.
                      </h4>
                      <p className="text-xs text-purple-200/80 max-w-lg mx-auto">
                        From e-commerce marketplaces to custom web and mobile apps, our team is ready to scale your vision.
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs opacity-90 shadow-glow-sm">
                          Start Your Project &rarr;
                        </div>
                        <a
                          href={formatWhatsAppUrl(companyInfo.whatsappNumber, companyInfo.whatsappMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-dark-muted mt-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      When visitors click &ldquo;Chat on WhatsApp&rdquo; on the homepage CTA banner, a lead inquiry is automatically stored in your <strong className="text-dark">Client Queries</strong> tab with source <code>whatsapp_cta</code>.
                    </span>
                  </p>
                </div>
              </div>

              {/* CARD 4: Physical Office & Headquarters Address */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-border shadow-xs">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-dark">
                      4. Physical Office Headquarters &amp; Address
                    </h3>
                    <p className="text-xs text-dark-muted">
                      Appears in the footer contact block and contact discovery page.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Office / Campus Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyInfo.officeName}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, officeName: e.target.value })
                      }
                      placeholder="UNIQUOVA Digital HQ"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold"
                    />
                    <span className="text-[11px] text-dark-muted mt-1 block">
                      e.g. UNIQUOVA Digital HQ or Studio Hub.
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Complete Street &amp; City Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={companyInfo.address}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, address: e.target.value })
                      }
                      placeholder="Tech Park Corridor, Sector 4, Bangalore & New Delhi, India"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-dark text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none leading-relaxed"
                    />
                    <span className="text-[11px] text-dark-muted mt-1 block">
                      Full street, corridor, sector, and location address.
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 5: Official Brand Tagline */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-border shadow-xs">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-dark">
                      5. Official Brand Tagline
                    </h3>
                    <p className="text-xs text-dark-muted">
                      Your company&apos;s primary slogan (&ldquo;Your Vision. Our Expertise.&rdquo;).
                    </p>
                  </div>
                </div>

                <div className="max-w-2xl">
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                    Official Tagline <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyInfo.tagline}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, tagline: e.target.value })
                    }
                    placeholder="Your Vision. Our Expertise."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark text-base font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <div className="mt-2 flex items-center gap-2 text-xs text-dark-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Renders directly under the UNIQOVA monogram logo and in footer legal bar.</span>
                  </div>
                </div>
              </div>

              {/* CARD 6: Social Media Channels & Visibility */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-border shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-primary flex items-center justify-center shrink-0">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-dark">
                        6. Official Social Media Channels &amp; Visibility Controls
                      </h3>
                      <p className="text-xs text-dark-muted">
                        Directly edit your social URLs and toggle any icon on/off to show or hide it from the website footer.
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-primary bg-primary-light/60 px-3 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
                    4 Social Channels Available
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Platform 1: LinkedIn */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    companyInfo.socialLinks?.linkedin?.enabled !== false
                      ? "bg-white border-border shadow-xs"
                      : "bg-slate-50/70 border-slate-200 opacity-75"
                  }`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0 font-bold text-xs">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.63 1.6 1.63.88 0 1.6-.75 1.6-1.63 0-.88-.72-1.6-1.6-1.6" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-dark">LinkedIn</h4>
                          <span className="text-[10px] text-dark-muted">Professional Network</span>
                        </div>
                      </div>

                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleSocialVisibility("linkedin")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          companyInfo.socialLinks?.linkedin?.enabled !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                        }`}
                        title="Click to toggle visibility on website (instant save)"
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          companyInfo.socialLinks?.linkedin?.enabled !== false
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-slate-400"
                        }`} />
                        <span>{companyInfo.socialLinks?.linkedin?.enabled !== false ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-dark-muted uppercase tracking-wider mb-1.5">
                        Profile URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={companyInfo.socialLinks?.linkedin?.url ?? "https://linkedin.com"}
                          onChange={(e) => {
                            const current = companyInfo.socialLinks || DEFAULT_COMPANY_INFO.socialLinks!;
                            setCompanyInfo({
                              ...companyInfo,
                              socialLinks: {
                                ...current,
                                linkedin: {
                                  ...current.linkedin,
                                  url: e.target.value,
                                },
                              },
                            });
                          }}
                          placeholder="https://linkedin.com/company/uniquova"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-white text-dark text-xs focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                        />
                        {companyInfo.socialLinks?.linkedin?.url && (
                          <a
                            href={companyInfo.socialLinks.linkedin.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-softBg hover:bg-primary-light text-dark-muted hover:text-primary border border-border transition-all cursor-pointer"
                            title="Test Link in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Platform 2: Twitter / X */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    companyInfo.socialLinks?.twitter?.enabled !== false
                      ? "bg-white border-border shadow-xs"
                      : "bg-slate-50/70 border-slate-200 opacity-75"
                  }`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-black/10 text-dark flex items-center justify-center shrink-0 font-bold text-xs">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-dark">Twitter / X</h4>
                          <span className="text-[10px] text-dark-muted">Microblogging</span>
                        </div>
                      </div>

                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleSocialVisibility("twitter")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          companyInfo.socialLinks?.twitter?.enabled !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                        }`}
                        title="Click to toggle visibility on website (instant save)"
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          companyInfo.socialLinks?.twitter?.enabled !== false
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-slate-400"
                        }`} />
                        <span>{companyInfo.socialLinks?.twitter?.enabled !== false ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-dark-muted uppercase tracking-wider mb-1.5">
                        Profile URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={companyInfo.socialLinks?.twitter?.url ?? "https://twitter.com"}
                          onChange={(e) => {
                            const current = companyInfo.socialLinks || DEFAULT_COMPANY_INFO.socialLinks!;
                            setCompanyInfo({
                              ...companyInfo,
                              socialLinks: {
                                ...current,
                                twitter: {
                                  ...current.twitter,
                                  url: e.target.value,
                                },
                              },
                            });
                          }}
                          placeholder="https://x.com/uniquova"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-white text-dark text-xs focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                        />
                        {companyInfo.socialLinks?.twitter?.url && (
                          <a
                            href={companyInfo.socialLinks.twitter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-softBg hover:bg-primary-light text-dark-muted hover:text-primary border border-border transition-all cursor-pointer"
                            title="Test Link in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Platform 3: Instagram */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    companyInfo.socialLinks?.instagram?.enabled !== false
                      ? "bg-white border-border shadow-xs"
                      : "bg-slate-50/70 border-slate-200 opacity-75"
                  }`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center shrink-0 font-bold text-xs">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-dark">Instagram</h4>
                          <span className="text-[10px] text-dark-muted">Visual Content</span>
                        </div>
                      </div>

                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleSocialVisibility("instagram")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          companyInfo.socialLinks?.instagram?.enabled !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                        }`}
                        title="Click to toggle visibility on website (instant save)"
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          companyInfo.socialLinks?.instagram?.enabled !== false
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-slate-400"
                        }`} />
                        <span>{companyInfo.socialLinks?.instagram?.enabled !== false ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-dark-muted uppercase tracking-wider mb-1.5">
                        Profile URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={companyInfo.socialLinks?.instagram?.url ?? "https://instagram.com"}
                          onChange={(e) => {
                            const current = companyInfo.socialLinks || DEFAULT_COMPANY_INFO.socialLinks!;
                            setCompanyInfo({
                              ...companyInfo,
                              socialLinks: {
                                ...current,
                                instagram: {
                                  ...current.instagram,
                                  url: e.target.value,
                                },
                              },
                            });
                          }}
                          placeholder="https://instagram.com/uniquova"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-white text-dark text-xs focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                        />
                        {companyInfo.socialLinks?.instagram?.url && (
                          <a
                            href={companyInfo.socialLinks.instagram.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-softBg hover:bg-primary-light text-dark-muted hover:text-primary border border-border transition-all cursor-pointer"
                            title="Test Link in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Platform 4: Facebook */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    companyInfo.socialLinks?.facebook?.enabled !== false
                      ? "bg-white border-border shadow-xs"
                      : "bg-slate-50/70 border-slate-200 opacity-75"
                  }`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0 font-bold text-xs">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-dark">Facebook</h4>
                          <span className="text-[10px] text-dark-muted">Community Page</span>
                        </div>
                      </div>

                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleSocialVisibility("facebook")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          companyInfo.socialLinks?.facebook?.enabled !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                        }`}
                        title="Click to toggle visibility on website (instant save)"
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          companyInfo.socialLinks?.facebook?.enabled !== false
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-slate-400"
                        }`} />
                        <span>{companyInfo.socialLinks?.facebook?.enabled !== false ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-dark-muted uppercase tracking-wider mb-1.5">
                        Profile / Page URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={companyInfo.socialLinks?.facebook?.url ?? "https://facebook.com"}
                          onChange={(e) => {
                            const current = companyInfo.socialLinks || DEFAULT_COMPANY_INFO.socialLinks!;
                            setCompanyInfo({
                              ...companyInfo,
                              socialLinks: {
                                ...current,
                                facebook: {
                                  ...current.facebook,
                                  url: e.target.value,
                                },
                              },
                            });
                          }}
                          placeholder="https://facebook.com/uniquova"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-white text-dark text-xs focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                        />
                        {companyInfo.socialLinks?.facebook?.url && (
                          <a
                            href={companyInfo.socialLinks.facebook.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-softBg hover:bg-primary-light text-dark-muted hover:text-primary border border-border transition-all cursor-pointer"
                            title="Test Link in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-2xl bg-softBg/60 border border-border/80 flex items-center gap-2.5 text-xs text-dark-muted">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>
                    When a social network is toggled to <strong className="text-slate-700">Hidden</strong>, its circular icon is automatically removed from the live website footer.
                  </span>
                </div>
              </div>

              {/* Form Action Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border">
                <p className="text-xs text-dark-muted font-medium">
                  Saving updates your email, phone numbers, WhatsApp link, and tagline immediately across all pages.
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Discard changes and reload saved settings?")) {
                        fetchCompanyInfo();
                        showToast("success", "Reloaded saved settings.");
                      }
                    }}
                    disabled={isLoadingCompanyInfo}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white hover:bg-softBg border border-border text-dark-muted hover:text-dark text-xs font-bold transition-all cursor-pointer"
                  >
                    Discard Changes
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingCompanyInfo}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className={`w-4 h-4 ${isSavingCompanyInfo ? "animate-spin" : ""}`} />
                    <span>{isSavingCompanyInfo ? "Saving..." : "Save Settings"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: ADD / EDIT PROJECT MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-dark">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-6 right-6 text-dark-muted hover:text-dark p-1.5 rounded-full hover:bg-softBg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {editingProjectId ? "Modify Deliverable" : "New Showcase Project"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-dark mt-1">
                {editingProjectId ? "Edit Project Details" : "Add Project to Portfolio"}
              </h2>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Aura Commerce — Next.js 14 Storefront"
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Service Category *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Client / Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Aura Luxe Living UK"
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Impact Statement */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Key Impact Highlight
                  </label>
                  <input
                    type="text"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    placeholder="e.g. +140% Conversion Uplift"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Project Description &amp; Scope *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of the deliverable, technical stack, architecture, and client outcomes..."
                  required
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Links: Live Vercel & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Live Vercel Link (e.g. https://brand.vercel.app)
                  </label>
                  <input
                    type="url"
                    value={formData.vercelUrl}
                    onChange={(e) => setFormData({ ...formData, vercelUrl: e.target.value })}
                    placeholder="https://client-project.vercel.app"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    GitHub Repository (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/org/repo"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Next.js 14, Tailwind CSS, TypeScript, Vercel, Supabase"
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Media Configuration */}
              <div className="p-4 rounded-2xl bg-softBg border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary">
                    Visual Showcase Media
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "image" })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        formData.mediaType === "image"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-dark-muted hover:text-dark border border-border"
                      }`}
                    >
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "video" })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        formData.mediaType === "video"
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white text-dark-muted hover:text-dark border border-border"
                      }`}
                    >
                      Video
                    </button>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.mediaUrl}
                    onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                    placeholder="Enter image/video URL or select preset below..."
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Preset Options */}
                <div>
                  <p className="text-[11px] text-dark-muted font-medium mb-1.5">Or choose a media preset:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MEDIA_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, mediaUrl: preset.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          formData.mediaUrl === preset.url
                            ? "border-primary bg-primary text-white font-bold shadow-xs"
                            : "border-border bg-white text-dark-muted hover:text-primary hover:border-primary/40"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload Option */}
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <label className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark cursor-pointer font-bold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload custom screenshot (under 2MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.mediaUrl && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Media attached</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-dark font-medium cursor-pointer">
                  Feature this project prominently on the Portfolio page
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  {editingProjectId ? "Update Project" : "Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 2: DELETE PROJECT CONFIRMATION MODAL                   */}
      {/* ------------------------------------------------------------- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
          <div className="bg-white border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center text-dark animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-1">Delete Project?</h3>
            <p className="text-xs text-dark-muted mb-6 font-medium">
              This action cannot be undone. The project will be permanently removed from your portfolio.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 3: ADD / EDIT CLIENT REVIEW MODAL                       */}
      {/* ------------------------------------------------------------- */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-dark">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 text-dark-muted hover:text-dark p-1.5 rounded-full hover:bg-softBg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                {editingReviewId ? "Moderate Testimonial" : "New Client Review"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-dark mt-1">
                {editingReviewId ? "Edit Client Testimonial" : "Add Review to Website"}
              </h2>
              <p className="text-xs text-dark-muted mt-1 font-medium">
                This review will be displayed in the official testimonials wall on the homepage.
              </p>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.name}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.company}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, company: e.target.value })}
                    placeholder="e.g. Aurum Retail Labs"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Role */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.role}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, role: e.target.value })}
                    placeholder="e.g. Founder &amp; CEO"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Service Rendered *
                  </label>
                  <select
                    value={reviewFormData.service}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, service: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {REVIEW_SERVICE_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Star Rating (1 to 5) *
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-softBg border border-border">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewFormData.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-600">
                    {reviewFormData.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Quote / Testimonial Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                  Testimonial Quote / Feedback * (min 10 characters)
                </label>
                <textarea
                  rows={4}
                  value={reviewFormData.quote}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, quote: e.target.value })}
                  placeholder="Share the client's detailed feedback, measurable improvements, and experience working with UNIQOVA..."
                  required
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 leading-relaxed transition-all"
                />
              </div>

              {/* Avatar Selection & Upload */}
              <div className="p-4 rounded-2xl bg-softBg border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Client Photo / Avatar
                  </label>
                  {reviewFormData.avatar && (
                    <img
                      src={reviewFormData.avatar}
                      alt="Avatar Preview"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/40 shadow-xs"
                    />
                  )}
                </div>

                <input
                  type="text"
                  value={reviewFormData.avatar}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, avatar: e.target.value })}
                  placeholder="Paste avatar URL or upload photo below..."
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2 text-xs text-dark placeholder:text-dark-muted/50 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />

                {/* Preset Avatars */}
                <div>
                  <p className="text-[11px] text-dark-muted font-medium mb-1.5">Or choose an avatar preset:</p>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setReviewFormData({ ...reviewFormData, avatar: p.url })}
                        className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          reviewFormData.avatar === p.url
                            ? "border-amber-400 bg-amber-50 text-amber-800 font-bold shadow-xs"
                            : "border-border bg-white text-dark-muted hover:text-dark hover:border-border"
                        }`}
                      >
                        <img src={p.url} alt={p.label} className="w-4 h-4 rounded-full object-cover" />
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Photo Upload */}
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <label className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark cursor-pointer font-bold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload client headshot (auto-compressed)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReviewAvatarUpload}
                      className="hidden"
                    />
                  </label>
                  {reviewFormData.avatar && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Headshot attached</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Platform & Verification Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Platform Endorsement Badge
                  </label>
                  <select
                    value={reviewFormData.platform}
                    onChange={(e) =>
                      setReviewFormData({
                        ...reviewFormData,
                        platform: e.target.value as "verified" | "linkedin" | "twitter",
                      })
                    }
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="verified">Verified Client</option>
                    <option value="linkedin">LinkedIn Verified</option>
                    <option value="twitter">X (Twitter) Endorsement</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="user-submitted-checkbox"
                    checked={reviewFormData.isUserSubmitted}
                    onChange={(e) =>
                      setReviewFormData({ ...reviewFormData, isUserSubmitted: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <label htmlFor="user-submitted-checkbox" className="text-xs text-dark font-medium cursor-pointer">
                    Display &ldquo;Verified Web Submission&rdquo; badge
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  {editingReviewId ? "Update Review" : "Publish to Testimonials"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 4: DELETE REVIEW CONFIRMATION MODAL                     */}
      {/* ------------------------------------------------------------- */}
      {deleteReviewConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
          <div className="bg-white border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center text-dark animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-1">Delete Review?</h3>
            <p className="text-xs text-dark-muted mb-6 leading-relaxed font-medium">
              Are you sure? This review will be permanently deleted and immediately removed from the live website testimonials carousel.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteReviewConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteReview(deleteReviewConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Yes, Delete Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: DELETE CLIENT INQUIRY CONFIRMATION MODAL               */}
      {/* ------------------------------------------------------------- */}
      {deleteQueryConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
          <div className="bg-white border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center text-dark animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-1">Delete Inquiry #{deleteQueryConfirmId}?</h3>
            <p className="text-xs text-dark-muted mb-6 leading-relaxed font-medium">
              Are you sure? This lead and its associated client brief and internal notes will be permanently removed from the CMS database.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteQueryConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteQuery(deleteQueryConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Yes, Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 5: ADD / EDIT BRAND PARTNER MODAL                       */}
      {/* ------------------------------------------------------------- */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-dark">
            <button
              onClick={() => setIsBrandModalOpen(false)}
              className="absolute top-6 right-6 text-dark-muted hover:text-dark p-1.5 rounded-full hover:bg-softBg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {editingBrandId ? "Edit Brand Partner" : "New Brand Partner"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-dark mt-1">
                {editingBrandId ? "Update Brand Details" : "Add Brand to Homepage Marquee"}
              </h2>
              <p className="text-xs text-dark-muted mt-1 font-medium">
                Configure the partner logo, sequence order, and website redirect link.
              </p>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Brand Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Brand / Company Name *
                  </label>
                  <input
                    type="text"
                    value={brandFormData.name}
                    onChange={(e) => setBrandFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Amazon, PraanSewa, Flipkart..."
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Display Sequence Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={brandFormData.order}
                    onChange={(e) =>
                      setBrandFormData((prev) => ({ ...prev, order: parseInt(e.target.value, 10) || 1 }))
                    }
                    placeholder="1, 2, 3..."
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                  <p className="text-[10px] text-dark-muted/60 mt-1">
                    Controls rotation position in the marquee strip (1 = first)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Website URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={brandFormData.websiteUrl}
                    onChange={(e) =>
                      setBrandFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))
                    }
                    placeholder="https://client-website.com"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Logo Alt Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={brandFormData.alt}
                    onChange={(e) => setBrandFormData((prev) => ({ ...prev, alt: e.target.value }))}
                    placeholder="e.g. PraanSewa Healthcare Logo"
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                </div>
              </div>

              {/* Active Toggle Card */}
              <div className="p-4 rounded-2xl bg-softBg/60 border border-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark">Active in Homepage Marquee</p>
                  <p className="text-[11px] text-dark-muted">
                    When enabled, this brand rotates live in the marquee on the front page.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brandFormData.active}
                    onChange={(e) =>
                      setBrandFormData((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Logo Selection & Preview */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2">
                  Brand Logo Image *
                </label>

                {/* Preview Box */}
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-border bg-softBg/40 mb-3">
                  <div className="w-32 h-20 rounded-xl bg-white border border-border flex items-center justify-center p-2 shrink-0 shadow-xs">
                    {brandFormData.logoUrl ? (
                      <img
                        src={brandFormData.logoUrl}
                        alt="Logo preview"
                        className="max-h-12 max-w-[110px] w-auto h-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-dark-muted">No Logo</span>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={brandFormData.logoUrl}
                      onChange={(e) =>
                        setBrandFormData((prev) => ({ ...prev, logoUrl: e.target.value }))
                      }
                      placeholder="/images/clients/logo.svg or URL"
                      required
                      className="w-full bg-white border border-border rounded-xl px-3 py-2 text-xs text-dark focus:outline-hidden focus:border-primary shadow-xs font-mono"
                    />

                    {/* File Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-primary-light border border-border text-xs font-bold text-dark-muted hover:text-primary transition-all cursor-pointer shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-primary" />
                        <span>Upload Logo File (PNG, SVG, WebP)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBrandLogoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preset Logos Quick Selector */}
                <div>
                  <p className="text-[11px] font-bold text-dark-muted uppercase tracking-wider mb-2">
                    Quick Preset Partner Logos:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BRAND_LOGO_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setBrandFormData((prev) => ({
                            ...prev,
                            logoUrl: preset.url,
                            name: prev.name || preset.label,
                            alt: prev.alt || `${preset.label} Logo`,
                          }));
                        }}
                        className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer text-left ${
                          brandFormData.logoUrl === preset.url
                            ? "bg-primary-light border-primary text-primary font-bold shadow-xs"
                            : "bg-white border-border text-dark-muted hover:bg-softBg hover:text-dark"
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-softBg flex items-center justify-center shrink-0 p-0.5">
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="max-h-5 max-w-[20px] object-contain"
                          />
                        </div>
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  {editingBrandId ? "Update Brand Partner" : "Add to Homepage Marquee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 6: DELETE BRAND CONFIRMATION MODAL                      */}
      {/* ------------------------------------------------------------- */}
      {deleteBrandConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
          <div className="bg-white border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center text-dark animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-1">Delete Brand Partner?</h3>
            <p className="text-xs text-dark-muted mb-6 leading-relaxed font-medium">
              Are you sure? This partner logo will be permanently deleted and removed from the homepage marquee rotation.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteBrandConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBrand(deleteBrandConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Yes, Delete Brand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 7: ADD / EDIT CAPABILITY BADGE MODAL                    */}
      {/* ------------------------------------------------------------- */}
      {isCapabilityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-dark">
            <button
              onClick={() => setIsCapabilityModalOpen(false)}
              className="absolute top-6 right-6 text-dark-muted hover:text-dark p-1.5 rounded-full hover:bg-softBg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {editingCapabilityId ? "Modify Capability" : "New Capability Badge"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-dark mt-1">
                {editingCapabilityId ? "Edit Capability Badge" : "Add Badge to Services Marquee"}
              </h2>
              <p className="text-xs text-dark-muted mt-1 font-medium">
                Configure the badge title, category label, marquee track direction, icon, and display sequence.
              </p>
            </div>

            <form onSubmit={handleSaveCapability} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Capability / Service Name *
                  </label>
                  <input
                    type="text"
                    value={capabilityFormData.name}
                    onChange={(e) =>
                      setCapabilityFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Shopify Plus Stores, Next.js 14..."
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Category Tag *
                  </label>
                  <input
                    type="text"
                    value={capabilityFormData.category}
                    onChange={(e) =>
                      setCapabilityFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="e.g. Web Dev, E-commerce, Mobile..."
                    required
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                  {/* Category Suggestions */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {["Web Dev", "E-commerce", "Mobile", "Graphic Design", "Branding", "UI/UX"].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() =>
                            setCapabilityFormData((prev) => ({ ...prev, category: cat }))
                          }
                          className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold transition-all cursor-pointer ${
                            capabilityFormData.category === cat
                              ? "bg-primary text-white border-primary"
                              : "bg-softBg text-dark-muted border-border hover:text-dark"
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Track Selection & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Track Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Marquee Track Direction *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCapabilityFormData((prev) => ({ ...prev, track: 1 }))}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        capabilityFormData.track === 1
                          ? "bg-primary-light border-primary shadow-xs"
                          : "bg-white border-border hover:bg-softBg"
                      }`}
                    >
                      <p className="text-xs font-black text-dark">Track 1 (Top)</p>
                      <p className="text-[10px] text-dark-muted mt-0.5">Moves Leftward ←</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCapabilityFormData((prev) => ({ ...prev, track: 2 }))}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        capabilityFormData.track === 2
                          ? "bg-indigo-50 border-indigo-500 shadow-xs"
                          : "bg-white border-border hover:bg-softBg"
                      }`}
                    >
                      <p className="text-xs font-black text-dark">Track 2 (Bottom)</p>
                      <p className="text-[10px] text-dark-muted mt-0.5">Moves Rightward →</p>
                    </button>
                  </div>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-1.5">
                    Sequence Order in Track
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={capabilityFormData.order}
                    onChange={(e) =>
                      setCapabilityFormData((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value, 10) || 1,
                      }))
                    }
                    placeholder="1, 2, 3..."
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs"
                  />
                  <p className="text-[10px] text-dark-muted/60 mt-1">
                    Position order inside selected track (1 = first badge)
                  </p>
                </div>
              </div>

              {/* Active Toggle Card */}
              <div className="p-4 rounded-2xl bg-softBg/60 border border-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark">Active in Services Marquee</p>
                  <p className="text-[11px] text-dark-muted">
                    When enabled, this badge appears live in the homepage double-track marquee.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={capabilityFormData.active}
                    onChange={(e) =>
                      setCapabilityFormData((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Icon Picker */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark">
                    Select Badge Icon *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-dark-muted font-medium">Selected:</span>
                    <span className="px-2 py-0.5 rounded-md bg-primary-light text-primary text-xs font-mono font-bold flex items-center gap-1.5">
                      <CapabilityIcon iconKey={capabilityFormData.iconKey} className="w-3.5 h-3.5" />
                      <span>{capabilityFormData.iconKey}</span>
                    </span>
                  </div>
                </div>

                {/* Grid of Icon Options */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1 border border-border rounded-2xl bg-softBg/30">
                  {CAPABILITY_ICON_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() =>
                        setCapabilityFormData((prev) => ({ ...prev, iconKey: option.key }))
                      }
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                        capabilityFormData.iconKey === option.key
                          ? "bg-primary-light border-primary text-primary font-bold shadow-xs"
                          : "bg-white border-border text-dark-muted hover:bg-white hover:text-dark hover:border-primary/30"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-softBg flex items-center justify-center shrink-0">
                        <CapabilityIcon iconKey={option.key} className="w-4 h-4" />
                      </div>
                      <span className="truncate text-[11px]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCapabilityModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                >
                  {editingCapabilityId ? "Update Capability" : "Add to Marquee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 8: DELETE CAPABILITY CONFIRMATION MODAL                 */}
      {/* ------------------------------------------------------------- */}
      {deleteCapabilityConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
          <div className="bg-white border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center text-dark animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-1">Delete Capability Badge?</h3>
            <p className="text-xs text-dark-muted mb-6 leading-relaxed font-medium">
              Are you sure? This badge will be permanently deleted and removed from the homepage marquee rotation.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteCapabilityConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-dark-muted hover:bg-softBg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCapability(deleteCapabilityConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Yes, Delete Badge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL 5: STRICT OTP TWO-STEP PASSWORD RESET MODAL             */}
      {/* ------------------------------------------------------------- */}
      {isPasswordModalOpen && (
        <OtpPasswordResetModal
          pwStep={pwStep}
          setPwStep={setPwStep}
          adminEmail={adminEmail}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          pwLoading={pwLoading}
          pwError={pwError}
          otpCountdown={otpCountdown}
          formatTime={formatTime}
          handleSendOtp={handleSendOtp}
          handleVerifyOtp={handleVerifyOtp}
          handleSaveNewPassword={handleSaveNewPassword}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// STRICT OTP TWO-STEP PASSWORD RESET MODAL COMPONENT
// -------------------------------------------------------------
interface OtpPasswordResetModalProps {
  pwStep: "request" | "verify" | "new_password";
  setPwStep: (step: "request" | "verify" | "new_password") => void;
  adminEmail: string;
  otpCode: string;
  setOtpCode: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showNewPassword: boolean;
  setShowNewPassword: (val: boolean) => void;
  pwLoading: boolean;
  pwError: string;
  otpCountdown: number;
  formatTime: (sec: number) => string;
  handleSendOtp: () => Promise<void>;
  handleVerifyOtp: (e: React.FormEvent) => Promise<void>;
  handleSaveNewPassword: (e: React.FormEvent) => Promise<void>;
  onClose: () => void;
}

function OtpPasswordResetModal({
  pwStep,
  setPwStep,
  adminEmail,
  otpCode,
  setOtpCode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  pwLoading,
  pwError,
  otpCountdown,
  formatTime,
  handleSendOtp,
  handleVerifyOtp,
  handleSaveNewPassword,
  onClose,
}: OtpPasswordResetModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-md">
      <div className="bg-white border border-border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-dark animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-dark-muted/60 hover:text-dark p-1.5 rounded-xl hover:bg-softBg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary-200 shadow-xs">
            {pwStep === "new_password" ? (
              <Key className="w-6 h-6 text-emerald-600" />
            ) : (
              <ShieldCheck className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-dark">
              {pwStep === "new_password" ? "Set New Admin Password" : "Change Admin Password"}
            </h3>
            <p className="text-xs text-dark-muted">
              {pwStep === "new_password"
                ? "Step 2 of 2: Create new secure password"
                : "Step 1 of 2: Email OTP verification required"}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STAGE 1: REQUEST OTP (Send to lavishchouhan56@gmail.com) */}
        {/* ======================================================== */}
        {pwStep === "request" && (
          <div className="space-y-5">
            <p className="text-xs text-dark-muted leading-relaxed">
              For security, changing the admin password requires a 6-digit one-time passcode (OTP) delivered to your registered Gmail address:
            </p>

            <div className="p-4 rounded-2xl bg-primary-light/40 border border-primary-200 flex items-center gap-3 shadow-xs">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary">
                  Registered Recovery Email
                </p>
                <p className="text-sm font-mono font-bold text-dark tracking-wide mt-0.5">
                  {adminEmail}
                </p>
              </div>
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-dark-muted hover:text-dark hover:bg-softBg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={pwLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-glow-sm hover:shadow-glow inline-flex items-center gap-2 disabled:opacity-50 transition-all"
              >
                {pwLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Verification OTP</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: ENTER OTP (Verify code sent to email)            */}
        {/* ======================================================== */}
        {pwStep === "verify" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-primary-light/50 border border-primary-200 text-xs text-dark-muted">
              A 6-digit verification code has been dispatched to:
              <p className="font-bold font-mono text-primary mt-0.5">{adminEmail}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted">
                  Enter 6-Digit OTP Code *
                </label>
                {otpCountdown > 0 ? (
                  <span className="text-[11px] font-mono text-primary flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(otpCountdown)}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[11px] text-primary hover:underline font-bold"
                  >
                    Resend Code
                  </button>
                )}
              </div>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                required
                autoFocus
                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-center font-mono text-2xl tracking-[8px] text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 font-bold placeholder:text-dark-muted/30 shadow-xs transition-all"
              />
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
              <button
                type="button"
                onClick={() => setPwStep("request")}
                className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-dark-muted hover:text-dark hover:bg-softBg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={pwLoading || otpCode.length !== 6}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-glow-sm hover:shadow-glow inline-flex items-center gap-2 disabled:opacity-50 transition-all"
              >
                {pwLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verify Code →</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* STAGE 3: NEW PASSWORD WINDOW (Unlocked ONLY after OTP)    */}
        {/* ======================================================== */}
        {pwStep === "new_password" && (
          <form onSubmit={handleSaveNewPassword} className="space-y-4">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Identity verified via <strong>{adminEmail}</strong>. You may now create your new password.
              </span>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-1.5">
                New Admin Password (min 6 characters) *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password..."
                  required
                  autoFocus
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 pr-10 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted/50 hover:text-dark"
                >
                  {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark-muted mb-1.5">
                Confirm New Password *
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                required
                className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-xs text-dark focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-muted/40 shadow-xs transition-all"
              />
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-dark-muted hover:text-dark hover:bg-softBg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pwLoading}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 inline-flex items-center gap-2 disabled:opacity-50 transition-all"
              >
                {pwLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Key className="w-3.5 h-3.5" />
                    <span>Save New Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
