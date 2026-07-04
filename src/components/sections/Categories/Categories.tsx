'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useHasMounted } from '@/hooks/useHasMounted';
import { categories as seedCategories } from '@/data/categories';
import TiltCard from './TiltCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Título con mask reveal disparado por GSAP ScrollTrigger (a diferencia de
// AboutUs, que usa whileInView de Framer Motion) — variamos la herramienta
// a propósito entre secciones para no repetir siempre el mismo mecanismo,
// tal como pediste ("muchísimas animaciones, pero con criterio").

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mounted = useHasMounted();
  const storeCategories = useAdminStore((s) => s.categories);
  const categories = mounted ? storeCategories : seedCategories;

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="categorias"
      ref={sectionRef}
      className="relative bg-base-black px-6 py-section-mobile md:px-16 md:py-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 overflow-hidden md:mb-20">
          <h2 ref={titleRef} className="font-display text-section-title text-neutral-white">
            Categorías
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <TiltCard key={category.slug} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
