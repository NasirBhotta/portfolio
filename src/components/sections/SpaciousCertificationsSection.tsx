"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, FileCheck2, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";

export function SpaciousCertificationsSection() {
  const { palette } = usePortfolioTheme();
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-32 px-4 sm:px-8 relative z-10 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Generous Breathing Room */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono-custom tracking-[0.25em] uppercase mb-3"
              style={{ color: palette.accent }}
            >
              <span>[ 02 // ACCREDITED COURSES & CERTIFIED CREDENTIALS ]</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              VERIFIED COURSES & <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient}`}>
                SPECIALIZED CERTIFICATES
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl font-sans leading-relaxed">
              Academic honors, language proficiencies, and specialized engineering credentials on autonomous AI agents, tool calling, and systems architecture.
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono-custom text-slate-300 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <ShieldCheck className="w-5 h-5 shrink-0" style={{ color: palette.accent }} />
            <div>
              <div className="font-bold text-white">Official Documents Available</div>
              <div className="text-[11px] text-slate-400">PDF Credentials & Verified Transcripts</div>
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid - Spacious 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PORTFOLIO_DATA.certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="luxury-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header row with Issuer and Status Pill */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#121624] border border-white/[0.08] flex items-center justify-center text-2xl shadow-lg">
                      {cert.issuerLogo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{cert.issuer}</div>
                      <div className="text-xs font-mono-custom text-slate-400">Awarded {cert.date}</div>
                    </div>
                  </div>

                  <span
                    className="text-xs font-mono-custom uppercase tracking-wider px-3 py-1 rounded-full font-bold"
                    style={{
                      backgroundColor: `${palette.accent}20`,
                      color: palette.accentBright,
                      border: `1px solid ${palette.accent}40`,
                    }}
                  >
                    {cert.status}
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-4 leading-snug">
                  {cert.title}
                </h3>

                {/* Certificate Visual Mockup / Document Frame (Where certificate picture or scan can be placed) */}
                <div className="rounded-2xl bg-[#090b12] border border-white/[0.08] p-5 mb-6 relative overflow-hidden group-hover:border-white/[0.15] transition-all">
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: palette.accent }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                        style={{
                          background: `linear-gradient(135deg, ${palette.accent}, #1e2438)`,
                        }}
                      >
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-custom font-bold text-white flex items-center gap-1.5">
                          <span>Certificate Document on File</span>
                          <Sparkles className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                        </div>
                        <div className="text-[11px] font-mono-custom text-slate-400 mt-0.5">
                          Holder: Nasir Shahzad • Verified Credential
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono-custom px-2.5 py-1 rounded bg-white/[0.05] text-slate-300 shrink-0">
                      OFFICIAL
                    </span>
                  </div>

                  {/* Visual Document Watermark Bar */}
                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono-custom text-slate-400">
                    <span>Target: French Admissions & Talent Acquisition</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Authentic</span>
                    </span>
                  </div>
                </div>

                {/* Competencies Covered */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] font-mono-custom uppercase text-slate-500 tracking-wider">
                    VERIFIED CURRICULUM & SKILLS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-[#0e121d] text-xs font-mono-custom text-slate-300 border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-custom text-slate-400">
                <span>Verification ID: <strong className="text-slate-200">#CERT-{idx + 1}09</strong></span>
                <span style={{ color: palette.accentBright }}>Dossier Ready</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
