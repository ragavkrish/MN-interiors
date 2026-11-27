import { useEffect, useRef, useState } from 'react';
import { cubicBezier } from 'motion';

interface CountUpProps {
  /** Final number to land on, e.g. 20 or 4.9 */
  to: number;
  decimals?: number;
  /** Shown after the number throughout, e.g. " YR" */
  suffix?: string;
  /** Fades in once the count lands, e.g. "+" or " ★" */
  finalSuffix?: string;
  /** Delay before counting starts once visible (ms) — used for the stagger */
  delay?: number;
  duration?: number;
}

// --ease-out from index.css
const easeOut = cubicBezier(0.23, 1, 0.32, 1);

/**
 * Counts up from 0 once, the first time half of it is on screen.
 * Screen readers always get the final value; reduced-motion users see it straight away.
 */
export default function CountUp({
  to,
  decimals = 0,
  suffix = '',
  finalSuffix = '',
  delay = 0,
  duration = 1200,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const [landed, setLanded] = useState(true);

  useEffect(() => {
    const el = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduceMotion || !('IntersectionObserver' in window)) return;

    // Only reset to 0 if the number is not already on screen at load.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setValue(0);
    setLanded(false);

    let frame = 0;
    let timeout = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeout = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setValue(to * easeOut(t));
            if (t < 1) {
              frame = requestAnimationFrame(tick);
            } else {
              setLanded(true);
            }
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [to, delay, duration]);

  const finalText = `${to.toFixed(decimals)}${suffix}${finalSuffix}`;

  return (
    <span ref={ref} aria-label={finalText} role="text">
      <span aria-hidden="true">
        {value.toFixed(decimals)}
        {suffix}
        {finalSuffix && (
          <span className={`count-final-suffix ${landed ? 'is-landed' : ''}`}>{finalSuffix}</span>
        )}
      </span>
    </span>
  );
}
