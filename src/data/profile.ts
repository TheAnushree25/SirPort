/**
 * The site owner. Optional links are omitted from the page until they are set.
 */
export interface Profile {
  name: string;
  /** Home <title> suffix and schema.org job title. */
  headline: string;
  /** Default meta description. */
  description: string;
  /** One-paragraph bio in the sidebar of inner pages. */
  bio: string;
  /** Employer, for structured data. */
  affiliation: string;
  portrait: { src: string; width: number; height: number; alt: string };
  email: string;
  /** Existing academic page. */
  website: string;
  /** PDF of the full CV. The CV page shows a download button only when set. */
  cv?: string;
  links: {
    scholar?: string;
    orcid?: string;
    youtube?: string;
    /** Staff profile on the college website; enables the QR card on /contact/. */
    institutional?: string;
  };
}

export const profile: Profile = {
  name: "Imdadul Islam Halder",
  headline: "Assistant Professor of Economics, Ramsaday College",
  description: "Academic website of Imdadul Islam Halder, Assistant Professor of Economics at Ramsaday College.",
  bio: "Assistant Professor, Department of Economics, Ramsaday College, and Guest Faculty, Aliah University. Research in political economy, applied microeconomic theory, and public economics.",
  affiliation: "Ramsaday College",
  portrait: {
    src: "/images/portrait.jpg",
    width: 600,
    height: 750,
    alt: "Imdadul Islam Halder, Assistant Professor of Economics",
  },
  email: "imdahal@gmail.com",
  website: "https://sites.google.com/view/imdadul/home",
  links: {
    scholar: "https://scholar.google.com/citations?user=nYtT4NcAAAAJ&hl=en",
  },
};
