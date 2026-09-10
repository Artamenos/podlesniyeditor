"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Film, X } from "lucide-react";
import type { VideoItem } from "@/data/content";

const VideoContext = createContext<((item: VideoItem) => void) | null>(null);

export function useVideo() {
  const open = useContext(VideoContext);
  if (!open) throw new Error("Video controls must be inside VideoProvider");
  return open;
}

function Player({ item }: { item: VideoItem }) {
  const [failed, setFailed] = useState(false);
  const source = item.source;
  if (!source || failed) return <div className="player-empty"><Film size={40} strokeWidth={1} aria-hidden="true" /><p>{failed ? "Не удалось загрузить видео" : "Видео скоро появится"}</p><span>{failed ? "Попробуйте открыть ролик ещё раз." : "Пока здесь место для будущей работы."}</span></div>;
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

export function VideoProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected || !dialog.current) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => { node.close(); document.body.style.overflow = previousOverflow; };
  }, [selected]);
  return <VideoContext value={setSelected}>{children}
    {selected && <dialog ref={dialog} className={`video-dialog ${selected.orientation === "portrait" ? "vertical-dialog" : ""}`} aria-labelledby="video-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-content">
        <div className="dialog-heading"><p className="eyebrow">{selected.category} / {selected.orientation === "portrait" ? "9:16" : "16:9"}</p><button className="button button-secondary button-icon" type="button" aria-label="Закрыть видео" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button></div>
        <div className="player-frame"><Player key={selected.id} item={selected} /></div>
        <div className="dialog-info"><h2 id="video-dialog-title">{selected.title}</h2><p>{selected.description}</p>{selected.source?.kind === "youtube" && <a href={`https://www.youtube.com/watch?v=${selected.source.id}`} target="_blank" rel="noopener noreferrer" className="youtube-fallback">Открыть на YouTube<ArrowUpRight size={16} aria-hidden="true" /></a>}</div>
      </div>
    </dialog>}
  </VideoContext>;
}
