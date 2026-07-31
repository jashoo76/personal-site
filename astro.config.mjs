// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

/**
 * GitHub Pages base path:
 * - User site (repo named username.github.io): set SITE_BASE_PATH=/ or leave unset when GITHUB_REPOSITORY ends with .github.io
 * - Project site: defaults to /personal-site/ — override with SITE_BASE_PATH=/your-repo/
 */
function resolveBase() {
  if (process.env.SITE_BASE_PATH) {
    const base = process.env.SITE_BASE_PATH;
    return base.endsWith("/") ? base : `${base}/`;
  }
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (repo?.endsWith(".github.io")) return "/";
  return "/personal-site/";
}

const site = process.env.SITE_URL ?? "https://janslusarski.github.io";

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site,
  base: resolveBase(),
  integrations: [mdx(), svelte()],
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      langs: ["c", "cpp", "rust", "asm", "bash", "json", "yaml"],
    },
  },
});
