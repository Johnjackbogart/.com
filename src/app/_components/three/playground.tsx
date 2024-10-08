"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Text,
  Line,
  DragControls,
  MeshTransmissionMaterial,
  Html,
} from "@react-three/drei";

import { Me } from "./Me";

export default function PlayGround() {
  const tk = useRef<THREE.Mesh>(null);

  const p = 31;
  const q = 5;

  useFrame((state, delta) => {
    if (!tk.current) return;
    tk.current.rotation.z = 1 * state.clock.getElapsedTime();
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <spotLight position={[0, 0, 0]} penumbra={10} castShadow angle={0.2} />
      <Text position={[0, 0, -10]} color="green">
        yoooo
        <Html
          style={{ color: "transparent", fontSize: "6em" }}
          transform={true}
        >
          yoooo
        </Html>
      </Text>
      <Line
        points={[
          [0, 0, 0],
          [1, 1, 1],
        ]}
      />
      <ambientLight intensity={1} />

      <pointLight position={[0, 0, 0]} />
      <DragControls>
        <Me />
      </DragControls>
      <DragControls>
        <RigidBody colliders={"hull"} restitution={2}>
          <mesh ref={tk}>
            <torusKnotGeometry args={[5, 0.5, 1000, 100, p, q]} />
            <MeshTransmissionMaterial
              thickness={2}
              backside
              backsideThickness={1}
            />
          </mesh>
        </RigidBody>
      </DragControls>
    </Physics>
  );
}

function DeformablePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const planeGeometry = useMemo(
    () => new THREE.PlaneGeometry(10, 10, 100, 100),
    [],
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!meshRef.current) return;
    const positionAttribute = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      // Example deformation function (wave effect)
      const z = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.5;

      positionAttribute.setZ(i, z);
    }

    positionAttribute.needsUpdate = true; // Inform Three.js that the positions have changed

    //meshRef.current.rotation.z = 0.01 * clock.getElapsedTime();
    //meshRef.current.rotation.x = 0.01 * clock.getElapsedTime();
  });

  return (
    <mesh rotation={[0, 0, Math.PI / 2]} ref={meshRef} geometry={planeGeometry}>
      <MeshTransmissionMaterial
        thickness={0.1}
        backside
        backsideThickness={0.1}
        transmission={0.99}
      />
    </mesh>
  );
}
