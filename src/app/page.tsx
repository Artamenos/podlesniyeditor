import { Hero, ShortsLibrary, WorkLibrary } from "@/components/portfolio";
import { About, Contact, Footer, Reviews } from "@/components/sections";

export default function Home() {
  return <div className="site-shell" id="top">
    <a className="skip-link button button-primary" href="#works">Перейти к работам</a>
    <main><Hero /><WorkLibrary /><ShortsLibrary /><About /><Reviews /><Contact /></main>
    <Footer />
  </div>;
}
