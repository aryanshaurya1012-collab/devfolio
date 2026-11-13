import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { easing } from 'maath';
import ProjectGallery from './ProjectGallery';
import CRTEffect from './CRTEffect';
import { THEMES } from '../data/portfolio';

function CameraRig({ isModalOpen }) {
  useFrame((state, delta) => {
    const targetX = isModalOpen ? 0 : state.pointer.x * 0.45;
    const targetY = isModalOpen ? 0 : state.pointer.y * 0.25;
    easing.damp3(state.camera.position, [targetX, targetY, 13.5], 0.25, delta);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({
  portfolioData,
  activeIndex,
  setActiveIndex,
  onInspectProject,
  isModalOpen = false,
}) {
  const theme = THEMES[portfolioData.theme] || THEMES.obsidian || THEMES.amber;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 13.5], fov: 32 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[theme.bgHex]} />
      <fog attach="fog" args={[theme.fogHex, 18, 50]} />

      {/* High-Contrast Studio & Rim Lighting */}
      <ambientLight intensity={1.1} color="#ffffff" />
      <directionalLight position={[7, 8, 8]} intensity={3.5} color={theme.keyLight} />
      <directionalLight position={[-7, -4, 6]} intensity={2.8} color={theme.rimLight} />
      <spotLight
        position={[0, 10, 8]}
        intensity={3.0}
        angle={0.6}
        penumbra={1}
        color="#ffffff"
      />

      {/* Floating Sparkles / Dust Motes */}
      <Sparkles
        count={60}
        scale={[24, 14, 12]}
        size={2}
        speed={0.25}
        opacity={0.45}
        color={theme.sparkle}
      />

      {/* Studio Floor Bounce Plane */}
      <mesh position={[0, -3.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 50]} />
        <meshStandardMaterial color={theme.bgHex} roughness={0.3} metalness={0.6} />
      </mesh>

      <CameraRig isModalOpen={isModalOpen} />

      <ProjectGallery
        projects={portfolioData.projects}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onInspectProject={onInspectProject}
        isModalOpen={isModalOpen}
      />

      <CRTEffect />
    </Canvas>
  );
}
