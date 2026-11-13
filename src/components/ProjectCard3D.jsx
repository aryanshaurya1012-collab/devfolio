import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Global geometry compiled once for maximum WebGL performance
const CARD_GEOMETRY = new THREE.PlaneGeometry(5, 7.5)

export default function ProjectCard3D({
  project,
  index,
  totalProjects = 1,
  position = [0, 0, 0],
  scroll,
}) {
  const cardGroupRef = useRef(null)
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Safe fallback metadata
  const title = (project?.title || `PROJECT 0${index + 1}`).trim()
  const category = (project?.category || 'MODULE').trim()
  const description = (project?.description || '').trim()

  // Parse tech stack into individual badge strings
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
    return ['REACT', 'THREE.JS', 'WEB3']
  }, [project])

  useFrame((_state, delta) => {
    if (!cardGroupRef.current) return

    // Calculate distance from center via scroll offset
    const total = Math.max(1, totalProjects - 1)
    const currentActiveIndex = scroll ? scroll.offset * total : 0
    const indexDistance = Math.abs(index - currentActiveIndex)
    const normalizedDist = Math.min(1, indexDistance)

    // Center = scale(1.1). Edges = scale(0.8)
    const baseScale = 1.1 - normalizedDist * 0.3
    const targetScale = hovered ? baseScale * 1.05 : baseScale

    // 3D cover-flow rotation & depth recession
    const targetRotY = -Math.max(
      -0.35,
      Math.min(0.35, (index - currentActiveIndex) * 0.3),
    )
    const targetPosZ = -Math.min(3, indexDistance * 0.8)

    // Fluid maath dampening
    easing.damp3(
      cardGroupRef.current.scale,
      [targetScale, targetScale, targetScale],
      0.2,
      delta,
    )
    easing.dampE(cardGroupRef.current.rotation, [0, targetRotY, 0], 0.25, delta)
    easing.damp(cardGroupRef.current.position, 'z', targetPosZ, 0.22, delta)
  })

  return (
    <group ref={cardGroupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.35}>
        {/* Massive 5x7.5 Physical Glass Panel */}
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
            roughness={0.1}
            metalness={0.8}
            clearcoat={1}
            color="#050505"
            transparent
          />
        </mesh>

        {/* Razor-Sharp HTML Projected Overlay */}
        <Html
          transform
          distanceFactor={3.5}
          position={[0, 0, 0.05]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`w-[40vw] min-w-[400px] h-[60vh] min-h-[600px] flex flex-col justify-between p-10 bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-2xl border-2 ${
              hovered ? 'border-[#14F195]/60 shadow-[0_0_60px_rgba(20,241,149,0.3)]' : 'border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]'
            } rounded-3xl overflow-hidden select-none transition-colors duration-300`}
            style={{
              pointerEvents: 'none',
              backgroundImage: `
                radial-gradient(ellipse at top right, rgba(153, 69, 255, 0.2), transparent 60%),
                radial-gradient(ellipse at bottom left, rgba(20, 241, 149, 0.15), transparent 50%),
                repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 3px)
              `,
            }}
          >
            {/* Top Eyebrow & Status */}
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#14F195] font-bold uppercase">
                  {`// 0${index + 1}  ${category.toUpperCase()}`}
                </span>
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 tracking-widest">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#14F195] animate-pulse shadow-[0_0_8px_#14F195]" />
                  <span>DEV_OS</span>
                </div>
              </div>

              {/* Massive Aggressive Title */}
              <h3 className="font-black text-6xl md:text-8xl tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 leading-none">
                {title}
              </h3>

              {/* Description */}
              <p className="font-mono text-lg md:text-xl text-gray-400 mt-6 leading-relaxed line-clamp-4">
                {description ||
                  'High-performance decentralized interface and real-time WebGL graphics module.'}
              </p>
            </div>

            {/* Bottom: Neon Tech Stack Pills */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-wrap gap-2.5">
                {techList.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 bg-[#14F195]/10 text-[#14F195] border border-[#14F195]/30 rounded-full font-mono text-sm font-bold shadow-[0_0_15px_rgba(20,241,149,0.15)]"
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
