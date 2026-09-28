import React from 'react';
import { Trophy, Award, Calendar, Sparkles, CheckCircle } from 'lucide-react';

export const Achievements = () => {
  // Real achievements structure: displays verified milestones and readiness
  const verifiedAchievements = [
    {
      title: 'Technical Vidya Community Recognition',
      organization: 'Technical Vidya Network',
      date: 'Active',
      description: 'Recognized for active contributions toward student peer learning and organizing collaborative technical discussions in software engineering fundamentals.',
      badge: 'Community Contributor'
    },
    {
      title: 'NSS Social Impact Commendation',
      organization: 'National Service Scheme',
      date: 'Active',
      description: 'Acknowledged for dedicated volunteer service in community outreach programs, health camps, and student-led environmental awareness drives.',
      badge: 'Social Impact'
    }
  ];

  return (
    <section id="achievements" className="section-wrapper">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">07 // Recognition</span>
          <h2 className="section-title">Honors & Achievements</h2>
          <p className="section-desc">
            Verified milestones, competition participation, and community recognitions. Displayed strictly with truthful evidence.
          </p>
        </div>

        <div className="achievements-grid">
          {verifiedAchievements.map((item, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={18} color="#F59E0B" />
                  <span className="badge badge-accent">{item.badge}</span>
                </div>
                <span className="cert-date">{item.date}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {item.title}
              </h3>

              <div style={{ fontSize: '0.88rem', color: 'var(--accent-blue)', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
                {item.organization}
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
