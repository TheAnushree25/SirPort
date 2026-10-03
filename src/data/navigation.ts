import type { Localized } from "@/i18n/config";

export interface NavItem {
  /** Canonical path; localised at render time. */
  href: string;
  label: Localized;
  /** Path prefixes of detail pages that belong to this section. */
  sections?: string[];
}

/** Top-level sections, in masthead order. */
export const mainNav: NavItem[] = [
  { href: "/working-papers/", label: "Research", sections: ["/portfolio/"] },
  { href: "/publications/", label: "Publications", sections: ["/publication/"] },
  { href: "/teaching/", label: "Teaching", sections: ["/teaching/"] },
  { href: "/cv/", label: "CV" },
  { href: "/videos/", label: "Videos" },
  { href: "/contact/", label: "Contact" },
];

/** True when `path` (canonical) is the item's page or one of its detail pages. */
export function isActiveSection(item: NavItem, path: string): boolean {
  const normalised = path.endsWith("/") ? path : `${path}/`;
  return normalised === item.href || (item.sections ?? []).some((prefix) => normalised.startsWith(prefix));
}
