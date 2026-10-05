import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Code2, Sparkles, Terminal, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectModal } from './ProjectModal';

export const Projects = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);

  // Distinct visual accent presets for each project mockup
  const projectMockupVisuals = {
    'campus-care': {
      tagline: 'Streamlined Campus Grievance & Facility Portal',
      accentColor: '#38BDF8',
      previewIcon: <Layers size={28} color="#38BDF8" />
    },
    'rescue-paw': {
      tagline: 'Emergency Community Animal Rescue Network',
      accentColor: '#10B981',
      previewIcon: <Sparkles size={28} color="#10B981" />
    },
    'aero-vision': {
      tagline: 'Drone Aerial Computer Vision & Inference Pipeline',
      accentColor: '#8B5CF6',
      previewIcon: <Terminal size={28} color="#8B5CF6" />
    },
    'cloud-developer-platform': {
      tagline: 'Reactive Cloud Developer Hub & Firebase Synchronization',
      accentColor: '#4F8CFF',
      previewIcon: <Code2 size={28} color="#4F8CFF" />
    }
  };

  return (
    <section id="projects" className="modern-section-wrapper">
      <div className="container">
        {/* Centered Section Header */}
        <div className="section-centered-header">
          <h2 className="section-centered-title">Recent Projects</h2>
          <p className="section-centered-subtitle">
            A curated selection of real-world projects, problem solvers, and research implementations.
          </p>
        </div>

        {/* 2x2 Project Cards Grid */}
        <div className="modern-projects-grid">
          {projects.map((project) => {
            const visual = projectMockupVisuals[project.id] || {
              tagline: 'Production System Architecture',
              accentColor: '#2563EB',
              previewIcon: <Code2 size={28} color="#2563EB" />
            };

            return (
              <div key={project.id} className="modern-project-card">
                {/* Upper Half: Browser Window Mockup Frame */}
                <div
                  className="project-mockup-frame"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedProject(project); }}
                >
                  {/* Browser Window Header */}
                  <div className="mockup-header-bar">
                    <div className="mockup-window-dots">
                      <span className="window-dot dot-red" />
                      <span className="window-dot dot-yellow" />
                      <span className="window-dot dot-green" />
                    </div>
                    <span className="mockup-window-url">{project.title.toLowerCase()}.local</span>
                    <div style={{ width: 36 }} />
                  </div>

                  {/* Mockup Screen Viewport */}
                  <div className="mockup-screen-viewport">
                    <div className="mockup-screen-glow" style={{ background: `radial-gradient(circle, ${visual.accentColor}33 0%, transparent 70%)` }} />
                    <div className="mockup-screen-content">
                      <div className="mockup-icon-badge">
                        {visual.previewIcon}
                      </div>
                      <span className="mockup-screen-title">{project.title}</span>
                      <p className="mockup-screen-sub">{visual.tagline}</p>
                      <button
                        className="mockup-preview-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        Explore Project ↗
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lower Half: Metadata, Description & Tech Chips */}
                <div className="project-info-container">
                  <div className="project-category-row">
                    <span className="project-category-badge">{project.category}</span>
                    <button
                      className="project-view-btn"
                      onClick={() => setSelectedProject(project)}
                      title="View Project Details"
                      aria-label={`View ${project.title} details`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                  <h3
                    className="project-heading-title"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  <p className="project-body-summary">
                    {project.problem}
                  </p>

                  <div className="project-tech-chips">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="project-tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
