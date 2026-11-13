import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Center } from '@react-three/drei'
import { easing } from 'maath'

export default function Hero3D({ name = 'YOUR NAME', role = 'CREATIVE DEVELOPER' }) {
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Subtle interactive parallax responding to mouse pointer
    const targetX = state.pointer.x * 0.35
    const targetY = state.pointer.y * 0.25
    easing.damp3(groupRef.current.position, [targetX, targetY, -5], 0.25, delta)
  })

  const displayName = (name || 'YOUR NAME').trim() || 'YOUR NAME'
  const displayRole = (role || 'DEVELOPER').trim() || 'DEVELOPER'

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.2}>
        <Center>
          <group>
            {/* Subtle giant background watermark text */}
            <Text
              fontSize={0.85}
              maxWidth={14}
              lineHeight={1}
              letterSpacing={0.15}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
              color="#ffffff"
              fillOpacity={0.15}
            >
              {displayName.toUpperCase()}
            </Text>

            {/* Subtle Role Sub-tag */}
            <Text
              position={[0, -0.7, 0]}
              fontSize={0.24}
              letterSpacing={0.25}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
              color="#14F195"
              fillOpacity={0.3}
            >
              {`// ${displayRole.toUpperCase()}`}
            </Text>
          </group>
        </Center>
      </Float>
    </group>
  )
}
