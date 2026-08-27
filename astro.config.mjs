// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import emdash from "emdash/astro";
import { d1, r2 } from "@emdash-cms/cloudflare";

// Resolve the browserslist query (declared in package.json) into the
// integer-encoded targets object that Lightning CSS expects.
const cssTargets = browserslistToTargets(browserslist());

// https://astro.build/config
export default defineConfig({
  site: "https://wts.services",
  output: "server",
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap(),
    react(),
    emdash({
      database: d1({ binding: "DB" }),
      storage: r2({ binding: "MEDIA" }),
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
