import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/catalog/${product.slug}`} className="group card-surface flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="badge badge-accent text-[10px]">{product.brand}</span>
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="badge text-[10px]">{badge}</span>
          ))}
        </div>
        <h3 className="text-base font-semibold text-foreground group-hover:text-accent-soft transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted line-clamp-2">{product.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          View Details
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
