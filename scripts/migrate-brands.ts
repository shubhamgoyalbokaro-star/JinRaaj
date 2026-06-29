/**
 * Converts legacy string brand fields on products into Brand references.
 * Run once after upgrading to the Brand document type: npm run migrate:brands
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
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

async function ensureBrand(name: string): Promise<string> {
  const id = brandDocId(name);
  await client.createIfNotExists({
    _id: id,
    _type: "brand",
    name,
    slug: { _type: "slug", current: brandSlug(name) },
  });
  return id;
}

async function main() {
  const products = await client.fetch<
    { _id: string; name?: string; brand?: string | { _ref: string } }[]
  >(`*[_type == "product"]{ _id, name, brand }`);

  let migrated = 0;

  for (const product of products) {
    if (typeof product.brand !== "string" || !product.brand.trim()) continue;

    const brandId = await ensureBrand(product.brand.trim());
    await client
      .patch(product._id)
      .set({ brand: { _type: "reference", _ref: brandId } })
      .commit();

    console.log(`✓ ${product.name}: linked to brand "${product.brand}"`);
    migrated++;
  }

  console.log(
    migrated
      ? `\nDone! Migrated ${migrated} product(s). Refresh /studio.`
      : "\nNo migration needed — products already use brand references."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
