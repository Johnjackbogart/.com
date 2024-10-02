"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  N8AO,
  TiltShift2,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { easing } from "maath";

export default function Effects() {
  useFrame((state, delta) => {
    //stolen from https://discourse.threejs.org/t/how-to-create-glass-material-that-refracts-elements-in-dom/53625/3
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) / 4,
        state.pointer.y / 2,
        6 + Math.cos(state.pointer.x) * 1,
      ],
      0.1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <EffectComposer enableNormalPass={false}>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0001, 0.0001)}
        radialModulation={false}
        modulationOffset={1.0}
      />
      <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
      <TiltShift2 blur={0.2} />
    </EffectComposer>
  );
}
