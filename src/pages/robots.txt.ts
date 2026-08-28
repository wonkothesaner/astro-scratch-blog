import type { APIRoute } from "astro";
import { getSiteSetting } from "emdash";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = async ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  const seo = await getSiteSetting("seo");
  const body = seo?.robotsTxt || getRobotsTxt(sitemapURL);
  return new Response(body);
};
