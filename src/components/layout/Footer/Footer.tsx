'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';
import { BUSINESS, SITE_CONFIG } from '@/lib/constants';

// Última pieza del storytelling de scroll: el ritmo ya bajó por completo
// (Beneficios, Testimonios, Contacto). El footer no introduce movimiento
// nuevo — solo un fade-up simple, como "salida de escena" tranquila.

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8 }}
      className="border-t border-white/10 bg-base-black px-6 py-12 md:px-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display text-lg text-neutral-white">EL GAUCHO</span>
          <p className="mt-2 max-w-xs font-body text-sm text-neutral-white/50">
            {BUSINESS.address} — {BUSINESS.phone}
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Instagram"
            data-magnetic
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-white/70 transition-colors hover:border-accent hover:text-accent"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            data-magnetic
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-white/70 transition-colors hover:border-accent hover:text-accent"
          >
            <Facebook className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <p className="font-ui text-xs text-neutral-white/30">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Todos los derechos reservados.
        </p>
      </div>
    </motion.footer>
  );
}
