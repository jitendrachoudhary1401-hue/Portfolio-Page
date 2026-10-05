import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CtaBanner = ({ onBookCall }) => {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          {/* Subtle Ambient Background Gradient Geometry */}
          <div className="cta-card-glow" aria-hidden="true" />

          <div className="cta-card-content">
            <h2 className="cta-card-title">
              Your vision, my expertise. Let's <br className="cta-title-break" />
              create something <span className="cta-highlight-word">exceptional.</span>
            </h2>
            <p className="cta-card-desc">
              Open for software engineering internships, technical collaborations, and impactful student projects.
            </p>

            <button
              onClick={onBookCall}
              className="cta-action-pill"
              aria-label="Get in Touch with Jitendra"
            >
              <span>Get in Touch</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
