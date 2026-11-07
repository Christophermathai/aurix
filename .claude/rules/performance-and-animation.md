# 60–120 FPS Scroll, 3D Deck & WebGL Performance Rules

Applies to `app/aurix-experience.tsx` and `app/globals.css`. The AURIX experience relies on a custom virtual smooth-scroll loop (`animateScroll`) and a Three.js WebGL background running concurrently. Follow these rules strictly to prevent frame drops and layout thrashing.

## 1. Zero Layout Thrashing in `requestAnimationFrame`

- **Never read layout geometry inside `animateScroll`**: Do not call `offsetTop`, `offsetHeight`, `scrollWidth`, `clientHeight`, or `getBoundingClientRect()` inside the per-frame `animateScroll` loop.
- **Compute and cache in `measure()`**: Calculate all section offsets (`stackTop`, `ambientTop`, `ambientTravel`, `cachedJoinTop`, `cachedWhyTop`, `cachedWhyHeight`, `maxScroll`) inside `measure()`, which runs only on initial mount, `ResizeObserver`, and `window.resize`.

## 2. Pre-Cache DOM Queries Outside the Loop

- Query `.stack-card`, `.stack-card-inner`, `.card-shade`, and `.why-copy span` **once** during effect initialization (`cardElements` and `whyWords` arrays).
- Never call `querySelector` or `querySelectorAll` inside `animateScroll`.

## 3. Compositor-Only Mutations on 3D Stacking Cards

- Inside the `cardElements.forEach` loop in `animateScroll`, only mutate GPU-accelerated compositor properties:
  - `card.style.transform` (`translate3d`, `scale`, `rotateX`, `rotateY`)
  - `card.style.visibility` (`"hidden"` or `"visible"`)
  - `inner.style.transform` (`translate3d`) and `inner.style.opacity`
  - `shade.style.opacity`
- **Never mutate `borderRadius` per frame**: Dynamic `border-radius` changes force expensive CPU re-rasterization of full-screen card layers on every scroll tick. Keep `border-radius: 28px 28px 0 0` static in `app/globals.css` alongside `contain: layout paint`.
- **Cull occluded and off-screen cards**: When `enter <= 0 || depth >= 2.5`, set `card.style.visibility = "hidden"` and `return` immediately to skip transform math for hidden cards.
- **Card Text Reveal Timing**: Card inner content (`.stack-card-inner`) fades in and slides up (`32px -> 0px`) over the final 40% of card entry (`enter` from `0.6` to `1.0`) and recedes smoothly as the next card covers it (`depth` from `0.45` to `0.85`). Scope `will-change: transform, opacity` strictly to `.stack-card-inner`.

## 4. Progressive Enhancement & Reduced Motion

- **No-JS Crawler Fallback**: `.smooth-content` defaults to `position: relative` in `app/globals.css` so search/AI crawlers without JS render a standard scrollable document. `smoothContent.classList.add("is-smooth-ready")` applies `position: fixed` only after client JS mounts (and must be added before calling `measure()`).
- **Respect `prefers-reduced-motion: reduce`**: When `reducedMotion.matches` is true, disable 3D perspective tilt (`rotateX`/`rotateY`), velocity skew, and confetti bursts, and snap scroll interpolation directly (`renderedY = targetY`).
