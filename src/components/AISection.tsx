import { useEffect, useRef, useState } from 'react';
import { Brain, Github, ExternalLink, Sparkles, Shield, MessageSquare, Eye, Cpu } from 'lucide-react';
import { aiProjects, type AIProject } from '../lib/data';

const icons = {
  Shield,
  Sparkles,
  MessageSquare,
  Eye,
  Cpu,
};

function AICard({ project, index }: { project: AIProject; index: number }) {
  const Icon = icons[Object.keys(icons)[index % Object.keys(icons).length] as keyof typeof icons];

  return (
    <div className="card group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo/20 to-purple/20 flex items-center justify-center">
          <Icon className="text-indigo" size={24} />
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-circuit hover:bg-indigo/20 text-text-secondary hover:text-indigo transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Title & Tagline */}
      <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-indigo transition-colors">
        {project.name}
      </h3>
      <p className="text-indigo text-sm mb-4 italic">{project.tagline}</p>

      {/* Description */}
      <p className="text-text-secondary mb-4">{project.description}</p>

      {/* Approach */}
      <div className="mb-4 p-3 rounded-lg bg-circuit/50">
        <h4 className="text-xs uppercase tracking-wider text-text-muted mb-2">Approach</h4>
        <p className="text-sm text-text-secondary">{project.approach}</p>
      </div>

      {/* Metrics */}
      {project.metrics && (
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-live">
            <Sparkles size={12} />
            {project.metrics}
          </span>
        </div>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="badge badge-tech text-xs">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// Animated Neural Network SVG Component
function NeuralNetworkVisual() {
  return (
    <div className="relative w-full min-h-[240px] overflow-visible">
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        <g className="opacity-30">
          {/* Layer 1 to Layer 2 */}
          <line x1="80" y1="40" x2="200" y2="30" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="40" x2="200" y2="70" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="40" x2="200" y2="110" stroke="url(#gradient1)" strokeWidth="1" />
          <line x1="80" y1="40" x2="200" y2="150" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="100" x2="200" y2="30" stroke="url(#gradient1)" strokeWidth="1" />
          <line x1="80" y1="100" x2="200" y2="70" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.2s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="100" x2="200" y2="110" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.9s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="100" x2="200" y2="150" stroke="url(#gradient1)" strokeWidth="1" />
          <line x1="80" y1="160" x2="200" y2="30" stroke="url(#gradient1)" strokeWidth="1" />
          <line x1="80" y1="160" x2="200" y2="70" stroke="url(#gradient1)" strokeWidth="1" />
          <line x1="80" y1="160" x2="200" y2="110" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.1s" repeatCount="indefinite" />
          </line>
          <line x1="80" y1="160" x2="200" y2="150" stroke="url(#gradient1)" strokeWidth="1">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.3s" repeatCount="indefinite" />
          </line>

          {/* Layer 2 to Layer 3 */}
          <line x1="200" y1="30" x2="320" y2="60" stroke="url(#gradient2)" strokeWidth="1">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="200" y1="30" x2="320" y2="140" stroke="url(#gradient2)" strokeWidth="1" />
          <line x1="200" y1="70" x2="320" y2="60" stroke="url(#gradient2)" strokeWidth="1" />
          <line x1="200" y1="70" x2="320" y2="140" stroke="url(#gradient2)" strokeWidth="1">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.7s" repeatCount="indefinite" />
          </line>
          <line x1="200" y1="110" x2="320" y2="60" stroke="url(#gradient2)" strokeWidth="1">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.4s" repeatCount="indefinite" />
          </line>
          <line x1="200" y1="110" x2="320" y2="140" stroke="url(#gradient2)" strokeWidth="1" />
          <line x1="200" y1="150" x2="320" y2="60" stroke="url(#gradient2)" strokeWidth="1" />
          <line x1="200" y1="150" x2="320" y2="140" stroke="url(#gradient2)" strokeWidth="1">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.1s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Layer 1 Nodes */}
        <g>
          <circle cx="80" cy="40" r="12" fill="#6366f1">
            <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="100" r="12" fill="#6366f1">
            <animate attributeName="r" values="12;14;12" dur="2.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="160" r="12" fill="#6366f1">
            <animate attributeName="r" values="12;14;12" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Layer 2 Nodes */}
        <g>
          <circle cx="200" cy="30" r="10" fill="#8b5cf6">
            <animate attributeName="r" values="10;12;10" dur="1.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="70" r="10" fill="#8b5cf6">
            <animate attributeName="r" values="10;12;10" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="110" r="10" fill="#8b5cf6">
            <animate attributeName="r" values="10;12;10" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="150" r="10" fill="#8b5cf6">
            <animate attributeName="r" values="10;12;10" dur="2.1s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Layer 3 Nodes */}
        <g>
          <circle cx="320" cy="60" r="14" fill="#06b6d4">
            <animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="140" r="14" fill="#06b6d4">
            <animate attributeName="r" values="14;16;14" dur="2.3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Labels */}
        <text x="80" y="190" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
          Input
        </text>
        <text x="200" y="190" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
          Hidden
        </text>
        <text x="320" y="190" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
          Output
        </text>
      </svg>
    </div>
  );
}

export function AISection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="ai"
      className="min-h-screen py-24 md:py-32 px-6 relative"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo/30 bg-indigo/10 mb-4">
            <Brain className="text-indigo" size={16} />
            <span className="text-sm text-text-secondary">Machine Learning & AI</span>
          </div>
          <h2 className="section-title mb-4">
            Where Intelligence Meets <span className="text-gradient">Impact</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Not tutorials. Real models.
          </p>
        </div>

        {/* Neural Network Visual */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="card overflow-visible p-6 md:p-8">
            <NeuralNetworkVisual />
            <p className="text-center text-text-muted text-sm mt-4">
              Neural networks are my canvas. Each project is a new architecture pushing boundaries.
            </p>
          </div>
        </div>

        {/* Featured AI Project */}
        {aiProjects[0] && (
          <div className="card gradient-border mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan mb-2">Featured Model</p>
                <h3 className="font-display text-2xl font-semibold">{aiProjects[0].name}</h3>
              </div>
              {aiProjects[0].github && (
                <a
                  href={aiProjects[0].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Github size={16} />
                  View website
                </a>
              )}
            </div>
            <p className="text-indigo italic mb-3">"{aiProjects[0].tagline}"</p>
            <p className="text-text-secondary">{aiProjects[0].description}</p>
            {aiProjects[0].metrics && <p className="text-sm text-cyan mt-3">{aiProjects[0].metrics}</p>}
          </div>
        )}

        {/* AI Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {aiProjects.slice(1).map((project, index) => (
            <AICard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Link */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://github.com/Abhi8149?tab=repositories&q=ml+OR+ai+OR+tensorflow+OR+keras+OR+langchain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo hover:text-purple transition-colors group"
          >
            View All AI/ML Projects
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
