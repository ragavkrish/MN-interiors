# Animation plans

Written by the `improve-animations` skill (Emil Kowalski's animation philosophy). Each plan is
self-contained and can be executed by any agent.

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Hero statement entrance](001-hero-statement-entrance.md) | MEDIUM | DONE |
| 002 | [Hardware-accelerated Motion transforms](002-hardware-accelerated-motion-transforms.md) | MEDIUM | DONE |
| 003 | [Enquiry confirmation moment](003-enquiry-confirmation-moment.md) | LOW | DONE |
| 004 | [Motion polish batch](004-motion-polish-batch.md) | LOW | DONE |

## Recommended order

001 → 002 → 003 → 004.

## Dependencies

- 003 uses the full-`transform`-string convention introduced by 002 (it can be done first, but must follow that convention).
- 001 and 004 are independent of everything else.

## Not planned (considered)

- FAQ answers easing open (height via `::details-content`) — Chromium-only; revisit later.
- Lightbox Previous/Next: fade the details panel text along with the photo (150ms) — small; revisit later.

## Lesson learned during execution

With `motion` 12.x, a reduced-motion `initial` of `{ opacity: 0 }` animating to
`{ transform: 'scale(1)' }` interpolates the transform from `scale(0)` — a forbidden
"appear from nothing" — even though the intent was a fade. Reduced-motion `initial` objects must
carry the **neutral end transform** explicitly, e.g. `{ opacity: 0, transform: 'scale(1)' }` or
`{ opacity: 0, transform: 'translateY(0px)' }`. All components follow this now.
