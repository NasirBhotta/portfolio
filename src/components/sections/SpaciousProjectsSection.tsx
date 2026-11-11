"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Sparkles,
  Laptop,
  Layers,
  Wrench,
  ShoppingBag,
  Store,
  GraduationCap,
  Navigation,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function SpaciousProjectsSection() {
  const { palette } = usePortfolioTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterTabs = ["All", "Mobile Apps", "SaaS & Systems", "Applied AI"];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Mobile Apps") return p.category.includes("Mobile") || p.category.includes("Commerce");
    if (selectedFilter === "SaaS & Systems") return p.category.includes("SaaS") || p.category.includes("Systems");
    if (selectedFilter === "Applied AI") return p.category.includes("AI");
    return true;
  });

  return (
    <section id="projects" className="py-32 px-4 sm:px-8 relative z-10 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with generous spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono-custom tracking-[0.25em] uppercase mb-3"
              style={{ color: palette.accent }}
            >
              <span>[ 01 // PRODUCTION WORK & VISUAL EVIDENCE ]</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              ENGINEERED APPS & <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient}`}>
                VISUAL SHOWROOM
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl font-sans leading-relaxed">
              Real-world systems backed by production codebases, verified client deployments, and measurable user metrics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-custom transition-all cursor-pointer border ${
                  selectedFilter === tab
                    ? "text-white font-bold"
                    : "text-slate-400 hover:text-white bg-white/[0.03] border-white/[0.06]"
                }`}
                style={{
                  backgroundColor: selectedFilter === tab ? `${palette.accent}22` : undefined,
                  borderColor: selectedFilter === tab ? palette.accent : undefined,
                  boxShadow: selectedFilter === tab ? `0 0 15px ${palette.accentGlow}` : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Generous Vertical Scrolling: Each project has full stage presence! */}
        <div className="space-y-32">
          {filteredProjects.map((proj, idx) => {
            const isMobile = proj.category.includes("Mobile") || proj.title.includes("24ifix") || proj.title.includes("Got Bakey") || proj.title.includes("Talib");

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="luxury-card rounded-3xl p-6 sm:p-12 border border-white/[0.08] relative overflow-hidden"
              >
                {/* Background ambient radial aura */}
                <div
                  className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
                  style={{ backgroundColor: palette.accent }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Visual Evidence Showcase Window (7 Columns) */}
                  <div className="lg:col-span-7 order-2 lg:order-1">
                    <div className="relative rounded-2xl bg-[#090b12] border border-white/[0.08] p-4 sm:p-5 overflow-hidden shadow-2xl group">
                      {/* Window / Frame Header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-xs font-mono-custom">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                          <span className="text-[11px] text-slate-300 ml-2 font-bold">{proj.title.split("–")[0]}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{proj.client}</span>
                      </div>

                      {/* Visual UI Frame / Screenshot Canvas */}
                      <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-[#121624] via-[#0b0e17] to-[#06070b] border border-white/[0.06] flex flex-col justify-between p-6 relative overflow-hidden group-hover:border-white/[0.15] transition-all">
                        {/* Device / UI Preview Header */}
                        <div className="flex items-center justify-between z-10">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono-custom text-slate-300">
                            {isMobile ? (
                              <>
                                <Smartphone className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                                <span>Flutter iOS / Android Client</span>
                              </>
                            ) : (
                              <>
                                <Laptop className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                                <span>Enterprise Cloud Architecture</span>
                              </>
                            )}
                          </div>

                          <span
                            className="text-[10px] font-mono-custom font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${palette.accent}25`,
                              color: palette.accentBright,
                            }}
                          >
                            Live System
                          </span>
                        </div>

                        {/* Interactive UI Center Simulation */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-4">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-2xl transition-transform group-hover:scale-105"
                            style={{
                              background: `linear-gradient(135deg, ${palette.accent}, #181d2e)`,
                              boxShadow: `0 0 30px ${palette.accentGlow}`,
                            }}
                          >
                            {proj.title.includes("24ifix") ? (
                              <Wrench className="w-8 h-8" />
                            ) : proj.title.includes("NIZAAM") ? (
                              <Store className="w-8 h-8" />
                            ) : proj.title.includes("BrainBee") ? (
                              <GraduationCap className="w-8 h-8" />
                            ) : proj.title.includes("Got Bakey") ? (
                              <ShoppingBag className="w-8 h-8" />
                            ) : proj.title.includes("Talib") ? (
                              <Smartphone className="w-8 h-8" />
                            ) : (
                              <Navigation className="w-8 h-8" />
                            )}
                          </div>

                          <div className="text-base sm:text-lg font-display font-bold text-white mb-1">
                            {proj.title}
                          </div>

                          <div className="text-xs font-mono-custom text-slate-400 mb-4 max-w-sm">
                            {proj.imagePlaceholderText}
                          </div>

                          {/* Metric Pill */}
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono-custom text-slate-200">
                            <TrendingUp className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                            <span>{proj.impact}</span>
                          </div>
                        </div>

                        {/* Frame Bottom Status */}
                        <div className="flex items-center justify-between z-10 pt-3 border-t border-white/[0.06] text-[10px] font-mono-custom text-slate-400">
                          <span>Evidence: Production Artifacts & Logs</span>
                          <span className="text-slate-300">Verified by Nasir Shahzad</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Information & Deliverables Column (5 Columns) */}
                  <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                    <div>
                      {/* Category & Project Index */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="text-xs font-mono-custom font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                          style={{
                            backgroundColor: `${palette.accent}20`,
                            color: palette.accentBright,
                            border: `1px solid ${palette.accent}40`,
                          }}
                        >
                          {proj.category}
                        </span>
                        <span className="text-xs font-mono-custom text-slate-400 font-bold">
                          SYSTEM // {proj.number}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-snug">
                        {proj.title}
                      </h3>

                      <div className="text-xs font-mono-custom mb-5 font-bold" style={{ color: palette.accent }}>
                        Client / Context: {proj.client}
                      </div>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                        {proj.description}
                      </p>

                      {/* Measurable Outcome Card */}
                      <div className="p-4 rounded-2xl bg-[#090b12] border border-white/[0.08] mb-6">
                        <div className="text-[10px] font-mono-custom uppercase tracking-wider text-slate-400 mb-1">
                          PRODUCTION IMPACT / VERIFIABLE RESULT:
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                          <span>{proj.impact}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-[#090b12] text-xs font-mono-custom text-slate-300 border border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-mono-custom border border-white/[0.08] transition-all flex items-center gap-2"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub Code</span>
                          </a>
                        )}
                        <span className="text-xs font-mono-custom text-slate-400">
                          Production Evidence Ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
