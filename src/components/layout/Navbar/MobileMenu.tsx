'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  whatsappHref: string;
  phone: string;
}

// Overlay fullscreen, glassmorphism sobre el fondo de marca. Los links
// entran escalonados (stagger). Se cierra al tocar un link O al tocar
// cualquier zona vacía del overlay (backdrop) — pero NO al tocar el panel
// de contenido en sí, para que no se cierre por accidente al tocar cerca
// de un link. "h-[100dvh]" en vez de depender solo de "inset-0" cubre el
// viewport real en iOS Safari, donde la barra de navegación dinámica
// hace que 100vh no siempre sea el alto visible real.

export default function MobileMenu({ open, onClose, links, whatsappHref, phone }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          onClick={onClose}
          className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col justify-center overflow-y-auto bg-base-black/97 px-8 backdrop-blur-glass md:hidden"
        >
          {/* stopPropagation: tocar el contenido no debe cerrar el menú,
              solo tocar el fondo vacío (backdrop) o un link */}
          <div onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-base-surface py-4 font-display text-4xl text-neutral-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + links.length * 0.06, duration: 0.5 }}
              className="mt-10 flex flex-col gap-3"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-6 py-4 text-center font-ui text-base font-medium text-base-black"
              >
                Consultar por WhatsApp
              </a>
              <span className="text-center font-ui text-sm text-neutral-white/50">{phone}</span>
            </motion.div>
          </div>

          {/* Botón de cierre explícito además del backdrop, por accesibilidad
              (algunos usuarios no descubren que tocar afuera cierra) */}
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-base-surface text-neutral-white"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
