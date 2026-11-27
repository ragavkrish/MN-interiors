# 003 — Give the enquiry "sent" screen a small moment of delight

- **Status**: DONE
- **Commit**: 1bfe8ec
- **Severity**: LOW (missed opportunity)
- **Category**: Missed opportunities / delight budget
- **Estimated scope**: 1 file (`src/components/BookingModal.tsx`), ~25 lines

## Problem

Submitting the enquiry form is the rarest, most emotional moment in the visit — and it's rendered
flat: the form is swapped for the confirmation instantly.

```tsx
/* src/components/BookingModal.tsx:164-168 — current */
{confirmation ? (
  <div className="mt-6">
    <div className="rounded-[14px] border border-[#F31C60]/40 bg-[#F31C60]/12 p-5">
      <div className="flex items-center gap-3">
        <CheckCircle size={28} weight="fill" className="shrink-0 text-[#F31C60]" />
```

## Target

- The confirmation container (`<div className="mt-6">`) becomes a `motion.div` that enters with
  opacity `0 → 1` and `transform: 'translateY(8px)' → 'translateY(0px)'`, **250ms**, ease
  `[0.23, 1, 0.32, 1]` (`--ease-out`).
- The `CheckCircle` is wrapped in a `motion.span` (`className="inline-flex shrink-0"`) that pops in
  from `transform: 'scale(0.9)'`, opacity `0` → `scale(1)`, opacity `1`, using a spring
  **`{ type: 'spring', duration: 0.5, bounce: 0.2 }`**, delayed **100ms** so it lands just after the
  card appears. Never start from `scale(0)`.
- The modal title text swap ("REQUEST A FREE QUOTE" → "ENQUIRY READY TO SEND") stays instant.
- **Reduced motion**: container fades only (250ms), icon fades only (200ms, no scale, no spring).
- Enter only — no exit animation (closing the dialog already fades the whole panel).

## Repo conventions to follow

- `BookingModal.tsx` already imports `motion` and `useReducedMotion` from `'motion/react'`, declares `const reduceMotion = useReducedMotion();` and `const easeOut = [0.23, 1, 0.32, 1] as const;` — reuse both.
- Use full `transform` strings (see plan 002), not `scale`/`y` shorthands.

## Steps

1. Change `<div className="mt-6">` directly under `{confirmation ? (` to:
   ```tsx
   <motion.div
     className="mt-6"
     initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(8px)' }}
     animate={{ opacity: 1, transform: 'translateY(0px)' }}
     transition={{ duration: 0.25, ease: easeOut }}
   >
   ```
   and its matching closing `</div>` to `</motion.div>`.
2. Wrap the `<CheckCircle … />` in:
   ```tsx
   <motion.span
     className="inline-flex shrink-0"
     initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.9)' }}
     animate={{ opacity: 1, transform: 'scale(1)' }}
     transition={reduceMotion ? { duration: 0.2 } : { type: 'spring', duration: 0.5, bounce: 0.2, delay: 0.1 }}
   >
   ```

## Boundaries

- Do NOT change the form, validation, WhatsApp link building or copy.
- Do NOT animate the title text. If lines have drifted, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` → no output; `npx vite build` → `✓ built`.
- **Feel check**: open the pop-up, fill a name and a 10-digit phone, submit:
  - The confirmation card rises in quickly; the tick lands a beat later with a barely-there bounce (it should feel like a nod, not a cartoon).
  - DevTools Animations at 10%: the tick never starts from nothing (scale 0.9, not 0).
  - With reduced motion emulated: everything only fades.
- **Done when**: checks above pass.
