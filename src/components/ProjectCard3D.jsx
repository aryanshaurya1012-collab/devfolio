import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

export default function ProjectCard3D({ project, index, position = [0, 0, 0] }) {
  const cardGroupRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const primaryTech = project.techStack?.[0] || project.technologies?.[0] || 'WEB3'

  useFrame((_state, delta) => {
    if (!cardGroupRef.current) return

    // Calculate the card's real-time world position to determine distance from center camera
    const worldPos = new THREE.Vector3()
    cardGroupRef.current.getWorldPosition(worldPos)

    // Advanced Interaction: Cover-flow rotation facing the camera as cards scroll past
    const targetRotY = -Math.max(-0.45, Math.min(0.45, worldPos.x * 0.1))
    const targetPosZ = -Math.min(1.2, Math.abs(worldPos.x) * 0.08)

    cardGroupRef.current.rotation.y = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.y,
      targetRotY,
      4,
      delta,
    )

    cardGroupRef.current.position.z = THREE.MathUtils.damp(
      cardGroupRef.current.position.z,
      targetPosZ,
      4,
      delta,
    )
  })

  return (
    <group ref={cardGroupRef} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Monolith card mesh */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
        >
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial
            color={hovered ? '#18181b' : '#0f0f0f'}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? '#14F195' : '#000000'}
            emissiveIntensity={hovered ? 0.18 : 0}
          />
        </mesh>

        {/* Top Eyebrow / Catalog Number */}
        <Text
          position={[0, 1.6, 0.06]}
          fontSize={0.11}
          letterSpacing={0.15}
          color="#9945FF"
          anchorX="center"
          anchorY="middle"
        >
          {`[ 0${index + 1} // ${project.category || 'PROJECT'} ]`}
        </Text>

        {/* Bold Title at Top of Card */}
        <Text
          position={[0, 1.22, 0.06]}
          fontSize={0.22}
          maxWidth={2.5}
          lineHeight={1.1}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
        >
          {project.title}
        </Text>

        {/* Project Description */}
        {project.description && (
          <Text
            position={[0, 0.05, 0.06]}
            fontSize={0.12}
            maxWidth={2.4}
            lineHeight={1.4}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color="#8892b0"
          >
            {project.description}
          </Text>
        )}

        {/* Tech Stack at Bottom of Card */}
        <Text
          position={[0, -1.5, 0.06]}
          fontSize={0.16}
          letterSpacing={0.1}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#14F195"
        >
          {primaryTech}
        </Text>
      </Float>
    </group>
  )
}

