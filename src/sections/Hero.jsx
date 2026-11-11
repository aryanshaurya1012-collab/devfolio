import Icon from '../components/Icon'
import { portfolio } from '../data/portfolio'

export default function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="hero__content">
        <p className="eyebrow hero__eyebrow"><span className="status-dot" /> Available for meaningful work</p>
        <h1>Building digital experiences with <span>clarity and craft.</span></h1>
        <p className="hero__intro">{portfolio.intro}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">Explore my work <Icon name="arrow" size={18} /></a>
          <a className="button button--quiet" href="#contact">Let&apos;s connect</a>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="orb orb--large" />
        <div className="orb orb--small" />
        <div className="hero__code">
          <span><b>01</b> const <i>craft</i> = &#123;</span>
          <span><b>02</b>&nbsp; purpose: <em>&apos;useful&apos;</em>,</span>
          <span><b>03</b>&nbsp; details: <em>&apos;considered&apos;</em>,</span>
          <span><b>04</b>&nbsp; impact: <em>&apos;real&apos;</em></span>
          <span><b>05</b> &#125;</span>
        </div>
      </div>
      <a className="scroll-cue" href="#about"><span /> Scroll to explore</a>
    </section>
  )
}
