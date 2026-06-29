import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Helmet Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      description: "Pick an existing brand or click + to create a new one.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Helmet Type",
      type: "string",
      options: {
        list: [
          { title: "Modular / Flip-Up", value: "modular" },
          { title: "Full Face", value: "full-face" },
          { title: "Open Face / Jet", value: "open-face" },
          { title: "Off-Road", value: "off-road" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "finish",
      title: "Finish Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Matte", value: "matte" },
          { title: "Glossy", value: "glossy" },
          { title: "Graphics", value: "graphics" },
          { title: "Painted", value: "painted" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide from the website without deleting.",
    }),
    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "colors",
      title: "Available Colours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label", title: "Label", type: "string" },
            { name: "hex", title: "Colour Hex", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "finishOptions",
      title: "Finish Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "moq",
      title: "Minimum Order Quantity",
      type: "string",
    }),
    defineField({
      name: "skuPrefix",
      title: "SKU Prefix",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "brand.name",
      media: "image",
    },
  },
});
