'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Este hook es el corazón del Hero: convierte el scroll físico del usuario
// (amortiguado por Lenis) en un progreso 0→1 sobre una sección "pinneada"
// de 300vh, que es lo que consumen CameraRig, Lighting, Particles y Cat.
//
// pinnedHeightVh controla cuánto scroll "dura" toda la secuencia narrativa
// del Hero antes de soltar el pin y pasar a Sobre Nosotros (Parte 5).
// pinnedHeightVh = 0 desactiva el pin por completo (usado cuando el usuario
// tiene prefers-reduced-motion activo, Parte 11): el Hero se muestra
// estático, sin animación atada al scroll.

export function useHeroScroll(pinnedHeightVh = 300) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!containerRef.current || !lenis || pinnedHeightVh === 0) return;

    // Sincroniza el ticker de ScrollTrigger con el raf de Lenis en vez del
    // scroll nativo del navegador — evita el desfase típico entre smooth
    // scroll libraries y GSAP.
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${pinnedHeightVh}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      trigger.kill();
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis, pinnedHeightVh]);

  return { containerRef, progress };
}
