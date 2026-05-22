# Lighthouse Summary

Run against `https://mise.vercel.app` — desktop preset, single run, headless Chrome.

| Category | Score |
| --- | --- |
| Performance | 83 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

Raw report: [`docs/lighthouse.json`](./lighthouse.json).

To re-run:

```bash
pnpm dlx lighthouse https://mise.vercel.app \
  --output=json \
  --output-path=./docs/lighthouse.json \
  --chrome-flags="--headless" \
  --preset=desktop \
  --quiet
```
