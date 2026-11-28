import { useState } from 'react';
import {
  ChatCircleText,
  Clock,
  MapPin,
  PhoneCall,
  Plus,
  Star,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { BookingModal } from './components/BookingModal';
import CountUp from './components/CountUp';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ServicesFloorPlan } from './components/ServicesFloorPlan';
import { WorkShowcase } from './components/WorkShowcase';
import {
  CHENNAI_BENCHMARKS,
  CONTACT_INFO,
  FAQS,
  STATS_BAND,
  TESTIMONIALS,
} from './data/content';
import { useScrollReveal } from './lib/useScrollReveal';

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
    <div className="min-h-screen w-full bg-[var(--white)] text-[var(--ink)]">
      <Navbar onOpenEnquiry={openEnquiry} />

      <main>
        {/* BAND 1: DARK HERO WITH COMPLETED HOME BACKDROP + WARM INK MARQUEE */}
        <Hero onOpenEnquiry={openEnquiry} />

        {/* BAND 2: WARM PAPER 4-UP STATS STRIP */}
        <section className="w-full border-b border-[var(--line)] bg-[var(--white)]">
          <div className="container-main">
            <div className="stats-grid" data-reveal-group>
              {STATS_BAND.map((stat, i) => (
                <div
                  key={stat.caption}
                  className="stats-cell px-6 py-10 text-center max-[680px]:px-4 max-[680px]:py-7"
                >
                  <p
                    className={`font-display text-[52px] leading-[1.08] font-medium tracking-[-0.01em] tabular-nums max-[680px]:text-[40px] ${
                      stat.accent ? 'text-[var(--pink-aa)]' : 'text-[var(--ink)]'
                    }`}
                  >
                    {stat.count ? (
                      <CountUp {...stat.count} delay={i * 80} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mx-auto mt-2 max-w-[220px] text-[15px] leading-[1.5] text-[var(--muted)]">
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BAND 3: STONE FILTERABLE BENTO WORK SHOWCASE + LIGHTBOX */}
        <WorkShowcase onEnquireStyle={handleEnquireStyle} />

        {/* BAND 4: WARM PAPER SIGNATURE ROOMS 4-UP GRID */}
        <section id="services" className="band-section w-full bg-[var(--white)] text-[var(--ink)]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="eyebrow-label text-[var(--pink-aa)]">Services</p>
              <h2 className="section-h2 text-[var(--ink)]">
                Every room,
                <br />
                <em>made with care.</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[17px] leading-[1.68] text-[var(--graphite)] max-[680px]:text-[15.5px]">
                Whether you need a complete 2BHK, 3BHK, or independent house interior, a brand-new
                kitchen and wardrobes, or neat interiors for your shop, we build it with care.
              </p>
            </div>

            <ServicesFloorPlan onEnquire={handleEnquireStyle} />
          </div>
        </section>

        {/* BAND 5: STONE CHENNAI HOMES COMPLETED */}
        <section className="band-section w-full bg-[var(--mist)] text-[var(--ink)]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="eyebrow-label text-[var(--pink-aa)]">Across Chennai</p>
              <h2 className="section-h2 text-[var(--ink)]">
                Homes we&apos;ve
                <br />
                <em>finished.</em>
              </h2>
              <p className="mx-auto max-w-[620px] text-[17px] leading-[1.68] text-[var(--graphite)] max-[680px]:text-[15.5px]">
                From independent houses around Kundrathur and Porur to apartments and shops across
                Chennai, our work speaks for itself.
              </p>
            </div>

            <div className="grid-3 mt-12" data-reveal-group>
              {CHENNAI_BENCHMARKS.map((project) => {
                const isFeatured = Boolean(project.featured);
                return (
                  <article
                    key={project.title}
                    className={`flex flex-col justify-between rounded-[16px] border bg-[var(--white)] p-[28px] text-[var(--ink)] ${
                      isFeatured ? 'border-[var(--pink)]' : 'border-[var(--line)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[13.5px] font-semibold text-[var(--pink-aa)]">
                        <MapPin size={15} weight="fill" aria-hidden="true" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="font-display mt-3 text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] text-[var(--ink)]">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-[14px] font-medium text-[var(--muted)]">
                        {project.meta}
                      </p>

                      <p className="mt-4 text-[15px] leading-[1.68] text-[var(--graphite)]">
                        {project.summary}
                      </p>
                    </div>

                    <div
                      className={`mt-6 rounded-[10px] px-4 py-3 text-[14px] font-semibold ${
                        isFeatured
                          ? 'bg-[var(--tint)] text-[var(--pink-aa)]'
                          : 'border border-[var(--line)] bg-[var(--mist)] text-[var(--ink)]'
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

        {/* BAND 6: WARM INK VERIFIED GOOGLE REVIEWS */}
        <section id="reviews" className="band-section w-full bg-[var(--ink)] text-[var(--white)]">
          <div className="container-main">
            <div className="mx-auto max-w-[740px] text-center" data-reveal>
              <p className="eyebrow-label text-[var(--tint)]">
                4.9 ★ on Google · 71 verified reviews
              </p>
              <h2 className="section-h2 text-[var(--white)]">
                What our
                <br />
                <em>clients say.</em>
              </h2>
              <p className="mx-auto max-w-[600px] text-[17px] leading-[1.68] text-[var(--white)]/75 max-[680px]:text-[15.5px]">
                Real feedback from Chennai homeowners and business owners who trusted MN Interiors
                with their spaces.
              </p>
            </div>

            <div className="grid-3 mt-12" data-reveal-group>
              {TESTIMONIALS.map((t) => {
                const isFeatured = Boolean(t.featured);
                return (
                  <article
                    key={t.name}
                    className={`flex flex-col justify-between rounded-[16px] border bg-[var(--ink-2)] p-[28px] text-[var(--white)] ${
                      isFeatured
                        ? 'border-[var(--accent-border)]'
                        : 'border-[var(--line-dark)]'
                    }`}
                  >
                    <div>
                      <div
                        className="flex items-center gap-1 text-[var(--pink)]"
                        aria-label="5 out of 5 stars"
                      >
                        {[0, 1, 2, 3, 4].map((starIdx) => (
                          <Star key={starIdx} size={17} weight="fill" aria-hidden="true" />
                        ))}
                      </div>

                      <p className="mt-5 text-[15.5px] leading-[1.72] text-[var(--white)]/85">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[var(--line-dark)] pt-4">
                      <p className="font-display text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-[var(--white)]">
                        {t.name}
                      </p>
                      <p className="mt-1 text-[14.5px] text-[var(--white)]/70">{t.role}</p>
                      <p className="mt-1.5 text-[13.5px] font-medium text-[var(--tint)]">
                        {t.source}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* BAND 7: WARM PAPER FAQ ACCORDION (NATIVE <details>, NARROW 900PX) */}
        <section id="faq" className="band-section w-full bg-[var(--white)] text-[var(--ink)]">
          <div className="container-narrow">
            <div className="text-center" data-reveal>
              <p className="eyebrow-label text-[var(--pink-aa)]">Common questions</p>
              <h2 className="section-h2 text-[var(--ink)]">
                Questions our
                <br />
                <em>clients ask.</em>
              </h2>
            </div>

            <div
              className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]"
              data-reveal
            >
              {FAQS.map((faq, idx) => (
                <details key={faq.question} className="faq-item group" open={idx === 0}>
                  <summary className="flex items-center justify-between gap-4 py-[22px] text-[17px] leading-[1.45] font-semibold text-[var(--ink)]">
                    <span>{faq.question}</span>
                    <span
                      className="faq-disc flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[var(--mist)] text-[var(--ink)]"
                      aria-hidden="true"
                    >
                      <Plus size={16} weight="bold" />
                    </span>
                  </summary>
                  <div className="faq-answer pb-[24px] pr-10 text-[16px] leading-[1.72] text-[var(--graphite)] max-[680px]:pr-0">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BAND 8: SIGNATURE FULL TERRACOTTA FINAL CTA BAND */}
        <section className="band-final on-accent w-full bg-[var(--pink)] text-[var(--white)]">
          <div className="container-narrow text-center" data-reveal>
            <p className="eyebrow-label text-[var(--white)]/90">
              Kundrathur, Chennai · Open daily till 9:00 PM
            </p>
            <h2 className="section-h2-xl text-[var(--white)]">
              Let&apos;s talk about
              <br />
              <em>your home.</em>
            </h2>
            <p className="mx-auto max-w-[600px] text-[17px] leading-[1.68] text-[var(--white)]/92 max-[680px]:text-[15.5px]">
              Send us a quick enquiry for a free site visit anywhere in Chennai, or call and
              WhatsApp us directly on{' '}
              <a
                href={CONTACT_INFO.phoneHref}
                className="font-semibold text-[var(--white)] underline underline-offset-4 tabular-nums"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
              .
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 max-[680px]:flex-col max-[680px]:items-stretch">
              <button
                type="button"
                onClick={openEnquiry}
                className="btn-ink btn-lg max-[680px]:w-full"
              >
                <ChatCircleText size={18} weight="fill" aria-hidden="true" />
                <span>Get a free quote</span>
              </button>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-lg max-[680px]:w-full"
              >
                <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
                <span>WhatsApp {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>

            <p className="mt-6 text-[15px] text-[var(--white)]/90">
              {CONTACT_INFO.addressLine1}, {CONTACT_INFO.addressLine2} · {CONTACT_INFO.hours}
            </p>
          </div>
        </section>
      </main>

      {/* BAND 9: WARM INK FOOTER WITH FULL REAL ADDRESS, PHONE, WHATSAPP & DIRECTIONS */}
      <footer className="w-full border-t border-[var(--line-dark)] bg-[var(--ink)] py-14 text-[var(--white)]">
        <div className="container-main">
          <div className="flex flex-wrap items-start justify-between gap-10 border-b border-[var(--line-dark)] pb-10">
            <div className="max-w-[490px]">
              <a
                href="#top"
                className="font-display inline-block text-[26px] leading-none font-semibold tracking-[-0.01em] text-[var(--white)]"
              >
                <span className="text-[var(--pink)]">MN</span> Interiors
              </a>

              <div className="mt-4 space-y-2.5 text-[15px] leading-[1.6] text-[var(--white)]/80">
                <p className="flex items-start gap-2.5">
                  <MapPin
                    size={17}
                    weight="fill"
                    className="mt-1 shrink-0 text-[var(--pink)]"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-[var(--white)]">
                      Office and workshop:
                    </strong>{' '}
                    {CONTACT_INFO.addressLine1}, {CONTACT_INFO.addressLine2}
                  </span>
                </p>

                <p className="flex items-center gap-2.5">
                  <PhoneCall
                    size={17}
                    weight="fill"
                    className="shrink-0 text-[var(--pink)]"
                    aria-hidden="true"
                  />
                  <span>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="font-semibold text-[var(--white)] tabular-nums hover:text-[var(--tint)]"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>{' '}
                    <span className="text-[var(--white)]/65">({CONTACT_INFO.phoneLocal})</span>
                  </span>
                </p>

                <p className="flex items-center gap-2.5">
                  <Clock
                    size={17}
                    weight="fill"
                    className="shrink-0 text-[var(--pink)]"
                    aria-hidden="true"
                  />
                  <span>
                    {CONTACT_INFO.hours} · 4.9 ★ Google rated ({CONTACT_INFO.googleReviewsCount}{' '}
                    reviews)
                  </span>
                </p>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
              <a
                href="#our-work"
                className="text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                Our work
              </a>
              <a
                href="#services"
                className="text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                Services
              </a>
              <a
                href="#reviews"
                className="text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                Reviews
              </a>
              <a
                href="#faq"
                className="text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                FAQ
              </a>
              <a
                href={CONTACT_INFO.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                Google Maps
              </a>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={openEnquiry}
                className="cursor-pointer text-[15px] font-medium text-[var(--white)]/80 transition-colors duration-150 hover:text-[var(--white)]"
              >
                Free enquiry
              </button>
            </nav>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[var(--white)]/70">
            <p>© 2026 MN Interiors, Kundrathur, Kavanur, Chennai. Over 20 years of craftsmanship.</p>
            <p>
              {CONTACT_INFO.website} · 10-year warranty ·{' '}
              <span className="text-[var(--white)]/85">
                Made by <span className="font-semibold text-[var(--white)]">linkkmedia</span>
              </span>
            </p>
          </div>
        </div>
      </footer>

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
