import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <SectionHeading eyebrow="04 / Contact" title="Have a good idea? Let&apos;s make it real.">
          I&apos;m always open to thoughtful conversations, interesting problems, and opportunities to make useful things.
        </SectionHeading>
        <a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email} <Icon name="arrow" size={22} /></a>
        <div className="social-links">
          {portfolio.socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <Icon name="external" size={14} /></a>)}
        </div>
      </div>
    </section>
  )
}
