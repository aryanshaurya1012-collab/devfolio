import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { ArrowUpRight } from 'lucide-react';

// Single geometries compiled once for optimal WebGL performance
const BOX_GEOMETRY = new THREE.BoxGeometry(4.4, 6.0, 0.22);
const BACKPLATE_GEOMETRY = new THREE.PlaneGeometry(4.6, 6.2);

export default function ProjectCard3D({
  project,
  index,
  totalProjects = 1,
  smoothIndex,
  spacing = 5.6,
  onSelectProject,
  onInspectProject,
}) {
  const groupRef = useRef(null);
  const backplateMatRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [localPointer, setLocalPointer] = useState({ x: 0, y: 0 });

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

    // Step 11: Cylindrical curved 3D arch trajectory
    const targetX = dist * spacing;
    const baseZ = -Math.min(7.5, Math.pow(absDist, 1.15) * 1.8);
    const hoverZ = hovered ? 0.4 : 0;
    const targetZ = baseZ + hoverZ;

    // Rotation: Arch curvature + Mouse hover 3D tilt
    const baseRotY = -Math.max(-0.55, Math.min(0.55, dist * 0.26));
    const tiltX = hovered ? localPointer.y * 0.18 : 0;
    const tiltY = hovered ? localPointer.x * -0.18 : 0;

    // Scale: Active center monolith commands 60%+ height
    const baseScale = Math.max(0.78, 1.0 - Math.min(1.2, absDist) * 0.16);
    const targetScale = hovered ? baseScale * 1.03 : baseScale;

    // Frame-perfect positioning: cards move in exact mathematical unison
    groupRef.current.position.set(targetX, 0, targetZ);
    groupRef.current.rotation.set(tiltX, baseRotY + tiltY, 0);
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    // Glowing backplate opacity
    if (backplateMatRef.current) {
      const glowTarget = isActive ? 0.45 : hovered ? 0.25 : 0.0;
      easing.damp(backplateMatRef.current, 'opacity', glowTarget, 0.2, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing Backplate Mesh */}
      <mesh position={[0, 0, -0.13]} geometry={BACKPLATE_GEOMETRY}>
        <meshBasicMaterial
          ref={backplateMatRef}
          color={project.accent || '#a78bfa'}
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
          color="#221d2d"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Editorial HTML Card Overlay */}
      <Html
        transform
        distanceFactor={5.2}
        position={[0, 0, 0.12]}
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
          className={`w-[380px] h-[520px] bg-gradient-to-br ${
            project.gradient || 'from-violet-500/30 via-indigo-950/40 to-zinc-950'
          } border border-white/20 rounded-2xl p-7 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden select-none cursor-pointer transition-shadow duration-300 ${
            hovered ? 'shadow-[0_0_40px_rgba(255,255,255,0.2)]' : ''
          }`}
          style={{
            backgroundColor: '#0a080e',
          }}
        >
          {/* Accent Glow Top Highlight */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-35 pointer-events-none"
            style={{ backgroundColor: project.accent || '#a78bfa' }}
          />

          {/* Editorial Poster Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
              <span className="font-mono text-xs tracking-[0.2em] font-semibold text-white/90">
                0{index + 1} // 0{totalProjects}
              </span>

              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${project.accent}15`,
                    borderColor: `${project.accent}40`,
                    color: project.accent || '#a78bfa',
                  }}
                >
                  {project.category || 'CASE STUDY'}
                </span>

                <span className="font-mono text-[11px] text-zinc-400">
                  {project.year || '2026'}
                </span>
              </div>
            </div>

            {/* Display Typography */}
            <h2 className="font-serif text-5xl tracking-tight text-white drop-shadow-md leading-none mb-4">
              {project.title}
            </h2>

            {/* Description */}
            <p className="font-sans text-xs text-zinc-300 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Visual Cover Banner Accent */}
          <div className="relative z-10 my-auto py-2">
            <div
              className="h-14 rounded-xl border border-white/10 flex items-center justify-between px-4"
              style={{
                background: `linear-gradient(90deg, ${project.accent}18 0%, rgba(255,255,255,0.02) 100%)`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: project.accent || '#a78bfa' }}
                />
                <span className="font-sans text-[11px] uppercase tracking-widest text-zinc-300 font-medium">
                  Interactive Node
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                DEV-OS ENGINE
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="relative z-10 border-t border-white/15 pt-4">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {techList.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium text-zinc-300 bg-white/5 border border-white/10"
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
              className="w-full py-2.5 px-4 rounded-xl font-sans text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-between group/btn cursor-pointer"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight
                size={14}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-white/90"
              />
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
