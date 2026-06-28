export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;

export const productsQuery = `*[_type == "product" && published != false] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  brand,
  type,
  finish,
  tagline,
  description,
  image,
  featured,
  badges,
  colors,
  finishOptions,
  specs,
  features,
  moq,
  skuPrefix
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug && published != false][0] {
  _id,
  name,
  "slug": slug.current,
  brand,
  type,
  finish,
  tagline,
  description,
  image,
  featured,
  badges,
  colors,
  finishOptions,
  specs,
  features,
  moq,
  skuPrefix
}`;

export const productSlugsQuery = `*[_type == "product" && published != false].slug.current`;
