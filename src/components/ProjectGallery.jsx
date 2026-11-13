import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import ProjectCard3D from './ProjectCard3D';

export default function ProjectGallery({
  projects = [],
  activeIndex = 0,
  setActiveIndex,
  onInspectProject,
  isModalOpen = false,
}) {
  const smoothIndex = useRef(activeIndex);

  useFrame((_, delta) => {
    easing.damp(smoothIndex, 'current', activeIndex, 0.22, delta);
  });

  if (!projects.length) return null;

  return (
    <group position={[0, 0, 0]}>
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id || index}
          project={project}
          index={index}
          totalProjects={projects.length}
          smoothIndex={smoothIndex}
          spacing={5.6}
          onSelectProject={setActiveIndex}
          onInspectProject={onInspectProject}
        />
      ))}
    </group>
  );
}
