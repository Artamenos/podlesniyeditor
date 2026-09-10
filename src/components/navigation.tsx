import { ChevronDown } from "lucide-react";
import { site } from "@/data/content";

export function Header() {
  return <header className="site-header container">
    <a className="brand" href="#top" aria-label="Алексей — на главную">{site.name}</a>
    <nav className="desktop-nav" aria-label="Основная навигация">
      {site.navigation.map(link => <a key={link.href} className="link-muted" href={link.href}>{link.label}</a>)}
    </nav>
    <div className="header-actions">
      <a className="header-email link-muted" href={`mailto:${site.email}`}>{site.email}</a>
      <button className="language-button" type="button" disabled aria-label="Язык: русский. Английская версия появится позже.">RU<ChevronDown size={14} aria-hidden="true" /></button>
    </div>
  </header>;
}
