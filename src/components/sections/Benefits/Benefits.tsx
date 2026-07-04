'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';

// Primera sección del "cierre" del storytelling de scroll (Parte 1): el
// ritmo visual baja respecto de la Galería. Sin 3D, sin tilt agresivo —
// solo fade-up escalonado, sobrio y confiado.

const BENEFITS = [
  {
    icon: Truck,
    title: 'Envíos a domicilio',
    description: 'Coordinamos entrega en Sarandí y alrededores.',
  },
  {
    icon: ShieldCheck,
    title: 'Productos certificados',
    description: 'Marcas premium con respaldo veterinario.',
  },
  {
    icon: MessageCircle,
    title: 'Asesoramiento real',
    description: 'Te ayudamos a elegir, no solo a comprar.',
  },
  {
    icon: Sparkles,
    title: '15+ años de trayectoria',
    description: 'Un pet shop de barrio que se ganó la confianza.',
  },
];

export default function Benefits() {
  return (
    <section className="relative bg-base-black px-6 py-section-mobile md:px-16 md:py-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <benefit.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <h3 className="font-display text-lg text-neutral-white">{benefit.title}</h3>
              <p className="font-body text-sm leading-relaxed text-neutral-white/60">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
