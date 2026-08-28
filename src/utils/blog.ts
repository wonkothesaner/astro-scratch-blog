// Shared helpers for blog post URL construction.
// Single source of truth: change the URL shape here and BlogCard, the
// dynamic route page, and the RSS feed will all stay in sync.

import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { getEmDashCollection, getTermsForEntries } from "emdash";
import type { Post as EmdashPost } from "../../.emdash/types";
import type { CategorySlug } from "../consts";

// Narrower than ContentEntry<EmdashPost> deliberately: getEntriesByTerm
// (used by the category/tag archive pages) returns a plain
// { id, data } shape without the `edit` visual-editing proxy that
// ContentEntry carries — this is the common subset both that and
// getEmDashCollection/getEmDashEntry results satisfy.
export type EmdashPostRef = { id: string; data: EmdashPost };

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

// Category is a taxonomy relationship, not a schema field on the post
// itself — callers must resolve it (via getTermsForEntries/getEntryTerms)
// and pass the slug in, rather than this function reading entry.data.category.
export function postCardFromEmdash(entry: EmdashPostRef, categorySlug: CategorySlug): PostCard {
  return {
    title: entry.data.title,
    description: entry.data.excerpt,
    pubDate: new Date(entry.data.pub_date),
    category: categorySlug,
    url: `/blog/${categorySlug}/${entry.data.slug}`,
    heroImage: entry.data.featured_image
      ? { kind: "emdash", value: entry.data.featured_image }
      : undefined,
  };
}

/**
 * Resolve the "category" taxonomy term slug for a batch of EmDash post
 * entries in one round trip. Every post is required to have exactly one
 * category term (enforced by editorial convention, not a DB constraint) —
 * throws loudly on a missing term rather than silently mis-categorizing,
 * since that would otherwise produce a broken /blog/undefined/<slug> URL.
 */
export async function resolvePostCategories(
  entries: EmdashPostRef[],
): Promise<Map<string, CategorySlug>> {
  // entry.id is the slug for getEmDashCollection/getEmDashEntry results —
  // the real ULID (what content_taxonomies.entry_id actually stores) lives
  // at entry.data.id. Using entry.id here silently produced empty term
  // lookups for every post rather than an obvious type error, since both
  // are plain strings.
  const termsByEntry = await getTermsForEntries(
    "posts",
    entries.map((e) => e.data.id),
    "category",
  );
  const result = new Map<string, CategorySlug>();
  for (const entry of entries) {
    const term = termsByEntry.get(entry.data.id)?.[0];
    if (!term) {
      throw new Error(`Post "${entry.data.id}" (${entry.data.slug}) has no category taxonomy term assigned`);
    }
    result.set(entry.data.id, term.slug as CategorySlug);
  }
  return result;
}

/**
 * The merged, sorted, all-sources post list — single implementation shared
 * by the blog listing, the homepage's recent-posts section, the RSS feed,
 * and prev/next neighbor lookups, so they can't drift out of sync.
 */
export async function getAllPostCards(): Promise<PostCard[]> {
  const [filePosts, { entries: emdashPosts }] = await Promise.all([
    getCollection("blog"),
    getEmDashCollection("posts", { status: "published" }),
  ]);
  const categories = await resolvePostCategories(emdashPosts);
  return [
    ...filePosts.map(postCardFromFile),
    ...emdashPosts.map((entry) => postCardFromEmdash(entry, categories.get(entry.data.id)!)),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}

/**
 * The previous (older) and next (newer) post relative to `currentUrl`
 * within the given list — pass the full site-wide list for single-post
 * navigation, or a category/tag-filtered subset to keep navigation scoped
 * to that archive.
 */
export function getAdjacentPosts(
  posts: PostCard[],
  currentUrl: string,
): { prev?: PostCard; next?: PostCard } {
  const index = posts.findIndex((p) => p.url === currentUrl);
  if (index === -1) return {};
  // posts are sorted newest-first: the next *array* entry is the older
  // (chronologically previous) post, and vice versa.
  return { prev: posts[index + 1], next: posts[index - 1] };
}
