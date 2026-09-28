import React from 'react';
import { X, ExternalLink, FolderGit2, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="project-category">{project.category}</span>
            <h3 className="modal-title">{project.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div className="detail-label">The Problem Statement</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {project.problem}
            </p>
          </div>

          <div>
            <div className="detail-label">Personal Contribution & Architecture</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {project.contribution}
            </p>
          </div>

          <div>
            <div className="detail-label">Current Stage & Outcome</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span className="badge badge-accent">
                <CheckCircle2 size={13} />
                {project.outcome}
              </span>
            </div>
          </div>

          <div>
            <div className="detail-label">Technologies Used</div>
            <div className="project-tags">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <GithubIcon size={15} />
              <span>Repository</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={15} />
              <span>Live Demonstration</span>
            </a>
          )}
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
