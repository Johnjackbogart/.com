"use client";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";

import { Me } from "./Me";

export default function PlayGround() {
  const tk = useRef<THREE.Mesh>(null);

  let p = 10;
  let q = 10;

  useFrame((state) => {
    p = Math.ceil(
      Math.abs(100 * Math.sin(0.02 * state.clock.getElapsedTime())),
    );

    q = Math.ceil(
      Math.abs(200 * Math.cos(0.01 * state.clock.getElapsedTime())),
    );

    if (tk.current) {
      tk.current.rotation.y = 1 * state.clock.getElapsedTime();
      tk.current.rotation.x = (1 * state.clock.getElapsedTime()) / 2;

      //this is the only way...
      //https://stackoverflow.com/questions/40933735/three-js-cube-geometry-how-to-update-parameters
      tk.current.geometry.dispose();
      tk.current.geometry = new THREE.TorusKnotGeometry(
        2,
        0.01,
        10000,
        10,
        p,
        q,
      );
    }
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <ambientLight intensity={5} />
      <OrbitControls />
      <Me />
      <RigidBody colliders={"hull"} restitution={2}>
        <mesh ref={tk}>
          <torusKnotGeometry args={[2, 0.001, 1000, 1000, p, q]} />
          <meshStandardMaterial color="black" metalness={0.6} roughness={0.4} />
        </mesh>
      </RigidBody>
    </Physics>
  );
}
