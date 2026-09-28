import React from 'react';
import { Code, Cpu, Users, BookOpen } from 'lucide-react';
import { personalInfo } from '../data/initialData';

export const About = () => {
  const iconMap = [
    <Code size={20} className="text-accent-blue" key="code" />,
    <Cpu size={20} className="text-accent-purple" key="cpu" />,
    <Users size={20} className="text-accent-cyan" key="users" />
  ];

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">01 // Profile</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-desc">
            Computer science student and software builder focused on engineering useful systems and contributing to technical communities.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: First-Person Narrative */}
          <div className="card about-narrative">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Engineering Foundations & Community
            </h3>
            <p className="about-main-text">
              {personalInfo.about}
            </p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-accent">CSE • AI/ML</span>
              <span className="badge">Technical Vidya Contributor</span>
              <span className="badge">NSS Volunteer</span>
            </div>
          </div>

          {/* Right Column: Three Focus Pillars */}
          <div className="about-pillars">
            {personalInfo.focusPoints.map((point, idx) => (
              <div key={idx} className="pillar-card">
                <div className="pillar-title">
                  {iconMap[idx]}
                  <span>{point.title}</span>
                </div>
                <p className="pillar-desc">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
