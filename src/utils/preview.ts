// Draft previews on listing pages (/wisdom, /glossary, /projects).
//
// EmDash serves a previewed draft only to single-entry lookups
// (getEmDashEntry), not to collection queries, so a listing page would show
// the published list and ignore the draft being previewed. The preview
// dispatcher (src/pages/preview/) passes the entry's id as ?entry=, and this
// swaps that draft into the list — or adds it, if it's never been published.
// Without a valid signed ?_preview= token, isPreview is false and the
// published list is returned unchanged.
import { getEmDashCollection, getEmDashEntry } from "emdash";

export async function getEntriesWithPreview<T extends string>(collection: T, url: URL) {
  const { entries } = await getEmDashCollection(collection, { status: "published" });
  const previewId = url.searchParams.get("entry");
  if (!previewId) return entries;

  const { entry, isPreview } = await getEmDashEntry(collection, previewId);
  if (!isPreview || !entry) return entries;

  const draft = entry as unknown as (typeof entries)[number];
  const id = (e: { data: unknown }) => (e.data as { id?: string }).id;
  const i = entries.findIndex((e) => id(e) === id(draft));
  return i === -1 ? [...entries, draft] : entries.map((e, j) => (j === i ? draft : e));
}
