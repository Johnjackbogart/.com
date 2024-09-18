"use client";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TorusKnot } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

export default function PlayGround() {
  const rb = useRef(null);
  const tk = useRef(null);

  let p = 1;
  let q = 1;

  useFrame((state, delta) => {
    p = Math.ceil(
      Math.abs(100 * Math.sin(0.01 * state.clock.getElapsedTime())),
    );
    q = Math.ceil(
      Math.abs(200 * Math.sin(0.001 * state.clock.getElapsedTime())),
    );

    if (tk.current) {
      tk.current.rotation.y = state.clock.getElapsedTime();
      tk.current.rotation.x = state.clock.getElapsedTime() / 2;

      //this is the only way...
      //https://stackoverflow.com/questions/40933735/three-js-cube-geometry-how-to-update-parameters
      tk.current.geometry.dispose();
      tk.current.geometry = new THREE.TorusKnotGeometry(
        2,
        0.01,
        1000,
        100,
        p,
        q,
      );
    }
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <RigidBody ref={rb} colliders={"hull"} restitution={2}>
        <TorusKnot ref={tk} args={[0.1, 1, 1000, 10, p, q]} />
      </RigidBody>
    </Physics>
  );
}
