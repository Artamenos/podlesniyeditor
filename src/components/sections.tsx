import Image from "next/image";
import { ArrowUp, ArrowUpRight, CodeXml, Mail, PanelsTopLeft, Send, UserRound, Wrench } from "lucide-react";
import type { SiteCopy } from "@/data/translations";
import { SectionHeading, TextLines } from "./ui";
import { Carousel } from "./carousel";

export function About({ copy }: { copy: SiteCopy }) {
  const { about, site, ui } = copy;
  return <section className="section about-section" id="about" aria-labelledby="about-title">
    <div className="glow about-glow" aria-hidden="true" /><div className="container section-rule">
      <div className="about-grid"><div className="about-copy">
        <SectionHeading id="about-title" label={`03 / ${ui.aboutLabel}`} title={ui.aboutTitle} /><h3>{site.name}</h3>
        {about.text ? <div className="about-description">{about.text.split("\n").map((paragraph, index) => <p className={index === 0 ? "about-intro" : undefined} key={paragraph}>{paragraph}</p>)}</div> : <div className="about-description"><p>{ui.aboutPlaceholder}</p><TextLines lines={2} /></div>}
        <a className="button button-primary" href="#contact">{ui.discuss}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </div><div className="portrait-placeholder">{about.portrait ? <Image src={about.portrait} alt={ui.portrait} fill sizes="(max-width: 599px) 350px, 412px" className="portrait-photo" /> : null}</div></div>
      <div className="about-details">{[{ title: ui.skills, items: about.skills, Icon: CodeXml }, { title: ui.tools, items: about.tools, Icon: Wrench }, { title: ui.platforms, items: about.platforms, Icon: PanelsTopLeft }].map(({ title, items, Icon }) => <div key={title}><h3><Icon size={18} strokeWidth={1.6} aria-hidden="true" />{title}</h3>{items.length ? <ul className="about-icons" aria-label={title}>{items.map(icon => <li key={icon.name} title={icon.name}><Image src={icon.src} alt={icon.name} width={40} height={40} className="about-icon" /></li>)}</ul> : <TextLines lines={1} />}</div>)}</div>
    </div>
  </section>;
}
export function Reviews({ copy }: { copy: SiteCopy }) {
  const { reviews, ui } = copy;
  return <section className="section reviews-section" id="reviews" aria-labelledby="reviews-title"><div className="container section-rule">
    <Carousel className="reviews" label={ui.reviews} count={reviews.length} toolbar={<SectionHeading id="reviews-title" label={`04 / ${ui.reviewsLabel}`} title={ui.reviewsTitle} />}>
    {reviews.map(review => <article className="review-card" key={review.id}>
      <span className="quote-mark" aria-hidden="true">“</span>{review.quote ? <blockquote>{review.quote}</blockquote> : <div className="review-placeholder"><p>{ui.reviewPlaceholder}</p><TextLines lines={3} /></div>}
      <div className="review-author"><span className="avatar-placeholder">{review.avatar ? <Image src={review.avatar} alt="" width={36} height={36} /> : <UserRound size={18} aria-hidden="true" />}</span><div><p>{review.author ?? ui.client}</p>{review.detail && <span>{review.detail}</span>}</div>{review.url ? <a href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`${ui.reviewSource}: ${review.author ?? ui.client}`}><ArrowUpRight size={18} aria-hidden="true" /></a> : null}</div>
    </article>)}
    </Carousel>
  </div></section>;
}
export function Contact({ copy }: { copy: SiteCopy }) {
  const { site, ui } = copy;
  return <section className="section contact-section" id="contact" aria-labelledby="contact-title">
    <div className="glow contact-glow" data-parallax aria-hidden="true" /><div className="container section-rule">
      <p className="eyebrow contact-label">{`05 / ${ui.contactLabel}`}</p><div className="contact-grid"><div><h2 className="display" id="contact-title">{ui.contactLine1}<br />{ui.contactLine2}</h2><p className="contact-description">{ui.contactDescription}</p></div>
      <div className="contact-links"><a className="contact-card" href={`mailto:${site.email}`}><span><span className="eyebrow">{ui.email}</span><span className="contact-email">{site.email}</span></span><Mail size={24} strokeWidth={1.7} aria-hidden="true" /></a><a className="contact-card telegram-card" href={site.telegram} target="_blank" rel="noopener noreferrer"><span><span className="eyebrow">{ui.write}</span><span className="contact-telegram">Telegram</span></span><Send size={24} strokeWidth={1.7} aria-hidden="true" /></a><p>{ui.contactHint}</p></div></div>
    </div>
  </section>;
}
export function Footer({ copy }: { copy: SiteCopy }) {
  const { site, ui } = copy;
  return <footer className="site-footer container"><div className="footer-brand"><a className="brand" href="#top">{site.name}</a><p>© {site.name}</p></div><nav aria-label={ui.footerNavigation}>{site.navigation.slice(0, 3).map(link => <a className="link-muted" key={link.href} href={link.href}>{link.label}</a>)}</nav><a className="back-to-top" href="#top">{ui.top}<ArrowUp size={16} aria-hidden="true" /></a></footer>;
}
