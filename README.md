# Mise — F&B POS Landing & Demo

[![CI](https://github.com/chrstphrpond/mise/actions/workflows/ci.yml/badge.svg)](https://github.com/chrstphrpond/mise/actions/workflows/ci.yml)

> Built in 1 day · Live: https://mise-pos.vercel.app · Repo: chrstphrpond/mise

Production-quality Next.js 16 landing site for a fictional F&B POS SaaS. Started from a Webflow community Figma template and turned it into a complete rebrand with motion-driven interactions, a working backend, and a CDN-served asset pipeline.

## TL;DR

- **Stack:** Next.js 16 App Router · React 19 · Tailwind v4 · motion.dev · GSAP · Resend · Vercel Blob · Vercel Analytics
- **Lighthouse (mobile, prod, simulated 4G):** Performance **83** · Accessibility **93** · Best Practices **100** · SEO **100** — see [docs/lighthouse-summary.md](./docs/lighthouse-summary.md)
- **10+ pages** — home, contact, privacy, terms, security, status, integrations, docs, changelog, cookies, 404
- **A11y:** skip-to-content, ARIA on every tab/accordion/disclosure, `prefers-reduced-motion` honored across every animation
- **8 custom F&B brand SVGs · 103 Figma assets** served from Vercel Blob with 30-day immutable cache headers

## The brief

I picked up Arsakami's [Imapos POS SaaS Webflow template](https://www.figma.com/design/cdPUH3to3ARqDQE3Xj63bm/Imapos---POS-Saas-Webflow-Template) on the Figma community as a structural reference — section rhythm, typographic scale, and a starting palette. Everything that ships in this repo (every component, every animation, the brand, the backend, the copy, the SVG marks, the deploy) is mine. The template gave me a layout grid; I built the product.

## What I shipped beyond the source

- **Full rebrand** from "Imapos" to **Mise** (mise en place — a kitchen-vocabulary name that actually fits F&B)
- **Motion layer** — character-stagger hero reveal, animated gradient sweep on "Modern POS", iPad pointer-tilt + scroll parallax, viewport-triggered stat count-ups, scroll-progress bar, animated conic-gradient border on the featured pricing card (pure CSS `@property`)
- **8 hand-built F&B brand SVGs** for the trust strip (cafes, cloud kitchens, multi-outlet QSR) instead of generic Logoipsum filler
- **Working Resend contact form** (`/api/contact`) with toast feedback, server-side validation, and honeypot anti-spam
- **Operator-vocabulary copy** across hero, solution tabs, features, FAQ — kills the "AI default" sound
- **Vercel Blob asset pipeline** for 103 Figma exports + the iPad hero render, served from a separate CDN origin with `cache-control: public, max-age=2592000, immutable`
- **10+ supporting pages** so every footer link resolves to a real page, not a `#` (`/privacy`, `/terms`, `/cookies`, `/security`, `/status`, `/integrations`, `/docs`, `/changelog`, custom 404)
- **SEO** — dynamic OG image via Edge `ImageResponse`, sitemap, robots, canonical/Twitter/OpenGraph metadata on every route
- **A11y** — skip-to-content, ARIA tab + accordion patterns, `:focus-visible` rings, full `useReducedMotion` respect

## 3 decisions I'm proud of

**Custom F&B brand SVGs over Logoipsum.** The trust strip below the hero is where most landing pages cop out. Eight thin-stroke, mono-color marks for invented but plausible F&B concepts communicate the niche before anyone reads the H2 — viewers know who this product is for in 200ms. Sized for optical balance, rendered through an infinite marquee with a `prefers-reduced-motion` static fallback.

**"Mise" over a generic SaaS name.** _Mise en place_ — everything in its place — is the only piece of language every line cook on earth shares. The name does work the homepage doesn't have to: it signals "by people who know F&B", not "by people who made a POS." The original template name ("Imapos") was a portmanteau with no story.

**Vercel Blob for assets, not `/public`.** The hero iPad render and 103 Figma exports live in Vercel Blob with 30-day immutable headers, served from a separate CDN origin. Deploys stay lean (assets don't ship with code), I can swap a hero render without a redeploy, and cold-region TTFB on media is measurably better than build-artifact serving. Worth the extra setup for a portfolio piece where the asset story is part of the pitch.

## What I'd do differently

- **`unoptimized` on the hero `next/image`.** Turbopack's dev-mode `srcset` desyncs against remote Blob URLs with cache-busting query strings, causing a flash on first paint. I flipped `unoptimized` on the hero (only) to get deterministic dev/prod parity. A cleaner fix would be a custom loader or self-hosting that one asset through `/public`.
- **No live `RESEND_API_KEY` in prod.** The contact form route is wired, validated, and toast-confirmed, but production is missing the secret — submissions currently log server-side and return 200. Two-minute fix when I'm ready to take real mail.
- **Some Figma PNG exports still carry the old "IMAPOS" wordmark baked into the pixels.** The handful affected are inside laptop/iPad mockup screenshots where the rebrand only changed the surrounding chrome, not the bitmap. Either a quick Photoshop pass or a re-export from a forked Figma file.
- **`mise-pos.vercel.app`, not a custom domain.** A `.com` would close the loop on the portfolio framing. Cheap, just not done yet.

## Tech notes

**Why Next.js 16 + Turbopack.** Latest stable, App Router, React 19 baked in. Turbopack dev/build is fast enough that watch-mode feedback never broke flow. The trade-off is being on the bleeding edge of the `next/image` srcset behavior described above.

**Why Tailwind v4.** CSS-first config via `@theme` in `globals.css` instead of `tailwind.config.{js,ts}`. Tokens (colors, fonts, radii, shadows) live in CSS as custom properties — design-system-friendly, and editing tokens never invalidates the JS module graph.

**Why motion.dev over framer-motion.** Same team, same API surface, smaller core, direct DOM hooks (`useScroll`, `useTransform`) that compose cleanly with React 19's concurrent rendering. GSAP is still pulled in but only for ScrollTrigger-bound sequences (iPad parallax + stats) where it dominates.

**Auth/DB status.** Contact form is one live backend; the operator dashboard at `/app` is the other (see below). Together they cover the marketing surface and the product surface, with a clean upgrade path from in-memory demo to live Neon + Clerk.

## /app demo

A working operator dashboard at [`/app`](https://mise-pos.vercel.app/app) proves the landing-page claims. Menu CRUD, live orders, today's revenue — all real server-rendered Next.js queries.

**Default — demo mode.** No env vars required. Click "Enter demo" on `/app/welcome` and you get:

- A seeded outlet ("Brewsmith Coffee — Demo") with 12 menu items and 8 orders across the last 24 hours
- Full CRUD (add/edit/86/delete menu items)
- A "Simulate order" button on `/app/orders` that fires a new open order through the same server-action path a real POS terminal would use
- Status transitions: open → preparing → ready → paid
- Today dashboard with revenue, order count, average ticket, channel mix — all computed from live queries

Data lives in an in-memory module singleton (`src/lib/db/demo-store.ts`). It survives across server requests but resets on cold start, which is the right trade for a portfolio demo where every visitor gets a clean slate.

**Upgrade path — live mode.** Drop in real services by setting:

| Key | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon serverless Postgres connection string |
| `CLERK_SECRET_KEY` | Clerk server-side secret |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |

When both `DATABASE_URL` and `CLERK_SECRET_KEY` are present, the abstraction in `src/lib/db/client.ts` swaps to Drizzle + Neon and `src/lib/auth.ts` lazy-imports `@clerk/nextjs/server`. The route code is identical in either mode.

Schema lives in `src/lib/db/schema.ts` (Drizzle, PostgreSQL). Generate migrations with:

```bash
pnpm drizzle-kit generate --dialect=postgresql --schema=src/lib/db/schema.ts --out=drizzle
pnpm drizzle-kit push      # apply to DATABASE_URL
```

The initial migration is already committed at `drizzle/0000_*.sql`.

## Running locally

```bash
pnpm install

# Secrets managed via Doppler — no .env files in the repo
doppler setup        # link to project: mise / config: dev
doppler run -- pnpm dev

# Build + start (production)
doppler run -- pnpm build
doppler run -- pnpm start
```

Required secrets:

| Key | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Contact form delivery |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob writes (read is public; auto-provisioned on Vercel) |

If you don't run Doppler, a local `.env.local` with the same keys works — the app reads `process.env` directly.

## Deploy

```bash
vercel              # preview
vercel --prod       # production
```

Project is linked to `mise` on Vercel. Doppler's Vercel Marketplace integration auto-syncs the `prd` config — env vars are not managed in the Vercel dashboard directly.

## Credits

- Figma template by **Arsakami** — [Imapos POS SaaS Webflow Template](https://www.figma.com/design/cdPUH3to3ARqDQE3Xj63bm/Imapos---POS-Saas-Webflow-Template) (layout, type rhythm, and starting palette only — every component in this repo is original)
- Photography from Unsplash
- F&B brand SVG marks: my work
- Icons: lucide-react

## License

MIT.
