# 002 — Use full transform strings so Motion animations run off the main thread

- **Status**: DONE
- **Commit**: 1bfe8ec
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 3 files, ~12 lines

## Problem

The project uses `motion` **12.43.0** (`package.json` → `"motion": "^12.23.24"`). Before 14.2,
Motion's `x` / `y` / `scale` shorthand props are **not hardware-accelerated**: they're applied from
JavaScript on the main thread each frame, so they can drop frames on mid-range Android phones —
likely most of this site's visitors. Current uses:

```tsx
/* src/components/BookingModal.tsx:133 and :138 — current */
initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: easeOut } }}
: { opacity: 0, scale: 0.96, transition: { duration: 0.15, ease: easeOut } }

/* src/components/WorkShowcase.tsx:219 — filter swap */
initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}

/* src/components/WorkShowcase.tsx:300 and :305 — lightbox panel */
initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeDrawer } }}
: { opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: easeOut } }

/* src/components/ProcessStepper.tsx:16-17 — step content */
initial: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 8 * direction },
animate: { opacity: 1, x: 0 },
```

## Target

Animate the full `transform` string instead of shorthands. Values, durations and curves are
unchanged:

| Shorthand | Replace with |
| --- | --- |
| `scale: 0.96` | `transform: 'scale(0.96)'` |
| `scale: 0.97` | `transform: 'scale(0.97)'` |
| `scale: 1` | `transform: 'scale(1)'` |
| `y: 8` | `transform: 'translateY(8px)'` |
| `y: 0` | `transform: 'translateY(0px)'` |
| `x: 8 * direction` | `` transform: `translateX(${8 * direction}px)` `` |
| `x: 0` | `transform: 'translateX(0px)'` |

The process-tab underline (`ProcessStepper.tsx:80`, `layoutId`) stays as is: layout animations run
on the main thread in every version, and this one is occasional and tiny.

## Repo conventions to follow

- Easing constants are declared per component as `const easeOut = [0.23, 1, 0.32, 1] as const;` mirroring `--ease-out` in `src/index.css`. Keep them.
- Reduced-motion branches use `useReducedMotion()` and swap to opacity-only objects — keep that structure.

## Steps

1. `src/components/BookingModal.tsx`: on the inner panel `motion.div`, replace `scale` keys per the table in `initial`, `animate` and the non-reduced `exit`.
2. `src/components/WorkShowcase.tsx`: same for the filter-swap `motion.div` (`y`) and the lightbox panel `motion.div` (`scale`).
3. `src/components/ProcessStepper.tsx`: same for `contentEnter.initial` / `contentEnter.animate` (`x`).

## Boundaries

- Only the listed props change. Do NOT change durations, easings, opacity values or markup.
- Do NOT upgrade `motion` (no installs). If lines have drifted, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` → no output; `npx vite build` → `✓ built`.
- **Feel check**: open/close the enquiry pop-up, open the project preview, switch gallery filters, click Next Step / Prev — each looks identical to before.
  - DevTools → Performance, record opening the pop-up with 4× CPU throttling: the panel's transform animation appears on the compositor, with no per-frame style recalcs from Motion.
- **Done when**: `grep -nE "\b(scale|x|y): " src/components/{BookingModal,WorkShowcase,ProcessStepper}.tsx` returns no Motion animation props.
