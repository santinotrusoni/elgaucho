import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CustomCursor from '@/components/providers/CustomCursor';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';

// FUENTES (Parte 11) — Neue Montreal y Satoshi son de pago y no están
// disponibles sin acceso a internet en este entorno. Se usa como
// sustituto libre y visualmente cercano Bricolage Grotesque (geométrica,
// misma familia de personalidad) para display, e Inter para texto/UI —
// ambas cargadas vía next/font/google: se auto-hostean en el build (cero
// requests externos en runtime) y no generan layout shift.
//
// Para usar las fuentes reales de marca: comprar/descargar los .woff2 de
// Neue Montreal y Satoshi, ponerlos en /public/fonts, y reemplazar estos
// imports por next/font/local apuntando a esos archivos. El resto del
// sitio ya consume las variables --font-display / --font-body / --font-ui
// vía Tailwind (ver tailwind.config.ts), así que el cambio es solo acá.

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'pet shop',
    'veterinaria',
    'accesorios para mascotas',
    'alimento para perros',
    'alimento para gatos',
    'Sarandí',
    'Avellaneda',
    'Buenos Aires',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={`dark ${bricolage.variable} ${inter.variable}`}>
      <body>
        {/* Skip link (Parte 11 — accesibilidad): invisible hasta que se navega
            con teclado (focus), le permite a un usuario de lector de pantalla
            o teclado saltar directo al contenido sin pasar por todo el navbar. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-ui focus:text-sm focus:font-medium focus:text-base-black"
        >
          Saltar al contenido principal
        </a>
        <LocalBusinessJsonLd />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
