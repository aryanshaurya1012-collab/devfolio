import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import ProjectGallery from './ProjectGallery'
import CRTEffect from './CRTEffect'
import { THEMES } from '../data/portfolio'

// Step 7: Global Mouse-Tracking Camera Rig
function CameraRig() {
  useFrame((state, delta) => {
    const targetX = state.pointer.x * 0.6
    const targetY = state.pointer.y * 0.4
    easing.damp3(
      state.camera.position,
      [targetX, targetY, 15],
      0.35,
      delta,
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene({
  portfolioData,
  isEditing = false,
  onOpenCaseStudy,
  onActiveIndexChange,
  targetIndexRef,
}) {
  const currentThemeKey = portfolioData?.theme || 'amber'
  const themeConfig = THEMES[currentThemeKey] || THEMES.amber

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 30 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      {/* Step 1: Rich Atmospheric Background */}
      <color attach="background" args={[themeConfig.bgHex || '#0d0a12']} />

      {/* Step 2: Volumetric Depth Fog */}
      <fog attach="fog" args={[themeConfig.fogHex || '#0d0a12', 12, 28]} />

      {/* Step 6: Ambient Studio Fill */}
      <ambientLight intensity={0.85} color="#ffffff" />

      {/* Step 3: Warm Amber Key Light */}
      <directionalLight
        position={[8, 6, 8]}
        intensity={3.5}
        color={themeConfig.keyLight || '#ff7e47'}
      />

      {/* Step 4: Electric Indigo Rim Light */}
      <pointLight
        position={[-8, -5, 5]}
        intensity={4}
        color={themeConfig.rimLight || '#6366f1'}
      />

      {/* Step 5: Overhead Champagne Spotlight */}
      <spotLight
        position={[0, 12, 6]}
        color="#fde68a"
        intensity={2.5}
        angle={0.5}
        penumbra={1}
      />

      {/* Step 8: Ambient Floating Dust Particles */}
      <Sparkles
        count={70}
        scale={[22, 12, 10]}
        size={1.8}
        speed={0.25}
        opacity={0.35}
        color={themeConfig.sparkle || '#fcd34d'}
      />

      {/* Step 9: Reflective Studio Floor Plane */}
      <mesh position={[0, -4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0f0c14"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Camera Rig Orbit */}
      <CameraRig />

      {/* Cylindrical Carousel Engine */}
      <ProjectGallery
        projects={portfolioData?.projects}
        isEditing={isEditing}
        onOpenCaseStudy={onOpenCaseStudy}
        onActiveIndexChange={onActiveIndexChange}
        targetIndexRef={targetIndexRef}
      />

      {/* Step 29: Refined Crisp Post-Processing */}
      <CRTEffect />
    </Canvas>
  )
}
