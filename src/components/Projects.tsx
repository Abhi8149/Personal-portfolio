import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Github,
  Play,
  X,
  Youtube,
} from 'lucide-react';
import { profile, projects, type Project } from '../lib/data';

const projectTypes: Record<string, string> = {
  abhiclaw: 'Agentic AI',
  'ethereum-phishing': 'Machine learning research',
  availo: 'Mobile product',
};

function statusLabel(project: Project) {
  if (project.status === 'live') return 'Live product';
  if (project.status === 'research') return 'Research + application';
  return 'Working build';
}

function VideoDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setIsVideoLoaded(false);
  }, [project?.videoId]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) {
      dialog.showModal();
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className={`video-dialog ${project?.portraitVideo ? 'video-dialog--portrait' : ''}`}
      aria-labelledby="video-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      {project?.videoId && (
        <div className="video-dialog__content">
          <div className="video-dialog__header">
            <div>
              <span className="section-kicker">Video case study</span>
              <h2 id="video-dialog-title">{project.videoTitle}</h2>
            </div>
            <button
              type="button"
              className="video-dialog__close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close video"
              autoFocus
            >
              <X size={20} />
            </button>
          </div>
          <div className="video-dialog__frame">
            <div className={`video-dialog__loading ${isVideoLoaded ? 'is-loaded' : ''}`} aria-hidden="true">
              <img src={`https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`} alt="" />
              <span>Loading video...</span>
            </div>
            <iframe
              key={project.videoId}
              src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={project.videoTitle}
              onLoad={() => setIsVideoLoaded(true)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="video-dialog__footer">
            <span>{project.name} · {project.duration}</span>
            <a
              href={`https://www.youtube.com/watch?v=${project.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}

function ProjectMedia({ project, index, onPlay }: { project: Project; index: number; onPlay: () => void }) {
  const thumbnail = `https://i.ytimg.com/vi/${project.videoId}/maxresdefault.jpg`;

  return (
    <div className="project-media-column">
      <button
        type="button"
        className="project-media"
        onClick={onPlay}
        aria-label={`Play ${project.videoTitle}`}
      >
        <img
          src={thumbnail}
          alt=""
          loading={index === 0 ? 'eager' : 'lazy'}
          onError={(event) => {
            const fallback = `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
            if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback;
          }}
        />
        <span className="project-media__shade" aria-hidden="true" />
        <span className="project-media__topline">
          <span><Youtube size={15} /> Video demo</span>
          <span>{project.duration}</span>
        </span>
        <span className="project-media__play">
          <span className="project-media__play-icon"><Play size={21} fill="currentColor" /></span>
          <span>Play case study</span>
        </span>
        <span className="project-media__number" aria-hidden="true">0{index + 1}</span>
      </button>
      {project.metric && (
        <div className="project-media__metric">
          <span className="status-dot" aria-hidden="true" />
          {project.metric}
        </div>
      )}
    </div>
  );
}

function FeaturedProject({
  project,
  index,
  onPlay,
}: {
  project: Project;
  index: number;
  onPlay: () => void;
}) {
  return (
    <motion.article
      className={`project-case ${index % 2 === 1 ? 'project-case--reverse' : ''}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProjectMedia project={project} index={index} onPlay={onPlay} />

      <div className="project-case__content">
        <div className="project-case__meta">
          <span>0{index + 1} / {projectTypes[project.id]}</span>
          <span className="project-status"><i />{statusLabel(project)}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-case__tagline">{project.description}</p>
        <p className="project-case__description">{project.longDescription}</p>

        {project.highlights && (
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={15} aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="project-tech" aria-label="Technologies used">
          {project.tech.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="project-actions">
          <button type="button" className="btn-primary" onClick={onPlay}>
            <Play size={16} fill="currentColor" />
            Watch demo
          </button>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-text-link">
              <Github size={17} />
              Source code
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.secondaryGithub && (
            <a href={project.secondaryGithub} target="_blank" rel="noopener noreferrer" className="project-text-link">
              <Code2 size={17} />
              {project.secondaryGithubLabel}
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-text-link">
              <ExternalLink size={16} />
              {project.liveLabel ?? 'Open live project'}
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function WorkshopCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className="workshop-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="workshop-card__top">
        <span className="font-mono text-xs text-text-muted">0{index + 4}</span>
        <div className="flex gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code`}>
              <Github size={18} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live project`}>
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter((project) => project.videoId);
  const workshopProjects = projects.filter((project) => !project.videoId);

  return (
    <section id="projects" className="section-pad projects-section">
      <div className="container">
        <motion.div
          className="section-heading section-heading--split"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-kicker">01 · Selected work</span>
            <h2 className="section-title">Proof, not promises.</h2>
          </div>
          <p className="section-subtitle">
            Three systems, three real problems. Open the video case studies to see how each one works.
          </p>
        </motion.div>

        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
              onPlay={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="workshop-heading">
          <h3>More from the workshop</h3>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            Explore all repositories
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="workshop-grid">
          {workshopProjects.map((project, index) => (
            <WorkshopCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <VideoDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
