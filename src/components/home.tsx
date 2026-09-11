import { getCopy, type Locale } from "@/data/translations";
import { LanguageProvider } from "./language-provider";
import { Hero, ShortsLibrary, WorkLibrary } from "@/components/portfolio";
import { About, Contact, Footer, Reviews } from "@/components/sections";
import { VideoProvider } from "@/components/video-player";
import { BackgroundMotion } from "@/components/background-motion";

export function Home({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <LanguageProvider copy={copy}><div className="site-shell" id="top">
    <a className="skip-link button button-primary" href="#works">{copy.ui.skip}</a>
    <BackgroundMotion />
    <VideoProvider><main><Hero copy={copy} /><WorkLibrary copy={copy} /><ShortsLibrary copy={copy} /><About copy={copy} /><Reviews copy={copy} /><Contact copy={copy} /></main></VideoProvider>
    <Footer copy={copy} />
  </div></LanguageProvider>;
}
