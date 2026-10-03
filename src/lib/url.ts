/**
 * Deployment base path, e.g. "/my-repo" for a GitHub Pages project site, or ""
 * when the site is served from the domain root. Set through `base` in
 * astro.config.mjs (BASE_PATH environment variable).
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/**
 * Prefix a root-relative path ("/cv/", "/images/portrait.jpg") with the base
 * path. External URLs, mailto: links, protocol-relative URLs and in-page
 * anchors are returned unchanged.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${BASE}${path}`;
}
