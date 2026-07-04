'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Dog from '@/components/three/Characters/Dog';
import Cat from '@/components/three/Characters/Cat';
import Particles from '@/components/three/Particles/Particles';
import Lighting from '@/components/three/Lighting/Lighting';
import CameraRig from './CameraRig';

interface SceneProps {
  progress: number; // 0 a 1, provisto por useHeroScroll
  isMobile?: boolean;
}

export default function Scene({ progress, isMobile = false }: SceneProps) {
  const dogGroupRef = useRef<THREE.Group>(null);

  // Ventanas narrativas dentro del progreso total (ver storytelling, Parte 1):
  // 0.00–0.30  apertura + giro de cámara
  // 0.15–0.65  partículas entran progresivamente
  // 0.30–1.00  luz pasa de fría a cálida
  // 0.55–1.00  entra el gato
  const catVisible = progress > 0.55;
  const catAppearProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.45));
  const particlesOpacity = Math.max(0, Math.min(1, (progress - 0.15) / 0.5)) * 0.8;

  // Fondo de la escena: arranca en el crema de marca y se calienta hacia
  // un tono terracota suave a medida que avanza el scroll (antes iba de
  // negro a negro-cálido; ahora sigue la misma curva narrativa pero con
  // los tonos de la nueva paleta clara).
  const bgColor = new THREE.Color('#F4EDE3').lerp(
    new THREE.Color('#E8C9A8'),
    Math.min(progress * 1.2, 1),
  );

  return (
    <Canvas
      shadows={isMobile ? false : 'soft'}
      camera={{ position: [0, 2.2, 8], fov: 45 }}
      gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
      dpr={isMobile ? [1, 1] : [1, 1.5]} // en mobile se fija dpr=1: la ganancia de nitidez no vale el costo de fillrate (Parte 11)
      performance={{ min: 0.5 }} // R3F baja resolución interna si el frame rate cae
    >
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 5, 40]} />

      <Lighting progress={progress} />
      <CameraRig progress={progress} dogRef={dogGroupRef} />

      <group ref={dogGroupRef}>
        <Dog speed={6} />
      </group>
      <Cat visible={catVisible} appearProgress={catAppearProgress} />
      <Particles opacity={particlesOpacity} count={isMobile ? 120 : 300} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#DCC7A8" roughness={1} />
      </mesh>
    </Canvas>
  );
}
