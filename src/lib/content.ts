import { getCollection, type CollectionEntry } from "astro:content";

import type { Lang } from "@/i18n/config";
import { localizePath } from "@/i18n/utils";
import { escapeHtml } from "./html";
import { withBase } from "./url";

export type ResearchEntry = CollectionEntry<"research">;
export type PublicationEntry = CollectionEntry<"publications">;
export type TeachingEntry = CollectionEntry<"teaching">;
export type AnyEntry = ResearchEntry | PublicationEntry | TeachingEntry;
export type PublicationCategory = PublicationEntry["data"]["category"];

type Ordered = { id: string; data: { order: number } };

/** Authored order; ties broken by id so the order is stable between builds. */
const byOrder = (a: Ordered, b: Ordered): number => a.data.order - b.data.order || a.id.localeCompare(b.id);

/** Newest first; ties broken by id. */
const newestFirst = (a: PublicationEntry, b: PublicationEntry): number =>
  b.data.year - a.data.year || a.id.localeCompare(b.id);

export async function getResearch(): Promise<ResearchEntry[]> {
  return (await getCollection("research")).sort(byOrder);
}

export async function getPublications(...categories: PublicationCategory[]): Promise<PublicationEntry[]> {
  const entries = await getCollection("publications", ({ data }) =>
    categories.length ? categories.includes(data.category) : true,
  );
  return entries.sort(newestFirst);
}

export async function getTeaching(): Promise<TeachingEntry[]> {
  return (await getCollection("teaching")).sort(byOrder);
}

/** Group newest-first publications under their year, preserving order. */
export function groupByYear(entries: PublicationEntry[]): Array<{ year: number; entries: PublicationEntry[] }> {
  const groups: Array<{ year: number; entries: PublicationEntry[] }> = [];
  for (const entry of entries) {
    const last = groups.at(-1);
    if (last?.year === entry.data.year) last.entries.push(entry);
    else groups.push({ year: entry.data.year, entries: [entry] });
  }
  return groups;
}

/** Neighbours of entries[index] for the previous / next pager. */
export function neighbours<T>(entries: T[], index: number): { previous?: T; next?: T } {
  return { previous: entries[index + 1], next: entries[index - 1] };
}

const BASE_PATH: Record<AnyEntry["collection"], string> = {
  research: "/portfolio/",
  publications: "/publication/",
  teaching: "/teaching/",
};

export function entryUrl(entry: AnyEntry, lang: Lang): string {
  return localizePath(`${BASE_PATH[entry.collection]}${entry.id}/`, lang);
}

/** "Economics Honours, <i>Delhi University</i>, 2016–present" as inline html. */
export function courseLine(entry: TeachingEntry): string {
  const { type, venue, period } = entry.data;
  return `${escapeHtml(type)}, <i>${escapeHtml(venue)}</i>${period ? `, ${escapeHtml(period)}` : ""}`;
}

