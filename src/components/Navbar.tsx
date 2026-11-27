import { useEffect, useState } from 'react';
import { ChatCircleText, List, PhoneCall, WhatsappLogo, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CONTACT_INFO } from '../data/content';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

const NAV_LINKS = [
  { label: 'Our Work', href: '#our-work' },
  { label: 'Why Us', href: '#craftsmanship' },
  { label: 'How We Work', href: '#how-we-work' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
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
      {/* One-line dark announcement topbar with real rating & clickable phone */}
      <div className="w-full bg-[#0A0A0A] px-4 py-[9px] text-center text-[13px] leading-[1.45] text-white/80">
        <span>
          20+ YEARS IN CHENNAI · 4.9 ★ GOOGLE RATED (71 REVIEWS) · KUNDRATHUR —{' '}
        </span>
        <a
          href={CONTACT_INFO.phoneHref}
          className="font-bold text-[#F31C60] tabular-nums hover:underline"
        >
          CALL / WHATSAPP {CONTACT_INFO.phoneDisplay}
        </a>
      </div>

      {/* 68px sticky blurred white nav: 3-zone layout (wordmark | nav links | primary CTA) */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E6E6E6] bg-white/96 backdrop-blur-[10px]">
        <div className="container-main flex h-[68px] items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display shrink-0 whitespace-nowrap text-[18px] font-black tracking-[-0.3px] text-[#0A0A0A]"
            aria-label="MN Interiors Kundrathur Chennai Home"
          >
            <span className="text-[#F31C60]">M</span>N INTERIORS
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
                className="relative shrink-0 py-1 text-[14px] font-semibold whitespace-nowrap text-[#0A0A0A]/75 transition-colors duration-150 hover:text-[#0A0A0A] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[#F31C60] after:transition-transform after:duration-200 hover:after:scale-x-100"
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
              <span>Get a Free Quote</span>
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#E6E6E6] bg-white text-[#0A0A0A] transition-colors hover:border-[#0A0A0A] active:scale-[0.97] motion-reduce:active:scale-100 min-[900px]:hidden"
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
              className="border-t border-[#E6E6E6] bg-white min-[900px]:hidden"
            >
              <div className="container-main py-4">
                <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#E6E6E6]">
                  {[...NAV_LINKS, { label: 'FAQ', href: '#faq' }].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3.5 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:text-[#D4104C]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-[#E6E6E6] pt-4">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border border-[#E6E6E6] bg-[#F4F4F4] px-3 text-[13.5px] font-bold text-[#0A0A0A] tabular-nums"
                  >
                    <PhoneCall size={16} weight="fill" className="text-[#D4104C]" aria-hidden="true" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[#0A0A0A] px-3 text-[13.5px] font-bold text-white"
                  >
                    <WhatsappLogo
                      size={17}
                      weight="fill"
                      className="text-[#2FD47A]"
                      aria-hidden="true"
                    />
                    <span>WhatsApp</span>
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
