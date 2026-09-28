import React from 'react';
import { Users2, HeartHandshake, CheckCircle } from 'lucide-react';
import { experienceData } from '../data/initialData';

export const Experience = () => {
  return (
    <section id="experience" className="section-wrapper" style={{ background: 'rgba(18, 23, 34, 0.2)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">04 // Community & Impact</span>
          <h2 className="section-title">Experience & Social Contribution</h2>
          <p className="section-desc">
            Active involvement in student developer networks and social service initiatives, emphasizing collaboration and peer learning over inflated titles.
          </p>
        </div>

        <div className="experience-grid">
          {experienceData.map((exp) => (
            <div key={exp.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="exp-badge">{exp.type}</span>
                <span className="badge">{exp.period}</span>
              </div>

              <h3 className="exp-org">{exp.organization}</h3>
              <div className="exp-role">{exp.role}</div>

              <p className="exp-desc">{exp.description}</p>

              <div>
                <div className="detail-label" style={{ marginBottom: '10px' }}>Key Contributions</div>
                <ul className="exp-bullets">
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx} className="exp-bullet">
                      <CheckCircle size={15} className="exp-bullet-icon" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
