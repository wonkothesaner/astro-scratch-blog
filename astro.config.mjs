// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

// Keystatic is only needed for local authoring
const isDev =
  process.env.NODE_ENV === "development" || process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  site: "https://wts.services",
  output: isDev ? "server" : "static",
  integrations: [mdx(), sitemap(), ...(isDev ? [react(), keystatic()] : [])],
  trailingSlash: "ignore",
  server: {
    host: true,
    port: 4321,
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " 🔗" },
          target: "_blank",
          rel: "noopener noreferrer",
        },
      ],
    ],
  },
});
