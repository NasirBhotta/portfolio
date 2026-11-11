"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface CinematicFloatingTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

export function CinematicFloatingTrigger({ onClick, isOpen }: CinematicFloatingTriggerProps) {
  if (isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 240, damping: 20 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3.5 px-4 py-3 rounded-full bg-[#0c0c0f]/90 backdrop-blur-xl border border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 cursor-pointer text-white"
        aria-label="Open AI HUD Copilot"
      >
        {/* Glow halo */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3c86b] opacity-25 group-hover:opacity-75 blur-sm transition duration-300 -z-10" />

        <div className="relative w-8 h-8 rounded-full bg-[#141418] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
          <Terminal className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]"></span>
          </span>
        </div>

        <div className="flex flex-col text-left pr-1.5">
          <div className="flex items-center gap-1 text-xs font-mono-custom font-bold text-white group-hover:text-[#f3c86b] transition-colors">
            <span>AI COPILOT // HUD</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono-custom tracking-wider">TALK OR TRANSMIT</span>
        </div>
      </button>
    </motion.div>
  );
}

