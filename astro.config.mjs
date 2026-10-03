// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

// The config is evaluated before Astro loads .env files, so read them here.
// Variables set in the environment (CI, hosting) take precedence.
const env = { ...loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), ""), ...process.env };

/**
 * Public origin used for canonical URLs, Open Graph, the sitemap and the feed.
 * The GitHub Pages workflow sets SITE_URL automatically; Vercel and Netlify
 * builds fall back to their production URL.
 */
const SITE_URL =
  env.SITE_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (env.NETLIFY && env.URL) ||
  "https://www.example.org";

/** Sub-path the site is served from, e.g. "/my-repo" for a GitHub Pages project site. */
const BASE_PATH = env.BASE_PATH || "/";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  server: {
    port: 4321,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
});
