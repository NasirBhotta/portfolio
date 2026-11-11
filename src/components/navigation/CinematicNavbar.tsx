"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Bot, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/context/ThemeContext";
import { PaletteSwitcher } from "@/components/navigation/PaletteSwitcher";

interface CinematicNavbarProps {
  activeStationIndex: number;
  onSelectStation: (index: number) => void;
  onOpenAgent: () => void;
}

export function CinematicNavbar({
  activeStationIndex,
  onSelectStation,
  onOpenAgent,
}: CinematicNavbarProps) {
  const { palette } = usePortfolioTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview", index: 0 },
    { label: "24ifix", index: 1 },
    { label: "NIZAAM", index: 2 },
    { label: "BrainBee", index: 3 },
    { label: "Crifly", index: 4 },
    { label: "Ecommerce", index: 5 },
    { label: "Mapbox 3D", index: 6 },
    { label: "Certificates", index: 7 },
    { label: "France EEF", index: 8 },
    { label: "Dispatch", index: 9 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none">
      <nav className="max-w-7xl mx-auto luxury-card rounded-full px-5 sm:px-8 py-3.5 flex items-center justify-between border border-white/[0.12] bg-[#0c101d]/90 backdrop-blur-xl shadow-2xl pointer-events-auto">
        {/* Brand Monogram & Name (Left) */}
        <button
          onClick={() => onSelectStation(0)}
          className="flex items-center gap-3 group cursor-pointer focus:outline-none"
        >
          <div
            className="w-9 h-9 rounded-full bg-[#121625] border flex items-center justify-center font-display font-extrabold text-xs tracking-wider transition-all duration-300 group-hover:scale-105"
            style={{
              borderColor: `${palette.accent}77`,
              color: palette.accentBright,
              boxShadow: `0 0 15px ${palette.accentGlow}`,
            }}
          >
            NS
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-white transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono-custom tracking-wider">
              Applied AI & Cross-Platform
            </span>
          </div>
        </button>

        {/* Desktop Station Navigation Links (Center) */}
        <div className="hidden xl:flex items-center gap-3">
          {navItems.map((item) => {
            const isActive = item.index === activeStationIndex;

            return (
              <button
                key={item.label}
                onClick={() => onSelectStation(item.index)}
                className={`text-xs font-mono-custom tracking-wider transition-all py-1 relative group cursor-pointer focus:outline-none ${
                  isActive ? "text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: palette.accentBright }}
                  />
                ) : (
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Actions: Palette Switcher + AI Twin + Dispatch CTA */}
        <div className="flex items-center gap-3">
          <PaletteSwitcher />

          {/* Ask AI Twin Button */}
          <button
            onClick={onOpenAgent}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121625] hover:bg-[#181d30] border text-xs font-mono-custom tracking-wider transition-all duration-300 cursor-pointer"
            style={{
              borderColor: `${palette.accent}55`,
              color: palette.accentBright,
              boxShadow: `0 0 12px ${palette.accentGlow}`,
            }}
          >
            <Bot className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span className="hidden sm:inline font-bold">Ask AI Twin</span>
          </button>

          {/* Primary Dispatch CTA (Matching Kingston's orange button in top right!) */}
          <button
            onClick={() => onSelectStation(7)}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r ${palette.gradient} text-white text-xs font-mono-custom font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105 cursor-pointer`}
            style={{ boxShadow: `0 0 15px ${palette.accentGlow}` }}
          >
            <span>DISPATCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden fixed top-20 left-4 right-4 luxury-card rounded-3xl p-5 border border-white/10 bg-[#0c101d] pointer-events-auto z-50 flex flex-col gap-2.5 shadow-2xl max-h-[75vh] overflow-y-auto"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onSelectStation(item.index);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-xl text-sm font-mono-custom ${
                  item.index === activeStationIndex
                    ? "bg-white/10 text-white font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-[#121625] border text-xs font-mono-custom font-bold flex items-center justify-center gap-2"
              style={{
                borderColor: palette.accent,
                color: palette.accentBright,
              }}
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Twin</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
