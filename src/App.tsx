import { useState } from 'react';
import {
  Armchair,
  BuildingOffice,
  CalendarCheck,
  Check,
  CookingPot,
  Door,
  Factory,
  Hammer,
  Lamp,
  MapPin,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkle,
  Star,
  X,
} from '@phosphor-icons/react';
import { BookingModal, type BookingMode } from './components/BookingModal';
import { CountUp } from './components/CountUp';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProcessStepper } from './components/ProcessStepper';
import { StickyBottomBar } from './components/StickyBottomBar';
import {
  AUDIT_CHECKLIST,
  AUDIT_VALUE_ROWS,
  CHENNAI_BENCHMARKS,
  COMPARISON_AFTER,
  COMPARISON_BEFORE,
  CRAFT_PILLARS,
  FAQS,
  PROBLEM_POINTS,
  SIGNATURE_ROOMS,
  SOLUTION_POINTS,
  STATS_BAND,
  TESTIMONIALS,
  type CraftPillar,
  type RoomScope,
} from './data/content';

function PillarIcon({ icon }: { icon: CraftPillar['icon'] }) {
  switch (icon) {
    case 'hammer':
      return <Hammer size={22} weight="fill" aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck size={22} weight="fill" aria-hidden="true" />;
    case 'sparkle':
      return <Sparkle size={22} weight="fill" aria-hidden="true" />;
    case 'factory':
      return <Factory size={22} weight="fill" aria-hidden="true" />;
    case 'lamp':
      return <Lamp size={22} weight="fill" aria-hidden="true" />;
    case 'ruler':
      return <Ruler size={22} weight="fill" aria-hidden="true" />;
  }
}

