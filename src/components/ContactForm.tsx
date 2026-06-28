"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/content/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-surface p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Thank you for your enquiry!</p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll respond within {site.responseTime}. For faster response, WhatsApp us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="business" className="mb-1.5 block text-sm font-medium text-foreground">
            Business Name *
          </label>
          <input
            id="business"
            name="business"
            required
            placeholder="Shop / Company name"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
            Phone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@business.com"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-foreground">
          City / State *
        </label>
        <input
          id="city"
          name="city"
          required
          placeholder="e.g. Delhi, Maharashtra"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-foreground">
          Products of Interest
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
        >
          <option value="">Select a category</option>
          <option value="modular">Modular / Flip-Up (O2 PROX)</option>
          <option value="open-face">Open Face (NANO, TRACK PC, WOKE)</option>
          <option value="full-face">Full Face (6 JALI, BLINK)</option>
          <option value="all">Full Catalog / Mixed Order</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your business, expected order volume, and any specific models..."
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none resize-none"
        />
      </div>

      <button type="submit" className="btn-primary w-full py-3 text-sm sm:w-auto sm:px-8">
        Send Enquiry
        <Send size={16} />
      </button>

      <p className="text-xs text-muted">
        This form is a placeholder — submissions are not yet connected to email. Use WhatsApp for immediate response.
      </p>
    </form>
  );
}
