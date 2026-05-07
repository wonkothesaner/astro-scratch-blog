import React from "react";
import { config, fields, collection } from "@keystatic/core";
import { wrapper, mark } from "@keystatic/core/content-components";



export default config({
  storage: { kind: "local" },
  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      columns: ["title", "pubDate", "heroImage"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publication Date' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        heroImage: fields.text({
          label: 'Hero Image (path, e.g. ../../assets/images/blog/foo.png)',
          description: 'Drop the file into src/assets/images/blog/ via your editor, then enter the relative path here.'
        }),


        heroImageAlt: fields.text({ label: 'Hero Image Alt' }),
        heroFit: fields.select({
          label: 'Hero Fit',
          options: [
            { label: 'Cover', value: 'cover' },
            { label: 'Contain', value: 'contain' }
          ],
          defaultValue: 'cover'
        }),
        heroAspectRatio: fields.text({ label: 'Hero Aspect Ratio' }),
        heroPortrait: fields.checkbox({ label: 'Hero Portrait', defaultValue: false }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value
        }),
        content: fields.mdx({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "src/assets/images/blog",
              publicPath: "../../assets/images/blog/",
            },
          },
          components: {
            cite: mark({
              label: 'Citation',
              icon: React.createElement('span', null, '“'),
              schema: {},
            }),
            abbr: mark({
              label: 'Abbreviation',
              icon: React.createElement('span', null, 'Ab'),
              schema: { title: fields.text({ label: 'Title' }) },
            }),
            sub: mark({
              label: 'Subscript',
              icon: React.createElement('span', null, 's\u1D62'),
              schema: {},
            }),
            sup: mark({
              label: 'Superscript',
              icon: React.createElement('span', null, 's\u2071'),
              schema: {},
            }),
            kbd: mark({
              label: 'Keyboard',
              icon: React.createElement('span', null, 'K'),
              schema: {},
            }),
            mark: mark({
              label: 'Mark',
              icon: React.createElement('span', null, 'M'),
              schema: {},
            }),
            br: wrapper({
              label: 'Line Break',
              schema: {},
            }),
            HeaderLink: wrapper({
              label: 'Header Link',
              schema: {
                href: fields.text({ label: 'Link' }),
              },
            }),
          },



        }),

      },
    }),
  },
});


