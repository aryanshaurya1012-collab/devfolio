import { ScrollControls, Scroll } from '@react-three/drei'
import { projects } from '../data/portfolio'
import ProjectCard3D from './ProjectCard3D'

export default function ProjectGallery() {
  return (
    <ScrollControls pages={projects.length} damping={0.1} horizontal>
      <Scroll>
        {projects.map((project, index) => (
          <ProjectCard3D
            key={project.id || index}
            project={project}
            index={index}
            position={[index * 4, 0, 0]}
          />
        ))}
      </Scroll>
    </ScrollControls>
  )
}

