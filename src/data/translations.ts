import { about, reviews, shorts, showreel, site, works } from "./content";

export type Locale = "ru" | "en";
const ru = {
  skip: "Перейти к работам", home: "Алексей — на главную", navigation: "Основная навигация", mobileNavigation: "Мобильная навигация", footerNavigation: "Навигация в подвале",
  switchLanguage: "Выбрать язык", openMenu: "Открыть меню", closeMenu: "Закрыть меню",
  heroLabel: "ПОРТФОЛИО / VIDEO EDITOR", profession: "Видеомонтажёр", selected: "Избранные работы", portfolioLabel: "ПОРТФОЛИО", videoLabel: "ВИДЕО / 16:9",
  vertical: "Вертикальные видео", aboutLabel: "ОБО МНЕ", aboutTitle: "О себе", discuss: "Обсудить проект", portrait: "Алексей — видеомонтажёр",
  aboutPlaceholder: "Здесь будет несколько слов обо мне, моём подходе к монтажу и работе с проектами.", skills: "Навыки", tools: "Инструменты", platforms: "Платформы",
  reviewsLabel: "ОБРАТНАЯ СВЯЗЬ", reviewsTitle: "Отзывы клиентов", reviews: "Отзывы", reviewPlaceholder: "Здесь будет отзыв о работе", client: "Имя клиента", reviewSource: "Источник отзыва",
  contactLabel: "КОНТАКТЫ", contactLine1: "Обсудим", contactLine2: "ваш проект?", contactDescription: "Пишите по любым вопросам — отвечу быстро.", email: "ПОЧТА", write: "НАПИСАТЬ", contactHint: "Выберите удобный способ связи", top: "Наверх",
  workCategories: "Категории работ", shortCategories: "Категории вертикальных видео", allWorks: "Все работы", all: "Все", shown: "Показано", of: "из", worksCount: "работ", shortsCount: "вертикальных видео", more: "Показать ещё",
  previous: "назад", next: "вперёд", browse: "ЛИСТАЙТЕ", watchShowreel: "Смотреть шоурил", showreel: "ШОУРИЛ", watch: "Смотреть", upcoming: "Скоро здесь", videoPlaceholder: "Место для видео",
  videoError: "Не удалось загрузить видео", retry: "Попробуйте обновить страницу.", invalidVideo: "Ссылка на видео недоступна.", unsupportedVideo: "Ваш браузер не поддерживает воспроизведение видео.",
};
export type Messages = typeof ru;
const en: Messages = {
  skip: "Skip to work", home: "Aleksei — home", navigation: "Main navigation", mobileNavigation: "Mobile navigation", footerNavigation: "Footer navigation",
  switchLanguage: "Choose language", openMenu: "Open menu", closeMenu: "Close menu",
  heroLabel: "PORTFOLIO / VIDEO EDITOR", profession: "Video Editor", selected: "Selected work", portfolioLabel: "PORTFOLIO", videoLabel: "VIDEO / 16:9",
  vertical: "Vertical videos", aboutLabel: "ABOUT ME", aboutTitle: "About me", discuss: "Discuss a project", portrait: "Aleksei — video editor",
  aboutPlaceholder: "A few words about me, my editing approach and how I work on projects.", skills: "Skills", tools: "Tools", platforms: "Platforms",
  reviewsLabel: "FEEDBACK", reviewsTitle: "Client reviews", reviews: "Reviews", reviewPlaceholder: "A client review will appear here", client: "Client name", reviewSource: "Review source",
  contactLabel: "CONTACT", contactLine1: "Let’s discuss", contactLine2: "your project", contactDescription: "Get in touch with any questions — I’ll reply promptly.", email: "EMAIL", write: "MESSAGE ME", contactHint: "Choose the easiest way to get in touch", top: "Back to top",
  workCategories: "Work categories", shortCategories: "Vertical video categories", allWorks: "All work", all: "All", shown: "Showing", of: "of", worksCount: "projects", shortsCount: "vertical videos", more: "Show more",
  previous: "previous", next: "next", browse: "EXPLORE", watchShowreel: "Watch showreel", showreel: "SHOWREEL", watch: "Watch", upcoming: "Coming soon", videoPlaceholder: "Video placeholder",
  videoError: "Could not load the video", retry: "Please try refreshing the page.", invalidVideo: "This video link is unavailable.", unsupportedVideo: "Your browser does not support video playback.",
};

export function getCopy(locale: Locale) {
  const english = locale === "en";
  const ui = english ? en : ru;
  const categories: Record<string, string> = { YouTube: "YouTube", Реклама: english ? "Commercials" : "Реклама", Подкасты: english ? "Podcasts" : "Подкасты", Shorts: "Shorts", Reels: "Reels", Шоурил: english ? "Showreel" : "Шоурил" };
  return {
    locale, ui, categories,
    site: english ? { ...site, name: "Aleksei", tagline: "I turn raw footage into stories you want to watch to the end.", navigation: site.navigation.map((link, index) => ({ ...link, label: ["Work", "About me", "Reviews", "Contact"][index] ?? link.label })) } : site,
    showreel: english ? { ...showreel, title: "Showreel" } : showreel,
    works: english ? works.map((item, index) => ({ ...item, title: index === 0 ? "Podcast teaser" : `Project ${String(index + 1).padStart(2, "0")}`, description: "A brief overview of the project and my contribution." })) : works,
    shorts: english ? shorts.map((item, index) => ({ ...item, title: index === 0 ? "Podcast Short 4" : `Video ${String(index + 1).padStart(2, "0")}`, description: "The brief, concept and video details." })) : shorts,
    about: english ? { ...about, text: "Professional video editor with 7 years of experience.\nOn this channel, you can explore my work, along with occasional vlogs and tutorials.\nI now edit creative videos in DaVinci Resolve. Previously, I worked extensively in Adobe Premiere Pro and used After Effects as well. I create most motion graphics in DaVinci Resolve Fusion, with some tasks handled in After Effects.\nI also build websites with HTML, CSS and JavaScript." } : about,
    reviews: english ? reviews.map((review, index) => ({ ...review, author: ["Aleksei Shulepov", "teslaclub", "Irina Azarova"][index] ?? review.author, quote: ["The video was edited according to the script, with suitable footage selected. All requirements were met and revisions were made. Thank you for your work!", "Fast and high-quality work. The editor delivered exactly what I needed.", "Wow, this is fantastic! Our views and engagement have increased."][index] ?? review.quote })) : reviews,
  };
}
export type SiteCopy = ReturnType<typeof getCopy>;
