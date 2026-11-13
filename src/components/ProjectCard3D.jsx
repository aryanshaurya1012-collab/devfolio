import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Single global geometry — compiled once for all cards (aspect ratio matches 340x480 poster)
const CARD_GEOMETRY = new THREE.BoxGeometry(3.4, 4.8, 0.1)

export default function ProjectCard3D({ project, index, position = [0, 0, 0] }) {
  const cardGroupRef = useRef(null)
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const worldPos = useMemo(() => new THREE.Vector3(), [])

  // Gracefully handle empty / mid-delete states
  const title = (project?.title || `PROJECT 0${index + 1}`).trim()
  const category = (project?.category || 'MODULE').trim()
  const description = (project?.description || '').trim()

  // Parse tech into array of chips
  const techList = useMemo(() => {
    if (Array.isArray(project?.techStack) && project.techStack.length > 0) {
      return project.techStack
    }
    if (project?.tech) {
      return String(project.tech)
        .split(/[,/·+]/)
        .map((t) => t.trim())
        .filter(Boolean)
    }
    if (Array.isArray(project?.technologies) && project.technologies.length > 0) {
      return project.technologies
    }
    return ['REACT', 'WEB3']
  }, [project])

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
        {/* Physical glass backing panel */}
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
            transmission={0.88}
            opacity={1}
            metalness={0.5}
            roughness={0.12}
            ior={1.5}
            thickness={0.5}
            color="#12121a"
            transparent
          />
        </mesh>

        {/* Physical VHS / Poster Card Projection with CRT Scanlines & Neon Sheen */}
        <Html
          transform
          distanceFactor={1.5}
          position={[0, 0, 0.08]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`relative w-[340px] h-[480px] bg-gradient-to-br from-black via-[#0a0a1a] to-[#1a0b2e] border ${
              hovered ? 'border-[#14F195]/50' : 'border-white/20'
            } rounded-xl p-8 flex flex-col justify-between backdrop-blur-md shadow-[0_0_30px_rgba(153,69,255,0.2)] select-none overflow-hidden transition-all duration-300`}
            style={{
              pointerEvents: 'none',
              backgroundImage: `
                radial-gradient(ellipse at top right, rgba(153, 69, 255, 0.25), transparent 60%),
                radial-gradient(ellipse at bottom left, rgba(20, 241, 149, 0.15), transparent 50%),
                repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 1px, transparent 1px, transparent 3px)
              `,
            }}
          >
            {/* Top: Index & VHS Metadata */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#9945FF] font-bold uppercase">
                  {`[ 0${index + 1} // ${category.toUpperCase()} ]`}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 tracking-wider">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      hovered ? 'bg-[#14F195] animate-ping' : 'bg-[#9945FF]'
                    }`}
                  />
                  <span>VHS_TAPE</span>
                </div>
              </div>

              {/* Title: Massive and aggressive */}
              <h3 className="font-black text-4xl text-white uppercase tracking-tighter leading-none mb-4 break-words drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
                {title}
              </h3>

              {/* Description */}
              <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
                {description ||
                  'Architected on high-performance decentralized systems with real-time reactive shaders.'}
              </p>
            </div>

            {/* Bottom: Glowing Tech Chips & Catalog Stamp */}
            <div className="border-t border-white/10 pt-4">
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2.5 flex items-center justify-between">
                <span>TECH MATRIX</span>
                <span>TXSIGHT // 2026</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techList.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-white/10 text-[#14F195] border border-[#14F195]/30 rounded font-mono shadow-[0_0_12px_rgba(20,241,149,0.18)]"
                  >
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}
