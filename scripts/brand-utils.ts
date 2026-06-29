/** Convert brand name to a stable Sanity document id. */
export function brandDocId(name: string): string {
  return `brand-${name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

export function brandSlug(name: string): string {
  return brandDocId(name).replace(/^brand-/, "");
}
