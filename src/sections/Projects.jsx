import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/portfolio'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', ...new Set(projects.map((project) => project.category))]
  const filteredProjects = useMemo(
    () => activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  )

  return (
    <section className="section container" id="projects">
      <div className="projects-heading">
        <SectionHeading eyebrow="03 / Selected work" title="A selection of things I&apos;ve built." />
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? 'filter-button is-active' : 'filter-button'}
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <article className={`project-card project-card--${index + 1}`} key={project.id}>
            <div className="project-card__visual">
              <span className="project-number">0{index + 1}</span>
              {project.placeholder && <span className="project-card__note">Personalize this card</span>}
              <div className="project-card__shape" />
            </div>
            <div className="project-card__body">
              <div className="project-card__meta"><span>{project.category}</span><span>{project.technologies.join(' · ')}</span></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-card__links">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project <Icon name="external" size={15} /></a>}
                {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer">Source code <Icon name="github" size={15} /></a>}
                {!project.liveUrl && !project.sourceUrl && <span className="project-link-muted">Links can be added here</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
