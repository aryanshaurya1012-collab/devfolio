import { Canvas } from '@react-three/fiber'
import ProjectGallery from './ProjectGallery'
import Hero3D from './Hero3D'
import CRTEffect from './CRTEffect'

export default function Scene({ portfolioData }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0a0a0a']} />

      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.25} />
      <spotLight
        position={[-6, 6, 5]}
        color="#9945FF"
        intensity={2.2}
        penumbra={1}
      />
      <spotLight
        position={[6, -5, 5]}
        color="#14F195"
        intensity={2}
        penumbra={1}
      />

      {/* Reactive 3D Background Typography */}
      <Hero3D
        name={portfolioData?.name}
        role={portfolioData?.role}
      />

      {/* 3D Project Gallery */}
      <ProjectGallery projects={portfolioData?.projects} />

      {/* Optimized CRT Post-processing Pipeline */}
      <CRTEffect />
    </Canvas>
  )
}
