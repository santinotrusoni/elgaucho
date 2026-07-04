import type { Category } from '@/types';

// Contenido placeholder — imágenes servidas por keyword desde
// loremflickr.com (gratuito, sin API key). Reemplazar por fotografía
// propia del local cuando esté disponible. Se evita deliberadamente
// cualquier estética clínica/veterinaria, incluso en "medicamentos":
// se prioriza el producto (frasco, caja) por sobre la escena de consultorio.
// Contenido editable desde el panel administrador en la Parte 10.

export const categories: Category[] = [
  {
    slug: 'alimentos',
    name: 'Alimentos',
    image: 'https://loremflickr.com/900/1100/dog,food,bowl',
    description: 'Nutrición premium para cada etapa de vida.',
  },
  {
    slug: 'accesorios',
    name: 'Accesorios',
    image: 'https://loremflickr.com/900/1100/pet,accessories,leash',
    description: 'Todo lo que tu mascota necesita día a día.',
  },
  {
    slug: 'juguetes',
    name: 'Juguetes',
    image: 'https://loremflickr.com/900/1100/dog,toy,play',
    description: 'Estimulación, diversión e instinto.',
  },
  {
    slug: 'higiene',
    name: 'Higiene',
    image: 'https://loremflickr.com/900/1100/dog,bath,grooming',
    description: 'Cuidado y bienestar diario.',
  },
  {
    slug: 'medicamentos',
    name: 'Medicamentos',
    image: 'https://loremflickr.com/900/1100/pills,bottle,product',
    description: 'Salud respaldada por profesionales.',
  },
  {
    slug: 'correas-collares',
    name: 'Correas y Collares',
    image: 'https://loremflickr.com/900/1100/dog,collar,walk',
    description: 'Seguridad y estilo en cada paseo.',
  },
  {
    slug: 'camas',
    name: 'Camas',
    image: 'https://loremflickr.com/900/1100/dog,bed,cozy',
    description: 'Descanso a la altura de tu mascota.',
  },
];
