import React from 'react';
import { Hammer, Sparkles, Target, Compass } from 'lucide-react';
import { personalInfo } from '../data/initialData';

export const CurrentlyBuilding = () => {
  return (
    <section className="section-wrapper">
      <div className="container">
        <div className="currently-building-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span className="building-status-pill">
              <span className="pulse-indicator" aria-hidden="true" />
              <span>{personalInfo.currentlyBuilding.status}</span>
            </span>
            <span className="badge" style={{ fontFamily: 'var(--font-mono)' }}>
              Active Development Track
            </span>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            {personalInfo.currentlyBuilding.title}
          </h3>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '20px', maxWidth: '840px' }}>
            {personalInfo.currentlyBuilding.description}
          </p>

          <div style={{
            background: 'rgba(11, 13, 18, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Target size={18} color="#8B5CF6" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Next Milestone: </strong>
              {personalInfo.currentlyBuilding.nextMilestone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
