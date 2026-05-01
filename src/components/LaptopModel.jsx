import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html, useGLTF, useTexture, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ textureUrl }) => {
  const { scene } = useGLTF('/src/assets/3d/lap.glb');
  const texture = useTexture(textureUrl);
  const meshRef = useRef();

  // Flip texture if needed and set repeat wrapping
  useMemo(() => {
    if (texture) {
      texture.flipY = false;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    }
  }, [texture]);

  // Apply texture to the screen mesh and coloring to other parts
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // More robust screen detection: check for 'screen', 'display', or specific common names like 'Plane' or 'Cube'
        const isScreen = child.name.toLowerCase().includes('screen') || 
                        child.name.toLowerCase().includes('display') || 
                        child.name.toLowerCase().includes('monitor') ||
                        child.name === 'Plane001' || // Common in some laptop models
                        child.geometry.index?.count < 500; // Screen is often a simple plane

        if (isScreen) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            emissive: 'var(--accent-color)', 
            emissiveIntensity: 0.5, // Increased for more vibrant coloring
            metalness: 0,
            roughness: 0.4
          });
        } else {
          // Glossy premium coloring for the laptop chassis
          child.material = new THREE.MeshStandardMaterial({
            color: '#080808', // Darker for better contrast
            metalness: 1,
            roughness: 0.1,
            envMapIntensity: 2.5
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, texture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.1;
      meshRef.current.position.y = Math.sin(t / 1.5) * 0.06 - 0.45;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={2.1} position={[0, 0, 0]} />;
};

const LaptopModel = () => {
  return (
    <div className="laptop-3d-container" style={{ width: '100%', height: '650px', cursor: 'grab', marginTop: '-40px' }}>
      <style>{`
        .laptop-3d-container {
          background: transparent;
          overflow: visible;
          transition: all 0.5s ease;
          position: relative;
        }

        .loader-text {
          font-family: var(--heading-font);
          font-size: 1.2rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
          color: var(--accent-color);
        }
      `}</style>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Html center><div className="loader-text" style={{ color: 'var(--accent-color)' }}>Assembling Studio...</div></Html>}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <Model textureUrl="/src/assets/img/resume.png" />
          </Float>
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>
    </div>
  );
};

export default LaptopModel;
