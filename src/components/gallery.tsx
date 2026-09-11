"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import type { ShortCategory, WorkCategory } from "@/data/content";
import { useCopy } from "./language-provider";
import { Carousel } from "./carousel";
import { VideoCard } from "./video-card";

export function WorkGallery() {
  const { works, ui, categories } = useCopy();
  const [category, setCategory] = useState<WorkCategory | "Все работы">("Все работы");
  const [limit, setLimit] = useState(6);
  const filtered = works.filter(item => category === "Все работы" || item.category === category);
  return <>
    <div className="filters" role="group" aria-label={ui.workCategories}>{(["Все работы", "YouTube", "Реклама", "Подкасты"] as const).map(name => <button type="button" key={name} className={`button ${category === name ? "button-primary" : "button-secondary"}`} aria-pressed={category === name} onClick={() => { setCategory(name); setLimit(6); }}>{name === "Все работы" ? ui.allWorks : categories[name]}</button>)}</div>
    <p className="sr-only" role="status">{ui.shown} {Math.min(limit, filtered.length)} {ui.of} {filtered.length} {ui.worksCount}</p>
    <div className="work-grid">{filtered.slice(0, limit).map((item, index) => <VideoCard key={item.id} item={item} index={index} />)}</div>
    {limit < filtered.length && <div className="load-more"><button className="button button-secondary" type="button" onClick={() => setLimit(limit + 6)}>{ui.more}<ArrowDown size={16} aria-hidden="true" /></button></div>}
  </>;
}
export function ShortsGallery() {
  const { shorts, ui } = useCopy();
  const [category, setCategory] = useState<ShortCategory | "Все">("Все");
  const filtered = shorts.filter(item => category === "Все" || item.category === category);
  return <>
    <p className="sr-only" role="status">{filtered.length} {ui.shortsCount}</p>
    <Carousel resetKey={category} className="shorts" label={ui.vertical} count={filtered.length} toolbar={<div className="filters" role="group" aria-label={ui.shortCategories}>{(["Все", "Shorts", "Reels"] as const).map(name => <button type="button" key={name} className={`button ${category === name ? "button-primary" : "button-secondary"}`} aria-pressed={category === name} onClick={() => setCategory(name)}>{name === "Все" ? ui.all : name}</button>)}</div>}>
      {filtered.map((item, index) => <VideoCard key={item.id} item={item} index={index} />)}
    </Carousel>
  </>;
}
