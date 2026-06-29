/**
 * Fixes "Missing keys" errors in Sanity Studio for existing documents.
 * Run once: npm run fix:sanity-keys
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import { prepareProductForSanity, prepareSiteSettingsForSanity } from "./sanity-keys";

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

async function fixSiteSettings() {
  const doc = await client.fetch<Record<string, unknown> | null>(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]`
  );

  if (!doc) {
    console.warn("No siteSettings document found — skip.");
    return;
  }

  const { _id, _type, _rev, ...rest } = doc;
  const patched = prepareSiteSettingsForSanity(rest);

  await client.patch("siteSettings").set(patched).commit();
  console.log("✓ Site settings keys fixed");
}

async function fixProducts() {
  const products = await client.fetch<Record<string, unknown>[]>(
    `*[_type == "product"]{ ..., "id": _id }`
  );

  for (const product of products) {
    const id = product.id as string;
    const { id: _, _rev, ...rest } = product;
    const patched = prepareProductForSanity(rest);
    await client.patch(id).set(patched).commit();
    console.log(`✓ Product keys fixed: ${product.name}`);
  }
}

async function main() {
  console.log(`Fixing array keys in Sanity project ${projectId}...`);
  await fixSiteSettings();
  await fixProducts();
  console.log("\nDone! Refresh /studio — the Missing keys warnings should be gone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
