import { useState } from 'react';
import { ChatCircleText, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';
import { CONTACT_INFO, MARQUEE_ITEMS } from '../data/content';

interface HeroProps {
  onOpenEnquiry: () => void;
}

const HERO_BG_IMAGE = '/src/assets/images/hero_chennai_home_1795844117606.jpg';

export function Hero({ onOpenEnquiry }: HeroProps) {
  const [bgFailed, setBgFailed] = useState(false);

  return (
    <section id="top" className="w-full bg-[var(--ink)] text-[var(--white)]">
      {/* Full-bleed dark editorial hero with completed Chennai home interior backdrop */}
      <div className="relative flex min-h-[660px] w-full items-center overflow-hidden bg-[var(--ink)] max-[1000px]:min-h-[580px] max-[680px]:min-h-0">
        {/* Background Interior Photography + Resilient Fallback */}
        {!bgFailed ? (
          <img
            src={HERO_BG_IMAGE}
            alt="Completed contemporary Chennai home living and dining interior crafted by MN Interiors with custom fluted walnut wall paneling and warm cove lighting"
            referrerPolicy="no-referrer"
            onError={() => setBgFailed(true)}
            className="hero-bg-drift pointer-events-none absolute inset-0 h-full w-full object-cover object-right select-none max-[680px]:object-center"
          />
        ) : (
          <div
            aria-hidden="true"
            className="hero-fallback-bg pointer-events-none absolute inset-0"
          />
        )}

        {/* Measured directional dark scrim: AAA text contrast on left, luminous room reveal on right */}
        <div
          aria-hidden="true"
          className="hero-scrim-side pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="hero-scrim-edge pointer-events-none absolute inset-0"
        />

        {/* Foreground Content */}
        <div className="container-main relative z-10 py-[96px] max-[1000px]:py-[76px] max-[680px]:py-[56px]">
          <div className="max-w-[680px]">
            {/* Quiet editorial eyebrow with 20+ years and Google rating */}
            <p className="eyebrow-label hero-enter-fade mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[var(--tint)]">
              <span>20+ years in Chennai</span>
              <span aria-hidden="true" className="text-[var(--white)]/40">
                ·
              </span>
              <span>4.9 ★ Google rated (71 reviews)</span>
            </p>

            {/* Statement entrance: calm Cormorant Garamond serif + italic terracotta line */}
            <h1 className="hero-h1 text-[var(--white)]">
              <span className="hero-line">
                <span className="hero-line-inner" style={{ animationDelay: '0ms' }}>
                  Interior designers in
                </span>
              </span>{' '}
              <span className="hero-line">
                <span className="hero-line-inner" style={{ animationDelay: '85ms' }}>
                  Kundrathur, Chennai.
                </span>
              </span>{' '}
              <span className="hero-line">
                <em className="hero-line-inner" style={{ animationDelay: '175ms' }}>
                  Crafted to last.
                </em>
              </span>
            </h1>

            <p
              className="hero-enter-rise mt-6 max-w-[560px] text-[17px] leading-[1.68] font-normal text-[var(--white)]/85 max-[680px]:text-[15.5px]"
              style={{ animationDelay: '340ms' }}
            >
              From our own workshop in Kundrathur, Kavanur, MN Interiors has spent over 20 years
              designing and building kitchens, wardrobes, pooja rooms, full homes, and shops across
              Chennai—known for neat finishing, clear pricing, and woodwork that lasts.
            </p>

            {/* Primary & Ghost CTA buttons */}
            <div
              className="hero-enter-rise mt-8 flex flex-wrap items-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch"
              style={{ animationDelay: '410ms' }}
            >
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="btn-pink btn-lg max-[680px]:w-full"
              >
                <ChatCircleText size={18} weight="fill" aria-hidden="true" />
                <span>Get a free quote</span>
              </button>

              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-lg bg-[var(--ink-glass)] backdrop-blur-xs max-[680px]:w-full"
              >
                <WhatsappLogo
                  size={19}
                  weight="fill"
                  className="text-[var(--live)]"
                  aria-hidden="true"
                />
                <span>WhatsApp {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>

            <p
              className="hero-enter-rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] leading-[1.55] text-[var(--white)]/80"
              style={{ animationDelay: '470ms' }}
            >
              <span>Free site visit across Chennai</span>
              <span aria-hidden="true">·</span>
              <span>10-year warranty</span>
              <span aria-hidden="true">·</span>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--white)] underline decoration-[var(--pink)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--tint)] tabular-nums"
              >
                <PhoneCall
                  size={15}
                  weight="fill"
                  className="text-[var(--pink)]"
                  aria-hidden="true"
                />
                <span>Call {CONTACT_INFO.phoneLocal}</span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Warm-Ink Marquee Ticker with terracotta diamond separators (keeps terracotta restraint) */}
      <div
        className="w-full overflow-hidden border-y border-[var(--line-dark)] bg-[var(--ink-2)] text-[var(--white)]/90"
        aria-label="MN Interiors Highlights"
      >
        <div className="marquee-track">
          {[0, 1].map((dupIndex) => (
            <div key={dupIndex} className="flex shrink-0 items-center" aria-hidden={dupIndex === 1}>
              {MARQUEE_ITEMS.map((phrase, idx) => (
                <div
                  key={`${dupIndex}-${idx}`}
                  className="flex items-center px-[22px] py-[14px] text-[15px] font-medium whitespace-nowrap text-[var(--white)]/90"
                >
                  <span>{phrase}</span>
                  <span
                    className="ml-[22px] text-[11px] text-[var(--pink)]"
                    aria-hidden="true"
                  >
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
