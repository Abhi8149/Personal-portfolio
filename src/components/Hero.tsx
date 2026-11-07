import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, MapPin, MousePointer2, Youtube } from 'lucide-react';
import { InteractiveNeuralCore } from './NeuralBackground';
import { HeroPortrait } from './HeroPortrait';
import { AnimatedNumber, Magnetic, RotatingWord } from './fx/interactive';
import { profile } from '../lib/data';

const technologies = [
  'Python', 'TypeScript', 'PyTorch', 'React', 'Next.js', 'React Native', 'LangChain', 'Node.js', 'MongoDB', 'PostgreSQL',
];

const roles = ['AI agents', 'ML research', 'live products', 'real systems'];

const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'YouTube', href: profile.youtube, icon: Youtube },
];

const line = {
  hidden: { y: '115%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 0.9, delay: 0.08 + i * 0.11, ease: [0.16, 1, 0.3, 1] as const } }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      <div className="container hero-layout">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="status-dot" aria-hidden="true" />
            AI/ML undergrad · Full-stack builder · Open to hire
          </motion.div>

          <h1 className="hero-title" aria-label="I build intelligence that ships.">
            <span className="hero-line-mask" aria-hidden="true"><motion.span custom={0} variants={line} initial="hidden" animate="show">I build</motion.span></span>
            <span className="hero-line-mask" aria-hidden="true"><motion.span custom={1} variants={line} initial="hidden" animate="show" className="text-gradient-animated">intelligence</motion.span></span>
            <span className="hero-line-mask" aria-hidden="true"><motion.span custom={2} variants={line} initial="hidden" animate="show" className="text-acid">that ships.</motion.span></span>
          </h1>

          <motion.p
            className="hero-role-line"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            I turn <RotatingWord words={roles} /> into software people actually use.
          </motion.p>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          >
            I&apos;m <strong>Abhinav</strong> — an AI/ML student at NIT Kurukshetra
            turning ambitious ideas into agents, machine-learning research, and useful products.
            That&apos;s me on the right — the person who will own your problem end to end.
            <span className="hero-intro__hint"><MousePointer2 size={13} /> Tilt the portrait. Drag the 3D core below. Press <kbd>Ctrl K</kbd> to explore.</span>
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <a href="#projects" className="btn-primary btn-shine">
                Explore selected work
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#connect" className="btn-secondary">
                Hire me
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download className="btn-secondary">
                Download résumé
                <Download size={17} aria-hidden="true" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-social-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
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
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hero-inline-link">
                @Abhi8149
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual hero-visual--portrait"
          style={{ y: visualY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <HeroPortrait />
        </motion.div>
      </div>

      <motion.dl
        className="container hero-proof"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55 }}
      >
        <div><dt>Public repositories</dt><dd><AnimatedNumber value={40} suffix="+" /></dd></div>
        <div><dt>DSA problems solved</dt><dd><AnimatedNumber value={500} suffix="+" /></dd></div>
        <div><dt>Featured video builds</dt><dd><AnimatedNumber value={3} /></dd></div>
        <div><dt>B.Tech AI &amp; ML</dt><dd className="hero-proof__year">2027</dd></div>
      </motion.dl>

      <motion.div
        className="container hero-core"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-core__head">
          <div>
            <span className="section-kicker">Interactive · Don&apos;t just read — play</span>
            <h2 className="hero-core__title">Drag the systems core. <span>It thinks in three modes.</span></h2>
          </div>
          <p className="hero-core__copy">
            Agent, graph ML, and local commerce — the three worlds I build in, rendered as one
            interactive core. Switch modes, zoom in, and spin it around.
          </p>
        </div>
        <InteractiveNeuralCore />
      </motion.div>

      <div className="tech-ticker" aria-hidden="true">
        <div className="tech-ticker__track">
          {[...technologies, ...technologies].map((technology, index) => (
            <span key={`${technology}-${index}`}>{technology}<i /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
