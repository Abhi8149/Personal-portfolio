import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, MapPin, Youtube } from 'lucide-react';
import { InteractiveNeuralCore } from './NeuralBackground';
import { profile } from '../lib/data';

const technologies = [
  'Python',
  'TypeScript',
  'PyTorch',
  'React',
  'Next.js',
  'React Native',
  'LangChain',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
];

const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'YouTube', href: profile.youtube, icon: Youtube },
];

export function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            AI/ML undergrad · Full-stack builder
          </div>

          <h1 className="hero-title">
            <span>I build</span>
            <span>intelligence</span>
            <span className="text-acid">that ships.</span>
          </h1>

          <p className="hero-intro">
            I&apos;m <strong>Abhinav Shivkumar Ovhal</strong> — an AI/ML student at NIT Kurukshetra
            turning ambitious ideas into agents, machine-learning research, and useful products.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              Explore selected work
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a href={profile.resume} download className="btn-secondary">
              Download résumé
              <Download size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-social-row">
            <span className="hero-social-row__label">
              <MapPin size={14} aria-hidden="true" />
              Kurukshetra, India
            </span>
            <span className="hero-social-row__divider" aria-hidden="true" />
            <div className="flex items-center gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label={`${link.label} (opens in a new tab)`}
                >
                  <link.icon size={17} aria-hidden="true" />
                </a>
              ))}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-inline-link"
              >
                @Abhi8149
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <InteractiveNeuralCore />
        </motion.div>
      </div>

      <motion.dl
        className="container hero-proof"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.35 }}
      >
        <div>
          <dt>Public repositories</dt>
          <dd>40<span>+</span></dd>
        </div>
        <div>
          <dt>DSA problems solved</dt>
          <dd>500<span>+</span></dd>
        </div>
        <div>
          <dt>Featured video builds</dt>
          <dd>03</dd>
        </div>
        <div>
          <dt>B.Tech AI &amp; ML</dt>
          <dd className="hero-proof__year">2027</dd>
        </div>
      </motion.dl>

      <div className="tech-ticker" aria-hidden="true">
        <div className="tech-ticker__track">
          {[...technologies, ...technologies].map((technology, index) => (
            <span key={`${technology}-${index}`}>
              {technology}
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
