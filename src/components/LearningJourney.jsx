import React from 'react';
import { Clock, CheckCircle2, Compass } from 'lucide-react';
import { learningJourney } from '../data/initialData';

export const LearningJourney = () => {
  return (
    <section className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">05 // Growth Path</span>
          <h2 className="section-title">Learning & Development Journey</h2>
          <p className="section-desc">
            A transparent progression showing how core computational thinking expanded into web engineering, AI/ML exploration, and mobile app development.
          </p>
        </div>

        <div className="journey-steps">
          {learningJourney.map((item, idx) => (
            <div key={idx} className="journey-card">
              <div>
                <div className="journey-number">{item.step}</div>
                <h3 className="journey-phase">{item.phase}</h3>
                <div className="journey-focus">{item.focus}</div>
                <p className="journey-desc">{item.description}</p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <span className={`badge ${
                  item.status === 'Completed'
                    ? 'badge'
                    : item.status === 'Learning'
                    ? 'badge-learning'
                    : 'badge-accent'
                }`}>
                  {item.status === 'Learning' ? (
                    <>
                      <Clock size={12} />
                      Current Priority
                    </>
                  ) : item.status === 'Exploring' ? (
                    <>
                      <Compass size={12} />
                      Active Exploration
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} />
                      {item.status}
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
