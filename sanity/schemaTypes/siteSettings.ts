import { defineArrayMember, defineField, defineType } from "sanity";

const titledBlock = (name: string, title: string) =>
  defineArrayMember({
    type: "object",
    name,
    fields: [
      defineField({ name: "title", title: "Title", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    ],
  });

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "homepage", title: "Homepage" },
    { name: "pages", title: "Pages" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Site Name", type: "string", group: "general" }),
    defineField({ name: "legalName", title: "Legal Name", type: "string", group: "general" }),
    defineField({ name: "domain", title: "Domain", type: "string", group: "general" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "general" }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 3, group: "general" }),
    defineField({ name: "disclaimer", title: "Disclaimer", type: "text", rows: 2, group: "general" }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", group: "homepage" }),
    defineField({ name: "heroSubheadline", title: "Hero Subheadline", type: "text", rows: 3, group: "homepage" }),
    defineField({
      name: "stats",
      title: "Stats Bar",
      type: "array",
      group: "homepage",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "trustBadges",
      title: "Trust Badges",
      type: "array",
      of: [{ type: "string" }],
      group: "homepage",
    }),
    defineField({
      name: "whyUs",
      title: "Why Us Section",
      type: "array",
      group: "homepage",
      of: [titledBlock("whyUsItem", "Why Us Item")],
    }),
    defineField({ name: "location", title: "Location", type: "string", group: "contact" }),
    defineField({ name: "serviceArea", title: "Service Area", type: "string", group: "contact" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "contact",
      fields: [
        { name: "line1", title: "Line 1", type: "string" },
        { name: "line2", title: "Line 2", type: "string" },
        { name: "city", title: "City / State / PIN", type: "string" },
        { name: "full", title: "Full Address", type: "text", rows: 2 },
      ],
    }),
    defineField({ name: "mapsUrl", title: "Google Maps URL", type: "url", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "Digits only with country code, e.g. 919332375667",
      group: "contact",
    }),
    defineField({ name: "gst", title: "GST Number", type: "string", group: "contact" }),
    defineField({ name: "businessHours", title: "Business Hours", type: "string", group: "contact" }),
    defineField({ name: "responseTime", title: "Response Time", type: "string", group: "contact" }),
    defineField({
      name: "ctas",
      title: "Call-to-Action Labels",
      type: "object",
      group: "homepage",
      fields: [
        { name: "primary", title: "Primary CTA", type: "string" },
        { name: "secondary", title: "Secondary CTA", type: "string" },
        { name: "catalog", title: "Catalog CTA", type: "string" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        { name: "title", title: "Meta Title", type: "string" },
        { name: "description", title: "Meta Description", type: "text", rows: 3 },
        { name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "wholesale",
      title: "Wholesale Page",
      type: "object",
      group: "pages",
      fields: [
        { name: "headline", title: "Headline", type: "string" },
        { name: "subheadline", title: "Subheadline", type: "text", rows: 3 },
        {
          name: "benefits",
          title: "Benefits",
          type: "array",
          of: [titledBlock("benefit", "Benefit")],
        },
        {
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "step", title: "Step Number", type: "string" },
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 2 },
              ],
            }),
          ],
        },
        {
          name: "terms",
          title: "Dealer Terms",
          type: "object",
          fields: [
            { name: "moq", title: "MOQ", type: "string" },
            { name: "payment", title: "Payment", type: "string" },
            { name: "shipping", title: "Shipping", type: "string" },
            { name: "warranty", title: "Warranty", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "about",
      title: "About Page",
      type: "object",
      group: "pages",
      fields: [
        { name: "headline", title: "Headline", type: "string" },
        { name: "story", title: "Story", type: "text", rows: 8 },
        { name: "mission", title: "Mission", type: "text", rows: 3 },
        {
          name: "values",
          title: "Values",
          type: "array",
          of: [titledBlock("value", "Value")],
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "pages",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text", rows: 3 },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
