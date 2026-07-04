'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  progress: number; // 0 a 1
  dogRef: React.RefObject<THREE.Group>;
}

// La cámara arranca detrás/al costado del perro (plano cerrado, cinemático)
// y termina girando ~200° a su alrededor mientras se aleja levemente,
// tal como se definió en el storytelling de scroll de la Parte 1.

export default function CameraRig({ progress, dogRef }: CameraRigProps) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const angle = THREE.MathUtils.lerp(0, Math.PI * 1.1, progress);
    const radius = THREE.MathUtils.lerp(8, 5, Math.min(progress * 1.5, 1));
    const height = THREE.MathUtils.lerp(2.2, 1.6, progress);

    const dogX = dogRef.current?.position.x ?? 0;
    const dogZ = dogRef.current?.position.z ?? 0;

    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = height;

    target.current.set(dogX, 1, dogZ);
    camera.lookAt(target.current);
  });

  return null;
}
