import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({ label: z.string(), href: z.string() });

/** Working papers — listed on /working-papers/, detail pages under /portfolio/. */
const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    /** Position in the list (ascending). */
    order: z.number().int(),
    /** Optional date; shown on the detail page when present. */
    date: z.coerce.date().optional(),
    excerpt: z.string(),
    /** Co-authors in display form, e.g. "Meeta Keswani Mehra". */
    coauthors: z.array(z.string()).default([]),
    /** Inline html, e.g. "Revise and resubmit, <i>Venue</i>". */
    status: z.string(),
    links: z.array(link).default([]),
    /** Load MathJax on the detail page. */
    math: z.boolean().default(false),
  }),
});

/** Journal articles, books and book chapters. */
const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    category: z.enum(["journal", "book", "chapter"]),
    /** Journal name, or the title of the book a chapter appears in. */
    venue: z.string(),
    /** Lead-in before the venue, e.g. "Published in", "Forthcoming in". */
    venuePrefix: z.string().default("Published in"),
    publisher: z.string().optional(),
    /** Co-authors in display form; the list is not an author order. */
    coauthors: z.array(z.string()).default([]),
    /**
     * Full author list in publication order, citation style ("Halder, I. I.").
     * Enables the recommended citation and the BibTeX download.
     */
    authors: z.array(z.string()).optional(),
    /** Short summary shown in lists; falls back to the co-author line. */
    excerpt: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    /** DOI as a resolver URL, e.g. "https://doi.org/10.1177/…". */
    doi: z.url().optional(),
    /** The publisher's article page, for papers without a DOI. */
    url: z.url().optional(),
    /** Link to a PDF of the paper (a root-relative path under public/ or a URL). */
    pdf: z.string().optional(),
    bibtex: z.boolean().default(true),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/teaching" }),
  schema: z.object({
    title: z.string(),
    /** Position in the list (ascending). */
    order: z.number().int(),
    /** e.g. "Economics Honours". */
    type: z.string(),
    venue: z.string(),
    /** Free text, e.g. "2016–present". */
    period: z.string().optional(),
    excerpt: z.string(),
  }),
});

export const collections = { research, publications, teaching };
