export type WorkCategory = "YouTube" | "Реклама" | "Подкасты";
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
  tagline: "Превращаю отснятый материал в истории, которые хочется досмотреть.",
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
  duration: null, source: { kind: "youtube", id: "uuP4s4bjKXE" }, poster: "/media/showreel-hd.jpg", orientation: "landscape",
};
export const works: VideoItem[] = (["Подкасты", "Реклама", "YouTube", "YouTube", "Реклама", "Подкасты", "YouTube", "Реклама", "Подкасты"] as const).map((category, index) => ({
  id: `work-${index + 1}`, title: index === 0 ? "Тизер к подкасту" : `Название проекта ${String(index + 1).padStart(2, "0")}`,
  category, description: "Краткое описание проекта и выполненной работы.",
  duration: null, source: index === 0 ? { kind: "youtube", id: "gp4daveRnX0" } : null,
  poster: index === 0 ? "/media/podcast-teaser-hd.jpg" : null, orientation: "landscape",
}));
export const shorts: VideoItem[] = (["Shorts", "Reels", "Shorts", "Reels", "Shorts", "Reels"] as const).map((category, index) => ({
  id: `short-${index + 1}`, title: index === 0 ? "Shorts-подкаст-4" : `Название видео ${String(index + 1).padStart(2, "0")}`,
  category, description: "Задача, идея и информация о видео.",
  duration: null, source: index === 0 ? { kind: "youtube", id: "FyeRtncvhkU" } : null,
  poster: index === 0 ? "/media/podcast-short-hd.jpg" : null, orientation: "portrait",
}));
export type Review = { id: string; quote: string | null; author: string | null; detail: string | null; url: string | null; avatar?: string };
export const reviews: Review[] = [
  { id: "review-1", quote: "Монтаж видео по сценарию с подбором материалов выполнен по ТЗ, правки внесены. Благодарю за работу!", author: "Алексей Шулепов", detail: null, url: null, avatar: "/media/review-alexey.jpg" },
  { id: "review-2", quote: "Быстро и качественно. Монтажёр справился с моей задачи на 100%", author: "teslaclub", detail: null, url: null, avatar: "/media/review-teslaclub.jpg" },
  { id: "review-3", quote: "Вау, это очень классно! У нас поднялись просмотры и вовлечённость.", author: "Ирина Азарова", detail: null, url: null, avatar: "/media/review-irirna.jpg" },
];
export type AboutIcon = { name: string; src: string };
export const about: { text: string | null; skills: AboutIcon[]; tools: AboutIcon[]; platforms: AboutIcon[] } = {
  text: "Профессиональный видеомонтажёр с 7-летним опытом.\nНа этом канале вы можете увидеть мои работы, а возможно, и влоги или руководства.\nСейчас я собираю креативные ролики в DaVinci Resolve, раньше много работал в Adobe Premiere Pro и немного в After Effects. Motion-графику в основном делаю в DaVinci Resolve Fusion, некоторые задачи — в After Effects.\nСайты пока пишу на HTML, CSS и JavaScript.",
  skills: [
    { name: "HTML", src: "/media/icon/image 8.png" },
    { name: "CSS", src: "/media/icon/image 9.png" },
    { name: "JavaScript", src: "/media/icon/image 10.png" },
  ],
  tools: [
    { name: "Adobe After Effects", src: "/media/icon/image 5.png" },
    { name: "DaVinci Resolve", src: "/media/icon/image 3.png" },
    { name: "Adobe Premiere Pro", src: "/media/icon/image 4.png" },
    { name: "Visual Studio Code", src: "/media/icon/image 7.png" },
    { name: "Git", src: "/media/icon/image 6.png" },
  ],
  platforms: [
    { name: "YouTube", src: "/media/icon/image 11.png" },
    { name: "TikTok", src: "/media/icon/image 12.png" },
  ],
};
