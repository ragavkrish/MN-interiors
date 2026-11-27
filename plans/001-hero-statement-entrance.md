# 001 — Add a one-time statement entrance to the hero

- **Status**: DONE
- **Commit**: 1bfe8ec
- **Severity**: MEDIUM (missed opportunity — highest leverage on the site)
- **Category**: Missed opportunities / delight budget
- **Estimated scope**: 2 files (`src/components/Hero.tsx`, `src/index.css`), ~80 lines

## Problem

The hero is the first thing every visitor sees, once per visit — the single "rare / first-time"
moment on this marketing page where the delight budget is allowed. Today it renders fully static
while every section below it now has a scroll entrance, so the page's most important statement has
the least presence.

```tsx
/* src/components/Hero.tsx:15-29 — current */
{/* Outlined status pill */}
<div className="mb-6 inline-flex items-center gap-2.5 rounded-[99px] border border-white/18 px-4 py-2 text-[13px] font-medium text-white/85">
  <span className="live-dot" aria-hidden="true" />
  <span>KUNDRATHUR, CHENNAI · 4.9 ★ GOOGLE RATED (71 REVIEWS)</span>
</div>

<h1 className="hero-h1 text-white">
  20+ YEARS OF
  <br />
  CHENNAI INTERIORS.
  <br />
  <em>CRAFTED TO LAST</em>
  <br />
  <em>EVERY DAY.</em>
</h1>
```

Constraints: the `<h1>` is the page's main content on load, so the whole entrance must finish in
about 1.1s, must never block clicks on the CTA buttons, and must not depend on JavaScript.

## Target

A pure-CSS, play-once-on-load entrance (keyframes are correct here: it runs once and is never
interrupted or retriggered).

1. **Headline lines rise from behind a mask**, one after another. Each line is a block wrapper with
   `overflow: hidden`; its inner block starts at `translateY(100%)` and settles to `0`.
   - Duration **700ms**, easing **`var(--ease-out)`** = `cubic-bezier(0.23, 1, 0.32, 1)`.
   - Start delays per line (non-uniform, gaps shrink slightly then the pink payoff lands):
     line 1 **0ms**, line 2 **80ms**, line 3 (pink) **170ms**, line 4 (pink) **260ms**.
   - Masks get `padding-bottom: 0.08em; margin-bottom: -0.08em;` so glyph bottoms never clip.
2. **Status pill**: opacity `0 → 1`, **400ms `var(--ease-out)`**, delay **0ms** (no movement).
3. **Paragraph, CTA row, small trust row**: opacity `0 → 1` + `translateY(12px) → 0`,
   **500ms `var(--ease-out)`**, delays **350ms / 420ms / 480ms**.
4. **Right summary card**: opacity `0 → 1` + `translateY(16px) → 0`, **700ms `var(--ease-out)`**,
   delay **450ms**.
5. All use `animation-fill-mode: both`. Total entrance ends at ~1.15s.
6. **Reduced motion** (`prefers-reduced-motion: reduce`): no transforms; every hero element does a
   plain opacity fade, **300ms ease**, no delays.
7. Screen readers must still read the `<h1>` as one sentence: the wrapper spans are presentational
   only (no `aria-hidden`, no extra text).

```css
/* target (append to src/index.css) */
.hero-line { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.hero-line-inner { display: block; animation: hero-line-rise 700ms var(--ease-out) both; }
@keyframes hero-line-rise { from { transform: translateY(100%); } to { transform: none; } }
@keyframes hero-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes hero-rise-in { from { opacity: 0; transform: translateY(var(--hero-rise, 12px)); } to { opacity: 1; transform: none; } }
```

## Repo conventions to follow

- Motion tokens live in `:root` in `src/index.css:18-21`: `--ease-out`, `--ease-in-out`, `--ease-drawer`. Use `var(--ease-out)`; do not add a new curve.
- Global animation CSS lives at the bottom of `src/index.css` in commented blocks; reduced-motion overrides sit in an `@media (prefers-reduced-motion: reduce)` block next to them (exemplar: the "Scroll entrances" block).
- Classes are plain CSS classes added alongside Tailwind utilities in `className`.

## Steps

1. In `src/components/Hero.tsx`, replace the `<h1>` contents with four line wrappers (remove the `<br />`s):
   ```tsx
   <h1 className="hero-h1 text-white">
     <span className="hero-line"><span className="hero-line-inner" style={{ animationDelay: '0ms' }}>20+ YEARS OF</span></span>
     <span className="hero-line"><span className="hero-line-inner" style={{ animationDelay: '80ms' }}>CHENNAI INTERIORS.</span></span>
     <span className="hero-line"><em className="hero-line-inner" style={{ animationDelay: '170ms' }}>CRAFTED TO LAST</em></span>
     <span className="hero-line"><em className="hero-line-inner" style={{ animationDelay: '260ms' }}>EVERY DAY.</em></span>
   </h1>
   ```
   Words inside each line must be separated so the accessible name reads "20+ YEARS OF CHENNAI INTERIORS. CRAFTED TO LAST EVERY DAY." — add a `{' '}` after each closing inner tag except the last.
2. Add `hero-enter-fade` to the status pill `div` (`Hero.tsx:16`).
3. Add `hero-enter-rise` + inline `style={{ animationDelay: '350ms' }}` to the paragraph (`Hero.tsx:31`), `420ms` to the CTA row `div` (`{/* Primary & Ghost CTA buttons */}`), `480ms` to the small trust-row `p` (`Hero.tsx:59`).
4. Add `hero-enter-rise` + `style={{ animationDelay: '450ms', ['--hero-rise' as string]: '16px', animationDuration: '700ms' }}` to the right summary card `div` (`{/* Right Column: Ink 2 Summary Card */}`).
5. Append the CSS from **Target** plus:
   ```css
   .hero-enter-fade { animation: hero-fade-in 400ms var(--ease-out) both; }
   .hero-enter-rise { animation: hero-rise-in 500ms var(--ease-out) both; }
   @media (prefers-reduced-motion: reduce) {
     .hero-line-inner, .hero-enter-fade, .hero-enter-rise {
       animation: hero-fade-in 300ms ease both;
       animation-delay: 0ms !important;
     }
   }
   ```

## Boundaries

- Do NOT touch any other section, the navbar, the marquee, or the sticky bottom bar.
- Do NOT change the headline text, font sizes, or colours.
- Do NOT use JavaScript or Motion for this — CSS only, so it plays even before React hydrates.
- Do NOT add new dependencies. If the code at the cited lines has drifted, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` → no output; `npx vite build` → `✓ built`.
- **Feel check** (reload the page each time):
  - The four lines slide up from an invisible edge, top to bottom; the two pink lines land last.
  - No letters are clipped at the bottom when settled (check "EVERY DAY." on desktop and a 390px-wide phone, where lines wrap).
  - The "Get a Free Quote" button can be clicked during the animation.
  - Everything has settled by ~1.2s; nothing in the hero moves after that.
  - DevTools → Animations panel at 10%: lines move with a fast start and long gentle settle (ease-out), never a slow start.
  - DevTools → Rendering → emulate `prefers-reduced-motion: reduce`: the hero only fades, no movement.
  - Screen reader / accessibility tree: the `h1` name is the full sentence.
- **Done when**: all checks above pass on desktop and a phone-sized viewport.
