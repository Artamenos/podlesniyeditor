"use client";

import { useEffect } from "react";

export function BackgroundMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    const layers = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let frame = 0;
    const update = () => {
      frame = 0;
      layers.forEach(layer => {
        const offset = preference.matches ? 0 : Math.max(-64, Math.min(64, -(layer.parentElement?.getBoundingClientRect().top ?? 0) * .08));
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); preference.removeEventListener("change", schedule); layers.forEach(layer => { layer.style.transform = ""; }); };
  }, []);
  return null;
}
