// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

function resolveBase() {
  return process.env.SITE_BASE_PATH ?? "/";
}

const site = process.env.SITE_URL ?? "https://jslusarski.com";
const langs = ["c", "cpp", "rust", "asm", "bash", "json", "yaml"];

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site,
  base: resolveBase(),
  integrations: [mdx(), svelte()],
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      // @ts-expect-error — Shiki accepts language ID strings at runtime;
      // this is a type-resolution mismatch, not an actual config error
      langs,
    },
  },
});
