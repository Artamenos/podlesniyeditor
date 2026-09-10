import { ArrowUpRight, Film, Play } from "lucide-react";
import type { VideoItem } from "@/data/content";

export function MediaPlaceholder({ item, index = 0, hero = false }: { item: VideoItem; index?: number; hero?: boolean }) {
  return <div className={`media-placeholder ${hero ? "showreel-media" : ""} ${item.orientation === "portrait" ? "portrait-media" : "landscape-media"}`}>
    <div className="media-top"><span>{hero ? "ШОУРИЛ" : String(index + 1).padStart(2, "0")}</span><span>{hero ? "16:9" : ""}</span></div>
    <div className="media-center">{hero ? <span className="button button-primary">Смотреть шоурил<Play size={16} fill="currentColor" aria-hidden="true" /></span> : <span className="play-circle"><Play size={17} fill="currentColor" aria-hidden="true" /></span>}</div>
    <div className="media-bottom"><span>{hero ? "SHOWREEL" : <Film size={17} strokeWidth={1.4} aria-hidden="true" />}</span><span>{item.orientation === "portrait" ? "9:16" : item.duration ?? "--:--"}</span></div>
  </div>;
}
export function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  return <article className="video-card"><MediaPlaceholder item={item} index={index} />
    <div className="video-info"><div><h3>{item.title}</h3><p>{item.category} <span aria-hidden="true">/</span> {item.description}</p></div><ArrowUpRight size={20} aria-hidden="true" /></div>
  </article>;
}
