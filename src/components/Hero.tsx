import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-2">
            {site.trustBadges.slice(0, 3).map((badge) => (
              <span key={badge} className="badge badge-accent">
                <Shield size={12} />
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {site.heroHeadline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {site.heroSubheadline}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/catalog" className="btn-primary px-8 py-3.5 text-base">
              {site.ctas.catalog}
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-secondary px-8 py-3.5 text-base">
              {site.ctas.primary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
