'use client';

import { useState, useEffect } from 'react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export default function ContentManager() {
  const content = useAdminStore((s) => s.content);
  const updateContent = useAdminStore((s) => s.updateContent);
  const [form, setForm] = useState(content);
  const [saved, setSaved] = useState(false);

  // Sincroniza el form si el contenido cambia desde afuera (ej: reset)
  useEffect(() => setForm(content), [content]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 font-display text-2xl">Textos y banners</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-2 font-ui text-sm font-medium text-accent">Hero (portada)</legend>
          <TextField
            label="Título principal"
            value={form.heroTitle}
            onChange={(v) => setForm({ ...form, heroTitle: v })}
          />
          <TextField
            label="Subtítulo"
            value={form.heroSubtitle}
            onChange={(v) => setForm({ ...form, heroSubtitle: v })}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <legend className="mb-2 font-ui text-sm font-medium text-accent">Sobre Nosotros</legend>
          <TextField
            label="Eyebrow (texto pequeño superior)"
            value={form.aboutEyebrow}
            onChange={(v) => setForm({ ...form, aboutEyebrow: v })}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Título — línea 1"
              value={form.aboutTitleLine1}
              onChange={(v) => setForm({ ...form, aboutTitleLine1: v })}
            />
            <TextField
              label="Título — línea 2"
              value={form.aboutTitleLine2}
              onChange={(v) => setForm({ ...form, aboutTitleLine2: v })}
            />
          </div>
          <TextArea
            label="Párrafo 1"
            value={form.aboutParagraph1}
            onChange={(v) => setForm({ ...form, aboutParagraph1: v })}
          />
          <TextArea
            label="Párrafo 2"
            value={form.aboutParagraph2}
            onChange={(v) => setForm({ ...form, aboutParagraph2: v })}
          />

          <div className="grid grid-cols-3 gap-4">
            <NumberField
              label="Años de trayectoria"
              value={form.statYears}
              onChange={(v) => setForm({ ...form, statYears: v })}
            />
            <NumberField
              label="Clientes fieles"
              value={form.statClients}
              onChange={(v) => setForm({ ...form, statClients: v })}
            />
            <NumberField
              label="Marcas premium"
              value={form.statBrands}
              onChange={(v) => setForm({ ...form, statBrands: v })}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-3 font-ui text-sm font-semibold text-base-black transition-transform hover:scale-[1.01]"
        >
          {saved ? '✓ Guardado' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="admin-input" />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">{label}</span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ui text-xs uppercase tracking-wide text-neutral-white/40">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="admin-input"
      />
    </label>
  );
}
