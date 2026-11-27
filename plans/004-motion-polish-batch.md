# 004 — Motion polish: exact count-up curve, FAQ icon easing, non-uniform stagger

- **Status**: DONE
- **Commit**: 1bfe8ec
- **Severity**: LOW
- **Category**: Cohesion & tokens / Easing & duration
- **Estimated scope**: 2 files (`src/components/CountUp.tsx`, `src/index.css`), ~20 lines

Three small fixes merged into one plan: they share files and all align motion with the site's
existing tokens.

## Problem

1. **Count-up uses an approximated curve** instead of the site's `--ease-out` token:
   ```ts
   /* src/components/CountUp.tsx:16-17 — current */
   // --ease-out: cubic-bezier(0.23, 1, 0.32, 1), approximated as a fast-start curve
   const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
   ```
2. **FAQ "+" rotation uses the weak built-in `ease`**:
   ```css
   /* src/index.css:283-285 — current */
   .faq-disc {
     transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
   }
   ```
3. **Uniform 50ms stagger** reads mechanical:
   ```css
   /* src/index.css:431-435 — current */
   .reveal-ready [data-reveal-group].is-revealed > :nth-child(2) { transition-delay: 50ms; }
   .reveal-ready [data-reveal-group].is-revealed > :nth-child(3) { transition-delay: 100ms; }
   .reveal-ready [data-reveal-group].is-revealed > :nth-child(4) { transition-delay: 150ms; }
   .reveal-ready [data-reveal-group].is-revealed > :nth-child(5) { transition-delay: 200ms; }
   .reveal-ready [data-reveal-group].is-revealed > :nth-child(n + 6) { transition-delay: 250ms; }
   ```

## Target

1. `CountUp` uses Motion's exact `cubicBezier(0.23, 1, 0.32, 1)`:
   ```ts
   import { cubicBezier } from 'motion';
   // --ease-out from index.css
   const easeOut = cubicBezier(0.23, 1, 0.32, 1);
   ```
2. FAQ icon: the rotation is an on-screen morph → `--ease-in-out`; colour stays on `ease`:
   ```css
   .faq-disc {
     transition:
       transform 200ms var(--ease-in-out),
       background-color 200ms ease,
       color 200ms ease;
   }
   ```
3. Non-uniform, shrinking gaps (one container entrance that reads as a single gesture):
   `:nth-child(2)` **45ms**, `(3)` **85ms**, `(4)` **120ms**, `(5)` **150ms**, `(n + 6)` **175ms**.

## Repo conventions to follow

- Tokens in `src/index.css:18-21`. Exemplar of token use: `.btn-pink` transition at `src/index.css:171-173` (`transform 160ms var(--ease-out)`).

## Steps

1. `src/components/CountUp.tsx`: replace the approximated `easeOut` function and its comment with the Target code; add the import at the top. Nothing else in the component changes.
2. `src/index.css`: replace the `.faq-disc` rule as in Target 2.
3. `src/index.css`: replace the five stagger delay values as in Target 3.

## Boundaries

- Do NOT change count-up duration (1200ms), its delays, or the reveal durations (400ms).
- Do NOT touch the reduced-motion blocks. If lines have drifted, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` → no output; `npx vite build` → `✓ built`.
- **Feel check**:
  - Stats strip: numbers rush up and settle gently on 20+, 4.9, 10 YR (final values exact).
  - FAQ: the "+" turns into "×" with a smooth start and finish, not a lurch.
  - Card grids: cards follow each other closely at first and the group feels like one motion.
- **Done when**: checks above pass.
