import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { WORK_SHOWCASE_ITEMS } from '../data/content';

interface WorkShowcaseProps {
  onEnquireStyle: (scope: string, projectTitle: string) => void;
}

const num = (i: number) => String(i + 1).padStart(2, '0');

/**
 * "Spotlight" recent-work section: one large photo with tappable detail dots,
 * a popover explaining each detail, a numbered detail list, and thumbnails
 * to switch between projects.
 */
export function WorkShowcase({ onEnquireStyle }: WorkShowcaseProps) {
  const items = WORK_SHOWCASE_ITEMS;
  const frameRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const [cur, setCur] = useState(0);
  const [det, setDet] = useState(-1);
  const [calm, setCalm] = useState(false); // stops the dot pulse once the visitor interacts
  const [frame, setFrame] = useState({ w: 0, h: 0 });
  const [popStyle, setPopStyle] = useState<CSSProperties>({});
  const [popShown, setPopShown] = useState(false);

  const item = items[cur];

  // Track the photo frame's size so dots can be placed on the cover-cropped photo.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFrame({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Map a point given in % of the original photo to pixels in the cropped frame.
  const toFrame = (x: number, y: number) => {
    const { w: fw, h: fh } = frame;
    const k = Math.max(fw / item.imageWidth, fh / item.imageHeight);
    const ox = (fw - item.imageWidth * k) / 2;
    const oy = (fh - item.imageHeight * k) / 2;
    return { left: ox + (x / 100) * item.imageWidth * k, top: oy + (y / 100) * item.imageHeight * k };
  };

  // Position the popover beside the active dot (or as an edge strip on phones).
  useLayoutEffect(() => {
    const pop = popRef.current;
    if (det < 0 || !pop || !frame.w) {
      setPopShown(false);
      return;
    }
    const d = item.details[det];
    const { left: x, top: y } = toFrame(d.x, d.y);
    const fw = frame.w;
    const fh = frame.h;
    if (window.innerWidth < 600) {
      // Phones: the in-frame popover is hidden (CSS) and the caption under the photo is used instead.
      setPopStyle({});
    } else {
      const pw = pop.offsetWidth;
      const ph = pop.offsetHeight;
      const right = x + 26 + pw < fw;
      const left = Math.min(Math.max(right ? x + 26 : x - 26 - pw, 12), fw - pw - 12);
      const top = Math.min(Math.max(y - ph / 2, 12), fh - ph - 12);
      setPopStyle({ left, top, transformOrigin: `${right ? 'left' : 'right'} center` });
    }
    // Show on the next frame so the scale/opacity entrance plays from the new position.
    setPopShown(false);
    const r = requestAnimationFrame(() => setPopShown(true));
    return () => cancelAnimationFrame(r);
  }, [det, cur, frame.w, frame.h]);

  // Escape closes an open detail.
  useEffect(() => {
    if (det < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDet(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [det]);

  const openDetail = (k: number) => {
    setCalm(true);
    setDet((d) => (d === k ? -1 : k));
  };

  const showProject = (i: number) => {
    setCalm(true);
    setDet(-1);
    setCur(i);
  };

  const activeDetail = det >= 0 ? item.details[det] : null;

  return (
    <section id="our-work" className="band-section w-full ws-section">
      <div className="container-main">
        {/* Section heading */}
        <div className="ws-head" data-reveal>
          <div>
            <p className="ws-eyebrow">Recent work</p>
            <h2 className="ws-h2">
              Crafted for Chennai
              <br />
              <em>homes and shops.</em>
            </h2>
          </div>
          <p className="ws-intro">
            Recent kitchens, wardrobes, pooja units and shop interiors, built in our own Kundrathur
            workshop and fitted in homes across Chennai. Tap the dots to see the details.
          </p>
        </div>

        <div className="ws" data-calm={calm ? '1' : '0'}>
          <div className="ws-media">
            <div className="ws-frame" ref={frameRef} onClick={() => setDet(-1)}>
              {items.map((p, i) => (
                <img
                  key={p.id}
                  src={p.imageSrc}
                  alt={i === cur ? p.imageAlt : ''}
                  aria-hidden={i === cur ? undefined : true}
                  data-on={i === cur ? '1' : '0'}
                  width={p.imageWidth}
                  height={p.imageHeight}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}

              {frame.w > 0 && (
                <div className="ws-dots" key={item.id}>
                  {item.details.map((d, k) => {
                    const pos = toFrame(d.x, d.y);
                    return (
                      <button
                        key={d.title}
                        type="button"
                        className="ws-dot"
                        data-on={k === det ? '1' : '0'}
                        aria-pressed={k === det}
                        aria-label={`Detail ${k + 1}: ${d.title}`}
                        style={{ left: pos.left, top: pos.top, animationDelay: `${200 + k * 70}ms` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(k);
                        }}
                      />
                    );
                  })}
                </div>
              )}

              <div
                ref={popRef}
                className="ws-pop"
                role="status"
                aria-live="polite"
                data-show={popShown && activeDetail ? '1' : '0'}
                style={popStyle}
                onClick={(e) => e.stopPropagation()}
              >
                {activeDetail && (
                  <>
                    <b>{activeDetail.title}</b>
                    <span>{activeDetail.text}</span>
                  </>
                )}
              </div>

              <span className="ws-hint" aria-hidden="true">
                Tap the dots to see the details
              </span>
            </div>

            {/* Phones: detail text sits under the photo so it never covers a dot */}
            <div className="ws-caption" role="status" aria-live="polite">
              {activeDetail ? (
                <div className="ws-caption-in" key={`${item.id}-${det}`}>
                  <b>{activeDetail.title}</b>
                  <span>{activeDetail.text}</span>
                </div>
              ) : (
                <div className="ws-caption-in ws-caption-hint" key={`${item.id}-hint`}>
                  Tap a dot on the photo to see that detail.
                </div>
              )}
            </div>

            <div className="ws-thumbs" role="group" aria-label="Choose a project">
              {items.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  data-on={i === cur ? '1' : '0'}
                  aria-pressed={i === cur}
                  aria-label={p.title}
                  onClick={() => showProject(i)}
                >
                  <img src={p.imageSrc} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <div className="ws-side" key={item.id}>
            <p className="ws-kicker">
              <span className="ws-num">{num(cur)}</span>
              <span className="ws-tag">{item.category}</span>
            </p>
            <h3 className="ws-title">{item.title}</h3>
            <p className="ws-area">{item.area}</p>
            <p className="ws-summary">{item.summary}</p>
            <div>
              <ul className="ws-details">
                {item.details.map((d, k) => (
                  <li key={d.title}>
                    <button type="button" data-on={k === det ? '1' : '0'} onClick={() => openDetail(k)}>
                      <span>{k + 1}</span>
                      {d.title}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-pink ws-cta"
                onClick={() => onEnquireStyle(item.enquiryScope, item.title)}
              >
                Enquire about a similar {item.enquiryScope.startsWith('Shop') ? 'shop' : 'design'} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
