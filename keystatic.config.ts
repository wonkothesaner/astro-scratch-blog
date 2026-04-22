import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        pubDate: fields.date({ label: "Publication Date" }),
        updatedDate: fields.date({ label: "Updated Date" }),
        heroImage: fields.text({ label: "Hero Image URL" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
  },
});
