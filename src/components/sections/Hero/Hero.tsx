'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useHeroScroll } from '@/hooks/useHeroScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useHasMounted } from '@/hooks/useHasMounted';

// La escena 3D (Three.js + R3F) se carga solo en cliente y de forma
// diferida (Parte 11): WebGL no puede renderizarse en el servidor, y
// separarla en su propio chunk evita que todo ese peso (three, r3f, drei)
// bloquee el bundle inicial ni el First Contentful Paint del resto del sitio.
// El fallback es instantáneo (mismo fondo negro del Hero), así que no hay
// salto visual perceptible mientras carga.
const Scene = dynamic(() => import('@/components/three/Scene/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-base-black" />,
});

// Hero de la Home. Estructura de scroll:
// - containerRef mide 300vh (definido en useHeroScroll) y queda "pinneado"
//   en pantalla mientras el usuario scrollea esos 300vh.
// - Adentro, un <div className="sticky"> mantiene la escena 3D + texto
//   fijos en el viewport mientras progress va de 0 a 1.
// - Al terminar el pin, el scroll sigue normalmente hacia Sobre Nosotros.

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { containerRef, progress } = useHeroScroll(reducedMotion ? 0 : 300);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const content = useAdminStore((s) => s.content);
  const mounted = useHasMounted();
  const heroTitle = mounted ? content.heroTitle : 'EL GAUCHO';
  const heroSubtitle = mounted
    ? content.heroSubtitle
    : 'NO VENDEMOS PRODUCTOS. ACOMPAÑAMOS INSTINTO.';

  useEffect(() => {
    // Reveal inicial del logo/nombre — mask reveal simple con GSAP,
    // no depende del scroll, corre una sola vez al montar.
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      titleRef.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.4, ease: 'power4.out' },
    ).fromTo(
      subtitleRef.current,
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out' },
      '-=0.9',
    );
    return () => {
      tl.kill();
    };
  }, []);

  // El texto principal se desvanece a medida que arranca el giro de cámara,
  // para no competir visualmente con el movimiento 3D.
  const textOpacity = Math.max(0, 1 - progress * 3.5);

  return (
    <section ref={containerRef} className="relative h-[100vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-base-black">
        <Scene progress={progress} isMobile={isMobile} />

        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textOpacity }}
        >
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="font-display text-hero-mobile text-neutral-white md:text-hero-desktop"
            >
              {heroTitle}
            </h1>
          </div>
          <div className="mt-4 overflow-hidden">
            <p ref={subtitleRef} className="font-ui text-sm tracking-[0.3em] text-neutral-white/70 md:text-base">
              {heroSubtitle}
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-ui text-xs tracking-widest text-neutral-white/50"
          style={{ opacity: textOpacity }}
        >
          SCROLL
        </div>
      </div>
    </section>
  );
}
