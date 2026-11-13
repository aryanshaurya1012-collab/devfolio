import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import { easing } from 'maath'

export default function Hero3D({ name = 'YOUR NAME', role = 'CREATIVE DEVELOPER' }) {
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Subtle interactive parallax responding to mouse pointer
    const targetX = state.pointer.x * 0.4
    const targetY = 2.2 + state.pointer.y * 0.2
    easing.damp3(groupRef.current.position, [targetX, targetY, -2.5], 0.25, delta)
  })

  const displayName = (name || 'YOUR NAME').trim() || 'YOUR NAME'
  const displayRole = (role || 'DEVELOPER').trim() || 'DEVELOPER'

  return (
    <group ref={groupRef} position={[0, 2.2, -2.5]}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* Giant Monospace / Cyberpunk Name in 3D Background */}
        <Text
          fontSize={0.65}
          maxWidth={9}
          lineHeight={1}
          letterSpacing={0.08}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          fillOpacity={0.85}
        >
          {displayName.toUpperCase()}
        </Text>

        {/* Dynamic Role Sub-tag */}
        <Text
          position={[0, -0.52, 0]}
          fontSize={0.18}
          letterSpacing={0.18}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#14F195"
          fillOpacity={0.9}
        >
          {`// ${displayRole.toUpperCase()}`}
        </Text>
      </Float>
    </group>
  )
}

