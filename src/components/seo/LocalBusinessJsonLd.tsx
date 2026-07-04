import { SITE_CONFIG, BUSINESS } from '@/lib/constants';

// Structured data (Parte 11): le da a Google datos estructurados del
// negocio para que pueda mostrar rich snippets (dirección, teléfono,
// horario) directamente en resultados de búsqueda y Google Maps.
export default function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    name: BUSINESS.name,
    image: `${SITE_CONFIG.url}/images/og-cover.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gral. Acha 188',
      addressLocality: 'Sarandí',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    telephone: BUSINESS.phone,
    url: SITE_CONFIG.url,
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
