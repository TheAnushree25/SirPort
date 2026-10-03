/**
 * Home page copy. Strings marked `html` may contain inline markup
 * (<em>, <a>, <b>) and are rendered with set:html — authored content only.
 * The publication and teaching rows are pulled from the content collections.
 */
import type { Lang } from "@/i18n/config";
import { collapseLines } from "@/lib/text";
import { profile } from "./profile";

export interface Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    role: string;
    creds: Array<string | Link>;
    /** Highlight line under the credentials; `link` is optional. */
    credential: { text: string; detail?: string; link?: Link };
    /** html */
    lead: string;
    links: Link[];
  };
  rail: {
    eyebrow: string;
    /** `title` and `detail` are html. */
    items: Array<{ title: string; detail: string }>;
  };
  index: {
    eyebrow: string;
    items: Array<{ title: string; desc: string; href: string }>;
  };
  research: {
    eyebrow: string;
    heading: string;
    /** html */
    paragraphs: string[];
    themes: string[];
  };
  publications: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  teaching: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    /** html */
    text: string;
    links: Link[];
  };
}

const email = `<a class="inline-link" href="mailto:${profile.email}">${profile.email}</a>`;
const scholar = profile.links.scholar;

const en: HomeContent = {
  hero: {
    eyebrow: "Department of Economics · Ramsaday College",
    role: "Assistant Professor of Economics",
    creds: [
      "Political Economy",
      "Applied Microeconomic Theory",
      "Electoral Competition",
      "Media & Politics",
      "Public Economics",
    ],
    credential: {
      text: "Best Paper Award, 2025",
      detail: "Young Scholars’ Workshop, Visva-Bharati",
    },
    lead: `I am an Assistant Professor in the Department of Economics at Ramsaday College, where I have taught since
      2016, and Guest Faculty at Aliah University. My research studies political competition, information and media,
      public-good provision, and the political economy of development. I am particularly interested in how
      information, political incentives, and institutions shape policy choices and economic outcomes. Earlier, I
      worked as a Research Associate with the Centre de Sciences Humaines and CNRS, as a Research Consultant at the
      Institute of Economic Growth, New Delhi, and as a Project Associate at the National Institute of Public Finance
      and Policy. I studied economics at the University of Calcutta, Jawaharlal Nehru University, and the University
      of Houston.`,
    links: [
      { label: "Publications", href: "/publications/" },
      { label: "Research", href: "/working-papers/" },
      { label: "Curriculum Vitae", href: "/cv/" },
      scholar ? { label: "Google Scholar", href: scholar } : { label: "Contact", href: "/contact/" },
    ],
  },
  rail: {
    eyebrow: "Currently",
    items: [
      { title: "Assistant Professor of Economics", detail: "Department of Economics, Ramsaday College" },
      { title: "Guest Faculty", detail: "Aliah University" },
      { title: "PhD, Economics", detail: "Jawaharlal Nehru University" },
      { title: "Maulana Azad National Fellow", detail: "2015–17" },
    ],
  },
  index: {
    eyebrow: "Index",
    items: [
      {
        title: "Research",
        href: "/working-papers/",
        desc: "Political competition, information and media, public-good provision, and the political economy of development.",
      },
      {
        title: "Publications",
        href: "/publications/",
        desc: "Published work on urbanisation, agriculture, services trade, and health insurance in India.",
      },
      { title: "Teaching", href: "/teaching/", desc: "Economics, statistics and econometrics." },
      { title: "CV", href: "/cv/", desc: "Education, appointments and academic activity." },
      { title: "Videos", href: "/videos/", desc: "Lectures and explainers." },
      { title: "Contact", href: "/contact/", desc: "Academic correspondence." },
    ],
  },
  research: {
    eyebrow: "Research",
    heading: "Political competition, information, and public policy",
    paragraphs: [
      `My research studies political competition, information and media, public-good provision, and the political
      economy of development. I am particularly interested in how information, political incentives, and
      institutions shape policy choices and economic outcomes.`,
      `Current work with Meeta Keswani Mehra includes a theoretical analysis of how mainstream and social media shape
      policy polarization, now under revise and resubmit at the <em>Quarterly Review of Economics and Finance</em>,
      and a study of political motives in the allocation of welfare funding. My doctoral research at Jawaharlal Nehru
      University examined electoral competition and the provision of public goods, in theory and evidence.`,
    ],
    themes: [
      "Political economy",
      "Electoral competition",
      "Media and polarization",
      "Public-good provision",
      "Welfare funding",
      "Economic development",
    ],
  },
  publications: {
    eyebrow: "Publications",
    heading: "Selected publications",
    intro: `Journal articles and book chapters on economic liberalisation and in-situ urbanisation, pesticide use by
      cotton farmers, services trade in the Asia-Pacific, and health insurance in the slums of Mumbai.`,
  },
  teaching: {
    eyebrow: "Teaching",
    heading: "Economics, statistics and econometrics",
    intro: `I teach economics at Ramsaday College, where I have been an Assistant Professor since 2016, and serve as
      Guest Faculty at Aliah University. I have also taught statistics and econometrics for Economics Honours at
      Delhi University.`,
  },
  contact: {
    eyebrow: "Contact",
    heading: "Get in touch",
    text: `For academic correspondence, please write to me at ${email}.`,
    links: [
      { label: "Curriculum Vitae", href: "/cv/" },
      ...(scholar ? [{ label: "Google Scholar", href: scholar }] : []),
      { label: "Contact details", href: "/contact/" },
      { label: "Google Sites page", href: profile.website },
    ],
  },
};

export const homeContent: Record<Lang, HomeContent> = {
  en: collapseLines(en, " "),
};
