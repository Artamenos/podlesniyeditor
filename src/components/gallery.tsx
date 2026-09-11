"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { shorts, works, type ShortCategory, type WorkCategory } from "@/data/content";
import { Carousel } from "./carousel";
import { VideoCard } from "./video-card";

export function WorkGallery() {
  const [category, setCategory] = useState<WorkCategory | "Все работы">("Все работы");
  const [limit, setLimit] = useState(6);
  const filtered = works.filter(item => category === "Все работы" || item.category === category);
  return <>
    <div className="filters" role="group" aria-label="Категории работ">{(["Все работы", "YouTube", "Реклама", "Подкасты"] as const).map(name => <button type="button" key={name} className={`button ${category === name ? "button-primary" : "button-secondary"}`} aria-pressed={category === name} onClick={() => { setCategory(name); setLimit(6); }}>{name}</button>)}</div>
    <p className="sr-only" role="status">Показано {Math.min(limit, filtered.length)} из {filtered.length} работ</p>
    <div className="work-grid">{filtered.slice(0, limit).map((item, index) => <VideoCard key={item.id} item={item} index={index} />)}</div>
    {limit < filtered.length && <div className="load-more"><button className="button button-secondary" type="button" onClick={() => setLimit(limit + 6)}>Показать ещё<ArrowDown size={16} aria-hidden="true" /></button></div>}
  </>;
}
export function ShortsGallery() {
  const [category, setCategory] = useState<ShortCategory | "Все">("Все");
  const filtered = shorts.filter(item => category === "Все" || item.category === category);
  return <>
    <p className="sr-only" role="status">{filtered.length} вертикальных видео</p>
    <Carousel key={category} className="shorts" label="Вертикальные видео" count={filtered.length} toolbar={<div className="filters" role="group" aria-label="Категории вертикальных видео">{(["Все", "Shorts", "Reels"] as const).map(name => <button type="button" key={name} className={`button ${category === name ? "button-primary" : "button-secondary"}`} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}</div>}>
      {filtered.map((item, index) => <VideoCard key={item.id} item={item} index={index} />)}
    </Carousel>
  </>;
}
