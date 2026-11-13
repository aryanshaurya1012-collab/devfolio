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

      {/* Cinematic Lighting — tuned for glass physical material */}
      <ambientLight intensity={0.3} />

      {/* Deep purple spotlight behind the cards — catches rear glass edges */}
      <spotLight
        position={[-5, 4, -4]}
        color="#9945FF"
        intensity={3}
        penumbra={1}
        angle={0.6}
      />

      {/* Bright cyan spotlight in front — illuminates glass faces and refractions */}
      <spotLight
        position={[5, -3, 6]}
        color="#14F195"
        intensity={2.5}
        penumbra={1}
        angle={0.5}
      />

      {/* Warm fill from top-right to add dimension */}
      <pointLight position={[8, 6, 2]} color="#ffffff" intensity={0.6} />

      {/* Reactive 3D Background Typography */}
      <Hero3D
        name={portfolioData?.name}
        role={portfolioData?.role}
      />

      {/* 3D Project Gallery */}
      <ProjectGallery projects={portfolioData?.projects} />

      {/* Optimized CRT Post-processing */}
      <CRTEffect />
    </Canvas>
  )
}
