/** Encode a product slug for use in a URL path segment (handles spaces, /, etc.). */
export function encodeProductSlug(slug: string): string {
  return encodeURIComponent(slug);
}

/** Decode slug from Next.js dynamic route params. */
export function decodeProductSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/** URL-safe slug: lowercase, hyphens, no slashes (recommended for new products). */
export function toUrlSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[/\\]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
