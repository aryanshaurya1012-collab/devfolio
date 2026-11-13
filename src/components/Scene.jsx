import { Canvas } from '@react-three/fiber'
import ProjectGallery from './ProjectGallery'
import CRTEffect from './CRTEffect'

export default function Scene({ portfolioData, isEditing = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 30 }}
      gl={{ antialias: false }}
    >
      <color attach="background" args={['#050505']} />

      {/* Cinematic Studio Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#fff8e7"
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.5}
        color="#a0c0d0"
      />

      {/* Cinematic Horizontal Scroll Carousel */}
      <ProjectGallery
        projects={portfolioData?.projects}
        isEditing={isEditing}
      />

      {/* Soft Film Grain & Vignette Post-Processing */}
      <CRTEffect />
    </Canvas>
  )
}
