"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PaletteId = "indigo" | "emerald" | "cyan" | "crimson" | "titanium";

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  dotColor: string;
  bgDark: string;
  surface: string;
  accent: string;
  accentBright: string;
  accentGlow: string;
  gradient: string;
}

export const PALETTES: Record<PaletteId, PaletteConfig> = {
  indigo: {
    id: "indigo",
    name: "Linear Indigo",
    dotColor: "#6366f1",
    bgDark: "#06070b",
    surface: "#0f121d",
    accent: "#6366f1",
    accentBright: "#818cf8",
    accentGlow: "rgba(99, 102, 241, 0.28)",
    gradient: "from-[#6366f1] via-[#818cf8] to-[#4f46e5]",
  },
  emerald: {
    id: "emerald",
    name: "Supabase Emerald",
    dotColor: "#10b981",
    bgDark: "#040605",
    surface: "#0a110d",
    accent: "#10b981",
    accentBright: "#34d399",
    accentGlow: "rgba(16, 185, 129, 0.28)",
    gradient: "from-[#10b981] via-[#34d399] to-[#059669]",
  },
  cyan: {
    id: "cyan",
    name: "Electric Ice",
    dotColor: "#00f2fe",
    bgDark: "#04070d",
    surface: "#0b1220",
    accent: "#00f2fe",
    accentBright: "#70ffff",
    accentGlow: "rgba(0, 242, 254, 0.28)",
    gradient: "from-[#00f2fe] via-[#70ffff] to-[#38bdf8]",
  },
  crimson: {
    id: "crimson",
    name: "Solar Crimson",
    dotColor: "#ff4d6d",
    bgDark: "#080506",
    surface: "#140b0e",
    accent: "#ff4d6d",
    accentBright: "#ff758f",
    accentGlow: "rgba(255, 77, 109, 0.28)",
    gradient: "from-[#ff4d6d] via-[#ff758f] to-[#e63946]",
  },
  titanium: {
    id: "titanium",
    name: "Monochrome Platinum",
    dotColor: "#e2e8f0",
    bgDark: "#050505",
    surface: "#121214",
    accent: "#ffffff",
    accentBright: "#e2e8f0",
    accentGlow: "rgba(255, 255, 255, 0.22)",
    gradient: "from-[#ffffff] via-[#e2e8f0] to-[#94a3b8]",
  },
};

interface ThemeContextType {
  palette: PaletteConfig;
  setPalette: (id: PaletteId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  palette: PALETTES.indigo,
  setPalette: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentId, setCurrentId] = useState<PaletteId>("indigo");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_palette") as PaletteId;
    if (saved && PALETTES[saved]) {
      setCurrentId(saved);
    }
  }, []);

  const handleSetPalette = (id: PaletteId) => {
    setCurrentId(id);
    localStorage.setItem("portfolio_palette", id);
    const p = PALETTES[id];
    document.documentElement.style.setProperty("--theme-accent", p.accent);
    document.documentElement.style.setProperty("--theme-accent-bright", p.accentBright);
    document.documentElement.style.setProperty("--theme-accent-glow", p.accentGlow);
    document.documentElement.style.setProperty("--theme-bg", p.bgDark);
    document.documentElement.style.setProperty("--theme-surface", p.surface);
  };

  return (
    <ThemeContext.Provider value={{ palette: PALETTES[currentId], setPalette: handleSetPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  return useContext(ThemeContext);
}

