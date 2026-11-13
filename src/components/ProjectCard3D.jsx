import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { ArrowUpRight } from 'lucide-react';

// Single geometries compiled once for optimal WebGL performance
const BOX_GEOMETRY = new THREE.BoxGeometry(4.0, 5.2, 0.2);
const BACKPLATE_GEOMETRY = new THREE.PlaneGeometry(4.2, 5.4);

export default function ProjectCard3D({
  project,
  index,
  totalProjects = 1,
  smoothIndex,
  spacing = 5.5,
  onSelectProject,
  onInspectProject,
  themeConfig,
  mode = 'dark',
}) {
  const groupRef = useRef(null);
  const backplateMatRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [localPointer, setLocalPointer] = useState({ x: 0, y: 0 });

  const isLight = mode === 'light';

  // Parse tech stack into individual tags
  const techList = useMemo(() => {
    if (Array.isArray(project?.tech) && project.tech.length > 0) {
      return project.tech;
    }
    if (typeof project?.tech === 'string') {
      return project.tech.split(',').map((t) => t.trim()).filter(Boolean);
    }
    return ['React', 'TypeScript', 'WebGL'];
  }, [project]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    // Real-time continuous distance from active camera focus
    const currentIndex = smoothIndex?.current ?? 0;
    const dist = index - currentIndex;
    const absDist = Math.abs(dist);
    const isActive = absDist < 0.45;

    // Cylindrical curved 3D arch trajectory
    const targetX = dist * spacing;
    const baseZ = -Math.min(7.5, Math.pow(absDist, 1.15) * 1.8);
    const hoverZ = hovered ? 0.35 : 0;
    const targetZ = baseZ + hoverZ;

    // Rotation: Arch curvature + Mouse hover 3D tilt
    const baseRotY = -Math.max(-0.55, Math.min(0.55, dist * 0.26));
    const tiltX = hovered ? localPointer.y * 0.16 : 0;
    const tiltY = hovered ? localPointer.x * -0.16 : 0;

    // Scale: Active center monolith commands focus
    const baseScale = Math.max(0.78, 1.0 - Math.min(1.2, absDist) * 0.16);
    const targetScale = hovered ? baseScale * 1.03 : baseScale;

    // Frame-perfect positioning: cards move in exact mathematical unison
    groupRef.current.position.set(targetX, 0, targetZ);
    groupRef.current.rotation.set(tiltX, baseRotY + tiltY, 0);
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    // Glowing backplate opacity
    if (backplateMatRef.current) {
      const glowTarget = isActive ? (isLight ? 0.3 : 0.45) : hovered ? 0.25 : 0.0;
      easing.damp(backplateMatRef.current, 'opacity', glowTarget, 0.2, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing Backplate Mesh */}
      <mesh position={[0, 0, -0.12]} geometry={BACKPLATE_GEOMETRY}>
        <meshBasicMaterial
          ref={backplateMatRef}
          color={project.accent || themeConfig?.accent || '#a78bfa'}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Monolith Physical Bezel */}
      <mesh
        geometry={BOX_GEOMETRY}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.point && groupRef.current) {
            setLocalPointer({
              x: Math.max(-1, Math.min(1, (e.uv ? e.uv.x - 0.5 : 0) * 2)),
              y: Math.max(-1, Math.min(1, (e.uv ? e.uv.y - 0.5 : 0) * 2)),
            });
          }
        }}
        onPointerOut={() => {
          setHovered(false);
          setLocalPointer({ x: 0, y: 0 });
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          const currentIndex = smoothIndex?.current ?? 0;
          const dist = Math.abs(index - currentIndex);
          if (dist < 0.45) {
            onInspectProject(project);
          } else {
            onSelectProject(index);
          }
        }}
      >
        <meshStandardMaterial
          color={isLight ? '#ffffff' : themeConfig?.cardMeshColor || '#221d2d'}
          metalness={isLight ? 0.1 : 0.7}
          roughness={isLight ? 0.3 : 0.25}
        />
      </mesh>

      {/* Editorial HTML Card Overlay */}
      <Html
        transform
        distanceFactor={5.0}
        position={[0, 0, 0.11]}
        center
        style={{ pointerEvents: 'auto' }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = smoothIndex?.current ?? 0;
            const dist = Math.abs(index - currentIndex);
            if (dist < 0.45) {
              onInspectProject(project);
            } else {
              onSelectProject(index);
            }
          }}
          className={`w-[350px] h-[460px] rounded-2xl p-6 flex flex-col justify-between select-none cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-xl border ${
            isLight
              ? 'bg-white/95 border-black/15 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
              : 'bg-[#0a080e]/95 border-white/20 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
          } ${
            hovered
              ? isLight
                ? 'shadow-[0_0_35px_rgba(0,0,0,0.2)]'
                : 'shadow-[0_0_40px_rgba(255,255,255,0.2)]'
              : ''
          }`}
          style={{
            backgroundColor: isLight ? '#ffffff' : '#0a080e',
          }}
        >
          {/* Accent Glow Top Highlight */}
          <div
            className={`absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
              isLight ? 'opacity-20' : 'opacity-35'
            }`}
            style={{ backgroundColor: project.accent || themeConfig?.accent || '#a78bfa' }}
          />

          {/* Editorial Poster Header */}
          <div className="relative z-10">
            <div
              className={`flex items-center justify-between pb-3.5 mb-4 border-b ${
                isLight ? 'border-black/10' : 'border-white/15'
              }`}
            >
              <span
                className={`font-mono text-xs tracking-[0.2em] font-semibold ${
                  isLight ? 'text-zinc-700' : 'text-white/90'
                }`}
              >
                0{index + 1} // 0{totalProjects}
              </span>

              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${project.accent}18`,
                    borderColor: `${project.accent}45`,
                    color: isLight ? themeConfig?.accentText || project.accent : project.accent,
                  }}
                >
                  {project.category || 'CASE STUDY'}
                </span>

                <span
                  className={`font-mono text-[11px] font-semibold ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  {project.year || '2026'}
                </span>
              </div>
            </div>

            {/* Display Typography */}
            <h2
              className={`font-serif text-4xl sm:text-5xl tracking-tight leading-none mb-3 ${
                isLight ? 'text-zinc-950 font-medium' : 'text-white drop-shadow-md'
              }`}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              className={`font-sans text-xs leading-relaxed line-clamp-3 ${
                isLight ? 'text-zinc-700 font-normal' : 'text-zinc-300'
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Visual Cover Banner Accent */}
          <div className="relative z-10 my-auto py-1">
            <div
              className={`h-12 rounded-xl border flex items-center justify-between px-3.5 ${
                isLight ? 'border-black/10' : 'border-white/10'
              }`}
              style={{
                background: isLight
                  ? `linear-gradient(90deg, ${project.accent}14 0%, rgba(0,0,0,0.02) 100%)`
                  : `linear-gradient(90deg, ${project.accent}18 0%, rgba(255,255,255,0.02) 100%)`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: project.accent }}
                />
                <span
                  className={`font-sans text-[10px] uppercase tracking-widest font-semibold ${
                    isLight ? 'text-zinc-800' : 'text-zinc-300'
                  }`}
                >
                  Interactive Node
                </span>
              </div>
              <span
                className={`font-mono text-[10px] font-medium ${
                  isLight ? 'text-zinc-600' : 'text-zinc-500'
                }`}
              >
                DEV-OS ENGINE
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div
            className={`relative z-10 border-t pt-3.5 ${
              isLight ? 'border-black/10' : 'border-white/15'
            }`}
          >
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {techList.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${
                    isLight
                      ? 'text-zinc-800 bg-black/5 border-black/10 font-semibold'
                      : 'text-zinc-300 bg-white/5 border-white/10'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Live Case Study CTA Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspectProject(project);
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-sans text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-between group/btn cursor-pointer ${
                isLight
                  ? 'bg-zinc-900 hover:bg-black text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <span>Explore Case Study</span>
              <ArrowUpRight
                size={14}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
