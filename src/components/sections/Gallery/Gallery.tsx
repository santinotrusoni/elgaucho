'use client';

import { galleryItems } from '@/data/gallery';
import GalleryItem from './GalleryItem';

// Grid deliberadamente asimétrico (tamaños y alturas distintas) para que
// NO se sienta como una galería de e-commerce estándar. Definido a mano,
// no generado — cada imagen ocupa el espacio que mejor sirve a su efecto
// (ej: "deform" se ve mejor en formatos anchos, "slide-back" en verticales).

export default function Gallery() {
  return (
    <section id="galeria" className="relative bg-base-black px-6 py-section-mobile md:px-16 md:py-section">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-end justify-between md:mb-20">
          <h2 className="font-display text-section-title text-neutral-white">Galería</h2>
          <span className="hidden font-ui text-sm text-neutral-white/40 md:block">
            Instinto capturado
          </span>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-6 md:gap-6">
          <GalleryItem item={galleryItems[0]} className="col-span-2 row-span-3 md:col-span-2 md:row-span-3" />
          <GalleryItem item={galleryItems[1]} className="col-span-1 row-span-2 md:col-span-2 md:row-span-2" />
          <GalleryItem item={galleryItems[2]} className="col-span-1 row-span-2 md:col-span-2 md:row-span-2" />
          <GalleryItem item={galleryItems[3]} className="col-span-2 row-span-2 md:col-span-4 md:row-span-2" />
          <GalleryItem item={galleryItems[4]} className="col-span-1 row-span-2 md:col-span-2 md:row-span-3" />
          <GalleryItem item={galleryItems[5]} className="col-span-1 row-span-3 md:col-span-2 md:row-span-2" />
          <GalleryItem item={galleryItems[6]} className="col-span-2 row-span-2 md:col-span-2 md:row-span-2" />
          <GalleryItem item={galleryItems[7]} className="col-span-2 row-span-2 md:col-span-4 md:row-span-2" />
        </div>
      </div>
    </section>
  );
}
