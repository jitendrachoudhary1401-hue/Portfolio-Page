import React, { useState } from 'react';
import { ExternalLink, Info, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { initialProjects } from '../data/initialData';
import { ProjectModal } from './ProjectModal';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">03 // Practical Engineering</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Evidence of problem solving through software. Each project addresses a distinct challenge with purposeful system design.
          </p>
        </div>

        <div className="projects-grid">
          {initialProjects.map((project) => (
            <div key={project.id} className="card project-card">
              <div>
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>

                <div className="project-detail-block">
                  <div className="detail-label">Problem</div>
                  <p className="detail-content">{project.problem}</p>
                </div>

                <div className="project-detail-block">
                  <div className="detail-label">Contribution</div>
                  <p className="detail-content">{project.contribution}</p>
                </div>
              </div>

              <div>
                <div className="project-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedProject(project)}
                    style={{ flex: 1 }}
                  >
                    <Info size={14} />
                    <span>Project Breakdown</span>
                  </button>

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      aria-label={`${project.title} Source Code`}
                    >
                      <GithubIcon size={14} />
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      aria-label={`${project.title} Live Preview`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
