export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;

export const brandsQuery = `*[_type == "brand"] | order(name asc) { name }`;

const productFields = `
  _id,
  name,
  "slug": slug.current,
  "brand": coalesce(brand->name, brand),
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
`;

export const productsQuery = `*[_type == "product" && published != false] | order(name asc) { ${productFields} }`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug && published != false][0] { ${productFields} }`;

export const productSlugsQuery = `*[_type == "product" && published != false].slug.current`;
