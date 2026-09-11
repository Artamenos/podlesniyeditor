import { ArrowDown } from "lucide-react";
import type { SiteCopy } from "@/data/translations";
import { Header } from "./navigation";
import { SectionHeading } from "./ui";
import { Showreel } from "./video-card";
import { ShortsGallery, WorkGallery } from "./gallery";

export function Hero({ copy }: { copy: SiteCopy }) {
  const { site, showreel, ui } = copy;
  return <section className="hero" aria-labelledby="hero-title">
    <div className="glow hero-glow" data-parallax aria-hidden="true" /><div className="glow hero-corner-glow" aria-hidden="true" />
    <Header /><div className="hero-content container">
      <p className="eyebrow">{ui.heroLabel}</p><h1 className="display" id="hero-title">{ui.profession}</h1>
      <p className="hero-description">{site.tagline}</p>
      <a className="hero-mobile-contact link-muted" href={`mailto:${site.email}`}>{site.email}</a>
      <div className="showreel"><Showreel item={showreel} /></div>
      <a className="hero-next eyebrow" href="#works">{ui.selected.toUpperCase()}<ArrowDown size={16} aria-hidden="true" /></a>
    </div>
  </section>;
}
export function WorkLibrary({ copy }: { copy: SiteCopy }) {
  const { ui } = copy;
  return <section className="section work-section" id="works" aria-labelledby="works-title">
    <div className="glow works-glow" aria-hidden="true" /><div className="container section-rule">
      <SectionHeading id="works-title" label={`01 / ${ui.portfolioLabel}`} title={ui.selected} aside={<p className="eyebrow descriptor">{ui.videoLabel}</p>} />
      <WorkGallery />
    </div>
  </section>;
}
export function ShortsLibrary({ copy }: { copy: SiteCopy }) {
  const { ui } = copy;
  return <section className="section shorts-section" id="shorts" aria-labelledby="shorts-title">
    <div className="container section-rule">
      <SectionHeading id="shorts-title" label={`02 / ${ui.portfolioLabel}`} title={ui.vertical} aside={<p className="eyebrow descriptor">SHORTS / REELS</p>} />
      <ShortsGallery />
    </div>
  </section>;
}
