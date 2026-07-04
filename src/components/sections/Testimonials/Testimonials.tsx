'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

// Carrusel horizontal con drag nativo de Framer Motion (sin librería de
// carrusel externa). El "constraints" limita el arrastre al ancho real
// del contenido, así nunca se puede arrastrar a un espacio vacío.

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-base-black px-6 py-section-mobile md:px-16 md:py-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 font-display text-section-title text-neutral-white md:mb-14">
          Lo que dicen
        </h2>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -900, right: 0 }}
        className="flex cursor-grab gap-6 px-6 active:cursor-grabbing md:px-16"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="w-[280px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:w-[340px]"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-4 w-4 ${idx < t.rating ? 'fill-accent text-accent' : 'text-white/20'}`}
                />
              ))}
            </div>
            <p className="font-body text-sm leading-relaxed text-neutral-white/80">
              &ldquo;{t.content}&rdquo;
            </p>
            <div className="mt-5 font-ui text-sm text-neutral-white/50">
              {t.authorName} {t.petName && `· ${t.petName}`}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
