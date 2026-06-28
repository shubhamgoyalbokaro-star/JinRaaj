import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { getProductBySlug, products } from "@/content/products";
import { CtaSection } from "@/components/CtaSection";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import type { Metadata } from "next";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const productWhatsappUrl = whatsappUrl(
    whatsappMessages.product(product.name, product.skuPrefix)
  );

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </Link>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="card-surface relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="badge badge-accent">{product.brand}</span>
                {product.badges.map((badge) => (
                  <span key={badge} className="badge">{badge}</span>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{product.name}</h1>
              <p className="mt-2 text-lg text-accent-soft">{product.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

              <div className="mt-6 card-surface p-4">
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">SKU Prefix:</span> {product.skuPrefix}
                </p>
                <p className="mt-1 text-sm text-muted">
                  <span className="font-medium text-foreground">MOQ:</span> {product.moq}
                </p>
              </div>

              {product.colors && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-foreground">Available Colours</p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <div key={color.id} className="flex items-center gap-2">
                        <span
                          className="h-6 w-6 rounded-full border border-border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm text-muted">{color.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.finishes && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-foreground">Available Finishes</p>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((finish) => (
                      <span key={finish.id} className="badge badge-accent">{finish.label}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary px-6 py-3 text-sm">
                  Request Wholesale Quote
                </Link>
                <a
                  href={productWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3 text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp for Pricing
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="card-surface p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Specifications</h2>
              <dl className="mt-6 space-y-4">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:justify-between">
                    <dt className="text-sm font-medium text-muted">{spec.label}</dt>
                    <dd className="text-sm text-foreground sm:text-right sm:max-w-[60%]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card-surface p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground">Key Features</h2>
              <ul className="mt-6 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
