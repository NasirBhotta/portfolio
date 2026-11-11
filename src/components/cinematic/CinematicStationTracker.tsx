"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolioTheme } from "@/context/ThemeContext";

export interface StationItem {
  id: string;
  code: string;
  name: string;
  category: string;
}

interface CinematicStationTrackerProps {
  stations: StationItem[];
  activeStationIndex: number;
  onSelectStation: (index: number) => void;
}

export function CinematicStationTracker({
  stations,
  activeStationIndex,
  onSelectStation,
}: CinematicStationTrackerProps) {
  const { palette } = usePortfolioTheme();

  const progressPercentage = (activeStationIndex / (stations.length - 1)) * 100;

  return (
    <>
      {/* 1. Bottom Horizontal Waypoint Tracker Bar (Exact replica of video's bottom station slider!) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl pointer-events-auto">
        <div className="luxury-card rounded-full px-4 sm:px-8 py-3.5 border border-white/[0.12] bg-[#0c101d]/90 backdrop-blur-xl shadow-2xl flex items-center justify-between relative overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${palette.accentGlow} 0%, transparent 80%)`,
            }}
          />

          {/* Connected Waypoint Stations */}
          <div className="relative w-full flex items-center justify-between">
            {/* The Horizontal Line Track Behind the Stations */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] bg-white/[0.08] rounded-full">
              {/* Active Glowing Progress Fill */}
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: `linear-gradient(90deg, ${palette.accent}, ${palette.accentBright})`,
                  boxShadow: `0 0 12px ${palette.accentGlow}`,
                }}
              />
            </div>

            {/* Station Points / Nodes */}
            {stations.map((station, index) => {
              const isActive = index === activeStationIndex;
              const isPast = index <= activeStationIndex;

              return (
                <button
                  key={station.id}
                  onClick={() => onSelectStation(index)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  {/* Waypoint Dot */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.35 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center ${
                      isActive
                        ? "border-white bg-white shadow-lg"
                        : isPast
                        ? "bg-slate-200 border-white/60"
                        : "bg-[#111422] border-white/20 group-hover:border-white/50"
                    }`}
                    style={{
                      backgroundColor: isActive ? palette.accentBright : undefined,
                      borderColor: isActive ? "#ffffff" : undefined,
                      boxShadow: isActive ? `0 0 15px ${palette.accentBright}` : "none",
                    }}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    )}
                  </motion.div>

                  {/* Waypoint Label */}
                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-mono-custom font-bold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-white scale-105"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                    style={{
                      color: isActive ? palette.accentBright : undefined,
                    }}
                  >
                    {station.code}
                  </span>

                  {/* Desktop Category Sub-label */}
                  <span className="hidden md:block text-[8px] font-mono-custom text-slate-400 opacity-80 -mt-0.5">
                    {station.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Floating Right-Side Vertical Waypoint Capsule (Matching vertical pagination pill in video!) */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center pointer-events-auto">
        <div className="luxury-card rounded-full py-4 px-2 border border-white/[0.12] bg-[#0c101d]/85 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-3">
          {stations.map((station, index) => {
            const isActive = index === activeStationIndex;

            return (
              <button
                key={station.id}
                onClick={() => onSelectStation(index)}
                aria-label={`Go to ${station.name}`}
                className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              >
                {/* Tooltip on Hover */}
                <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#0c101d] text-white text-[10px] font-mono-custom font-bold uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
                  {station.name}
                </span>

                {/* Dot */}
                <motion.div
                  animate={{
                    height: isActive ? 18 : 6,
                    backgroundColor: isActive ? palette.accentBright : "rgba(255,255,255,0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-1.5 rounded-full"
                  style={{
                    boxShadow: isActive ? `0 0 10px ${palette.accentGlow}` : "none",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
