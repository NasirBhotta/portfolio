"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePortfolioTheme } from "@/context/ThemeContext";

export function CinematicAtmosphericBackdrop() {
  const { palette } = usePortfolioTheme();
  const { scrollYProgress } = useScroll();

  // Multi-layer parallax scroll transforms
  const cloudLayer1X = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const cloudLayer2X = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const codeLayerY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Celestial Horizon Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060a] via-[#070a13] to-[#040509]" />

      {/* 2. Floating Volumetric "Cyber Nebulas" (Engineering version of the sky clouds from the video) */}
      <motion.div
        style={{
          x: cloudLayer1X,
          background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`,
        }}
        className="absolute top-12 -left-20 w-[600px] sm:w-[900px] h-[350px] rounded-full blur-[120px] opacity-25"
      />

      <motion.div
        style={{
          x: cloudLayer2X,
          background: `radial-gradient(circle, #38bdf8 0%, transparent 70%)`,
        }}
        className="absolute bottom-20 -right-20 w-[500px] sm:w-[800px] h-[300px] rounded-full blur-[130px] opacity-20"
      />

      {/* 3. Subtle Horizon Waves / Topological Wireframe Ridge */}
      <div className="absolute bottom-0 left-0 right-0 h-44 opacity-20">
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z"
            fill="url(#horizon-grad)"
          />
          <defs>
            <linearGradient id="horizon-grad" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor={palette.accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#04060a" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Subtle Floating Architectural Grid Nodes (Cyber Matrix) */}
      <motion.div
        style={{ y: codeLayerY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"
      />

      {/* 5. 35mm Analog Cine-Grain Layer */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}