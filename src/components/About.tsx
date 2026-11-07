import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Code2,
  Download,
  Gamepad2,
  GraduationCap,
  PenTool,
  Rocket,
  Workflow,
} from 'lucide-react';
import { profile } from '../lib/data';
import { Tilt } from './fx/interactive';

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
          <Tilt max={4} scale={1.005} className="tilt-full">
          <motion.article
            className="about-manifesto tilt-inner-full"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <div className="about-manifesto__person">
              <motion.img
                src={profile.photo}
                alt={profile.photoAlt}
                width={1502}
                height={1600}
                loading="lazy"
                className="about-manifesto__photo"
                initial={{ scale: 1.18, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <div>
                <strong>{profile.name}</strong>
                <span>AI/ML Engineer · Full-Stack Builder</span>
                <span className="about-manifesto__avail"><i aria-hidden="true" /> Open to hire — referrals welcome</span>
              </div>
            </div>
            <span className="about-manifesto__label">My builder philosophy</span>
            <h3>Understand the math.<br />Design the system.<br /><em>Ship the product.</em></h3>
            <div className="about-manifesto__footer">
              <img src={profile.photo} alt="" width={60} height={60} loading="lazy" className="about-monogram-photo" />
              <p>Build with curiosity.<br />Ship with intent.</p>
            </div>
          </motion.article>
          </Tilt>

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

        <motion.ul
          className="hire-signals"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {[
            { icon: Rocket, title: 'Ships live products', text: 'Availo is on the Play Store — not a demo, a real product with real users.' },
            { icon: Brain, title: 'Research-grade ML', text: 'Graph ML at 0.850 AUC-ROC with leakage-free evaluation. I understand the math.' },
            { icon: Workflow, title: 'Systems thinker', text: '9+ low-level designs before code. Architecture first, then execution.' },
          ].map((signal) => (
            <motion.li
              key={signal.title}
              className="hire-signal"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="hire-signal__icon"><signal.icon size={19} aria-hidden="true" /></span>
              <div>
                <h3>Why hire me — {signal.title}</h3>
                <p>{signal.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

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
