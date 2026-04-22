// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from 'rehype-external-links';

// Keystatic + React are only loaded in development
// This keeps the /keystatic admin route out of production builds entirely
const isDev = process.env.NODE_ENV !== "production";

const devIntegrations = [];
if (isDev) {
  const react = (await import("@astrojs/react")).default;
  const keystatic = (await import("@keystatic/astro")).default;
  devIntegrations.push(react(), keystatic());
}

// https://astro.build/config
export default defineConfig({
  site: "https://wts.services",
  integrations: [
    mdx(),
    sitemap(),
    ...devIntegrations,
  ],
  trailingSlash: "always",
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " 🔗" },
		  target: '_blank', 
		  rel: 'noopener noreferrer' 
        },
      ],
    ],
  },
});
