import { useEffect } from 'react';

/**
 * One-time scroll entrances for elements marked `data-reveal` (single block)
 * or `data-reveal-group` (children stagger in). Each element animates once,
 * when its top edge enters the lower viewport. Elements already visible or
 * scrolled past on mount are revealed immediately so nothing is ever stuck hidden.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group]'),
    );

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
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );

    const revealThresholdY = window.innerHeight * 0.92;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < revealThresholdY) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
}
