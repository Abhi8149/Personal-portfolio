import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  ChevronRight,
  Code2,
  Database,
  Github,
  Layers3,
  Monitor,
  Server,
  Wrench,
} from 'lucide-react';
import { profile, skills, systemProjects } from '../lib/data';

const skillLabels: Record<keyof typeof skills, string> = {
  languages: 'Languages',
  frontend: 'Frontend & mobile',
  backend: 'Backend',
  databases: 'Data & storage',
  ml: 'AI & machine learning',
  tools: 'Tools & workflow',
};

function ArchitecturePanel({ projectId }: { projectId: string }) {
  const project = systemProjects.find((item) => item.id === projectId) ?? systemProjects[0];

  return (
    <motion.div
      key={project.id}
      className="architecture-panel"
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="architecture-panel__header">
        <span className="section-kicker">Selected architecture</span>
        <span className="architecture-panel__index">
          {String(systemProjects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0')} / {String(systemProjects.length).padStart(2, '0')}
        </span>
      </div>
      <h3>{project.name}</h3>
      <p className="architecture-panel__description">{project.description}</p>

      <div className="architecture-flow" aria-label="Layered system architecture">
        <div>
          <span>01</span>
          <strong>Interface</strong>
          <small>Requests &amp; commands</small>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>02</span>
          <strong>Domain core</strong>
          <small>Rules &amp; services</small>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <span>03</span>
          <strong>Data &amp; state</strong>
          <small>Reliable persistence</small>
        </div>
      </div>

      <div className="architecture-panel__focus">
        <span>ARCHITECTURE FOCUS</span>
        <p>{project.focus}</p>
      </div>
      <div className="architecture-patterns">
        {project.patterns.map((pattern) => <span key={pattern}>{pattern}</span>)}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
        <Github size={16} />
        {project.github === profile.github ? 'Explore GitHub profile' : 'View design on GitHub'}
        <ArrowUpRight size={14} />
      </a>
    </motion.div>
  );
}

export function Systems() {
  const [selectedId, setSelectedId] = useState(systemProjects[0].id);
  const skillIcons = [Code2, Monitor, Server, Database, Brain, Wrench];

  return (
    <section id="systems" className="section-pad systems-section">
      <div className="container">
        <motion.div
          className="section-heading section-heading--split"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <span className="section-kicker">04 · Systems thinking</span>
            <h2 className="section-title">Architecture<br />before code.</h2>
          </div>
          <p className="section-subtitle">
            Low-level design studies exploring how familiar products model state, behavior, extensibility, and failure. Select a system to inspect it.
          </p>
        </motion.div>

        <div className="systems-explorer">
          <div className="systems-selector" aria-label="Choose a system design">
            {systemProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={selectedId === project.id ? 'is-active' : ''}
                aria-pressed={selectedId === project.id}
                onClick={() => setSelectedId(project.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{project.name}</strong>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="systems-panel-wrap" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <ArchitecturePanel key={selectedId} projectId={selectedId} />
            </AnimatePresence>
          </div>
        </div>

        <div className="capabilities-heading">
          <div>
            <span className="section-kicker">The toolbox</span>
            <h3>Technologies I use to turn designs into working software.</h3>
          </div>
          <Layers3 size={32} aria-hidden="true" />
        </div>

        <div className="skills-grid">
          {(Object.keys(skills) as (keyof typeof skills)[]).map((category, index) => {
            const Icon = skillIcons[index];
            return (
              <motion.article
                key={category}
                className="skill-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="skill-card__title"><Icon size={17} /><h4>{skillLabels[category]}</h4></div>
                <div className="project-tech">
                  {skills[category].map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
