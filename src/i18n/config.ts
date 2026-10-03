/**
 * The site is English-only. The locale plumbing is kept so that a second
 * language can be added later by extending these tables.
 */
export const LANGUAGES = ["en"] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "en";

/** Value for <html lang> and hreflang attributes. */
export const HTML_LANG: Record<Lang, string> = {
  en: "en",
};

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
};

/** BCP 47 tags used for date formatting. */
export const DATE_LOCALE: Record<Lang, string> = {
  en: "en-US",
};

/** A string, optionally keyed by language. */
export type Localized = string | { en: string };
