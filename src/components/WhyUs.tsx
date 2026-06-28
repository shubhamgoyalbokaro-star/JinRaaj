import { Package, Shield, Truck, Headphones } from "lucide-react";
import { site } from "@/content/site";

const icons = [Package, Shield, Truck, Headphones];

export function WhyUs() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Why JinRaaj
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Your One-Stop Helmet Wholesale Partner
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.whyUs.map((item, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <div key={item.title} className="card-surface p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
