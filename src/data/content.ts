export type WorkCategory = "YouTube" | "Реклама" | "Интервью";
export type ShortCategory = "Shorts" | "Reels";
export type VideoSource = {
  kind: "file";
  /** Local path in public/media or a direct HTTPS MP4/WebM URL. */
  src: string;
  type: "video/mp4" | "video/webm";
  captions?: { src: string; language: string; label: string };
} | { kind: "youtube"; id: string };
export type VideoItem = {
  id: string; title: string; category: WorkCategory | ShortCategory | "Шоурил";
  description: string; duration: string | null; source: VideoSource | null;
  poster: string | null; orientation: "landscape" | "portrait";
};
export const site = {
  name: "Алексей", email: "arrlex2000@gmail.com", telegram: "https://t.me/salty322",
  navigation: [
    { label: "Работы", href: "#works" }, { label: "О себе", href: "#about" },
    { label: "Отзывы", href: "#reviews" }, { label: "Контакты", href: "#contact" },
  ],
};
// Replace these slots with real content. Null media never loads a fake or broken URL.
export const showreel: VideoItem = {
  id: "showreel", title: "Шоурил", category: "Шоурил",
  description: "Video Editor SHOWREEL | 2024 | Video Editor PORTFOLIO",
  duration: null, source: { kind: "youtube", id: "uuP4s4bjKXE" }, poster: "/media/showreel.jpg", orientation: "landscape",
};
export const works: VideoItem[] = (["YouTube", "Реклама", "Интервью", "YouTube", "Реклама", "Интервью", "YouTube", "Реклама", "Интервью"] as const).map((category, index) => ({
  id: `work-${index + 1}`, title: index === 0 ? "Тизер к подкасту" : `Название проекта ${String(index + 1).padStart(2, "0")}`,
  category, description: "Краткое описание проекта и выполненной работы.",
  duration: null, source: index === 0 ? { kind: "youtube", id: "gp4daveRnX0" } : null,
  poster: index === 0 ? "/media/podcast-teaser.jpg" : null, orientation: "landscape",
}));
export const shorts: VideoItem[] = (["Shorts", "Reels", "Shorts", "Reels", "Shorts", "Reels"] as const).map((category, index) => ({
  id: `short-${index + 1}`, title: index === 0 ? "Shorts-подкаст-4" : `Название видео ${String(index + 1).padStart(2, "0")}`,
  category, description: "Задача, идея и информация о видео.",
  duration: null, source: index === 0 ? { kind: "youtube", id: "FyeRtncvhkU" } : null,
  poster: index === 0 ? "/media/podcast-short.jpg" : null, orientation: "portrait",
}));
export type Review = { id: string; quote: string | null; author: string | null; detail: string | null; url: string | null };
export const reviews: Review[] = [
  { id: "review-1", quote: "Монтаж видео по сценарию с подбором материалов выполнен по ТЗ, правки внесены. Благодарю за работу!", author: "Алексей Шулепов", detail: null, url: null },
  { id: "review-2", quote: "Быстро и качественно. Монтажёр справился с моей задачи на 100%", author: "teslaclub", detail: null, url: null },
  { id: "review-3", quote: "Вау, это очень классно! У нас поднялись просмотры и вовлечённость.", author: "Ирина Азарова", detail: null, url: null },
];
export const about: { text: string | null; skills: string[]; tools: string[]; platforms: string[] } = {
  text: null, skills: [], tools: [], platforms: [],
};
