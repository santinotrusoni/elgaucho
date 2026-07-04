'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Cursor custom: un punto pequeño que sigue el mouse 1:1, más un anillo
// que lo persigue con lag (sensación "premium"). Cuando el mouse entra en
// un elemento con [data-magnetic], el anillo se agranda y el elemento se
// atrae levemente hacia el cursor (efecto magnético real, no solo visual).
//
// Se monta una sola vez en el layout raíz. En mobile/touch no se renderiza
// (no tiene sentido un cursor custom sin mouse).

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringPos = { x: 0, y: 0 };
    let magneticEl: HTMLElement | null = null;

    const onMouseMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });

      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        gsap.to(magneticEl, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
        ringPos.x = cx + dx * 0.5;
        ringPos.y = cy + dy * 0.5;
      } else {
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
      }
    };

    const raf = () => {
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    const attachMagnetic = () => {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          magneticEl = el;
          gsap.to(ring, { scale: 2.4, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          if (magneticEl === el) {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            magneticEl = null;
          }
          gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
    };

    // Reintenta el attach por si el DOM de la sección se monta después
    // (ej: Navbar que aparece con delay, secciones lazy).
    attachMagnetic();
    const observer = new MutationObserver(attachMagnetic);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-white/40"
      />
    </div>
  );
}
