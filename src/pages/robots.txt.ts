import type { APIRoute } from "astro";
import { getSiteSetting } from "emdash";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = async ({ site }) => {
  // Was "sitemap-index.xml" - that's Astro's own @astrojs/sitemap output,
  // which only sees pages it can crawl at build time (the 6 static shell
  // routes). EmDash's own generator at "sitemap.xml" is what actually
  // knows about the dynamic wisdom/glossary/projects/blog content - see
  // .claude/next-steps.md for the full finding. hasSeo still needs
  // enabling per collection in the admin for this to contain anything.
  const sitemapURL = new URL("sitemap.xml", site);
  const seo = await getSiteSetting("seo");
  const body = seo?.robotsTxt || getRobotsTxt(sitemapURL);
  return new Response(body);
};
