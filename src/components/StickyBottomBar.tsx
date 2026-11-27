import { CalendarCheck } from '@phosphor-icons/react';

interface StickyBottomBarProps {
  onOpenBooking: (mode?: 'audit' | 'visit') => void;
}

export function StickyBottomBar({ onOpenBooking }: StickyBottomBarProps) {
  return (
    <div className="sticky-bottom-shadow fixed inset-x-0 bottom-0 z-50 h-[68px] border-t border-[#E6E6E6] bg-white">
      <div className="container-main flex h-full items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display truncate text-[14.5px] font-black tracking-[-0.2px] text-[#0A0A0A] max-[680px]:text-[13px]">
            KALAIGAR SITE AUDIT &amp; 3D BLUEPRINT —{' '}
            <span className="text-[#D4104C] tabular-nums">₹4,999</span>
          </p>
          <p className="truncate text-[12.5px] text-[#666666] max-[680px]:hidden">
            100% credited to your turnkey build · 22+ Years in Chennai · 15-Year Written Warranty
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenBooking('audit')}
          className="btn-pink btn-sm btn-nav-mobile"
        >
          <CalendarCheck size={16} weight="fill" aria-hidden="true" />
          <span>Book Site Audit</span>
        </button>
      </div>
    </div>
  );
}
