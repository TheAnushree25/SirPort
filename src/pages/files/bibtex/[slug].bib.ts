import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";

import { formatBibtex, getPublications, hasBibtex } from "@/lib/content";

/**
 * One BibTeX file per journal article whose author order is recorded
 * (the `authors` frontmatter field), generated from its frontmatter.
 */
export const getStaticPaths = (async () => {
  const articles = await getPublications("journal");
  return articles.filter(hasBibtex).map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props, site, url }) =>
  new Response(formatBibtex(props.entry, (site ?? url).toString()), {
    headers: { "Content-Type": "application/x-bibtex; charset=utf-8" },
  });
