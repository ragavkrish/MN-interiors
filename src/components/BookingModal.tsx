import { useEffect, useState, type FormEvent } from 'react';
import {
  ChatCircleText,
  CheckCircle,
  MapPin,
  PhoneCall,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
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
    onClose();
  };

  const easeOut = [0.23, 1, 0.32, 1] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="enquiry-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink-overlay)] p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          onClick={resetAndClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, ease: easeOut } }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: easeOut } }}
        >
          <motion.div
            className="max-h-[92vh] w-full max-w-[540px] overflow-y-auto rounded-[20px] border border-[var(--line-dark)] bg-[var(--ink)] p-[32px] text-[var(--white)] max-[680px]:p-[22px]"
            onClick={(e) => e.stopPropagation()}
            initial={
              reduceMotion
                ? { opacity: 0, transform: 'scale(1)' }
                : { opacity: 0, transform: 'scale(0.96)' }
            }
            animate={{
              opacity: 1,
              transform: 'scale(1)',
              transition: { duration: 0.25, ease: easeOut },
            }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    opacity: 0,
                    transform: 'scale(0.96)',
                    transition: { duration: 0.15, ease: easeOut },
                  }
            }
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line-dark)] pb-5">
              <div>
                <p className="eyebrow-label text-[var(--tint)]">
                  MN Interiors · Kundrathur, Chennai
                </p>
                <h2
                  id="enquiry-modal-title"
                  className="font-display mt-1.5 text-[30px] leading-[1.1] font-medium tracking-[-0.01em] text-[var(--white)]"
                >
                  {confirmation ? 'Enquiry ready to send.' : 'Request a free quote.'}
                </h2>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                aria-label="Close enquiry dialog"
                className="flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--line-dark)] bg-[var(--ink-2)] text-[var(--white)]/80 transition-colors hover:bg-[var(--ink-3)] hover:text-[var(--white)]"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            {confirmation ? (
              <motion.div
                className="mt-6"
                initial={
                  reduceMotion
                    ? { opacity: 0, transform: 'translateY(0px)' }
                    : { opacity: 0, transform: 'translateY(8px)' }
                }
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                <div className="rounded-[14px] border border-[var(--accent-border)] bg-[var(--accent-wash)] p-5">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="inline-flex shrink-0"
                      initial={
                        reduceMotion
                          ? { opacity: 0, transform: 'scale(1)' }
                          : { opacity: 0, transform: 'scale(0.9)' }
                      }
                      animate={{ opacity: 1, transform: 'scale(1)' }}
                      transition={
                        reduceMotion
                          ? { duration: 0.2 }
                          : { type: 'spring', duration: 0.5, bounce: 0.2, delay: 0.1 }
                      }
                    >
                      <CheckCircle
                        size={28}
                        weight="fill"
                        className="shrink-0 text-[var(--pink)]"
                      />
                    </motion.span>
                    <div>
                      <p className="eyebrow-label text-[var(--tint)]">Enquiry reference</p>
                      <p className="mt-0.5 text-[20px] font-semibold tracking-[-0.01em] text-[var(--white)] tabular-nums">
                        {confirmation.refCode}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--white)]/85">
                    Thank you, <strong className="text-[var(--white)]">{confirmation.name}</strong>!
                    For the fastest response, tap below to send your enquiry directly to MN
                    Interiors on WhatsApp or call{' '}
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="font-semibold text-[var(--white)] underline decoration-[var(--pink)] underline-offset-4 tabular-nums"
                    >
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>

                <div className="mt-5 divide-y divide-[var(--line-dark)] rounded-[14px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-5">
                  <div className="flex items-center justify-between gap-3 py-3.5 text-[15px]">
                    <span className="text-[var(--white)]/65">Location</span>
                    <span className="font-semibold text-[var(--white)]">
                      {confirmation.locality}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-3.5 text-[15px]">
                    <span className="text-[var(--white)]/65">Property</span>
                    <span className="font-semibold text-[var(--white)]">
                      {confirmation.homeType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-3.5 text-[15px]">
                    <span className="text-[var(--white)]/65">Requirement</span>
                    <span className="font-semibold text-[var(--white)]">{confirmation.scope}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-2.5 rounded-[12px] border border-[var(--line-dark)] bg-[var(--ink-2)] p-4 text-[15px] leading-[1.55] text-[var(--white)]/80">
                  <MapPin
                    size={18}
                    weight="fill"
                    className="mt-1 shrink-0 text-[var(--pink)]"
                  />
                  <span>
                    <strong className="text-[var(--white)]">MN Interiors:</strong>{' '}
                    {CONTACT_INFO.addressLine1}, {CONTACT_INFO.addressLine2} · {CONTACT_INFO.hours}
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
                    <span>Send details on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="btn-ghost btn-md w-full"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                {/* Direct Call / WhatsApp strip */}
                <div className="grid grid-cols-2 gap-2.5 max-[680px]:grid-cols-1">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="flex items-center justify-center gap-2 rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-2.5 text-[15px] font-semibold text-[var(--white)] transition-colors hover:bg-[var(--ink-3)] tabular-nums"
                  >
                    <PhoneCall
                      size={16}
                      weight="fill"
                      className="text-[var(--pink)]"
                      aria-hidden="true"
                    />
                    <span>Call {CONTACT_INFO.phoneLocal}</span>
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-2.5 text-[15px] font-semibold text-[var(--white)] transition-colors hover:bg-[var(--ink-3)]"
                  >
                    <WhatsappLogo
                      size={17}
                      weight="fill"
                      className="text-[var(--live)]"
                      aria-hidden="true"
                    />
                    <span>WhatsApp directly</span>
                  </a>
                </div>

                <p className="text-[15px] leading-[1.6] text-[var(--white)]/75">
                  Or leave your details below for a free site visit anywhere in Chennai:
                </p>

                <div className="grid grid-cols-2 gap-3.5 max-[680px]:grid-cols-1">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="mb-1.5 block text-[14px] font-medium text-[var(--white)]/85"
                    >
                      Your name
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Karthik Sundar"
                      className="w-full rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-3 text-[15px] text-[var(--white)] placeholder:text-[var(--white)]/45"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="mb-1.5 block text-[14px] font-medium text-[var(--white)]/85"
                    >
                      Phone number (+91)
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98403 84824"
                      className="w-full rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-3 text-[15px] text-[var(--white)] placeholder:text-[var(--white)]/45 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-locality"
                    className="mb-1.5 block text-[14px] font-medium text-[var(--white)]/85"
                  >
                    Area in Chennai
                  </label>
                  <select
                    id="enquiry-locality"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-3 text-[15px] text-[var(--white)]"
                  >
                    {CHENNAI_LOCALITIES.map((loc) => (
                      <option
                        key={loc}
                        value={loc}
                        className="bg-[var(--ink-2)] text-[var(--white)]"
                      >
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3.5 max-[680px]:grid-cols-1">
                  <div>
                    <label
                      htmlFor="enquiry-hometype"
                      className="mb-1.5 block text-[14px] font-medium text-[var(--white)]/85"
                    >
                      Property type
                    </label>
                    <select
                      id="enquiry-hometype"
                      value={homeType}
                      onChange={(e) => setHomeType(e.target.value)}
                      className="w-full rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-3 text-[15px] text-[var(--white)]"
                    >
                      <option value="2BHK Apartment">2BHK apartment</option>
                      <option value="3BHK Apartment">3BHK apartment</option>
                      <option value="Independent House / Villa">Independent house / villa</option>
                      <option value="Shop / Commercial Space">Shop / commercial space</option>
                      <option value="Home Renovation">Home renovation</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-scope"
                      className="mb-1.5 block text-[14px] font-medium text-[var(--white)]/85"
                    >
                      What you need
                    </label>
                    <select
                      id="enquiry-scope"
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="w-full rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-3 text-[15px] text-[var(--white)]"
                    >
                      <option value="Full Home Interiors">Full home interiors</option>
                      <option value="Modular Kitchen">Modular kitchen</option>
                      <option value="Wardrobes and Bedrooms">Wardrobes and bedrooms</option>
                      <option value="Pooja Room / TV Unit">Pooja room / TV unit</option>
                      <option value="Shop / Commercial Interiors">
                        Shop / commercial interiors
                      </option>
                      <option value="Visit Kundrathur Workshop">Visit Kundrathur workshop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-notes"
                    className="mb-1.5 block text-[14px] font-medium text-[var(--white)]/85"
                  >
                    Anything else? (Optional)
                  </label>
                  <textarea
                    id="enquiry-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Getting keys next month, looking for kitchen and 3 wardrobes"
                    className="w-full resize-none rounded-[10px] border border-[var(--line-dark)] bg-[var(--ink-2)] px-3.5 py-2.5 text-[15px] text-[var(--white)] placeholder:text-[var(--white)]/45"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-[10px] border border-[var(--accent-border)] bg-[var(--accent-wash)] px-3.5 py-2.5 text-[15px] font-medium text-[var(--white)]"
                  >
                    {error}
                  </p>
                )}

                <button type="submit" className="btn-pink btn-lg mt-2 w-full">
                  <ChatCircleText size={18} weight="fill" aria-hidden="true" />
                  <span>Send free enquiry</span>
                </button>

                <p className="text-center text-[13.5px] text-[var(--white)]/65">
                  {CONTACT_INFO.addressLine1}, Kundrathur, Kavanur · {CONTACT_INFO.hours}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
