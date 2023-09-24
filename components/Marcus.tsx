"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import Spinner from "./Spinner";

function MeshComponent() {
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, "/static/marcus_aurelius/scene.gltf");

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} scale={0.7}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export default function Marcus() {
  return (
    <Suspense fallback={<Spinner />}>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </Suspense>
  );
}
