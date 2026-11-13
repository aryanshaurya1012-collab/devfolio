import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ProjectGallery from './ProjectGallery'
import Hero3D from './Hero3D'
import CRTEffect from './CRTEffect'

export default function Scene({ portfolioData }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 35 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0a0a0a']} />

      {/* 3-Point Lighting Setup with Web3 Colors */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        color="#9945FF"
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        color="#14F195"
      />

      {/* Dynamic Environment for glass reflections */}
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      {/* Reactive 3D Background Watermark Typography */}
      <Hero3D
        name={portfolioData?.name}
        role={portfolioData?.role}
      />

      {/* Cinematic Project Gallery Carousel */}
      <ProjectGallery projects={portfolioData?.projects} />

      {/* Awwwards-Calibrated CRT Post-Processing */}
      <CRTEffect />
    </Canvas>
  )
}
