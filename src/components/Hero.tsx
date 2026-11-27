import { ArrowRight, ChatCircleText, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';
import { CONTACT_INFO, MARQUEE_ITEMS, PROJECTS } from '../data/content';
import { ProjectPhoto } from './ProjectPhoto';

interface HeroProps {
  onOpenEnquiry: () => void;
  onOpenProject: (id: string) => void;
}

/** The hero shows the lead project from the showcase */
const heroProject = PROJECTS[0];

export function Hero({ onOpenEnquiry, onOpenProject }: HeroProps) {
  return (
    <section id="top" className="w-full bg-[#0A0A0A] text-white">
      <div className="container-main pt-[80px] pb-[76px] max-[680px]:pt-[52px] max-[680px]:pb-[56px]">
        <div className="grid-hero hero-grid">
          {/* Left Column (on phones its children flow around the photo — see .hero-left in index.css) */}
          <div className="hero-left">
            {/* Outlined status pill */}
            <div className="hero-enter-fade mb-6 inline-flex items-center gap-2.5 rounded-[99px] border border-white/18 px-4 py-2 text-[13px] font-medium text-white/85">
              <span className="live-dot" aria-hidden="true" />
              <span>KUNDRATHUR, CHENNAI · 4.9 ★ GOOGLE RATED (71 REVIEWS)</span>
            </div>

            {/* Statement entrance: each line rises from behind a mask (CSS only, plays once) */}
            <h1 className="hero-h1 text-white">
              <span className="hero-line">
                <span className="hero-line-inner" style={{ animationDelay: '0ms' }}>
                  20+ YEARS OF
                </span>
              </span>{' '}
              <span className="hero-line">
                <span className="hero-line-inner" style={{ animationDelay: '80ms' }}>
                  CHENNAI INTERIORS.
                </span>
              </span>{' '}
              <span className="hero-line">
                <em className="hero-line-inner" style={{ animationDelay: '170ms' }}>
                  CRAFTED TO LAST
                </em>
              </span>{' '}
              <span className="hero-line">
                <em className="hero-line-inner" style={{ animationDelay: '260ms' }}>
                  EVERY DAY.
                </em>
              </span>
            </h1>

            <p
              className="hero-enter-rise mt-6 max-w-[560px] text-[18px] leading-[1.65] font-normal text-white/65 max-[680px]:text-[16px]"
              style={{ animationDelay: '350ms' }}
            >
              From our own workshop in Kundrathur, Kavanur, MN Interiors has been designing and
              building kitchens, wardrobes, pooja rooms, full homes, and shops across Chennai for
              over 20 years—known for neat finishing, honest pricing, and woodwork that truly lasts.
            </p>

            {/* Primary & Ghost CTA buttons */}
            <div
              className="hero-enter-rise mt-8 flex flex-wrap items-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch"
              style={{ animationDelay: '420ms' }}
            >
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="btn-pink btn-lg max-[680px]:w-full"
              >
                <ChatCircleText size={17} weight="fill" aria-hidden="true" />
                <span>Get a Free Quote</span>
              </button>

              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-lg max-[680px]:w-full"
              >
                <WhatsappLogo size={19} weight="fill" aria-hidden="true" />
                <span>WhatsApp {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>

            <p
              className="hero-enter-rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-[1.5] text-white/50"
              style={{ animationDelay: '480ms' }}
            >
              <span>Free site visit across Chennai</span>
              <span aria-hidden="true">·</span>
              <span>10-Year Warranty</span>
              <span aria-hidden="true">·</span>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold text-white/80 hover:text-white tabular-nums"
              >
                <PhoneCall size={14} weight="fill" className="text-[#F31C60]" aria-hidden="true" />
                <span>Call {CONTACT_INFO.phoneLocal}</span>
              </a>
            </p>
          </div>

          {/* Right Column: lead project photo — the work is the first thing you see */}
          <figure className="hero-photo relative aspect-[4/5] overflow-hidden rounded-[18px] border border-white/10 bg-[#141414] max-[1000px]:aspect-[4/3]">
            <ProjectPhoto
              image={heroProject.cover}
              sizes="(max-width: 1000px) 100vw, 520px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute inset-x-4 bottom-4">
              <button
                type="button"
                onClick={() => onOpenProject(heroProject.id)}
                className="hero-photo-chip"
              >
                <span className="flex min-w-0 flex-col text-left">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                    {heroProject.category} · {heroProject.area}
                  </span>
                  <span className="truncate text-[14px] font-bold text-white">{heroProject.title}</span>
                </span>
                <span className="hero-photo-chip-arrow" aria-hidden="true">
                  <ArrowRight size={16} weight="bold" />
                </span>
              </button>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Full-width Hot-Pink Marquee Ticker */}
      <div
        className="w-full overflow-hidden bg-[#F31C60] text-white"
        aria-label="MN Interiors Highlights"
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
