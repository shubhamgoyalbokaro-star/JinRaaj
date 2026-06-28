import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact JinRaaj for wholesale helmet pricing, dealer enquiries, and bulk orders. Phone, email, WhatsApp, and enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact JinRaaj"
        subtitle={`Wholesale enquiries answered within ${site.responseTime}. Reach us by phone, WhatsApp, email, or the form below.`}
      />

      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-surface p-6">
                <h2 className="text-lg font-bold text-foreground">Contact Details</h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-sm text-muted hover:text-accent-soft">
                        {site.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">WhatsApp</p>
                      <a
                        href={`https://wa.me/${site.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted hover:text-accent-soft"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-accent-soft">
                        {site.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Warehouse</p>
                      <p className="text-sm text-muted">{site.address.full}</p>
                      <p className="mt-1 text-xs text-muted">{site.serviceArea}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Business Hours</p>
                      <p className="text-sm text-muted">{site.businessHours}</p>
                    </div>
                  </li>
                </ul>
                <p className="mt-6 text-xs text-muted">{site.gst}</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="mb-6 text-lg font-bold text-foreground">Dealer Enquiry Form</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
