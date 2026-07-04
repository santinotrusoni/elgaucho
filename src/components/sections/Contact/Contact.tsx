'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { BUSINESS, getWhatsappLink } from '@/lib/constants';

// Mapa vía el embed público de Google Maps (sin API key: funciona con la
// URL "output=embed"). No hay formulario de contacto con backend propio —
// dado que no hay carrito/checkout en el sitio, todo el contacto real
// pasa por WhatsApp, que es el canal que el negocio ya usa. Si más
// adelante se quiere un formulario con envío de mail, se resuelve en la
// Parte 11 con un route handler + servicio de email (Resend, etc.).

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  BUSINESS.address,
)}&output=embed`;

export default function Contact() {
  return (
    <section id="contacto" className="relative bg-base-black px-6 py-section-mobile md:px-16 md:py-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-section-title text-neutral-white">Visitanos</h2>

          <div className="mt-8 flex flex-col gap-6">
            <InfoRow icon={MapPin} label="Dirección" value={BUSINESS.address} />
            <InfoRow icon={Phone} label="Teléfono" value={BUSINESS.phone} />
            <InfoRow icon={Clock} label="Horario" value="Lun a Sáb de 9 a 20hs" />
          </div>

          <a
            href={getWhatsappLink('Consulta general')}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="mt-10 inline-block rounded-full bg-accent px-8 py-4 font-ui text-sm font-semibold text-base-black transition-transform hover:scale-[1.02]"
          >
            Escribinos por WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 grayscale transition-all duration-500 hover:grayscale-0 md:h-full"
        >
          <iframe
            src={MAPS_EMBED_SRC}
            title="Ubicación de Pet Shop El Gaucho"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
      <div>
        <div className="font-ui text-xs uppercase tracking-widest text-neutral-white/40">
          {label}
        </div>
        <div className="font-body text-base text-neutral-white/90">{value}</div>
      </div>
    </div>
  );
}
