import { useEffect } from 'react';

/**
 * One-time scroll entrances for elements marked `data-reveal` (single block)
 * or `data-reveal-group` (children stagger in). Each element animates once,
 * when its top edge is 15% up from the bottom of the screen. Hidden state only applies once JS has run
 * (`html.reveal-ready`), so content is never lost without JavaScript.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
