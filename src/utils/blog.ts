// Shared helpers for blog post URL construction.
// Single source of truth: change the URL shape here and BlogCard, the
// dynamic route page, and the RSS feed will all stay in sync.

import type { CollectionEntry } from "astro:content";

/**
 * Compute the category/slug params for a blog post.
 * Keys here MUST match the [bracket] names in the page filename
 * (src/pages/blog/[category]/[slug].astro).
 *
 * - `category` comes from the post's required frontmatter enum.
 * - `slug` is the final path segment of post.id, which handles both
 *   flat content (`opinions` -> `opinions`) and nested content
 *   (`2025/07/opinions` -> `opinions`).
 */
export function postParams(post: CollectionEntry<"blog">) {
  return {
    category: post.data.category,
    slug: post.id.split("/").pop()!,
  };
}

/**
 * Construct the canonical URL path for a blog post.
 * Used by BlogCard links and the RSS feed.
 */
export function postUrl(post: CollectionEntry<"blog">) {
  const { category, slug } = postParams(post);
  return `/blog/${category}/${slug}`;
}
