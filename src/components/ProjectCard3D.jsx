import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { easing } from 'maath';

export default function ProjectCard3D({
  project,
  index,
  total,
  activeIndexRef,
  onSelectProject,
  onInspectProject,
  isModalOpen
}) {
  const groupRef = useRef();
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentActive = activeIndexRef.current;
    const dist = index - currentActive;
    const absDist = Math.abs(dist);
    const isCentered = absDist < 0.35;

    // Cylindrical 3D Arch Coordinates
    const spacing = 5.4;
    const targetX = dist * spacing;
    const targetZ = -Math.pow(absDist, 1.35) * 2.2 + (hovered && isCentered ? 0.5 : 0);
    const targetY = Math.sin(state.clock.elapsedTime * 1.4 + index) * 0.12 - absDist * 0.25;

    easing.damp3(groupRef.current.position, [targetX, targetY, targetZ], 0.22, delta);

    // 3D Rotation + Interactive Pointer Parallax Tilt
    const pointerTiltY = hovered ? state.pointer.x * 0.18 : 0;
    const pointerTiltX = hovered ? -state.pointer.y * 0.14 : 0;
    const targetRotY = -dist * 0.32 + pointerTiltY;
    const targetRotX = pointerTiltX;
    const targetRotZ = -dist * 0.04;

    easing.dampE(groupRef.current.rotation, [targetRotX, targetRotY, targetRotZ], 0.22, delta);

    // Dynamic Scale
    const baseScale = isCentered ? 1.08 : Math.max(0.78, 1 - absDist * 0.16);
    const hoverBoost = hovered ? 1.03 : 1;
    const finalScale = baseScale * hoverBoost;
    easing.damp3(groupRef.current.scale, [finalScale, finalScale, finalScale], 0.2, delta);

    // Backlight Glow Intensity
    if (glowRef.current) {
      const targetOpacity = isCentered ? 0.45 : 0.08;
      easing.damp(glowRef.current.material, 'opacity', targetOpacity, 0.2, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Coloured Ambient Backlight Aura */}
      <mesh ref={glowRef} position={[0, 0, -0.18]}>
        <planeGeometry args={[4.9, 6.5]} />
        <meshBasicMaterial color={project.accent || '#f59e0b'} transparent opacity={0.25} />
      </mesh>

      {/* Physical 3D Monolith Slab */}
      <RoundedBox 0.22]} 5.9, args="{[4.3, " onPointerOver="{(e)" radius="{ 0.12}" ref="{ meshRef }" smoothness="{ 4}"> {
          e.stopPropagation();
      setHovered(true);
      document.body.style.cursor = 'pointer';
        }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelectProject(index);
      }}
      >
      <meshStandardMaterial
        color={hovered ? '#2d2538' : '#1d1824'}
        metalness={0.75}
        roughness={0.22}
      />

      {/* Crisp High-Contrast Editorial Poster UI */}
      {!isModalOpen && (
        <Html 'auto' 0, 0.12]} center distanceFactor="{5.1}" pointerEvents: position="{[0, " style="{{
          " transform }}>
            <div
              onClick = { (e) => {
                e.stopPropagation();
          onSelectProject(index);
        }}
      className={`w-[360px] h-[500px] rounded-2xl p-7 flex flex-col justify-between select-none transition-all duration-300 bg-gradient-to-b ${project.gradient || 'from-amber-500/25 via-zinc-900 to-zinc-950'
        } bg-[#120f18]/95 border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden group`}
            >
      {/* Top Accent Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: project.accent || '#f59e0b' }}
      />

      {/* Subtle Radial Spotlight inside Card */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: project.accent || '#f59e0b' }}
      />

      {/* Header Meta */}
      <div className="flex items-center justify-between text-[11px] font-sans tracking-[0.22em] uppercase text-white/70 z-10">
        <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white font-medium">
          {String(index + 1).padStart(2, '0')} // {String(total).padStart(2, '0')}
        </span>
        <span style={{ color: project.accent || '#fbbf24' }} className="font-semibold">
          {project.category || 'FEATURED'} • {project.year || '2026'}
        </span>
      </div>

      {/* Center Editorial Visual & Title */}
      <div className="my-auto py-4 flex flex-col items-center text-center z-10">
        <div
          className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center border border-white/20 shadow-inner"
          style={{
            background: `radial-gradient(circle, ${project.accent || '#f59e0b'}44 0%, transparent 70%)`
          }}
        >
          <span className="font-serif italic text-2xl text-white">
            {project.title?.charAt(0) || 'P'}
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight uppercase leading-[0.95] drop-shadow-sm mb-4">
          {project.title}
        </h2>

        <p className="font-sans text-xs text-zinc-200/90 leading-relaxed line-clamp-3 max-w-[290px]">
          {project.description}
        </p>
      </div>

      {/* Footer Tech Pills & CTA */}
      <div className="flex flex-col gap-3 z-10">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {(Array.isArray(project.tech)
            ? project.tech
            : String(project.tech || 'React, WebGL').split(',')
          )
            .slice(0, 4)
            .map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[10px] tracking-wider uppercase bg-white/10 text-white/90 border border-white/15 rounded-md"
              >
                {t.trim()}
              </span>
            ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspectProject(project);
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white border border-white/20 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Explore Case Study</span>
          <span>↗</span>
        </button>
      </div>
    </div>
          </Html >
        )
}
      </RoundedBox >
    </group >
  );
}