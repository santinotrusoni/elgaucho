'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

// Provider único de scroll suave para toda la app.
// GSAP ScrollTrigger se sincroniza contra esta misma instancia de Lenis
// (eso se conecta en la Parte 3/4 cuando se agreguen las animaciones reales).

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo — sensación "cinemática"
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      instance.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>{children}</SmoothScrollContext.Provider>
  );
}
