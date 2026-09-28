import React from 'react';
import { personalInfo } from '../data/initialData';

export const IdentityStrip = () => {
  return (
    <section className="identity-strip" aria-label="Quick Identity Pillars">
      <div className="container">
        <div className="identity-grid">
          {personalInfo.identityPillars.map((pillar, idx) => (
            <div key={idx} className="identity-item">
              <span className="identity-title">{pillar.title}</span>
              <span className="identity-subtitle">{pillar.subtitle}</span>
              <span className="identity-desc">{pillar.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
