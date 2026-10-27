import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Brain,
  Eye,
  Github,
  MessageSquare,
  Play,
  Sparkles,
} from 'lucide-react';
import { aiProjects, type AIProject } from '../lib/data';

function ResearchGraph() {
  const inputNodes = [
    { x: 72, y: 68 },
    { x: 118, y: 112 },
    { x: 62, y: 158 },
    { x: 126, y: 204 },
    { x: 70, y: 254 },
  ];
  const inputEdges = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4]];

  return (
    <div className="research-graph">
      <div className="research-graph__header">
        <span>RESEARCH PIPELINE</span>
        <span>DA-HGNN × GAE</span>
      </div>
      <svg viewBox="0 0 640 330" role="img" aria-label="Ethereum transaction graph flowing through cross-stream attention into a wallet risk score">
        <defs>
          <pattern id="research-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#ffffff" strokeOpacity="0.045" strokeWidth="1" />
          </pattern>
          <linearGradient id="research-flow" x1="0" x2="1">
            <stop offset="0" stopColor="#58d7e5" />
            <stop offset="1" stopColor="#c8fa55" />
          </linearGradient>
        </defs>
        <rect width="640" height="330" fill="url(#research-grid)" />

        <text x="28" y="32" className="research-graph__label">01 / TRANSACTION GRAPH</text>
        {inputEdges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={inputNodes[from].x}
            y1={inputNodes[from].y}
            x2={inputNodes[to].x}
            y2={inputNodes[to].y}
            stroke="#58d7e5"
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />
        ))}
        {inputNodes.map((node, index) => (
          <g key={index}>
            <circle cx={node.x} cy={node.y} r={index === 1 ? 10 : 7} fill="#101216" stroke="#58d7e5" strokeWidth="2" />
            <circle cx={node.x} cy={node.y} r="2.5" fill="#58d7e5" />
          </g>
        ))}

        <path d="M145 160 C195 160 194 110 236 110" className="research-graph__flow" />
        <path d="M145 160 C195 160 194 212 236 212" className="research-graph__flow research-graph__flow--delay" />
        <text x="180" y="84" className="research-graph__micro">EMBEDDINGS</text>

        <rect x="238" y="88" width="164" height="148" rx="18" fill="#101216" stroke="#ffffff" strokeOpacity="0.14" />
        <rect x="252" y="102" width="136" height="120" rx="12" fill="#c8fa55" fillOpacity="0.035" stroke="#c8fa55" strokeOpacity="0.35" />
        <text x="320" y="143" textAnchor="middle" className="research-graph__box-title">CROSS-STREAM</text>
        <text x="320" y="166" textAnchor="middle" className="research-graph__box-title">ATTENTION</text>
        <text x="320" y="196" textAnchor="middle" className="research-graph__micro">DYNAMIC FUSION</text>

        <path d="M404 162 C448 162 448 162 486 162" className="research-graph__flow" />
        <text x="444" y="143" textAnchor="middle" className="research-graph__micro">RISK</text>

        <circle cx="538" cy="162" r="66" fill="#c8fa55" fillOpacity="0.04" stroke="#c8fa55" strokeOpacity="0.3" />
        <circle cx="538" cy="162" r="51" fill="#101216" stroke="#c8fa55" strokeWidth="1.5" />
        <text x="538" y="159" textAnchor="middle" className="research-graph__score">0.850</text>
        <text x="538" y="182" textAnchor="middle" className="research-graph__micro">AUC-ROC</text>
        <text x="28" y="304" className="research-graph__micro">CHRONOLOGICAL SPLITS · NO TEMPORAL LEAKAGE</text>
        <text x="610" y="304" textAnchor="end" className="research-graph__micro">40:1 IMBALANCE</text>
      </svg>
    </div>
  );
}

function AICard({ project, index }: { project: AIProject; index: number }) {
  const Icon = project.id === 'ai-image-detection' ? Eye : project.id === 'rag-chat' ? MessageSquare : Sparkles;

  return (
    <motion.article
      className="ai-lab-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="ai-lab-card__top">
        <span className="ai-lab-card__icon"><Icon size={20} /></span>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`}>
            <Github size={19} />
          </a>
        )}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">AI LAB / 0{index + 2}</span>
      <h3>{project.name}</h3>
      <p className="ai-lab-card__tagline">{project.tagline}</p>
      <p className="ai-lab-card__description">{project.description}</p>
      <details>
        <summary>Model notes <span>+</span></summary>
        <p>{project.approach}</p>
      </details>
      <div className="project-tech">
        {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
    </motion.article>
  );
}

export function AISection() {
  const featuredResearch = aiProjects[0];

  return (
    <section id="ai" className="section-pad ai-section">
      <div className="container">
        <motion.div
          className="section-heading section-heading--split"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <span className="section-kicker">03 · AI / ML lab</span>
            <h2 className="section-title">Models with<br />a job to do.</h2>
          </div>
          <p className="section-subtitle">
            Applied machine learning with the unglamorous parts included: clean splits, useful evaluation, and interfaces people can actually use.
          </p>
        </motion.div>

        <motion.article
          className="research-feature"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65 }}
        >
          <div className="research-feature__content">
            <span className="research-feature__eyebrow"><Brain size={15} /> Featured research</span>
            <h3>{featuredResearch.name}</h3>
            <p className="research-feature__tagline">{featuredResearch.tagline}</p>
            <p>{featuredResearch.description}</p>
            <div className="research-feature__approach">
              <span>THE APPROACH</span>
              <p>{featuredResearch.approach}</p>
            </div>
            <div className="research-feature__actions">
              {featuredResearch.github && (
                <a href={featuredResearch.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Github size={16} /> Research code <ArrowUpRight size={14} />
                </a>
              )}
              <a href="https://youtu.be/ENWCKQAHcHU" target="_blank" rel="noopener noreferrer" className="project-text-link">
                <Play size={15} /> Watch the demo
              </a>
            </div>
          </div>
          <ResearchGraph />
          {featuredResearch.stats && (
            <dl className="research-stats">
              {featuredResearch.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </motion.article>

        <div className="ai-lab-grid">
          {aiProjects.slice(1).map((project, index) => (
            <AICard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
