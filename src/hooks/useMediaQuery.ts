'use client';

import { useEffect, useState } from 'react';

// Hook base para decisiones responsive en componentes 3D/animados
// (ej: reducir partículas o desactivar ciertos efectos en mobile).
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    listener();
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
