// Site-specific rich-text blocks for the EmDash editor.
//
// Each block has two halves:
// - editor: declared in `admin.portableTextBlocks` below — appears in the
//   editor's "/" menu with a small form (plain fields only, no rich text);
// - site:   rendered by the Astro component mapped in ./blocks.ts, which
//   EmDash merges into every <PortableText> automatically.
//
// The editor stores a block as { _type, _key, id, ...fieldValues } and only
// round-trips blocks that carry field data, so every block needs at least
// one field. No `icon`: the editor only knows video, code, link,
// link-external and form, and shows a generic cube for anything else.
import { definePlugin } from "emdash";
import type { PluginDescriptor } from "emdash";

const ID = "site-blocks";
const VERSION = "0.1.0";

export function siteBlocksPlugin(): PluginDescriptor {
  return {
    id: ID,
    version: VERSION,
    format: "native",
    entrypoint: new URL("./index.ts", import.meta.url).pathname,
    componentsEntry: new URL("./blocks.ts", import.meta.url).pathname,
    options: {},
  };
}

export function createPlugin() {
  return definePlugin({
    id: ID,
    version: VERSION,
    admin: {
      portableTextBlocks: [
        {
          type: "groupBreak",
          label: "Group break",
          category: "Layout",
          description: "End an image + text group; the next content starts on its own row",
          fields: [
            {
              type: "select",
              action_id: "line",
              label: "Line",
              options: [
                { label: "None (spacing only)", value: "none" },
                { label: "Subtle line", value: "subtle" },
              ],
              initial_value: "none",
            },
          ],
        },
        {
          type: "styledHeading",
          label: "Styled heading",
          category: "Text",
          description: "A heading in a site tone: warning, success, info or muted",
          fields: [
            { type: "text_input", action_id: "text", label: "Heading text" },
            {
              type: "select",
              action_id: "level",
              label: "Level",
              options: [
                { label: "Heading 2", value: "h2" },
                { label: "Heading 3", value: "h3" },
                { label: "Heading 4", value: "h4" },
              ],
              initial_value: "h3",
            },
            {
              type: "select",
              action_id: "tone",
              label: "Tone",
              options: [
                { label: "Warning", value: "warning" },
                { label: "Success", value: "success" },
                { label: "Info", value: "info" },
                { label: "Muted", value: "muted" },
              ],
              initial_value: "warning",
            },
          ],
        },
      ],
    },
  });
}
