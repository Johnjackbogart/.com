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
            angularVelocity={[0, 1, 0]}
          >
            <TorusKnot args={[]} />
          </RigidBody>
        </Physics>
      </Suspense>
    </Canvas>
  );
}
