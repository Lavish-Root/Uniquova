'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutGrid,
    Briefcase,
    Users,
    Settings,
    Search,
    Bell,
    ArrowUpRight,
    Eye,
    Heart,
    FolderOpen,
    Filter
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { GlobalStyles, ClayButton, uiloraClayCategories, uiloraClayPortfolioMassive, uiloraClayTeamMassive, uiloraClayClientsMassive } from "@/src/components/CoreLandingPages/AgencyPortfolio/tsx/Claymorphism";

export default function UiloraClaymorphismStudio() {
    const [activeTab, setActiveTab] = useState("Portfolio");
    const [activeFilter, setActiveFilter] = useState("All Projects");

    // Dynamic Filter
    const filteredProjects = activeFilter === "All Projects" 
        ? uiloraClayPortfolioMassive 
        : uiloraClayPortfolioMassive.filter(p => p.category === activeFilter);

    return (
        <div className="min-h-screen p-4 lg:p-8 flex gap-8">
            <GlobalStyles />

            {/* Sidebar Navigation */}
            <aside className="hidden xl:flex flex-col w-72 clay-card p-4 h-[calc(100vh-64px)] fixed left-8 z-50">
                <div className="p-4 mb-4 flex items-center justify-center gap-3 clay-inset rounded-3xl border border-white/50">
                    <div className="w-12 h-12 rounded-2xl bg-[#6c5ce7] flex items-center justify-center text-white shadow-lg">
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-2xl font-black text-slate-700 tracking-tight block leading-none">Uilora</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Creative Studio</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-4">
                    {[
                        { id: "Portfolio", icon: FolderOpen },
                        { id: "Team", icon: Users },
                        { id: "Clients", icon: Briefcase },
                        { id: "Settings", icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-extrabold transition-all border border-transparent",
                                activeTab === item.id
                                    ? "clay-inset text-[#6c5ce7] border-white/50"
                                    : "text-slate-500 hover:text-slate-700 hover:clay-inset"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 stroke-[2.5px]", activeTab === item.id ? "fill-[#6c5ce7]/20" : "")} />
                            {item.id}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <div className="clay-card !rounded-3xl p-6 text-center border border-white/50">
                        <h4 className="font-extrabold text-slate-700 mb-2 text-lg">Powered by Uilora</h4>
                        <p className="text-xs font-bold text-slate-400 mb-4">Upgrade to Pro for limitless project boards & 4K uploads.</p>
                        <ClayButton variant="primary" className="w-full">Upgrade Now</ClayButton>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 xl:ml-80 flex flex-col min-w-0 max-w-[1600px] mx-auto">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tight">
                            {activeTab === 'Portfolio' ? 'Selected Works' : activeTab === 'Team' ? 'Studio Roster' : activeTab}
                        </h1>
                        <p className="text-slate-400 font-extrabold mt-2 text-lg">
                            {activeTab === 'Portfolio' ? 'Showcasing our finest digital experiences.' : 'The creative minds behind the craft.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#6c5ce7] transition-colors" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab.toLowerCase()}...`}
                                className="clay-inset rounded-2xl pl-12 pr-4 py-4 w-72 bg-transparent border border-white/50 outline-none font-extrabold text-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-[#6c5ce7]/20 transition-all"
                            />
                        </div>
                        <ClayButton className="w-14 h-14 !px-0 rounded-2xl" aria-label="Notifications">
                            <Bell className="w-6 h-6 text-slate-600" />
                            <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-[#e0e5ec]" />
                        </ClayButton>
                        <div className="w-14 h-14 rounded-2xl overflow-hidden clay-btn cursor-pointer border-2 border-white">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Uilora" className="w-full h-full object-cover" alt="User" />
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    
                    {/* PORTFOLIO TAB */}
                    {activeTab === 'Portfolio' && (
                        <motion.div
                            key="portfolio"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Interactive Filters */}
                            <div className="flex flex-wrap items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-none">
                                <div className="clay-inset p-2 rounded-2xl flex items-center gap-3 mr-2 bg-white/20">
                                    <Filter className="w-5 h-5 text-slate-400 ml-2" />
                                </div>
                                {uiloraClayCategories.map(cat => (
                                    <ClayButton 
                                        key={cat} 
                                        onClick={() => setActiveFilter(cat)}
                                        active={activeFilter === cat}
                                        className="!rounded-full px-6 py-3 shrink-0"
                                    >
                                        {cat}
                                    </ClayButton>
                                ))}
                            </div>

                            {/* Portfolio Grid */}
                            {filteredProjects.length === 0 ? (
                                <div className="py-24 text-center clay-inset rounded-3xl border-2 border-dashed border-slate-300">
                                    <p className="text-slate-400 font-extrabold text-xl">No projects found for {activeFilter}.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                                    {filteredProjects.map((proj, idx) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: idx > 8 ? 0 : idx * 0.05 }}
                                            key={proj.id}
                                        >
                                            <div className="clay-card clay-card-hover p-4 cursor-pointer group">
                                                {/* Image */}
                                                <div className="img-zoom-wrapper h-64 w-full bg-slate-200 relative mb-6">
                                                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                                    
                                                    {/* Floating Badges */}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="clay-card px-4 py-2 text-xs font-black text-slate-600 shadow-lg border-white backdrop-blur-md bg-white/50">
                                                            {proj.category}
                                                        </span>
                                                    </div>
                                                    <div className="absolute top-4 right-4">
                                                        <span className={cn(
                                                            "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider clay-inset shadow-none border border-white/30 backdrop-blur-md",
                                                            proj.status === 'Completed' ? "bg-green-100/80 text-green-600" : "bg-orange-100/80 text-orange-600"
                                                        )}>
                                                            {proj.status}
                                                        </span>
                                                    </div>

                                                    {/* Hover Overlay Action */}
                                                    <div className="absolute inset-0 bg-[#6c5ce7]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px]">
                                                        <div className="clay-btn-primary w-14 h-14 rounded-full flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-300 delay-100">
                                                            <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Meta */}
                                                <div className="px-2">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-xl font-black text-slate-700 leading-tight group-hover:text-[#6c5ce7] transition-colors">{proj.title}</h3>
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Client: {proj.client}</p>
                                                    
                                                    <div className="flex items-center gap-4 pt-4 border-t-2 border-slate-300/30">
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-500">
                                                            <Eye className="w-4 h-4 stroke-[2.5px]" /> {proj.views.toLocaleString()}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-500">
                                                            <Heart className="w-4 h-4 stroke-[2.5px]" /> {proj.likes.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            {filteredProjects.length > 0 && (
                                <div className="text-center pb-20">
                                    <ClayButton className="mx-auto !px-12 !py-4 text-lg">Load More Works</ClayButton>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* TEAM TAB */}
                    {activeTab === 'Team' && (
                        <motion.div
                            key="team"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
                                {uiloraClayTeamMassive.map((mem) => (
                                    <div key={mem.id} className="clay-card clay-card-hover p-8 text-center flex flex-col items-center">
                                        <div className="w-32 h-32 rounded-full clay-inset p-2 mb-6 border-2 border-white">
                                            <img src={mem.avatar} className="w-full h-full rounded-full object-cover" alt={mem.name}/>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-700 mb-1">{mem.name}</h3>
                                        <p className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-6">{mem.role}</p>
                                        
                                        <div className={cn(
                                            "mt-auto px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest clay-inset shadow-none border border-white/40",
                                            mem.status === 'Active' ? 'bg-green-100 text-green-600' :
                                            mem.status === 'Away' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                        )}>
                                            {mem.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CLIENTS TAB */}
                    {activeTab === 'Clients' && (
                        <motion.div
                            key="clients"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
                                {uiloraClayClientsMassive.map((client) => (
                                    <div key={client.id} className="clay-card clay-card-hover p-6 flex flex-col cursor-pointer">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-16 h-16 rounded-3xl clay-inset flex items-center justify-center text-2xl font-black text-[#6c5ce7] border border-white">
                                                {client.logo}
                                            </div>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest clay-inset shadow-none border border-white/40",
                                                client.status === 'Active' ? 'bg-green-100 text-green-600' :
                                                client.status === 'Review' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-500'
                                            )}>
                                                {client.status}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-700 mb-1">{client.name}</h3>
                                        <p className="text-sm font-bold text-slate-400 mb-6">{client.industry}</p>
                                        <div className="mt-auto pt-4 border-t-2 border-slate-300/30 flex justify-between items-center text-sm font-black text-slate-500">
                                            <span>Active Projects</span>
                                            <span className="text-lg text-[#6c5ce7]">{client.projects}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === 'Settings' && (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                                <div className="clay-card p-8">
                                    <h3 className="text-2xl font-black text-slate-700 mb-6 border-b-2 border-slate-300/30 pb-4">Studio Profile</h3>
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-32 h-32 rounded-3xl clay-inset flex flex-col items-center justify-center p-2 border-2 border-white cursor-pointer hover:bg-slate-300 transition-colors">
                                            <Users className="w-8 h-8 text-[#6c5ce7] mb-2" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Change Avatar</span>
                                        </div>
                                        <div className="flex-1 space-y-6 w-full">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Studio Name</label>
                                                <input type="text" defaultValue="Uilora Creative" className="w-full clay-inset bg-transparent px-4 py-4 rounded-2xl font-bold text-slate-700 border border-white/50 outline-none focus:ring-2 focus:ring-[#6c5ce7]/20" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Email</label>
                                                    <input type="email" defaultValue="admin@uilora.hq" className="w-full clay-inset bg-transparent px-4 py-4 rounded-2xl font-bold text-slate-700 border border-white/50 outline-none focus:ring-2 focus:ring-[#6c5ce7]/20" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Timezone</label>
                                                    <select className="w-full clay-inset bg-transparent px-4 py-4 rounded-2xl font-bold text-slate-700 border border-white/50 outline-none focus:ring-2 focus:ring-[#6c5ce7]/20 appearance-none">
                                                        <option>Pacific Time (PT)</option>
                                                        <option>Eastern Time (ET)</option>
                                                        <option>UTC (London)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="pt-4 flex justify-end">
                                                <ClayButton variant="primary">Save Changes</ClayButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="clay-card p-8 bg-red-500/10">
                                    <h3 className="text-xl font-black text-red-500 mb-4">Danger Zone</h3>
                                    <p className="text-sm font-bold text-red-400 mb-6">Permanently delete your studio profile and all active projects. This action cannot be undone.</p>
                                    <ClayButton className="text-red-500 !border-red-200 hover:bg-red-500 hover:text-white transition-colors">Delete Studio Account</ClayButton>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}
