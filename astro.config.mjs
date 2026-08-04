// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

function resolveBase() {
  return process.env.SITE_BASE_PATH ?? "/";
}

const site = process.env.SITE_URL ?? "https://jslusarski.com";

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
