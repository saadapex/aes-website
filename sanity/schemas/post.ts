import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog listing page.",
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Industry Insights", value: "Industry Insights" },
          { title: "Field Operations", value: "Field Operations" },
          { title: "Data Center", value: "Data Center" },
          { title: "Wireless & AP", value: "Wireless & AP" },
          { title: "Structured Cabling", value: "Structured Cabling" },
          { title: "Company News", value: "Company News" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Saad Usmani",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", author: "author", media: "coverImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author, media };
    },
  },
  orderings: [
    { title: "Published (Newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
