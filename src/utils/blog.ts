// Shared helpers for blog post URL construction.
// Single source of truth: change the URL shape here and BlogCard, the
// dynamic route page, and the RSS feed will all stay in sync.

import type { CollectionEntry } from "astro:content";

/**
 * Compute the year/month/slug params for a blog post.
 * Keys here MUST match the [bracket] names in the page filename.
 * UTC is used deliberately so the same pubDate always resolves
 * to the same year/month regardless of the build machine's timezone.
 */
export function postParams(post: CollectionEntry<"blog">) {
  const d = post.data.pubDate;
  return {
    year: String(d.getUTCFullYear()),
    month: String(d.getUTCMonth() + 1).padStart(2, "0"),
    slug: post.id,
  };
}

/**
 * Construct the canonical URL path for a blog post.
 * Used by BlogCard links and the RSS feed.
 */
export function postUrl(post: CollectionEntry<"blog">) {
  const { year, month, slug } = postParams(post);
  return `/blog/${year}/${month}/${slug}`;
}
