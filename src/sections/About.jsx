import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'

export default function About() {
  return (
    <section className="section container" id="about">
      <SectionHeading eyebrow="01 / About" title="A thoughtful approach to building for the web.">
        Good work sits at the intersection of empathy, intention, and execution.
      </SectionHeading>
      <div className="about-grid">
        <div className="about-lead"><p>{portfolio.about}</p></div>
        <div className="about-details">
          <p>My process is grounded in understanding the people on the other side of the screen, then shaping a solution that feels simple to use and solid under the hood.</p>
          <p>This introduction is yours to personalize with your background, interests, and the work you want to attract.</p>
        </div>
      </div>
    </section>
  )
}
