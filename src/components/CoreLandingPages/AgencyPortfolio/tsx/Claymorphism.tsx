import React from "react";
import { cn } from "@/src/lib/utils";

// --- EXPANDED CREATIVE PORTFOLIO DATA ---

export const uiloraClayCategories = ["All Projects", "Web Design", "Mobile Apps", "Branding", "UI/UX", "Marketing"];

export const uiloraClayPortfolioMassive = Array.from({ length: 90 }).map((_, i) => {
    const categories = ["Web Design", "Mobile Apps", "Branding", "UI/UX", "Marketing"];
    return {
        id: `CLAY_PROJ_${i + 1}`,
        title: ["Fintech Neo", "Cloud9 Dashboard", "Minimalist Studio", "HealthApp V2", "Crypto Exchange", "Acme Rebrand", "Linear App Concept", "Spotify Redesign"][Math.floor(Math.random() * 8)] + ` 202${Math.floor(Math.random() * 4) + 2}`,
        client: ["Fintech Inc", "Acme Corp", "Stripe", "Nike", "Vercel", "Framer", "Uilora HQ"][Math.floor(Math.random() * 7)],
        category: categories[Math.floor(Math.random() * categories.length)],
        status: Math.random() > 0.3 ? "Completed" : "In Progress",
        image: `https://picsum.photos/seed/${i + 500}/800/600`,
        views: Math.floor(Math.random() * 1000) + 100,
        likes: Math.floor(Math.random() * 500) + 50,
    };
});

export const uiloraClayTeamMassive = Array.from({ length: 30 }).map((_, i) => ({
    id: `MEM_${i + 1}`,
    name: ["Alex Chen", "Sarah Miller", "John Doe", "Eva Wong", "Chris Fox", "Jane Smith", "Sam O'Connor"][Math.floor(Math.random() * 7)],
    role: ["Creative Director", "Lead UI/UX", "Motion Designer", "Frontend Dev", "Fullstack Eng", "Brand Strategist"][Math.floor(Math.random() * 6)],
    avatar: `https://i.pravatar.cc/150?u=clay_${i}`,
    status: ["Active", "Away", "Do Not Disturb"][Math.floor(Math.random() * 3)]
}));

export const uiloraClayClientsMassive = [
    { id: "C1", name: "Nike", industry: "Sportswear", projects: 12, status: "Active", logo: "N" },
    { id: "C2", name: "Stripe", industry: "Fintech", projects: 5, status: "Active", logo: "S" },
    { id: "C3", name: "Vercel", industry: "Cloud Tech", projects: 8, status: "Review", logo: "V" },
    { id: "C4", name: "Framer", industry: "Design Tools", projects: 3, status: "Active", logo: "F" },
    { id: "C5", name: "Acme Corp", industry: "E-Commerce", projects: 22, status: "Past", logo: "A" },
    { id: "C6", name: "Supabase", industry: "Database", projects: 4, status: "Active", logo: "S" },
    { id: "C7", name: "Tesla", industry: "Automotive", projects: 1, status: "Review", logo: "T" },
    { id: "C8", name: "OpenAI", industry: "AI Research", projects: 7, status: "Active", logo: "O" },
];

// --- CSS INJECTION (CLAYMORPHISM STUDIO) ---
export function GlobalStyles() {
    return (
        <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

    body {
      background-color: #e0e5ec;
      color: #4a5568;
      font-family: 'Nunito', sans-serif;
    }

    .clay-card {
      background-color: #e0e5ec;
      border-radius: 32px;
      box-shadow: 
        12px 12px 24px rgb(163,177,198,0.7), 
        -12px -12px 24px rgba(255,255,255, 0.8);
      border: 1px solid rgba(255,255,255,0.4);
      transition: all 0.3s ease;
    }
    
    .clay-card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 
        16px 16px 32px rgb(163,177,198,0.8), 
        -16px -16px 32px rgba(255,255,255, 0.9);
    }

    .clay-inset {
      box-shadow: 
        inset 6px 6px 10px 0 rgba(163,177,198, 0.7), 
        inset -6px -6px 10px 0 rgba(255,255,255, 1);
    }
    
    .clay-btn {
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      background-color: #e0e5ec;
      box-shadow: 
        6px 6px 10px 0 rgba(163,177,198, 0.7), 
        -6px -6px 10px 0 rgba(255,255,255, 0.8);
      color: #4a5568;
    }
    
    .clay-btn:active, .clay-btn.active {
      transform: scale(0.96);
      color: #6c5ce7;
      box-shadow: 
        inset 4px 4px 8px 0 rgba(163,177,198, 0.7), 
        inset -4px -4px 8px 0 rgba(255,255,255, 0.8);
    }

    .clay-btn-primary {
      background-color: #6c5ce7;
      color: white;
      box-shadow: 
        6px 6px 10px 0 rgba(108, 92, 231, 0.4), 
        -6px -6px 10px 0 rgba(255,255,255, 0.6);
    }
    
    .clay-btn-primary:active {
      transform: scale(0.96);
      box-shadow: 
        inset 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .img-zoom-wrapper {
        overflow: hidden;
        border-radius: 24px;
    }
    .img-zoom-wrapper img {
        transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .clay-card:hover .img-zoom-wrapper img, .img-zoom-wrapper:hover img {
        transform: scale(1.08);
    }

    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 20px;
      border: 2px solid #e0e5ec;
    }
  `}</style>
    );
}

// --- COMPONENTS ---

export interface ClayCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    action?: React.ReactNode;
}

export function ClayCard({ children, className, title, action }: ClayCardProps) {
    return (
        <div className={cn("clay-card p-6 flex flex-col", className)}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-6 z-10">
                    {title && <h3 className="text-xl font-extrabold text-slate-700">{title}</h3>}
                    {action}
                </div>
            )}
            {children}
        </div>
    );
}

export interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "default" | "primary";
    className?: string;
    icon?: React.ComponentType<{ className?: string }>;
    active?: boolean;
}

export function ClayButton({ children, variant = "default", className, icon: Icon, onClick, active, ...rest }: ClayButtonProps) {
    return (
        <button 
            onClick={onClick}
            {...rest}
            className={cn(
                "flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm border border-white/40",
                variant === "primary" ? "clay-btn-primary" : "clay-btn",
                active && "active",
                className
            )}
        >
            {Icon && <Icon className="w-4 h-4 stroke-[3px]" />}
            {children}
        </button>
    );
}
