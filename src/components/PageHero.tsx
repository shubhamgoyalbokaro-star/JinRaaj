import { site } from "@/content/site";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function PageHero({ title, subtitle, eyebrow }: PageHeroProps) {
  return (
    <section className="hero-gradient border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
