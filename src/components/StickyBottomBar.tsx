import { ChatCircleText, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';
import { CONTACT_INFO } from '../data/content';

interface StickyBottomBarProps {
  onOpenEnquiry: () => void;
}

export function StickyBottomBar({ onOpenEnquiry }: StickyBottomBarProps) {
  return (
    <div className="sticky-bottom-shadow fixed inset-x-0 bottom-0 z-50 h-[68px] border-t border-[#E6E6E6] bg-white">
      <div className="container-main flex h-full items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display truncate text-[14.5px] font-black tracking-[-0.2px] text-[#0A0A0A] max-[680px]:text-[13px]">
            MN INTERIORS ·{' '}
            <a
              href={CONTACT_INFO.phoneHref}
              className="text-[#D4104C] tabular-nums hover:underline"
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
          </p>
          <p className="truncate text-[12.5px] text-[#666666] max-[680px]:hidden">
            4.9 ★ Google Rated (71 Reviews) · Kundrathur, Chennai · 10-Year Warranty
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={CONTACT_INFO.phoneHref}
            aria-label={`Call MN Interiors at ${CONTACT_INFO.phoneDisplay}`}
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-[#E6E6E6] bg-[#F4F4F4] text-[#0A0A0A] transition-colors hover:bg-[#E6E6E6] max-[680px]:hidden"
          >
            <PhoneCall size={18} weight="fill" aria-hidden="true" />
          </a>

          <a
            href={CONTACT_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp MN Interiors"
            className="inline-flex h-[40px] items-center justify-center gap-1.5 rounded-[10px] border border-[#E6E6E6] bg-[#0A0A0A] px-3.5 text-[13.5px] font-bold whitespace-nowrap text-white transition-colors hover:bg-[#1D1D1D] max-[680px]:px-3"
          >
            <WhatsappLogo size={18} weight="fill" className="text-[#2FD47A]" aria-hidden="true" />
            <span className="max-[680px]:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onOpenEnquiry}
            className="btn-pink btn-sm btn-nav-mobile"
          >
            <ChatCircleText size={16} weight="fill" aria-hidden="true" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
