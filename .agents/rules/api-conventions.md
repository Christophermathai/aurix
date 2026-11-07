# Metadata Routes, SEO, AEO & GEO Conventions

Applies to Next.js metadata routes (`app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.tsx`), `/llms.txt` (`app/llms.txt/route.ts`), and JSON-LD structured data (`app/structured-data.ts`).

## 1. SEO & Discovery Routes

- **Canonical Origin**: Controlled via `SITE_URL` (`process.env.NEXT_PUBLIC_SITE_URL || "https://aurix.fitnfine.in"`) in `app/festival-data.ts`.
- **`app/robots.ts` (`/robots.txt`)**:
  - Allows `/` and `/llms.txt` for all standard crawlers (`*`) and explicitly named AI search/answer bots (`OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `Google-Extended`, `Applebot-Extended`).
  - Disallows static prototype HTML files (`/*.html`, `/AURIX*.html`) in `public/` to prevent duplicate-content cannibalization.
- **`app/sitemap.ts` (`/sitemap.xml`)**:
  - Publishes `/` and `/llms.txt`.
  - Uses deterministic ISO date strings rather than uncached `new Date()` calls so static generation succeeds under `cacheComponents: true`.
- **Brand Icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) & `next/og` Social Card (`app/opengraph-image.tsx`)**:
  - `app/favicon.ico`, `app/icon.png` (`256x256`), and `app/apple-icon.png` (`256x256`) serve the dedicated AURIX "A" emblem across desktop tabs, Google Search results, iOS home screens, and the Web App Manifest.
  - `app/opengraph-image.tsx` imports `ImageResponse` from `"next/og"`. Every `<div>` with multiple children inside `ImageResponse` must explicitly declare `display: "flex"`.

## 2. Answer Engine Optimization (AEO) & Structured Data (`app/structured-data.ts`)

- **`@graph` Architecture**: All Schema.org entities are emitted in a single connected `@graph` JSON-LD payload in `app/page.tsx`:
  1. `SportsOrganization` (`#organization`) — FitNFine Fitness Club, Ernakulam, Kochi, Kerala (`682016`).
  2. `WebSite` (`#website`) — Linked to `#organization`.
  3. `WebPage` (`#webpage`) — Includes `SpeakableSpecification` targeting `.hero-description`, `#schedule .section-heading`, and `#why .why-copy`.
  4. `SportsEvent` (`#festival`) — ISO 8601 IST timestamps (`+05:30`), `EventScheduled`, `OfflineEventAttendanceMode`, `isAccessibleForFree: true`, `offers` (`PreOrder`, `0 INR`), and 5 nested `subEvent` `SportsEvent` nodes.
  5. `FAQPage` (`#faq`) — Maps directly from `FAQS` in `app/festival-data.ts`.
- **BLUF FAQ Standard**: Every FAQ answer in `app/festival-data.ts` must follow the **Bottom-Line-Up-Front (BLUF)** pattern (self-contained 35–55 word answers explicitly naming AURIX 2027, FitNFine Fitness Club, Jan 8–10, 2027, and Ernakulam/Kochi) so AI Overviews and voice assistants can quote answers directly.

## 3. Generative Engine Optimization (GEO) (`app/llms.txt/route.ts`)

- `/llms.txt` serves a clean Markdown document (`Content-Type: text/plain; charset=utf-8`) following the `llmstxt.org` specification.
- It dynamically interpolates `FESTIVAL`, `DAYS`, `DAY_ISO_DATES`, `EVENTS`, `AMBASSADORS`, `PRE_EVENT_RULES`, and `FAQS` from `app/festival-data.ts` so LLM agents always ingest current facts with zero drift.

## 4. Cloudflare Workers Runtime (`wrangler.jsonc` & `open-next.config.ts`)

- Deployment to Cloudflare Workers is managed via `@opennextjs/cloudflare`.
- Worker entry point is `.open-next/worker.js`, running with `compatibility_flags: ["nodejs_compat"]`.
- Static assets (images, fonts, stylesheets) are extracted to `.open-next/assets` and served through the `ASSETS` binding.
- Exclude `open-next.config.ts`, `.open-next`, and `.wrangler` from `tsconfig.json` so the Next.js app compiler does not type-check external build tools.
