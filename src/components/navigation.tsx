"use client";

import { useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <header className="site-header container" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
    <a className="brand" href="#top" aria-label="Алексей — на главную">{site.name}</a>
    <nav className="desktop-nav" aria-label="Основная навигация">
      {site.navigation.map(link => <a key={link.href} className="link-muted" href={link.href}>{link.label}</a>)}
    </nav>
    <div className="header-actions">
      <a className="header-email link-muted" href={`mailto:${site.email}`}>{site.email}</a>
      <button className="language-button" type="button" disabled aria-label="Язык: русский. Английская версия появится позже.">RU<ChevronDown size={14} aria-hidden="true" /></button>
      <button ref={menuButton} className="menu-button button button-secondary button-icon" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
    </div>
    <nav className="mobile-nav" id="mobile-navigation" aria-label="Мобильная навигация" hidden={!open}>
      {site.navigation.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="link-muted" href={`mailto:${site.email}`}>{site.email}</a>
    </nav>
  </header>;
}
