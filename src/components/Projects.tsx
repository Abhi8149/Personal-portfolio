import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Rocket, Play, Quote } from 'lucide-react';
import { projects, type Project } from '../lib/data';

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusBadge = () => {
    switch (project.status) {
      case 'shipped':
        return <span className="badge badge-shipped"><Rocket size={12} /> Shipped</span>;
      case 'live':
        return <span className="badge badge-live"><Play size={12} /> Live</span>;
      case 'deployed':
        return <span className="badge badge-live"><ExternalLink size={12} /> Deployed</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className="card group cursor-pointer"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-xl mb-1 group-hover:text-indigo transition-colors">
            {project.name}
          </h3>
          {getStatusBadge()}
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
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-circuit hover:bg-cyan/20 text-text-secondary hover:text-cyan transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary mb-4">{project.description}</p>

      {/* Quote */}
      {project.quote && (
        <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-circuit/50">
          <Quote size={16} className="text-indigo flex-shrink-0 mt-1" />
          <p className="text-sm text-text-muted italic">{project.quote}</p>
        </div>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="badge badge-tech text-xs">
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="badge badge-tech text-xs">+{project.tech.length - 4}</span>
        )}
      </div>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="card gradient-border p-8 md:p-12">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Visual */}
        <div className="relative">
          <div className="aspect-square max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-indigo/20 via-purple/20 to-cyan/20 p-8 flex items-center justify-center">
            {/* Phone mockup */}
            <div className="relative w-48 h-96 bg-void rounded-[3rem] border-4 border-circuit overflow-hidden shadow-2xl">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-void rounded-full" />
              <div className="p-4 pt-12 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo to-purple" />
                  <div>
                    <div className="h-3 w-20 bg-text-muted rounded mb-1" />
                    <div className="h-2 w-14 bg-circuit rounded" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-16 bg-circuit rounded-lg" />
                  <div className="h-16 bg-circuit rounded-lg" />
                  <div className="h-16 bg-circuit rounded-lg" />
                </div>
                <div className="h-12 bg-indigo rounded-xl mt-4" />
              </div>
            </div>

            {/* Play Store badge */}
            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-green/20 border border-green text-green text-sm font-medium flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              Play Store
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="badge badge-shipped mb-4">
            <Rocket size={12} /> Featured Product
          </span>
          <h3 className="font-display font-bold text-3xl md:text-4xl mb-4">
            {project.name}
          </h3>
          <p className="text-xl text-text-secondary mb-4">
            {project.longDescription}
          </p>
          <blockquote className="text-lg text-indigo italic mb-6 border-l-4 border-indigo pl-4">
            "{project.quote}"
          </blockquote>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span key={tech} className="badge badge-tech">
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink size={18} />
            View on Play Store
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
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

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      ref={sectionRef}
      id="projects"
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
            Proof of <span className="text-gradient">Execution</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Not concepts. Products.
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div
            className={`mb-16 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <FeaturedProject project={featuredProject} />
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={200 + index * 100}
            />
          ))}
        </div>

        {/* View All Link */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://github.com/Abhi8149"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo hover:text-purple transition-colors group"
          >
            View All Projects on GitHub
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
