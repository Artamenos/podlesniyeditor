export type WorkCategory = "YouTube" | "Реклама" | "Интервью";
export type ShortCategory = "Shorts" | "Reels";
export type VideoSource = {
  /** Local path in public/media or a direct HTTPS MP4/WebM URL. */
  src: string;
  type: "video/mp4" | "video/webm";
  captions?: { src: string; language: string; label: string };
};
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
  description: "Здесь будет подборка работ. Видео и описание добавим позже.",
  duration: null, source: null, poster: null, orientation: "landscape",
};
export const works: VideoItem[] = (["YouTube", "Реклама", "Интервью", "YouTube", "Реклама", "Интервью", "YouTube", "Реклама", "Интервью"] as const).map((category, index) => ({
  id: `work-${index + 1}`, title: `Название проекта ${String(index + 1).padStart(2, "0")}`,
  category, description: "Краткое описание проекта и выполненной работы.",
  duration: null, source: null, poster: null, orientation: "landscape",
}));
export const shorts: VideoItem[] = (["Shorts", "Reels", "Shorts", "Reels", "Shorts", "Reels"] as const).map((category, index) => ({
  id: `short-${index + 1}`, title: `Название видео ${String(index + 1).padStart(2, "0")}`,
  category, description: "Задача, идея и информация о видео.",
  duration: null, source: null, poster: null, orientation: "portrait",
}));
export type Review = { id: string; quote: string | null; author: string | null; detail: string | null; url: string | null };
export const reviews: Review[] = Array.from({ length: 3 }, (_, index) => ({
  id: `review-${index + 1}`, quote: null, author: null, detail: null, url: null,
}));
export const about: { text: string | null; skills: string[]; tools: string[]; platforms: string[] } = {
  text: null, skills: [], tools: [], platforms: [],
};
