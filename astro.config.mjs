// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

// Resolve the browserslist query (declared in package.json) into the
// integer-encoded targets object that Lightning CSS expects.
const cssTargets = browserslistToTargets(browserslist());

// https://astro.build/config
export default defineConfig({
  site: "https://wts.services",
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    mdx(),
    sitemap(),
    react(),
    emdash({
      database: sqlite({ url: "file:./data.db" }),
      storage: local({
        directory: "./uploads",
        baseUrl: "/_emdash/api/media/file",
      }),
    }),
  ],
  trailingSlash: "never",
  server: {
    host: true,
    port: 4321,
  },
  markdown: {
    processor: unified({
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
    }),
  },
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: cssTargets,
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
});
