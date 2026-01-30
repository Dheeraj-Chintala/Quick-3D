import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { generateHeightMap, updateGeometry } from '../../utils/meshGenerator';

const Model = ({ image, settings, onMeshReady }) => {
  const meshRef = useRef();
  
  // Memoize geometry to avoid recreation, we will mutate it
  const geometry = useMemo(() => {
    // 256 segments for decent detail. 
    // Ensure this matches the width/height passed to generateHeightMap
    return new THREE.PlaneGeometry(100, 100, 256, 256);
  }, []);

  const [heightMap, setHeightMap] = useState(null);

  // 1. Generate HeightMap when Image changes or Invert changes
  useEffect(() => {
    if (!image) return;

    // Offload to next tick/idle to strictly avoid UI freeze? 
    // For now, synchronous is fine for < 500px images.
    const map = generateHeightMap(image, 257, 257, settings.invert);
    setHeightMap(map);
  }, [image, settings.invert]);

  // 2. Update Geometry when Map or Height settings change
  useEffect(() => {
    if (meshRef.current && heightMap) {
       updateGeometry(meshRef.current.geometry, heightMap, settings.height);
       if (onMeshReady) onMeshReady(meshRef.current);
    }
  }, [heightMap, settings.height, onMeshReady]);

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      rotation={[-Math.PI / 2, 0, 0]} 
      castShadow 
      receiveShadow
    >
      <meshStandardMaterial 
        color={settings.color || "#ffffff"} 
        roughness={0.4}
        metalness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Viewer3D = ({ image, settings, className, refMesh }) => {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas shadows camera={{ position: [0, 80, 100], fov: 45 }}>
        <fog attach="fog" args={['#101010', 50, 300]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[50, 50, 25]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={1024}
        />
        
        <Center>
          {image && <Model image={image} settings={settings} onMeshReady={refMesh} />}
        </Center>

        <OrbitControls 
          minDistance={20} 
          maxDistance={300} 
          autoRotate={settings.autoRotate}
          autoRotateSpeed={1}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
