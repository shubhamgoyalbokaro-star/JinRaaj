import type { SiteSettings } from "@/types/content";
import type { Product } from "@/types/content";
import { defaultSite } from "@/content/site";
import { defaultProducts } from "@/content/products";
import { getImageUrl } from "@/sanity/image";
import {
  productBySlugQuery,
  productSlugsQuery,
  productsQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import { getSanityClient } from "@/sanity/client";
import { isSanityConfigured } from "../../sanity/env";
import { cache } from "react";

type SanityProduct = {
  slug: string;
  name: string;
  brand: string;
  type: Product["type"];
  finish: Product["finish"];
  tagline: string;
  description: string;
  image: Parameters<typeof getImageUrl>[0];
  featured?: boolean;
  badges?: string[];
  colors?: Product["colors"];
  finishOptions?: Product["finishes"];
  specs?: Product["specs"];
  features?: string[];
  moq?: string;
  skuPrefix: string;
};

function mapProduct(doc: SanityProduct): Product | null {
  const imageUrl = getImageUrl(doc.image);
  if (!doc.slug || !imageUrl) return null;

  return {
    slug: doc.slug,
    name: doc.name,
    brand: doc.brand,
    type: doc.type,
    finish: doc.finish ?? [],
    tagline: doc.tagline,
    description: doc.description,
    image: imageUrl,
    featured: doc.featured,
    badges: doc.badges ?? [],
    colors: doc.colors,
    finishes: doc.finishOptions,
    specs: doc.specs ?? [],
    features: doc.features ?? [],
    moq: doc.moq ?? "Contact for MOQ",
    skuPrefix: doc.skuPrefix,
  };
}

function mapSite(doc: Partial<SiteSettings> | null): SiteSettings {
  if (!doc) return defaultSite;
  return {
    ...defaultSite,
    ...doc,
    address: { ...defaultSite.address, ...doc.address },
    ctas: { ...defaultSite.ctas, ...doc.ctas },
    seo: { ...defaultSite.seo, ...doc.seo },
    wholesale: {
      ...defaultSite.wholesale,
      ...doc.wholesale,
      terms: { ...defaultSite.wholesale.terms, ...doc.wholesale?.terms },
    },
    about: {
      ...defaultSite.about,
      ...doc.about,
    },
    stats: doc.stats?.length ? doc.stats : defaultSite.stats,
    trustBadges: doc.trustBadges?.length ? doc.trustBadges : defaultSite.trustBadges,
    whyUs: doc.whyUs?.length ? doc.whyUs : defaultSite.whyUs,
    faq: doc.faq?.length ? doc.faq : defaultSite.faq,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSanityConfigured()) return defaultSite;

  try {
    const client = getSanityClient();
    if (!client) return defaultSite;
    const doc = await client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery);
    return mapSite(doc);
  } catch {
    return defaultSite;
  }
});

export const getProducts = cache(async (): Promise<Product[]> => {
  if (!isSanityConfigured()) return defaultProducts;

  try {
    const client = getSanityClient();
    if (!client) return defaultProducts;
    const docs = await client.fetch<SanityProduct[]>(productsQuery);
    if (!docs?.length) return defaultProducts;

    const mapped = docs.map(mapProduct).filter((p): p is Product => p !== null);
    return mapped.length ? mapped : defaultProducts;
  } catch {
    return defaultProducts;
  }
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  if (!isSanityConfigured()) {
    return defaultProducts.find((p) => p.slug === slug);
  }

  try {
    const client = getSanityClient();
    if (!client) {
      return defaultProducts.find((p) => p.slug === slug);
    }
    const doc = await client.fetch<SanityProduct | null>(productBySlugQuery, { slug });
    if (!doc) {
      return defaultProducts.find((p) => p.slug === slug);
    }
    return mapProduct(doc) ?? undefined;
  } catch {
    return defaultProducts.find((p) => p.slug === slug);
  }
});

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  return featured.length ? featured : products.slice(0, 4);
});

export const getProductSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured()) {
    return defaultProducts.map((p) => p.slug);
  }

  try {
    const client = getSanityClient();
    if (!client) return defaultProducts.map((p) => p.slug);
    const slugs = await client.fetch<string[]>(productSlugsQuery);
    return slugs?.length ? slugs : defaultProducts.map((p) => p.slug);
  } catch {
    return defaultProducts.map((p) => p.slug);
  }
});

export async function getBrands(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map((p) => p.brand))].sort();
}
