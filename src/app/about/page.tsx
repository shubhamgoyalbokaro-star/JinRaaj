import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about JinRaaj — India's trusted helmet wholesaler supplying O2, ASHO, Kaiser, and 3 ACES to dealers nationwide.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About JinRaaj"
        title={site.about.headline}
        subtitle={site.about.mission}
      />

      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            {site.about.story.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mb-4 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.about.values.map((value) => (
              <div key={value.title} className="card-surface p-6">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 card-surface p-8">
            <h2 className="text-xl font-bold text-foreground">Our Commitment</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Every helmet in our warehouse is sourced directly from authorised manufacturers.
              We stand behind the quality of every unit we ship — because your reputation as a
              dealer depends on the products you sell.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.trustBadges.map((badge) => (
                <span key={badge} className="badge badge-accent">{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Partner With a Wholesaler You Can Trust"
        subtitle="Join hundreds of dealers across India who rely on JinRaaj for quality helmets and reliable supply."
        secondaryLabel={site.ctas.primary}
        secondaryHref="/contact"
        primaryLabel={site.ctas.secondary}
        primaryHref="/wholesale"
      />
    </>
  );
}
