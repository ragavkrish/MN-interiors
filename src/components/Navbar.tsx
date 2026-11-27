import { ChatCircleText } from '@phosphor-icons/react';
import { CONTACT_INFO } from '../data/content';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export function Navbar({ onOpenEnquiry }: NavbarProps) {
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

      {/* 68px sticky blurred white nav: wordmark left, small pink CTA right, no menu links */}
      <header className="sticky top-0 z-40 h-[68px] w-full border-b border-[#E6E6E6] bg-white/96 backdrop-blur-[10px]">
        <div className="container-main flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            className="font-display shrink-0 whitespace-nowrap text-[18px] font-black tracking-[-0.3px] text-[#0A0A0A]"
            aria-label="MN Interiors Kundrathur Chennai Home"
          >
            <span className="text-[#F31C60]">M</span>N INTERIORS
          </a>

          <button
            type="button"
            onClick={onOpenEnquiry}
            className="btn-pink btn-sm btn-nav-mobile"
          >
            <ChatCircleText size={17} weight="fill" aria-hidden="true" />
            <span>Get a Free Quote</span>
          </button>
        </div>
      </header>
    </>
  );
}
