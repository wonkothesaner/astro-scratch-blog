// The site's sitemap (robots.txt points here). Built from the same data as
// the blog listing and RSS feed, because EmDash's own /sitemap.xml builds
// URLs from a collection URL pattern, which can only fill in {slug}/{id} —
// it can't express posts' /blog/{category}/{slug} addresses.
import type { APIRoute } from "astro";
import { getTaxonomyTerms, type TaxonomyTerm } from "emdash";
import { NAV_PRIMARY, NAV_SECONDARY } from "../consts";
import { getAllPostCards } from "../utils/blog";

export const prerender = false;

// Terms come back as a tree; only terms with published posts get a page.
const withPosts = (terms: TaxonomyTerm[]): TaxonomyTerm[] =>
  terms.flatMap((t) => [...((t.count ?? 0) > 0 ? [t] : []), ...withPosts(t.children ?? [])]);

const entry = (loc: string, lastmod?: Date) =>
  `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ""}</url>`;

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const [posts, categories, tags] = await Promise.all([
    getAllPostCards(),
    getTaxonomyTerms("category"),
    getTaxonomyTerms("tag"),
  ]);

  const urls = [
    ...[...NAV_PRIMARY, ...NAV_SECONDARY].map((link) => entry(abs(link.href))),
    ...posts.map((post) => entry(abs(post.url), post.updatedDate ?? post.pubDate)),
    ...withPosts(categories).map((t) => entry(abs(`/blog/category/${t.slug}`))),
    ...withPosts(tags).map((t) => entry(abs(`/blog/tag/${t.slug}`))),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
