"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Effects from "./effects";

export default function ThreeCanvas({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Canvas
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(), 0.4);
      }}
      eventPrefix="client"
      camera={{ position: [0, 0, 0], fov: 1 }}
    >
      <Effects />
      {children}
    </Canvas>
  );
}
