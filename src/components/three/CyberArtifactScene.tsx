import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface ArtifactProps {
  reducedMotion: boolean;
}

const FacetedEngineeringCore: React.FC<ArtifactProps> = ({ reducedMotion }) => {
  const outerGroup = useRef<THREE.Group>(null);
  const innerCore = useRef<THREE.Mesh>(null);
  const orbitalRing1 = useRef<THREE.Mesh>(null);
  const orbitalRing2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (outerGroup.current) {
      // Subtle pointer-responsive parallax + steady axial rotation
      const targetX = state.pointer.y * 0.25;
      const targetY = state.pointer.x * 0.35;
      outerGroup.current.rotation.x = THREE.MathUtils.lerp(outerGroup.current.rotation.x, targetX, 0.05);
      outerGroup.current.rotation.y += delta * 0.25 + (targetY - outerGroup.current.rotation.y) * 0.02;
    }

    if (innerCore.current) {
      innerCore.current.rotation.y -= delta * 0.45;
      innerCore.current.rotation.z += delta * 0.2;
    }

    if (orbitalRing1.current) {
      orbitalRing1.current.rotation.x += delta * 0.3;
      orbitalRing1.current.rotation.y += delta * 0.15;
    }

    if (orbitalRing2.current) {
      orbitalRing2.current.rotation.z -= delta * 0.35;
    }
  });

  return (
    <group ref={outerGroup}>
      <Float
        speed={reducedMotion ? 0 : 2}
        rotationIntensity={reducedMotion ? 0 : 0.4}
        floatIntensity={reducedMotion ? 0 : 0.6}
      >
        {/* Central Obsidian Polyhedral Core with Crimson Wireframe Edges */}
        <mesh ref={innerCore}>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshStandardMaterial
            color="#0B0B0F"
            roughness={0.25}
            metalness={0.85}
            polygonOffset
            polygonOffsetFactor={1}
          />
          <Edges scale={1.01} threshold={15} color="#E60012" />
        </mesh>

        {/* Outer Faceted Cage */}
        <mesh scale={1.75}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#F8F8F8" wireframe transparent opacity={0.18} />
        </mesh>

        {/* Primary Crimson Telemetry Ring */}
        <mesh ref={orbitalRing1} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.15, 0.025, 16, 64]} />
          <meshBasicMaterial color="#E60012" />
        </mesh>

        {/* Secondary Cyan Architecture Ring */}
        <mesh ref={orbitalRing2} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.45, 0.015, 16, 64]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.75} />
        </mesh>

        {/* Satellite Data Nodes */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          const radius = 2.15;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.sin(angle) * 1.2]}
            >
              <boxGeometry args={[0.14, 0.14, 0.14]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#E60012' : '#00F0FF'}
                emissive={idx % 2 === 0 ? '#E60012' : '#00F0FF'}
                emissiveIntensity={0.6}
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
};

export const CyberArtifactScene: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  if (!webglAvailable) {
    // Graceful SVG Fallback when WebGL is disabled or unavailable
    return (
      <div className="relative w-full h-full flex items-center justify-center p-8 select-none pointer-events-none">
        <svg viewBox="0 0 240 240" className="w-64 h-64 text-p5-red">
          <polygon
            points="120,15 215,70 215,170 120,225 25,170 25,70"
            fill="#101014"
            stroke="#E60012"
            strokeWidth="3"
          />
          <polygon
            points="120,40 190,85 190,155 120,200 50,155 50,85"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <circle cx="120" cy="120" r="24" fill="#E60012" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px] pointer-events-none select-none"
      aria-hidden="true"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-p5-muted uppercase tracking-widest">
            [ INITIALIZING 3D TELEMETRY CORE... ]
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, -3, 2]} intensity={1.2} color="#E60012" />
          <pointLight position={[4, 2, -2]} intensity={0.8} color="#00F0FF" />
          <FacetedEngineeringCore reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
};