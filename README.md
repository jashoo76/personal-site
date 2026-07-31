# personal-site

Personal portfolio and blog for an embedded software engineer. Built with [Astro](https://astro.build) as a **fully static** site, deployed to **GitHub Pages** via GitHub Actions.

Live URL (after you publish): `https://<username>.github.io/personal-site/`

## Quick start

```bash
cd ~/personal-site
npm install
npm run dev
```

Open the local dev server (usually `http://localhost:4321`). For GitHub Pages **project sites**, match the production base path:

```bash
SITE_BASE_PATH=/personal-site/ npm run dev
```

Build and preview the static output:

```bash
npm run build
npm run preview
```

## GitHub Pages setup

1. Create a GitHub repo named `personal-site` (or rename this folder/repo and update `astro.config.mjs` default base).
2. Push this project to `main`.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds on every push to `main` and deploys `dist/`.

### Base path and custom domains

| Hosting style | Repo name example | `SITE_BASE_PATH` |
|---------------|-------------------|------------------|
| User site | `janslusarski.github.io` | `/` (auto in CI) |
| Project site | `personal-site` | `/personal-site/` (auto in CI) |
| Custom domain | any | `/` — set `site` in `astro.config.mjs` and your DNS |

Override locally or in CI with environment variables:

- `SITE_URL` — canonical origin, e.g. `https://janslusarski.github.io`
- `SITE_BASE_PATH` — path prefix with trailing slash, e.g. `/personal-site/`

Astro exposes the base as `import.meta.env.BASE_URL` in pages (used for links and assets).

## Folder structure (how Astro is organized)

```
personal-site/
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
├── public/                        # Static files copied as-is (favicon, diagrams)
│   ├── .nojekyll                  # Tells GitHub Pages not to run Jekyll
│   └── images/
├── astro.config.mjs               # Site URL, base path, MDX, Svelte, Shiki themes
├── src/
│   ├── content.config.ts          # Content Collections schemas (type-safe frontmatter)
│   ├── content/
│   │   ├── projects/*.md          # One file = one project card
│   │   └── blog/*.{md,mdx}        # Blog posts (MDX optional)
│   ├── config/site.ts             # Your name, bio, social links (edit this)
│   ├── components/                # UI pieces (.astro = zero JS by default)
│   ├── layouts/                   # Page shells (HTML head, header, footer)
│   ├── pages/                     # File-based routes → URLs
│   │   ├── index.astro            # /
│   │   ├── projects/index.astro   # /projects/
│   │   └── blog/                  # /blog/ and /blog/<slug>/
│   └── styles/global.css          # Global design tokens and layout
├── package.json
└── svelte.config.js               # Required for the Svelte island (theme toggle)
```

### Mental model

1. **`src/pages/`** — Each file becomes a route. `.astro` files run at **build time** only; they emit HTML.
2. **Content Collections** — `src/content.config.ts` defines Zod schemas. `getCollection()` in pages gives typed frontmatter.
3. **`public/`** — Files referenced by path (e.g. `/images/foo.svg`) — remember to prefix with `import.meta.env.BASE_URL` when linking in components.
4. **Layouts** — Wrap pages with shared chrome (`BaseLayout`, `BlogPostLayout`).
5. **Build output** — `npm run build` writes static HTML/CSS/JS to `dist/` (what GitHub Pages serves).

## Adding a project

Create `src/content/projects/my-board-bringup.md`:

```yaml
---
title: My Board Bring-up
description: One-line summary for the card.
tech:
  - C
  - RTOS
  - ARM Cortex-M33
github: https://github.com/you/repo
image: /images/my-diagram.svg   # optional, under public/
featured: true                  # shows on home page
order: 3                        # sort key (lower first)
---
```

Rebuild (or save in dev mode) — the Projects page and home “Featured” section update automatically.

## Writing a blog post

Add `src/content/blog/my-post.md` or `.mdx`:

```yaml
---
title: Post title
description: Used in listings and meta description
pubDate: 2026-07-31
tags: [c, cortex-m]
draft: false
---
```

Use fenced code blocks for Shiki highlighting:

````markdown
```c
void foo(void) { }
```
````

Posts with `draft: true` are excluded from production builds and listings.

## Islands architecture (minimal JavaScript)

Almost everything here is static HTML and CSS. The only client-side framework usage is **`ThemeToggle.svelte`** in the header, loaded with:

```astro
<ThemeToggle client:load />
```

That single **island** hydrates in the browser so theme choice can persist in `localStorage`. Everything else avoids shipping a app-wide JavaScript bundle — a good default for a portfolio.

Other `client:*` directives you might explore later:

- `client:visible` — hydrate when the component scrolls into view
- `client:idle` — hydrate when the main thread is idle

## Customize

- **Identity & links:** `src/config/site.ts`
- **Colors & typography:** `src/styles/global.css` (`:root` CSS variables)
- **Sample content:** replace placeholder GitHub URLs in `src/content/projects/` and edit bio text

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Typecheck (`astro check`) + static build to `dist/` |
| `npm run preview` | Serve the production build locally |

## License

MIT — use and adapt freely.
