import { useEffect, useState } from 'react';
import { ChatCircleText, List, PhoneCall, WhatsappLogo, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CONTACT_INFO } from '../data/content';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

const NAV_LINKS = [
  { label: 'Our work', href: '#our-work' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1] as const;

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* One-line warm ink announcement bar with real rating and clickable phone */}
      <div className="w-full bg-[var(--ink)] px-4 py-[10px] text-center text-[13.5px] leading-[1.45] text-[var(--white)]/85">
        <span>
          20+ years in Chennai · 4.9 ★ Google rated (71 reviews) · Kundrathur —{' '}
        </span>
        <a
          href={CONTACT_INFO.phoneHref}
          className="font-semibold text-[var(--white)] underline decoration-[var(--pink)] decoration-2 underline-offset-4 tabular-nums transition-colors hover:text-[var(--tint)]"
        >
          Call or WhatsApp {CONTACT_INFO.phoneDisplay}
        </a>
      </div>

      {/* 68px sticky blurred warm-paper nav: 3-zone layout (wordmark | nav links | primary CTA) */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--nav-bg)] backdrop-blur-[10px]">
        <div className="container-main flex h-[68px] items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark in Cormorant Garamond (>= 20px, weight 600) */}
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display shrink-0 whitespace-nowrap text-[24px] leading-none font-semibold tracking-[-0.01em] text-[var(--ink)]"
            aria-label="MN Interiors Kundrathur Chennai Home"
          >
            <span className="text-[var(--pink-aa)]">MN</span> Interiors
          </a>

          {/* Zone 2: Desktop navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 min-[900px]:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative shrink-0 py-1 text-[15px] font-medium whitespace-nowrap text-[var(--graphite)] transition-colors duration-150 hover:text-[var(--ink)] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[var(--pink)] after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA + mobile menu toggle */}
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="btn-pink btn-sm btn-nav-mobile"
            >
              <ChatCircleText size={17} weight="fill" aria-hidden="true" />
              <span>Get a free quote</span>
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] transition-colors hover:border-[var(--ink)] active:scale-[0.97] motion-reduce:active:scale-100 min-[900px]:hidden"
            >
              {mobileMenuOpen ? (
                <X size={19} weight="bold" aria-hidden="true" />
              ) : (
                <List size={20} weight="bold" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: easeOut }}
              className="border-t border-[var(--line)] bg-[var(--white)] min-[900px]:hidden"
            >
              <div className="container-main py-4">
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col divide-y divide-[var(--line)]"
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3.5 text-[15px] font-medium text-[var(--ink)] transition-colors hover:text-[var(--pink-aa)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-[var(--line)] pt-4">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--mist)] px-3 text-[14px] font-semibold text-[var(--ink)] tabular-nums"
                  >
                    <PhoneCall
                      size={16}
                      weight="fill"
                      className="text-[var(--pink-aa)]"
                      aria-hidden="true"
                    />
                    <span>Call us</span>
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[var(--ink)] px-3 text-[14px] font-semibold text-[var(--white)]"
                  >
                    <WhatsappLogo
                      size={17}
                      weight="fill"
                      className="text-[var(--live)]"
                      aria-hidden="true"
                    />
                    <span>WhatsApp us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
