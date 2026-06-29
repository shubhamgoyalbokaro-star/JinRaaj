type KeyedRecord = Record<string, unknown> & { _key?: string };

/** Sanity requires a unique `_key` on every object inside an array. */
export function withKeys<T extends KeyedRecord>(
  items: T[] | undefined,
  prefix: string
): (T & { _key: string })[] {
  if (!items?.length) return [];
  return items.map((item, index) => ({
    ...item,
    _key: item._key ?? `${prefix}-${index}`,
  }));
}

export function prepareSiteSettingsForSanity(site: Record<string, unknown>) {
  const wholesale = site.wholesale as Record<string, unknown> | undefined;
  const about = site.about as Record<string, unknown> | undefined;
  const seo = site.seo as Record<string, unknown> | undefined;

  return {
    ...site,
    stats: withKeys(site.stats as KeyedRecord[] | undefined, "stat"),
    whyUs: withKeys(site.whyUs as KeyedRecord[] | undefined, "whyUs"),
    faq: withKeys(site.faq as KeyedRecord[] | undefined, "faq"),
    wholesale: wholesale
      ? {
          ...wholesale,
          benefits: withKeys(wholesale.benefits as KeyedRecord[] | undefined, "benefit"),
          steps: withKeys(wholesale.steps as KeyedRecord[] | undefined, "step"),
        }
      : wholesale,
    about: about
      ? {
          ...about,
          values: withKeys(about.values as KeyedRecord[] | undefined, "value"),
        }
      : about,
    seo: seo
      ? {
          ...seo,
          keywords: seo.keywords ?? [],
        }
      : seo,
  };
}

export function prepareProductForSanity(product: Record<string, unknown>) {
  return {
    ...product,
    colors: withKeys(product.colors as KeyedRecord[] | undefined, "color"),
    finishOptions: withKeys(
      product.finishOptions as KeyedRecord[] | undefined,
      "finish"
    ),
    specs: withKeys(product.specs as KeyedRecord[] | undefined, "spec"),
  };
}
