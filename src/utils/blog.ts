// Shared helpers for blog post URL construction.
// Single source of truth: change the URL shape here and BlogCard, the
// dynamic route page, and the RSS feed will all stay in sync.

import type { CollectionEntry } from "astro:content";
import type { ContentEntry } from "emdash";
import type { Post as EmdashPost } from "../../.emdash/types";
import type { CategorySlug } from "../consts";

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

// Astro's <Image> (file-based assets) and EmDash's <Image> from "emdash/ui"
// (MediaValue references) need different, incompatible prop shapes, and
// EmDash's stored media value has no reliable top-level `src`/`url` — it
// must be resolved by EmDash's own component. Tag which renderer applies
// rather than duck-typing the shape at render time.
export type PostCardImage =
  | { kind: "file"; asset: NonNullable<CollectionEntry<"blog">["data"]["heroImage"]> }
  | { kind: "emdash"; value: NonNullable<EmdashPost["featured_image"]> };

/**
 * Normalized shape both file-based and EmDash-sourced posts map onto, so
 * BlogCard and the listing pages don't need to know which source a post
 * came from.
 */
export interface PostCard {
  title: string;
  description?: string;
  pubDate: Date;
  category: CategorySlug;
  url: string;
  heroImage?: PostCardImage;
}

export function postCardFromFile(post: CollectionEntry<"blog">): PostCard {
  return {
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    category: post.data.category,
    url: postUrl(post),
    heroImage: post.data.heroImage ? { kind: "file", asset: post.data.heroImage } : undefined,
  };
}

export function postCardFromEmdash(entry: ContentEntry<EmdashPost>): PostCard {
  const category = entry.data.category as CategorySlug;
  return {
    title: entry.data.title,
    description: entry.data.excerpt,
    pubDate: new Date(entry.data.pub_date),
    category,
    url: `/blog/${category}/${entry.data.slug}`,
    heroImage: entry.data.featured_image
      ? { kind: "emdash", value: entry.data.featured_image }
      : undefined,
  };
}
