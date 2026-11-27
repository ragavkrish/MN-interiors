import { useCallback, useEffect, useState } from 'react';
import { PROJECTS } from '../data/content';

const HASH_PREFIX = '#project=';

const readProjectFromHash = () => {
  const { hash } = window.location;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const id = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  return PROJECTS.some((p) => p.id === id) ? id : null;
};

/**
 * Keeps the open project in the URL (`#project=<id>`) so a project can be shared as a link,
 * and the phone/browser Back button closes the project view instead of leaving the site.
 */
export function useProjectRoute() {
  const [projectId, setProjectId] = useState<string | null>(() => readProjectFromHash());

  useEffect(() => {
    const sync = () => setProjectId(readProjectFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const openProject = useCallback((id: string) => {
    if (readProjectFromHash() === id) return;
    window.history.pushState({ mnProject: id }, '', `${HASH_PREFIX}${encodeURIComponent(id)}`);
    setProjectId(id);
  }, []);

  const closeProject = useCallback(() => {
    if (window.history.state?.mnProject) {
      // We opened it: step back so Back/Forward stay natural (popstate clears the id).
      window.history.back();
    } else {
      // Arrived via a shared link: drop the hash without leaving the page.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setProjectId(null);
    }
  }, []);

  return { projectId, openProject, closeProject };
}
