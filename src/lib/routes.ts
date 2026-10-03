import { getPublications, getResearch, getTeaching, neighbours } from "./content";

/**
 * Static paths for detail pages. Each page receives its entry and its
 * neighbours in list order for the previous / next pager.
 */
function toPaths<T extends { id: string }>(entries: T[]) {
  return entries.map((entry, index) => ({
    params: { slug: entry.id },
    props: { entry, ...neighbours(entries, index) },
  }));
}

export const researchPaths = async () => toPaths(await getResearch());
export const publicationPaths = async () => toPaths(await getPublications());
export const teachingPaths = async () => toPaths(await getTeaching());
