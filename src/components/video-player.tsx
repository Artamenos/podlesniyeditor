"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { Film } from "lucide-react";
import type { VideoItem } from "@/data/content";
import { useCopy } from "./language-provider";

const VideoContext = createContext<{ activeId: string | null; play: (id: string) => void } | null>(null);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [activeId, play] = useState<string | null>(null);
  const value = useMemo(() => ({ activeId, play }), [activeId]);
  return <VideoContext value={value}>{children}</VideoContext>;
}

function Player({ item }: { item: VideoItem }) {
  const { ui, locale } = useCopy();
  const [failed, setFailed] = useState(false);
  const source = item.source;
  if (!source || failed) return <div className="player-empty"><Film size={32} aria-hidden="true" /><p>{ui.videoError}</p><span>{ui.retry}</span></div>;
  if (source.kind === "youtube") {
    if (!/^[\w-]{11}$/.test(source.id)) return <p>{ui.invalidVideo}</p>;
    return <iframe src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&playsinline=1&rel=0&hl=${locale}`} title={item.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />;
  }
  return <video controls playsInline autoPlay preload="metadata" poster={item.poster ?? undefined} onError={() => setFailed(true)}>
    <source src={source.src} type={source.type} />
    {source.captions && <track kind="captions" src={source.captions.src} srcLang={source.captions.language} label={source.captions.label} default />}
    {ui.unsupportedVideo}
  </video>;
}

export function InlineVideo({ item, children, hero = false }: { item: VideoItem; children: ReactNode; hero?: boolean }) {
  const { ui } = useCopy();
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
      : item.source ? <button className="media-trigger" type="button" onClick={start} aria-label={hero ? ui.watchShowreel : `${ui.watch}: ${item.title}`}>{children}</button>
      : <div role="img" aria-label={`${ui.videoPlaceholder}: ${item.title}`}>{children}</div>}
  </div>;
}
