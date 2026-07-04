'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import type { Product, CategorySlug } from '@/types';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  slug: '',
  price: 0,
  description: '',
  image: '',
  category: 'alimentos',
  featured: false,
};

export default function ProductsManager() {
  const products = useAdminStore((s) => s.products);
  const categories = useAdminStore((s) => s.categories);
  const addProduct = useAdminStore((s) => s.addProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct);
  const [showForm, setShowForm] = useState(false);

  function openNew() {
    setForm(emptyProduct);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    const { id, ...rest } = product;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    if (editingId) {
      updateProduct(editingId, { ...form, slug });
    } else {
      addProduct({ ...form, slug, id: `p-${Date.now()}` });
    }
    setShowForm(false);
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      deleteProduct(id);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl">Productos ({products.length})</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-ui text-sm font-medium text-base-black"
        >
          <Plus className="h-4 w-4" /> Nuevo producto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-ui text-sm font-medium">{p.name}</h3>
                <p className="mt-1 font-ui text-xs text-neutral-white/40">
                  {categories.find((c) => c.slug === p.category)?.name ?? p.category}
                </p>
                <p className="mt-2 font-display text-lg">{currencyFormatter.format(p.price)}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => openEdit(p)}
                  className="rounded-lg p-2 text-neutral-white/50 hover:bg-white/10 hover:text-neutral-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="rounded-lg p-2 text-neutral-white/50 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={handleSubmit}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-base-dark p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">
                {editingId ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X className="h-5 w-5 text-neutral-white/50" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Field label="Nombre">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="admin-input"
                />
              </Field>

              <Field label="Precio (ARS)">
                <input
                  required
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="admin-input"
                />
              </Field>

              <Field label="Descripción">
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="admin-input"
                />
              </Field>

              <Field label="URL de imagen">
                <input
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="admin-input"
                  placeholder="https://..."
                />
              </Field>

              <Field label="Categoría">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as CategorySlug })}
                  className="admin-input"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>

              <label className="flex items-center gap-2 font-ui text-sm text-neutral-white/70">
                <input
                  type="checkbox"
                  checked={form.featured ?? false}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Destacado
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-ui text-sm font-semibold text-base-black"
            >
              {editingId ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">{label}</span>
      {children}
    </label>
  );
}
