import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  /** Display value such as "640+", "98.4%" or "15 YR". */
  value: string;
  className?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Counts the leading number of `value` up from zero the first time it
 * scrolls into view. Screen readers get the final value only.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const reduce = useReducedMotion();

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const decimals = match?.[1].split('.')[1]?.length ?? 0;

  const [current, setCurrent] = useState(match && !reduce ? 0 : target);

  useEffect(() => {
    if (!match || !inView || reduce) {
      setCurrent(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 0.9,
      ease: EASE_OUT,
      onUpdate: setCurrent,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target]);

  return (
    <p ref={ref} className={className}>
      <span aria-hidden="true">{match ? current.toFixed(decimals) + suffix : value}</span>
      <span className="sr-only">{value}</span>
    </p>
  );
}
