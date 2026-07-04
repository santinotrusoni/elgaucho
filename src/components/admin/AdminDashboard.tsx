'use client';

import { useState } from 'react';
import { LayoutGrid, Package, Type, RotateCcw } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import ProductsManager from './ProductsManager';
import CategoriesManager from './CategoriesManager';
import ContentManager from './ContentManager';

type Tab = 'productos' | 'categorias' | 'contenido';

const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'productos', label: 'Productos', icon: Package },
  { id: 'categorias', label: 'Categorías', icon: LayoutGrid },
  { id: 'contenido', label: 'Textos y banners', icon: Type },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('productos');
  const resetToDefaults = useAdminStore((s) => s.resetToDefaults);

  function handleReset() {
    if (confirm('Esto restaura productos, categorías y textos a los valores originales. ¿Continuar?')) {
      resetToDefaults();
    }
  }

  return (
    <div className="min-h-screen bg-base-black text-neutral-white">
      <div className="flex flex-col md:flex-row">
        <aside className="flex shrink-0 flex-row gap-2 overflow-x-auto border-b border-white/10 p-4 md:h-screen md:w-64 md:flex-col md:border-b-0 md:border-r md:p-6">
          <div className="mb-6 hidden md:block">
            <span className="font-display text-lg">EL GAUCHO</span>
            <p className="mt-1 font-ui text-xs text-neutral-white/40">Panel administrador</p>
          </div>

          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 font-ui text-sm transition-colors ${
                tab === t.id
                  ? 'bg-accent text-base-black'
                  : 'text-neutral-white/60 hover:bg-white/5 hover:text-neutral-white'
              }`}
            >
              <t.icon className="h-4 w-4" strokeWidth={1.5} />
              {t.label}
            </button>
          ))}

          <button
            onClick={handleReset}
            className="mt-auto flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 font-ui text-sm text-neutral-white/40 transition-colors hover:bg-white/5 hover:text-red-400"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            Restaurar valores originales
          </button>

          <a
            href="/"
            target="_blank"
            className="hidden font-ui text-xs text-neutral-white/30 hover:text-neutral-white/60 md:block md:mt-4"
          >
            Ver sitio →
          </a>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          {tab === 'productos' && <ProductsManager />}
          {tab === 'categorias' && <CategoriesManager />}
          {tab === 'contenido' && <ContentManager />}
        </main>
      </div>
    </div>
  );
}
