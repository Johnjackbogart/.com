import * as THREE from "three";
import {
  Bloom,
  ChromaticAberration,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface ChainProps {
  offset: THREE.Vector2;
}
export default function Chain(props: ChainProps) {
  return (
    <>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={props.offset}
        radialModulation={false}
        modulationOffset={1.0}
      />
      <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
      <TiltShift2 blur={0.2} />
    </>
  );
}
