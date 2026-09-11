import type { Metadata } from "next";
import type { Locale } from "@/data/translations";
import "@/app/globals.css";

export function pageMetadata(locale: Locale): Metadata {
  return {
    title: locale === "en" ? "Aleksei — Video Editor" : "Алексей — видеомонтажёр",
    description: locale === "en" ? "Aleksei’s video editing portfolio. Videos, shorts and creative editing for your projects." : "Портфолио видеомонтажёра Алексея. Видео, шортсы и монтаж для ваших проектов.",
    icons: { icon: "/icon.svg" },
  };
}
export function SiteDocument({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return <html lang={locale}><head>
    <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    {locale === "ru" && <link rel="preload" href="/fonts/manrope-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />}
    <link rel="alternate" hrefLang="ru" href="/" />
    <link rel="alternate" hrefLang="en" href="/en/" />
    <link rel="alternate" hrefLang="x-default" href="/" />
    <meta name="theme-color" content="#080b12" />
  </head><body>{children}</body></html>;
}
