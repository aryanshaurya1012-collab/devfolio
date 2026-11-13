import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import ProjectCard3D from './ProjectCard3D'

function GalleryContent({ projects }) {
  const scroll = useScroll()
  const spacing = 7.0

  return (
    <>
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
    </>
  )
}

export default function ProjectGallery({ projects = [] }) {
  const safeProjects =
    Array.isArray(projects) && projects.length > 0
      ? projects
      : [
          {
            id: 'default-1',
            title: 'AETHER PROTOCOL',
            tech: 'Solidity, Three.js, React',
            category: 'DeFi',
            description:
              'Decentralized liquidity visualizer with real-time on-chain telemetry.',
          },
          {
            id: 'default-2',
            title: 'NEURAL NEXUS',
            tech: 'TypeScript, WebGL, Node.js',
            category: 'AI Node',
            description:
              'Generative AI node orchestrator and monitoring console.',
          },
        ]

  // Heavy, deliberate scroll physics (pages = projects.length * 0.5)
  const pages = Math.max(1.5, safeProjects.length * 0.5)

  return (
    <ScrollControls
      pages={pages}
      damping={0.15}
      distance={1.5}
      horizontal
    >
      <Scroll>
        <GalleryContent projects={safeProjects} />
      </Scroll>
    </ScrollControls>
  )
}
