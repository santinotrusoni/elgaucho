// Tipos de dominio. Se consumen desde /src/data (contenido estático)
// y más adelante desde el panel administrador (Parte 10).

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
  category: CategorySlug;
  featured?: boolean;
}

// Los slugs de categoría eran originalmente un union fijo de 7 valores,
// pero como el panel admin (Parte 10) permite crear categorías nuevas
// libremente, quedó como string abierto. Se deja el alias por claridad
// semántica en el resto del código. Slugs de referencia del seed inicial:
// 'alimentos' | 'accesorios' | 'juguetes' | 'higiene' | 'medicamentos'
// | 'correas-collares' | 'camas'
export type CategorySlug = string;

export interface Category {
  slug: CategorySlug;
  name: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  content: string;
  petName?: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  // define qué comportamiento de animación toma en la Parte 8
  effect: 'rotate' | 'zoom' | 'slide-back' | 'deform';
}
