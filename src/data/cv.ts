/**
 * Curriculum vitae. Free-text sections are authored here; publications,
 * working papers and teaching are pulled from the content collections.
 * Strings may contain inline html (<strong>, <em>, <br>).
 * The residential address and telephone number are deliberately not published.
 */
import type { Lang } from "@/i18n/config";

export interface CvEntry {
  /** html */
  html: string;
  /** Nested bullet points (html). */
  points?: string[];
}

export interface CvSection {
  id: string;
  heading: string;
  entries: CvEntry[];
}

interface CvContent {
  /** Hand-written sections shown before the collection-driven ones. */
  leading: CvSection[];
  /** Headings for the generated sections. */
  generated: { publications: string; workingPapers: string; teaching: string };
  /** Hand-written sections shown after them. */
  trailing: CvSection[];
}

const en: CvContent = {
  leading: [
    {
      id: "education",
      heading: "Education",
      entries: [
        {
          html: "<p><strong>PhD in Economics</strong>, Jawaharlal Nehru University<br>Thesis: <em>Electoral Competition and Provision of Public Good: Theory and Evidence</em></p>",
        },
        { html: "<p><strong>M.A. in Economics</strong>, University of Houston, 2011</p>" },
        { html: "<p><strong>M.Phil. in Economics</strong>, Jawaharlal Nehru University, 2008</p>" },
        { html: "<p><strong>M.Sc. in Economics</strong>, University of Calcutta, 2005</p>" },
        { html: "<p><strong>B.Sc. in Economics</strong>, University of Calcutta, 2003</p>" },
      ],
    },
    {
      id: "academic-appointments",
      heading: "Academic appointments",
      entries: [
        {
          html: "<strong>2016 - Present</strong><br><strong>Assistant Professor</strong>, Department of Economics, Ramsaday College",
        },
        { html: "<strong>Guest Faculty</strong>, Aliah University" },
        { html: "<strong>2016</strong><br><strong>Research Consultant</strong>, Institute of Economic Growth, New Delhi" },
        {
          html: "<strong>2012 - 2015</strong><br><strong>Research Associate</strong>, Centre de Sciences Humaines and CNRS",
        },
        {
          html: "<strong>2014 - 2015</strong><br><strong>Guest Lecturer</strong>, Zakir Husain PG Evening College, Delhi University",
        },
        {
          html: "<strong>2008 - 2009</strong><br><strong>Project Associate</strong>, National Institute of Public Finance and Policy",
        },
      ],
    },
  ],
  generated: {
    publications: "Publications",
    workingPapers: "Working papers",
    teaching: "Teaching",
  },
  trailing: [
    {
      id: "awards-and-fellowships",
      heading: "Awards and fellowships",
      entries: [
        {
          html: "<strong>Best Paper Award</strong>, Young Scholars’ Workshop on Contemporary Issues of Economic Development, Visva-Bharati, Santiniketan, 2025.",
        },
        { html: "Selected for the <strong>Maulana Azad National Fellowship</strong>, 2015–17." },
        { html: "Qualified the <strong>National Eligibility Test (NET)</strong> for lectureship, 2005." },
      ],
    },
  ],
};

export const cvContent: Record<Lang, CvContent> = { en };
