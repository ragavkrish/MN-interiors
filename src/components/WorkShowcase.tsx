import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOutSimple,
  ChatCircleText,
  Check,
  Image as ImageIcon,
  MapPin,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  CONTACT_INFO,
  SHOWCASE_CATEGORIES,
  WORK_SHOWCASE_ITEMS,
  type ShowcaseCategory,
  type ShowcaseItem,
} from '../data/content';

interface WorkShowcaseProps {
  onEnquireStyle: (scope: string, projectTitle: string) => void;
}

export function WorkShowcase({ onEnquireStyle }: WorkShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>('All Work');
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  // Motion tokens from index.css
  const easeOut = [0.23, 1, 0.32, 1] as const;
  const easeDrawer = [0.32, 0.72, 0, 1] as const;

  const visibleItems =
    activeCategory === 'All Work'
      ? WORK_SHOWCASE_ITEMS
      : WORK_SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const lightboxIndex = lightboxId
    ? visibleItems.findIndex((item) => item.id === lightboxId)
    : -1;
  const activeItem: ShowcaseItem | null =
    lightboxIndex >= 0 ? visibleItems[lightboxIndex] : null;

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxId(null);
      } else if (e.key === 'ArrowRight' && visibleItems.length > 1) {
        const nextIndex = (lightboxIndex + 1) % visibleItems.length;
        setLightboxId(visibleItems[nextIndex].id);
      } else if (e.key === 'ArrowLeft' && visibleItems.length > 1) {
        const prevIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
        setLightboxId(visibleItems[prevIndex].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, lightboxIndex, visibleItems]);

  const handlePrevLightbox = () => {
    if (visibleItems.length <= 1 || lightboxIndex < 0) return;
    const prevIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    setLightboxId(visibleItems[prevIndex].id);
  };

  const handleNextLightbox = () => {
    if (visibleItems.length <= 1 || lightboxIndex < 0) return;
    const nextIndex = (lightboxIndex + 1) % visibleItems.length;
    setLightboxId(visibleItems[nextIndex].id);
  };

  const markImageBroken = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const buildStyleWhatsappHref = (item: ShowcaseItem) => {
    const msg = `Hi MN Interiors, I saw "${item.title}" on your website and would like to enquire about similar interior work in Chennai.`;
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const renderTile = (item: ShowcaseItem, extraClassName = '', showFeaturedBadge = false) => {
    const isBroken = Boolean(brokenImages[item.id]);

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setLightboxId(item.id)}
        aria-label={`View ${item.title} in fullscreen`}
        className={`group relative flex w-full cursor-pointer overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-[#141414] text-left ${extraClassName}`}
      >
        {isBroken ? (
          <div className="flex h-full min-h-[260px] w-full flex-col items-center justify-center bg-[#141414] p-8 text-center">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-[#F31C60] text-white">
              <ImageIcon size={26} weight="fill" aria-hidden="true" />
            </div>
            <p className="font-display mt-4 text-[18px] font-extrabold text-white">{item.title}</p>
            <p className="mt-1 text-[13px] text-white/60">{item.area}</p>
          </div>
        ) : (
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => markImageBroken(item.id)}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        )}

        {/* Measured bottom scrim for crisp WCAG AA legibility over any interior photograph */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"
          aria-hidden="true"
        />

        {/* Top Row: Optional Featured Tag + Expand Affordance */}
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          {showFeaturedBadge ? (
            <span className="inline-block rounded-[6px] bg-[#F31C60] px-2.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
              FEATURED WORK
            </span>
          ) : (
            <span className="inline-block rounded-[6px] bg-black/65 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/95 uppercase backdrop-blur-xs">
              {item.category}
            </span>
          )}

          <span
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] bg-black/65 text-white transition-colors duration-150 group-hover:bg-[#F31C60] backdrop-blur-xs"
            aria-hidden="true"
          >
            <ArrowsOutSimple size={17} weight="fill" />
          </span>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 max-[680px]:p-4">
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.12em] text-white/80 uppercase">
            <MapPin size={13} weight="fill" className="text-[#F31C60]" aria-hidden="true" />
            <span>{item.area}</span>
          </div>
          <h3 className="font-display mt-1.5 text-[20px] leading-[1.2] font-black tracking-[-0.3px] text-white max-[680px]:text-[18px]">
            {item.title}
          </h3>
          {showFeaturedBadge && (
            <p className="mt-2 line-clamp-2 max-w-[520px] text-[14px] leading-[1.55] text-white/85 max-[680px]:hidden">
              {item.summary}
            </p>
          )}
        </div>
      </button>
    );
  };

  return (
    <section id="our-work" className="band-section w-full bg-[#F4F4F4] text-[#0A0A0A]">
      <div className="container-main">
        {/* Centered Intro */}
        <div className="mx-auto max-w-[740px] text-center" data-reveal>
          <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
            OUR RECENT WORK
          </p>
          <h2 className="section-h2 text-[#0A0A0A]">
            CRAFTED FOR
            <br />
            <em>CHENNAI HOMES &amp; SHOPS</em>
          </h2>
          <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
            Filter by room and tap any project to view the finish up close. Like a particular
            style? Send us an enquiry directly from the preview.
          </p>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {SHOWCASE_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            const count =
              category === 'All Work'
                ? WORK_SHOWCASE_ITEMS.length
                : WORK_SHOWCASE_ITEMS.filter((i) => i.category === category).length;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxId(null);
                }}
                className={`inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 rounded-[10px] px-4 py-2.5 text-[14px] font-bold whitespace-nowrap transition-colors duration-150 ${
                  isSelected
                    ? 'bg-[#F31C60] text-white'
                    : 'border border-[#E6E6E6] bg-white text-[#0A0A0A] hover:border-[#0A0A0A]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`font-display text-[12px] font-extrabold tabular-nums ${
                    isSelected ? 'text-white/85' : 'text-[#666666]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Bento Grid (All Work) vs Balanced Filtered Grid.
            Keyed on the filter so a new selection settles in instead of snapping. */}
        <motion.div
          key={activeCategory}
          initial={
            reduceMotion
              ? { opacity: 0, transform: 'translateY(0px)' }
              : { opacity: 0, transform: 'translateY(8px)' }
          }
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.25, ease: easeOut }}
        >
          {activeCategory === 'All Work' ? (
            <div className="mt-9 space-y-5">
              {/* Top Bento Row: 2-col wide featured kitchen + 2 stacked right tiles */}
              <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
                {/* Lead Showcase Tile (2 cols x 2 rows on desktop) */}
                {renderTile(
                  visibleItems[0],
                  'col-span-2 row-span-2 min-h-[470px] max-[1000px]:col-span-2 max-[1000px]:row-span-1 max-[1000px]:aspect-[16/10] max-[1000px]:min-h-0 max-[680px]:col-span-1 max-[680px]:aspect-[4/3]',
                  true,
                )}

                {/* Right Column Stacked Tiles */}
                {renderTile(
                  visibleItems[1],
                  'min-h-[225px] max-[1000px]:aspect-[4/3] max-[1000px]:min-h-0',
                )}
                {renderTile(
                  visibleItems[2],
                  'min-h-[225px] max-[1000px]:aspect-[4/3] max-[1000px]:min-h-0',
                )}
              </div>

              {/* Bottom Balanced 2-Up Bento Row */}
              <div className="grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
                {renderTile(visibleItems[3], 'aspect-[16/10] max-[680px]:aspect-[4/3]')}
                {renderTile(visibleItems[4], 'aspect-[16/10] max-[680px]:aspect-[4/3]')}
              </div>
            </div>
          ) : visibleItems.length === 1 ? (
            <div className="mx-auto mt-9 max-w-[820px]">
              {renderTile(visibleItems[0], 'aspect-[16/10] max-[680px]:aspect-[4/3]', true)}
            </div>
          ) : (
            <div className="mt-9 grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
              {visibleItems.map((item) =>
                renderTile(item, 'aspect-[4/3]'),
              )}
            </div>
          )}
        </motion.div>

        {/* Bottom strip below gallery */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-[#E6E6E6] bg-white px-6 py-4 max-[680px]:flex-col max-[680px]:items-start">
          <p className="text-[14.5px] leading-[1.55] text-[#666666]">
            <strong className="font-semibold text-[#0A0A0A]">
              Want to see finishes in person?
            </strong>{' '}
            Drop by our Kundrathur workshop or request a free home visit anywhere in Chennai.
          </p>
          <button
            type="button"
            onClick={() => onEnquireStyle('Full Home Interiors', '')}
            className="btn-pink btn-sm max-[680px]:w-full"
          >
            <ChatCircleText size={16} weight="fill" aria-hidden="true" />
            <span>Ask About Your Home</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Viewer */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="lightbox-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-xs max-[680px]:p-3"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            onClick={() => setLightboxId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: easeOut } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: easeOut } }}
          >
            <motion.div
              className="relative max-h-[94vh] w-full max-w-[1120px] overflow-y-auto rounded-[20px] border border-white/15 bg-[#0A0A0A] text-white"
              onClick={(e) => e.stopPropagation()}
              initial={
                reduceMotion
                  ? { opacity: 0, transform: 'scale(1)' }
                  : { opacity: 0, transform: 'scale(0.96)' }
              }
              animate={{ opacity: 1, transform: 'scale(1)', transition: { duration: 0.3, ease: easeDrawer } }}
              exit={
                reduceMotion
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : { opacity: 0, transform: 'scale(0.97)', transition: { duration: 0.15, ease: easeOut } }
              }
            >
              {/* Top Bar inside Lightbox */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 max-[680px]:px-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-[6px] bg-[#F31C60] px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                    {activeItem.category}
                  </span>
                  <span className="font-display text-[13px] font-bold text-white/60 tabular-nums">
                    {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                    {String(visibleItems.length).padStart(2, '0')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxId(null)}
                  aria-label="Close fullscreen preview"
                  className="flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#141414] text-white transition-colors hover:bg-[#F31C60]"
                >
                  <X size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>

              {/* Split Media + Details Body */}
              <div className="grid grid-cols-[1.35fr_0.65fr] max-[920px]:grid-cols-1">
                {/* High-Res Photo Stage */}
                <div className="relative flex min-h-[340px] items-center justify-center bg-black p-4 max-[680px]:min-h-[240px] max-[680px]:p-2">
                  {brokenImages[activeItem.id] ? (
                    <div className="flex h-[360px] w-full flex-col items-center justify-center rounded-[12px] bg-[#141414] p-8 text-center">
                      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-[#F31C60] text-white">
                        <ImageIcon size={28} weight="fill" aria-hidden="true" />
                      </div>
                      <p className="font-display mt-4 text-[20px] font-extrabold text-white">
                        {activeItem.title}
                      </p>
                    </div>
                  ) : (
                    <motion.img
                      key={activeItem.id}
                      src={activeItem.imageSrc}
                      alt={activeItem.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => markImageBroken(activeItem.id)}
                      className="max-h-[68vh] w-full rounded-[12px] object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                    />
                  )}
                </div>

                {/* Project Details & Direct Style Enquiry Panel */}
                <div className="flex flex-col justify-between border-l border-white/10 bg-[#141414] p-6 max-[920px]:border-t max-[920px]:border-l-0 max-[680px]:p-5">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.14em] text-[#F31C60] uppercase">
                      <MapPin size={14} weight="fill" aria-hidden="true" />
                      <span>{activeItem.area}</span>
                    </div>

                    <h3
                      id="lightbox-title"
                      className="font-display mt-2 text-[24px] leading-[1.15] font-black tracking-[-0.4px] text-white"
                    >
                      {activeItem.title}
                    </h3>

                    <p className="mt-3 text-[14.5px] leading-[1.65] text-white/75">
                      {activeItem.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                      {activeItem.highlights.map((hl) => (
                        <li key={hl} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                          <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60] text-white">
                            <Check size={11} weight="bold" aria-hidden="true" />
                          </span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        const scope = activeItem.enquiryScope;
                        const title = activeItem.title;
                        setLightboxId(null);
                        onEnquireStyle(scope, title);
                      }}
                      className="btn-pink btn-md w-full"
                    >
                      <ChatCircleText size={17} weight="fill" aria-hidden="true" />
                      <span>Enquire About This Style</span>
                    </button>

                    <a
                      href={buildStyleWhatsappHref(activeItem)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-sm w-full"
                    >
                      <WhatsappLogo
                        size={17}
                        weight="fill"
                        className="text-[#2FD47A]"
                        aria-hidden="true"
                      />
                      <span>WhatsApp About This Style</span>
                    </a>

                    {visibleItems.length > 1 && (
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          type="button"
                          onClick={handlePrevLightbox}
                          className="btn-ghost btn-sm w-full"
                        >
                          <ArrowLeft size={15} weight="fill" aria-hidden="true" />
                          <span>Previous</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextLightbox}
                          className="btn-ghost btn-sm w-full"
                        >
                          <span>Next</span>
                          <ArrowRight size={15} weight="fill" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
