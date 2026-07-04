'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, Category } from '@/types';
import { products as seedProducts } from '@/data/products';
import { categories as seedCategories } from '@/data/categories';

// ESTE STORE ES EL "BACKEND" DEL PANEL ADMINISTRADOR.
//
// Importante para quien continúe el proyecto: esto persiste en
// localStorage del navegador, NO en una base de datos real. Es la
// solución correcta para este entorno de desarrollo (sin acceso a
// internet, sin posibilidad de levantar Postgres/Supabase acá), y
// funciona perfecto para un demo o una v1 de uso interno en una sola
// computadora. Para producción real (que el dueño edite desde su
// celular y los cambios se vean en el sitio público para todos los
// visitantes), este store se reemplaza por llamadas a una API con
// una base de datos real — la forma de los datos (Product, Category)
// y las acciones (addProduct, updateProduct, etc.) quedarían iguales,
// así que migrar no implica rehacer el panel, solo cambiar de dónde
// vienen y a dónde van los datos.

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutEyebrow: string;
  aboutTitleLine1: string;
  aboutTitleLine2: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  statYears: number;
  statClients: number;
  statBrands: number;
}

const defaultContent: SiteContent = {
  heroTitle: 'EL GAUCHO',
  heroSubtitle: 'NO VENDEMOS PRODUCTOS. ACOMPAÑAMOS INSTINTO.',
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

interface AdminStore {
  products: Product[];
  categories: Category[];
  content: SiteContent;

  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  addCategory: (category: Category) => void;
  updateCategory: (slug: string, patch: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;

  updateContent: (patch: Partial<SiteContent>) => void;

  resetToDefaults: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      products: seedProducts,
      categories: seedCategories,
      content: defaultContent,

      addProduct: (product) => set((s) => ({ products: [...s.products, product] })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      addCategory: (category) => set((s) => ({ categories: [...s.categories, category] })),
      updateCategory: (slug, patch) =>
        set((s) => ({
          categories: s.categories.map((c) => (c.slug === slug ? { ...c, ...patch } : c)),
        })),
      deleteCategory: (slug) =>
        set((s) => ({ categories: s.categories.filter((c) => c.slug !== slug) })),

      updateContent: (patch) => set((s) => ({ content: { ...s.content, ...patch } })),

      resetToDefaults: () =>
        set({ products: seedProducts, categories: seedCategories, content: defaultContent }),
    }),
    { name: 'el-gaucho-admin-store' },
  ),
);
