import { useState } from 'react';
import {
  Armchair,
  BuildingOffice,
  ChatCircleText,
  Check,
  Clock,
  CookingPot,
  Door,
  Factory,
  Hammer,
  Lamp,
  MapPin,
  PhoneCall,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkle,
  Star,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { BookingModal } from './components/BookingModal';
import CountUp from './components/CountUp';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProcessStepper } from './components/ProcessStepper';
import { StickyBottomBar } from './components/StickyBottomBar';
import { WorkShowcase } from './components/WorkShowcase';
import {
  CHENNAI_BENCHMARKS,
  COMPARISON_AFTER,
  COMPARISON_BEFORE,
  CONTACT_INFO,
  CRAFT_PILLARS,
  ENQUIRY_CHECKLIST,
  ENQUIRY_STEPS,
  FAQS,
  PROBLEM_POINTS,
  SIGNATURE_ROOMS,
  SOLUTION_POINTS,
  STATS_BAND,
  TESTIMONIALS,
  type CraftPillar,
  type RoomScope,
} from './data/content';
import { useScrollReveal } from './lib/useScrollReveal';

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
  const [enquiryScope, setEnquiryScope] = useState('Full Home Interiors');
  const [enquiryNote, setEnquiryNote] = useState('');

  useScrollReveal();

  const openEnquiry = () => {
    setEnquiryScope('Full Home Interiors');
    setEnquiryNote('');
    setModalOpen(true);
  };

  const handleEnquireStyle = (scope: string, projectTitle: string) => {
    setEnquiryScope(scope);
    setEnquiryNote(
      projectTitle ? `Interested in a similar style to: ${projectTitle}` : '',
    );
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#0A0A0A]">
      <Navbar onOpenEnquiry={openEnquiry} />

      <main>
        {/* BAND 1: DARK HERO + PINK MARQUEE TICKER */}
        <Hero onOpenEnquiry={openEnquiry} />

        {/* BAND 2: WHITE 4-UP STATS STRIP */}
        <section className="w-full border-b border-[#E6E6E6] bg-white">
          <div className="container-main">
            <div className="stats-grid" data-reveal-group>
              {STATS_BAND.map((stat, i) => (
                <div
                  key={stat.caption}
                  className="stats-cell px-6 py-10 text-center max-[680px]:px-4 max-[680px]:py-7"
                >
                  <p
                    className={`font-display text-[44px] leading-[1.15] font-black tracking-[-1px] tabular-nums max-[680px]:text-[34px] ${
                      stat.accent ? 'text-[#F31C60]' : 'text-[#0A0A0A]'
                    }`}
                  >
                    {stat.count ? (
                      <CountUp {...stat.count} delay={i * 80} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mx-auto mt-2 max-w-[210px] text-[13.5px] leading-[1.45] text-[#666666]">
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW BAND: MIST GRAY FILTERABLE BENTO WORK SHOWCASE + LIGHTBOX */}
        <WorkShowcase onEnquireStyle={handleEnquireStyle} />

        {/* BAND 3: DARK PROBLEM VS SOLUTION + PULL-QUOTE */}
        <section className="band-section w-full bg-[#0A0A0A] text-white">
          <div className="container-main">
            <div className="mx-auto max-w-[760px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
                WHY EXPERIENCE MATTERS
              </p>
              <h2 className="section-h2 text-white">
                GOOD INTERIORS SHOULD NOT
                <br />
                WEAR OUT IN <em>THREE YEARS</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
                Everything looks shiny on handover day. The real test is how your kitchen drawers,
                wardrobe doors, and finishes hold up after years of everyday family use in Chennai.
              </p>
            </div>

            <div className="grid-split mt-12" data-reveal-group>
              {/* Left: Problem List with Cross Badges */}
              <div className="space-y-3">
                <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
                  COMMON HEADACHES HOMEOWNERS FACE
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

              {/* Right: Pull-Quote + Solution List with Tick Badges */}
              <div className="space-y-6">
                <blockquote className="rounded-r-[12px] border-l-[3px] border-[#F31C60] bg-[#141414] px-6 py-6">
                  <p className="text-[17px] leading-[1.65] italic text-white/85">
                    &ldquo;Your home is where your family lives every single day. For over 20
                    years, our rule at MN Interiors has been simple: use honest materials, take
                    pride in the finish, and build every unit as if it were for our own
                    house.&rdquo;
                  </p>
                  <footer className="mt-4 text-[13px] font-semibold text-white/60">
                    — MN INTERIORS, KUNDRATHUR · CHENNAI
                  </footer>
                </blockquote>

                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F31C60] uppercase">
                    HOW MN INTERIORS DOES IT DIFFERENTLY
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
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                WHAT WE ARE KNOWN FOR
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                20+ YEARS OF HONEST
                <br />
                <em>CHENNAI CRAFTSMANSHIP</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                No fancy buzzwords—just neat work, dependable materials, and a local Kundrathur team
                that cares deeply about how your home turns out.
              </p>
            </div>

            <div className="grid-3 mt-12" data-reveal-group>
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
                        isHot
                          ? 'border-white/25 text-white'
                          : 'border-[#E6E6E6] text-[#D4104C]'
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

        {/* BAND 5: DARK INTERACTIVE 6-STEP PROCESS STEPPER */}
        <ProcessStepper />

        {/* BAND 6: DARK COMPARISON PAIR (WHITE BEFORE VS INK 2 2PX PINK WINNER) */}
        <section className="band-section w-full border-t border-white/10 bg-[#0A0A0A] text-white">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
                THE DIFFERENCE IS CLEAR
              </p>
              <h2 className="section-h2 text-white">
                WHY FAMILIES CHOOSE
                <br />
                <em>MN INTERIORS</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
                See how working directly with an established Kundrathur interior workshop compares
                to dealing with middlemen and rushed contractors.
              </p>
            </div>

            <div className="grid-2 mt-12" data-reveal-group>
              {/* Left: Before Card (White with Mist Gray Tag) */}
              <div className="rounded-[16px] border border-[#E6E6E6] bg-white p-[34px] text-[#0A0A0A] max-[680px]:p-[24px]">
                <span className="inline-block rounded-[6px] bg-[#F4F4F4] px-[10px] py-[6px] text-[11px] font-bold tracking-[0.16em] text-[#666666] uppercase">
                  TYPICAL CONTRACTORS
                </span>
                <h3 className="font-display mt-4 text-[30px] leading-[1.1] font-black tracking-[-0.5px] text-[#0A0A0A] max-[680px]:text-[24px]">
                  RUSHED WORK &amp; SURPRISES
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
                  MN INTERIORS · 20+ YEARS
                </span>
                <h3 className="font-display mt-4 text-[30px] leading-[1.1] font-black tracking-[-0.5px] text-white max-[680px]:text-[24px]">
                  NEAT WORK &amp; PEACE OF MIND
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
        <section id="services" className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                WHAT WE DO
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                EVERY SPACE DESIGNED
                <br />
                <em>WITH CARE &amp; DETAIL</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                Whether you need a complete 2BHK, 3BHK, or independent house interior, a brand-new
                kitchen and wardrobes, or neat interiors for your shop, we build it with care.
              </p>
            </div>

            <div className="grid-4 mt-12" data-reveal-group>
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
                            isHot
                              ? 'bg-black/20 text-white'
                              : 'bg-[#F4F4F4] text-[#666666]'
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

        {/* BAND 8: MIST GRAY CHENNAI HOMES COMPLETED */}
        <section className="band-section w-full bg-[#F4F4F4] text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                ACROSS CHENNAI
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                REAL PROJECTS.
                <br />
                <em>HAPPY CLIENTS.</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                From independent houses around Kundrathur and Porur to apartments and shops across
                Chennai, our work speaks for itself.
              </p>
            </div>

            <div className="grid-3 mt-12" data-reveal-group>
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
                        className={`mt-2 text-[12px] font-semibold tracking-[0.12em] uppercase ${
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

        {/* BAND 9: DARK VERIFIED GOOGLE REVIEWS (FIRST CARD SOLID PINK) */}
        <section id="reviews" className="band-section w-full bg-[#0A0A0A] text-white">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
                4.9 ★ ON GOOGLE · 71 VERIFIED REVIEWS
              </p>
              <h2 className="section-h2 text-white">
                WHAT OUR CLIENTS
                <br />
                <em>SAY ON GOOGLE</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
                Real feedback from Chennai homeowners and business owners who trusted MN Interiors
                with their spaces.
              </p>
            </div>

            <div className="grid-3 mt-12" data-reveal-group>
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
                        className={`mt-1 text-[12px] font-semibold tracking-[0.06em] uppercase ${
                          isHot ? 'text-white/90' : 'text-[#F31C60]'
                        }`}
                      >
                        {t.source}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 10: WHITE FREE CONSULTATION & DIRECT CONTACT CARD */}
        <section id="enquire" className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                GET STARTED WITH ZERO PRESSURE
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                FREE SITE VISIT.
                <br />
                <em>CLEAR WRITTEN QUOTE.</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                Planning interiors for a new flat, independent house, shop, or renovation in
                Chennai? Call, WhatsApp, or send us an enquiry for a free visit and quote.
              </p>
            </div>

            <div className="grid-price mt-12" data-reveal-group>
              {/* Left: Hairline What's Included Table */}
              <div className="rounded-[18px] border border-[#E6E6E6] bg-white p-[28px] max-[680px]:p-[20px]">
                <p className="mb-4 text-[11px] font-bold tracking-[0.18em] text-[#D4104C] uppercase">
                  WHAT YOU GET WHEN YOU ENQUIRE
                </p>

                <div className="divide-y divide-[#E6E6E6]">
                  {ENQUIRY_STEPS.map((row) => (
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
                      <span className="font-display shrink-0 text-[13px] font-extrabold tracking-[0.08em] text-[#D4104C] uppercase">
                        {row.tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom summary row */}
                <div className="mt-2 flex items-center justify-between gap-4 border-t-2 border-[#0A0A0A] pt-5">
                  <span className="font-display text-[19px] font-extrabold text-[#0A0A0A]">
                    CONSULTATION &amp; ESTIMATE FEE
                  </span>
                  <span className="font-display text-[24px] font-black text-[#D4104C]">FREE</span>
                </div>
              </div>

              {/* Right: Dark Enquiry & Direct Contact Card */}
              <div className="rounded-[20px] bg-[#0A0A0A] p-[34px] text-white max-[680px]:p-[24px]">
                <span className="inline-block rounded-[6px] bg-[#F31C60]/15 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[#F31C60] uppercase">
                  NO OBLIGATION · ALL OVER CHENNAI
                </span>

                <p className="font-display mt-5 text-[72px] leading-none font-black tracking-[-2px] text-[#F31C60] max-[680px]:text-[56px]">
                  FREE
                </p>

                <p className="mt-3 text-[14.5px] leading-[1.55] text-white/70">
                  Book a free site visit anywhere in Chennai or visit our Kundrathur, Kavanur
                  workshop to discuss your interiors directly.
                </p>

                <ul className="mt-6 space-y-3.5 border-t border-white/10 pt-6">
                  {ENQUIRY_CHECKLIST.map((item) => (
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
                  onClick={openEnquiry}
                  className="btn-pink btn-lg mt-7 w-full"
                >
                  <ChatCircleText size={18} weight="fill" aria-hidden="true" />
                  <span>Request a Free Quote</span>
                </button>

                <div className="mt-3 grid grid-cols-2 gap-2.5 max-[680px]:grid-cols-1">
                  <a
                    href={CONTACT_INFO.whatsappHref}
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
                    <span>WhatsApp Us</span>
                  </a>
                  <a href={CONTACT_INFO.phoneHref} className="btn-ghost btn-sm w-full tabular-nums">
                    <PhoneCall
                      size={16}
                      weight="fill"
                      className="text-[#F31C60]"
                      aria-hidden="true"
                    />
                    <span>{CONTACT_INFO.phoneLocal}</span>
                  </a>
                </div>

                <p className="mt-4 text-center text-[12.5px] leading-[1.5] text-white/50">
                  {CONTACT_INFO.addressLine1}, Kundrathur · {CONTACT_INFO.hours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 11: MIST GRAY 3 SIMPLE PROMISES (NARROW 900PX) */}
        <section className="band-section w-full bg-[#F4F4F4] text-[#0A0A0A]">
          <div className="container-narrow">
            <div className="text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                OUR SIMPLE PROMISE
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                THREE THINGS WE NEVER
                <br />
                <em>COMPROMISE ON</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-[#666666] max-[680px]:text-[16px]">
                A 4.9-star reputation across Chennai is not built by ads—it is built by keeping
                your word on every single project for over twenty years.
              </p>
            </div>

            <div className="mt-12 rounded-[16px] border border-[#E6E6E6] bg-white p-[32px] max-[680px]:p-[22px]" data-reveal>
              <div className="grid-3">
                <div className="border-r border-[#E6E6E6] pr-4 max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:pr-0 max-[1000px]:pb-5">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#666666] uppercase">
                    PROMISE 01
                  </p>
                  <p className="font-display mt-2 text-[32px] leading-none font-black tracking-[-1px] text-[#0A0A0A]">
                    HONEST
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.55] text-[#666666]">
                    Clear written pricing and genuine materials—we tell you clearly what goes into
                    your space with zero hidden charges.
                  </p>
                </div>

                <div className="border-r border-[#E6E6E6] pr-4 max-[1000px]:border-r-0 max-[1000px]:border-b max-[1000px]:pr-0 max-[1000px]:pb-5">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#D4104C] uppercase">
                    PROMISE 02
                  </p>
                  <p className="font-display mt-2 text-[32px] leading-none font-black tracking-[-1px] text-[#F31C60] tabular-nums">
                    10 YR
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.55] text-[#666666]">
                    Backed by a solid 10-year warranty and our permanent Kundrathur workshop team
                    whenever you need support.
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#0A0A0A] uppercase">
                    PROMISE 03
                  </p>
                  <p className="font-display mt-2 text-[32px] leading-none font-black tracking-[-1px] text-[#0A0A0A]">
                    ON TIME
                  </p>
                  <p className="mt-2.5 text-[14px] leading-[1.55] text-[#666666]">
                    Planned carefully around your move-in and housewarming dates so you step into a
                    spotless, finished space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 12: WHITE FAQ ACCORDION (NATIVE <details>, NARROW 900PX) */}
        <section id="faq" className="band-section w-full bg-white text-[#0A0A0A]">
          <div className="container-narrow">
            <div className="text-center" data-reveal>
              <p className="text-[12px] font-semibold tracking-[0.22em] text-[#D4104C] uppercase">
                COMMON QUESTIONS
              </p>
              <h2 className="section-h2 text-[#0A0A0A]">
                QUESTIONS CHENNAI
                <br />
                <em>HOMEOWNERS ASK</em>
              </h2>
            </div>

            <div className="mt-12 divide-y divide-[#E6E6E6] border-y border-[#E6E6E6]" data-reveal>
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
          <div className="container-narrow text-center" data-reveal>
            <p className="text-[12px] font-semibold tracking-[0.22em] text-[#F31C60] uppercase">
              CALL, WHATSAPP OR VISIT US IN KUNDRATHUR
            </p>
            <h2 className="section-h2-xl text-white">
              TALK TO CHENNAI&apos;S
              <br />
              TRUSTED <em>INTERIOR TEAM.</em>
            </h2>
            <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-white/65 max-[680px]:text-[16px]">
              Send us a quick enquiry for a free site visit anywhere in Chennai, or call and
              WhatsApp us directly on{' '}
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-semibold text-white underline tabular-nums"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
              .
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch">
              <button
                type="button"
                onClick={openEnquiry}
                className="btn-pink btn-lg max-[680px]:w-full"
              >
                <ChatCircleText size={18} weight="fill" aria-hidden="true" />
                <span>Get a Free Quote</span>
              </button>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-lg max-[680px]:w-full"
              >
                <WhatsappLogo
                  size={20}
                  weight="fill"
                  className="text-[#2FD47A]"
                  aria-hidden="true"
                />
                <span>WhatsApp {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>

            <p className="mt-5 text-[13.5px] text-white/50">
              {CONTACT_INFO.addressLine1}, {CONTACT_INFO.addressLine2} · {CONTACT_INFO.hours}
            </p>
          </div>
        </section>
      </main>

      {/* BAND 14: DARK FOOTER WITH FULL REAL ADDRESS, PHONE, WHATSAPP & DIRECTIONS */}
      <footer className="w-full border-t border-white/10 bg-[#0A0A0A] py-14 text-white">
        <div className="container-main">
          <div className="flex flex-wrap items-start justify-between gap-10 border-b border-white/10 pb-10">
            <div className="max-w-[480px]">
              <a
                href="#top"
                className="font-display inline-block text-[18px] font-black tracking-[-0.3px] text-white"
              >
                <span className="text-[#F31C60]">M</span>N INTERIORS
              </a>

              <div className="mt-4 space-y-2.5 text-[13.5px] leading-[1.6] text-white/65">
                <p className="flex items-start gap-2.5">
                  <MapPin
                    size={16}
                    weight="fill"
                    className="mt-1 shrink-0 text-[#F31C60]"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-white/90">Office &amp; Workshop:</strong>{' '}
                    {CONTACT_INFO.addressLine1}, {CONTACT_INFO.addressLine2}
                  </span>
                </p>

                <p className="flex items-center gap-2.5">
                  <PhoneCall
                    size={16}
                    weight="fill"
                    className="shrink-0 text-[#F31C60]"
                    aria-hidden="true"
                  />
                  <span>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="font-semibold text-white/90 tabular-nums hover:text-white"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>{' '}
                    <span className="text-white/40">({CONTACT_INFO.phoneLocal})</span>
                  </span>
                </p>

                <p className="flex items-center gap-2.5">
                  <Clock
                    size={16}
                    weight="fill"
                    className="shrink-0 text-[#F31C60]"
                    aria-hidden="true"
                  />
                  <span>
                    {CONTACT_INFO.hours} · 4.9 ★ Google Rated ({CONTACT_INFO.googleReviewsCount}{' '}
                    Reviews)
                  </span>
                </p>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
              <a
                href="#our-work"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Our Work
              </a>
              <a
                href="#craftsmanship"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Why Us
              </a>
              <a
                href="#how-we-work"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                How We Work
              </a>
              <a
                href="#services"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                What We Do
              </a>
              <a
                href="#reviews"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Reviews
              </a>
              <a
                href={CONTACT_INFO.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Google Maps
              </a>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={openEnquiry}
                className="cursor-pointer text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
              >
                Free Enquiry
              </button>
            </nav>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/40">
            <p>© 2026 MN Interiors, Kundrathur, Kavanur, Chennai. Over 20 Years of Craftsmanship.</p>
            <p>{CONTACT_INFO.website} · 10-Year Warranty</p>
          </div>
        </div>
      </footer>

      {/* FIXED 68PX STICKY BOTTOM CTA BAR */}
      <StickyBottomBar onOpenEnquiry={openEnquiry} />

      {/* INTERACTIVE FREE ENQUIRY MODAL */}
      <BookingModal
        isOpen={modalOpen}
        initialScope={enquiryScope}
        initialNote={enquiryNote}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
