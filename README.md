# Personal Website

My personal site — built with Astro, Svelte, and TypeScript, and deployed to GitHub Pages.

## Tech Stack

- **[Astro](https://astro.build)** — static site framework, handles routing, layouts, and content
- **[Svelte](https://svelte.dev)** — used for interactive UI components
- **TypeScript** — used throughout components and configuration
- **CSS** — hand-written styles, no framework
- **MDX** — used for content collection entries (blog posts, project write-ups)

## Features

- **Blog** — Markdown/MDX-powered blog collection with tags, draft support, and publish/update dates
- **Projects** — showcase of past projects with tech stack tags, optional links, images, and video
- **Static output** — fully static build, no server runtime required
- **Custom domain** — served over HTTPS 

## Deployment

The site deploys automatically to **GitHub Pages** via GitHub Actions on every push to `master`.

- **Workflow:** `.github/workflows/deploy.yml`
- **Build tool:** [`withastro/action`](https://github.com/withastro/action)

## License

All rights reserved — content and code in this repository are personal and not licensed for reuse unless otherwise noted.
