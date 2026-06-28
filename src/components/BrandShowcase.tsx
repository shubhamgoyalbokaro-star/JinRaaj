import Link from "next/link";
import { brands } from "@/content/products";

export function BrandShowcase() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Authorised Brands
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Premium Manufacturers We Distribute
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/catalog?brand=${encodeURIComponent(brand)}`}
              className="card-surface flex items-center justify-center p-8 text-center transition-all hover:border-accent/50"
            >
              <span className="text-xl font-bold tracking-wide text-foreground">{brand}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
