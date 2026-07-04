'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { useHasMounted } from '@/hooks/useHasMounted';
import { products as seedProducts } from '@/data/products';
import { categories as seedCategories } from '@/data/categories';
import ProductCard from './ProductCard';

// Filtro por categoría con AnimatePresence: al cambiar de categoría, las
// cards salen y entran animadas en vez de simplemente desaparecer — refuerza
// la sensación "premium" incluso en una interacción puramente funcional.
//
// Los datos vienen del useAdminStore (editable desde /admin, Parte 10).
// Hasta que el componente monta en cliente se usa el seed estático, para
// que el HTML de servidor y el primer render de cliente coincidan.

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const mounted = useHasMounted();
  const storeProducts = useAdminStore((s) => s.products);
  const storeCategories = useAdminStore((s) => s.categories);

  const products = mounted ? storeProducts : seedProducts;
  const categories = mounted ? storeCategories : seedCategories;

  const filtered = useMemo(() => {
    if (activeCategory === 'todos') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const usedCategories = categories.filter((c) => products.some((p) => p.category === c.slug));

  return (
    <section id="productos" className="relative bg-base-black px-6 py-section-mobile md:px-16 md:py-section">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-section-title text-neutral-white">Productos</h2>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="Todos"
              active={activeCategory === 'todos'}
              onClick={() => setActiveCategory('todos')}
            />
            {usedCategories.map((c) => (
              <FilterPill
                key={c.slug}
                label={c.name}
                active={activeCategory === c.slug}
                onClick={() => setActiveCategory(c.slug)}
              />
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-ui text-sm text-neutral-white/40">
            No hay productos en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-magnetic
      className={`rounded-full border px-4 py-2 font-ui text-sm transition-colors duration-300 ${
        active
          ? 'border-accent bg-accent text-base-black'
          : 'border-white/15 text-neutral-white/70 hover:border-white/30 hover:text-neutral-white'
      }`}
    >
      {label}
    </button>
  );
}
