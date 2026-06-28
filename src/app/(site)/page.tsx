import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import { BrandShowcase } from "@/components/BrandShowcase";
import { WhyUs } from "@/components/WhyUs";
import { CtaSection } from "@/components/CtaSection";
import { getFeaturedProducts, getProducts, getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [site, products, featured] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Hero site={site} />
      <StatsBar site={site} />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Featured Products"
              title="Top-Selling Helmet Lines"
              subtitle="Modular, full-face, and open-face helmets from India's leading brands — ready for wholesale."
            />
            <Link href="/catalog" className="btn-secondary shrink-0 px-5 py-2.5 text-sm">
              View All {products.length} Products
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <BrandShowcase />
      <WhyUs site={site} />
      <CtaSection site={site} />
    </>
  );
}
