import { withBase } from "@/lib/url";
import { DATE_LOCALE, DEFAULT_LANG, type Lang, type Localized } from "./config";

/** Resolve a possibly-localised value, falling back to English. */
export function tr(value: Localized, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] ?? value.en;
}

/**
 * Turn a canonical path ("/publications/") into the href for `lang`: the
 * locale segment for non-default languages, then the deployment base path.
 */
export function localizePath(path: string, lang: Lang): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  if (lang === DEFAULT_LANG) return withBase(path);
  return withBase(`/${lang}${path.startsWith("/") ? path : `/${path}`}`);
}

type DateStyle = "long" | "year";

/** Dates are stored as UTC midnight, so always format in UTC. */
export function formatDate(date: Date, lang: Lang, style: DateStyle = "long"): string {
  const options: Intl.DateTimeFormatOptions =
    style === "year"
      ? { year: "numeric", timeZone: "UTC" }
      : { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], options).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().replace(".000Z", "+00:00");
}
