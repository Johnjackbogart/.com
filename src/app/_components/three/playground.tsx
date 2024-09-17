"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, TorusKnot } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

export default function PlayGround() {
  return (
    <Canvas>
      <Suspense>
        <Physics gravity={[0, 0, 0]} debug>
          <RigidBody
            colliders={"hull"}
            restitution={2}
            rotation={[0, 0.3, 2]}
            angularVelocity={[1, 1, 1]}
          >
            <TorusKnot args={[1.5, 0.1, 1000, 10, 4, 12]} />
          </RigidBody>
        </Physics>
      </Suspense>
    </Canvas>
  );
}
