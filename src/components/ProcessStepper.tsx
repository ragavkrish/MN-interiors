import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { PROCESS_STAGES } from '../data/content';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// `custom` is the travel direction: 1 = forward, -1 = back.
const contentVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 12 * dir }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: EASE_OUT, staggerChildren: 0.03 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -8 * dir,
    transition: { duration: 0.15, ease: EASE_OUT },
  }),
};

const chipVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function ProcessStepper() {
  const [[activeIndex, direction], setStage] = useState<[number, number]>([0, 1]);
  const current = PROCESS_STAGES[activeIndex];
  const reduce = useReducedMotion();
  const dir = reduce ? 0 : direction;
  const last = PROCESS_STAGES.length - 1;

  const goTo = (index: number, travel: number) => {
    if (index === activeIndex) return;
    setStage([index, travel]);
  };

  const handlePrev = () => goTo(activeIndex === 0 ? last : activeIndex - 1, -1);
  const handleNext = () => goTo(activeIndex === last ? 0 : activeIndex + 1, 1);

  return (
    <section id="craft-process" className="band-section w-full bg-[#0A0A0A] text-white">
      <div className="container-main">
        {/* Centered section intro */}
        <div className="mx-auto max-w-[740px] text-center reveal-stack">
          <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
            HOW WE BUILD YOUR HOME
          </p>
          <h2 className="section-h2 text-white">
            SIX STAGES FROM
            <br />
            <em>BARE SHELL TO HEIRLOOM</em>
          </h2>
          <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
            Every step is engineered in-house—from Leica laser measurements in your apartment to dry
            assembly at our Ambattur workshop and white-glove handover.
          </p>
        </div>

        {/* Horizontally scrollable tab row */}
        <div
          role="tablist"
          aria-label="Six-stage interior craftsmanship process"
          className="no-scrollbar mt-12 flex items-center gap-2 overflow-x-auto border-b border-white/10"
        >
          {PROCESS_STAGES.map((stage, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={stage.num}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`stage-panel-${stage.num}`}
                id={`stage-tab-${stage.num}`}
                onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                className={`relative flex shrink-0 cursor-pointer items-center gap-2.5 px-5 py-4 text-[14.5px] font-semibold whitespace-nowrap transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white/85'
                }`}
              >
                <span className="font-display text-[13px] font-extrabold text-[#F31C60] tabular-nums">
                  {stage.num}
                </span>
                <span>{stage.tabLabel}</span>
                {isActive && (
                  <motion.span
                    layoutId="stage-tab-indicator"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#F31C60]"
                    transition={reduce ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Ink 2 Two-Column Panel */}
        <div
          role="tabpanel"
          id={`stage-panel-${current.num}`}
          aria-labelledby={`stage-tab-${current.num}`}
          className="mt-7 rounded-[18px] border border-white/10 bg-[#141414] p-[36px] max-[680px]:p-[22px]"
        >
          <div className="grid-panel">
            {/* Left Side: Title, Description, Pink-Tint Outcome Callout */}
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={current.num}
                custom={dir}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F31C60] uppercase">
                  STAGE {current.num} OF 06
                </p>
                <h3 className="font-display mt-2.5 text-[30px] leading-[1.1] font-black tracking-[-0.5px] text-white max-[680px]:text-[24px]">
                  {current.title}
                </h3>
                <p className="mt-4 text-[15.5px] leading-[1.68] text-white/75">
                  {current.description}
                </p>

                {/* Pink-tinted outcome callout */}
                <div className="mt-6 rounded-[12px] border border-[#F31C60]/35 bg-[#F31C60]/12 p-5">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#F31C60] uppercase">
                    {current.outcomeTitle}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] font-medium text-white/90">
                    {current.outcomeText}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Side: 3 Stat Chips + 2-Column Checklist */}
            <div className="flex h-full flex-col justify-between gap-6">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={current.num}
                  custom={dir}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* 3 Stat Chips in Ink 3 */}
                  <div className="grid grid-cols-3 gap-2.5 max-[680px]:grid-cols-1">
                    {current.stats.map((stat) => (
                      <motion.div
                        key={stat.label}
                        variants={chipVariants}
                        className="rounded-[10px] border border-white/10 bg-[#1D1D1D] px-3.5 py-3.5"
                      >
                        <p className="text-[10.5px] font-semibold tracking-[0.12em] text-white/50 uppercase">
                          {stat.label}
                        </p>
                        <p className="font-display mt-1 text-[18px] leading-[1.2] font-extrabold text-white tabular-nums">
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* 2-Column Checklist in Ink 3 */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5 max-[680px]:grid-cols-1">
                    {current.checklist.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 rounded-[8px] border border-white/10 bg-[#1D1D1D] px-3.5 py-3 text-[13.5px] leading-[1.4] text-white/85"
                      >
                        <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60] text-white">
                          <Check size={12} weight="bold" aria-hidden="true" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Controls Bottom-Right */}
              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5 max-[680px]:flex-col max-[680px]:items-stretch">
                <span className="text-[13px] font-medium text-white/50 tabular-nums">
                  Stage {activeIndex + 1} / {PROCESS_STAGES.length}
                </span>
                <div className="flex items-center gap-2.5 max-[680px]:grid max-[680px]:grid-cols-2">
                  <button type="button" onClick={handlePrev} className="btn-ghost btn-sm">
                    <ArrowLeft size={15} weight="fill" aria-hidden="true" />
                    <span>Prev</span>
                  </button>
                  <button type="button" onClick={handleNext} className="btn-pink btn-sm">
                    <span>Next Stage</span>
                    <ArrowRight size={15} weight="fill" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
