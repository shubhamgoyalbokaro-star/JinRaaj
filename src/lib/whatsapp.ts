import { site } from "@/content/site";

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const whatsappMessages = {
  general: "Hi JinRaaj, I'm interested in wholesale helmet pricing.",

  product: (name: string, sku: string) =>
    `Hi JinRaaj, I'm interested in wholesale pricing for ${name} (${sku}). Please share price list and MOQ.`,

  enquiry: (data: {
    name: string;
    business: string;
    phone: string;
    email?: string;
    city: string;
    interest?: string;
    message?: string;
  }) => {
    let msg = `Hi JinRaaj, I'd like to enquire about wholesale helmets.

Name: ${data.name}
Business: ${data.business}
Phone: ${data.phone}`;

    if (data.email) msg += `\nEmail: ${data.email}`;
    msg += `\nCity: ${data.city}`;
    if (data.interest) msg += `\nProducts of Interest: ${data.interest}`;
    if (data.message) msg += `\nMessage: ${data.message}`;

    return msg;
  },
};
