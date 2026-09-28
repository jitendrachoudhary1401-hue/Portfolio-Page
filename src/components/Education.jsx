import React from 'react';
import { GraduationCap, BookOpen, Layers } from 'lucide-react';
import { personalInfo } from '../data/initialData';

export const Education = () => {
  return (
    <section id="education" className="section-wrapper" style={{ background: 'rgba(18, 23, 34, 0.2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">08 // Academic Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-desc">
            Formal technical education in Computer Science and Engineering with an Artificial Intelligence & Machine Learning specialization.
          </p>
        </div>

        <div className="education-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={24} color="#4F8CFF" />
              <span className="badge badge-accent">Undergraduate Engineering</span>
            </div>
            <span className="badge">{personalInfo.education.status}</span>
          </div>

          <h3 className="edu-degree">{personalInfo.education.degree}</h3>
          <div className="edu-branch">{personalInfo.education.branch}</div>

          <div style={{ marginTop: '24px' }}>
            <div className="edu-coursework-title">Key Core Coursework</div>
            <div className="edu-coursework-tags">
              {personalInfo.education.coursework.map((course, idx) => (
                <span key={idx} className="badge">
                  <BookOpen size={12} style={{ marginRight: '4px' }} />
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
