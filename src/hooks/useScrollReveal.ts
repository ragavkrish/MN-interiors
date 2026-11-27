import { useEffect } from 'react';

/**
 * Reveals `.reveal-stack` / `.reveal-grid` containers once, the first time
 * they scroll into view, by setting `data-visible`. The CSS in index.css
 * owns the actual motion. Fires once — re-animating on every scroll-by is
 * an interface fighting its reader.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal-stack, .reveal-grid');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-visible', ''));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-visible', '');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
