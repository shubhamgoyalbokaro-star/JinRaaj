import { PageHero } from "@/components/PageHero";
import { CatalogFilters } from "@/components/CatalogFilters";
import { CtaSection } from "@/components/CtaSection";
import { products } from "@/content/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helmet Catalog",
  description:
    "Browse JinRaaj wholesale helmet catalog — O2 modular, ASHO open-face, Kaiser, and 3 ACES full-face helmets.",
};

type CatalogPageProps = {
  searchParams: Promise<{ brand?: string; type?: string }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Wholesale Catalog"
        title="Helmet Catalog"
        subtitle="Filter by brand, type, or search by model name. All products available for bulk wholesale orders."
      />
      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl">
          <CatalogFilters
            products={products}
            initialBrand={params.brand}
            initialType={params.type}
          />
        </div>
      </section>
      <CtaSection
        title="Need a Custom Price List?"
        subtitle="Tell us your preferred models and order volume — we'll send tailored wholesale pricing."
      />
    </>
  );
}
