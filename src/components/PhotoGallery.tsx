import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'motion/react';

interface PhotoGalleryProps {
  count: number;
  index: number;
  onIndexChange: (index: number) => void;
  renderFrame: (index: number) => ReactNode;
  className?: string;
}

// A quick flick moves one photo even if the drag was short (px per ms).
const FLICK_VELOCITY = 0.11;
// Otherwise the drag must cover a quarter of the frame.
const DISTANCE_RATIO = 0.25;

/**
 * Horizontal photo track that follows the finger 1:1.
 * - Release snaps with a spring (velocity-aware), one photo at a time.
 * - Dragging past the first/last photo meets rising resistance instead of a hard stop.
 * - Index changes from buttons, thumbnails or arrow keys jump instantly (no slide):
 *   only the user's own gesture animates.
 */
export function PhotoGallery({ count, index, onIndexChange, renderFrame, className = '' }: PhotoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const dragStart = useRef(0);
  const snappingTo = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // External index changes (buttons, thumbnails, keys) jump instantly.
  useEffect(() => {
    if (snappingTo.current === index) {
      snappingTo.current = null;
      return;
    }
    x.stop();
    x.set(-index * width);
  }, [index, width, x]);

  const handleDragStart = () => {
    dragStart.current = performance.now();
  };

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const elapsed = Math.max(1, performance.now() - dragStart.current);
    const distance = info.offset.x;
    const velocity = Math.abs(distance) / elapsed;

    let next = index;
    if (Math.abs(distance) > 8 && (Math.abs(distance) > width * DISTANCE_RATIO || velocity > FLICK_VELOCITY)) {
      next = distance < 0 ? index + 1 : index - 1;
    }
    next = Math.min(count - 1, Math.max(0, next));

    animate(
      x,
      -next * width,
      reduceMotion
        ? { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
        : { type: 'spring', duration: 0.5, bounce: 0.15 },
    );
    if (next !== index) {
      snappingTo.current = next;
      onIndexChange(next);
    }
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} data-vaul-no-drag>
      <motion.div
        className="flex h-full cursor-grab active:cursor-grabbing"
        style={{ x, touchAction: 'pan-y' }}
        drag={count > 1 ? 'x' : false}
        dragConstraints={{ left: -(count - 1) * width, right: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className="h-full w-full shrink-0"
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Photo ${i + 1} of ${count}`}
          >
            {renderFrame(i)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
