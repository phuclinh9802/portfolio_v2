import React, { Suspense, useRef } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitControls, Stars } from "@react-three/drei";

// import EarthDayMap from "../public/images/threejs/8k_earth_daymap.jpeg";
// import EarthCloudMap from "../public/images/threejs/8k_earth_clouds.jpeg";
import EarthNormalMap from "../public/images/threejs/8k_earth_normal_map.jpg";
// import EarthSpecularMap from "../public/images/threejs/8k_earth_specular_map.jpg";
import { TextureLoader } from "three";
import Image from "next/image";
import { useTexture } from "@react-three/drei";

// do not use div for canvas threejs since it is using WebGL - use mesh
export default function Earth({ props }) {
  // texture loader
  const [texture, specular, cloud, normal] = useLoader(TextureLoader, [
    "/images/threejs/8k_earth_daymap.jpeg",
    "/images/threejs/8k_earth_specular_map.jpg",
    "/images/threejs/8k_earth_clouds.jpeg",
    "/images/threejs/8k_earth_normal_map.jpg",
  ]);

  const earthRef = useRef();
  const cloudRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 8;
    cloudRef.current.rotation.y = elapsedTime / 6;
  });

  // const texture = useTexture("/images/threejs/8k_earth_daymap.jpeg");
  // console.log(texture);

  return (
    <>
      <pointLight color="#fff" intensity={1.2} position={[2, 0, 4]} />
      <Stars radius={400} depth={50} count={20000} factor={5} fade={true} />
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshPhongMaterial
          map={cloud}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial specularMap={specular} />
        <meshStandardMaterial
          map={texture}
          normalMap={normal}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls enableZoom={false} enableRotate={true} />
      </mesh>
    </>
  );
}
