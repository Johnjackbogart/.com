"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  Bloom,
  EffectComposer,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";

export default function ThreeCanvas({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Canvas
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(), 0.4);
      }}
    >
      <EffectComposer enableNormalPass={false}>
        <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
        <TiltShift2 blur={0.2} />
      </EffectComposer>
      {children}
    </Canvas>
  );
}
