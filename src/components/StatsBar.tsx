import { site } from "@/content/site";

export function StatsBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
