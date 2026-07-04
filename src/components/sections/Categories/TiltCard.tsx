'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Category } from '@/types';

interface TiltCardProps {
  category: Category;
  index: number;
}

// Tilt 3D real: la rotación de la card sigue la posición del mouse dentro
// de sus propios límites (no un tilt genérico), con un spring para que se
// sienta física, no lineal. El glow es un radial-gradient posicionado en
// las mismas coordenadas del mouse, vía CSS custom properties.

export default function TiltCard({ category, index }: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const scale = useSpring(1, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px - 0.5);
    mouseY.set(py - 0.5);
    setGlowPos({ x: px * 100, y: py * 100 });
  }

  function handleEnter() {
    scale.set(1.03);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      <motion.a
        href={`#productos?categoria=${category.slug}`}
        data-magnetic
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-base-dark"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 90vw, 25vw"
          className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-110"
        />

        {/* glow que sigue el cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,122,0,0.35), transparent 60%)`,
          }}
        />

        {/* overlay oscuro para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-black via-base-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6" style={{ transform: 'translateZ(40px)' }}>
          <h3 className="font-display text-2xl text-neutral-white">{category.name}</h3>
          <p className="mt-1 max-w-[80%] font-ui text-sm text-neutral-white/60">
            {category.description}
          </p>
        </div>
      </motion.a>
    </motion.div>
  );
}
