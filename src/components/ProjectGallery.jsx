import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import ProjectCard3D from './ProjectCard3D';

export default function ProjectGallery({
  projects = [],
  activeIndex,
  setActiveIndex,
  onInspectProject,
  isModalOpen
}) {
  const activeIndexRef = useRef(0);

  useFrame((_, delta) => {
    easing.damp(activeIndexRef, 'current', activeIndex, 0.18, delta);
  });

  if (!projects.length) return null;

  return (
    <group position={[0, 0.1, 0]}>
      {projects.map((project, index) => (
        <ProjectCard3D activeIndexRef="{activeIndexRef}" index="{index}" index} key="{project.id" onSelectProject="{(idx)" project="{project}" total="{projects.length}" ||> setActiveIndex(idx)}
      onInspectProject={onInspectProject}
      isModalOpen={isModalOpen}
        />
      ))}
    </group>
  );
}