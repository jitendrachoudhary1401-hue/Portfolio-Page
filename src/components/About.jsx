import React, { useState, useEffect } from 'react';
import { Mail, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { workTimelineData } from '../data/initialData';
import { usePortfolio } from '../context/PortfolioContext';
import { subscribeToProfilePhoto } from '../services/profileService';

export const About = ({ onOpenAdmin, onBookCall }) => {
  const { personalInfo } = usePortfolio();
  const [photoUrl, setPhotoUrl] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProfilePhoto((url) => {
      if (url) {
        setPhotoUrl(url);
        setImgError(false);
      }
    });
    return () => unsub && unsub();
  }, []);

  const defaultPhoto = '/portrait.jpg';
  const displayPhoto = (!imgError && photoUrl) ? photoUrl : defaultPhoto;

  const stackIcons = [
    { name: 'Python', icon: '🐍' },
    { name: 'React', icon: '⚛️' },
    { name: 'Flutter', icon: '💙' },
    { name: 'Dart', icon: '🎯' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'C++', icon: '⚙️' },
    { name: 'Git', icon: '🐙' }
  ];

  return (
    <section id="about" className="modern-section-wrapper">
      <div className="container">
        {/* Centered Section Header */}
        <div className="section-centered-header">
          <h2 className="section-centered-title">About Me</h2>
          <p className="section-centered-subtitle">
            A glimpse into my background, technical passions, and continuous learning journey.
          </p>
        </div>

        {/* 2-Column Bento Layout */}
        <div className="about-bento-grid">
          {/* Left Column: Profile Card */}
          <div className="about-profile-card">
            <div
              className="about-profile-img-box"
              onClick={onOpenAdmin}
              title="Click to manage profile photo in Admin"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpenAdmin && onOpenAdmin(); }}
            >
              <img
                src={displayPhoto}
                alt="Jitendra Choudhary"
                className="about-profile-img"
                onError={() => setImgError(true)}
              />
            </div>

            <div className="about-profile-info">
              <h3 className="about-profile-name">JITENDRA CHOUDHARY</h3>
              <p className="about-profile-role">CSE • AI/ML DEVELOPER</p>

              {/* Social / Contact Links */}
              <div className="about-social-links">
                {personalInfo.contact.github && (
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-icon-btn"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
                {personalInfo.contact.linkedin && (
                  <a
                    href={personalInfo.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-icon-btn"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                )}
                <button
                  onClick={onBookCall}
                  className="about-social-icon-btn"
                  aria-label="Email or Message"
                >
                  <Mail size={16} />
                </button>
              </div>

              <button
                onClick={onBookCall}
                className="about-connect-btn"
              >
                <span>Connect With Me</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Bio, Tech Stack & Experience Table */}
          <div className="about-details-column">
            {/* Bio Card */}
            <div className="about-detail-card">
              <h4 className="about-card-title">Who I Am &amp; What I Build</h4>
              <p className="about-card-text">
                {personalInfo.about}
              </p>
            </div>

            {/* Core Tech Stack Row */}
            <div className="about-detail-card">
              <h4 className="about-card-title">Core Tech Stack</h4>
              <div className="about-tech-stack-row">
                {stackIcons.map((tech, i) => (
                  <div key={i} className="about-stack-badge" title={tech.name}>
                    <span className="about-stack-icon">{tech.icon}</span>
                    <span className="about-stack-label">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience / Timeline Table */}
            <div className="about-detail-card">
              <h4 className="about-card-title">Experience &amp; Community</h4>
              <div className="about-experience-table">
                {workTimelineData.map((item, idx) => (
                  <div key={idx} className="experience-table-row">
                    <div className="exp-role-cell">
                      <span className="exp-role-text">{item.role}</span>
                      <span className="exp-org-text">{item.organization}</span>
                    </div>
                    <div className="exp-year-cell">
                      <span className="exp-year-badge">{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
