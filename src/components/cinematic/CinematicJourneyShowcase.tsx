"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  Laptop,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Send,
  GraduationCap,
  Store,
  Wrench,
  ShoppingBag,
  ShieldCheck,
  FileCheck2,
  Award,
  Globe,
  Mail,
  Phone,
  Copy,
  Check,
  UserCheck,
  ChevronRight,
  Bot,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Link from "next/link";
import { getProjectStudy } from "@/data/projectShowcase";
import { usePortfolioTheme } from "@/context/ThemeContext";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";

interface CinematicJourneyShowcaseProps {
  activeStationIndex: number;
  onSelectStation: (index: number) => void;
  onOpenAgent: () => void;
}

export function CinematicJourneyShowcase({
  activeStationIndex,
  onSelectStation,
  onOpenAgent,
}: CinematicJourneyShowcaseProps) {
  const { palette } = usePortfolioTheme();

  // Form state for Station 7 (Dispatch / Inquiry)
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("French M.Sc. Admissions / EEF");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // 24ifix interactive simulation state
  const [repairServiceMode, setRepairServiceMode] = useState<"pickup" | "walkin">("pickup");
  const [selectedDevice, setSelectedDevice] = useState<string>("iPhone 15 Pro");

  // NIZAAM interactive POS state
  const [posTab, setPosTab] = useState<"checkout" | "inventory" | "sync">("checkout");

  // Thumbnails matching the Kingston video's bottom-right dock!
  const stationThumbnails = [
    { code: "INDEX", title: "Index Overview", tag: "HQ" },
    { code: "24IFIX", title: "24ifix Client", tag: "AXAON" },
    { code: "NIZAAM", title: "NIZAAM SaaS", tag: "POS ERP" },
    { code: "BRAINBEE", title: "BrainBee AI", tag: "RAG" },
    { code: "CRIFLY", title: "Crifly Apps", tag: "Mobile" },
    { code: "SHOP", title: "Full Stack Ecommerce", tag: "Web" },
    { code: "MAPBOX", title: "Mapbox 3D", tag: "Navigation" },
    { code: "CERTS", title: "Certificates", tag: "Accredited" },
    { code: "FRANCE", title: "Campus France", tag: "M.Sc." },
    { code: "DISPATCH", title: "Transmission", tag: "Contact" },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const mailtoSubject = encodeURIComponent(`[${inquiryType}] Inbound Dispatch from ${inquiryName}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${inquiryName}\nPhone/WhatsApp: ${inquiryPhone}\nType: ${inquiryType}\n\nMessage:\n${inquiryMessage}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-8 py-24 sm:py-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: palette.accent }}
      />

      {/* Main Animated Stage Container */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {(activeStationIndex === 5 || activeStationIndex === 6) && (() => {
            const project = getProjectStudy(activeStationIndex === 5 ? "ecommerce" : "ors-map")!;
            return (
              <motion.div key={project.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div>
                  <p className="text-xs font-mono-custom tracking-widest uppercase mb-5" style={{ color: palette.accentBright }}>{project.category}</p>
                  <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white mb-6">{project.name}</h2>
                  <p className="text-lg text-slate-200 leading-relaxed mb-5">{project.summary}</p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{project.contribution[0]}</p>
                  <ul className="flex flex-wrap gap-2 mb-8" aria-label="Technologies">{project.stack.map(tech => <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">{tech}</li>)}</ul>
                  <div className="flex flex-wrap gap-5 text-sm text-white">
                    <Link href={`/work/${project.slug}`} className="underline underline-offset-4">Explore the project</Link>
                    <a href={project.repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">View repository</a>
                    <button onClick={() => onSelectStation(activeStationIndex + 1)} className="cursor-pointer" style={{ color: palette.accentBright }}>Next project &rarr;</button>
                  </div>
                </div>
                {project.video ? (
                  <figure className="rounded-3xl border border-white/10 bg-[#080e17] p-4">
                    <video controls playsInline muted preload="none" poster={project.video.poster} aria-label={project.video.label} className="w-full h-[55vh] sm:h-[62vh] object-contain rounded-2xl">
                      <source src={project.video.src} type="video/mp4" />
                      <a href={project.video.src}>Download the navigation demo</a>
                    </video>
                    <figcaption className="mt-3 text-center text-xs text-slate-400">Recorded project demo · Mapbox 3D navigation · silent preview</figcaption>
                  </figure>
                ) : (
                  <div className="luxury-card rounded-3xl border border-white/10 p-8 sm:p-12">
                    <ShoppingBag className="w-12 h-12 mb-8" style={{ color: palette.accentBright }} />
                    <p className="font-display text-3xl text-white mb-8">Storefront to server.</p>
                    <ol className="space-y-6">{project.visual.steps.map((step, index) => <li key={step} className="flex items-center gap-5 border-t border-white/10 pt-5 text-slate-200"><span className="text-xs" style={{ color: palette.accentBright }}>0{index + 1}</span>{step}</li>)}</ol>
                    <p className="text-xs text-slate-500 mt-8">Architecture overview</p>
                  </div>
                )}
              </motion.div>
            );
          })()}
          {/* ========================================================================= */}
          {/* STATION 0: ORBITAL LAUNCHPAD // HERO */}
          {/* ========================================================================= */}
          {activeStationIndex === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left Column: Massive Cinematic Typography */}
              <div className="lg:col-span-7">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-custom font-bold uppercase tracking-widest mb-6"
                  style={{
                    backgroundColor: `${palette.accent}20`,
                    color: palette.accentBright,
                    border: `1px solid ${palette.accent}45`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: palette.accentBright }} />
                  <span>CANDIDAT M.SC. FRANCE 2026 • FULL-STACK FLUTTER AT AXAON</span>
                </div>

                <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-[0.98] mb-6">
                  NASIR <br />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient}`}>
                    SHAHZAD
                  </span>
                </h1>

                <p className="text-base sm:text-xl font-display font-medium text-slate-200 leading-relaxed mb-4">
                  {PORTFOLIO_DATA.profile.roleTagline}
                </p>

                <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed mb-8 max-w-xl">
                  Engineering high-concurrency cross-platform clients, offline-first multi-tenant retail architectures (100+ stores), and autonomous retrieval-augmented AI systems.
                </p>

                {/* Main Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={() => onSelectStation(1)}
                    className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2.5 hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer`}
                    style={{ boxShadow: `0 0 25px ${palette.accentGlow}` }}
                  >
                    <span>BEGIN SYSTEM TOUR →</span>
                  </button>

                  <button
                    onClick={onOpenAgent}
                    className="px-6 py-4 rounded-2xl bg-[#0c101d] hover:bg-[#131728] border text-xs font-mono-custom font-bold tracking-wider uppercase transition-all flex items-center gap-2.5 cursor-pointer"
                    style={{
                      borderColor: `${palette.accent}55`,
                      color: palette.accentBright,
                    }}
                  >
                    <Bot className="w-4 h-4" style={{ color: palette.accent }} />
                    <span>CONSULT AI TWIN</span>
                  </button>
                </div>
              </div>

              {/* Right Column: High-Impact Metric Grid Frame */}
              <div className="lg:col-span-5">
                <div className="luxury-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06] text-xs font-mono-custom">
                    <span className="text-slate-400 uppercase tracking-widest font-bold">SYSTEM INDEX STATS</span>
                    <span style={{ color: palette.accentBright }}>VERIFIED 2026</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#090b14] border border-white/[0.06] text-center">
                      <div className="font-display font-extrabold text-3xl text-white mb-1">100+</div>
                      <div className="text-xs font-mono-custom text-slate-400">Stores on NIZAAM</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090b14] border border-white/[0.06] text-center">
                      <div className="font-display font-extrabold text-3xl text-white mb-1">10K+</div>
                      <div className="text-xs font-mono-custom text-slate-400">Talib LMS Users</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090b14] border border-white/[0.06] text-center">
                      <div className="font-display font-extrabold text-3xl text-white mb-1">3,000+</div>
                      <div className="text-xs font-mono-custom text-slate-400">BrainBee Students</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090b14] border border-white/[0.06] text-center">
                      <div className="font-display font-extrabold text-3xl mb-1" style={{ color: palette.accentBright }}>
                        Grade A
                      </div>
                      <div className="text-xs font-mono-custom text-slate-400">French Language</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-custom text-slate-400">
                    <span>COMSATS B.S. Graduate</span>
                    <span>IELTS Academic 6.5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 1: AXAON // 24IFIX (Matching the UK/Australia full-bleed card!) */}
          {/* ========================================================================= */}
          {activeStationIndex === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column: Big Country/Project Headline & Info */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom font-bold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: `${palette.accent}25`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}45`,
                    }}
                  >
                    CURRENT ROLE // AXAON
                  </span>

                  <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none mb-3">
                    24IFIX
                  </h2>

                  <div className="text-sm font-mono-custom font-bold text-slate-300 mb-4" style={{ color: palette.accent }}>
                    On-Demand Device Diagnostics & Repair Logistics (iOS & Android)
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    Delivering the cross-platform Flutter frontend for 24ifix at AXAON. Users book hardware repairs for iPhones, MacBooks, and gadgets via home pickup or in-shop appointments, tracking diagnostic stages in real time with integrated REST APIs.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#090b14] border border-white/[0.08] mb-6">
                    <div className="text-[10px] font-mono-custom uppercase tracking-wider text-slate-400 mb-1">
                      DELIVERED PRODUCTION FEATURES:
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-200 font-mono-custom">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                        <span>Doorstep Home Pickup & Drop-Off Booking Flow</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                        <span>In-Shop Appointment Scheduling & Diagnostics Checklist</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                        <span>Customer Dashboard with Live Technician Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/nasirbhotta"
                    target="_blank"
                    rel="noreferrer"
                    className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-all`}
                  >
                    <span>EXAMINE GITHUB CODE</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onSelectStation(2)}
                    className="px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono-custom text-white tracking-wider uppercase transition-all"
                  >
                    <span>NEXT: NIZAAM SAAS →</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Immersive Interactive Smartphone Device Showcase (Visual Evidence Canvas) */}
              <div className="lg:col-span-7">
                <div className="relative mx-auto max-w-md rounded-[40px] bg-[#0c101d] border-4 border-slate-700/60 p-4 shadow-2xl overflow-hidden group">
                  {/* Phone Speaker & Dynamic Island Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                  </div>

                  {/* Simulated Mobile App Screen */}
                  <div className="rounded-[30px] bg-[#07090f] border border-white/[0.08] p-5 pt-8 overflow-hidden min-h-[460px] flex flex-col justify-between relative">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <Wrench className="w-4 h-4" style={{ color: palette.accent }} />
                          <span className="text-xs font-display font-extrabold text-white">24ifix Live App</span>
                        </div>
                        <span className="text-[10px] font-mono-custom px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          ACTIVE REPAIR
                        </span>
                      </div>

                      {/* Service Booking Mode Toggle */}
                      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-4 text-xs font-mono-custom">
                        <button
                          onClick={() => setRepairServiceMode("pickup")}
                          className={`py-2 rounded-lg text-center transition-all ${
                            repairServiceMode === "pickup"
                              ? "bg-white text-black font-bold shadow-md"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Home Pickup
                        </button>
                        <button
                          onClick={() => setRepairServiceMode("walkin")}
                          className={`py-2 rounded-lg text-center transition-all ${
                            repairServiceMode === "walkin"
                              ? "bg-white text-black font-bold shadow-md"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Shop Walk-In
                        </button>
                      </div>

                      {/* Device Selector */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
                        <div className="text-[10px] font-mono-custom text-slate-400 uppercase mb-2">Selected Hardware</div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-white">{selectedDevice}</div>
                          <span className="text-xs font-mono-custom" style={{ color: palette.accentBright }}>
                            Diagnostics Ready
                          </span>
                        </div>
                      </div>

                      {/* Live Diagnostic Pipeline Status */}
                      <div className="p-3.5 rounded-2xl bg-[#0e1220] border border-white/[0.06]">
                        <div className="text-[10px] font-mono-custom text-slate-400 uppercase mb-2">
                          Live Repair Milestones:
                        </div>
                        <div className="space-y-2 text-xs font-mono-custom">
                          <div className="flex items-center justify-between text-emerald-400 font-semibold">
                            <span>1. Booking Initialized</span>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex items-center justify-between text-emerald-400 font-semibold">
                            <span>2. Device Intake & Diagnostics</span>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex items-center justify-between font-bold" style={{ color: palette.accentBright }}>
                            <span>3. Component Precision Repair</span>
                            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: palette.accent }} />
                          </div>
                          <div className="flex items-center justify-between text-slate-500">
                            <span>4. Quality Check & Delivery</span>
                            <span>Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-custom text-slate-400">
                      <span>Frontend: Flutter (Dart)</span>
                      <span>Backend: REST APIs</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 2: NIZAAM SAAS */}
          {/* ========================================================================= */}
          {activeStationIndex === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom font-bold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: `${palette.accent}25`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}45`,
                    }}
                  >
                    COMMERCIAL SAAS VENTURE
                  </span>

                  <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none mb-3">
                    NIZAAM
                  </h2>

                  <div className="text-sm font-mono-custom font-bold text-slate-300 mb-4" style={{ color: palette.accent }}>
                    Multi-Tenant Offline-First Retail POS & Cloud ERP (100+ Stores)
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    Designed and deployed across 100+ retail storefronts. Features sub-100ms checkout barcode scanning, PostgreSQL Row-Level Security (RLS) tenant isolation, and offline Drift/SQLite queue synchronization with idempotent conflict resolution.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-[#090b14] border border-white/[0.08]">
                      <div className="text-2xl font-display font-extrabold text-white">100+</div>
                      <div className="text-xs font-mono-custom text-slate-400">Stores Live in Pakistan</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#090b14] border border-white/[0.08]">
                      <div className="text-2xl font-display font-extrabold" style={{ color: palette.accentBright }}>
                        &lt;100ms
                      </div>
                      <div className="text-xs font-mono-custom text-slate-400">POS Checkout Velocity</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelectStation(3)}
                    className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <span>NEXT: BRAINBEE AI →</span>
                  </button>
                  <span className="text-xs font-mono-custom text-slate-400">PostgreSQL RLS Protected</span>
                </div>
              </div>

              {/* Right Column: POS Terminal Visual Showcase Window */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#090b14] border border-white/[0.08] p-5 shadow-2xl">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs font-mono-custom">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-slate-300 font-bold ml-2">NIZAAM POS Enterprise Terminal v2.4</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>OFFLINE SYNC: READY</span>
                    </div>
                  </div>

                  {/* Interactive POS Workspace */}
                  <div className="rounded-2xl bg-[#05070c] border border-white/[0.06] p-5 min-h-[380px] flex flex-col justify-between">
                    <div>
                      {/* POS Tabs */}
                      <div className="flex gap-2 mb-4">
                        {(["checkout", "inventory", "sync"] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setPosTab(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono-custom uppercase transition-all ${
                              posTab === tab
                                ? "bg-white text-black font-bold shadow-md"
                                : "bg-white/[0.04] text-slate-400 hover:text-white"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      {posTab === "checkout" && (
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs font-mono-custom">
                            <div>
                              <div className="text-white font-bold">Fast POS Barcode Scan</div>
                              <div className="text-slate-400 text-[11px]">Hardware Scanner Active • SKU #8930492</div>
                            </div>
                            <span className="text-emerald-400 font-bold">$45.00</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs font-mono-custom">
                            <div>
                              <div className="text-white font-bold">Store Tenant Isolation (RLS)</div>
                              <div className="text-slate-400 text-[11px]">PostgreSQL Row-Level Security Enforced</div>
                            </div>
                            <span className="text-cyan-400 font-bold">Encrypted</span>
                          </div>
                        </div>
                      )}

                      {posTab === "inventory" && (
                        <div className="space-y-2 text-xs font-mono-custom">
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex justify-between">
                            <span className="text-slate-300">Total Store SKUs</span>
                            <span className="text-white font-bold">14,280 Items</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex justify-between">
                            <span className="text-slate-300">Low Stock Alert Threshold</span>
                            <span className="text-amber-400 font-bold">12 Items Flagged</span>
                          </div>
                        </div>
                      )}

                      {posTab === "sync" && (
                        <div className="p-4 rounded-xl bg-[#0c101d] border border-white/[0.06] text-xs font-mono-custom">
                          <div className="text-white font-bold mb-2">Offline Queue Daemon Status</div>
                          <div className="text-slate-400 leading-relaxed">
                            Local SQLite database queues offline transactions when internet drops. Reconnect triggers automatic two-way synchronization without double-charge risk.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-custom text-slate-400">
                      <span>Stack: Flutter • Riverpod • Supabase • PostgreSQL</span>
                      <span style={{ color: palette.accentBright }}>100+ Stores Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 3: BRAINBEE AI */}
          {/* ========================================================================= */}
          {activeStationIndex === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom font-bold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: `${palette.accent}25`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}45`,
                    }}
                  >
                    AI CAPSTONE // COMSATS
                  </span>

                  <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none mb-3">
                    BRAINBEE
                  </h2>

                  <div className="text-sm font-mono-custom font-bold text-slate-300 mb-4" style={{ color: palette.accent }}>
                    AI-Driven Adaptive Educational System with FAISS Vector RAG
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    Undergraduate capstone integrating FAISS dense vector retrieval, multi-stage RAG document processing, and automated flashcard generation. Serving 3,000+ students and boosting daily engagement by +40%.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#090b14] border border-white/[0.08] mb-6">
                    <div className="text-[10px] font-mono-custom uppercase tracking-wider text-slate-400 mb-1">
                      EMPIRICAL RESULT:
                    </div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: palette.accent }} />
                      <span>3,000+ Students • +40% Daily Active Engagement</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelectStation(4)}
                    className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <span>NEXT: CRIFLY APPS →</span>
                  </button>
                  <span className="text-xs font-mono-custom text-slate-400">FAISS Dense Search</span>
                </div>
              </div>

              {/* Right Column: AI RAG Vector Studio Canvas */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#090b14] border border-white/[0.08] p-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs font-mono-custom">
                    <span className="text-slate-300 font-bold">BrainBee AI Retrieval Console</span>
                    <span style={{ color: palette.accentBright }}>FAISS Index: Active</span>
                  </div>

                  <div className="rounded-2xl bg-[#05070c] border border-white/[0.06] p-5 space-y-4">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="text-[10px] font-mono-custom text-slate-400 uppercase mb-1">Student Vector Query</div>
                      <div className="text-xs font-mono-custom text-white">&quot;Explain Transformer Attention Mechanism & Key-Value Caching&quot;</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0e1220] border border-white/[0.06]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono-custom uppercase text-emerald-400">FAISS Similarity Match</span>
                        <span className="text-xs font-mono-custom font-bold text-emerald-300">98.4% Confidence</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Retrieved semantic chunk #412 from CS701 Syllabus: Attention weights computed via softmax((Q * K^T) / sqrt(d_k)). KV cache eliminates redundant recomputation during auto-regressive decoding.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs font-mono-custom">
                      <span className="text-slate-400">Flashcards Auto-Synthesized:</span>
                      <span className="text-white font-bold">12 Cards Generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 4: CRIFLY APPS (Got Bakey & Shoutsy) */}
          {/* ========================================================================= */}
          {activeStationIndex === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom font-bold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: `${palette.accent}25`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}45`,
                    }}
                  >
                    COMMERCIAL APPS // CRIFLY
                  </span>

                  <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none mb-3">
                    CRIFLY
                  </h2>

                  <div className="text-sm font-mono-custom font-bold text-slate-300 mb-4" style={{ color: palette.accent }}>
                    Got Bakey (Bakery Marketplace) & Shoutsy (Influencer Network)
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    Delivered 6 production Flutter applications with 95%+ cross-platform code reuse. Shipped Got Bakey (Australian artisanal bakery marketplace with SOS on-demand ordering) and Shoutsy (influencer collaboration platform) with Node.js, Express, and MongoDB.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelectStation(5)}
                    className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <span>NEXT: CERTIFICATIONS →</span>
                  </button>
                  <span className="text-xs font-mono-custom text-slate-400">95%+ Code Reuse</span>
                </div>
              </div>

              {/* Right: Dual Product Card */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="luxury-card rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-custom font-bold text-amber-400 mb-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Got Bakey (Australia)</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      Artisanal Bakery Marketplace
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      Co-developed for Australian bakery merchants featuring SOS live order dispatch and inventory tracking.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono-custom text-slate-500">Flutter • iOS & Android</span>
                </div>

                <div className="luxury-card rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-custom font-bold text-sky-400 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Shoutsy Network</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      Influencer Marketing Engine
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      Direct brand collaboration, contract escrow, and real-time social metrics tracking.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono-custom text-slate-500">BLoC • Node.js Backend</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 5: ACCREDITED CERTIFICATES VAULT */}
          {/* ========================================================================= */}
          {activeStationIndex === 7 && (
            <motion.div
              key="stage-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom font-bold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: `${palette.accent}25`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}45`,
                    }}
                  >
                    VERIFIED CREDENTIALS
                  </span>

                  <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none mb-3">
                    CERTIFIED
                  </h2>

                  <div className="text-sm font-mono-custom font-bold text-slate-300 mb-4" style={{ color: palette.accent }}>
                    Autonomous AI Agents, Model Context Protocol & Honors Coursework
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    Formal accreditations across Hugging Face autonomous agents, Udemy agentic engineering (MCP, LangGraph, CrewAI), university French language distinction (Grade A), and IELTS Academic (6.5).
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelectStation(8)}
                    className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <span>NEXT: CAMPUS FRANCE EEF →</span>
                  </button>
                  <span className="text-xs font-mono-custom text-slate-400">Official PDFs on File</span>
                </div>
              </div>

              {/* Right: 4 Certificate Badges */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="luxury-card rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                        <span className="text-xl">{cert.issuerLogo}</span>
                        <span className="text-[10px] font-mono-custom px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                          {cert.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white mb-1">{cert.title}</div>
                      <div className="text-[11px] font-mono-custom text-slate-400 mb-3">{cert.issuer} • {cert.date}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-white/[0.04]">
                      {cert.skills.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-[#07090f] text-[10px] font-mono-custom text-slate-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 6: CAMPUS FRANCE EEF & ACADEMIA */}
          {/* ========================================================================= */}
          {activeStationIndex === 8 && (
            <motion.div
              key="stage-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-custom font-bold uppercase tracking-wider mb-4"
                    style={{
                      backgroundColor: `${palette.accent}25`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}45`,
                    }}
                  >
                    CAMPUS FRANCE EEF // M.SC. CANDIDACY
                  </span>

                  <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none mb-3">
                    FRANCE EEF
                  </h2>

                  <div className="text-sm font-mono-custom font-bold text-slate-300 mb-4" style={{ color: palette.accent }}>
                    Master of Science in Artificial Intelligence & Computer Science
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                    B.S. in Computer Science from COMSATS University Islamabad (133 credit hours, 100% English medium, CGPA: 3.23). High distinction in French Language (Grade A), Statistics (Grade A), Web Technologies (Grade A), and Information Security (Grade A).
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onSelectStation(9)}
                    className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer`}
                  >
                    <span>NEXT: TRANSMISSION DISPATCH →</span>
                  </button>
                  <span className="text-xs font-mono-custom text-slate-400">Fall 2026 Ready</span>
                </div>
              </div>

              {/* Right: Academic Faculty Letters & High Distinction Grades */}
              <div className="lg:col-span-7 space-y-4">
                <div className="luxury-card rounded-2xl p-5 border border-white/[0.08]">
                  <div className="text-xs font-mono-custom font-bold uppercase text-slate-400 mb-3">
                    COMSATS FACULTY RECOMMENDATION LETTERS ON RECORD:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-custom">
                    {PORTFOLIO_DATA.academics.references.map((ref) => (
                      <div key={ref.name} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="text-white font-bold">{ref.name}</div>
                        <div className="text-slate-400 text-[11px]">{ref.title}, {ref.department}</div>
                        <div className="text-emerald-400 text-[10px] mt-1">Letter Available</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="luxury-card rounded-2xl p-5 border border-white/[0.08]">
                  <div className="text-xs font-mono-custom font-bold uppercase text-slate-400 mb-3">
                    SELECTED HIGH-DISTINCTION RESULTS:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-custom">
                    {PORTFOLIO_DATA.academics.selectedGrades.map((g) => (
                      <div key={g.subject} className="flex justify-between items-center p-2 rounded-lg bg-[#07090f]">
                        <span className="text-slate-300 truncate pr-1">{g.subject}</span>
                        <span className="font-bold" style={{ color: palette.accentBright }}>{g.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STATION 7: DISPATCH & TRANSMISSION (Matching Kingston Scene 4 Form!) */}
          {/* ========================================================================= */}
          {activeStationIndex === 9 && (
            <motion.div
              key="stage-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto w-full"
            >
              <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-white/[0.12] bg-[#0c101d]/95 shadow-2xl relative overflow-hidden">
                {/* Header bar matching Kingston Scene 4 */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
                  <div>
                    <span
                      className="text-[10px] font-mono-custom font-bold uppercase tracking-wider block mb-1"
                      style={{ color: palette.accent }}
                    >
                      DIRECT TRANSMISSION TERMINAL
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      Initialize Contact Request.
                    </h3>
                  </div>
                  <span className="text-xs font-mono-custom text-slate-400">Step 1 of 2 // Dispatch</span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono-custom text-slate-300 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name or organization"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#07090f] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-mono-custom text-slate-300 mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl bg-white/[0.05] border border-r-0 border-white/[0.1] text-xs font-mono-custom text-slate-300">
                          PK +92
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="300 1234567"
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-r-xl bg-[#07090f] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Objective */}
                  <div>
                    <label className="block text-xs font-mono-custom text-slate-300 mb-1.5 uppercase tracking-wider">
                      Nature of Inquiry *
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#07090f] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-400"
                    >
                      <option value="French M.Sc. Admissions / EEF">French M.Sc. Admissions / Campus France EEF</option>
                      <option value="Engineering Job Offer / Talent Search">Engineering Job Offer / Talent Search</option>
                      <option value="Commercial SaaS / Mobile App Project">Commercial SaaS / Mobile App Project</option>
                      <option value="General Technical Consultation">General Technical Consultation</option>
                    </select>
                  </div>

                  {/* Brief Message */}
                  <div>
                    <label className="block text-xs font-mono-custom text-slate-300 mb-1.5 uppercase tracking-wider">
                      Message / Project Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share relevant details about the role, master's jury interview, or app vision..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#07090f] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-4 rounded-xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all cursor-pointer`}
                    style={{ boxShadow: `0 0 25px ${palette.accentGlow}` }}
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH DIRECTLY</span>
                  </button>
                </form>

                {/* Direct Contacts Row */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-custom text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: palette.accent }} />
                    <span className="text-white font-bold">{PORTFOLIO_DATA.profile.email}</span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? "COPIED" : "COPY EMAIL"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Bottom-Right Interactive Thumbnail Dock (Exact matching from video: [UK] [USA] [CANADA] [AUSTRALIA] [+22]) */}
      <div className="fixed bottom-24 right-4 sm:right-8 z-40 hidden sm:flex items-center gap-2 pointer-events-auto">
        {stationThumbnails.slice(0, 5).map((thumb, idx) => {
          const isActive = idx === activeStationIndex;

          return (
            <button
              key={thumb.code}
              onClick={() => onSelectStation(idx)}
              className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer border ${
                isActive
                  ? "bg-[#101426] text-white shadow-xl scale-105"
                  : "bg-[#090b14]/90 text-slate-400 hover:text-white border-white/[0.08] hover:border-white/20"
              }`}
              style={{
                borderColor: isActive ? palette.accentBright : undefined,
                boxShadow: isActive ? `0 0 15px ${palette.accentGlow}` : "none",
              }}
            >
              <div className="text-[10px] font-mono-custom font-extrabold uppercase" style={{ color: isActive ? palette.accentBright : undefined }}>
                {thumb.code}
              </div>
              <div className="text-[8px] font-mono-custom text-slate-400 truncate max-w-[65px]">
                {thumb.tag}
              </div>
            </button>
          );
        })}

        {/* "+3 More" Thumbnail Pill */}
        <button
          onClick={() => onSelectStation(activeStationIndex >= 5 ? 0 : 5)}
          className="px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-mono-custom text-[10px] font-bold tracking-wider cursor-pointer transition-all"
        >
          {activeStationIndex >= 5 ? "INDEX" : "+5 MORE"}
        </button>
      </div>
    </div>
  );
}
