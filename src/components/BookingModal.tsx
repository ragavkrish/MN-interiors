import { useEffect, useState, type FormEvent } from 'react';
import {
  ChatCircleText,
  CheckCircle,
  MapPin,
  PhoneCall,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { CHENNAI_LOCALITIES, CONTACT_INFO } from '../data/content';

interface BookingModalProps {
  isOpen: boolean;
  initialScope?: string;
  initialNote?: string;
  onClose: () => void;
}

interface EnquiryConfirmation {
  refCode: string;
  name: string;
  phone: string;
  locality: string;
  scope: string;
  homeType: string;
  notes: string;
}

export function BookingModal({
  isOpen,
  initialScope = 'Full Home Interiors',
  initialNote = '',
  onClose,
}: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState(CHENNAI_LOCALITIES[0]);
  const [homeType, setHomeType] = useState('3BHK Apartment');
  const [scope, setScope] = useState(initialScope);
  const [notes, setNotes] = useState(initialNote);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<EnquiryConfirmation | null>(null);

  useEffect(() => {
    if (isOpen) {
      setScope(initialScope || 'Full Home Interiors');
      setNotes(initialNote || '');
      setError(null);
      setConfirmation(null);
    }
  }, [isOpen, initialScope, initialNote]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const digitsOnly = phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setError('Please enter your name.');
      return;
    }

    if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError(null);
    const randomNum = Math.floor(100 + Math.random() * 900);
    setConfirmation({
      refCode: `MN-CHN-${randomNum}`,
      name: trimmedName,
      phone: digitsOnly.slice(-10),
      locality,
      homeType,
      scope,
      notes: notes.trim(),
    });
  };

  const buildWhatsappConfirmHref = (c: EnquiryConfirmation) => {
    const lines = [
      `Hi MN Interiors, I just submitted an enquiry (${c.refCode}).`,
      `Name: ${c.name}`,
      `Phone: +91 ${c.phone}`,
      `Area: ${c.locality}`,
      `Property: ${c.homeType}`,
      `Requirement: ${c.scope}`,
      c.notes ? `Notes: ${c.notes}` : '',
    ].filter(Boolean);
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const resetAndClose = () => {
    setName('');
    setPhone('');
    setNotes('');
    setError(null);
    setConfirmation(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={resetAndClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-[540px] overflow-y-auto rounded-[20px] border border-white/15 bg-[#0A0A0A] p-[32px] text-white max-[680px]:p-[22px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#F31C60] uppercase">
              MN INTERIORS · KUNDRATHUR, CHENNAI
            </p>
            <h2
              id="enquiry-modal-title"
              className="font-display mt-1.5 text-[24px] leading-[1.15] font-black tracking-[-0.5px] text-white"
            >
              {confirmation ? 'ENQUIRY READY TO SEND' : 'REQUEST A FREE QUOTE'}
            </h2>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close enquiry dialog"
            className="flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#141414] text-white/80 transition-colors hover:bg-[#1D1D1D] hover:text-white"
          >
            <X size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>

        {confirmation ? (
          <div className="mt-6">
            <div className="rounded-[14px] border border-[#F31C60]/40 bg-[#F31C60]/12 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle size={28} weight="fill" className="shrink-0 text-[#F31C60]" />
                <div>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#F31C60] uppercase">
                    ENQUIRY REFERENCE
                  </p>
                  <p className="font-display text-[22px] font-black tracking-[-0.4px] text-white tabular-nums">
                    {confirmation.refCode}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-white/80">
                Thank you, <strong className="text-white">{confirmation.name}</strong>! For the
                fastest response, tap below to send your enquiry directly to MN Interiors on
                WhatsApp or call{' '}
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="font-semibold text-white underline tabular-nums"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
                .
              </p>
            </div>

            <div className="mt-5 divide-y divide-white/10 rounded-[14px] border border-white/10 bg-[#141414] px-5">
              <div className="flex items-center justify-between gap-3 py-3.5 text-[14px]">
                <span className="text-white/55">Location</span>
                <span className="font-semibold text-white">{confirmation.locality}</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3.5 text-[14px]">
                <span className="text-white/55">Property</span>
                <span className="font-semibold text-white">{confirmation.homeType}</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-3.5 text-[14px]">
                <span className="text-white/55">Requirement</span>
                <span className="font-semibold text-white">{confirmation.scope}</span>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-[12px] border border-white/10 bg-[#141414] p-4 text-[13px] leading-[1.55] text-white/70">
              <MapPin size={18} weight="fill" className="mt-0.5 shrink-0 text-[#F31C60]" />
              <span>
                <strong className="text-white">MN Interiors:</strong> {CONTACT_INFO.addressLine1},{' '}
                {CONTACT_INFO.addressLine2} · {CONTACT_INFO.hours}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={buildWhatsappConfirmHref(confirmation)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink btn-md w-full"
              >
                <WhatsappLogo size={19} weight="fill" aria-hidden="true" />
                <span>Send Details on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={resetAndClose}
                className="btn-ghost btn-md w-full"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {/* Direct Call / WhatsApp strip */}
            <div className="grid grid-cols-2 gap-2.5 max-[680px]:grid-cols-1">
              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1D1D1D] tabular-nums"
              >
                <PhoneCall size={16} weight="fill" className="text-[#F31C60]" aria-hidden="true" />
                <span>Call {CONTACT_INFO.phoneLocal}</span>
              </a>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1D1D1D]"
              >
                <WhatsappLogo
                  size={17}
                  weight="fill"
                  className="text-[#2FD47A]"
                  aria-hidden="true"
                />
                <span>WhatsApp Directly</span>
              </a>
            </div>

            <p className="text-[13.5px] leading-[1.6] text-white/65">
              Or leave your details below for a free site visit anywhere in Chennai:
            </p>

            <div className="grid grid-cols-2 gap-3.5 max-[680px]:grid-cols-1">
              <div>
                <label
                  htmlFor="enquiry-name"
                  className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                >
                  Your Name
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Karthik Sundar"
                  className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white placeholder:text-white/35"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                >
                  Phone Number (+91)
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98403 84824"
                  className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white placeholder:text-white/35 tabular-nums"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="enquiry-locality"
                className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
              >
                Area in Chennai
              </label>
              <select
                id="enquiry-locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white"
              >
                {CHENNAI_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#141414] text-white">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3.5 max-[680px]:grid-cols-1">
              <div>
                <label
                  htmlFor="enquiry-hometype"
                  className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                >
                  Property Type
                </label>
                <select
                  id="enquiry-hometype"
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white"
                >
                  <option value="2BHK Apartment">2BHK Apartment</option>
                  <option value="3BHK Apartment">3BHK Apartment</option>
                  <option value="Independent House / Villa">Independent House / Villa</option>
                  <option value="Shop / Commercial Space">Shop / Commercial Space</option>
                  <option value="Home Renovation">Home Renovation</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="enquiry-scope"
                  className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                >
                  What You Need
                </label>
                <select
                  id="enquiry-scope"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white"
                >
                  <option value="Full Home Interiors">Full Home Interiors</option>
                  <option value="Modular Kitchen">Modular Kitchen</option>
                  <option value="Wardrobes & Bedrooms">Wardrobes &amp; Bedrooms</option>
                  <option value="Pooja Room / TV Unit">Pooja Room / TV Unit</option>
                  <option value="Shop / Commercial Interiors">Shop / Commercial Interiors</option>
                  <option value="Visit Kundrathur Workshop">Visit Kundrathur Workshop</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="enquiry-notes"
                className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
              >
                Anything Else? (Optional)
              </label>
              <textarea
                id="enquiry-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Getting keys next month, looking for kitchen + 3 wardrobes"
                className="w-full resize-none rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-white/35"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-[10px] border border-[#F31C60]/50 bg-[#F31C60]/15 px-3.5 py-2.5 text-[13.5px] font-medium text-white"
              >
                {error}
              </p>
            )}

            <button type="submit" className="btn-pink btn-lg mt-2 w-full">
              <ChatCircleText size={18} weight="fill" aria-hidden="true" />
              <span>Send Free Enquiry</span>
            </button>

            <p className="text-center text-[12px] text-white/45">
              {CONTACT_INFO.addressLine1}, Kundrathur, Kavanur · {CONTACT_INFO.hours}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
