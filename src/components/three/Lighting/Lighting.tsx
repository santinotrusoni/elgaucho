'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Traduce el "guión de luz" de la Parte 1: arranca frío/neutro (apertura
// cinemática) y pasa a cálido (terracota de marca) a medida que avanza el
// scroll, coincidiendo con la entrada del gato y la transición de fondo.
// Sombras suaves: keyLight proyecta sombra con mapSize alto + bias ajustado
// para evitar "shadow acne", y el renderer usa PCFSoftShadowMap (ver Scene.tsx).

interface LightingProps {
  progress: number; // 0 a 1
}

const COOL = new THREE.Color('#9fb8ff');
const WARM = new THREE.Color('#F0B37E');

export default function Lighting({ progress }: LightingProps) {
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (keyLight.current) {
      const mixed = COOL.clone().lerp(WARM, Math.min(progress * 1.4, 1));
      keyLight.current.color.copy(mixed);
    }
    if (rimLight.current) {
      rimLight.current.intensity = THREE.MathUtils.lerp(
        0,
        1.8,
        Math.max(0, (progress - 0.3) / 0.7),
      );
    }
  });

  return (
    <>
      <directionalLight
        ref={keyLight}
        position={[-4, 5, 3]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
        shadow-radius={4}
      />
      {/* Luz de relleno suave desde el frente-abajo: evita que las sombras
          del lado opuesto al key light queden totalmente negras — look
          más "cinematográfico/estudio" en vez de contraste duro. */}
      <directionalLight position={[2, 1.5, 4]} intensity={0.35} color="#FFF3E6" />
      <ambientLight intensity={0.55} />
      <pointLight ref={rimLight} position={[3, 2, -2]} color="#D99058" intensity={0} distance={15} />
    </>
  );
}
