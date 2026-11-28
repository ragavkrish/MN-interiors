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
