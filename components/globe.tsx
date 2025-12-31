// "use client";

// import {
//   AsciiRenderer,
//   Environment,
//   OrbitControls,
//   useGLTF,
// } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import type * as THREE from "three";

// export default function GlobeScene() {
//   return (
//     <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true }}>
//       <ambientLight intensity={1} />
//       <color attach="background" args={["black"]} />

//       {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}

//       <Globe scale={2} />

//       <OrbitControls />
//       {/* <Environment preset="studio" /> */}
//       <AsciiRenderer bgColor="transparent" fgColor="black" />
//     </Canvas>
//   );
// }

// function Globe({ scale }: { scale: number }) {
//   const { scene } = useGLTF("/static/earth.glb");
//   const groupRef = useRef<THREE.Group>(null);

//   // Position offset to center the globe - adjust these values to center the globe
//   const positionOffset = [0, 0, 0] as [number, number, number];

//   useFrame((_, delta) => {
//     if (groupRef.current) {
//       // Rotate the parent group on the y-axis
//       groupRef.current.rotation.y += delta * 0.5; // Rotate at a consistent speed
//       // groupRef.current.rotation.z += delta * 0.2; // Rotate at a consistent speed
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} scale={scale} position={positionOffset} />
//     </group>
//   );
// }

// useGLTF.preload("/static/earth.glb");
