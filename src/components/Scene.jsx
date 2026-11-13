import React, { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';
import ProjectGallery from './ProjectGallery';
import CRTEffect from './CRTEffect';
import { getActiveTheme } from '../data/portfolio';

// Dynamic Scene Environment & Atmosphere Updater
function SceneUpdater({ themeConfig }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(themeConfig.bgHex);
    scene.fog = new THREE.Fog(themeConfig.fogHex, 18, 52);
  }, [scene, themeConfig.bgHex, themeConfig.fogHex]);

  return null;
}

function CameraRig({ isModalOpen }) {
  useFrame((state, delta) => {
    const targetX = isModalOpen ? 0 : state.pointer.x * 0.45;
    const targetY = isModalOpen ? 0 : state.pointer.y * 0.25;
    easing.damp3(state.camera.position, [targetX, targetY, 14.5], 0.25, delta);
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
  const mode = portfolioData.mode || 'dark';
  const themeConfig = getActiveTheme(portfolioData.theme, mode);
  const isLight = mode === 'light';

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 14.5], fov: 32 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <SceneUpdater themeConfig={themeConfig} />

      {/* Lighting Setup tailored to theme and dark/light mode */}
      <ambientLight intensity={isLight ? 2.0 : 1.1} color="#ffffff" />
      <directionalLight
        position={[7, 8, 8]}
        intensity={isLight ? 2.8 : 3.5}
        color={themeConfig.keyLight}
      />
      <directionalLight
        position={[-7, -4, 6]}
        intensity={isLight ? 2.0 : 2.8}
        color={themeConfig.rimLight}
      />
      <spotLight
        position={[0, 10, 8]}
        intensity={isLight ? 2.2 : 3.0}
        angle={0.6}
        penumbra={1}
        color={themeConfig.spotLight}
      />

      {/* Floating Sparkles */}
      <Sparkles
        count={isLight ? 40 : 60}
        scale={[24, 14, 12]}
        size={isLight ? 1.5 : 2}
        speed={0.25}
        opacity={isLight ? 0.35 : 0.45}
        color={themeConfig.sparkle}
      />

      {/* Studio Floor Bounce Plane */}
      <mesh position={[0, -3.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 50]} />
        <meshStandardMaterial
          color={themeConfig.floorColor}
          roughness={isLight ? 0.4 : 0.3}
          metalness={isLight ? 0.1 : 0.6}
        />
      </mesh>

      <CameraRig isModalOpen={isModalOpen} />

      <ProjectGallery
        projects={portfolioData.projects}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onInspectProject={onInspectProject}
        isModalOpen={isModalOpen}
        themeConfig={themeConfig}
        mode={mode}
      />

      {/* CRT scanline/vignette in dark mode */}
      {!isLight && <CRTEffect />}
    </Canvas>
  );
}
