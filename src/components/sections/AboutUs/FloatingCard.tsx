'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface FloatingCardProps {
  src: string;
  alt: string;
  className?: string;
  parallaxRange?: number; // píxeles que se mueve la card entre el inicio y el fin del scroll de la sección
}

// Cada card se mueve a su propia velocidad respecto del scroll del contenedor
// padre (Sobre Nosotros) — eso genera la sensación de profundidad/capas
// definida en la Parte 1, sin depender de una librería de parallax externa.

export default function FloatingCard({ src, alt, className = '', parallaxRange = 60 }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 60vw, 320px" className="object-cover" />
    </motion.div>
  );
}
