import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/types/content";

type CtaSectionProps = {
  site: SiteSettings;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaSection({
  site,
  title = "Ready to Stock Premium Helmets?",
  subtitle = "Get wholesale pricing, MOQ details, and pan-India delivery terms — response within 24 hours.",
  primaryLabel = site.ctas.primary,
  primaryHref = "/contact",
  secondaryLabel = site.ctas.secondary,
  secondaryHref = "/wholesale",
}: CtaSectionProps) {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center sm:px-16">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(245,158,11,0.15), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primaryHref} className="btn-primary px-8 py-3 text-base">
                {primaryLabel}
                <ArrowRight size={18} />
              </Link>
              <Link href={secondaryHref} className="btn-secondary px-8 py-3 text-base">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
