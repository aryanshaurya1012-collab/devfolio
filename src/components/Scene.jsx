import { Canvas } from '@react-three/fiber'
import ProjectGallery from './ProjectGallery'
import CRTEffect from './CRTEffect'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#0a0a0a']} />

      {/* Moody cinematic lighting */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[-5, 5, 5]}
        color="#9945FF"
        intensity={2}
        penumbra={1}
      />
      <spotLight
        position={[5, -5, 5]}
        color="#14F195"
        intensity={2}
        penumbra={1}
      />

      {/* Interactive 3D Project Gallery */}
      <ProjectGallery />

      {/* CRT Post-processing Pipeline */}
      <CRTEffect />
    </Canvas>
  )
}
