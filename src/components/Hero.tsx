import { ArrowDown, CalendarCheck, Compass } from '@phosphor-icons/react';
import { HERO_VALUE_STACK, MARQUEE_ITEMS } from '../data/content';

interface HeroProps {
  onOpenBooking: (mode?: 'audit' | 'visit') => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="top" className="w-full bg-[#0A0A0A] text-white">
      <div className="container-main pt-[80px] pb-[76px] max-[680px]:pt-[52px] max-[680px]:pb-[56px]">
        <div className="grid-hero">
          {/* Left Column */}
          <div>
            {/* Outlined live status pill */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-[99px] border border-white/18 px-4 py-2 text-[13px] font-medium text-white/85">
              <span className="live-dot" aria-hidden="true" />
              <span>CHENNAI&apos;S MASTER JOINERY STUDIO · EST. 2004</span>
            </div>

            <h1 className="hero-h1 text-white">
              22 YEARS OF
              <br />
              CHENNAI INTERIORS.
              <br />
              <em>BUILT BY MASTER</em>
              <br />
              <em>CRAFTSMEN.</em>
            </h1>

            <p className="mt-6 max-w-[560px] text-[18px] leading-[1.65] font-normal text-white/65 max-[680px]:text-[16px]">
              For over two decades across Boat Club, Adyar, Anna Nagar, and ECR, Kalaigar has
              crafted residential interiors inside our own 18,000 sq.ft. Ambattur workshop—zero
              sub-contracting, zero particle board, engineered to outlast Chennai&apos;s coastal
              climate.
            </p>

            {/* Primary & Ghost CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch">
              <button
                type="button"
                onClick={() => onOpenBooking('audit')}
                className="btn-pink btn-lg max-[680px]:w-full"
              >
                <CalendarCheck size={17} weight="fill" aria-hidden="true" />
                <span>Book Site Audit — ₹4,999</span>
              </button>

              <a href="#craft-process" className="btn-ghost btn-lg max-[680px]:w-full">
                <ArrowDown size={17} weight="fill" aria-hidden="true" />
                <span>See Our 6-Stage Craft</span>
              </a>
            </div>

            <p className="mt-4 text-[13px] leading-[1.5] text-white/50">
              ₹4,999 is 100% credited toward your turnkey build · 15-Year Written Structural
              Warranty · Alwarpet Studio &amp; Ambattur Factory
            </p>
          </div>

          {/* Right Column: Ink 2 Value-Stack Card */}
          <div className="rounded-[18px] border border-white/10 bg-[#141414] p-[28px] max-[680px]:p-[22px]">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F31C60] uppercase">
                  THE KALAIGAR BENCHMARK
                </p>
                <h2 className="font-display mt-1 text-[19px] leading-[1.3] font-extrabold text-white">
                  WHAT TWO DECADES BUY YOU
                </h2>
              </div>
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[#F31C60] text-white">
                <Compass size={22} weight="fill" aria-hidden="true" />
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {HERO_VALUE_STACK.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 py-[15px] first:pt-1 last:pb-1"
                >
                  <span
                    className={
                      row.highlight
                        ? 'text-[14.5px] font-semibold text-white'
                        : 'text-[14px] text-white/75'
                    }
                  >
                    {row.label}
                  </span>
                  <span
                    className={`font-display shrink-0 tabular-nums ${
                      row.highlight
                        ? 'text-[30px] leading-none font-black tracking-[-0.8px] text-[#F31C60]'
                        : 'text-[22px] leading-none font-extrabold tracking-[-0.4px] text-white max-[680px]:text-[19px]'
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[12px] border border-[#F31C60]/35 bg-[#F31C60]/12 px-4 py-3.5 text-[13.5px] leading-[1.55] text-white/85">
              <strong className="font-semibold text-white">Walk our factory first:</strong> Inspect
              live joinery, Burma teak seasoning, and dust-free PU booths in Ambattur before signing
              a single build contract.
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Hot-Pink Marquee Ticker */}
      <div
        className="w-full overflow-hidden bg-[#F31C60] text-white"
        aria-label="Kalaigar Interiors Highlights"
      >
        <div className="marquee-track">
          {[0, 1].map((dupIndex) => (
            <div key={dupIndex} className="flex shrink-0 items-center" aria-hidden={dupIndex === 1}>
              {MARQUEE_ITEMS.map((phrase, idx) => (
                <div
                  key={`${dupIndex}-${idx}`}
                  className="flex items-center px-[22px] py-[14px] text-[14px] font-semibold whitespace-nowrap text-white"
                >
                  <span>{phrase}</span>
                  <span className="ml-[22px] text-white/60" aria-hidden="true">
                    ◆
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
