import type { Metadata } from 'next';
import AdminGate from '@/components/admin/AdminGate';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Panel administrador (Parte 10) — CRUD completo de productos, categorías
// y textos/banners, sin tocar código. Ruta protegida por AdminGate y
// marcada noindex para que nunca aparezca en buscadores.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Panel Administrador',
};

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}
