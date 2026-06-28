import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { getSiteSettings } from "@/lib/data";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about JinRaaj wholesale helmet pricing, MOQ, delivery, and dealer terms.",
};

export default async function FaqPage() {
  const site = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Everything dealers and retailers need to know about ordering from JinRaaj."
      />

      <section className="section-padding pt-8">
        <div className="mx-auto max-w-3xl space-y-4">
          {site.faq.map((item) => (
            <details key={item.q} className="group card-surface p-6">
              <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-accent transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaSection
        site={site}
        title="Still Have Questions?"
        subtitle="Our team is happy to help with product selection, pricing, and dealer onboarding."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Browse Catalog"
        secondaryHref="/catalog"
      />
    </>
  );
}
