import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { shorts, showreel, works } from "@/data/content";
import { Header } from "./navigation";
import { SectionHeading, TextLines } from "./ui";
import { MediaPlaceholder, VideoCard } from "./video-card";

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="glow hero-glow" aria-hidden="true" /><div className="glow hero-corner-glow" aria-hidden="true" />
    <Header /><div className="hero-content container">
      <p className="eyebrow">ПОРТФОЛИО / VIDEO EDITOR</p><h1 className="display" id="hero-title">Видеомонтажёр</h1>
      <TextLines className="hero-description" />
      <div className="showreel"><MediaPlaceholder item={showreel} hero /></div>
      <a className="hero-next eyebrow" href="#works">ИЗБРАННЫЕ РАБОТЫ<ArrowDown size={16} aria-hidden="true" /></a>
    </div>
  </section>;
}
export function WorkLibrary() {
  return <section className="section work-section" id="works" aria-labelledby="works-title">
    <div className="glow works-glow" aria-hidden="true" /><div className="container section-rule">
      <SectionHeading id="works-title" label="01 / ПОРТФОЛИО" title="Избранные работы" aside={<p className="eyebrow descriptor">ВИДЕО / 16:9</p>} />
      <div className="filters" aria-label="Категории работ">{["Все работы", "YouTube", "Реклама", "Интервью"].map((category, index) => <span key={category} className={`button ${index === 0 ? "button-primary" : "button-secondary"}`}>{category}</span>)}</div>
      <div className="work-grid">{works.slice(0, 6).map((item, index) => <VideoCard key={item.id} item={item} index={index} />)}</div>
      <div className="load-more"><span className="button button-secondary">Показать ещё<ArrowDown size={16} aria-hidden="true" /></span></div>
    </div>
  </section>;
}
export function ShortsLibrary() {
  return <section className="section shorts-section" id="shorts" aria-labelledby="shorts-title">
    <div className="container section-rule">
      <SectionHeading id="shorts-title" label="02 / ПОРТФОЛИО" title="Вертикальные видео" aside={<p className="eyebrow descriptor">SHORTS / REELS</p>} />
      <div className="carousel-toolbar"><div className="filters">{["Все", "Shorts", "Reels"].map((category, index) => <span key={category} className={`button ${index === 0 ? "button-primary" : "button-secondary"}`}>{category}</span>)}</div><div className="carousel-controls"><span className="button button-secondary button-icon"><ArrowLeft size={18} /></span><span className="button button-primary button-icon"><ArrowRight size={18} /></span></div></div>
      <div className="carousel-track shorts-track" tabIndex={0} aria-label="Вертикальные видео — прокрутите вправо">{shorts.map((item, index) => <VideoCard key={item.id} item={item} index={index} />)}</div>
      <div className="carousel-footer"><div className="carousel-progress"><span /></div><span className="eyebrow">ЛИСТАЙТЕ <ArrowRight size={16} aria-hidden="true" /></span></div>
    </div>
  </section>;
}
