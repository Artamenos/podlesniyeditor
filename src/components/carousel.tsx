"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Carousel({ children, toolbar, label, className, count }: { children: ReactNode; toolbar?: ReactNode; label: string; className: string; count: number }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false, progress: 0, visible: 1 });
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => {
      const max = node.scrollWidth - node.clientWidth;
      setPosition({ start: node.scrollLeft < 2, end: node.scrollLeft >= max - 2, progress: max > 0 ? node.scrollLeft / max : 0, visible: Math.min(1, node.clientWidth / Math.max(1, node.scrollWidth)) });
    };
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); node.removeEventListener("scroll", update); };
  }, [count]);
  const move = (direction: number) => {
    const node = track.current;
    if (!node) return;
    const step = (node.firstElementChild?.getBoundingClientRect().width ?? node.clientWidth) + 24;
    node.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <div className={`carousel ${className}`}>
    <div className="carousel-toolbar">{toolbar ?? <span className="sr-only">{label}</span>}<div className="carousel-controls">
      <button className="button button-secondary button-icon" type="button" aria-label={`${label}: назад`} disabled={position.start} onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
      <button className="button button-primary button-icon" type="button" aria-label={`${label}: вперёд`} disabled={position.end} onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button>
    </div></div>
    <div ref={track} className={`carousel-track ${className}-track`} tabIndex={0} role="region" aria-label={label} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>{children}</div>
    <div className="carousel-footer" aria-hidden="true"><div className="carousel-progress"><span style={{ width: `${position.visible * 100}%`, marginLeft: `${position.progress * (1 - position.visible) * 100}%` }} /></div><span className="eyebrow">{position.start && position.end ? "ОТЗЫВЫ КЛИЕНТОВ" : "ЛИСТАЙТЕ"}<ArrowRight size={16} /></span></div>
  </div>;
}
