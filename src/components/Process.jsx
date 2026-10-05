import React from 'react';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '../data/initialData';

export const Process = ({ onBookCall }) => {
  return (
    <section id="process" className="modern-section-wrapper">
      <div className="container">
        {/* Centered Header */}
        <div className="section-centered-header">
          <h2 className="section-centered-title">Process</h2>
          <p className="section-centered-subtitle">
            A disciplined, structured engineering workflow from initial concept to deployment.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="modern-process-grid">
          {processSteps.map((stepItem) => (
            <div key={stepItem.step} className="modern-process-card">
              <div className="process-step-num">{stepItem.step}</div>
              <h3 className="process-step-title">{stepItem.title}</h3>
              <p className="process-step-desc">{stepItem.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Process Action Banner */}
        <div className="process-cta-banner">
          <div className="process-cta-text">
            <span>Have a project or opportunity in mind? Let's build something impactful together.</span>
          </div>
          <button
            onClick={onBookCall}
            className="process-cta-btn"
            aria-label="Let's Talk with Jitendra"
          >
            <span>Let's Talk</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
