"use client";

import { useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCopy } from "./language-provider";

export function Header() {
  const { site, ui, locale } = useCopy();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <header className="site-header container" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
    <a className="brand" href="#top" aria-label={ui.home}>{site.name}</a>
    <nav className="desktop-nav" aria-label={ui.navigation}>
      {site.navigation.map(link => <a key={link.href} className="link-muted" href={link.href}>{link.label}</a>)}
    </nav>
    <div className="header-actions">
      <a className="header-email link-muted" href={`mailto:${site.email}`}>{site.email}</a>
      <a className="language-button" href={locale === "ru" ? "/en/" : "/"} hrefLang={locale === "ru" ? "en" : "ru"} aria-label={ui.switchLanguage} title={ui.switchLanguage}>{locale.toUpperCase()}<ChevronDown size={14} aria-hidden="true" /></a>
      <button ref={menuButton} className="menu-button button button-secondary button-icon" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? ui.closeMenu : ui.openMenu} onClick={() => setOpen(!open)}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button>
    </div>
    <nav className="mobile-nav" id="mobile-navigation" aria-label={ui.mobileNavigation} hidden={!open}>
      {site.navigation.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="link-muted" href={`mailto:${site.email}`}>{site.email}</a>
    </nav>
  </header>;
}
