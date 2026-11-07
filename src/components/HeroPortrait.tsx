import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Linkedin, MapPin, Rocket } from 'lucide-react';
import { profile } from '../lib/data';
import { Magnetic, Tilt } from './fx/interactive';

const chips = [
  { label: 'Open to hire · Class of 2027', className: 'portrait-chip portrait-chip--hire', delay: 0.55, bobDelay: 0 },
  { label: 'Availo — live on Play Store', className: 'portrait-chip portrait-chip--availo', delay: 0.68, bobDelay: 0.7 },
  { label: '0.850 AUC-ROC · ML research', className: 'portrait-chip portrait-chip--research', delay: 0.81, bobDelay: 1.4 },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroPortrait() {
  return (
    <div className="portrait-stage">
      {/* Ambient glows drifting behind the portrait */}
      <motion.span
        className="portrait-glow portrait-glow--acid"
        aria-hidden="true"
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="portrait-glow portrait-glow--cyan"
        aria-hidden="true"
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating orbit ring */}
      <motion.span
        className="portrait-orbit"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        <i className="portrait-orbit__dot portrait-orbit__dot--a" />
        <i className="portrait-orbit__dot portrait-orbit__dot--b" />
        <i className="portrait-orbit__dot portrait-orbit__dot--c" />
      </motion.span>

      <Tilt max={6} scale={1.012} className="portrait-tilt">
        <motion.figure
          className="portrait-card tilt-inner-full"
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.25, ease: easeOut }}
          data-cursor="Hire me"
        >
          <motion.img
            src={profile.photo}
            alt={profile.photoAlt}
            className="portrait-card__img"
            width={1502}
            height={1600}
            fetchPriority="high"
            initial={{ scale: 1.14, filter: 'saturate(0.85)' }}
            animate={{ scale: 1, filter: 'saturate(1)' }}
            transition={{ duration: 1.3, delay: 0.3, ease: easeOut }}
          />
          <span className="portrait-card__shade" aria-hidden="true" />
          <span className="portrait-card__scan" aria-hidden="true" />

          <figcaption className="portrait-plate">
            <span className="portrait-plate__eyebrow">
              <BadgeCheck size={13} aria-hidden="true" />
              The builder behind the work
            </span>
            <strong className="portrait-plate__name">{profile.name}</strong>
            <span className="portrait-plate__role">
              AI/ML Engineer · Full-Stack Builder
              <span className="portrait-plate__loc">
                <MapPin size={12} aria-hidden="true" /> NIT Kurukshetra, India
              </span>
            </span>
            <span className="portrait-plate__actions">
              <Magnetic strength={0.25}>
                <a href="#connect" className="btn-primary btn-shine portrait-hire-btn">
                  Hire me <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="portrait-linkedin"
                aria-label="Abhinav on LinkedIn (opens in a new tab)"
              >
                <Linkedin size={17} aria-hidden="true" />
              </a>
              <span className="portrait-plate__ship">
                <Rocket size={13} aria-hidden="true" /> Ships real products
              </span>
            </span>
          </figcaption>
        </motion.figure>
      </Tilt>

      {/* Floating proof chips */}
      {chips.map((chip) => (
        <motion.span
          key={chip.label}
          className={chip.className}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: chip.delay, ease: easeOut }}
        >
          <motion.span
            className="portrait-chip__bob"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: chip.bobDelay }}
          >
            <i aria-hidden="true" />
            {chip.label}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}
