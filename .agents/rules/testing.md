# Verification, Testing & Git Conventions

## Verification Commands

Run all checks from the repository root (`z:\aurix`):

| Command | Purpose |
| :--- | :--- |
| `npx tsc --noEmit` | Strict TypeScript type-checking across all App Router files, components, and metadata routes |
| `npm run lint` | Runs ESLint (`eslint-config-next` 16.4.5) |
| `npm run build` | Builds the production Next.js 16 application and validates static/cached route generation |
| `npm run build:worker` | Builds the Cloudflare Worker bundle using `@opennextjs/cloudflare` |
| `npm run preview:worker` | Builds and runs the local Cloudflare `workerd` preview server on port 8787 |
| `npm run deploy:worker` | Builds and deploys the worker live to Cloudflare Workers via Wrangler |
| `npm run dev` | Starts the local Next.js Turbopack dev server on `http://localhost:3000` |

## Endpoint & Route Smoke Checks

When modifying metadata, structured data, or discovery routes, verify that all endpoints return `200 OK` with expected `Content-Type` headers:

- `/` -> `text/html; charset=utf-8` (with valid `<script type="application/ld+json">` `@graph`)
- `/robots.txt` -> `text/plain`
- `/sitemap.xml` -> `application/xml`
- `/manifest.webmanifest` -> `application/manifest+json`
- `/llms.txt` -> `text/plain; charset=utf-8`
- `/opengraph-image`, `/icon`, `/apple-icon` -> `image/png`

## Pre-Commit Checklist

1. Run `npx tsc --noEmit` and ensure zero TypeScript errors.
2. Run `npm run lint` and resolve any ESLint issues.
3. If festival data (`EVENTS`, `DAYS`, `AMBASSADORS`, `FAQS`, `PRE_EVENT_RULES`) changed, update `app/festival-data.ts` so UI components, JSON-LD (`app/structured-data.ts`), and `/llms.txt` (`app/llms.txt/route.ts`) stay automatically synchronized.
4. When adding new images to `public/`, provide explicit `width`, `height`, and descriptive `alt` text in `app/festival-data.ts`, and prefer WebP with PNG/JPEG fallback where applicable.
5. Group commits by logical category (`feat(...)`, `fix(...)`, `perf(...)`, `assets:`, `chore:`) on `Main`.
