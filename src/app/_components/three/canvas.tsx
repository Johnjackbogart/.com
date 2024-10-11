"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Effects from "./effects/effects";
import Loading from "./Loading";

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
      camera={{ position: [0, 0, 0], fov: 100 }}
    >
      <Suspense fallback={<Loading />}>
        <Effects />
        {children}
      </Suspense>
    </Canvas>
  );
}