function RoomIcon({ icon }: { icon: RoomScope['icon'] }) {
  switch (icon) {
    case 'cooking':
      return <CookingPot size={22} weight="fill" aria-hidden="true" />;
    case 'door':
      return <Door size={22} weight="fill" aria-hidden="true" />;
    case 'temple':
      return <BuildingOffice size={22} weight="fill" aria-hidden="true" />;
    case 'armchair':
      return <Armchair size={22} weight="fill" aria-hidden="true" />;
  }
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<BookingMode>('audit');
  useScrollReveal();

  const openBooking = (mode: BookingMode = 'audit') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#0A0A0A]">
      <Navbar onOpenBooking={openBooking} />

      <main>
        {/* BAND 1: DARK HERO + PINK MARQUEE TICKER */}
        <Hero onOpenBooking={openBooking} />

        {/* BAND 2: WHITE 4-UP STATS STRIP */}
        <section className="w-full border-b border-[#E6E6E6] bg-white">
          <div className="container-main">
            <div className="stats-grid reveal-grid">
              {STATS_BAND.map((stat) => (
                <div
                  key={stat.caption}
                  className="stats-cell px-6 py-10 text-center max-[680px]:px-4 max-[680px]:py-7"
                >
                  <CountUp
                    value={stat.value}
                    className={`font-display text-[44px] leading-[1.15] font-black tracking-[-1px] tabular-nums max-[680px]:text-[34px] ${
                      stat.accent ? 'text-[#F31C60]' : 'text-[#0A0A0A]'
                    }`}
                  />
                  <p className="mx-auto mt-2 max-w-[210px] text-[13.5px] leading-[1.45] text-[#666666]">
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BAND 3: DARK PROBLEM VS SOLUTION + PULL-QUOTE */}
        <section className="band-section w-full bg-[#0A0A0A] text-white">
          <div className="container-main">
            <div className="mx-auto max-w-[760px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
                THE CHENNAI REALITY CHECK
              </p>
              <h2 className="section-h2 text-white">
                WHY MOST INTERIORS
                <br />
                FAIL IN <em>THREE MONSOONS</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
                Showroom renders look identical on day one. Three coastal summers later, the
                difference between outsourced MDF and true Chennai craftsmanship shows up in every
                hinge, edge, and shutter.
              </p>
            </div>

            <div className="grid-split mt-12 reveal-grid">
              {/* Left: Problem List with Cross Badges */}
              <div className="space-y-3">
                <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
                  WHAT GOES WRONG WITH TYPICAL VENDORS
                </p>
                {PROBLEM_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3.5 rounded-[12px] border border-white/10 bg-[#141414] px-5 py-[18px]"
                  >
                    <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60]/15 text-[#F31C60]">
                      <X size={14} weight="bold" aria-hidden="true" />
                    </span>
                    <p className="text-[15px] leading-[1.6] text-white/80">{point}</p>
                  </div>
                ))}
              </div>

              {/* Right: Founder Pull-Quote + Solution List with Tick Badges */}
              <div className="space-y-6">
                <blockquote className="rounded-r-[12px] border-l-[3px] border-[#F31C60] bg-[#141414] px-6 py-6">
                  <p className="text-[17px] leading-[1.65] italic text-white/85">
                    &ldquo;A Chennai home battles salt air, 42°C summers, and heavy monsoon
                    humidity. You cannot build that home with catalog particle board and rotating
                    freelance labour. You build it with seasoned timber, marine core, and craftsmen
                    who sign their own work.&rdquo;
                  </p>
                  <footer className="mt-4 text-[13px] font-semibold text-white/60">
                    — S. SUNDARARAJAN, FOUNDER &amp; CHIEF MASTER CRAFTSMAN (EST. 2004)
                  </footer>
                </blockquote>

                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F31C60] uppercase">
                    THE KALAIGAR 22-YEAR STANDARD
                  </p>
                  {SOLUTION_POINTS.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3.5 rounded-[12px] border border-white/10 bg-[#141414] px-5 py-[16px]"
                    >
                      <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60] text-white">
                        <Check size={14} weight="bold" aria-hidden="true" />
                      </span>
                      <p className="text-[15px] leading-[1.6] text-white/85">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 4: WHITE CRAFTSMANSHIP PILLARS (3-UP GRID, ONE HOT CARD PER GROUP OF 3) */}
        <section id="craftsmanship" className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                THE CRAFTSMANSHIP DIFFERENCE
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                WHAT 22 YEARS OF
                <br />
                <em>OBSESSION LOOKS LIKE</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                Six non-negotiable engineering and joinery standards built into every kitchen,
                wardrobe, pooja sanctuary, and living space we sign our name to.
              </p>
            </div>

            <div className="grid-3 mt-12 reveal-grid">
              {CRAFT_PILLARS.map((pillar) => {
                const isHot = Boolean(pillar.hot);
                return (
                  <article
                    key={pillar.id}
                    className={`flex flex-col justify-between rounded-[16px] p-[26px] ${
                      isHot
                        ? 'bg-[#F31C60] text-white'
                        : 'border border-[#E6E6E6] bg-white text-[#0A0A0A]'
                    }`}
                  >
                    <div>
                      <div
                        className={`flex h-[46px] w-[46px] items-center justify-center rounded-[12px] ${
                          isHot ? 'bg-white text-[#F31C60]' : 'bg-[#F31C60] text-white'
                        }`}
                      >
                        <PillarIcon icon={pillar.icon} />
                      </div>

                      <h3
                        className={`font-display mt-5 text-[19px] leading-[1.3] font-extrabold ${
                          isHot ? 'text-white' : 'text-[#0A0A0A]'
                        }`}
                      >
                        {pillar.title}
                      </h3>

                      <p
                        className={`mt-3 text-[14.5px] leading-[1.62] ${
                          isHot ? 'text-white/90' : 'text-[#666666]'
                        }`}
                      >
                        {pillar.body}
                      </p>
                    </div>

                    <p
                      className={`mt-6 border-t pt-4 text-[12.5px] font-bold tracking-[0.06em] uppercase ${
                        isHot ? 'border-white/25 text-white' : 'border-[#E6E6E6] text-[#D4104C]'
                      }`}
                    >
                      {pillar.footnote}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 5: DARK INTERACTIVE 6-STAGE TABBED STEPPER */}
        <ProcessStepper />

        {/* BAND 6: DARK COMPARISON PAIR (WHITE BEFORE VS INK 2 2PX PINK WINNER) */}
        <section className="band-section w-full border-t border-white/10 bg-[#0A0A0A] text-white">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
                WHICH ONE ARE YOU HIRING?
              </p>
              <h2 className="section-h2 text-white">
                THIS IS NOT AN
                <br />
                <em>APP AGGREGATOR</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
                Compare how a 22-year Chennai master joinery studio operates against brokered
                interior apps and local site contractors.
              </p>
            </div>

            <div className="grid-2 mt-12 reveal-grid">
              {/* Left: Before Card (White with Mist Gray Tag) */}
              <div className="rounded-[16px] border border-[#E6E6E6] bg-white p-[34px] text-[#0A0A0A] max-[680px]:p-[24px]">
                <span className="inline-block rounded-[6px] bg-[#F4F4F4] px-[10px] py-[6px] text-[11px] font-bold tracking-[0.16em] text-[#666666] uppercase">
                  TYPICAL CONTRACTORS &amp; APPS
                </span>
                <h3 className="font-display mt-4 text-[30px] leading-[1.1] font-black tracking-[-0.5px] text-[#0A0A0A] max-[680px]:text-[24px]">
                  OUTSOURCED &amp; SHORT-LIVED
                </h3>
                <ul className="mt-6 space-y-4">
                  {COMPARISON_BEFORE.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60]/15 text-[#D4104C]">
                        <X size={13} weight="bold" aria-hidden="true" />
                      </span>
                      <span className="text-[15px] leading-[1.6] text-[#666666]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Winner Card (Ink 2 with 2px Pink Border & Solid Pink Tag) */}
              <div className="rounded-[16px] border-2 border-[#F31C60] bg-[#141414] p-[34px] text-white max-[680px]:p-[24px]">
                <span className="inline-block rounded-[6px] bg-[#F31C60] px-[10px] py-[6px] text-[11px] font-bold tracking-[0.16em] text-white uppercase">
                  KALAIGAR SINCE 2004
                </span>
                <h3 className="font-display mt-4 text-[30px] leading-[1.1] font-black tracking-[-0.5px] text-white max-[680px]:text-[24px]">
                  IN-HOUSE MASTER CRAFTSMANSHIP
                </h3>
                <ul className="mt-6 space-y-4">
                  {COMPARISON_AFTER.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60] text-white">
                        <Check size={13} weight="bold" aria-hidden="true" />
                      </span>
                      <span className="text-[15px] leading-[1.6] text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 7: WHITE SIGNATURE ROOMS 4-UP GRID */}
        <section className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                WHAT WE CRAFT IN-HOUSE
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                EVERY ROOM BUILT
                <br />
                <em>TO A SINGLE STANDARD</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                Whether you are commissioning a sea-facing Adyar penthouse or a multi-generational
                Anna Nagar bungalow, every piece leaves our Ambattur floor ready to last decades.
              </p>
            </div>

            <div className="grid-4 mt-12 reveal-grid">
              {SIGNATURE_ROOMS.map((room) => {
                const isHot = Boolean(room.hot);
                return (
                  <article
                    key={room.title}
                    className="flex flex-col overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-white"
                  >
                    {/* Hot card flips to solid pink header */}
                    <div
                      className={`p-[22px] ${
                        isHot
                          ? 'bg-[#F31C60] text-white'
                          : 'border-b border-[#E6E6E6] bg-white text-[#0A0A0A]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`flex h-[46px] w-[46px] items-center justify-center rounded-[12px] ${
                            isHot ? 'bg-white text-[#F31C60]' : 'bg-[#F31C60] text-white'
                          }`}
                        >
                          <RoomIcon icon={room.icon} />
                        </div>
                        <span
                          className={`rounded-[6px] px-2.5 py-1 text-[10.5px] font-bold tracking-[0.14em] uppercase ${
                            isHot ? 'bg-black/20 text-white' : 'bg-[#F4F4F4] text-[#666666]'
                          }`}
                        >
                          {room.tag}
                        </span>
                      </div>
                      <h3 className="font-display mt-4 text-[18px] leading-[1.3] font-extrabold">
                        {room.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-[22px]">
                      <p className="text-[14.5px] leading-[1.6] text-[#666666]">{room.body}</p>
                      <p className="mt-5 border-t border-[#E6E6E6] pt-4 text-[12px] font-bold tracking-[0.06em] text-[#D4104C] uppercase">
                        {room.spec}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 8: MIST GRAY CHENNAI NEIGHBOURHOOD PROOF BENCHMARKS */}
        <section className="band-section w-full bg-[#F4F4F4] text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                BUILT ACROSS CHENNAI
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                REAL HOMES.
                <br />
                <em>MEASURED CRAFTSMANSHIP.</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                No vague promises—look at the exact timelines, materials, and handover records from
                recent turnkey residences we completed across Chennai.
              </p>
            </div>

            <div className="grid-3 mt-12 reveal-grid">
              {CHENNAI_BENCHMARKS.map((project) => {
                const isHot = Boolean(project.hot);
                return (
                  <article
                    key={project.title}
                    className={`flex flex-col justify-between rounded-[16px] p-[28px] ${
                      isHot
                        ? 'bg-[#F31C60] text-white'
                        : 'border border-[#E6E6E6] bg-white text-[#0A0A0A]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase">
                        <MapPin
                          size={14}
                          weight="fill"
                          className={isHot ? 'text-white' : 'text-[#D4104C]'}
                          aria-hidden="true"
                        />
                        <span className={isHot ? 'text-white/90' : 'text-[#D4104C]'}>
                          {project.location}
                        </span>
                      </div>

                      <h3 className="font-display mt-3 text-[21px] leading-[1.2] font-black tracking-[-0.3px]">
                        {project.title}
                      </h3>

                      <p
                        className={`mt-2 text-[12px] font-semibold tracking-[0.12em] uppercase tabular-nums ${
                          isHot ? 'text-white/80' : 'text-[#666666]'
                        }`}
                      >
                        {project.meta}
                      </p>

                      <p
                        className={`mt-4 text-[14.5px] leading-[1.65] ${
                          isHot ? 'text-white/90' : 'text-[#666666]'
                        }`}
                      >
                        {project.summary}
                      </p>
                    </div>

                    <div
                      className={`mt-6 rounded-[10px] px-4 py-3 text-[12.5px] font-bold tracking-[0.06em] uppercase ${
                        isHot
                          ? 'bg-black/20 text-white'
                          : 'border border-[#E6E6E6] bg-[#F4F4F4] text-[#0A0A0A]'
                      }`}
                    >
                      {project.result}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 9: DARK FIVE-STAR TESTIMONIALS (FIRST CARD SOLID PINK) */}
        <section className="band-section w-full bg-[#0A0A0A] text-white">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
                WORD OF MOUTH FOR 22 YEARS
              </p>
              <h2 className="section-h2 text-white">
                WHY 74% OF OUR
                <br />
                <em>CLIENTS ARE REFERRALS</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
                When families live inside our joinery for ten years and then call us back for their
                children&apos;s homes, that is the only award that matters.
              </p>
            </div>

            <div className="grid-3 mt-12 reveal-grid">
              {TESTIMONIALS.map((t) => {
                const isHot = Boolean(t.hot);
                return (
                  <article
                    key={t.name}
                    className={`flex flex-col justify-between rounded-[16px] p-[28px] ${
                      isHot
                        ? 'bg-[#F31C60] text-white'
                        : 'border border-white/10 bg-[#141414] text-white'
                    }`}
                  >
                    <div>
                      <div
                        className={`flex items-center gap-1 ${
                          isHot ? 'text-white' : 'text-[#F31C60]'
                        }`}
                        aria-label="5 out of 5 stars"
                      >
                        {[0, 1, 2, 3, 4].map((starIdx) => (
                          <Star key={starIdx} size={17} weight="fill" aria-hidden="true" />
                        ))}
                      </div>

                      <p
                        className={`mt-5 text-[15px] leading-[1.7] ${
                          isHot ? 'text-white/95' : 'text-white/80'
                        }`}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div
                      className={`mt-6 border-t pt-4 ${
                        isHot ? 'border-white/25' : 'border-white/10'
                      }`}
                    >
                      <p className="font-display text-[15px] font-extrabold text-white">{t.name}</p>
                      <p
                        className={`mt-0.5 text-[13px] ${
                          isHot ? 'text-white/85' : 'text-white/60'
                        }`}
                      >
                        {t.role}
                      </p>
                      <p
                        className={`mt-1 text-[12px] font-semibold tracking-[0.06em] uppercase tabular-nums ${
                          isHot ? 'text-white/90' : 'text-[#F31C60]'
                        }`}
                      >
                        {t.locality} · {t.projectYear}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 10: WHITE VALUE-STACK TABLE + DARK PRICE CARD */}
        <section id="pricing" className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                START WITH TOTAL CLARITY
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                ONE SITE AUDIT.
                <br />
                <em>ZERO GUESSWORK.</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                Before you commit a single lakh to construction, our senior designer and head
                carpenter build your full spatial plan, material box, and locked BOQ in 10 working
                days.
              </p>
            </div>

            <div className="grid-price mt-12">
              {/* Left: Hairline Value-Stack Table */}
              <div className="rounded-[18px] border border-[#E6E6E6] bg-white p-[28px] max-[680px]:p-[20px]">
                <p className="mb-4 text-[11px] font-bold tracking-[0.18em] text-[#D4104C] uppercase">
                  EVERYTHING INSIDE YOUR BLUEPRINT PACKAGE
                </p>

                <div className="divide-y divide-[#E6E6E6]">
                  {AUDIT_VALUE_ROWS.map((row) => (
                    <div
                      key={row.item}
                      className="flex items-start justify-between gap-4 py-[18px] max-[680px]:flex-col max-[680px]:gap-1.5"
                    >
                      <div>
                        <p className="text-[15.5px] leading-[1.4] font-semibold text-[#0A0A0A]">
                          {row.item}
                        </p>
                        <p className="mt-1 text-[13.5px] leading-[1.5] text-[#666666]">
                          {row.detail}
                        </p>
                      </div>
                      <span className="font-display shrink-0 text-[20px] font-extrabold text-[#0A0A0A] tabular-nums">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Row */}
                <div className="mt-2 flex items-center justify-between gap-4 border-t-2 border-[#0A0A0A] pt-5">
                  <span className="font-display text-[19px] font-extrabold text-[#0A0A0A]">
                    TOTAL DELIVERABLE VALUE
                  </span>
                  <span className="font-display text-[24px] font-black text-[#D4104C] tabular-nums">
                    ₹45,000
                  </span>
                </div>
              </div>

              {/* Right: Dark Price Card (20px radius, 34px padding, 72px pink price) */}
              <div className="rounded-[20px] bg-[#0A0A0A] p-[34px] text-white max-[680px]:p-[24px]">
                <span className="inline-block rounded-[6px] bg-[#F31C60]/15 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[#F31C60] uppercase">
                  100% ADJUSTED IN EXECUTION
                </span>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-[22px] font-extrabold text-white/50 line-through tabular-nums">
                    ₹45,000
                  </span>
                  <span className="text-[13px] font-semibold text-white/60">
                    Standard Design Audit Fee
                  </span>
                </div>

                <p className="font-display mt-2 text-[72px] leading-none font-black tracking-[-2px] text-[#F31C60] tabular-nums max-[680px]:text-[60px]">
                  ₹4,999
                </p>

                <p className="mt-3 text-[14px] leading-[1.55] text-white/65">
                  One-time Chennai on-site audit fee · Fully deducted from your first execution
                  milestone if you build with Kalaigar.
                </p>

                <ul className="mt-6 space-y-3.5 border-t border-white/10 pt-6">
                  {AUDIT_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] bg-[#F31C60] text-white">
                        <Check size={12} weight="bold" aria-hidden="true" />
                      </span>
                      <span className="text-[14.5px] leading-[1.5] text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openBooking('audit')}
                  className="btn-pink btn-lg mt-7 w-full"
                >
                  <CalendarCheck size={18} weight="fill" aria-hidden="true" />
                  <span>Book Site Audit — ₹4,999</span>
                </button>

                <button
                  type="button"
                  onClick={() => openBooking('visit')}
                  className="btn-ghost btn-md mt-3 w-full"
                >
                  <span>Or Schedule a Free Workshop Visit</span>
                </button>

                <p className="mt-4 text-center text-[12.5px] leading-[1.5] text-white/50">
                  Only 4 turnkey build slots accepted per month to protect our craft quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 11: MIST GRAY 20-YEAR OWNERSHIP MATH & GUARANTEE (NARROW 900PX) */}
        <section className="band-section w-full bg-[#F4F4F4] text-[#0A0A0A]">
          <div className="container-narrow">
            <div className="text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                THE 20-YEAR OWNERSHIP MATH
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                CHEAP INTERIORS
                <br />
                <em>COST YOU TWICE</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                Replacing swollen particle-board kitchens and peeling wardrobes after Year 5 costs
                more than building with marine ply and solid teak on Day 1.
              </p>
            </div>

            <div className="mt-12 rounded-[16px] border border-[#E6E6E6] bg-white p-[32px] max-[680px]:p-[22px]">
              <div className="grid-3">
                <div className="border-r border-[#E6E6E6] pr-4 max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:pr-0 max-[1000px]:pb-5">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#666666] uppercase">
                    CHEAP MDF BUILD (15 YRS)
                  </p>
                  <p className="font-display mt-2 text-[34px] leading-none font-black tracking-[-1px] text-[#0A0A0A] tabular-nums">
                    ₹34L+
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.55] text-[#666666]">
                    ₹14L initial build + ₹18L full tear-out &amp; rebuild at Year 6 + temporary stay
                    disruption.
                  </p>
                </div>

                <div className="border-r border-[#E6E6E6] pr-4 max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:pr-0 max-[1000px]:pb-5">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#D4104C] uppercase">
                    KALAIGAR BWP + TEAK (15 YRS)
                  </p>
                  <p className="font-display mt-2 text-[34px] leading-none font-black tracking-[-1px] text-[#F31C60] tabular-nums">
                    ₹21L
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.55] text-[#666666]">
                    Built once in Ambattur with IS:710 Gurjan core, Blum runners, and a written
                    15-year structural warranty.
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#0A0A0A] uppercase">
                    YOUR CONTRACTUAL SHIELD
                  </p>
                  <p className="font-display mt-2 text-[34px] leading-none font-black tracking-[-1px] text-[#0A0A0A] tabular-nums">
                    100%
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.55] text-[#666666]">
                    Fixed handover penalty clause + zero hidden BOQ escalations + complimentary
                    6-month hinge tune-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 12: WHITE FAQ ACCORDION (NATIVE <details>, NARROW 900PX) */}
        <section id="faq" className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-narrow">
            <div className="text-center reveal-stack">
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                STRAIGHT ANSWERS
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                QUESTIONS CHENNAI
                <br />
                <em>HOMEOWNERS ASK</em>
              </h2>
            </div>

            <div className="mt-12 divide-y divide-[#E6E6E6] border-y border-[#E6E6E6]">
              {FAQS.map((faq, idx) => (
                <details key={faq.question} className="faq-item group" open={idx === 0}>
                  <summary className="flex items-center justify-between gap-4 py-[22px] text-[17px] leading-[1.45] font-semibold text-[#0A0A0A]">
                    <span>{faq.question}</span>
                    <span
                      className="faq-disc flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#F4F4F4] text-[#0A0A0A]"
                      aria-hidden="true"
                    >
                      <Plus size={16} weight="bold" />
                    </span>
                  </summary>
                  <div className="pb-[24px] pr-10 text-[16px] leading-[1.7] text-[#666666] max-[680px]:pr-0">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BAND 13: DARK FINAL CTA (120PX PADDING, NARROW 900PX, .XL HEADLINE) */}
        <section className="band-final w-full bg-[#0A0A0A] text-white">
          <div className="container-narrow text-center reveal-stack">
            <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
              LIMITED TO 4 CHENNAI HOMES PER MONTH
            </p>
            <h2 className="section-h2-xl text-white">
              BUILD YOUR HOME ONCE.
              <br />
              BUILD IT <em>FOR TWENTY YEARS.</em>
            </h2>
            <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
              Reserve your on-site laser audit, physical craftsmanship material box, and locked
              turnkey BOQ with Chennai&apos;s 22-year master joinery studio.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center">
              <span className="font-display text-[20px] font-extrabold text-white/50 line-through tabular-nums">
                ₹45,000
              </span>
              <p className="font-display mt-1 text-[64px] leading-none font-black tracking-[-2px] text-[#F31C60] tabular-nums max-[680px]:text-[56px]">
                ₹4,999
              </p>
              <p className="mt-2.5 text-[13.5px] text-white/55">
                100% credited toward your turnkey execution invoice
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch">
              <button
                type="button"
                onClick={() => openBooking('audit')}
                className="btn-pink btn-lg max-[680px]:w-full"
              >
                <CalendarCheck size={18} weight="fill" aria-hidden="true" />
                <span>Book Site Audit — ₹4,999</span>
              </button>
              <button
                type="button"
                onClick={() => openBooking('visit')}
                className="btn-ghost btn-lg max-[680px]:w-full"
              >
                <Factory size={18} weight="fill" aria-hidden="true" />
                <span>Tour Ambattur Factory Free</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* BAND 14: DARK FOOTER */}
      <footer className="w-full border-t border-white/10 bg-[#0A0A0A] py-14 text-white">
        <div className="container-main">
          <div className="flex flex-wrap items-start justify-between gap-8 border-b border-white/10 pb-10">
            <div className="max-w-[440px]">
              <a
                href="#top"
                className="font-display inline-block text-[18px] font-black tracking-[-0.3px] text-white"
              >
                <span className="text-[#F31C60]">K</span>ALAIGAR INTERIORS
              </a>
              <p className="mt-3 text-[13.5px] leading-[1.65] text-white/60">
                <strong className="text-white/85">Alwarpet Studio:</strong> No. 42, TTK Road,
                Alwarpet, Chennai 600018
                <br />
                <strong className="text-white/85">Joinery Factory:</strong> Plot 19B, Ambattur
                Industrial Estate, Chennai 600058
              </p>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
              <a
                href="#craftsmanship"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Craftsmanship
              </a>
              <a
                href="#craft-process"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                6-Stage Process
              </a>
              <a
                href="#pricing"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Site Audit
              </a>
              <a
                href="#faq"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                FAQ
              </a>
              <button
                type="button"
                onClick={() => openBooking('visit')}
                className="cursor-pointer text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Visit Factory
              </button>
            </nav>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/40">
            <p>© 2026 Kalaigar Interiors Pvt. Ltd., Chennai. Crafting Homes Since 2004.</p>
            <p className="tabular-nums">Mon–Sat, 10:00 AM – 7:00 PM IST · Chennai, Tamil Nadu</p>
          </div>
        </div>
      </footer>

      {/* FIXED 68PX STICKY BOTTOM CTA BAR */}
      <StickyBottomBar onOpenBooking={openBooking} />

      {/* INTERACTIVE BOOKING MODAL */}
      <BookingModal
        isOpen={modalOpen}
        initialMode={modalMode}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
