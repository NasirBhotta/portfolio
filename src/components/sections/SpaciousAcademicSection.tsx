"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe, CheckCircle2, UserCheck, FileCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";

export function SpaciousAcademicSection() {
  const { palette } = usePortfolioTheme();
  const academics = PORTFOLIO_DATA.academics;

  return (
    <section id="academia" className="py-32 px-4 sm:px-8 relative z-10 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono-custom tracking-[0.25em] uppercase mb-3"
              style={{ color: palette.accent }}
            >
              <span>[ 04 // ACADEMIC DOSSIER & FRANCE M.SC. CANDIDACY ]</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              ACADEMIC FOUNDATION & <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient}`}>
                RESEARCH PROFILE
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl font-sans leading-relaxed">
              Curated for Campus France EEF, French Master of Science admissions committees, and European scholarship juries.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-custom text-slate-300 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Globe className="w-4 h-4" style={{ color: palette.accent }} />
            <span>Targeting Fall 2026 Admissions in France</span>
          </div>
        </div>

        {/* Degree & Research Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Degree Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 luxury-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between"
          >
            <div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${palette.accent}, #1e2438)`,
                  boxShadow: `0 0 20px ${palette.accentGlow}`,
                }}
              >
                <GraduationCap className="w-6 h-6" />
              </div>

              <span
                className="text-xs font-mono-custom uppercase tracking-wider font-bold block mb-1"
                style={{ color: palette.accent }}
              >
                BACHELOR OF SCIENCE
              </span>

              <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                {academics.degree}
              </h3>

              <div className="text-sm font-semibold text-slate-300 mb-1">
                {academics.institution}
              </div>
              <div className="text-xs font-mono-custom text-slate-400 mb-6">
                {academics.period} • {academics.medium}
              </div>

              {/* CGPA Badge */}
              <div className="p-4 rounded-2xl bg-[#090b12] border border-white/[0.06] mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-custom uppercase text-slate-400">Cumulative CGPA</div>
                  <div className="text-2xl font-display font-extrabold text-white">
                    {academics.gpa.split(" ")[0]} <span className="text-sm text-slate-400 font-normal">/ 4.00</span>
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-mono-custom font-bold"
                  style={{
                    backgroundColor: `${palette.accent}20`,
                    color: palette.accentBright,
                    border: `1px solid ${palette.accent}40`,
                  }}
                >
                  Honors Track
                </div>
              </div>

              {/* Notable Coursework Grades */}
              <div>
                <div className="text-[10px] font-mono-custom uppercase text-slate-500 tracking-wider mb-3">
                  HIGH-DISTINCTION ACADEMIC RESULTS:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-custom">
                  {academics.selectedGrades.map((r) => (
                    <div
                      key={r.subject}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between"
                    >
                      <span className="text-slate-300 truncate pr-1">{r.subject}</span>
                      <span className="font-bold shrink-0" style={{ color: palette.accentBright }}>
                        {r.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono-custom text-slate-400 flex items-center gap-2">
              <FileCheck className="w-4 h-4" style={{ color: palette.accent }} />
              <span>Official COMSATS Transcript & Degree Dossier Ready</span>
            </div>
          </motion.div>

          {/* Research Statement & France Readiness (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 luxury-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                <div
                  className="text-xs font-mono-custom uppercase tracking-wider font-bold"
                  style={{ color: palette.accent }}
                >
                  CAMPUS FRANCE EEF // M.SC. PROSPECTUS
                </div>
                <span className="text-xs font-mono-custom text-slate-400">Master of Science (M1/M2)</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-4">
                Specialized in Applied AI, Autonomous Agents & Large-Scale Distributed Software
              </h3>

              {/* Research Vision Block */}
              <div
                className="p-6 rounded-2xl bg-[#090b12] border-l-4 mb-8"
                style={{ borderColor: palette.accent }}
              >
                <div className="text-[10px] font-mono-custom uppercase text-slate-400 tracking-wider mb-2">
                  RESEARCH FOCUS & STATEMENT OF PURPOSE:
                </div>
                <p className="text-sm sm:text-base text-slate-200 italic font-serif leading-relaxed">
                  &ldquo;{academics.researchVision}&rdquo;
                </p>
              </div>

              {/* Language Proficiency Grid */}
              <div className="mb-6">
                <div className="text-[10px] font-mono-custom uppercase text-slate-500 tracking-wider mb-3">
                  OFFICIAL LANGUAGE PROFICIENCY:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">French Language (Français)</span>
                      <span className="text-xs font-mono-custom font-bold" style={{ color: palette.accentBright }}>Grade A</span>
                    </div>
                    <div className="text-xs text-slate-400">University Coursework Distinction</div>
                    <div className="text-[11px] font-mono-custom text-slate-500 mt-2">Active daily study for B1/B2 integration</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white">English (IELTS Academic)</span>
                      <span className="text-xs font-mono-custom font-bold" style={{ color: palette.accentBright }}>Band 6.5</span>
                    </div>
                    <div className="text-xs text-slate-400">Listening: 7.5 | Writing: 6.5 | Reading: 6.0</div>
                    <div className="text-[11px] font-mono-custom text-slate-500 mt-2">CEFR C1 Listening Proficiency</div>
                  </div>
                </div>
              </div>

              {/* Key Candidate Strengths */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-mono-custom uppercase text-slate-500 tracking-wider">
                  CANDIDACY STRENGTHS FOR JURY SELECTION:
                </div>
                {academics.keyStrengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: palette.accent }} />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Academic References Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <UserCheck className="w-5 h-5" style={{ color: palette.accent }} />
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide">
              ACADEMIC FACULTY REFERENCES (COMSATS UNIVERSITY ISLAMABAD)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academics.references.map((ref, idx) => (
              <div
                key={idx}
                className="luxury-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                    <span
                      className="text-[10px] font-mono-custom uppercase tracking-wider font-bold"
                      style={{ color: palette.accent }}
                    >
                      RECOMMENDATION LETTER ON RECORD
                    </span>
                    <span className="text-[10px] font-mono-custom text-slate-400">Verified Referee</span>
                  </div>

                  <h4 className="font-display font-extrabold text-xl text-white mb-1">{ref.name}</h4>
                  <div className="text-xs font-mono-custom font-semibold text-slate-300 mb-1">
                    {ref.title}, {ref.department}
                  </div>
                  <div className="text-xs text-slate-400 mb-4">{ref.institution}</div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                    {ref.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}