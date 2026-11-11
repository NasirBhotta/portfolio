"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { usePortfolioTheme } from "@/context/ThemeContext";

interface AutonomousAgentTravelerProps {
  currentStation: number;
  totalStations: number;
}

export function AutonomousAgentTraveler({ currentStation, totalStations }: AutonomousAgentTravelerProps) {
  const { palette } = usePortfolioTheme();
  const { scrollYProgress } = useScroll();

  // Smooth physics-based spring for traveler position
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
  });

  // Calculate coordinates across the viewport
  // Moves horizontally from left to right, then slightly descends and turns
  const xPos = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ["8vw", "28vw", "48vw", "32vw", "64vw", "78vw"]);
  const yPos = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ["18vh", "28vh", "22vh", "38vh", "26vh", "32vh"]);
  const rotateAngle = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [4, 12, -8, 14, -6, 2]);

  // Contrail opacity based on movement
  const contrailOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.2, 0.85, 0.85, 0.3]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Dynamic Glowing Energy Contrail (Like the smoke trail in the video!) */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="contrail-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="0" />
            <stop offset="50%" stopColor={palette.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient atmospheric data particles along traveler path */}
        <motion.circle
          cx={xPos}
          cy={yPos}
          r="48"
          fill={palette.accent}
          className="opacity-20 blur-2xl"
        />
      </svg>

      {/* The AI Sentinel / Agent Drone (Replaces airplane from study abroad video) */}
      <motion.div
        style={{
          x: xPos,
          y: yPos,
          rotate: rotateAngle,
        }}
        className="absolute -top-10 -left-16 flex items-center justify-center pointer-events-none"
      >
        {/* Contrail Tail Emitter (Smooth smoke/data stream trailing behind) */}
        <motion.div
          style={{ opacity: contrailOpacity }}
          className="absolute right-full top-1/2 -translate-y-1/2 w-48 sm:w-80 h-3 bg-gradient-to-l from-white/90 via-sky-400/40 to-transparent rounded-full blur-[2px] -mr-3"
        >
          <div
            className="w-full h-full rounded-full animate-pulse"
            style={{
              background: `linear-gradient(to left, ${palette.accentBright}, ${palette.accentGlow}, transparent)`,
            }}
          />
        </motion.div>

        {/* High-Tech Autonomous AI Sentinel Vessel */}
        <div className="relative group">
          {/* Outer Energy Shield Ring */}
          <div
            className="absolute -inset-2 rounded-full blur-md opacity-75 animate-pulse"
            style={{ backgroundColor: palette.accent }}
          />

          {/* Sci-Fi Drone Craft Container */}
          <div className="relative w-20 h-10 sm:w-24 sm:h-12 bg-[#0c101d] border border-white/30 rounded-full px-3 py-1.5 flex items-center justify-between shadow-2xl backdrop-blur-md">
            {/* Front Optical LiDAR Sensor */}
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: palette.accentBright }}
              />
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#ffffff" }}
              />
            </div>

            {/* Drone Core AI Status Monogram */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono-custom font-extrabold text-white tracking-widest uppercase">
                AI // {currentStation + 1}
              </span>
              <span className="text-[7px] font-mono-custom text-slate-400 -mt-0.5">
                AUTONOMOUS
              </span>
            </div>

            {/* Rear Ion Thruster Engine (Luminous Jet Exhaust) */}
            <div className="relative flex items-center">
              <div
                className="w-3.5 h-5 rounded-r-md"
                style={{
                  background: `linear-gradient(90deg, #ffffff, ${palette.accentBright})`,
                  boxShadow: `0 0 15px ${palette.accentBright}`,
                }}
              />
              <span className="w-1.5 h-3 rounded-r-full bg-cyan-200 animate-pulse ml-0.5" />
            </div>
          </div>

          {/* Upper Radar Antenna / Sensor Array */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-2 rounded-t-full border-t-2 border-white/50"
            style={{ borderColor: palette.accentBright }}
          />

          {/* Under-Wing Scanning Cone Beam */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-28 h-20 opacity-20 pointer-events-none"
            style={{
              background: `polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)`,
              backgroundClip: "content-box",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
