# Lighthouse Summary

Run against `https://mise-pos.vercel.app` — mobile form factor, simulated 4G throttling, headless Chrome (Lighthouse 13.3.0). Fetched 2026-05-22.

| Category | Score |
| --- | --- |
| Performance | 83 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

Core Web Vitals (lab):

| Metric | Value |
| --- | --- |
| First Contentful Paint | 1.6 s |
| Largest Contentful Paint | 4.2 s |
| Total Blocking Time | 20 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 4.2 s |

LCP is the obvious next win — the hero iPad render is the LCP element and ships eagerly with `priority`. Deferring the GSAP/ScrollTrigger bundle off the critical path is the second-biggest lever.

Raw report: [`docs/lighthouse.json`](./lighthouse.json).

To re-run:

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
pnpm dlx lighthouse https://mise-pos.vercel.app \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile \
  --throttling-method=simulate \
  --output=json \
  --output-path=docs/lighthouse.json \
  --chrome-flags="--headless=new" \
  --quiet
```
