// Shared helpers for EmDash blog posts: URL shape, card data, category
// lookup and prev/next. Single source of truth for BlogCard, the listing
// pages, the post route and the RSS feed.

import { getEmDashCollection, getTermsForEntries } from "emdash";
import type { Post as EmdashPost } from "../../.emdash/types";

// Narrower than ContentEntry<EmdashPost> deliberately: getEntriesByTerm
// (used by the category/tag archive pages) returns a plain
// { id, data } shape without the `edit` visual-editing proxy that
// ContentEntry carries — this is the common subset both that and
// getEmDashCollection/getEmDashEntry results satisfy.
export type EmdashPostRef = { id: string; data: EmdashPost };

// EmDash's stored media value (rendered by <Image> from "emdash/ui").
export type PostCardImage = NonNullable<EmdashPost["featured_image"]>;

/**
 * The card-sized view of a post shared by BlogCard, the listing pages,
 * the RSS feed and prev/next navigation.
 */
export interface PostCard {
  title: string;
  description?: string;
  pubDate: Date;
  updatedDate?: Date;
  category: string;
  url: string;
  heroImage?: PostCardImage;
  heroImageAlt?: string;
}

// Category is a taxonomy relationship, not a schema field on the post
// itself — callers must resolve it (via getTermsForEntries/getEntryTerms)
// and pass the slug in, rather than this function reading entry.data.category.
export function postCardFromEmdash(entry: EmdashPostRef, categorySlug: string): PostCard {
  return {
    title: entry.data.title,
    description: entry.data.excerpt,
    pubDate: new Date(entry.data.pub_date),
    updatedDate: entry.data.updated_date ? new Date(entry.data.updated_date) : undefined,
    category: categorySlug,
    url: `/blog/${categorySlug}/${entry.data.slug}`,
    heroImage: entry.data.featured_image ?? undefined,
    heroImageAlt: entry.data.hero_image_alt,
  };
}

/**
 * Resolve the "category" taxonomy term slug for a batch of EmDash post
 * entries in one round trip. A post's URL needs its category, and the
 * editor can't make one mandatory (categories are saved separately from the
 * post, after its first save) — so a post without one is simply absent
 * from the map.
 */
export async function resolvePostCategories(
  entries: EmdashPostRef[],
): Promise<Map<string, string>> {
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
  const result = new Map<string, string>();
  for (const entry of entries) {
    const term = termsByEntry.get(entry.data.id)?.[0];
    if (term) result.set(entry.data.id, term.slug);
  }
  return result;
}

/**
 * Cards for posts that have a category, newest first. A published post
 * without one is left out (listings, sitemap, RSS) with a warning in the
 * Workers Logs, rather than failing every page that lists posts — its own
 * page 404s until it's given a category.
 */
export async function postCardsWithCategory(entries: EmdashPostRef[]): Promise<PostCard[]> {
  const categories = await resolvePostCategories(entries);
  const cards: PostCard[] = [];
  for (const entry of entries) {
    const category = categories.get(entry.data.id);
    if (category) {
      cards.push(postCardFromEmdash(entry, category));
    } else {
      console.warn(
        `[blog] Post "${entry.data.slug}" (${entry.data.id}) is published without a category; left out of listings until it has one.`,
      );
    }
  }
  return cards.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}

/**
 * All published posts, newest first — single implementation shared
 * by the blog listing, the homepage's recent-posts section, the RSS feed,
 * and prev/next neighbor lookups, so they can't drift out of sync.
 */
export async function getAllPostCards(): Promise<PostCard[]> {
  const { entries } = await getEmDashCollection("posts", { status: "published" });
  return postCardsWithCategory(entries);
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
