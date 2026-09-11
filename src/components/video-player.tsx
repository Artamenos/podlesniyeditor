"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { Film } from "lucide-react";
import type { VideoItem } from "@/data/content";

const VideoContext = createContext<{ activeId: string | null; play: (id: string) => void } | null>(null);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [activeId, play] = useState<string | null>(null);
  const value = useMemo(() => ({ activeId, play }), [activeId]);
  return <VideoContext value={value}>{children}</VideoContext>;
}

function Player({ item }: { item: VideoItem }) {
  const [failed, setFailed] = useState(false);
  const source = item.source;
  if (!source || failed) return <div className="player-empty"><Film size={32} aria-hidden="true" /><p>Не удалось загрузить видео</p><span>Попробуйте обновить страницу.</span></div>;
  if (source.kind === "youtube") {
    if (!/^[\w-]{11}$/.test(source.id)) return <p>Ссылка на видео недоступна.</p>;
    return <iframe src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&playsinline=1&rel=0`} title={item.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />;
  }
  return <video controls playsInline autoPlay preload="metadata" poster={item.poster ?? undefined} onError={() => setFailed(true)}>
    <source src={source.src} type={source.type} />
    {source.captions && <track kind="captions" src={source.captions.src} srcLang={source.captions.language} label={source.captions.label} default />}
    Ваш браузер не поддерживает воспроизведение видео.
  </video>;
}

export function InlineVideo({ item, children, hero = false }: { item: VideoItem; children: ReactNode; hero?: boolean }) {
  const playback = useContext(VideoContext);
  const container = useRef<HTMLDivElement>(null);
  if (!playback) throw new Error("InlineVideo must be inside VideoProvider");
  const active = playback.activeId === item.id;
  const start = () => {
    playback.play(item.id);
    requestAnimationFrame(() => container.current?.querySelector<HTMLElement>("iframe, video")?.focus({ preventScroll: true }));
  };
  return <div ref={container} className="inline-video">
    {active ? <div className={`inline-player ${item.orientation === "portrait" ? "portrait-media" : "landscape-media"} ${hero ? "showreel-player" : ""}`}><Player item={item} /></div>
      : item.source ? <button className="media-trigger" type="button" onClick={start} aria-label={hero ? "Смотреть шоурил" : `Смотреть: ${item.title}`}>{children}</button>
      : <div role="img" aria-label={`Место для видео: ${item.title}`}>{children}</div>}
  </div>;
}
