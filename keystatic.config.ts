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
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.text({ label: 'Publication Date' }),
        updatedDate: fields.text({ label: 'Updated Date' }),
        heroImage: fields.text({ label: 'Hero Image' }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (props) => props.value }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "public/images/blog",
              publicPath: "/images/blog/",
            },
          },
        }),
      },
    }),
  },
});

