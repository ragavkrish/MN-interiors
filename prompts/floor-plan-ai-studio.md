Replace the Services section of this MN Interiors website with a new interactive "floor plan" design. All the code you need is included below. Use it exactly as written, and only make the adjustments listed in the steps. Do not redesign or restyle anything else on the page.

## What it does (so you understand the code)
The services are shown inside a clean, architect-style floor plan of a home. Four rooms are clickable:
- Kitchen → kitchens
- Bedroom → wardrobes
- Pooja → pooja rooms
- Living → TV units, living and shop interiors
Clicking a room highlights it and shows that service's photo, description and a "Get a quote" button in a panel beside the plan (below the plan on phones). On phones there is also a row of tabs above the plan.

When the section first scrolls into view, it animates once:
1. The walls draw themselves.
2. The furniture, room names and dots fade in one by one.
3. The photo appears.
4. Kitchen gets selected automatically, so visitors see how it works.
The small terracotta dots pulse until the visitor taps a room for the first time, then they stop. Everything respects the "reduce motion" accessibility setting.

## Step 1: Update the services data in src/data/content.ts

Find `export interface RoomScope` and replace it with this. Remove the old `icon` field.

```ts
export interface RoomScope {
  tag: string;
  title: string;
  body: string;
  spec: string;
  hot?: boolean;
  /** Label drawn inside the floor plan */
  roomLabel: 'Kitchen' | 'Bedroom' | 'Pooja' | 'Living';
  /** Short name for the mobile tabs */
  shortLabel: string;
  /** Ends the button text "Get a quote for …" */
  ctaNoun: string;
  imageSrc: string;
  imageAlt: string;
  /** Must match an <option> value in BookingModal */
  enquiryScope: string;
}
```

In `SIGNATURE_ROOMS` (the 4 service items), delete each `icon: '…',` line and add these fields. Keep each item's existing tag, title, body, spec and hot exactly as they are. Keep the order: kitchens, wardrobes, pooja, living.

1st item (kitchens):
```ts
    roomLabel: 'Kitchen',
    shortLabel: 'Kitchens',
    ctaNoun: 'kitchens',
    imageSrc: '/src/assets/images/mn_kitchen_showcase_1795762703455.jpg',
    imageAlt: 'Modern Chennai modular kitchen with warm wood lower cabinets, matte cream upper units, loft storage, and warm under-cabinet lighting',
    enquiryScope: 'Modular Kitchen',
```
2nd item (wardrobes):
```ts
    roomLabel: 'Bedroom',
    shortLabel: 'Wardrobes',
    ctaNoun: 'wardrobes',
    imageSrc: '/src/assets/images/mn_wardrobe_showcase_1795762706339.jpg',
    imageAlt: 'Floor-to-ceiling bedroom wardrobe in matte beige with vertical wood trim accents, matching overhead loft storage, and warm ceiling cove light',
    enquiryScope: 'Wardrobes & Bedrooms',
```
3rd item (pooja):
```ts
    roomLabel: 'Pooja',
    shortLabel: 'Pooja rooms',
    ctaNoun: 'pooja rooms',
    imageSrc: '/src/assets/images/mn_pooja_unit_showcase_1795762706457.jpg',
    imageAlt: 'South Indian home pooja room cabinet with pearl-grey decorative peacock lattice doors, warm wood frame, and lit side glass shelves',
    enquiryScope: 'Pooja Room / TV Unit',
```
4th item (living / TV / shops):
```ts
    roomLabel: 'Living',
    shortLabel: 'Living & shops',
    ctaNoun: 'living rooms',
    imageSrc: '/src/assets/images/mn_tv_wall_showcase_1795762706221.jpg',
    imageAlt: 'Contemporary Chennai living room TV feature wall with fluted wood slats, warm LED lighting, marble backdrop, and lit glass display cabinets',
    enquiryScope: 'Pooja Room / TV Unit',
```

