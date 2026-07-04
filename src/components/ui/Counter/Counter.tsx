'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

// Contador reutilizable — se usa en Sobre Nosotros (años, clientes, productos)
// y queda disponible para cualquier otra sección que necesite cifras animadas
// (ej: Beneficios, en la Parte 9).

export default function Counter({ value, suffix = '', label, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('es-AR'));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [isInView, value, duration, count]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-5xl text-neutral-white md:text-6xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <span className="mt-2 font-ui text-sm text-neutral-white/50">{label}</span>
    </div>
  );
}
