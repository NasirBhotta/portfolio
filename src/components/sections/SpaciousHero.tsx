"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Bot, Sparkles, ArrowUpRight, FolderGit2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";

interface SpaciousHeroProps {
  onOpenAgent: () => void;
}

export function SpaciousHero({ onOpenAgent }: SpaciousHeroProps) {
  const { palette } = usePortfolioTheme();

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-36 pb-20 px-4 sm:px-8 overflow-hidden text-center">
      {/* Clean Status Pill with lots of breathing room */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121520]/80 border border-white/[0.08] text-xs font-mono-custom text-slate-300 mb-8"
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: palette.accent }}
        />
        <span>Currently Full-Stack Flutter at AXAON • French M.Sc. Candidate</span>
      </motion.div>

      {/* Main Spacious Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto mb-6"
      >
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[1.05]">
          NASIR{" "}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient} text-theme-glow`}>
            SHAHZAD
          </span>
        </h1>

        <div className="hairline-divider max-w-xl mx-auto mt-6 mb-6 opacity-40" />

        <p className="text-base sm:text-xl font-display font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {PORTFOLIO_DATA.profile.roleTagline}
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 font-sans leading-relaxed">
          Engineering production-grade cross-platform apps, offline-first SaaS architecture (100+ stores), and applied AI retrieval systems.
        </p>
      </motion.div>

      {/* Clean Primary Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-4 mb-16"
      >
        <a
          href="#projects"
          className={`px-8 py-4 rounded-xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase hover:scale-105 transition-all duration-300 flex items-center gap-2.5`}
          style={{ boxShadow: `0 0 30px ${palette.accentGlow}` }}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Explore Projects & Evidence</span>
        </a>

        <button
          onClick={onOpenAgent}
          className="px-8 py-4 rounded-xl bg-[#0c0c0f] hover:bg-[#141418] border text-xs font-mono-custom font-bold tracking-wider uppercase hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
          style={{
            borderColor: `${palette.accent}55`,
            color: palette.accentBright,
            boxShadow: `0 0 20px ${palette.accentGlow}`,
          }}
        >
          <Bot className="w-4 h-4" style={{ color: palette.accent }} />
          <span>Ask My AI Twin</span>
        </button>
      </motion.div>

      {/* Spacious High-Impact Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full mx-auto"
      >
        <div className="p-5 rounded-2xl bg-[#0e111a]/60 border border-white/[0.06] text-center">
          <div className="font-display font-extrabold text-3xl text-white mb-1">100+</div>
          <div className="text-xs font-mono-custom text-slate-400">Stores on NIZAAM SaaS</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0e111a]/60 border border-white/[0.06] text-center">
          <div className="font-display font-extrabold text-3xl text-white mb-1">10K+</div>
          <div className="text-xs font-mono-custom text-slate-400">Downloads on Talib LMS</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0e111a]/60 border border-white/[0.06] text-center">
          <div className="font-display font-extrabold text-3xl text-white mb-1">3,000+</div>
          <div className="text-xs font-mono-custom text-slate-400">Students on BrainBee</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0e111a]/60 border border-white/[0.06] text-center">
          <div className="font-display font-extrabold text-3xl text-white mb-1" style={{ color: palette.accentBright }}>Grade A</div>
          <div className="text-xs font-mono-custom text-slate-400">French Language Studies</div>
        </div>
      </motion.div>

      {/* Subtle Scroll Down Prompt */}
      <div className="mt-16 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
        <span className="text-[10px] font-mono-custom tracking-[0.25em] uppercase">Scroll to Projects & Evidence</span>
        <ArrowDown className="w-4 h-4 animate-bounce" style={{ color: palette.accent }} />
      </div>
    </section>
  );
}

