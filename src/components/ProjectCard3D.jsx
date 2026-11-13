import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Step 6: Physical VHS sleeve / premium book geometry & material
const BOX_GEOMETRY = new THREE.BoxGeometry(4, 5.5, 0.2)
const BOX_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#111111',
  roughness: 0.4,
  metalness: 0.6,
})

export default function ProjectCard3D({
  project,
  index,
  totalProjects = 1,
  position = [0, 0, 0],
  scroll,
}) {
  const groupRef = useRef(null)
  const htmlRef = useRef(null)

  const title = (project?.title || `PROJECT 0${index + 1}`).trim()
  const description = (
    project?.description ||
    'A minimal exploration in digital presence, typography, and materiality.'
  ).trim()
  const year = (project?.year || `YEAR // 202${6 - (index % 4)}`).trim()
  const tech = (
    project?.tech ||
    project?.techStack?.[0] ||
    project?.category ||
    ''
  ).trim()

  useFrame((_state, delta) => {
    if (!groupRef.current) return

    // Calculate distance from center based on scroll offset
    const total = Math.max(1, totalProjects - 1)
    const currentActiveIndex = scroll ? scroll.offset * total : 0
    const distFromActive = Math.abs(index - currentActiveIndex)
    const normalizedDist = Math.min(1, distFromActive)

    // Step 8: Active (Center) Card: Scale up to 1.1, opacity 1
    // Inactive (Side) Cards: Scale down to 0.85, rotate slightly away, opacity 0.3
    const targetScale = 1.1 - normalizedDist * 0.25 // 1.1 at center, 0.85 at sides
    const targetRotY = -Math.max(
      -0.25,
      Math.min(0.25, (index - currentActiveIndex) * 0.2),
    )
    const targetPosZ = -normalizedDist * 0.4
    const targetOpacity = 1.0 - normalizedDist * 0.7 // 1.0 at center, 0.3 at sides

    // Buttery smooth maath dampening
    easing.damp3(
      groupRef.current.scale,
      [targetScale, targetScale, targetScale],
      0.2,
      delta,
    )
    easing.dampE(groupRef.current.rotation, [0, targetRotY, 0], 0.25, delta)
    easing.damp(groupRef.current.position, 'z', targetPosZ, 0.22, delta)

    // Smooth HTML opacity transition
    if (htmlRef.current) {
      htmlRef.current.style.opacity = targetOpacity.toFixed(3)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Physical VHS sleeve / book mesh */}
      <mesh geometry={BOX_GEOMETRY} material={BOX_MATERIAL} />

      {/* Step 7: High-end editorial poster HTML overlay */}
      <Html
        transform
        distanceFactor={2.5}
        position={[0, 0, 0.11]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={htmlRef}
          className="w-[320px] h-[440px] bg-[#0a0a0a] border border-[#222] p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none transition-opacity duration-150"
          style={{ pointerEvents: 'none' }}
        >
          {/* Top: Small centered eyebrow text */}
          <div className="text-center">
            <span className="font-sans text-xs text-[#888] tracking-widest text-center uppercase block">
              {year}
            </span>
          </div>

          {/* Middle: Massive elegant title */}
          <div className="my-auto py-4">
            <h2 className="font-serif text-5xl text-[#eaeaea] leading-none tracking-tight text-center uppercase break-words">
              {title}
            </h2>
          </div>

          {/* Bottom: Clean description and simple tech text (no glowing pills) */}
          <div className="text-center pt-3 border-t border-[#1a1a1a]">
            <p className="font-sans text-xs text-[#888] text-center leading-relaxed line-clamp-3">
              {description}
            </p>
            {tech && (
              <span className="font-sans text-[10px] text-[#666] uppercase tracking-widest text-center mt-3 block">
                {tech}
              </span>
            )}
          </div>
        </div>
      </Html>
    </group>
  )
}
