import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Single global geometry compiled once to maximize WebGL performance
const CARD_GEOMETRY = new THREE.BoxGeometry(3, 4, 0.1)

export default function ProjectCard3D({ project, index, position = [0, 0, 0] }) {
  const cardGroupRef = useRef(null)
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const worldPos = useMemo(() => new THREE.Vector3(), [])

  // Optimized material memoized once per card instance
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0f0f0f',
        metalness: 0.8,
        roughness: 0.2,
      }),
    [],
  )

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  // Gracefully handle empty or deleting states
  const title = (project?.title || `PROJECT 0${index + 1}`).trim()
  const tech = (
    project?.tech ||
    project?.techStack?.[0] ||
    project?.technologies?.[0] ||
    'WEB3 / DEV'
  ).trim()
  const category = (project?.category || 'MODULE').trim()
  const description = (project?.description || '').trim()

  useFrame((_state, delta) => {
    if (!cardGroupRef.current || !meshRef.current) return

    // Calculate real-time world position
    cardGroupRef.current.getWorldPosition(worldPos)

    // Calculate parallax cover-flow rotation facing camera
    const targetRotY = -Math.max(-0.45, Math.min(0.45, worldPos.x * 0.1))
    const targetPosZ = -Math.min(1.2, Math.abs(worldPos.x) * 0.08)

    // Mathematically smoothed rotation with maath easing
    easing.dampE(cardGroupRef.current.rotation, [0, targetRotY, 0], 0.22, delta)

    // Smooth Z-depth parallax
    easing.damp(cardGroupRef.current.position, 'z', targetPosZ, 0.22, delta)

    // Smooth scale up on hover
    const targetScale = hovered ? 1.05 : 1.0
    easing.damp3(
      cardGroupRef.current.scale,
      [targetScale, targetScale, targetScale],
      0.15,
      delta,
    )

    // Smooth material color and emissive glow
    easing.dampC(
      meshRef.current.material.color,
      hovered ? '#1c1c24' : '#0f0f0f',
      0.15,
      delta,
    )
    easing.dampC(
      meshRef.current.material.emissive,
      hovered ? '#14F195' : '#000000',
      0.15,
      delta,
    )
    easing.damp(
      meshRef.current.material,
      'emissiveIntensity',
      hovered ? 0.25 : 0,
      0.15,
      delta,
    )
  })

  return (
    <group ref={cardGroupRef} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Monolith card mesh with shared geometry and memoized material */}
        <mesh
          ref={meshRef}
          geometry={CARD_GEOMETRY}
          material={material}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
        />

        {/* Top Eyebrow / Catalog Number */}
        <Text
          position={[0, 1.6, 0.06]}
          fontSize={0.11}
          letterSpacing={0.15}
          color="#9945FF"
          anchorX="center"
          anchorY="middle"
        >
          {`[ 0${index + 1} // ${category.toUpperCase()} ]`}
        </Text>

        {/* Bold Title at Top */}
        <Text
          position={[0, 1.2, 0.06]}
          fontSize={0.22}
          maxWidth={2.5}
          lineHeight={1.1}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
        >
          {title.toUpperCase()}
        </Text>

        {/* Project Description (if present) */}
        {description && (
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
            {description}
          </Text>
        )}

        {/* Dynamic Primary Tech Tag at Bottom */}
        <Text
          position={[0, -1.5, 0.06]}
          fontSize={0.16}
          letterSpacing={0.12}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="#14F195"
        >
          {tech.toUpperCase()}
        </Text>
      </Float>
    </group>
  )
}
