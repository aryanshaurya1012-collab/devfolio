import SectionHeading from '../components/SectionHeading'
import { skills } from '../data/portfolio'

export default function Skills() {
  const groups = [...new Set(skills.map((skill) => skill.group))]

  return (
    <section className="section section--muted" id="skills">
      <div className="container">
        <SectionHeading eyebrow="02 / Capabilities" title="The tools I use to turn ideas into interfaces." />
        <div className="skills-grid">
          {groups.map((group) => (
            <div className="skill-group" key={group}>
              <p className="skill-group__label">{group}</p>
              <div className="skill-list">
                {skills.filter((skill) => skill.group === group).map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <span>{skill.name}</span>
                    <small>{skill.level}</small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
