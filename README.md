# JinRaaj — Helmet Wholesaler Website

Premium wholesale helmet website for **JinRaaj**, featuring O2, ASHO, Kaiser, and 3 ACES product lines.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Products

1. Add helmet image to `public/products/`
2. Add product entry in `src/content/products.ts`
3. Rebuild — product pages are auto-generated from slugs

## Updating Business Info

Edit placeholder data in `src/content/site.ts`:

- Phone, email, WhatsApp
- Warehouse address & GST
- Business hours, stats, FAQ

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React icons

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured products, brands |
| `/catalog` | Full catalog with brand/type filters |
| `/catalog/[slug]` | Product detail page |
| `/wholesale` | Dealer program & terms |
| `/about` | Company story |
| `/contact` | Contact form & details |
| `/faq` | Frequently asked questions |
