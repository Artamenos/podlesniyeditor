import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Алексей — видеомонтажёр",
  description: "Портфолио видеомонтажёра Алексея. Видео, шортсы и монтаж для ваших проектов.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru">
    <head>
      <link rel="preload" href="/fonts/manrope-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <meta name="theme-color" content="#080b12" />
    </head>
    <body>{children}</body>
  </html>;
}
