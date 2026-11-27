import { useState } from 'react';
import { ArrowsOutSimple, Camera, ChatCircleText, MapPin } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PROJECTS,
  SHOWCASE_CATEGORIES,
  projectFrames,
  type ShowcaseCategory,
  type ShowcaseProject,
} from '../data/content';
import { ProjectPhoto } from './ProjectPhoto';

interface WorkShowcaseProps {
  onOpenProject: (id: string) => void;
  onEnquireStyle: (scope: string, projectTitle: string) => void;
}

/** Projects shown before "Show more" (bento row of 3 + 2-up row + one row of 3) */
const INITIAL_VISIBLE = 8;

// --ease-out from index.css
const easeOut = [0.23, 1, 0.32, 1] as const;
// Shrinking stagger gaps within a row (seconds)
const ROW_DELAYS = [0, 0.045, 0.085];

interface TileOptions {
  sizes: string;
  className?: string;
  delay?: number;
  large?: boolean;
}

export function WorkShowcase({ onOpenProject, onEnquireStyle }: WorkShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>('All Work');
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();

  const isAll = activeCategory === 'All Work';
  const filtered = isAll ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);
  const visible = isAll && !showAll ? filtered.slice(0, INITIAL_VISIBLE) : filtered;
  const hiddenCount = filtered.length - visible.length;

  const renderTile = (project: ShowcaseProject, { sizes, className = '', delay = 0, large = false }: TileOptions) => {
    const frameCount = projectFrames(project).length;
    const showFeatured = large && !project.placeholder;

    return (
      <motion.button
        key={`${activeCategory}-${project.id}`}
        type="button"
        onClick={() => onOpenProject(project.id)}
        aria-label={`Open project: ${project.title}, ${project.area}`}
        className={`group relative flex w-full cursor-pointer overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-[#141414] text-left ${className}`}
        // One-time reveal: the tile uncovers top-to-bottom as it scrolls into view.
        initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
        whileInView={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: easeOut, delay: reduceMotion ? 0 : delay }}
      >
        <ProjectPhoto
          image={project.cover}
          sizes={sizes}
          placeholder="icon"
          className="transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />

        {/* Bottom scrim for legible captions over any photo */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
          aria-hidden="true"
        />

        {/* Top row: category / featured + expand affordance */}
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span
            className={`inline-block rounded-[6px] px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] uppercase backdrop-blur-xs ${
              showFeatured ? 'bg-[#F31C60] text-white' : 'bg-black/65 text-white/95'
            }`}
          >
            {showFeatured ? 'Featured work' : project.category}
          </span>
          <span
            className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] bg-black/65 text-white backdrop-blur-xs transition-colors duration-150 group-hover:bg-[#F31C60]"
            aria-hidden="true"
          >
            <ArrowsOutSimple size={17} weight="fill" />
          </span>
        </div>

        {/* Caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 max-[680px]:p-4">
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.12em] text-white/80 uppercase">
            <MapPin size={13} weight="fill" className="text-[#F31C60]" aria-hidden="true" />
            <span>{project.area}</span>
          </div>
          <h3
            className={`font-display mt-1.5 leading-[1.2] font-black tracking-[-0.3px] text-white ${
              large ? 'text-[24px] max-[680px]:text-[19px]' : 'text-[19px] max-[680px]:text-[18px]'
            }`}
          >
            {project.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] font-semibold text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Camera size={14} weight="fill" aria-hidden="true" />
              {project.placeholder ? 'Photos coming soon' : `${frameCount} photos`}
            </span>
            {project.outcome && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-white/85">{project.outcome}</span>
              </>
            )}
          </div>
          {large && (
            <p className="mt-2 line-clamp-2 max-w-[520px] text-[14px] leading-[1.55] text-white/85 max-[680px]:hidden">
              {project.summary}
            </p>
          )}
        </div>
      </motion.button>
    );
  };

  // "All Work" layout: bento (1 large + 2 stacked) → 2-up row → 3-column grid.
  const [lead, side1, side2, ...rest] = visible;
  const twoUp = rest.slice(0, 2);
  const grid = rest.slice(2);

  return (
    <section id="our-work" className="band-section w-full bg-[#F4F4F4] text-[#0A0A0A]">
      <div className="container-main">
        {/* Centered Intro */}
        <div className="mx-auto max-w-[760px] text-center" data-reveal>
          <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">OUR WORK</p>
          <h2 className="section-h2 text-[#0A0A0A]">
            20 YEARS OF HOMES
            <br />
            <em>BUILT IN OUR OWN WORKSHOP</em>
          </h2>
          <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
            Kitchens, wardrobes, pooja units, full homes and shops across Chennai. Tap any project to see
            every photo, what we built, and the materials we used.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {SHOWCASE_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            const count =
              category === 'All Work' ? PROJECTS.length : PROJECTS.filter((p) => p.category === category).length;
            if (count === 0) return null;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveCategory(category)}
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

        {isAll ? (
          <div className="mt-9 space-y-5">
            {/* Bento: lead project (2 cols × 2 rows) + 2 stacked */}
            <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
              {lead &&
                renderTile(lead, {
                  large: true,
                  sizes: '(max-width: 1000px) 100vw, 800px',
                  className:
                    'col-span-2 row-span-2 min-h-[500px] max-[1000px]:col-span-2 max-[1000px]:row-span-1 max-[1000px]:aspect-[16/10] max-[1000px]:min-h-0 max-[680px]:col-span-1 max-[680px]:aspect-[4/3]',
                })}
              {[side1, side2].map(
                (p, i) =>
                  p &&
                  renderTile(p, {
                    delay: ROW_DELAYS[i + 1],
                    sizes: '(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 400px',
                    className: 'min-h-[240px] max-[1000px]:aspect-[4/3] max-[1000px]:min-h-0',
                  }),
              )}
            </div>

            {/* 2-up row */}
            {twoUp.length > 0 && (
              <div className="grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
                {twoUp.map((p, i) =>
                  renderTile(p, {
                    delay: ROW_DELAYS[i],
                    sizes: '(max-width: 680px) 100vw, 600px',
                    className: 'aspect-[16/10] max-[680px]:aspect-[4/3]',
                  }),
                )}
              </div>
            )}

            {/* 3-column grid */}
            {grid.length > 0 && (
              <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1">
                {grid.map((p, i) =>
                  renderTile(p, {
                    delay: ROW_DELAYS[i % 3],
                    sizes: '(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 400px',
                    className: 'aspect-[4/3]',
                  }),
                )}
              </div>
            )}

            {hiddenCount > 0 && (
              <div className="flex justify-center pt-2">
                <button type="button" onClick={() => setShowAll(true)} className="btn-outline-ink btn-md">
                  Show {hiddenCount} more {hiddenCount === 1 ? 'project' : 'projects'}
                </button>
              </div>
            )}
          </div>
        ) : visible.length === 1 ? (
          <div className="mx-auto mt-9 max-w-[820px]">
            {renderTile(visible[0], {
              large: true,
              sizes: '(max-width: 820px) 100vw, 820px',
              className: 'aspect-[16/10] max-[680px]:aspect-[4/3]',
            })}
          </div>
        ) : (
          <div className="mt-9 grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
            {visible.map((p, i) =>
              renderTile(p, {
                delay: ROW_DELAYS[i % 2],
                sizes: '(max-width: 680px) 100vw, 600px',
                className: 'aspect-[4/3]',
              }),
            )}
          </div>
        )}

        {/* Bottom strip below gallery */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-[#E6E6E6] bg-white px-6 py-4 max-[680px]:flex-col max-[680px]:items-start">
          <p className="text-[14.5px] leading-[1.55] text-[#666666]">
            <strong className="font-semibold text-[#0A0A0A]">Want to see finishes in person?</strong>{' '}
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
    </section>
  );
}
