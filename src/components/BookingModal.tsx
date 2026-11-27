import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { CalendarCheck, CheckCircle, MapPin, X } from '@phosphor-icons/react';
import { CHENNAI_LOCALITIES } from '../data/content';

export type BookingMode = 'audit' | 'visit';

interface BookingModalProps {
  isOpen: boolean;
  initialMode: BookingMode;
  onClose: () => void;
}

interface BookingConfirmation {
  refCode: string;
  mode: BookingMode;
  name: string;
  phone: string;
  locality: string;
  propertyType: string;
  timeline: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const summaryList: Variants = {
  hidden: {},
  shown: { transition: { delayChildren: 0.12, staggerChildren: 0.06 } },
};

const summaryItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

export function BookingModal({ isOpen, initialMode, onClose }: BookingModalProps) {
  const [mode, setMode] = useState<BookingMode>(initialMode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState(CHENNAI_LOCALITIES[0]);
  const [propertyType, setPropertyType] = useState('3BHK Apartment');
  const [timeline, setTimeline] = useState('Within 1–2 Months');
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const reduce = useReducedMotion();
  // Clearing the form waits until the close animation has finished,
  // otherwise the success screen would flash back to the form mid-exit.
  const clearOnExit = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    setMode(initialMode);
    setError(null);
    setConfirmation(null);
  }, [initialMode, isOpen]);

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
      setError('Please enter your full name.');
      return;
    }

    if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError(null);
    const randomNum = Math.floor(100 + Math.random() * 900);
    setConfirmation({
      refCode: `KAI-CHN-${randomNum}`,
      mode,
      name: trimmedName,
      phone: digitsOnly.slice(-10),
      locality,
      propertyType,
      timeline,
    });
  };

  const resetAndClose = () => {
    clearOnExit.current = true;
    onClose();
  };

  const handleExitComplete = () => {
    if (!clearOnExit.current) return;
    clearOnExit.current = false;
    setName('');
    setPhone('');
    setError(null);
    setConfirmation(null);
  };

  const title = confirmation
    ? 'YOUR SLOT IS RESERVED'
    : mode === 'audit'
      ? 'BOOK YOUR SITE AUDIT — ₹4,999'
      : 'VISIT OUR STUDIO & WORKSHOP';

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          key="booking-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onClick={resetAndClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.16, ease: 'easeOut' } }}
        >
          <motion.div
            className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-[20px] border border-white/15 bg-[#0A0A0A] p-[32px] text-white max-[680px]:p-[22px]"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.28, ease: EASE_OUT } }}
            exit={{
              opacity: 0,
              scale: reduce ? 1 : 0.98,
              transition: { duration: 0.16, ease: EASE_OUT },
            }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#F31C60] uppercase">
                  KALAIGAR INTERIORS · CHENNAI
                </p>
                <h2
                  id="booking-modal-title"
                  className="font-display mt-1.5 text-[24px] leading-[1.15] font-black tracking-[-0.5px] text-white"
                >
                  <motion.span
                    key={title}
                    className="block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
                  >
                    {title}
                  </motion.span>
                </h2>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                aria-label="Close booking dialog"
                className="flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#141414] text-white/80 transition-colors hover:bg-[#1D1D1D] hover:text-white"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {confirmation ? (
                <motion.div
                  key="confirmation"
                  className="mt-6"
                  variants={summaryList}
                  initial="hidden"
                  animate="shown"
                >
                  <motion.div
                    variants={summaryItem}
                    className="rounded-[14px] border border-[#F31C60]/40 bg-[#F31C60]/12 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="flex shrink-0"
                        initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: reduce
                            ? { duration: 0.2 }
                            : { type: 'spring', duration: 0.5, bounce: 0.3, delay: 0.05 },
                        }}
                      >
                        <CheckCircle size={28} weight="fill" className="text-[#F31C60]" />
                      </motion.span>
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.16em] text-[#F31C60] uppercase">
                          BOOKING REFERENCE
                        </p>
                        <p className="font-display text-[22px] font-black tracking-[-0.4px] text-white tabular-nums">
                          {confirmation.refCode}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-[14.5px] leading-[1.6] text-white/80">
                      Thank you, <strong className="text-white">{confirmation.name}</strong>. Our
                      senior Chennai project coordinator will call{' '}
                      <strong className="text-white tabular-nums">+91 {confirmation.phone}</strong>{' '}
                      within 4 business hours to lock your exact date and time.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={summaryItem}
                    className="mt-5 divide-y divide-white/10 rounded-[14px] border border-white/10 bg-[#141414] px-5"
                  >
                    <div className="flex items-center justify-between gap-3 py-3.5 text-[14px]">
                      <span className="text-white/55">Booking Type</span>
                      <span className="font-semibold text-white">
                        {confirmation.mode === 'audit'
                          ? 'On-Site Audit & 3D Blueprint (₹4,999)'
                          : 'Alwarpet Studio & Ambattur Tour (Free)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-3.5 text-[14px]">
                      <span className="text-white/55">Chennai Locality</span>
                      <span className="font-semibold text-white">{confirmation.locality}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-3.5 text-[14px]">
                      <span className="text-white/55">Home Scope</span>
                      <span className="font-semibold text-white">
                        {confirmation.propertyType} · {confirmation.timeline}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={summaryItem}
                    className="mt-5 flex items-start gap-2.5 rounded-[12px] border border-white/10 bg-[#141414] p-4 text-[13px] leading-[1.55] text-white/70"
                  >
                    <MapPin size={18} weight="fill" className="mt-0.5 shrink-0 text-[#F31C60]" />
                    <span>
                      <strong className="text-white">Alwarpet Experience Studio:</strong> No. 42,
                      TTK Road, Alwarpet, Chennai 600018 · Mon–Sat, 10:00 AM – 7:00 PM
                    </span>
                  </motion.div>

                  <motion.div variants={summaryItem}>
                    <button
                      type="button"
                      onClick={resetAndClose}
                      className="btn-pink btn-md mt-6 w-full"
                    >
                      Done
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                  noValidate
                  exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
                >
                  {/* Mode switcher */}
                  <div className="grid grid-cols-2 gap-2 rounded-[12px] border border-white/10 bg-[#141414] p-1.5">
                    <button
                      type="button"
                      onClick={() => setMode('audit')}
                      className={`cursor-pointer rounded-[8px] px-3 py-2.5 text-[13px] font-bold transition-colors ${
                        mode === 'audit'
                          ? 'bg-[#F31C60] text-white'
                          : 'text-white/65 hover:text-white'
                      }`}
                    >
                      Site Audit — ₹4,999
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('visit')}
                      className={`cursor-pointer rounded-[8px] px-3 py-2.5 text-[13px] font-bold transition-colors ${
                        mode === 'visit'
                          ? 'bg-[#F31C60] text-white'
                          : 'text-white/65 hover:text-white'
                      }`}
                    >
                      Workshop Visit — Free
                    </button>
                  </div>

                  <p className="text-[13.5px] leading-[1.55] text-white/65">
                    {mode === 'audit'
                      ? 'Includes Leica laser measurement, dampness scan, material sample box, 3D room concepts & locked BOQ. 100% credited to your project.'
                      : 'Tour our 18,000 sq.ft. Ambattur carpentry factory and Alwarpet Material Studio with a senior project lead before committing.'}
                  </p>

                  <div className="grid grid-cols-2 gap-3.5 max-[680px]:grid-cols-1">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                      >
                        Full Name
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arvind Krishnamurthy"
                        className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white placeholder:text-white/35"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                      >
                        Mobile Number (+91)
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98400 12345"
                        className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white placeholder:text-white/35 tabular-nums"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-locality"
                      className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                    >
                      Chennai Locality
                    </label>
                    <select
                      id="booking-locality"
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
                        htmlFor="booking-type"
                        className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                      >
                        Property Type
                      </label>
                      <select
                        id="booking-type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white"
                      >
                        <option value="3BHK Apartment">3BHK Apartment</option>
                        <option value="4BHK / Sea-Facing Penthouse">4BHK / Penthouse</option>
                        <option value="Independent Villa / Bungalow">Independent Villa</option>
                        <option value="Heritage Home Renovation">Heritage Renovation</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-timeline"
                        className="mb-1.5 block text-[12px] font-semibold tracking-[0.08em] text-white/75 uppercase"
                      >
                        Target Start
                      </label>
                      <select
                        id="booking-timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full rounded-[10px] border border-white/15 bg-[#141414] px-3.5 py-3 text-[14.5px] text-white"
                      >
                        <option value="Immediate (Keys in Hand)">Immediate (Keys in Hand)</option>
                        <option value="Within 1–2 Months">Within 1–2 Months</option>
                        <option value="3–6 Months Out">3–6 Months Out</option>
                        <option value="Planning & Comparing">Planning &amp; Comparing</option>
                      </select>
                    </div>
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
                    <CalendarCheck size={18} weight="fill" aria-hidden="true" />
                    <span>
                      {mode === 'audit'
                        ? 'Reserve Site Audit — ₹4,999'
                        : 'Schedule Free Factory Tour'}
                    </span>
                  </button>

                  <p className="text-center text-[12px] text-white/45">
                    Payable only upon site visit confirmation · Zero spam calls · Direct Kalaigar
                    Chennai team
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