/** "A and B", "A, B and C" — the CV's style for co-author lists. */
export function joinNames(names: string[]): string {
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** "With A and B." — or "" for sole-authored work. */
export function coauthorLine(names: string[]): string {
  return names.length ? `With ${escapeHtml(joinNames(names))}.` : "";
}

/** Summary shown under a publication in lists. */
export function publicationExcerpt(entry: PublicationEntry): string {
  return entry.data.excerpt ?? coauthorLine(entry.data.coauthors);
}

/** "Published in <i>Journal</i>, 53(19), 2018" or "Published in <i>Book</i>, Publisher, 2015" as inline html. */
export function venueLine(entry: PublicationEntry): string {
  return `${escapeHtml(entry.data.venuePrefix)} ${venueWithLocator(entry)}, ${entry.data.year}`;
}

/** Venue with its locator: "<i>Journal</i>, 53(19), 1-10" or "<i>Book</i>, Publisher". */
function venueWithLocator(entry: PublicationEntry): string {
  const { category, venue, volume, issue, pages, publisher } = entry.data;
  const parts = [`<i>${escapeHtml(venue)}</i>`];
  if (category === "journal" && volume) parts.push(`${escapeHtml(volume)}${issue ? `(${escapeHtml(issue)})` : ""}`);
  if (category === "journal" && pages) parts.push(escapeHtml(pages));
  if (publisher) parts.push(escapeHtml(publisher));
  return parts.join(", ");
}

/** "A, B, & C" — APA-style author list. */
export function formatAuthors(authors: string[]): string {
  if (authors.length <= 1) return authors.join("");
  if (authors.length === 2) return `${authors[0]}, & ${authors[1]}`;
  return `${authors.slice(0, -1).join(", ")}, & ${authors.at(-1)}`;
}

/**
 * Recommended citation as inline html. Only available when the full author
 * list (in publication order) is recorded in the entry's `authors` field.
 */
export function formatCitation(entry: PublicationEntry): string | undefined {
  const { authors, category, year, title } = entry.data;
  if (!authors?.length) return undefined;
  const byline = `${escapeHtml(formatAuthors(authors))} (${year}).`;
  const plainTitle = escapeHtml(title.replace(/<[^>]*>/g, ""));

  if (category === "book") return `${byline} <i>${plainTitle}</i>. ${escapeHtml(entry.data.publisher ?? entry.data.venue)}.`;
  if (category === "chapter") return `${byline} "${plainTitle}." In ${venueWithLocator(entry)}.`;
  return `${byline} "${plainTitle}${/[.?!]$/.test(plainTitle) ? "" : "."}" ${venueWithLocator(entry)}.`;
}

/** The citation when available, otherwise a CV-style line: "With A and B. <i>Venue</i>, 53(19), 2018." */
export function formatReference(entry: PublicationEntry): string {
  const citation = formatCitation(entry);
  if (citation) return citation;
  const where = `${entry.data.category === "chapter" ? "In " : ""}${venueWithLocator(entry)}, ${entry.data.year}.`;
  return [coauthorLine(entry.data.coauthors), where].filter(Boolean).join(" ");
}

/** The publisher's page for a publication: its DOI when it has one, else the article URL. */
export function publisherHref(entry: PublicationEntry): string | undefined {
  return entry.data.doi ?? entry.data.url;
}

/** Where "Download Paper" points: the PDF when there is one, else the publisher's page. */
export function paperHref(entry: PublicationEntry): string | undefined {
  return entry.data.pdf ? withBase(entry.data.pdf) : publisherHref(entry);
}

/** True when a BibTeX file is generated for the entry (journal articles with a known author order). */
export function hasBibtex(entry: PublicationEntry): boolean {
  return entry.data.bibtex && entry.data.category === "journal" && Boolean(entry.data.authors?.length);
}

/** Href of the generated BibTeX file. */
export function bibtexHref(entry: PublicationEntry): string | undefined {
  return hasBibtex(entry) ? withBase(`/files/bibtex/${entry.id}.bib`) : undefined;
}

/** BibTeX record for a journal article. */
export function formatBibtex(entry: PublicationEntry, siteUrl: string): string {
  const { authors = [], year, title, venue, volume, issue, pages, doi, url } = entry.data;
  const firstSurname = (authors[0] ?? "")
    .split(",")[0]
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  const fields: Array<[string, string | undefined]> = [
    ["title", title],
    ["author", authors.join(" and ")],
    ["journal", venue],
    ["year", String(year)],
    ["volume", volume],
    ["number", issue],
    ["pages", pages?.replace("-", "--")],
    ["doi", doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")],
    ["url", url ?? new URL(withBase(`/publication/${entry.id}/`), siteUrl).href],
  ];
  const body = fields
    .filter((field): field is [string, string] => Boolean(field[1]))
    .map(([key, value]) => `  ${key} = {${value}}`)
    .join(",\n");
  return `@article{${firstSurname}${year}${entry.id.split("-")[0]},\n${body}\n}\n`;
}
