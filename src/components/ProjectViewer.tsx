import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChatCircleText,
  Check,
  MapPin,
  Star,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Drawer } from 'vaul';
import {
  CONTACT_INFO,
  PROJECTS,
  TESTIMONIALS,
  projectFrames,
  type ShowcaseProject,
} from '../data/content';
import { useMediaQuery } from '../lib/useMediaQuery';
import { PhotoGallery } from './PhotoGallery';
import { ProjectPhoto } from './ProjectPhoto';

interface ProjectViewerProps {
  projectId: string | null;
  onClose: () => void;
  onEnquire: (scope: string, projectTitle: string) => void;
}

// Motion tokens from index.css
const easeOut = [0.23, 1, 0.32, 1] as const;
const easeDrawer = [0.32, 0.72, 0, 1] as const;

const whatsappHref = (project: ShowcaseProject) => {
  const msg = `Hi MN Interiors, I saw "${project.title}" on your website and would like to enquire about similar interior work in Chennai.`;
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};

/**
 * Project story view. Desktop: centred dialog (photo stage + details).
 * Phone: bottom drawer you can drag down to close (Vaul), photos swipe sideways.
 */
export function ProjectViewer({ projectId, onClose, onEnquire }: ProjectViewerProps) {
  const isPhone = useMediaQuery('(max-width: 767px)');
  const project = PROJECTS.find((p) => p.id === projectId) ?? null;

  // Keep rendering the last project while the close animation plays.
  const lastProject = useRef<ShowcaseProject | null>(project);
  if (project) lastProject.current = project;
  const shown = project ?? lastProject.current;

  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => setPhotoIndex(0), [projectId]);

  const frameCount = shown ? projectFrames(shown).length : 0;

  // Arrow keys step through photos instantly (keyboard actions never animate).
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setPhotoIndex((i) => Math.min(frameCount - 1, i + 1));
      if (e.key === 'ArrowLeft') setPhotoIndex((i) => Math.max(0, i - 1));
      if (e.key === 'Escape' && !isPhone) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, frameCount, isPhone, onClose]);

  const enquire = () => {
    if (!shown) return;
    const { enquiryScope, title } = shown;
    onClose();
    onEnquire(enquiryScope, title);
  };

  if (isPhone) {
    return (
      <Drawer.Root open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/70" />
          <Drawer.Content
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[94dvh] flex-col rounded-t-[20px] border-t border-white/15 bg-[#0A0A0A] text-white outline-none"
            aria-describedby={undefined}
          >
            <div className="mx-auto mt-3 mb-2 h-[5px] w-[44px] shrink-0 rounded-full bg-white/25" aria-hidden="true" />
            {shown && (
              <div className="overflow-y-auto overscroll-contain pb-[max(20px,env(safe-area-inset-bottom))]">
                <Drawer.Title className="sr-only">{shown.title}</Drawer.Title>
                <Stage
                  project={shown}
                  index={photoIndex}
                  onIndexChange={setPhotoIndex}
                  className="aspect-[4/3] w-full"
                />
                <Thumbnails project={shown} index={photoIndex} onSelect={setPhotoIndex} className="px-4 pt-3" />
                <Details project={shown} onEnquire={enquire} className="px-5 pt-5" />
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <DesktopDialog project={project} onClose={onClose}>
      {shown && (
        <div className="grid grid-cols-[1.45fr_0.75fr] max-[1000px]:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col justify-center border-r border-white/10 bg-black">
            <Stage project={shown} index={photoIndex} onIndexChange={setPhotoIndex} className="aspect-[4/3] w-full" />
            <Thumbnails project={shown} index={photoIndex} onSelect={setPhotoIndex} className="px-4 py-3" />
          </div>
          <Details project={shown} onEnquire={enquire} className="max-h-[86vh] overflow-y-auto p-7" />
        </div>
      )}
    </DesktopDialog>
  );
}

/* ---------------------------------------------------------------- Desktop shell */

function DesktopDialog({
  project,
  onClose,
  children,
}: {
  project: ShowcaseProject | null;
  onClose: () => void;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll and move focus into the dialog while it's open.
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-6 backdrop-blur-xs"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, ease: easeOut } }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: easeOut } }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            tabIndex={-1}
            className="relative w-full max-w-[1180px] overflow-hidden rounded-[20px] border border-white/15 bg-[#0A0A0A] text-white outline-none"
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
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="absolute top-4 right-4 z-10 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xs transition-colors hover:bg-[#F31C60]"
            >
              <X size={18} weight="bold" aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- Photo stage */

function Stage({
  project,
  index,
  onIndexChange,
  className = '',
}: {
  project: ShowcaseProject;
  index: number;
  onIndexChange: (i: number) => void;
  className?: string;
}) {
  const frames = projectFrames(project);
  const many = frames.length > 1;

  return (
    <div className={`relative bg-black ${className}`}>
      <PhotoGallery
        count={frames.length}
        index={index}
        onIndexChange={onIndexChange}
        className="h-full w-full"
        renderFrame={(i) => (
          <ProjectPhoto
            image={frames[i]}
            fit="contain"
            sizes="(max-width: 767px) 100vw, 760px"
            className="h-full w-full"
          />
        )}
      />

      {/* Counter */}
      <span className="pointer-events-none absolute top-4 left-4 rounded-[8px] bg-black/65 px-2.5 py-1 text-[12px] font-bold text-white tabular-nums backdrop-blur-xs">
        {index + 1} / {frames.length}
      </span>

      {/* Previous / next — instant, like the arrow keys */}
      {many && (
        <>
          <button
            type="button"
            onClick={() => onIndexChange(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="Previous photo"
            className="gallery-arrow absolute top-1/2 left-3 -translate-y-1/2"
          >
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onIndexChange(Math.min(frames.length - 1, index + 1))}
            disabled={index === frames.length - 1}
            aria-label="Next photo"
            className="gallery-arrow absolute top-1/2 right-3 -translate-y-1/2"
          >
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

function Thumbnails({
  project,
  index,
  onSelect,
  className = '',
}: {
  project: ShowcaseProject;
  index: number;
  onSelect: (i: number) => void;
  className?: string;
}) {
  const frames = projectFrames(project);
  if (frames.length < 2) return null;

  return (
    <div className={`no-scrollbar flex gap-2 overflow-x-auto ${className}`} data-vaul-no-drag>
      {frames.map((frame, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show photo ${i + 1}: ${frame.shot}`}
          aria-current={i === index}
          className={`h-[52px] w-[72px] shrink-0 cursor-pointer overflow-hidden rounded-[8px] border-2 transition-[border-color,opacity] duration-150 ${
            i === index ? 'border-[#F31C60] opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
          }`}
        >
          <ProjectPhoto image={frame} sizes="72px" placeholder="compact" className="h-full w-full" />
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Details */

function Details({
  project,
  onEnquire,
  className = '',
}: {
  project: ShowcaseProject;
  onEnquire: () => void;
  className?: string;
}) {
  const review = project.reviewName ? TESTIMONIALS.find((t) => t.name === project.reviewName) : undefined;
  const facts = [
    project.propertyType,
    project.durationWeeks ? `${project.durationWeeks} weeks` : undefined,
    project.year ? String(project.year) : undefined,
  ].filter(Boolean) as string[];

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-[6px] bg-[#F31C60] px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
          {project.category}
        </span>
        {project.placeholder && (
          <span className="rounded-[6px] border border-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/60 uppercase">
            Photos coming soon
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.14em] text-[#F31C60] uppercase">
        <MapPin size={14} weight="fill" aria-hidden="true" />
        <span>{project.area}</span>
      </div>

      <h3
        id="project-title"
        className="font-display mt-2 pr-10 text-[26px] leading-[1.12] font-black tracking-[-0.4px] text-white max-[767px]:pr-0 max-[767px]:text-[22px]"
      >
        {project.title}
      </h3>

      {facts.length > 0 && (
        <p className="mt-2 text-[13.5px] font-medium text-white/60">{facts.join(' · ')}</p>
      )}

      {project.outcome && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-[8px] bg-[#F31C60]/12 px-3 py-1.5 text-[12px] font-bold tracking-[0.1em] text-[#F31C60] uppercase">
          <Check size={13} weight="bold" aria-hidden="true" />
          {project.outcome}
        </p>
      )}

      <p className="mt-4 text-[14.5px] leading-[1.65] text-white/75">{project.summary}</p>

      {/* Scope */}
      {project.scope.length > 0 && (
        <div className="mt-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase">Scope of work</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.scope.map((item) => (
              <li
                key={item}
                className="rounded-[8px] border border-white/12 bg-[#141414] px-2.5 py-1 text-[12.5px] text-white/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Build details */}
      {project.highlights.length > 0 && (
        <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
          {project.highlights.map((hl) => (
            <li key={hl} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
              <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60] text-white">
                <Check size={11} weight="bold" aria-hidden="true" />
              </span>
              <span>{hl}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Linked client review (only when it belongs to this real project) */}
      {review && (
        <figure className="mt-5 rounded-[12px] border border-white/10 bg-[#141414] p-4">
          <div className="flex gap-0.5 text-[#F31C60]" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={13} weight="fill" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="mt-2 text-[13.5px] leading-[1.6] text-white/80">“{review.quote}”</blockquote>
          <figcaption className="mt-2 text-[12.5px] font-semibold text-white">{review.name}</figcaption>
        </figure>
      )}

      <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
        <button type="button" onClick={onEnquire} className="btn-pink btn-md w-full">
          <ChatCircleText size={17} weight="fill" aria-hidden="true" />
          <span>Get a Quote for Something Similar</span>
        </button>
        <a href={whatsappHref(project)} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm w-full">
          <WhatsappLogo size={17} weight="fill" className="text-[#2FD47A]" aria-hidden="true" />
          <span>WhatsApp About This Project</span>
        </a>
      </div>
    </div>
  );
}
