/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 -t public/me.glb 
*/

import * as THREE from "three";
import { useEffect, useRef, useMemo, Ref } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName = "Just_chilling_Clean";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    avaturn_body: THREE.SkinnedMesh;
    avaturn_hair_0: THREE.SkinnedMesh;
    avaturn_shoes_0: THREE.SkinnedMesh;
    avaturn_look_0: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    avaturn_body_material: THREE.MeshStandardMaterial;
    avaturn_hair_0_material: THREE.MeshStandardMaterial;
    avaturn_shoes_0_material: THREE.MeshStandardMaterial;
    avaturn_look_0_material: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function Me(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF("/me.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions);
    if (!actions && !actions.jump) return;
    actions["Just_chilling_Clean"].play();
  });
  return (
    <group ref={group as Ref<THREE.Group>} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="avaturn_body"
            geometry={nodes.avaturn_body.geometry}
            material={materials.avaturn_body_material}
            skeleton={nodes.avaturn_body.skeleton}
          />
          <skinnedMesh
            name="avaturn_hair_0"
            geometry={nodes.avaturn_hair_0.geometry}
            material={materials.avaturn_hair_0_material}
            skeleton={nodes.avaturn_hair_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_shoes_0"
            geometry={nodes.avaturn_shoes_0.geometry}
            material={materials.avaturn_shoes_0_material}
            skeleton={nodes.avaturn_shoes_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_look_0"
            geometry={nodes.avaturn_look_0.geometry}
            material={materials.avaturn_look_0_material}
            skeleton={nodes.avaturn_look_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/me.glb");
