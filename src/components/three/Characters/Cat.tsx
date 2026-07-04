'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Reutiliza la misma lógica de patas/cola que Dog, a menor escala y con
// pelaje oscuro para generar contraste. Aparece recién cuando scrollProgress
// supera ~0.55 (ver useHeroScroll.ts) — es el "contrapunto" narrativo
// definido en el guión de scroll de la Parte 1.

interface CatProps {
  visible: boolean;
  appearProgress: number; // 0 a 1, normalizado dentro de su propia ventana de aparición
}

export default function Cat({ visible, appearProgress }: CatProps) {
  const group = useRef<THREE.Group>(null);
  const legs = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    legs.current.forEach((leg, i) => {
      if (!leg) return;
      const phase = i % 2 === 0 ? 0 : Math.PI;
      leg.rotation.x = Math.sin(t * 5 + phase) * 0.5;
    });

    if (group.current) {
      const x = THREE.MathUtils.lerp(-4, -1.8, appearProgress);
      group.current.position.x = x;
      group.current.scale.setScalar(0.55 * appearProgress);
    }
  });

  if (!visible) return null;

  const color = '#2C2C2A';
  const legPositions: [number, number, number][] = [
    [0.6, 0, 0.2],
    [0.6, 0, -0.2],
    [-0.6, 0, 0.2],
    [-0.6, 0, -0.2],
  ];

  return (
    <group ref={group} position={[-2.5, 0, 1.5]}>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.4, 0.6, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0.85, 0.9, 0]}>
        <boxGeometry args={[0.45, 0.4, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {[-0.14, 0.14].map((z) => (
        <mesh key={z} position={[0.8, 1.2, z]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.1, 0.24, 4]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
      ))}
      {legPositions.map((pos, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) legs.current[i] = el;
          }}
          position={pos}
        >
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.14, 0.6, 0.14]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
