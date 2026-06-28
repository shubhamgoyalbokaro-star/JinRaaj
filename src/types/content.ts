export type HelmetType = "modular" | "full-face" | "open-face" | "off-road";
export type HelmetFinish = "matte" | "glossy" | "graphics" | "painted";

export type ProductColor = {
  id: string;
  label: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  type: HelmetType;
  finish: HelmetFinish[];
  tagline: string;
  description: string;
  image: string;
  featured?: boolean;
  badges: string[];
  colors?: ProductColor[];
  finishes?: { id: string; label: string }[];
  specs: { label: string; value: string }[];
  features: string[];
  moq: string;
  skuPrefix: string;
};

export type SiteSettings = {
  name: string;
  legalName: string;
  domain: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  location: string;
  serviceArea: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    full: string;
  };
  mapsUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  gst: string;
  businessHours: string;
  responseTime: string;
  ctas: {
    primary: string;
    secondary: string;
    catalog: string;
  };
  stats: { value: string; label: string }[];
  trustBadges: string[];
  shortBio: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  disclaimer: string;
  wholesale: {
    headline: string;
    subheadline: string;
    benefits: { title: string; description: string }[];
    steps: { step: string; title: string; description: string }[];
    terms: {
      moq: string;
      payment: string;
      shipping: string;
      warranty: string;
    };
  };
  about: {
    headline: string;
    story: string;
    mission: string;
    values: { title: string; description: string }[];
  };
  whyUs: { title: string; description: string }[];
  faq: { q: string; a: string }[];
};

export const helmetTypes: { id: HelmetType; label: string }[] = [
  { id: "modular", label: "Modular / Flip-Up" },
  { id: "full-face", label: "Full Face" },
  { id: "open-face", label: "Open Face / Jet" },
  { id: "off-road", label: "Off-Road" },
];
