import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale & Dealer Program",
  description:
    "Become a JinRaaj dealer — competitive bulk pricing, pan-India delivery, and dedicated support for helmet retailers.",
};

export default function WholesalePage() {
  const { wholesale } = site;

  return (
    <>
      <PageHero
        eyebrow="Dealer Program"
        title={wholesale.headline}
        subtitle={wholesale.subheadline}
      />

      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Why Dealers Choose JinRaaj</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wholesale.benefits.map((benefit) => (
              <div key={benefit.title} className="card-surface p-6">
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
            How to Get Started
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wholesale.steps.map((step) => (
              <div key={step.step} className="card-surface p-6 text-center">
                <span className="text-3xl font-bold text-accent">{step.step}</span>
                <h3 className="mt-3 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Dealer Terms (Placeholder)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(wholesale.terms).map(([key, value]) => (
              <div key={key} className="card-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="mt-2 text-sm text-muted">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-primary px-8 py-3 text-base">
              {site.ctas.primary}
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
