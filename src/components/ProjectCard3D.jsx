import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Single global geometry — compiled once for all cards
const CARD_GEOMETRY = new THREE.BoxGeometry(3, 4, 0.1)

export default function ProjectCard3D({ project, index, position = [0, 0, 0] }) {
  const cardGroupRef = useRef(null)
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const worldPos = useMemo(() => new THREE.Vector3(), [])

  // Gracefully handle empty / mid-delete states
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
    if (!cardGroupRef.current) return

    // Real-time world position for parallax math
    cardGroupRef.current.getWorldPosition(worldPos)

    // Cover-flow rotation facing camera
    const targetRotY = -Math.max(-0.45, Math.min(0.45, worldPos.x * 0.1))
    const targetPosZ = -Math.min(1.2, Math.abs(worldPos.x) * 0.08)

    // Smooth rotation with maath easing
    easing.dampE(cardGroupRef.current.rotation, [0, targetRotY, 0], 0.22, delta)

    // Smooth Z-depth parallax
    easing.damp(cardGroupRef.current.position, 'z', targetPosZ, 0.22, delta)

    // Smooth scale on hover
    const targetScale = hovered ? 1.06 : 1.0
    easing.damp3(
      cardGroupRef.current.scale,
      [targetScale, targetScale, targetScale],
      0.15,
      delta,
    )
  })

  return (
    <group ref={cardGroupRef} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Glass panel mesh */}
        <mesh
          ref={meshRef}
          geometry={CARD_GEOMETRY}
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
          <meshPhysicalMaterial
            transmission={0.9}
            opacity={1}
            metalness={0.5}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
            color="#1a1a1a"
            transparent
          />
        </mesh>

        {/* Crisp HTML overlay projected onto the card face */}
        <Html
          transform
          distanceFactor={1.5}
          position={[0, 0, 0.11]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="w-[300px] h-[400px] bg-black/60 border border-white/20 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md select-none"
            style={{ pointerEvents: 'none' }}
          >
            {/* Top: Index & Category Eyebrow */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-purple-400 uppercase">
                  {`[ 0${index + 1} // ${category.toUpperCase()} ]`}
                </span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    hovered ? 'bg-emerald-400' : 'bg-zinc-600'
                  } transition-colors`}
                />
              </div>

              {/* Title */}
              <h3 className="font-mono text-lg font-bold text-white leading-tight tracking-wide">
                {title.toUpperCase()}
              </h3>

              {/* Description */}
              {description && (
                <p className="font-mono text-[11px] text-zinc-400 leading-relaxed mt-3">
                  {description}
                </p>
              )}
            </div>

            {/* Bottom: Tech Badge */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
                {tech.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] text-zinc-500 tracking-widest">
                TXSIGHT
              </span>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}
