# Mise

A restaurant point-of-sale concept expressed through a responsive marketing website, motion-led UI, and a server-side contact form.

[Website](https://mise-pos.vercel.app) · [Portfolio](https://chrstphrpond.dev) · [CI](https://github.com/chrstphrpond/mise/actions/workflows/ci.yml)

## Overview

Mise is a portfolio implementation for a fictional food-and-beverage software brand. It combines a Next.js marketing site, reusable page sections, interactive motion, supporting information pages, and a Resend-backed contact endpoint.

The visual starting point is Arsakami's **Imapos POS SaaS Webflow Template**, credited below. This repository presents the Mise adaptation and implementation, not an original-from-scratch visual brief.

**Scope:** the public code contains the marketing experience and contact API. It does not contain a working POS, operator dashboard, authentication system, or database-backed order management. Product claims and customer-brand examples on the website belong to the fictional concept.

## Highlights

- Modular homepage sections for features, solutions, pricing, testimonials, and FAQs.
- Responsive navigation, animated interactions, and motion utilities.
- Contact form with server-side required-field/email validation and error responses.
- Supporting pages for documentation, integrations, security, status, and policies.
- Metadata routes for social images, sitemap, and robots.
- A Vercel Blob asset manifest and a separate Remotion video composition.
- Playwright scenarios for the homepage, supporting pages, and contact flow.
- GitHub Actions configuration for type checking, linting, builds, and browser tests.

## Run locally

Use Node.js 24 and pnpm 10 to match the committed CI configuration.

```bash
git clone https://github.com/chrstphrpond/mise.git
cd mise
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Images referenced in the hosted asset manifest need network access.

### Contact email setup

The site can run without email credentials. Without `RESEND_API_KEY`, the contact endpoint logs the submitted payload locally and returns a development-mode response; **no email is sent**. Use fictional contact details when testing.

For email-enabled development, configure `RESEND_API_KEY` in your own Doppler project, then run:

```bash
doppler setup
doppler run -- pnpm dev
```

The sender and recipient are currently constants in [the contact route](src/app/api/contact/route.ts), not environment-variable settings. Review and replace those addresses for your own deployment before enabling delivery. Do not commit credentials.

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright starts a local development server by default. Keep email credentials unset for local smoke tests to avoid sending real messages. The CI link above shows actual run status; the presence of a workflow is not a claim that every check currently passes.

## Code guide

| Location | What to review |
| --- | --- |
| [src/components/sections](src/components/sections) | Reusable marketing sections |
| [src/components/visuals](src/components/visuals) | Tilt, scrolling, and brand visuals |
| [src/app/api/contact/route.ts](src/app/api/contact/route.ts) | Validation, email delivery, and error handling |
| [src/lib/blob-manifest.ts](src/lib/blob-manifest.ts) | Hosted asset references |
| [tests/e2e](tests/e2e) | Browser-level smoke tests |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | Verification pipeline |
| [remotion](remotion) | Video composition source |

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lenis · Resend · Vercel Blob · Playwright · Remotion

## Limitations

This is a portfolio marketing site, not production restaurant infrastructure. Some source-template imagery retains the original Imapos branding. The contact endpoint would need further production hardening, including abuse prevention and an appropriate data-handling policy, before use with real customer enquiries.

## Credits

- Visual reference: [Imapos POS SaaS Webflow Template by Arsakami](https://www.figma.com/design/cdPUH3to3ARqDQE3Xj63bm/Imapos---POS-Saas-Webflow-Template).
- Photography: Unsplash. Icons: Lucide.
- Mise adaptation and development: Christopher Pond Maquidato.

[More design and engineering work](https://chrstphrpond.dev)