Two checks:
- The image paths must be the same paths the project already uses for these photos in `WORK_SHOWCASE_ITEMS`. If those were renamed or moved, use the current paths.
- The `enquiryScope` values must exactly match `<option value="…">` entries in src/components/BookingModal.tsx ('Modular Kitchen', 'Wardrobes & Bedrooms', 'Pooja Room / TV Unit', 'Shop / Commercial Interiors'). If an option was renamed, use the current value.

## Step 2: Create the file src/components/ServicesFloorPlan.tsx with exactly this code

```tsx
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { SIGNATURE_ROOMS } from '../data/content';

interface ServicesFloorPlanProps {
  onEnquire: (scope: string, title: string) => void;
}

/*
 * Floor-plan geometry, viewBox "0 0 600 450".
 * `i` = index into SIGNATURE_ROOMS (0 kitchens, 1 wardrobes, 2 pooja, 3 living).
 * Array order = reveal order (Living, Kitchen, Pooja, Bedroom).
 * (x, y, w, h) = room rect, (lx, ly) = label baseline, (px, py) = pin centre.
 */
const ROOMS = [
  { i: 3, x: 20, y: 20, w: 330, h: 240, lx: 40, ly: 238, px: 185, py: 140 },
  { i: 0, x: 350, y: 20, w: 230, h: 180, lx: 390, ly: 160, px: 465, py: 110 },
  { i: 2, x: 350, y: 200, w: 110, h: 100, lx: 368, ly: 268, px: 405, py: 238 },
  { i: 1, x: 20, y: 260, w: 290, h: 170, lx: 64, ly: 412, px: 120, py: 335 },
] as const;

// Non-uniform stagger for room labels + pins during the first reveal (ms).
const REVEAL_DELAYS = [900, 960, 1040, 1100];

// Radius that lets the flood circle cover the whole room from its pin.
const floodRadius = (r: (typeof ROOMS)[number]) =>
  Math.ceil(
    Math.max(
      Math.hypot(r.px - r.x, r.py - r.y),
      Math.hypot(r.x + r.w - r.px, r.py - r.y),
      Math.hypot(r.px - r.x, r.y + r.h - r.py),
      Math.hypot(r.x + r.w - r.px, r.y + r.h - r.py),
    ),
  );

const num = (i: number) => String(i + 1).padStart(2, '0');

type Phase = 'armed' | 'playing' | 'done';

export function ServicesFloorPlan({ onEnquire }: ServicesFloorPlanProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);
  const startedRef = useRef(false);

  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>('armed');
  const [selVisible, setSelVisible] = useState(false);
  const [userHasSelected, setUserHasSelected] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const [tabsReady, setTabsReady] = useState(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // First reveal: plays once when the section scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        if (reduced) {
          setSelVisible(true);
          setPhase('done');
          return;
        }
        setPhase('playing');
        timers.current.push(
          window.setTimeout(() => {
            setSelVisible(true); // Kitchen flood plays as a demo
            setTextKey((k) => k + 1);
          }, 1250),
          window.setTimeout(() => setPhase('done'), 1800),
        );
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, []);

  const select = (i: number) => {
    // A user choice during the reveal skips straight to the end state.
    if (phase !== 'done') {
      startedRef.current = true;
      clearTimers();
      setPhase('done');
      setSelVisible(true);
    }
    setUserHasSelected(true);
    if (i !== active) {
      setActive(i);
      setTextKey((k) => k + 1);
    }
  };

  const onRoomKey = (e: KeyboardEvent, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(i);
    }
  };

  // Mobile tab indicator: measure the active tab and slide the pill behind it.
  useLayoutEffect(() => {
    const place = () => {
      const tabs = tabsRef.current;
      const ind = indicatorRef.current;
      if (!tabs || !ind) return;
      const btn = tabs.querySelector<HTMLButtonElement>(`[data-i="${active}"]`);
      if (!btn) return;
      ind.style.width = `${btn.offsetWidth}px`;
      ind.style.transform = `translateX(${btn.offsetLeft}px)`;
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  useEffect(() => {
    // Enable the indicator slide only after first paint.
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setTabsReady(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, []);

  useEffect(() => {
    if (!userHasSelected) return;
    const btn = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-i="${active}"]`);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    btn?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [active, userHasSelected]);

  const room = SIGNATURE_ROOMS[active];

  return (
    <div
      ref={rootRef}
      className="fp"
      data-phase={phase}
      data-sel={selVisible ? '1' : '0'}
      data-calm={userHasSelected ? '1' : '0'}
      data-offscreen={onScreen ? '0' : '1'}
    >
      <div className="fp-plan">
        {/* Mobile tabs (hidden on desktop) */}
        <div className="fp-tabs" ref={tabsRef} role="group" aria-label="Choose a service">
          <span ref={indicatorRef} className="fp-tabs-ind" data-ready={tabsReady ? '1' : '0'} aria-hidden="true" />
          {SIGNATURE_ROOMS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              data-i={i}
              data-on={i === active ? '1' : '0'}
              aria-pressed={i === active}
              onClick={() => select(i)}
            >
              {s.shortLabel}
            </button>
          ))}
        </div>

        <svg
          className="fp-svg"
          viewBox="0 0 600 450"
          role="group"
          aria-label="Floor plan of a home. Select a room to see that service."
        >
          <defs>
            {ROOMS.map((r) => (
              <clipPath key={r.i} id={`fp-clip-${r.i}`}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} />
              </clipPath>
            ))}
          </defs>

          {/* Furniture hints */}
          <g className="fp-furniture">
            {/* Living: TV unit, sofa, rug */}
            <rect className="fp-furn-fill" x="120" y="28" width="130" height="14" />
            <rect className="fp-furn" x="110" y="150" width="150" height="44" rx="6" />
            <rect className="fp-furn" x="118" y="150" width="134" height="14" rx="3" />
            <rect className="fp-furn" x="140" y="80" width="90" height="50" rx="3" strokeDasharray="2 3" />
            {/* Kitchen: L counter, hob, sink */}
            <path className="fp-furn-fill" d="M358 28 H572 V160 H550 V50 H358 Z" />
            <circle className="fp-furn" cx="420" cy="39" r="5" />
            <circle className="fp-furn" cx="440" cy="39" r="5" />
            <rect className="fp-furn" x="553" y="90" width="14" height="30" rx="3" />
            {/* Pooja: mandapam */}
            <path className="fp-furn-fill" d="M380 208 h50 v18 h-50 Z" />
            <path className="fp-furn" d="M380 226 q25 -14 50 0" />
            {/* Bedroom: wardrobe strip, bed, pillows */}
            <rect className="fp-furn-fill" x="28" y="268" width="20" height="150" />
            <path className="fp-furn" d="M28 300 h20 M28 334 h20 M28 368 h20 M28 400 h20" />
            <rect className="fp-furn" x="170" y="290" width="110" height="100" rx="4" />
            <rect className="fp-furn" x="180" y="296" width="40" height="18" rx="4" />
            <rect className="fp-furn" x="230" y="296" width="40" height="18" rx="4" />
            {/* Doors */}
            <path className="fp-door" d="M350 120 a40 40 0 0 1 -40 40" />
            <path className="fp-door" d="M190 260 a36 36 0 0 0 36 36" />
            {/* Non-interactive rooms */}
            <text className="fp-label fp-label-sm" x="485" y="262">Dining</text>
            <text className="fp-label fp-label-sm" x="335" y="380">Bath</text>
            <text className="fp-label fp-label-sm" x="470" y="380">Bedroom 2</text>
          </g>

          {/* Walls */}
          <rect className="fp-wall fp-wall-outer" x="20" y="20" width="560" height="410" />
          <path
            className="fp-wall fp-wall-inner"
            d="M350 20 V110 M350 160 V300 M350 200 H580 M350 300 H580 M460 200 V300 M20 260 H190 M226 260 H350 M310 260 V430 M420 300 V430"
          />

          {/* Interactive rooms */}
          {ROOMS.map((r, order) => {
            const s = SIGNATURE_ROOMS[r.i];
            const on = r.i === active;
            return (
              <g
                key={r.i}
                className="fp-room"
                data-on={on ? '1' : '0'}
                style={{ ['--fp-delay' as string]: `${REVEAL_DELAYS[order]}ms` } as CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={s.title}
                aria-pressed={on}
                onClick={() => select(r.i)}
                onFocus={() => select(r.i)}
                onKeyDown={(e) => onRoomKey(e, r.i)}
              >
                <rect className="fp-hit" x={r.x} y={r.y} width={r.w} height={r.h} />
                <circle
                  className="fp-flood"
                  cx={r.px}
                  cy={r.py}
                  r={floodRadius(r)}
                  clipPath={`url(#fp-clip-${r.i})`}
                />
                <rect className="fp-ring" x={r.x + 4} y={r.y + 4} width={r.w - 8} height={r.h - 8} rx="2" />
                <g className="fp-mark">
                  <text className="fp-num" x={r.lx} y={r.ly - 20}>{num(r.i)}</text>
                  <text className="fp-label" x={r.lx} y={r.ly}>{s.roomLabel}</text>
                  <g className="fp-pulse-wrap">
                    <circle className="fp-pulse" cx={r.px} cy={r.py} r="6" />
                  </g>
                  <circle className="fp-pin" cx={r.px} cy={r.py} r="4" />
                </g>
              </g>
            );
          })}
        </svg>

        <p className="fp-hint">
          <i aria-hidden="true" />
          Tap a room to see what we build there
        </p>
      </div>

      <div className="fp-detail" aria-live="polite">
        <div className="fp-photo">
          {SIGNATURE_ROOMS.map((s, i) => (
            <img
              key={s.imageSrc}
              src={s.imageSrc}
              alt={i === active ? s.imageAlt : ''}
              aria-hidden={i === active ? undefined : true}
              data-on={i === active ? '1' : '0'}
              width={1200}
              height={750}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>

        <div className="fp-text" key={`${active}-${textKey}`}>
          <p className="fp-kicker">
            <span className="fp-kicker-num">{num(active)}</span>
            <span className="fp-tag">{room.tag}</span>
          </p>
          <h3 className="fp-title">{room.title}</h3>
          <p className="fp-body">{room.body}</p>
          <div className="fp-actions">
            <button
              type="button"
              className="btn-pink fp-cta"
              onClick={() => onEnquire(room.enquiryScope, room.title)}
            >
              Get a quote for {room.ctaNoun}
            </button>
            <span className="fp-spec">{room.spec}</span>
          </div>
        </div>

        <button
          type="button"
          className="fp-shops"
          onClick={() => onEnquire('Shop / Commercial Interiors', 'Shop and commercial interiors')}
        >
          Shops and commercial spaces too <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
```

One adjustment: the "Get a quote" button uses `className="btn-pink fp-cta"`. `btn-pink` is the class of the site's main filled button. If the project's main button class has a different name now, use that name instead of `btn-pink` and keep `fp-cta`.

## Step 3: Add this CSS to the END of src/index.css

```css
/* ============================================================
   SERVICES — FLOOR PLAN
   ============================================================ */
.fp {
  /* Local aliases. Each falls back to the hex value if the project token is missing. */
  --fp-accent: var(--accent, var(--pink, #B5532F));
  --fp-ink: var(--ink, #16181D);
  --fp-ink-2: var(--graphite, #3B3E45);
  --fp-muted: var(--muted, #5F6268);
  --fp-line: var(--line, #D3D0CA);
  --fp-stone: var(--mist, #E7E5E1);
  --fp-paper: var(--white, #FAFAF8);
  --fp-ease: var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  --fp-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --fp-sans: 'Manrope', system-ui, -apple-system, sans-serif;

  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  margin-top: clamp(40px, 5vw, 64px);
  text-align: left;
}

/* ---------- Plan ---------- */
.fp-svg { display: block; width: 100%; height: auto; overflow: visible; }
.fp-wall { fill: none; stroke: var(--fp-ink); stroke-linecap: square; }
.fp-wall-outer { stroke-width: 5; --len: 1940; }
.fp-wall-inner { stroke-width: 2.2; --len: 1200; }
.fp-furn { fill: none; stroke: #8B8D93; stroke-width: 1.2; }
.fp-furn-fill { fill: #ECEAE6; stroke: #8B8D93; stroke-width: 1.2; }
.fp-door { fill: none; stroke: #A9ABB0; stroke-width: 1; stroke-dasharray: 3 3; }
.fp-label { font-family: var(--fp-serif); font-style: italic; font-size: 17px; fill: var(--fp-muted); }
.fp-label-sm { font-size: 14px; }
.fp-num { font-family: var(--fp-sans); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; fill: var(--fp-muted); }

/* Rooms */
.fp-room { cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; }
.fp-hit { fill: var(--fp-accent); fill-opacity: 0; transition: fill-opacity 150ms ease-out; }
.fp-room .fp-label, .fp-room .fp-num { transition: fill 200ms ease-out; }
.fp-room[data-on='1'] .fp-label, .fp-room[data-on='1'] .fp-num { fill: var(--fp-accent); }

/* Selection flood: grows from the pin, fades out without shrinking */
.fp-flood {
  fill: var(--fp-accent);
  fill-opacity: 0.12;
  transform-box: fill-box;
  transform-origin: center;
  transform: scale(0.08);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease-out, transform 0ms linear 150ms;
}
.fp-room[data-on='1'] .fp-flood {
  transform: none;
  opacity: 1;
  transition: transform 300ms var(--fp-ease), opacity 150ms ease-out;
}
.fp-ring { fill: none; stroke: var(--fp-accent); stroke-width: 2; opacity: 0; pointer-events: none; transition: opacity 150ms ease-out; }
.fp-room[data-on='1'] .fp-ring { opacity: 1; transition: opacity 200ms ease-out 120ms; }
.fp-room:focus-visible .fp-ring { opacity: 1; stroke-dasharray: 4 3; }

/* Selection hidden until the reveal demo selects Kitchen */
.fp[data-sel='0'] .fp-room[data-on='1'] .fp-flood { opacity: 0; transform: scale(0.08); }
.fp[data-sel='0'] .fp-room[data-on='1'] .fp-ring { opacity: 0; }
.fp[data-sel='0'] .fp-room[data-on='1'] .fp-label,
.fp[data-sel='0'] .fp-room[data-on='1'] .fp-num { fill: var(--fp-muted); }

@media (hover: hover) and (pointer: fine) {
  .fp-room:hover .fp-hit { fill-opacity: 0.06; }
}

/* Pins */
.fp-pin { fill: var(--fp-accent); transform-box: fill-box; transform-origin: center; transition: transform 160ms var(--fp-ease); }
.fp-pulse { fill: var(--fp-accent); transform-box: fill-box; transform-origin: center; animation: fp-pulse 2.2s ease-out infinite; }
.fp-pulse-wrap { transition: opacity 300ms ease-out; }
.fp-room[data-on='1'] .fp-pulse-wrap,
.fp[data-calm='1'] .fp-pulse-wrap { opacity: 0; }
.fp[data-offscreen='1'] .fp-pulse { animation-play-state: paused; }
@keyframes fp-pulse {
  0% { transform: scale(0.6); opacity: 0.45; }
  100% { transform: scale(2.4); opacity: 0; }
}

/* Press feedback */
.fp-room:active .fp-hit { fill-opacity: 0.18; transition: none; }
.fp-room:active .fp-pin { transform: scale(0.85); }

/* Hint */
.fp-hint { display: flex; align-items: center; gap: 8px; margin: 14px 0 0; font-family: var(--fp-sans); font-size: 13px; color: var(--fp-muted); }
.fp-hint i { width: 8px; height: 8px; border-radius: 50%; background: var(--fp-accent); display: inline-block; }

/* ---------- First reveal (data-phase: armed → playing → done) ---------- */
.fp[data-phase='armed'] .fp-wall { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); }
.fp[data-phase='armed'] .fp-furniture,
.fp[data-phase='armed'] .fp-mark,
.fp[data-phase='armed'] .fp-photo { opacity: 0; }

.fp[data-phase='playing'] .fp-wall { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: fp-draw 900ms var(--fp-ease) forwards; }
.fp[data-phase='playing'] .fp-wall-inner { animation-delay: 250ms; }
.fp[data-phase='playing'] .fp-furniture { opacity: 0; animation: fp-fade 500ms ease-out 700ms forwards; }
.fp[data-phase='playing'] .fp-mark { opacity: 0; animation: fp-rise 300ms var(--fp-ease) var(--fp-delay, 900ms) forwards; }
.fp[data-phase='playing'] .fp-photo { opacity: 0; animation: fp-photo 600ms var(--fp-ease) 1150ms forwards; }

@keyframes fp-draw { to { stroke-dashoffset: 0; } }
@keyframes fp-fade { to { opacity: 1; } }
@keyframes fp-rise { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@keyframes fp-photo { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: none; } }

/* ---------- Detail panel ---------- */
.fp-photo { position: relative; aspect-ratio: 16 / 10; border-radius: 6px; overflow: hidden; background: var(--fp-stone); margin-bottom: 24px; }
.fp-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.04); transition: opacity 400ms ease-out, transform 900ms var(--fp-ease); }
.fp-photo img[data-on='1'] { opacity: 1; transform: none; }

.fp-text { animation: fp-text-in 350ms var(--fp-ease); }
@keyframes fp-text-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.fp[data-phase='armed'] .fp-text, .fp[data-phase='playing'] .fp-text { opacity: 0; animation: none; }
.fp[data-phase='playing'][data-sel='1'] .fp-text { opacity: 1; animation: fp-text-in 350ms var(--fp-ease); }

.fp-kicker { display: flex; align-items: baseline; gap: 12px; margin: 0; }
.fp-kicker-num { font-family: var(--fp-serif); font-style: italic; font-size: 20px; color: var(--fp-accent); }
.fp-tag { font-family: var(--fp-sans); font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fp-accent); }
.fp-title { font-family: var(--fp-serif); font-weight: 500; font-size: clamp(32px, 3.2vw, 46px); line-height: 1.05; letter-spacing: -0.005em; color: var(--fp-ink); margin: 10px 0 14px; }
.fp-body { font-family: var(--fp-sans); font-size: 16px; line-height: 1.7; color: var(--fp-ink-2); margin: 0 0 22px; max-width: 44ch; }
.fp-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 20px; }
.fp-cta { padding: 12px 18px; font-size: 14px; }
.fp-spec { font-family: var(--fp-sans); font-size: 14px; color: var(--fp-muted); }
.fp-shops { margin-top: 26px; padding: 0 0 2px; background: none; border: 0; border-bottom: 1px solid currentColor; font-family: var(--fp-sans); font-size: 14px; font-weight: 600; color: var(--fp-ink); cursor: pointer; transition: color 150ms ease-out; }
@media (hover: hover) and (pointer: fine) { .fp-shops:hover { color: var(--fp-accent); } }

/* ---------- Mobile tabs ---------- */
.fp-tabs { display: none; }

@media (max-width: 900px) {
  .fp { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .fp-tabs {
    position: relative;
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    margin: 0 0 18px;
    padding: 2px 0;
  }
  .fp-tabs::-webkit-scrollbar { display: none; }
  .fp-tabs button {
    position: relative;
    z-index: 1;
    flex: 0 0 auto;
    min-height: 40px;
    padding: 0 16px;
    border: 1px solid var(--fp-line);
    border-radius: 999px;
    background: transparent;
    font: 500 14px var(--fp-sans);
    color: var(--fp-ink-2);
    scroll-snap-align: start;
    transition: color 150ms ease-out, border-color 150ms ease-out;
  }
  .fp-tabs button[data-on='1'] { color: var(--fp-paper); border-color: transparent; }
  .fp-tabs-ind {
    position: absolute;
    top: 2px;
    left: 0;
    height: calc(100% - 4px);
    border-radius: 999px;
    background: var(--fp-ink);
  }
  .fp-tabs-ind[data-ready='1'] { transition: transform 250ms var(--fp-ease), width 250ms var(--fp-ease); }
}

@media (max-width: 600px) {
  .fp-label { font-size: 22px; }
  .fp-label-sm { font-size: 18px; }
  .fp-num { font-size: 13px; }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .fp *, .fp *::before, .fp *::after { animation: none !important; transition-duration: 0ms !important; transition-delay: 0ms !important; }
  .fp .fp-wall { stroke-dashoffset: 0 !important; }
  .fp .fp-furniture, .fp .fp-mark, .fp .fp-photo, .fp .fp-text { opacity: 1 !important; }
  .fp .fp-flood { transform: none; }
  .fp .fp-photo img { transform: none; transition: opacity 150ms ease-out !important; }
  .fp-pulse-wrap { display: none; }
}
```

About the colours: the top of this CSS reads the site's existing colour variables, with fallbacks (for example `--fp-accent: var(--accent, var(--pink, #B5532F))`). Check that the variables used there exist in `:root` in src/index.css:
- `--pink` or `--accent` (terracotta)
- `--ink`, `--graphite`, `--muted`, `--line`, `--mist`, `--white`
- `--ease-out`
If a variable has a different name in this project, change only the name inside that `var(...)`. Don't change any other CSS.

## Step 4: Use it in src/App.tsx

1. Add the import next to the other component imports:
   ```tsx
   import { ServicesFloorPlan } from './components/ServicesFloorPlan';
   ```
2. Find `<section id="services" …>`. Keep the section element, its container and the section heading block (the "Services" eyebrow, the "Every room, made with care." heading and the intro paragraph) exactly as they are.
3. Delete only the grid of 4 service cards below the heading. It is the `<div …>` that does `SIGNATURE_ROOMS.map(...)` and renders `<article>` cards with `RoomIcon`. In its place put:
   ```tsx
   <ServicesFloorPlan onEnquire={handleEnquireStyle} />
   ```
   `handleEnquireStyle` already exists in App.tsx. It opens the booking form with the chosen service preselected. Don't create a new function.
4. Delete the `function RoomIcon(...)` helper, the `type RoomScope` import and the `SIGNATURE_ROOMS` import from App.tsx if they are no longer used. Also remove the icon imports that only RoomIcon used: `CookingPot`, `Door`, `BuildingOffice`, `Armchair` from '@phosphor-icons/react'. Remove an icon only if nothing else in App.tsx still uses it.

## Rules
- Don't change any other section, any text content, phone number, address, review or price.
- Don't rename the CSS classes or data attributes in the code. The CSS and the component depend on each other.
- Don't add any new libraries. The code uses only React.
- Keep all the animation timings as written; they were tuned and tested.

## How to check it worked (in the preview)
1. The page loads with no errors in the console.
2. Scroll down to Services. Once it's on screen:
   - the plan's walls draw in
   - the room names and dots appear one after another
   - then the photo appears
   - after about 1.3 seconds the Kitchen room fills with a soft terracotta colour spreading out from its dot, and the Kitchen text appears on the right
3. Click Pooja: the colour spreads from the Pooja dot, and the photo and text change to pooja rooms. The dots stop pulsing after this first click.
4. Click "Get a quote for pooja rooms": the booking form opens with "Pooja Room / TV Unit" selected. "Shops and commercial spaces too →" opens it with "Shop / Commercial Interiors".
5. Press Tab to move between rooms with the keyboard; each one gets selected and shows a dashed outline.
6. In a phone-sized preview:
   - a row of tabs appears above the plan, and the dark pill slides to the tapped tab
   - the plan and labels are readable
   - the page does not scroll sideways
7. If something looks off, fix only that part and don't rewrite the component.
