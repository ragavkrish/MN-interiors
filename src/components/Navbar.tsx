import { CalendarCheck } from '@phosphor-icons/react';

interface NavbarProps {
  onOpenBooking: (mode?: 'audit' | 'visit') => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  return (
    <>
      {/* One-line dark announcement topbar */}
      <div className="w-full bg-[#0A0A0A] px-4 py-[9px] text-center text-[13px] leading-[1.45] text-white/80">
        <span>
          22+ YEARS OF MASTER JOINERY IN CHENNAI · ONLY 4 TURNKEY BUILD SLOTS OPEN THIS QUARTER —{' '}
        </span>
        <strong className="font-bold text-[#F31C60]">100% ADJUSTABLE SITE AUDIT FEE</strong>
      </div>

      {/* 68px sticky blurred white nav: wordmark left, small pink CTA right, no menu links */}
      <header className="sticky top-0 z-40 h-[68px] w-full border-b border-[#E6E6E6] bg-white/96 backdrop-blur-[10px]">
        <div className="container-main flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            className="font-display shrink-0 whitespace-nowrap text-[18px] font-black tracking-[-0.3px] text-[#0A0A0A]"
            aria-label="Kalaigar Interiors Chennai Home"
          >
            <span className="text-[#F31C60]">K</span>ALAIGAR INTERIORS
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking('audit')}
            className="btn-pink btn-sm btn-nav-mobile"
          >
            <CalendarCheck size={17} weight="fill" aria-hidden="true" />
            <span>Book Site Audit — ₹4,999</span>
          </button>
        </div>
      </header>
    </>
  );
}
