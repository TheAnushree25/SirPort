# Imdadul Islam Halder — academic website

Static academic website for Imdadul Islam Halder, Assistant Professor of Economics at Ramsaday College:
an editorial home page, research (working papers), publications, teaching, CV, videos and contact pages,
plus a detail page for every paper and course.

The design (layout, typography, colours, light/dark themes and interactions) follows the reference
academic site the project was modelled on; only the content differs. Content comes from the owner's
existing one-page site (`imdadul_academic_website.zip`). The residential address and telephone number in
the CV are deliberately not published.

## Tech stack

| Concern         | Choice                                                                                 |
| --------------- | -------------------------------------------------------------------------------------- |
| Framework       | [Astro 7](https://astro.build) — static output, zero client framework                  |
| Language        | TypeScript (strict)                                                                    |
| Styling         | SCSS (Dart Sass), design tokens as CSS custom properties, light + dark themes          |
| Content         | Astro content collections — Markdown + Zod-validated frontmatter                       |
| Icons           | Font Awesome Free 6.5.2, Academicons                                                   |
| Typography      | System font stacks (serif + sans) — no web-font downloads                              |
| SEO / discovery | Canonical URLs, JSON-LD, Open Graph, sitemap, RSS feed, BibTeX per article (optional)  |
| Tooling         | `astro check`, Prettier (+ Astro plugin), EditorConfig                                 |

Client-side JavaScript is limited to small vanilla TypeScript modules: the priority ("greedy")
navigation, the theme toggle and smooth in-page anchor scrolling.

## Getting started

Requires Node.js ≥ 22.12.

```bash
npm ci
npm run dev        # http://localhost:4321
```

| Script                 | What it does                                                     |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload on port 4321                  |
| `npm run build`        | Type-check (`astro check`) then build the static site to `dist/` |
| `npm run preview`      | Serve the production build locally                               |
| `npm run check`        | Type-check only                                                  |
| `npm run format`       | Format sources with Prettier                                     |
| `npm run format:check` | Verify formatting (for CI)                                       |

If `registry.npmjs.org` is unreachable on your network, install through a mirror:
`npm ci --registry=https://registry.npmmirror.com`.

`SITE_URL` (the public origin) and `BASE_PATH` (a sub-path such as `/my-repo`, if any) control
canonical URLs, Open Graph tags, the sitemap, the feed and every internal link. Copy `.env.example` to
`.env` to set them locally. The GitHub Pages workflow sets both automatically, and Vercel/Netlify builds
fall back to their production URL.

## Project structure

```
├── public/                    Static files served as-is (portrait, favicons)
├── src/
│   ├── components/
│   │   ├── archive/           List rows and their per-collection meta lines
│   │   ├── common/            Small shared pieces (dot-separated inline lists)
│   │   ├── contact/           Contact rows and the build-time QR card
│   │   ├── head/              <head> tags and the pre-paint theme script
│   │   ├── home/              Home page sections
│   │   ├── layout/            Masthead (navigation) and the profile sidebar
│   │   └── page/              Share row, previous/next pager, MathJax loader
│   ├── content/               Markdown collections: research, publications, teaching
│   ├── content.config.ts      Collection schemas (Zod)
│   ├── data/                  Profile, navigation, page copy, CV, contact, videos
│   ├── i18n/                  Locale table, UI strings and path/date helpers
│   ├── layouts/               Base, archive (listing) and entry (detail) layouts
│   ├── lib/                   Content queries, citations/BibTeX, routing helpers
│   ├── pages/                 Thin route files
│   ├── scripts/               Client modules (greedy nav, theme, scrolling)
│   ├── styles/                SCSS — settings, base, layout, components, pages
│   └── views/                 Page bodies
└── astro.config.mjs
```

## Editing content

| What                                   | Where                                                    |
| -------------------------------------- | -------------------------------------------------------- |
| Name, bio, portrait, email, links, CV  | `src/data/profile.ts`                                    |
| Home page copy                         | `src/data/home.ts`                                       |
| Inner-page titles and intros           | `src/data/pages.ts`                                      |
| Contact page rows                      | `src/data/contact.ts`                                    |
| CV sections                            | `src/data/cv.ts` (publications, papers and courses come from the collections) |
| Navigation                             | `src/data/navigation.ts`                                 |
| Videos                                 | `src/data/videos.ts` — one object per video              |
| Working papers, publications, courses  | One Markdown file each under `src/content/<collection>/` |

Adding an entry is a matter of dropping a Markdown file into the right collection; the listing page,
detail page, home page rows, CV, RSS feed and sitemap update automatically. Frontmatter is validated at
build time — see `src/content.config.ts` for every field.

Optional details, and how to add them:

- **CV PDF** — put the file in `public/files/` and set `cv: "/files/<name>.pdf"` in
  `src/data/profile.ts`; the CV page then shows a download button.
- **ORCID / YouTube / staff profile** — set them in `profile.links` (Google Scholar is already set).
  The staff profile (`institutional`) also turns on the QR card on the contact page.
- **Paper links and abstracts** — in a publication's frontmatter, `doi` takes a `https://doi.org/…`
  URL, `url` the publisher's article page (for papers without a DOI) and `pdf` a file under
  `public/files/`. Write the abstract as the Markdown body.
- **Recommended citations and BibTeX** — add `authors`, the full author list in publication order
  (`"Halder, I. I."`). Without it an entry shows only the "With …" co-author line, which implies no
  author order. The two linked journal articles have it, taken from their publisher records.
- **Videos** — add objects to `src/data/videos.ts`; they are grouped by `topic` on `/videos/`.

Internal links inside Markdown bodies should be relative (or include the base path) so they keep
working when the site is served from a sub-path.

Set `math: true` on a research entry to load MathJax for `$…$` / `$$…$$` TeX on that page only.

## Design system

- **Tokens** (`src/styles/settings/_variables.scss`, `src/styles/base/_tokens.scss`): paper/ink palette
  with a green accent and ochre details; the dark theme only redefines tokens.
- **Layers** (`src/styles/main.scss`): base → layout → components → pages → interaction states.
  Order matters; later layers refine earlier ones.
- **Breakpoints**: root type steps 16 → 18px at 768px; hero/sections stack at 880px; the sidebar folds
  above the content at 1120px; compact index rows below 620px.
- **Motion**: masthead and content fade in on load; links, underlines and arrows ease over 200ms;
  the hamburger morphs into a cross; the contact-row arrow nudges on hover.

## Deployment

`npm run build` produces a fully static `dist/` that can be served by any static host or CDN
(GitHub Pages, Vercel, Netlify, Cloudflare Pages, institutional web space). `404.html` is emitted for
hosts that support custom error pages.

### GitHub and GitHub Pages

1. Create an empty repository on GitHub (no README or licence, so the first push is clean), then push:

   ```bash
   git init -b main
   git add .
   git commit -m "Academic website"
   git remote add origin https://github.com/<owner>/<repo>.git
   git push -u origin main
   ```

2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**, then re-run
   the latest workflow (Actions → Build and deploy → Re-run jobs) or push again. Until Pages is
   enabled, the workflow still type-checks and builds every push and skips the deploy with a warning.

`.github/workflows/deploy.yml` then type-checks and builds every push and pull request, and deploys
`main` to `https://<owner>.github.io/<repo>/`. The `/<repo>/` base path is applied automatically. For a
custom domain, enter it on the same settings page (no `CNAME` file is needed with Actions deployments);
the next deploy uses it for canonical URLs and the sitemap. Repository variables `SITE_URL` and
`BASE_PATH` (Settings → Secrets and variables → Actions → Variables) override the detected values.

### Vercel or Netlify

Import the repository; the Astro preset is detected (build command `npm run build`, output `dist`).
The production URL is used as `SITE_URL` unless you set it explicitly.
