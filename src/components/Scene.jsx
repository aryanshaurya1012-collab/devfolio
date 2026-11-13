import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { easing } from 'maath';
import ProjectGallery from './ProjectGallery';
import CRTEffect from './CRTEffect';
import { THEMES } from '../data/portfolio';

function CameraRig({ isModalOpen }) {
  useFrame((state, delta) => {
    const targetX = isModalOpen ? 0 : state.pointer.x * 0.65;
    const targetY = isModalOpen ? 0 : state.pointer.y * 0.4;
    easing.damp3(state.camera.position, [targetX, targetY, 13.5], 0.35, delta);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({
  portfolioData,
  activeIndex,
  setActiveIndex,
  onInspectProject,
  isModalOpen
}) {
  const theme = THEMES[portfolioData.theme] || THEMES.amber;

  return (
    <Canvas 'high-performance' 0, 1.5]
} 13.5], 32[0, antialias: camera = "{{" dpr = "{[1," fov: gl = "{{" position: powerPreference: true, }}>
      <color attach="background" args={[theme.bgHex]} />
      <fog attach="fog" args={[theme.fogHex, 11, 26]} />

{/* High-Contrast Studio & Rim Lighting */ }
      <ambientLight intensity={0.95} color="#ffffff" />
      <directionalLight position={[8, 7, 8]} intensity={3.2} color={theme.keyLight} />
      <directionalLight position={[-8, -5, 6]} intensity={2.4} color={theme.rimLight} />
      <spotLight
        position={[0, 11, 7]}
        intensity={2.8}
        angle={0.55}
        penumbra={1}
        color="#fde68a"
      />

{/* Subtle Floating Dust Motes for 3D Depth */ }
<Sparkles 10]} 12, color = "{theme.sparkle}" count = "{65}" opacity = "{0.4}" scale = "{[22," size = "{2}" speed = "{0.25}" />

  {/* Studio Floor Bounce Plane */ }
  < mesh position = { [0, -4.1, 0]} rotation = { [-Math.PI / 2, 0, 0]} >
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial color={theme.bgHex} roughness={0.3} metalness={0.6} />
      </mesh >

      <CameraRig isModalOpen="{isModalOpen}"/>

      <ProjectGallery activeIndex="{activeIndex}" isModalOpen="{isModalOpen}" onInspectProject="{onInspectProject}" projects="{portfolioData.projects}" setActiveIndex="{setActiveIndex}"/>

      <CRTEffect/>
    </Canvas >
  );
}