import { useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import ProjectCard3D from './ProjectCard3D'

function GalleryContent({
  projects,
  onOpenCaseStudy,
  onActiveIndexChange,
  targetIndexRef,
}) {
  const scroll = useScroll()
  const { width } = useThree((state) => state.viewport)
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)
  const lastReportedIndex = useRef(0)

  // Step 15: Responsive spacing that prevents overlap
  const spacing = Math.max(5.6, width * 0.38)
  const total = Math.max(1, projects.length - 1)

  useFrame(() => {
    if (!scroll) return

    // External target animation from Prev/Next buttons
    if (targetIndexRef && targetIndexRef.current !== null) {
      const targetOffset = targetIndexRef.current / total
      if (scroll.el) {
        const maxScroll = scroll.el.scrollWidth - scroll.el.clientWidth
        const targetScrollLeft = targetOffset * maxScroll
        scroll.el.scrollLeft += (targetScrollLeft - scroll.el.scrollLeft) * 0.12
        if (Math.abs(scroll.el.scrollLeft - targetScrollLeft) < 1.5) {
          scroll.el.scrollLeft = targetScrollLeft
          targetIndexRef.current = null
        }
      }
    }

    // Step 10: Zero-Offset Center Alignment
    const computedIndex = scroll.offset * total
    setCurrentActiveIndex(computedIndex)

    const roundedIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(computedIndex)),
    )
    if (roundedIndex !== lastReportedIndex.current) {
      lastReportedIndex.current = roundedIndex
      if (onActiveIndexChange) {
        onActiveIndexChange(roundedIndex)
      }
    }
  })

  function handleScrollToIndex(index) {
    if (scroll && scroll.el) {
      const targetOffset = index / total
      const maxScroll = scroll.el.scrollWidth - scroll.el.clientWidth
      const targetScrollLeft = targetOffset * maxScroll
      scroll.el.scrollTo({ left: targetScrollLeft, behavior: 'smooth' })
    }
  }

  return (
    <group>
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id || index}
          project={project}
          index={index}
          totalProjects={projects.length}
          currentActiveIndex={currentActiveIndex}
          spacing={spacing}
          onScrollToIndex={handleScrollToIndex}
          onOpenCaseStudy={onOpenCaseStudy}
        />
      ))}
    </group>
  )
}

export default function ProjectGallery({
  projects = [],
  isEditing = false,
  onOpenCaseStudy,
  onActiveIndexChange,
  targetIndexRef,
}) {
  return (
    <ScrollControls
      pages={Math.max(2, projects.length * 0.8)}
      damping={0.2}
      distance={2}
      horizontal
      enabled={!isEditing}
    >
      <GalleryContent
        projects={projects}
        onOpenCaseStudy={onOpenCaseStudy}
        onActiveIndexChange={onActiveIndexChange}
        targetIndexRef={targetIndexRef}
      />
    </ScrollControls>
  )
}
