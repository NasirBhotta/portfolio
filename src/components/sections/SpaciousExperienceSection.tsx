"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";

export function SpaciousExperienceSection() {
  const { palette } = usePortfolioTheme();

  return (
    <section id="experience" className="py-32 px-4 sm:px-8 relative z-10 border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono-custom tracking-[0.25em] uppercase mb-3" style={{ color: palette.accent }}>
            <span>[ 03 // PROFESSIONAL CHRONOLOGY ]</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            ENGINEERING ROLES & <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient}`}>
              PRODUCTION DELIVERABLES
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-sans leading-relaxed">
            Hands-on software delivery across high-concurrency systems, mobile enterprise platforms, and client MVPs.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-10">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="luxury-card rounded-3xl p-6 sm:p-10 border border-white/[0.08]"
            >
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <div className="text-xs font-mono-custom uppercase tracking-wider mb-1" style={{ color: palette.accent }}>
                    {exp.company}
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {exp.role}
                  </h3>
                  {exp.appContext && (
                    <div className="text-xs font-mono-custom text-slate-400 mt-1">
                      {exp.appContext}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-custom text-slate-400">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Calendar className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                    {exp.period}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {exp.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed font-sans">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: palette.accent }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-[#090b12] text-xs font-mono-custom text-slate-400 border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

