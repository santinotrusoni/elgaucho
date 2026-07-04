'use client';

import { useEffect, useState } from 'react';

// Accesibilidad (Parte 11): si el usuario tiene activado "reducir movimiento"
// en su sistema operativo, este hook lo expone para que los componentes
// pesados (Scene 3D, partículas, parallax) bajen intensidad o se desactiven,
// en vez de forzar animación a alguien que la pidió apagada explícitamente.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = () => setReduced(mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  return reduced;
}
