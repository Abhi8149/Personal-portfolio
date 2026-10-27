import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Download,
  Gamepad2,
  GraduationCap,
  PenTool,
} from 'lucide-react';
import { profile } from '../lib/data';

const interests = [
  {
    icon: Gamepad2,
    title: 'Chess',
    description: 'Strategy, patience, and thinking a few moves ahead.',
  },
  {
    icon: PenTool,
    title: 'Writing',
    description: 'Making software and AI ideas easier to understand on Medium.',
  },
  {
    icon: BookOpen,
    title: 'Research',
    description: 'Reading about graph networks, transformers, and diffusion models.',
  },
];

export function About() {
  return (
    <section id="about" className="section-pad about-section">
      <div className="container">
        <motion.div
          className="section-heading section-heading--split"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-kicker">02 · About me</span>
            <h2 className="section-title">Curious by default.<br />Builder by choice.</h2>
          </div>
          <p className="section-subtitle">
            I enjoy the space between a difficult research problem and a product that feels simple to use.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.article
            className="about-manifesto"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <span className="about-manifesto__label">My builder philosophy</span>
            <h3>Understand the math.<br />Design the system.<br /><em>Ship the product.</em></h3>
            <div className="about-manifesto__footer">
              <span className="about-monogram">AS</span>
              <p>Build with curiosity.<br />Ship with intent.</p>
            </div>
          </motion.article>

          <motion.div
            className="about-story"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <p className="about-story__lead">
              My work starts with a problem, not a framework.
            </p>
            <p>
              Availo began with a simple observation: neighborhood shops were invisible online.
              That became a live product connecting shopkeepers with the customers around them.
            </p>
            <p>
              The same mindset drives my AI work — detecting illicit wallets in transaction graphs
              and building coding agents that stay useful without compromising developer control.
              I like owning the whole path from architecture to interface.
            </p>
            <div className="about-story__actions">
              <a href={profile.resume} download className="btn-secondary">
                Résumé
                <Download size={16} />
              </a>
              <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="project-text-link">
                Read my writing
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="about-info-grid">
          <motion.article
            className="education-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="about-info-card__icon"><GraduationCap size={22} /></div>
            <div>
              <span className="font-mono text-xs text-text-muted">EDUCATION · 2023—2027</span>
              <h3>National Institute of Technology, Kurukshetra</h3>
              <p>B.Tech in Artificial Intelligence &amp; Machine Learning</p>
            </div>
          </motion.article>

          <motion.article
            className="achievement-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08 }}
          >
            <div className="about-info-card__icon"><Code2 size={22} /></div>
            <div>
              <span className="font-mono text-xs text-text-muted">CONSISTENCY · PROBLEM SOLVING</span>
              <h3>500+ DSA problems solved</h3>
              <p>Plus certifications in machine learning and Node.js.</p>
              <a href={profile.codolio} target="_blank" rel="noopener noreferrer">
                View Codolio profile <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.article>
        </div>

        <div className="interests-grid">
          {interests.map((interest, index) => (
            <motion.article
              key={interest.title}
              className="interest-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
            >
              <interest.icon size={20} aria-hidden="true" />
              <div>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
