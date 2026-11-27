import { useSyncExternalStore } from 'react';

/** Live `matchMedia` result, e.g. useMediaQuery('(max-width: 767px)') */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
