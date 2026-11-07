# Code Style, Architecture & Design System Rules

Applies to the **AURIX 2027** web application (`z:\aurix`), the official anti-drug fitness festival experience presented by FitNFine Fitness Club in Ernakulam (Kochi), Kerala (January 8–10, 2027).

## Tech Stack & Next.js 16 Conventions

- **Framework**: Next.js `16.4.5` (App Router) with `cacheComponents: true`, `partialPrefetching: true`, and `@tailwindcss/turbopack` configured in `next.config.ts`.
- **Runtime Libraries**: React `19.3.0`, Three.js `^0.187.0` (`@types/three`), TypeScript `^5` (`strict: true`, path alias `@/*` -> `./*`).
- **Next.js 16 Documentation First**: Before adding or modifying Next.js APIs, metadata conventions, route handlers, or caching directives, check the bundled documentation in `node_modules/next/dist/docs/`.
- **Preserve `AGENTS.md`**: Never delete the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md`.
- **Viewport vs. Metadata**: In Next.js 16, `themeColor` and `colorScheme` belong in `export const viewport: Viewport` in `app/layout.tsx`, never inside `export const metadata: Metadata`.

## Repository Structure & Single Source of Truth

- `app/festival-data.ts` — **Canonical data module**. Holds `SITE_URL`, `FESTIVAL`, `DAYS`, `DAY_ISO_DATES`, `EVENTS` (with image paths, dimensions, `alt` text, rules, and kit requirements), `MORE_EVENTS`, `AMBASSADORS`, `FAQS` (BLUF self-contained answers), `PRE_EVENT_RULES`, `WHY_WORDS`, `CALENDAR_URL`, and `dayCalendarUrl`.
  - **Rule**: Never duplicate or hardcode festival dates, event rules, ambassador profiles, or FAQs in individual components or routes. Import them from `app/festival-data.ts`.
- `app/page.tsx` — Server Component entry point. Renders the `@graph` JSON-LD `<script type="application/ld+json">` tag alongside `<AurixExperience />`.
- `app/aurix-experience.tsx` — Client Component (`"use client"`) containing the interactive festival experience:
  - Three.js custom FBM lava/crimson shader + 360-line particle field (`<canvas className="aurix-webgl" />`).
  - Virtual smooth-scroll controller (`animateScroll`) with velocity skew and scroll progress bar.
  - 3D stacking event card deck (`.stack-section`, `.stack-stage`, `.stack-card`).
  - Horizontal scroll-linked ambassador/leadership track (`.ambassador-section`, `.ambassador-track`, `.ambassador-card`).
  - Scroll-linked word-by-word reveal (`.why-copy`), pledge confetti burst, and WhatsApp registration link generator.
- `app/structured-data.ts` — Builds the connected `@graph` JSON-LD payload (`SportsOrganization`, `WebSite`, `WebPage` with `SpeakableSpecification`, `SportsEvent` + 5 `subEvent`s, and `FAQPage`).
- `app/llms.txt/route.ts` — Route Handler serving the `llmstxt.org`-compliant Markdown briefing at `/llms.txt`.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.tsx` — Next.js App Router metadata, static brand icons, and discovery routes.

## Design System & CSS Conventions (`app/globals.css`)

- **Brand Tokens**:
  - `--red: #d10a0a` (Primary AURIX crimson)
  - `--deep: #5e0505` (Deep blood-red surface for dark sections & footer)
  - `--bone: #f2ede4` (Primary bone/off-white typography and borders)
  - `--ink: #14060a` (Dark contrast ink)
- **Typography Tokens**:
  - `--display`: `Big Shoulders Display` (weights 800, 900) loaded via `next/font/local` in `app/layout.tsx` (`app/fonts/big-shoulders-display.woff2`) for zero-layout-shift and clean Turbopack compilation.
  - `--body`: `Schibsted Grotesk` (weights 400, 600, 700) loaded via `next/font/google` in `app/layout.tsx`.
- **Styling Discipline**:
  - Keep component layout, keyframe animations, and media queries (`max-width: 900px`, `max-width: 640px`, `prefers-reduced-motion: reduce`) in `app/globals.css`.
  - Preserve visual hierarchy and brutalist/kinetic editorial styling (sharp `2px solid var(--bone)` borders, uppercase display typography, high-contrast overlays on photography).

## Accessibility & Semantic HTML

- Maintain a single `<h1 className="hero-mark">` on the page with `.sr-only` context (`AURIX 2027 — Anti-Drug Fitness Festival in Ernakulam, Kochi, Kerala`), followed by logical `<h2>` and `<h3>` hierarchy across sections.
- Every content `<img>` in `.stack-card-media` and `.ambassador-card-media` must include descriptive `alt` text and explicit `width` and `height` attributes from `app/festival-data.ts`.
- Decorative backdrops, overlays, and cursors (`.ambient-backdrop`, `.aurix-webgl`, `.scroll-progress`, `.custom-cursor`, `.stack-card-overlay`, `.ambassador-card-overlay`, `.card-shade`) must carry `aria-hidden="true"`.
