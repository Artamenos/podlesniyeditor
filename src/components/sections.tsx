import Image from "next/image";
import { ArrowUp, ArrowUpRight, UserRound } from "lucide-react";
import { about, reviews, site } from "@/data/content";
import { SectionHeading, TextLines } from "./ui";
import { Carousel } from "./carousel";

export function About() {
  return <section className="section about-section" id="about" aria-labelledby="about-title">
    <div className="glow about-glow" aria-hidden="true" /><div className="container section-rule">
      <div className="about-grid"><div className="about-copy">
        <SectionHeading id="about-title" label="03 / ОБО МНЕ" title="О себе" /><h3>{site.name}</h3>
        {about.text ? <div className="about-description">{about.text.split("\n").map((paragraph, index) => <p className={index === 0 ? "about-intro" : undefined} key={paragraph}>{paragraph}</p>)}</div> : <div className="about-description"><p>Здесь будет несколько слов обо мне, моём подходе к монтажу и работе с проектами.</p><TextLines lines={2} /></div>}
        <a className="button button-primary" href="#contact">Обсудить проект<ArrowUpRight size={18} aria-hidden="true" /></a>
      </div><div className="portrait-placeholder"><Image src="/media/alexey.jpg" alt="Алексей — видеомонтажёр" fill sizes="(max-width: 599px) 350px, 412px" className="portrait-photo" /></div></div>
      <div className="about-details">{[{ title: "Навыки", items: about.skills }, { title: "Инструменты", items: about.tools }, { title: "Платформы", items: about.platforms }].map((detail, index) => <div key={detail.title}><h3><span>{String(index + 1).padStart(2, "0")}</span>{detail.title}</h3>{detail.items.length ? <ul className="about-icons" aria-label={detail.title}>{detail.items.map(icon => <li key={icon.name} title={icon.name}><Image src={icon.src} alt={icon.name} width={40} height={40} className="about-icon" /></li>)}</ul> : <TextLines lines={1} />}</div>)}</div>
    </div>
  </section>;
}
export function Reviews() {
  return <section className="section reviews-section" id="reviews" aria-labelledby="reviews-title"><div className="container section-rule">
    <Carousel className="reviews" label="Отзывы" count={reviews.length} toolbar={<SectionHeading id="reviews-title" label="04 / ОБРАТНАЯ СВЯЗЬ" title="Отзывы клиентов" />}>
    {reviews.map(review => <article className="review-card" key={review.id}>
      <span className="quote-mark" aria-hidden="true">“</span>{review.quote ? <blockquote>{review.quote}</blockquote> : <div className="review-placeholder"><p>Здесь будет отзыв о работе</p><TextLines lines={3} /></div>}
      <div className="review-author"><span className="avatar-placeholder">{review.avatar ? <Image src={review.avatar} alt="" width={36} height={36} /> : <UserRound size={18} aria-hidden="true" />}</span><div><p>{review.author ?? "Имя клиента"}</p>{review.detail && <span>{review.detail}</span>}</div>{review.url ? <a href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Источник отзыва ${review.author ?? "клиента"}`}><ArrowUpRight size={18} aria-hidden="true" /></a> : null}</div>
    </article>)}
    </Carousel>
  </div></section>;
}
export function Contact() {
  return <section className="section contact-section" id="contact" aria-labelledby="contact-title">
    <div className="glow contact-glow" data-parallax aria-hidden="true" /><div className="container section-rule">
      <p className="eyebrow contact-label">05 / КОНТАКТЫ</p><div className="contact-grid"><div><h2 className="display" id="contact-title">Обсудим<br />ваш проект?</h2><p className="contact-description">Пишите по любым вопросам — отвечу быстро.</p></div>
      <div className="contact-links"><a className="contact-card" href={`mailto:${site.email}`}><span><span className="eyebrow">ПОЧТА</span><span className="contact-email">{site.email}</span></span><ArrowUpRight size={24} aria-hidden="true" /></a><a className="contact-card telegram-card" href={site.telegram} target="_blank" rel="noopener noreferrer"><span><span className="eyebrow">НАПИСАТЬ</span><span className="contact-telegram">Telegram</span></span><ArrowUpRight size={24} aria-hidden="true" /></a><p>Выберите удобный способ связи</p></div></div>
    </div>
  </section>;
}
export function Footer() {
  return <footer className="site-footer container"><div className="footer-brand"><a className="brand" href="#top">{site.name}</a><p>© {site.name}</p></div><nav aria-label="Навигация в подвале">{site.navigation.slice(0, 3).map(link => <a className="link-muted" key={link.href} href={link.href}>{link.label}</a>)}</nav><a className="back-to-top" href="#top">Наверх<ArrowUp size={16} aria-hidden="true" /></a></footer>;
}
