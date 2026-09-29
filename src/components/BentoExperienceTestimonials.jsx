import React from 'react';
import { InstagramIcon, LinkedinIcon, GithubIcon, TwitterIcon } from './Icons';
import { testimonialsData, workTimelineData } from '../data/initialData';

export const BentoExperienceTestimonials = ({ onBookCall }) => {
  return (
    <div id="testimonials" className="bento-card bento-card-right-top">
      {/* 01: Top Social Pill Bar */}
      <div className="bento-social-bar">
        <div className="bento-social-icons">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-social-btn"
            aria-label="Instagram Profile"
          >
            <InstagramIcon size={17} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-social-btn"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={17} />
          </a>
          <a
            href="https://github.com/jitendrachoudhary1401-hue"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-social-btn"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-social-btn"
            aria-label="X Profile"
          >
            <TwitterIcon size={17} />
          </a>
        </div>

        <button onClick={onBookCall} className="bento-btn-primary">
          Let's Connect
        </button>
      </div>

      {/* 02: Minimal Experience / Roles Timeline Table */}
      <div className="bento-work-timeline">
        {workTimelineData.map((item, index) => (
          <div key={index} className="bento-timeline-row">
            <span className="bento-timeline-role">{item.role}</span>
            <span className="bento-timeline-org">{item.organization}</span>
            <span className="bento-timeline-year">{item.year}</span>
          </div>
        ))}
      </div>

      {/* 03: Testimonials Header & Grid */}
      <div className="bento-testimonials-section">
        <div className="bento-testimonials-header">
          <h2 className="bento-section-title">Testimonials</h2>
          <p className="bento-section-sub">
            Feedback from clients and collaborators, reflecting my commitment to quality and reliability.
          </p>
        </div>

        <div className="bento-testimonials-grid">
          {testimonialsData.map((t) => (
            <div key={t.id} className="bento-testimonial-card">
              <p className="bento-testimonial-quote">
                "{t.quote}"
              </p>

              <div className="bento-testimonial-author">
                <div className="bento-author-left">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="bento-author-avatar"
                    loading="lazy"
                  />
                  <div className="bento-author-info">
                    <span className="bento-author-name">{t.name}</span>
                    <span className="bento-author-role">{t.role} @ {t.organization}</span>
                  </div>
                </div>

                {t.companyBadge === 'Google' || t.companyBadge === 'Google Partner' ? (
                  <div className="bento-company-badge" title="Google Certified / Partner">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </div>
                ) : (
                  <span className="bento-company-badge">{t.companyBadge}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
