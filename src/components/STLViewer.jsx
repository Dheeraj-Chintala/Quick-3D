import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import * as THREE from "three";
import "/src/index.css";

function STLModel({ url, controlsRef }) {
  const meshRef = useRef();
  const geometry = useLoader(STLLoader, url);
  const { camera, size } = useThree();

  geometry.computeBoundingBox();
  geometry.center();

  useEffect(() => {
    const box = geometry.boundingBox;
    if (!box) return;

    const boxSize = new THREE.Vector3();
    box.getSize(boxSize);
    const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);

    const fovRadians = (camera.fov * Math.PI) / 180;
    const aspect = size.width / size.height;
    const distance = maxDim / 2 / Math.tan(fovRadians / 2) / 0.8;

    camera.position.set(distance, distance * 0.75, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [geometry, camera, controlsRef, size]);
  
  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="pink"
        metalness={0.3}
        roughness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
const STLViewer = ({ stlUrl }) => {
  const controlsRef = useRef();

  return (
    <div
      className="border rounded h-full w-full  backdrop-blur-md border border-white/50  rounded-2xl shadow"
      style={{ position: "relative" }}
    >
      <Canvas
        camera={{ position: [0, 0, 100], fov: 45 }}
        style={{ height: "100%", width: "100%" }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <STLModel url={stlUrl} controlsRef={controlsRef} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          autoRotate={false}
          enablePan={true}
          minDistance={10}
          maxDistance={500}
        />
      </Canvas>
    </div>
  );
};

export default STLViewer;
