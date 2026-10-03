/**
 * Contact page content. The residential address and telephone number from the
 * CV are deliberately not published.
 */
import type { Lang } from "@/i18n/config";
import { collapseLines } from "@/lib/text";
import { profile } from "./profile";

export interface ContactMethod {
  label: string;
  detail: string;
  /** Rows without a link render as plain information rows. */
  href?: string;
  /** Font Awesome / Academicons classes for the leading icon. */
  icon: string;
  external?: boolean;
  download?: boolean;
}

export interface ContactGroup {
  /** Small caps label above the group; the first group has none. */
  label?: string;
  methods: ContactMethod[];
}

interface ContactContent {
  lead: string;
  groups: ContactGroup[];
  /** QR card linking to the institutional profile; shown only when set. */
  qr?: { heading: string; text: string; url: string; ariaLabel: string; alt: string };
  fine?: string;
}

const website = new URL(profile.website);

const en: ContactContent = {
  lead: `Email is the best way to reach me for academic correspondence, including questions about my research and
    teaching.`,
  groups: [
    {
      methods: [
        { label: "Email", detail: profile.email, href: `mailto:${profile.email}`, icon: "fas fa-fw fa-envelope" },
        {
          label: "Department of Economics",
          detail: "Ramsaday College",
          icon: "fas fa-fw fa-building-columns",
        },
        {
          label: "Curriculum Vitae",
          detail: "Education, appointments and publications",
          href: "/cv/",
          icon: "fas fa-fw fa-file-lines",
        },
      ],
    },
    ...(profile.links.scholar
      ? [
          {
            label: "Academic profiles",
            methods: [
              {
                label: "Google Scholar",
                detail: "Publications and citation profile",
                href: profile.links.scholar,
                icon: "ai ai-google-scholar ai-fw",
                external: true,
              },
            ],
          },
        ]
      : []),
    {
      label: "Web",
      methods: [
        {
          label: "Academic page",
          detail: `${website.host}${website.pathname.replace(/\/home\/?$/, "")}`,
          href: profile.website,
          icon: "fas fa-fw fa-link",
          external: true,
        },
      ],
    },
  ],
  qr: profile.links.institutional
    ? {
        heading: "Institutional Profile",
        text: "Scan the QR code to open my staff profile at Ramsaday College.",
        url: profile.links.institutional,
        ariaLabel: "Open Imdadul Islam Halder's staff profile at Ramsaday College",
        alt: "QR code for Imdadul Islam Halder's staff profile",
      }
    : undefined,
};

export const contactContent: Record<Lang, ContactContent> = {
  en: collapseLines(en, " "),
};
