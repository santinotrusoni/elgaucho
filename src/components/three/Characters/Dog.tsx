'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// PERRO PROCEDURAL — mejorado (mejora visual pedida por el cliente).
//
// Sigue sin ser un modelo .glb hiperrealista: no hay forma de conseguir
// uno real sin acceso a internet en este entorno. Lo que sí se mejoró
// bastante acá: geometrías más redondeadas (cápsulas y esferas en vez de
// solo cajas, mucho menos "low-poly cuadrado"), ojos y nariz para una
// expresión amigable, y un tono de pelaje cálido acorde a la nueva
// paleta de marca (terracota/crema). Es intercambiable: cuando consigas
// un modelo rigged real, se reemplaza este componente por <DogGLTF />
// (ver abajo) sin tocar Scene.tsx, CameraRig.tsx ni la lógica de scroll.

interface DogProps {
  color?: string;
  speed?: number; // velocidad de la corrida, controlada por el progreso de scroll
}

export default function Dog({ color = '#D9B48C', speed = 6 }: DogProps) {
  const group = useRef<THREE.Group>(null);
  const legs = useRef<THREE.Group[]>([]);
  const tail = useRef<THREE.Mesh>(null);
  const headGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    legs.current.forEach((leg, i) => {
      if (!leg) return;
      const phase = i % 2 === 0 ? 0 : Math.PI;
      const offset = i < 2 ? 0 : Math.PI * 0.5;
      leg.rotation.x = Math.sin(t * speed + phase + offset) * 0.6;
    });

    if (tail.current) {
      // cola meneando más rápido que el trote — se lee como "contento"
      tail.current.rotation.z = 0.5 + Math.sin(t * speed * 2.2) * 0.35;
    }

    if (headGroup.current) {
      // leve balanceo de cabeza, como mirando hacia adelante con curiosidad
      headGroup.current.rotation.z = Math.sin(t * speed * 0.5) * 0.05;
    }

    if (group.current) {
      group.current.position.y = Math.abs(Math.sin(t * speed * 2)) * 0.08;
      group.current.position.x = Math.sin(t * 0.15) * 0.3;
    }
  });

  const legPositions: [number, number, number][] = [
    [0.6, 0, 0.22],
    [0.6, 0, -0.22],
    [-0.6, 0, 0.22],
    [-0.6, 0, -0.22],
  ];

  const furMaterial = (
    <meshStandardMaterial color={color} roughness={0.75} metalness={0.02} />
  );
  const darkMaterial = <meshStandardMaterial color="#2B2115" roughness={0.4} />;

  return (
    <group ref={group}>
      {/* torso — cápsula en vez de caja: silueta mucho más orgánica */}
      <mesh position={[0, 0.78, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <capsuleGeometry args={[0.34, 1.1, 6, 12]} />
        {furMaterial}
      </mesh>

      <group ref={headGroup} position={[1.05, 1.0, 0]}>
        {/* cabeza — esfera achatada */}
        <mesh castShadow receiveShadow scale={[1, 0.9, 0.95]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          {furMaterial}
        </mesh>

        {/* hocico */}
        <mesh position={[0.32, -0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <capsuleGeometry args={[0.14, 0.22, 4, 8]} />
          {furMaterial}
        </mesh>
        {/* nariz */}
        <mesh position={[0.45, -0.07, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          {darkMaterial}
        </mesh>

        {/* ojos — expresión amigable */}
        {[0.1, -0.1].map((z) => (
          <mesh key={z} position={[0.2, 0.06, z]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            {darkMaterial}
          </mesh>
        ))}

        {/* orejas caídas (cápsulas en vez de conos — más suave/amigable) */}
        {[-0.24, 0.24].map((z) => (
          <mesh
            key={z}
            position={[0.05, 0.1, z]}
            rotation={[0, 0, z > 0 ? -0.5 : 0.5]}
            castShadow
          >
            <capsuleGeometry args={[0.08, 0.22, 4, 8]} />
            {furMaterial}
          </mesh>
        ))}
      </group>

      {/* cola */}
      <mesh ref={tail} position={[-0.95, 1.05, 0]} rotation={[0, 0, 0.5]} castShadow>
        <capsuleGeometry args={[0.07, 0.5, 4, 8]} />
        {furMaterial}
      </mesh>

      {/* patas */}
      {legPositions.map((pos, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) legs.current[i] = el;
          }}
          position={pos}
        >
          <mesh position={[0, -0.32, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
            {furMaterial}
          </mesh>
          {/* pata (paw) */}
          <mesh position={[0, -0.62, 0.04]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            {furMaterial}
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * DogGLTF — versión para cuando consigas un modelo real (.glb, rigged,
 * con clip de animación "run"). Dejar en /public/models/dog.glb.
 *
 * import { useGLTF, useAnimations } from '@react-three/drei';
 *
 * export function DogGLTF({ speed = 1 }: { speed?: number }) {
 *   const group = useRef<THREE.Group>(null);
 *   const { scene, animations } = useGLTF('/models/dog.glb');
 *   const { actions } = useAnimations(animations, group);
 *
 *   useEffect(() => {
 *     const run = actions['run'];
 *     run?.play();
 *     if (run) run.timeScale = speed;
 *   }, [actions, speed]);
 *
 *   return <primitive ref={group} object={scene} />;
 * }
 */
