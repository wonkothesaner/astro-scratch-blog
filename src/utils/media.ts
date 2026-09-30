// Read a media library item's current details for a page. A post's stored
// image value is a snapshot taken when the image was picked, so captions
// added to the media library later only show up if we read the library.
import { getDb } from "emdash/runtime";

export async function getMediaItem(id: string | undefined) {
  if (!id) return undefined;
  const db = await getDb();
  const row = await db
    .selectFrom("media")
    .select(["caption", "storage_key"])
    .where("id", "=", id)
    .executeTakeFirst();
  if (!row) return undefined;
  return {
    /** Trimmed caption, or undefined when blank — used as the image credit. */
    caption: row.caption?.trim() || undefined,
    storageKey: row.storage_key,
  };
}
