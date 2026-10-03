/**
 * Titles and introductory copy for the inner pages.
 * Fields marked `html` may contain inline markup.
 */
import type { Lang } from "@/i18n/config";
import { escapeHtml } from "@/lib/html";
import { collapseLines } from "@/lib/text";
import { profile } from "./profile";

const scholarLink = (label: string) =>
  profile.links.scholar
    ? ` A current list is also available on <a href="${escapeHtml(profile.links.scholar)}">${label}</a>.`
    : "";

export interface FeaturePanel {
  id: string;
  kicker: string;
  heading: string;
  headingHref?: string;
  /** html */
  programme?: string;
  meta?: string;
  paragraphs: string[];
  links?: Array<{ label: string; href: string }>;
}

interface PagesCopy {
  research: { title: string; intro: string[]; listHeading: string };
  publications: {
    title: string;
    /** html */
    intro: string;
    journalHeading: string;
    chapterHeading: string;
    description: string;
  };
  teaching: { title: string; intro: string[]; panels: FeaturePanel[] };
  videos: { title: string; intro: string[]; empty: string };
  cv: { title: string; downloadNote: string; downloadLabel: string };
  contact: { title: string };
}

const en: PagesCopy = {
  research: {
    title: "Research",
    intro: [
      `My research studies political competition, information and media, public-good provision, and the political
      economy of development. I am particularly interested in how information, political incentives, and
      institutions shape policy choices and economic outcomes.`,
      `My doctoral research at Jawaharlal Nehru University, <em>Electoral Competition and Provision of Public Good:
      Theory and Evidence</em>, examined how electoral competition shapes the provision of public goods. Current work
      with Meeta Keswani Mehra extends these questions to media and policy polarization and to the political motives
      behind welfare funding.`,
      `Working papers and current research are listed below.`,
    ],
    listHeading: "Working Papers",
  },
  publications: {
    title: "Publications",
    intro: `Selected published research in journals and edited volumes.${scholarLink("my Google Scholar profile")}`,
    journalHeading: "Journal Articles",
    chapterHeading: "Book Chapters",
    description:
      "Journal articles and book chapters by Imdadul Islam Halder on urbanisation, agriculture, services trade, and health insurance in India.",
  },
  teaching: {
    title: "Teaching",
    intro: [
      `I teach economics in the Department of Economics at Ramsaday College, where I have been an Assistant
      Professor since 2016, and serve as Guest Faculty at Aliah University.`,
      `Earlier, I taught statistics and econometrics for Economics Honours at Delhi University, and was a Guest
      Lecturer at Zakir Husain PG Evening College, Delhi University, in 2014–2015.`,
    ],
    panels: [],
  },
  videos: {
    title: "Academic Videos",
    intro: [`Lectures and explainers on economics, statistics and econometrics.`],
    empty: `Lecture recordings and short explainers will be added here.`,
  },
  cv: {
    title: "CV",
    downloadNote: "The full curriculum vitae is available as a PDF.",
    downloadLabel: "Download CV as PDF",
  },
  contact: { title: "Contact" },
};

export const pagesCopy: Record<Lang, PagesCopy> = {
  en: collapseLines(en, " "),
};
