"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { usePortfolioTheme, PALETTES, PaletteId } from "@/context/ThemeContext";

export function PaletteSwitcher() {
  const { palette, setPalette } = usePortfolioTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono-custom text-slate-300 hover:text-white transition-all cursor-pointer"
        title="Change Visual Theme"
      >
        <span
          className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: palette.accent, color: palette.accent }}
        />
        <span className="hidden sm:inline text-[11px] font-bold">{palette.name}</span>
        <Palette className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 w-56 p-2 rounded-2xl bg-[#0d0f17]/95 border border-white/10 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1"
          >
            <div className="px-3 py-1.5 text-[10px] font-mono-custom uppercase tracking-wider text-slate-400 border-b border-white/[0.06]">
              SELECT AESTHETIC PALETTE //
            </div>

            {(Object.keys(PALETTES) as PaletteId[]).map((key) => {
              const p = PALETTES[key];
              const isSelected = palette.id === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setPalette(key);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono-custom transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.08] text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: p.dotColor,
                        boxShadow: isSelected ? `0 0 10px ${p.dotColor}` : "none",
                      }}
                    />
                    <span>{p.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

