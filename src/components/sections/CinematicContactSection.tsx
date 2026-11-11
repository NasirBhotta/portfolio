"use client";

import React, { useState } from "react";
import { Mail, MapPin, Copy, Check, ArrowUp, Send, Phone, BookOpen } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";

export function CinematicContactSection() {
  const { palette } = usePortfolioTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-32 pb-16 px-4 sm:px-8 relative z-10 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column: Direct Call to Action */}
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono-custom tracking-[0.25em] uppercase mb-4"
              style={{ color: palette.accent }}
            >
              <span>[ 05 // TRANSMISSION & ADMISSIONS CONTACT ]</span>
            </div>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight mb-6 leading-tight">
              LET&apos;S CONNECT & <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient}`}>
                COLLABORATE.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-sans">
              Available for French Master&apos;s admissions (Campus France EEF), European software engineering opportunities, and commercial SaaS/mobile product architecture.
            </p>

            {/* Quick Email & Phone Contact Boxes */}
            <div className="space-y-4 max-w-lg mb-6">
              {/* Email */}
              <div className="p-4 sm:p-5 rounded-2xl luxury-card border border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div
                    className="w-11 h-11 rounded-xl bg-[#141418] border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${palette.accent}40`, color: palette.accent }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-slate-400 font-mono-custom uppercase tracking-wider">
                      PRIMARY EMAIL
                    </div>
                    <div className="text-sm sm:text-base font-mono-custom text-white truncate font-bold">
                      {PORTFOLIO_DATA.profile.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono-custom font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-300 cursor-pointer shrink-0"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 sm:p-5 rounded-2xl luxury-card border border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div
                    className="w-11 h-11 rounded-xl bg-[#141418] border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${palette.accent}40`, color: palette.accent }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-slate-400 font-mono-custom uppercase tracking-wider">
                      DIRECT CALL / WHATSAPP
                    </div>
                    <div className="text-sm sm:text-base font-mono-custom text-white truncate font-bold">
                      {PORTFOLIO_DATA.profile.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono-custom font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-300 cursor-pointer shrink-0"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPhone ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Location & Status */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono-custom">
              <MapPin className="w-4 h-4" style={{ color: palette.accent }} />
              <span>{PORTFOLIO_DATA.profile.location} • Actively preparing relocation to France</span>
            </div>
          </div>

          {/* Right Column: Verified Networks */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono-custom text-slate-400 tracking-widest uppercase mb-2">
                VERIFIED IDENTIFIERS //
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-card p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex items-center gap-3.5 group cursor-pointer hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#141418] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white">LinkedIn Profile</div>
                    <div className="text-[10px] font-mono-custom text-slate-400">me-bhotta</div>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-card p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex items-center gap-3.5 group cursor-pointer hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#141418] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white">GitHub Repositories</div>
                    <div className="text-[10px] font-mono-custom text-slate-400">nasirbhotta</div>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-card p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex items-center gap-3.5 group cursor-pointer hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#141418] flex items-center justify-center group-hover:scale-105 transition-transform text-slate-300">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white flex items-center gap-1.5">
                      <span>Tech Channel</span>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-mono-custom font-bold"
                        style={{
                          backgroundColor: `${palette.accent}20`,
                          color: palette.accentBright,
                        }}
                      >
                        CREATOR
                      </span>
                    </div>
                    <div className="text-[10px] font-mono-custom text-slate-400">@vibecode_unpacked</div>
                  </div>
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.scholar}
                  target="_blank"
                  rel="noreferrer"
                  className="luxury-card p-4 sm:p-5 rounded-2xl border border-white/[0.08] flex items-center gap-3.5 group cursor-pointer hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#141418] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" style={{ color: palette.accent }} />
                  </div>
                  <div>
                    <div className="text-xs font-display font-bold text-white">Navigation Engine</div>
                    <div className="text-[10px] font-mono-custom text-slate-400">ors_map library</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Launch Client Mail Button */}
            <div className="mt-8 pt-8 border-t border-white/[0.08]">
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}?subject=Inquiry%20regarding%20Software%20Engineering%20or%20French%20M.Sc.`}
                className={`w-full py-4 rounded-xl bg-gradient-to-r ${palette.gradient} text-white font-mono-custom font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2.5 hover:scale-[1.01] transition-transform duration-300 shadow-xl`}
                style={{ boxShadow: `0 0 25px ${palette.accentGlow}` }}
              >
                <Send className="w-4 h-4" />
                <span>SEND DIRECT EMAIL DISPATCH</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-custom text-slate-500">
          <div>
            © 2026 {PORTFOLIO_DATA.profile.name.toUpperCase()} • CRAFTED FOR FRENCH ACADEMIC ADMISSIONS & GLOBAL RECRUITERS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" style={{ color: palette.accent }} />
          </button>
        </div>
      </div>
    </footer>
  );
}