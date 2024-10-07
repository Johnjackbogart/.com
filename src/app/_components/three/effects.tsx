"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";
import { ChromaticAberration } from "react-three-me";
import { ChromaticAberrationEffect, BlendFunction } from "postprocessing";
import { easing } from "maath";

export default function Effects() {
  const chromaRef = useRef<ChromaticAberrationEffect>(null);

  useFrame((state, delta) => {
    //stolen from https://discourse.threejs.org/t/how-to-create-glass-material-that-refracts-elements-in-dom/53625/3
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 2,
        0.5 + Math.cos(state.pointer.x) * 5,
      ],
      0.1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);

    if (!chromaRef.current) return;
    const x = Math.sin(-state.pointer.x) / 100;
    const y = state.pointer.y / 100;
    const newOffset = new THREE.Vector2(x, y);
    chromaRef.current.offset = newOffset;
  });
  return (
    <EffectComposer enableNormalPass={true}>
      <ChromaticAberration
        ref={chromaRef}
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.01, 0.01)}
        radialModulation={false}
        modulationOffset={1.0}
      />
      <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
      <TiltShift2 blur={0.2} />
    </EffectComposer>
  );
}
