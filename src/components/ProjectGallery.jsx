import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import ProjectCard3D from './ProjectCard3D'

function GalleryContent({ projects }) {
  const scroll = useScroll()
  const groupRef = useRef(null)
  const { width } = useThree((state) => state.viewport)

  // Step 5 & Step 15: Exact base spacing 5.5, responsively expanded on ultra-wide viewports
  const spacing = Math.max(5.5, width * 0.38)
  const total = Math.max(1, projects.length - 1)

  useFrame(() => {
    if (groupRef.current && scroll) {
      // Glides smoothly along the X axis driven by the dampened scroll offset
      groupRef.current.position.x = -scroll.offset * total * spacing
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id || index}
          project={project}
          index={index}
          totalProjects={projects.length}
          position={[index * spacing, 0, 0]}
          scroll={scroll}
        />
      ))}
    </group>
  )
}

export default function ProjectGallery({ projects = [], isEditing = false }) {
  const safeProjects =
    Array.isArray(projects) && projects.length > 0
      ? projects
      : [
          {
            id: 'proj-1',
            title: 'Aether',
            description:
              'A minimal study in digital presence, editorial typography, and physical WebGL materiality.',
            year: 'YEAR // 2026',
            tech: 'React · WebGL',
          },
          {
            id: 'proj-2',
            title: 'Monolith',
            description:
              'High-fidelity generative architecture visualizer with real-time reactive shaders.',
            year: 'YEAR // 2025',
            tech: 'GLSL · Three.js',
          },
          {
            id: 'proj-3',
            title: 'Chronos',
            description:
              'A sonic and spatial interface inspired by mid-century audio engineering.',
            year: 'YEAR // 2024',
            tech: 'WebAudio · Canvas',
          },
        ]

  return (
    <ScrollControls
      pages={Math.max(1, safeProjects.length)}
      damping={0.2}
      distance={2}
      horizontal
      enabled={!isEditing}
    >
      <GalleryContent projects={safeProjects} />
    </ScrollControls>
  )
}
