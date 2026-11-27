import type { CSSProperties } from 'react';
import { ChatCircleText, Compass, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';
import { CONTACT_INFO, HERO_SUMMARY_ROWS, MARQUEE_ITEMS } from '../data/content';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export function Hero({ onOpenEnquiry }: HeroProps) {
  return (
    <section id="top" className="w-full bg-[#0A0A0A] text-white">
      <div className="container-main pt-[80px] pb-[76px] max-[680px]:pt-[52px] max-[680px]:pb-[56px]">
        <div className="grid-hero">
          {/* Left Column */}
          <div>
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

          {/* Right Column: Ink 2 Summary Card */}
          <div
            className="hero-enter-rise rounded-[18px] border border-white/10 bg-[#141414] p-[28px] max-[680px]:p-[22px]"
            style={
              {
                animationDelay: '450ms',
                animationDuration: '700ms',
                '--hero-rise': '16px',
              } as CSSProperties
            }
          >
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F31C60] uppercase">
                  MN INTERIORS · CHENNAI
                </p>
                <h2 className="font-display mt-1 text-[19px] leading-[1.3] font-extrabold text-white">
                  WHY HOMEOWNERS CHOOSE US
                </h2>
              </div>
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[#F31C60] text-white">
                <Compass size={22} weight="fill" aria-hidden="true" />
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {HERO_SUMMARY_ROWS.map((row) => (
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
                  {row.href ? (
                    <a
                      href={row.href}
                      className="font-display shrink-0 text-[20px] leading-none font-extrabold tracking-[-0.4px] text-white tabular-nums hover:text-[#F31C60] max-[680px]:text-[18px]"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span
                      className={`font-display shrink-0 tabular-nums ${
                        row.highlight
                          ? 'text-[30px] leading-none font-black tracking-[-0.8px] text-[#F31C60]'
                          : 'text-[20px] leading-none font-extrabold tracking-[-0.4px] text-white max-[680px]:text-[18px]'
                      }`}
                    >
                      {row.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[12px] border border-[#F31C60]/35 bg-[#F31C60]/12 px-4 py-3.5 text-[13.5px] leading-[1.55] text-white/85">
              <strong className="font-semibold text-white">Visit our Kundrathur workshop:</strong>{' '}
              No. 16, Ganapathy Nagar 1st Street, Sriperumbudur Main Road, Kundrathur, Kavanur,
              Chennai 600089 ({CONTACT_INFO.hours}).
            </div>
          </div>
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
