import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { profile } from "@/data/profile";
import { useTranslations } from "@/i18n/ui";
import { entryUrl, getPublications, publicationExcerpt } from "@/lib/content";
import { stripHtml } from "@/lib/html";
import { withBase } from "@/lib/url";

/**
 * RSS feed of publications, newest first. Publications are dated by year only,
 * so items carry no pubDate rather than an invented day.
 */
export const GET: APIRoute = async (context) => {
  const t = useTranslations("en");
  const publications = await getPublications();

  return rss({
    title: t("rss.title", { name: profile.name }),
    description: profile.description,
    // The channel link is the home page, which includes any base path.
    site: new URL(withBase("/"), context.site ?? context.url.origin).href,
    items: publications.map((entry) => ({
      title: entry.data.title,
      description: stripHtml(`${entry.data.venue}, ${entry.data.year}. ${publicationExcerpt(entry)}`),
      link: entryUrl(entry, "en"),
      categories: ["Publication"],
    })),
    customData: "<language>en</language>",
  });
};
