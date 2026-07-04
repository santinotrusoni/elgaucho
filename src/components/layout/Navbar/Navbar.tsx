'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { BUSINESS, getWhatsappLink } from '@/lib/constants';
import MobileMenu from './MobileMenu';

// Navbar flotante, siempre visible sobre el Hero (fondo transparente al
// tope de la página) y con glassmorphism progresivo apenas el usuario
// empieza a scrollear — así nunca compite con la escena 3D del Hero pero
// gana legibilidad sobre el resto de las secciones.

const NAV_LINKS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Productos', href: '#productos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Bloquea el scroll del body mientras el menú mobile está abierto.
  //
  // NOTA IMPORTANTE: se probó la técnica de fijar el body con
  // "position: fixed" (más robusta para el bug de rubber-band de iOS),
  // pero generaba un crash real: el Hero tiene su sección "pinneada" por
  // GSAP ScrollTrigger, y mover el body con position:fixed mientras ese
  // pin está activo hace que GSAP y React compitan por la misma parte del
  // DOM, tirando "NotFoundError: insertBefore" y rompiendo toda la app.
  // Se vuelve a la técnica simple (menos perfecta en iOS, pero estable).
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-4 mt-4 flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 md:mx-8 md:mt-6 md:px-8 ${
            scrolled
              ? 'border border-white/10 bg-base-black/60 shadow-glow-sm backdrop-blur-glass'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="#top" data-magnetic className="font-display text-lg tracking-tight text-neutral-white">
            EL GAUCHO
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={getWhatsappLink('Consulta general')}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="hidden rounded-full bg-accent px-5 py-2 font-ui text-sm font-medium text-base-black transition-transform hover:scale-105 md:block"
            >
              WhatsApp
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              data-magnetic
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-[1.5px] w-5 bg-neutral-white transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-5 bg-neutral-white transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        whatsappHref={getWhatsappLink('Consulta general')}
        phone={BUSINESS.phone}
      />
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      data-magnetic
      className="group relative font-ui text-sm text-neutral-white/80 transition-colors hover:text-neutral-white"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
