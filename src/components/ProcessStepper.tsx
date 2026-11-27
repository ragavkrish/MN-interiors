import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { PROCESS_STAGES } from '../data/content';

export function ProcessStepper() {
  const [activeIndex, setActiveIndex] = useState(0);
  // 1 = moving forward (content enters from the right), -1 = moving back
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();
  const current = PROCESS_STAGES[activeIndex];

  // --ease-out from index.css
  const easeOut = [0.23, 1, 0.32, 1] as const;
  const contentEnter = {
    initial: reduceMotion
      ? { opacity: 0, transform: 'translateX(0px)' }
      : { opacity: 0, transform: `translateX(${8 * direction}px)` },
    animate: { opacity: 1, transform: 'translateX(0px)' },
    transition: { duration: 0.2, ease: easeOut },
  };

  const goTo = (index: number, dir: 1 | -1) => {
    setDirection(dir);
    setActiveIndex(index);
  };

  const handlePrev = () => {
    goTo(activeIndex === 0 ? PROCESS_STAGES.length - 1 : activeIndex - 1, -1);
  };

  const handleNext = () => {
    goTo(activeIndex === PROCESS_STAGES.length - 1 ? 0 : activeIndex + 1, 1);
  };

  return (
    <section id="how-we-work" className="band-section w-full bg-[#0A0A0A] text-white">
      <div className="container-main">
        {/* Centered section intro */}
        <div className="mx-auto max-w-[740px] text-center" data-reveal>
          <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
            SIMPLE &amp; STRESS-FREE PROCESS
          </p>
          <h2 className="section-h2 text-white">
            SIX SIMPLE STEPS TO
            <br />
            <em>YOUR FINISHED HOME</em>
          </h2>
          <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
            Getting your home interiors done should not feel confusing or stressful. Here is
            exactly how we work with you from your first enquiry to handing over the keys.
          </p>
        </div>

        {/* Horizontally scrollable tab row */}
        <div
          role="tablist"
          aria-label="Six-step home interior process"
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
                onClick={() => goTo(index, index >= activeIndex ? 1 : -1)}
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
                    layoutId="process-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#F31C60]"
                    aria-hidden="true"
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: easeOut }}
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
            <motion.div key={`copy-${activeIndex}`} {...contentEnter}>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F31C60] uppercase">
                STEP {current.num} OF 06
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

            {/* Right Side: 3 Stat Chips + 2-Column Checklist */}
            <div className="flex h-full flex-col justify-between gap-6">
              <motion.div key={`detail-${activeIndex}`} {...contentEnter}>
                {/* 3 Stat Chips in Ink 3 */}
                <div className="grid grid-cols-3 gap-2.5 max-[680px]:grid-cols-1">
                  {current.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[10px] border border-white/10 bg-[#1D1D1D] px-3.5 py-3.5"
                    >
                      <p className="text-[10.5px] font-semibold tracking-[0.12em] text-white/50 uppercase">
                        {stat.label}
                      </p>
                      <p className="font-display mt-1 text-[17px] leading-[1.2] font-extrabold text-white tabular-nums">
                        {stat.value}
                      </p>
                    </div>
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

              {/* Prev / Next Controls Bottom-Right */}
              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5 max-[680px]:flex-col max-[680px]:items-stretch">
                <span className="text-[13px] font-medium text-white/50 tabular-nums">
                  Step {activeIndex + 1} / {PROCESS_STAGES.length}
                </span>
                <div className="flex items-center gap-2.5 max-[680px]:grid max-[680px]:grid-cols-2">
                  <button type="button" onClick={handlePrev} className="btn-ghost btn-sm">
                    <ArrowLeft size={15} weight="fill" aria-hidden="true" />
                    <span>Prev</span>
                  </button>
                  <button type="button" onClick={handleNext} className="btn-pink btn-sm">
                    <span>Next Step</span>
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
