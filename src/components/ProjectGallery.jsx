import { ScrollControls, Scroll } from '@react-three/drei'
import ProjectCard3D from './ProjectCard3D'

export default function ProjectGallery({ projects = [] }) {
  const safeProjects =
    Array.isArray(projects) && projects.length > 0
      ? projects
      : [
          {
            title: 'NEW PROJECT',
            tech: 'REACT / WEB3',
            category: 'DRAFT',
            description: 'Add your first project using the editor sidebar.',
          },
        ]

  return (
    <ScrollControls
      pages={Math.max(1, safeProjects.length)}
      damping={0.15}
      distance={1.5}
      horizontal
    >
      <Scroll>
        {safeProjects.map((project, index) => (
          <ProjectCard3D
            key={project.id || `proj-${index}`}
            project={project}
            index={index}
            position={[index * 4, 0, 0]}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}
