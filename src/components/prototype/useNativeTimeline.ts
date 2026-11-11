"use client";

import { useEffect, type RefObject } from "react";
import { sceneAt } from "./timeline";

/** Only the product cross-section moves. Links, text, and document scrolling stay native. */
export function useNativeTimeline(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const figure = root.querySelector<HTMLElement>("figure");
    const hero = root.querySelector<HTMLElement>("#interface");
    if (!figure || !hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 650px)");
    const mobile = window.matchMedia("(max-width: 800px)");
    let frame = 0;
    let start = 0;
    let distance = 1;
    let disposed = false;
    let previousSpread: number | undefined;

    const paint = () => {
      frame = 0;
      if (reduced.matches) return;
      const { spread } = sceneAt((window.scrollY - start) / distance);
      if (spread !== previousSpread) {
        root.style.setProperty("--spread", String(spread));
        previousSpread = spread;
      }
    };
    const queue = () => { if (!frame && !reduced.matches) frame = requestAnimationFrame(paint); };
    const measure = () => {
      root.dataset.motion = reduced.matches ? "static" : "scroll";
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousSpread = undefined;
        root.style.removeProperty("--spread");
        return;
      }
      if (mobile.matches) {
        start = figure.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.72;
        distance = Math.max(1, window.innerHeight * 0.5);
      } else {
        start = root.getBoundingClientRect().top + window.scrollY + 80;
        distance = Math.max(1, hero.offsetHeight * 0.72);
      }
      queue();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(figure);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    reduced.addEventListener("change", measure);
    mobile.addEventListener("change", measure);
    measure();
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      reduced.removeEventListener("change", measure);
      mobile.removeEventListener("change", measure);
    };
  }, [rootRef]);
}
