import { defineField, defineType } from "sanity";

export default defineType({
  name: "job",
  title: "Job Posting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (R) => R.required(),
      description: "e.g. Structured Cabling Technician — Bay Area, CA",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (R) => R.required(),
      description: "e.g. Bay Area, CA · Dallas, TX · Remote / Travel",
    }),
    defineField({
      name: "type",
      title: "Engagement Type",
      type: "string",
      options: {
        list: [
          { title: "1099 Contract", value: "1099 Contract" },
          { title: "W-2 Full-Time", value: "W-2 Full-Time" },
          { title: "W-2 Part-Time", value: "W-2 Part-Time" },
          { title: "Project-Based", value: "Project-Based" },
          { title: "Per Diem / Travel", value: "Per Diem / Travel" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Field Operations", value: "Field Operations" },
          { title: "Project Management", value: "Project Management" },
          { title: "Data Center", value: "Data Center" },
          { title: "Wireless & AP", value: "Wireless & AP" },
          { title: "Structured Cabling", value: "Structured Cabling" },
          { title: "Operations", value: "Operations" },
        ],
      },
    }),
    defineField({
      name: "summary",
      title: "Role Summary",
      type: "text",
      rows: 3,
      validation: (R) => R.required().max(300),
      description: "2-3 sentences shown on the careers listing page.",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
      description: "What the person will actually be doing on the job.",
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
      description: "Must-have skills, certifications, or experience.",
    }),
    defineField({
      name: "niceToHave",
      title: "Nice to Have",
      type: "array",
      of: [{ type: "string" }],
      description: "Preferred but not required.",
    }),
    defineField({
      name: "compensation",
      title: "Compensation",
      type: "string",
      description: "e.g. $35–$50/hr DOE · Per diem available for travel roles",
    }),
    defineField({
      name: "active",
      title: "Active Listing",
      type: "boolean",
      initialValue: true,
      description: "Toggle off to hide without deleting the posting.",
    }),
    defineField({
      name: "postedAt",
      title: "Posted Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title:    "title",
      location: "location",
      type:     "type",
      active:   "active",
    },
    prepare({ title, location, type, active }) {
      return {
        title,
        subtitle: `${active ? "✅" : "⏸"} ${type ?? ""} · ${location ?? ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Posted (Newest First)",
      name: "postedAtDesc",
      by: [{ field: "postedAt", direction: "desc" }],
    },
  ],
});
