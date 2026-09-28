import React, { useState, useEffect } from 'react';
import { Code, Cpu, Users, MapPin, Sparkles, User, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/initialData';
import { subscribeToProfilePhoto } from '../services/profileService';

export const About = ({ onOpenAdmin }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProfilePhoto((url) => {
      setPhotoUrl(url);
      setImgError(false);
    });
    return () => unsub && unsub();
  }, []);

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

        <div className="about-grid-3col">
          {/* Column 1: Dedicated Profile Portrait Card */}
          <div className="about-profile-card">
            <div className="profile-photo-container">
              <span className="profile-corner corner-tl" />
              <span className="profile-corner corner-tr" />
              <span className="profile-corner corner-bl" />
              <span className="profile-corner corner-br" />

              <div className="profile-photo-inner">
                {photoUrl && !imgError ? (
                  <img
                    src={photoUrl}
                    alt="Jitendra Choudhary Profile Portrait"
                    className="profile-photo-img"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="profile-fallback-box">
                    <div className="profile-initials-badge">JC</div>
                    <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      Photo Space Ready
                    </span>
                    <button
                      onClick={onOpenAdmin}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                    >
                      Upload Photo
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {personalInfo.name}
            </h3>

            <div style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              {personalInfo.role}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <MapPin size={14} color="#4F8CFF" />
                <span>India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={14} color="#10B981" />
                <span>Technical Vidya & NSS</span>
              </div>
            </div>
          </div>

          {/* Column 2: First-Person Narrative */}
          <div className="card about-narrative" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
                Engineering Foundations & Community
              </h3>
              <p className="about-main-text">
                {personalInfo.about}
              </p>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-accent">CSE • AI/ML</span>
              <span className="badge">Technical Vidya Contributor</span>
              <span className="badge">NSS Volunteer</span>
            </div>
          </div>

          {/* Column 3: Three Focus Pillars */}
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
