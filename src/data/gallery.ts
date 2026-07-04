import type { GalleryItem } from '@/types';

// Cada imagen tiene un efecto de entrada distinto (ver GalleryItem.tsx),
// distribuidos a propósito para que el scroll de la sección nunca se sienta
// repetitivo. Placeholders vía Unsplash, sin escenas clínicas.

export const galleryItems: GalleryItem[] = [
  { id: 'g1', image: 'https://loremflickr.com/1000/1200/dog,jump,action', alt: 'Perro saltando', effect: 'zoom' },
  { id: 'g2', image: 'https://loremflickr.com/900/700/cat,portrait', alt: 'Retrato de gato', effect: 'rotate' },
  { id: 'g3', image: 'https://loremflickr.com/900/1100/dog,puppy,playing', alt: 'Cachorro jugando', effect: 'slide-back' },
  { id: 'g4', image: 'https://loremflickr.com/1100/800/dog,beach,run', alt: 'Perro corriendo en la playa', effect: 'deform' },
  { id: 'g5', image: 'https://loremflickr.com/800/1000/cat,kitten', alt: 'Gatito', effect: 'zoom' },
  { id: 'g6', image: 'https://loremflickr.com/1000/800/dog,park,autumn', alt: 'Perro en el parque en otoño', effect: 'rotate' },
  { id: 'g7', image: 'https://loremflickr.com/900/1150/dog,water,swim', alt: 'Perro en el agua', effect: 'slide-back' },
  { id: 'g8', image: 'https://loremflickr.com/950/750/cat,window,light', alt: 'Gato junto a la ventana', effect: 'deform' },
];
