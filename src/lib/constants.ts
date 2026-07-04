// Fuente única de verdad para datos del negocio.
// Nada de esto debería estar hardcodeado dentro de un componente:
// siempre se importa desde acá.

export const SITE_CONFIG = {
  name: 'Pet Shop El Gaucho',
  description:
    'Pet shop y veterinaria en Sarandí, Avellaneda. Alimentos, accesorios, juguetes, higiene y medicamentos para tu mascota.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://petshopelgaucho.com.ar',
} as const;

export const BUSINESS = {
  name: 'Pet Shop El Gaucho',
  address: 'Gral. Acha 188, Sarandí, Buenos Aires',
  phone: '011 3426-1318',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491134261318',
} as const;

// Genera el link de WhatsApp con el mensaje pre-armado definido en el brief (Parte 7)
export function getWhatsappLink(productName: string) {
  const message = `Hola! Quería consultar por el producto:\n\n"${productName}"\n\n¿Podrían pasarme más información?`;
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const COLORS = {
  black: '#F4EDE3', // fondo principal (ver nota en tailwind.config.ts sobre el nombre)
  dark: '#FFFFFF',
  white: '#2B2115',
  accent: '#D99058',
  accentDark: '#B9724A',
} as const;
