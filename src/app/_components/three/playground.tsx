"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Text,
  OrbitControls,
  Line,
  DragControls,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { easing } from "maath";

import { Me } from "./Me";

export default function PlayGround() {
  const tk = useRef<THREE.Mesh>(null);

  let p = 10;
  let q = 10;

  useFrame((state) => {
    p = Math.ceil(
      Math.abs(100 * Math.sin(0.0002 * state.clock.getElapsedTime())),
    );

    q = Math.ceil(
      Math.abs(200 * Math.sin(0.0003 * state.clock.getElapsedTime())),
    );

    if (!tk.current) return;
    tk.current.rotation.y = 1 * state.clock.getElapsedTime();
    //tk.current.rotation.x = (1 * state.clock.getElapsedTime()) / 2;

    //this is the only way...
    //https://stackoverflow.com/questions/40933735/three-js-cube-geometry-how-to-update-parameters
    tk.current.geometry.dispose();
    tk.current.geometry = new THREE.TorusKnotGeometry(2, 0.21, 10000, 10, p, q);
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <Rig />
      {<DeformablePlane />}
      <Text position={[0, 0, -10]} color="green">
        yooo
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
      <RigidBody colliders={"hull"} restitution={2}>
        <mesh ref={tk}>
          <torusKnotGeometry args={[2, 0.001, 1000, 1000, p, q]} />
          <MeshTransmissionMaterial
            thickness={2}
            backside
            backsideThickness={1}
          />
        </mesh>
      </RigidBody>
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

//stolen from https://discourse.threejs.org/t/how-to-create-glass-material-that-refracts-elements-in-dom/53625/3
function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 3.5,
        5 + Math.cos(state.pointer.x) * 1,
      ],
      0.2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
}
