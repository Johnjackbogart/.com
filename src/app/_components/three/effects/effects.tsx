"use client";

import { useRef, RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";
import { ChromaticAberrationEffect, BlendFunction } from "postprocessing";
import { easing } from "maath";

export default function Effects() {
  const chromaRef = useRef<ChromaticAberrationEffect>(null);
  let offset = new THREE.Vector2(0.1, 0.1);

  useFrame((state, delta) => {
    //can I just import this as a prop ?????
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
    const x = Math.sin(-state.pointer.x) / 10;
    const y = state.pointer.y / 10;
    offset = new THREE.Vector2(x, y);
    chromaRef.current.offset = offset;
  });
  return (
    <EffectComposer enableNormalPass={true}>
      <ChromaticAberration
        ref={
          chromaRef as unknown as RefObject<typeof ChromaticAberrationEffect>
        }
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
