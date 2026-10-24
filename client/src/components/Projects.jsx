import { useState } from 'react';
import { FolderGit2, ExternalLink, Activity, Film, Eye, Code, Smartphone, Clock, Plus, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import portfolioData from '../data/portfolioData';
import '../styles/projects.css';

export default function Projects() {
  const { projects, moreProjects = [] } = portfolioData;
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Render original visual graphic based on project type
  const renderProjectGraphic = (graphicType) => {
    switch (graphicType) {
      case 'fitnessPulse':
        return (
          <div className="graphic-fitness">
            <svg className="fitness-pulse-svg" viewBox="0 0 200 80" fill="none">
              <path
                d="M 10 40 L 45 40 L 60 15 L 75 65 L 90 25 L 105 50 L 120 40 L 190 40"
                stroke="#e62429"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="90" cy="25" r="4" fill="#ff3344" />
              <circle cx="75" cy="65" r="3" fill="#00d2ff" />
            </svg>
          </div>
        );
      case 'cinemaAnalytics':
        return (
          <div className="graphic-cinema">
            <svg className="cinema-svg" viewBox="0 0 160 90" fill="none">
              <rect x="25" y="15" width="110" height="60" rx="8" stroke="#1266f1" strokeWidth="2" fill="none" />
              <path d="M 40 55 L 65 35 L 95 48 L 120 28" stroke="#00d2ff" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="40" cy="55" r="3.5" fill="#e62429" />
              <circle cx="65" cy="35" r="3.5" fill="#00d2ff" />
              <circle cx="95" cy="48" r="3.5" fill="#ff3344" />
              <circle cx="120" cy="28" r="4.5" fill="#ffffff" />
            </svg>
          </div>
        );
      case 'eyeNavigation':
        return (
          <div className="graphic-eye">
            <svg className="eye-svg" viewBox="0 0 160 90" fill="none">
              <circle cx="80" cy="45" r="32" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="80" cy="45" r="18" stroke="#e62429" strokeWidth="2" fill="none" />
              <circle cx="80" cy="45" r="5" fill="#ffffff" />
              {/* Crosshairs */}
              <line x1="80" y1="5" x2="80" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="40" y1="45" x2="120" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="graphic-fitness">
            <Code size={48} color="var(--spider-blue-glow)" />
          </div>
        );
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="section-title">
            MY <span className="accent-red">PROJECTS</span>
          </h2>
          <p className="section-subtitle">
            Engineered software systems ranging from predictive analytics web applications to computer-vision tools.
          </p>
          <div className="web-divider">
            <span />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, idx) => {
            const slideClasses = ['reveal-slide-left', 'reveal-slide-up', 'reveal-slide-right'];
            const slideClass = slideClasses[idx % 3];
            return (
              <article
                key={project.id}
                className={`project-card ${slideClass} delay-${(idx + 1) * 150}`}
              >
                {/* Top Generative Visual Canvas */}
                <div className="project-visual-wrapper">
                  <div className="project-visual-grid" />
                  <span className="project-type-badge">{project.badge || project.type}</span>
                  <span className="project-period-badge">{project.period}</span>
                  <div className="project-visual-canvas">
                    {renderProjectGraphic(project.graphicType)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  {/* Tech Stack Pills */}
                  <div className="project-tech-list">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action: GitHub Link + Live Demo or Status */}
                  <div className="project-footer">
                    <div className="project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn project-btn-github"
                          aria-label={`View GitHub repository for ${project.title}`}
                          title="View Source Code on GitHub"
                        >
                          <GithubIcon size={15} />
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn project-btn-live"
                          aria-label={`View live demo for ${project.title}`}
                          title={project.liveNote || "Launch Live Demo"}
                        >
                          <span className="live-pulse-dot" />
                          <span>{project.liveStatus || "Live Demo"}</span>
                          <ExternalLink size={13} className="live-external-icon" />
                        </a>
                      ) : (
                        <div
                          className="project-btn project-btn-status"
                          title={project.liveNote || project.liveStatus || "Coming Soon"}
                        >
                          {project.id === 'gymlog' ? (
                            <>
                              <Smartphone size={13} className="status-icon status-icon-blue" />
                              <span>{project.liveStatus || "APK Coming Soon"}</span>
                            </>
                          ) : (
                            <>
                              <Clock size={13} className="status-icon status-icon-amber" />
                              <span>{project.liveStatus || "In Development"}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Expandable "More Projects" Section (Reference Screenshot Aesthetic) */}
        {moreProjects.length > 0 && (
          <div className="more-projects-wrapper">
            {/* Minimal Header Toggle */}
            <div className="more-projects-header">
              <button
                type="button"
                className="more-projects-toggle-btn"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                aria-expanded={isMoreOpen}
                title={isMoreOpen ? "Collapse archive" : "Expand more projects archive"}
              >
                <span className="more-projects-title">More projects</span>
                <span className="more-projects-count">{moreProjects.length}</span>
                <span className="more-projects-icon">
                  {isMoreOpen ? <X size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </div>

            {/* Expandable Minimal Project Cards Grid */}
            {isMoreOpen && (
              <div className="more-projects-grid">
                {moreProjects.map((item) => (
                  <a
                    key={item.id}
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="more-project-card"
                    title={`View ${item.title} repository on GitHub ↗`}
                  >
                    <div className="more-project-content">
                      <div className="more-project-title-row">
                        <h4 className="more-project-title">{item.title}</h4>
                        <div className="more-project-arrow">
                          <GithubIcon size={14} className="more-github-icon" />
                          <ArrowUpRight size={14} className="more-arrow-icon" />
                        </div>
                      </div>
                      <p className="more-project-desc">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
