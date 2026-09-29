import type { APIRoute } from "astro";
import { getSiteSetting } from "emdash";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = async ({ site }) => {
  // Our own sitemap (src/pages/site-sitemap.xml.ts): Astro's
  // @astrojs/sitemap only sees the fixed pages, and EmDash's /sitemap.xml
  // can't express posts' /blog/{category}/{slug} addresses.
  const sitemapURL = new URL("site-sitemap.xml", site);
  const seo = await getSiteSetting("seo");
  const body = seo?.robotsTxt || getRobotsTxt(sitemapURL);
  return new Response(body);
};
