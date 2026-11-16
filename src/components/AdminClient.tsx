"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectItem, TestimonialItem } from "@/data/agencyData";
import {
  Lock,
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
} from "lucide-react";

const CATEGORIES = [
  "Web Development",
  "Mobile App Development",
  "E-commerce Solutions",
  "Graphic Designing",
  "Branding",
] as const;

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

  // Navigation tab: "projects" or "reviews"
  const [currentTab, setCurrentTab] = useState<"projects" | "reviews">("projects");

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

  // Check existing session & fetch registered admin email
  useEffect(() => {
    const savedKey = sessionStorage.getItem("uniq_admin_key");
    if (savedKey) {
      setAdminPassword(savedKey);
      setIsAuthenticated(true);
      fetchProjects();
      fetchReviews();
      fetchAdminEmail(savedKey);
    } else {
      fetchAdminEmail();
    }
  }, []);

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
        sessionStorage.setItem("uniq_admin_key", loginInput);
        setIsAuthenticated(true);
        fetchProjects();
        fetchReviews();
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
    sessionStorage.removeItem("uniq_admin_key");
    setIsAuthenticated(false);
    setAdminPassword("");
    setLoginInput("");
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

  const openAddProjectModal = () => {
    setFormData({
      title: "",
      serviceCategory: "Web Development",
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
        sessionStorage.setItem("uniq_admin_key", newPassword);
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
    design: projects.filter(
      (p) => p.serviceCategory === "Graphic Designing" || p.serviceCategory === "Branding"
    ).length,
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
      <main className="min-h-screen bg-[#0E0C15] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Gradient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8A5CF6]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-4 ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50"
                : "bg-rose-950/90 border-rose-500/40 text-rose-200 shadow-rose-950/50"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        )}

        <div className="max-w-md w-full bg-[#151323]/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-[#8A5CF6] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Internal CMS Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              UNIQ<span className="text-primary">OVA</span> CMS
            </h1>
            <p className="text-xs sm:text-sm text-white/50 mt-1">
              Gateway for managing portfolio projects, live Vercel deployments &amp; client reviews.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
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
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
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
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={openPasswordResetModal}
              className="text-xs text-primary hover:text-primary-light font-semibold inline-flex items-center gap-1.5 transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Forgot Password? Reset via Email OTP</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white transition-colors inline-flex items-center gap-1"
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
    <main className="min-h-screen bg-[#0E0C15] text-white flex flex-col selection:bg-primary selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50"
              : "bg-rose-950/90 border-rose-500/40 text-rose-200 shadow-rose-950/50"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-white/40 hover:text-white text-xs font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#151323]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                UNIQ<span className="text-primary">OVA</span>
              </span>
            </Link>
            <span className="h-5 w-px bg-white/20 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold">
                CMS / uniq_up
              </span>
              <span className="text-xs text-white/50">Unified Operations Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentTab === "projects" ? (
              <Link
                href="/our-work"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>Live /our-work</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </Link>
            ) : (
              <Link
                href="/#testimonials"
                target="_blank"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Live Testimonials</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </Link>
            )}

            {/* Registered Gmail indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/70">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[11px] text-white/90">{adminEmail}</span>
            </div>

            {/* Change Password Button */}
            <button
              onClick={openPasswordResetModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 text-xs font-bold text-white transition-all shadow-sm"
              title="Change Admin Password via OTP"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary-light" />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Navigation Tabs: Portfolio Projects VS Client Reviews */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setCurrentTab("projects")}
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              currentTab === "projects"
                ? "bg-gradient-to-r from-primary to-[#8A5CF6] text-white shadow-lg shadow-primary/30"
                : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Portfolio Projects</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                currentTab === "projects" ? "bg-white/25 text-white" : "bg-white/10 text-white/60"
              }`}
            >
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentTab("reviews");
              if (reviews.length === 0) fetchReviews();
            }}
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              currentTab === "reviews"
                ? "bg-gradient-to-r from-primary to-[#8A5CF6] text-white shadow-lg shadow-primary/30"
                : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Client Reviews &amp; Feedback</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                currentTab === "reviews" ? "bg-white/25 text-white" : "bg-white/10 text-white/60"
              }`}
            >
              {reviews.length}
            </span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PORTFOLIO PROJECTS VIEW                             */}
        {/* ========================================================= */}
        {currentTab === "projects" && (
          <div>
            {/* Banner with Stats & Add Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Portfolio Content Management</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Manage Client Projects &amp; Live Vercel Links
                </h1>
                <p className="text-sm text-white/60 mt-1 max-w-2xl">
                  Publish projects with live Vercel deployments, screenshots, tech stacks, and measurable client outcomes.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={fetchProjects}
                  disabled={isLoadingProjects}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all disabled:opacity-50"
                  title="Refresh project list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingProjects ? "animate-spin text-primary" : ""}`} />
                </button>

                <button
                  onClick={openAddProjectModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Project</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Total Projects</p>
                <p className="text-2xl font-black text-white mt-1">{stats.total}</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-blue-400 font-bold">Web Development</p>
                <p className="text-2xl font-black text-white mt-1">{stats.web}</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-purple-400 font-bold">Mobile Apps</p>
                <p className="text-2xl font-black text-white mt-1">{stats.app}</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">E-commerce</p>
                <p className="text-2xl font-black text-white mt-1">{stats.ecom}</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4 col-span-2 sm:col-span-1">
                <p className="text-xs uppercase tracking-wider text-pink-400 font-bold">Design &amp; Branding</p>
                <p className="text-2xl font-black text-white mt-1">{stats.design}</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {["All", ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, client, tech..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Projects Cards Grid */}
            {filteredProjects.length === 0 ? (
              <div className="bg-[#151323] border border-white/10 rounded-3xl p-12 text-center my-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-white/40 mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto mb-6">
                  {searchQuery
                    ? `No projects matched "${searchQuery}". Try a different keyword.`
                    : "No projects in this category yet. Click the button below to add your first one!"}
                </p>
                <button
                  onClick={openAddProjectModal}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-md shadow-primary/30 inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Project</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#151323] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/40 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    {/* Media Preview Thumbnail */}
                    <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                      <img
                        src={project.mediaUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
                          {project.serviceCategory}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-[10px] font-black text-black">
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
                          <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            {project.impact}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs text-white/60 line-clamp-3 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Technologies Tags */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.technologies.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-white/70 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-white/40">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Links & Buttons */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          {project.vercelUrl ? (
                            <a
                              href={project.vercelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-white/60 hover:text-white transition-colors truncate max-w-[200px]"
                            >
                              {project.vercelUrl.replace("https://", "")}
                            </a>
                          ) : (
                            <span className="text-[11px] text-white/30 italic">No Vercel URL configured</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditProjectModal(project)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white border border-white/10 transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-primary" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
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
        )}

        {/* ========================================================= */}
        {/* TAB 2: CLIENT REVIEWS & FEEDBACK MANAGEMENT VIEW           */}
        {/* ========================================================= */}
        {currentTab === "reviews" && (
          <div>
            {/* Banner with Stats & Add Button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Client Testimonial &amp; Feedback Operations</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Review, Moderate &amp; Curate Testimonials
                </h1>
                <p className="text-sm text-white/60 mt-1 max-w-2xl">
                  Manage all client endorsements. Any review you add or delete here automatically updates and syncs with the live website testimonials section.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={fetchReviews}
                  disabled={isLoadingReviews}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all disabled:opacity-50"
                  title="Refresh reviews list"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoadingReviews ? "animate-spin text-primary" : ""}`} />
                </button>

                <button
                  onClick={openAddReviewModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Review</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid for Reviews */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-white/50 font-bold">Total Reviews</p>
                <p className="text-2xl font-black text-white mt-1">{reviewStats.total}</p>
                <p className="text-[11px] text-white/40 mt-0.5">Active in testimonial carousel</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Client Submissions</p>
                <p className="text-2xl font-black text-white mt-1">{reviewStats.userSubmitted}</p>
                <p className="text-[11px] text-white/40 mt-0.5">Submitted via /feedback form</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">5-Star Ratings</p>
                <p className="text-2xl font-black text-white mt-1">{reviewStats.fiveStars}</p>
                <p className="text-[11px] text-white/40 mt-0.5">Maximum satisfaction score</p>
              </div>
              <div className="bg-[#151323] border border-white/10 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-primary font-bold">Average Rating</p>
                <p className="text-2xl font-black text-white mt-1 flex items-center gap-1.5">
                  <span>{reviewStats.avgRating}</span>
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
                </p>
                <p className="text-[11px] text-white/40 mt-0.5">Across all client engagements</p>
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedReviewCategory === cat
                          ? "bg-primary text-white shadow-md shadow-primary/30"
                          : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    placeholder="Search by client, company, quote..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-primary"
                  />
                  {reviewSearchQuery && (
                    <button
                      onClick={() => setReviewSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Rating Filter Pills */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 mr-1">
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
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedRatingFilter === item.val
                        ? "bg-amber-400 text-black font-bold shadow-sm"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews Cards Grid */}
            {filteredReviews.length === 0 ? (
              <div className="bg-[#151323] border border-white/10 rounded-3xl p-12 text-center my-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-white/40 mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">No Reviews Found</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto mb-6">
                  {reviewSearchQuery
                    ? `No testimonials matched "${reviewSearchQuery}". Try another keyword.`
                    : "No client reviews match this filter. Click the button below to add a new review!"}
                </p>
                <button
                  onClick={openAddReviewModal}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-md shadow-primary/30 inline-flex items-center gap-2"
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
                    className="bg-[#151323] border border-white/10 rounded-3xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Card Header: Client Info & Avatar */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30 shrink-0 bg-white/5"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                              {review.name}
                            </h4>
                            <p className="text-xs text-white/60 truncate">
                              {review.role} • {review.company}
                            </p>
                          </div>
                        </div>

                        {/* Origin / Platform badge */}
                        <div className="shrink-0 flex flex-col items-end gap-1">
                          {review.isUserSubmitted ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-bold text-emerald-400">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>Web Submission</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 text-[10px] font-bold text-primary">
                              <Award className="w-2.5 h-2.5" />
                              <span>Curated</span>
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
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
                                  : "text-white/20"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-white/70 ml-1.5">
                            {(review.rating || 5).toFixed(1)}
                          </span>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 truncate max-w-[170px]">
                          {review.tag}
                        </span>
                      </div>

                      {/* Quote Content */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
                        <p className="text-xs text-white/80 leading-relaxed italic line-clamp-4">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Date & Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-white/40 font-mono">
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white border border-white/10 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-primary" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteReviewConfirmId(review.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
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
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL 1: ADD / EDIT PROJECT MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#151323] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {editingProjectId ? "Modify Deliverable" : "New Showcase Project"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {editingProjectId ? "Edit Project Details" : "Add Project to Portfolio"}
              </h2>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Aura Commerce — Next.js 14 Storefront"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Service Category *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-[#1e1b30] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Client / Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Aura Luxe Living UK"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Impact Statement */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Key Impact Highlight
                  </label>
                  <input
                    type="text"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    placeholder="e.g. +140% Conversion Uplift"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Project Description &amp; Scope *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of the deliverable, technical stack, architecture, and client outcomes..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* Links: Live Vercel & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Live Vercel Link (e.g. https://brand.vercel.app)
                  </label>
                  <input
                    type="url"
                    value={formData.vercelUrl}
                    onChange={(e) => setFormData({ ...formData, vercelUrl: e.target.value })}
                    placeholder="https://client-project.vercel.app"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    GitHub Repository (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/org/repo"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Next.js 14, Tailwind CSS, TypeScript, Vercel, Supabase"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* Media Configuration */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary">
                    Visual Showcase Media
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "image" })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        formData.mediaType === "image"
                          ? "bg-primary text-white"
                          : "bg-white/5 text-white/60 hover:text-white"
                      }`}
                    >
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mediaType: "video" })}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        formData.mediaType === "video"
                          ? "bg-primary text-white"
                          : "bg-white/5 text-white/60 hover:text-white"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Preset Options */}
                <div>
                  <p className="text-[11px] text-white/50 mb-1.5">Or choose a media preset:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MEDIA_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, mediaUrl: preset.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                          formData.mediaUrl === preset.url
                            ? "border-primary bg-primary/20 text-white font-bold"
                            : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload Option */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <label className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-light cursor-pointer font-semibold">
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
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
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
                <label htmlFor="featured-checkbox" className="text-xs text-white/80 cursor-pointer">
                  Feature this project prominently on the Portfolio page
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-md shadow-primary/30"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#151323] border border-white/15 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Delete Project?</h3>
            <p className="text-xs text-white/60 mb-6">
              This action cannot be undone. The project will be permanently removed from your portfolio.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#151323] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {editingReviewId ? "Moderate Testimonial" : "New Client Review"}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {editingReviewId ? "Edit Client Testimonial" : "Add Review to Website"}
              </h2>
              <p className="text-xs text-white/50 mt-1">
                This review will be displayed in the official testimonials wall on the homepage.
              </p>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.name}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.company}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, company: e.target.value })}
                    placeholder="e.g. Aurum Retail Labs"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Role */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.role}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, role: e.target.value })}
                    placeholder="e.g. Founder &amp; CEO"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Service Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Service Rendered *
                  </label>
                  <select
                    value={reviewFormData.service}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, service: e.target.value })}
                    className="w-full bg-[#1e1b30] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Star Rating (1 to 5) *
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewFormData.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-white/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-400">
                    {reviewFormData.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Quote / Testimonial Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Testimonial Quote / Feedback * (min 10 characters)
                </label>
                <textarea
                  rows={4}
                  value={reviewFormData.quote}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, quote: e.target.value })}
                  placeholder="Share the client's detailed feedback, measurable improvements, and experience working with UNIQOVA..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              {/* Avatar Selection & Upload */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Client Photo / Avatar
                  </label>
                  {reviewFormData.avatar && (
                    <img
                      src={reviewFormData.avatar}
                      alt="Avatar Preview"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/40"
                    />
                  )}
                </div>

                <input
                  type="text"
                  value={reviewFormData.avatar}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, avatar: e.target.value })}
                  placeholder="Paste avatar URL or upload photo below..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />

                {/* Preset Avatars */}
                <div>
                  <p className="text-[11px] text-white/50 mb-1.5">Or choose an avatar preset:</p>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setReviewFormData({ ...reviewFormData, avatar: p.url })}
                        className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                          reviewFormData.avatar === p.url
                            ? "border-amber-400 bg-amber-400/20 text-white font-bold"
                            : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                        }`}
                      >
                        <img src={p.url} alt={p.label} className="w-4 h-4 rounded-full object-cover" />
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Photo Upload */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <label className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 cursor-pointer font-semibold">
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
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Headshot attached</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Platform & Verification Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
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
                    className="w-full bg-[#1e1b30] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
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
                  <label htmlFor="user-submitted-checkbox" className="text-xs text-white/80 cursor-pointer">
                    Display &ldquo;Verified Web Submission&rdquo; badge
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#151323] border border-white/15 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Delete Review?</h3>
            <p className="text-xs text-white/60 mb-6 leading-relaxed">
              Are you sure? This review will be permanently deleted and immediately removed from the live website testimonials carousel.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteReviewConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteReview(deleteReviewConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Yes, Delete Review
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
    </main>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#151323] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-white animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
            {pwStep === "new_password" ? (
              <Key className="w-6 h-6 text-emerald-400" />
            ) : (
              <ShieldCheck className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {pwStep === "new_password" ? "Set New Admin Password" : "Change Admin Password"}
            </h3>
            <p className="text-xs text-white/50">
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
            <p className="text-xs text-white/70 leading-relaxed">
              For security, changing the admin password requires a 6-digit one-time passcode (OTP) delivered to your registered Gmail address:
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-primary/30 flex items-center gap-3 shadow-inner">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary">
                  Registered Recovery Email
                </p>
                <p className="text-sm font-mono font-bold text-white tracking-wide mt-0.5">
                  {adminEmail}
                </p>
              </div>
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={pwLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-md shadow-primary/30 inline-flex items-center gap-2 disabled:opacity-50"
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
            <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/25 text-xs text-white/80">
              A 6-digit verification code has been dispatched to:
              <p className="font-bold font-mono text-primary-light mt-0.5">{adminEmail}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                  Enter 6-Digit OTP Code *
                </label>
                {otpCountdown > 0 ? (
                  <span className="text-[11px] font-mono text-primary flex items-center gap-1">
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center font-mono text-2xl tracking-[8px] text-white focus:outline-none focus:border-primary font-bold placeholder-white/20"
              />
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setPwStep("request")}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={pwLoading || otpCode.length !== 6}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white font-bold text-xs shadow-md shadow-primary/30 inline-flex items-center gap-2 disabled:opacity-50"
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
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Identity verified via <strong>{adminEmail}</strong>. You may now create your new password.
              </span>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                Confirm New Password *
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
              />
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pwLoading}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-900/30 inline-flex items-center gap-2 disabled:opacity-50"
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
