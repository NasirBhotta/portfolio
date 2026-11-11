"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioTheme } from "@/context/ThemeContext";

export function CinematicAtmosphere() {
  const { palette } = usePortfolioTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      spotlightRef.current.style.transform = `translate(${x - 350}px, ${y - 350}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    const particleCount = 35;
    const dust = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.4,
      speedY: -(Math.random() * 0.2 + 0.05),
      speedX: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.y += d.speedY;
        d.x += d.speedX;
        d.pulse += 0.015;

        if (d.y < 0) d.y = h;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;

        const currentAlpha = d.alpha * (0.6 + 0.4 * Math.sin(d.pulse));
        ctx.fillStyle = palette.accent;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [palette]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deepest Obsidian Canvas */}
      <div className="absolute inset-0 bg-[#06070b]" />

      {/* 2. Cursor Torch Spotlight (Dynamic Light Follower) */}
      <div
        ref={spotlightRef}
        style={{
          background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
        }}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-2xl transition-transform duration-75 ease-out will-change-transform"
      />

      {/* 3. Static Ambient Vignette Orbs */}
      <div
        style={{
          background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
        }}
        className="absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full blur-3xl opacity-40"
      />
      <div
        style={{
          background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
        }}
        className="absolute top-1/2 -left-48 w-[700px] h-[700px] rounded-full blur-3xl opacity-30"
      />

      {/* 4. Film Grain Texture */}
      <div className="absolute inset-0 film-grain" />

      {/* 5. Floating Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* 6. Cinematic Screen Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(6,7,11,0.85)_100%)]" />
    </div>
  );
}
