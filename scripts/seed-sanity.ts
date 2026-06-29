/**
 * One-time seed script: imports default products and site settings into Sanity.
 *
 * Usage:
 *   1. Create a free project at https://sanity.io/manage
 *   2. Copy .env.example to .env.local and fill in values
 *   3. Create an API token with Editor permissions
 *   4. Run: npm run seed:sanity
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { defaultSite } from "../src/content/site";
import { defaultProducts } from "../src/content/products";
import { prepareProductForSanity, prepareSiteSettingsForSanity } from "./sanity-keys";
import { brandDocId, brandSlug } from "./brand-utils";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const imageMap: Record<string, string> = {
  "o2-prox-matt-sv": "o2-prox-matt-sv.png",
  "o2-prox-matt-dv": "o2-prox-matt-dv.png",
  "o2-woke-matt-spoiler": "o2-woke-matt-spoiler.png",
  "o2-prox-glossy-painted-dv": "o2-prox-glossy-painted-dv.png",
  "o2-prox-graphics-dv": "o2-prox-graphics-dv.png",
  "asho-nano": "asho-nano-red.png",
  "asho-6-jali-isi": "asho-6-jali-isi-glossy.png",
  "kaiser-track-pc": "kaiser-track-pc-red-glossy.png",
  "3-aces-blink-edge-etching": "3-aces-blink-edge-etching.png",
};

async function uploadProductImage(slug: string) {
  const filename = imageMap[slug];
  if (!filename) return undefined;

  const filePath = path.join(process.cwd(), "public/products", filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`Image not found for ${slug}: ${filePath}`);
    return undefined;
  }

  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seedBrands() {
  const names = [...new Set(defaultProducts.map((p) => p.brand))];
  const refs: Record<string, { _type: "reference"; _ref: string }> = {};

  for (const name of names) {
    const id = brandDocId(name);
    await client.createOrReplace({
      _id: id,
      _type: "brand",
      name,
      slug: { _type: "slug", current: brandSlug(name) },
    });
    refs[name] = { _type: "reference", _ref: id };
    console.log(`✓ Brand seeded: ${name}`);
  }

  return refs;
}

async function seedSiteSettings() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...prepareSiteSettingsForSanity(defaultSite as unknown as Record<string, unknown>),
  });
  console.log("✓ Site settings seeded");
}

async function seedProducts(brandRefs: Record<string, { _type: "reference"; _ref: string }>) {
  for (const product of defaultProducts) {
    const image = await uploadProductImage(product.slug);

    await client.createOrReplace({
      _id: `product-${product.slug}`,
      _type: "product",
      ...prepareProductForSanity({
        name: product.name,
        slug: { _type: "slug", current: product.slug },
        brand: brandRefs[product.brand],
        type: product.type,
        finish: product.finish,
        tagline: product.tagline,
        description: product.description,
        image,
        featured: product.featured ?? false,
        published: true,
        badges: product.badges,
        colors: product.colors,
        finishOptions: product.finishes,
        specs: product.specs,
        features: product.features,
        moq: product.moq,
        skuPrefix: product.skuPrefix,
      }),
    });

    console.log(`✓ Product seeded: ${product.name}`);
  }
}

async function main() {
  console.log(`Seeding Sanity project ${projectId} (${dataset})...`);
  await seedSiteSettings();
  const brandRefs = await seedBrands();
  await seedProducts(brandRefs);
  console.log("\nDone! Open /studio on your site to manage content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
