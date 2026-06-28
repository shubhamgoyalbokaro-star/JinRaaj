import createImageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "./client";
import { projectId, dataset } from "../../sanity/env";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset,
});

export function urlFor(source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0]) {
  return builder.image(source);
}

export function getImageUrl(
  source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0] | undefined | null
): string | null {
  if (!source) return null;
  return urlFor(source).width(1200).quality(85).url();
}
