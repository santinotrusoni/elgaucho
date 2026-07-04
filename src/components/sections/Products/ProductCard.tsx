'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Product } from '@/types';
import { getWhatsappLink } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  index: number;
}

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

// Tilt más sutil que el de Categorías (acá el protagonista es la info del
// producto, no el efecto) + glass real sobre la card + sombra profunda.
// El botón de WhatsApp abre el link con el mensaje pre-armado del brief,
// generado por getWhatsappLink() — una sola fuente de verdad para el texto.

export default function ProductCard({ product, index }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), spring);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-glass transition-shadow duration-500 hover:shadow-glow-sm"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 90vw, 320px"
            className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.08]"
          />
          {product.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-ui text-xs font-medium text-base-black">
              Destacado
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="font-display text-xl text-neutral-white">{product.name}</h3>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-neutral-white/60">
            {product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-display text-2xl text-neutral-white">
              {currencyFormatter.format(product.price)}
            </span>
          </div>

          <a
            href={getWhatsappLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="mt-5 flex items-center justify-center rounded-full bg-accent px-6 py-4 text-center font-ui text-sm font-semibold text-base-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
