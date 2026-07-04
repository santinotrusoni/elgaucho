'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GalleryItem as GalleryItemType } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItemProps {
  item: GalleryItemType;
  className?: string;
}

// Cada efecto parte de un estado inicial distinto y anima hacia el estado
// "neutro" (opacity 1, sin transform) a medida que la imagen entra en
// viewport. "scrub: false" + toggleActions: se anima una vez, no atado
// 1:1 al scroll — así se siente como reveal cinematográfico, no como
// parallax continuo (eso ya lo tiene Sobre Nosotros).

const EFFECT_FROM: Record<GalleryItemType['effect'], gsap.TweenVars> = {
  zoom: { scale: 1.35, opacity: 0 },
  rotate: { rotate: -8, scale: 1.1, opacity: 0 },
  'slide-back': { scale: 0.7, z: -200, opacity: 0 },
  deform: { skewY: 6, scaleY: 1.15, opacity: 0 },
};

export default function GalleryItem({ item, className = '' }: GalleryItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, EFFECT_FROM[item.effect], {
        scale: 1,
        rotate: 0,
        skewY: 0,
        scaleY: 1,
        z: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    return () => ctx.revert();
  }, [item.effect]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl border border-white/10 ${className}`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 90vw, 45vw"
        className="object-cover"
      />
    </div>
  );
}
