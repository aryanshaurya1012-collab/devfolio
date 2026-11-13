import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import CRTEffect from './CRTEffect'

function RotatingMesh() {
  const meshRef = useRef(null)

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35
      meshRef.current.rotation.y += delta * 0.55
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -2]} intensity={0.4} color="#06b6d4" />
      <RotatingMesh />
      <CRTEffect />
    </Canvas>
  )
}

