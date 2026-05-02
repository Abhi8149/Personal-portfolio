import { useEffect, useRef, useState } from 'react';
import { Layers, Github, ChevronDown, Code2 } from 'lucide-react';
import { systemProjects, skills } from '../lib/data';

function SystemCard({ project, isExpanded, onToggle }: {
  project: typeof systemProjects[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="card group cursor-pointer" onClick={onToggle}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 flex items-center justify-center flex-shrink-0 group-hover:from-indigo/30 group-hover:to-purple/30 transition-all">
            <Layers className="text-indigo" size={24} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-indigo transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-text-secondary">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={18} />
          </a>
          <ChevronDown
            size={20}
            className={`text-text-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-4 border-t border-border-light">
          {project.focus && (
            <p className="text-sm text-text-secondary mb-3">
              <span className="text-cyan">Architecture Focus:</span> {project.focus}
            </p>
          )}

          <h4 className="text-xs uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
            <Code2 size={14} />
            Design Patterns Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.patterns.map((pattern) => (
              <span key={pattern} className="badge badge-tech text-xs">
                {pattern}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillCategory({ title, items, delay }: {
  title: string;
  items: string[];
  delay: number;
}) {
  return (
    <div
      className="card"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-indigo mb-4">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="badge badge-tech">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Architecture diagram for LLD
function ArchitectureVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-circuit/50 p-6">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Module boxes */}
        <g className="animate-pulse">
          {/* Top level modules */}
          <rect x="20" y="20" width="80" height="40" rx="4" fill="#12121a" stroke="#6366f1" strokeWidth="2" />
          <text x="60" y="45" fill="#f1f5f9" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">User</text>

          <rect x="160" y="20" width="80" height="40" rx="4" fill="#12121a" stroke="#8b5cf6" strokeWidth="2" />
          <text x="200" y="45" fill="#f1f5f9" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">Order</text>

          <rect x="300" y="20" width="80" height="40" rx="4" fill="#12121a" stroke="#06b6d4" strokeWidth="2" />
          <text x="340" y="45" fill="#f1f5f9" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">Payment</text>

          {/* Connector lines */}
          <line x1="100" y1="40" x2="160" y2="40" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
          <line x1="240" y1="40" x2="300" y2="40" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4" />
        </g>

        {/* Core services */}
        <g>
          <rect x="120" y="100" width="160" height="40" rx="4" fill="#12121a" stroke="#6366f1" strokeWidth="2" />
          <text x="200" y="125" fill="#f1f5f9" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
            Core Services Layer
          </text>
        </g>

        {/* Database */}
        <g>
          <rect x="140" y="160" width="120" height="30" rx="4" fill="#12121a" stroke="#06b6d4" strokeWidth="2" />
          <text x="200" y="180" fill="#f1f5f9" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
            Database
          </text>
        </g>

        {/* Connecting lines */}
        <line x1="200" y1="60" x2="200" y2="100" stroke="#6366f1" strokeWidth="2" />
        <line x1="200" y1="140" x2="200" y2="160" stroke="#06b6d4" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function Systems() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="min-h-screen py-24 md:py-32 px-6 relative"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">
            How I Think in <span className="text-gradient">Systems</span>
          </h2>
          <p className="section-subtitle mx-auto">
            9+ Low-Level Designs. Real-world architectures.
          </p>
        </div>

        {/* Intro Statement */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="card gradient-border text-center">
            <blockquote className="text-xl md:text-2xl font-display font-medium text-text-primary">
              "Before I code, I design. Before I design, I understand how the giants work."
            </blockquote>
          </div>
        </div>

        {/* Architecture Visual */}
        <div
          className={`mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-5 overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max">
              {systemProjects.map((project) => (
                <a
                  key={`${project.id}-chip`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-tech hover:border-indigo hover:text-text-primary transition-colors"
                >
                  {project.name}
                </a>
              ))}
            </div>
          </div>

          <h3 className="font-display font-semibold text-lg mb-4 text-center">
            LLD Architecture Pattern
          </h3>
          <ArchitectureVisual />
        </div>

        {/* Systems Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {systemProjects.map((project) => (
            <SystemCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>

        {/* Skills Matrix */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="font-display font-semibold text-xl mb-6 text-center">
            Technical <span className="text-gradient">Skill Matrix</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkillCategory title="Languages" items={skills.languages} delay={0} />
            <SkillCategory title="Frontend" items={skills.frontend} delay={100} />
            <SkillCategory title="Backend" items={skills.backend} delay={200} />
            <SkillCategory title="Databases" items={skills.databases} delay={300} />
            <SkillCategory title="ML/AI" items={skills.ml} delay={400} />
            <SkillCategory title="Tools" items={skills.tools} delay={500} />
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://github.com/Abhi8149?tab=repositories&q=lld+OR+LLD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo hover:text-purple transition-colors group"
          >
            View All System Designs
            <Github size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
