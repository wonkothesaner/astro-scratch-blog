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
// import { seoPlugin } from "@jdevalk/emdash-plugin-seo";
// Disabled: its dependency @jdevalk/astro-seo-graph declares
// peerDependencies astro "^5.0.0 || ^6.0.0" — doesn't claim Astro 7 support
// at all (npm ls flags it "invalid"). Combined with a real, actively-tracked
// upstream Astro/@astrojs/cloudflare dev-mode dep-optimizer race (see
// withastro/astro#17788, #16248), this plugin's dependency chain was fighting
// two separate compatibility problems in dev mode simultaneously — one of the
// crashing chunks was literally an Astro middleware virtual module. The code
// that consumes it (BaseHead.astro's <EmDashHead>) is unaffected and was
// already verified working correctly with the plugin enabled; re-enable once
// @jdevalk/astro-seo-graph ships real Astro 7 support.

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
      // plugins: [seoPlugin()], // see note above
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
    optimizeDeps: {
      // astro/app/manifest is an Astro-internal module that crash logs under
      // the Cloudflare workerd dev runner consistently showed being
      // discovered *after* the initial cold-start dependency crawl rather
      // than during it — that late discovery triggers a disruptive
      // mid-session re-optimize + reload ("file does not exist ...
      // deps_ssr..."). Forcing it into the eager scan avoids the trigger.
      // Kept even with the SEO plugin disabled — unrelated to it, and part
      // of a broader known upstream issue class (withastro/astro#17788).
      include: ["astro/app/manifest"],
    },
  },
});
