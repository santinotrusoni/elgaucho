'use client';

import { useEffect, useState } from 'react';

// El store del admin persiste en localStorage, que no existe durante el
// render de servidor. Los componentes públicos que leen del store lo usan
// junto a este hook: renderizan los datos "seed" hasta que el componente
// monta en cliente, y recién ahí muestran lo que haya editado el admin.
// Evita el warning de hidratación de React sin tener que deshabilitarla.
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
