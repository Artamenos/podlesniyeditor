import { Hero, ShortsLibrary, WorkLibrary } from "@/components/portfolio";
import { About, Contact, Footer, Reviews } from "@/components/sections";
import { VideoProvider } from "@/components/video-player";
import { BackgroundMotion } from "@/components/background-motion";

export default function Home() {
  return <div className="site-shell" id="top">
    <a className="skip-link button button-primary" href="#works">Перейти к работам</a>
    <BackgroundMotion />
    <VideoProvider><main><Hero /><WorkLibrary /><ShortsLibrary /><About /><Reviews /><Contact /></main></VideoProvider>
    <Footer />
  </div>;
}
