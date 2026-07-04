'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import type { Category } from '@/types';

const emptyCategory: Category = {
  slug: '',
  name: '',
  image: '',
  description: '',
};

export default function CategoriesManager() {
  const categories = useAdminStore((s) => s.categories);
  const addCategory = useAdminStore((s) => s.addCategory);
  const updateCategory = useAdminStore((s) => s.updateCategory);
  const deleteCategory = useAdminStore((s) => s.deleteCategory);

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Category>(emptyCategory);
  const [showForm, setShowForm] = useState(false);

  function openNew() {
    setForm(emptyCategory);
    setEditingSlug(null);
    setShowForm(true);
  }

  function openEdit(category: Category) {
    setForm(category);
    setEditingSlug(category.slug);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    if (editingSlug) {
      updateCategory(editingSlug, { ...form, slug });
    } else {
      addCategory({ ...form, slug } as Category);
    }
    setShowForm(false);
  }

  function handleDelete(slug: string, name: string) {
    if (confirm(`¿Eliminar la categoría "${name}"? Los productos que la usan quedarán sin categoría válida.`)) {
      deleteCategory(slug);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl">Categorías ({categories.length})</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-ui text-sm font-medium text-base-black"
        >
          <Plus className="h-4 w-4" /> Nueva categoría
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.slug} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-ui text-sm font-medium">{c.name}</h3>
                <p className="mt-1 line-clamp-2 font-ui text-xs text-neutral-white/40">
                  {c.description}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => openEdit(c)}
                  className="rounded-lg p-2 text-neutral-white/50 hover:bg-white/10 hover:text-neutral-white"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(c.slug, c.name)}
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
                {editingSlug ? 'Editar categoría' : 'Nueva categoría'}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X className="h-5 w-5 text-neutral-white/50" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">
                  Nombre
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="admin-input"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">
                  Descripción
                </span>
                <textarea
                  required
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="admin-input"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">
                  URL de imagen
                </span>
                <input
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="admin-input"
                  placeholder="https://..."
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-ui text-sm font-semibold text-base-black"
            >
              {editingSlug ? 'Guardar cambios' : 'Crear categoría'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
