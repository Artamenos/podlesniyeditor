"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe2, Menu, X } from "lucide-react";
import { useCopy } from "./language-provider";

export function Header() {
  const { site, ui } = useCopy();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <header className="site-header container" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
    <a className="brand" href="#top" aria-label={ui.home}>{site.name}</a>
    <nav className="desktop-nav" aria-label={ui.navigation}>
      {site.navigation.map(link => <a key={link.href} className="link-muted" href={link.href}>{link.label}</a>)}
    </nav>
    <div className="header-actions">
      <a className="header-email link-muted" href={`mailto:${site.email}`}>{site.email}</a>
      <LanguageMenu />
      <button ref={menuButton} className="menu-button button button-secondary button-icon" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? ui.closeMenu : ui.openMenu} onClick={() => setOpen(!open)}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
    </div>
    <nav className="mobile-nav" id="mobile-navigation" aria-label={ui.mobileNavigation} hidden={!open}>
      {site.navigation.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="link-muted" href={`mailto:${site.email}`}>{site.email}</a>
    </nav>
  </header>;
}

function LanguageMenu() {
  const { locale, ui } = useCopy();
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (menu.current && event.target instanceof Node && !menu.current.contains(event.target)) menu.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  return <details className="language-picker" ref={menu}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }}
    onKeyDown={event => {
      if (event.key === "Escape" && event.currentTarget.open) {
        event.preventDefault(); event.stopPropagation(); event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}>
    <summary className="language-button" aria-label={ui.switchLanguage}><Globe2 size={16} aria-hidden="true" />{locale.toUpperCase()}</summary>
    <nav className="language-options" aria-label={ui.switchLanguage}>
      {[{ code: "ru", name: "Русский", href: "/" }, { code: "en", name: "English", href: "/en/" }].map(language =>
        <a className="language-option" key={language.code} href={language.href} hrefLang={language.code} lang={language.code} aria-current={locale === language.code ? "page" : undefined}>
          <span>{language.name}</span>{locale === language.code && <Check size={16} aria-hidden="true" />}
        </a>)}
    </nav>
  </details>;
}
