# JinRaaj — Helmet Wholesaler Website

Premium wholesale helmet website for **JinRaaj**, with **Sanity CMS** admin for non-technical content management.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity CMS Admin (Free)

The website owner can manage products and site info at **`/studio`** — no code required.

### 1. Create a free Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage) and create a project (free tier).
2. Copy the **Project ID**.

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_WRITE_TOKEN` | Sanity → API → Tokens (Editor role) |

### 3. Seed initial content (one time)

```bash
npm run seed:sanity
```

This uploads all 9 helmet products and site settings into Sanity.

### 4. Add env vars to Vercel

In your Vercel project → **Settings → Environment Variables**, add:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Redeploy after saving.

### 5. Invite the website owner

In Sanity dashboard → **Project → Members**, invite them as **Editor**.

They log in at `https://your-site.vercel.app/studio` to:

- **Add / edit / remove helmets** (Helmet Product)
- **Update phone, WhatsApp, address, FAQ** (Site Settings)
- **Toggle Featured** on homepage products
- **Unpublish** products instead of deleting

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/catalog` | Product catalog with filters |
| `/catalog/[slug]` | Product detail |
| `/wholesale` | Dealer program |
| `/about` | About page |
| `/contact` | Contact + WhatsApp enquiry form |
| `/faq` | FAQ |
| `/studio` | **Sanity CMS admin** |

## Fallback behaviour

If Sanity env vars are not set, the site uses built-in default content from `src/content/` so local dev and builds still work.

## Tech Stack

- Next.js 16 (App Router)
- Sanity CMS (free tier)
- Tailwind CSS v4
- Deployed on Vercel
