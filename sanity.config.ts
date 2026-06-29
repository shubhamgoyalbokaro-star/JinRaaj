import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "jinraaj",
  title: "JinRaaj CMS",
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("Brands")
              .schemaType("brand")
              .child(S.documentTypeList("brand").title("Brands")),
            S.listItem()
              .title("Helmet Products")
              .schemaType("product")
              .child(S.documentTypeList("product").title("Helmet Products")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
