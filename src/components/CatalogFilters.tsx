"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { HelmetType, Product } from "@/content/products";
import { brands, helmetTypes } from "@/content/products";
import { ProductCard } from "./ProductCard";

type CatalogFiltersProps = {
  products: Product[];
  initialBrand?: string;
  initialType?: string;
};

export function CatalogFilters({ products, initialBrand, initialType }: CatalogFiltersProps) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(initialBrand ?? "all");
  const [type, setType] = useState<HelmetType | "all">(
    (initialType as HelmetType) ?? "all"
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = brand === "all" || p.brand === brand;
      const matchesType = type === "all" || p.type === type;
      return matchesSearch && matchesBrand && matchesType;
    });
  }, [products, search, brand, type]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search helmets, brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as HelmetType | "all")}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            <option value="all">All Types</option>
            {helmetTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted">
        Showing {filtered.length} of {products.length} products
      </p>

      {filtered.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <p className="text-muted">No helmets match your filters. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
