import type { Lang } from "./config";

/** Interface strings. Content lives in src/data and src/content. */
const strings = {
  en: {
    "a11y.skip": "Skip to content",
    "a11y.menu": "Toggle menu",
    "nav.primary": "Primary",
    "nav.pager": "Previous and next entries",
    "theme.toggle": "Toggle light or dark theme",
    "share.title": "Share on",
    "share.x": "X (formerly Twitter)",
    "pager.previous": "Previous",
    "pager.next": "Next",
    "meta.published": "Published:",
    "meta.date": "Date:",
    "pub.publishedIn": "Published in",
    "pub.citation": "Recommended citation",
    "pub.doi": "Publisher / DOI page",
    "pub.bibtex": "BibTeX",
    "pub.downloadPaper": "Download Paper",
    "pub.downloadBibtex": "Download Bibtex",
    "pub.abstract": "Abstract",
    "publications.viewAll": "View all {count} publications",
    "video.watch": "Watch on YouTube",
    "notFound.title": "Page not found",
    "notFound.body": "Sorry, but the page you were trying to view does not exist.",
    "notFound.home": "Return to the home page",
    "rss.title": "{name} — publications",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof strings)["en"];

export function useTranslations(lang: Lang) {
  return (key: UiKey, params: Record<string, string | number> = {}): string =>
    Object.entries(params).reduce<string>(
      (text, [name, value]) => text.replace(`{${name}}`, String(value)),
      strings[lang][key] ?? strings.en[key],
    );
}
