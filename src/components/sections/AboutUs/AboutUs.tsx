'use client';

import { motion } from 'framer-motion';
import Counter from '@/components/ui/Counter/Counter';
import FloatingCard from './FloatingCard';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useHasMounted } from '@/hooks/useHasMounted';

// Fotos de estilo de vida (perro/gato en movimiento, en casa, en la calle) —
// deliberadamente NADA clínico/veterinario, para sostener el tono "instinto"
// definido en el concepto creativo. Se sirven desde loremflickr.com por
// keyword: es un placeholder real y gratuito, sin necesidad de API key.
// Reemplazar por fotografía propia del local cuando esté disponible.
//
// El texto (eyebrow, título, párrafos, cifras) viene del useAdminStore,
// editable desde /admin (Parte 10). Las fotos quedan fijas por ahora —
// editar imágenes de esta sección puntual no forma parte del alcance del
// panel v1 (sí lo son las de productos y categorías).

const PHOTOS = [
  { src: 'https://loremflickr.com/800/1000/dog,running,park', alt: 'Perro corriendo en el parque' },
  { src: 'https://loremflickr.com/700/900/cat,sunlight,window', alt: 'Gato tomando sol junto a una ventana' },
  { src: 'https://loremflickr.com/750/950/dog,leash,walk,street', alt: 'Paseo con correa por la calle' },
];

export default function AboutUs() {
  const mounted = useHasMounted();
  const content = useAdminStore((s) => s.content);
  const c = mounted
    ? content
    : {
        heroTitle: '',
        heroSubtitle: '',
        aboutEyebrow: 'SOBRE NOSOTROS',
        aboutTitleLine1: 'Instinto,',
        aboutTitleLine2: 'no catálogo.',
        aboutParagraph1:
          'El Gaucho nació en Sarandí como un pet shop de barrio, y con los años se convirtió en un punto de referencia para quienes entienden que una mascota no es un accesorio: es instinto, compañía y vínculo real.',
        aboutParagraph2:
          'Elegimos cada producto pensando en eso. No vendemos por vender — asesoramos, probamos, conocemos a los animales que van a usar lo que ofrecemos.',
        statYears: 15,
        statClients: 3200,
        statBrands: 40,
      };

  const stats = [
    { value: c.statYears, suffix: '+', label: 'Años de trayectoria' },
    { value: c.statClients, suffix: '+', label: 'Clientes fieles' },
    { value: c.statBrands, suffix: '+', label: 'Marcas premium' },
  ];
  const titleLines = [c.aboutTitleLine1, c.aboutTitleLine2];
  const paragraphs = [c.aboutParagraph1, c.aboutParagraph2];

  return (
    <section id="nosotros" className="relative overflow-hidden bg-base-black px-6 py-section-mobile md:px-16 md:py-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
        {/* Columna de texto */}
        <div className="flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-ui text-sm tracking-[0.3em] text-accent"
          >
            {c.aboutEyebrow}
          </motion.span>

          <h2 className="mt-4 font-display text-section-title text-neutral-white">
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <div className="mt-8 flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="max-w-lg font-body text-base leading-relaxed text-neutral-white/70"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <Counter key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Columna de fotos flotantes con parallax */}
        <div className="relative grid h-[520px] grid-cols-2 gap-4 md:h-[620px]">
          <FloatingCard
            src={PHOTOS[0].src}
            alt={PHOTOS[0].alt}
            className="col-span-1 row-span-2 h-full"
            parallaxRange={50}
          />
          <FloatingCard
            src={PHOTOS[1].src}
            alt={PHOTOS[1].alt}
            className="col-span-1 h-[48%] self-start"
            parallaxRange={-70}
          />
          <FloatingCard
            src={PHOTOS[2].src}
            alt={PHOTOS[2].alt}
            className="col-span-1 h-[48%] self-end"
            parallaxRange={30}
          />
        </div>
      </div>
    </section>
  );
}
