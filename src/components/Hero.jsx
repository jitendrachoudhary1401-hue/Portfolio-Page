import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { subscribeToProfilePhoto } from '../services/profileService';

export const Hero = ({ onOpenAdmin, onBookCall }) => {
  const { personalInfo, stats } = usePortfolio();
  const [photoUrl, setPhotoUrl] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProfilePhoto((url) => {
      if (url) {
        setPhotoUrl(url);
        setImgError(false);
      }
    });
    return () => unsub && unsub();
  }, []);

  const defaultPhoto = '/portrait.jpg';
  const displayPhoto = (!imgError && photoUrl) ? photoUrl : defaultPhoto;

  const firstName = personalInfo?.name ? personalInfo.name.split(' ')[0] : 'Jitendra';

  // Stats fallback
  const stat1 = stats?.[0] || { value: '100%', label: 'Code Integrity' };
  const stat2 = stats?.[1] || { value: '140+', label: 'Problems & Commits' };
  const stat3 = stats?.[2] || { value: '3+', label: 'Years Tech Journey' };

  return (
    <section id="hero" className="modern-hero-section">
      {/* Background ambient lighting */}
      <div className="hero-radial-halo" aria-hidden="true" />

      <div className="container hero-container-grid">
        {/* Left Column: Heading, Subtitle & Action Buttons */}
        <div className="hero-left-content">
          <p className="hero-eyebrow">
            Hi, I'm <span className="hero-highlight-name">{firstName}</span>, I build
          </p>
          <h1 className="hero-main-title">
            {personalInfo?.tagline || 'Digital Experiences.'}
          </h1>
          <p className="hero-subtitle">
            {personalInfo?.heroIntro || 'A passionate Computer Science & Engineering (AI/ML) student focused on crafting clean, user-friendly software experiences, robust cross-platform applications, and intelligent systems.'}
          </p>

          <div className="hero-actions-group">
            <button
              onClick={onBookCall}
              className="hero-btn-primary"
              aria-label="Let's Connect"
            >
              Let's Connect
            </button>
            <a
              href="#projects"
              className="hero-btn-secondary"
            >
              Past Work
            </a>
          </div>
        </div>

        {/* Right Column: Glowing Studio Portrait with Floating Stat Badges */}
        <div className="hero-right-visual">
          <div className="hero-portrait-stage">
            {/* Ambient Deep Blue Sphere */}
            <div className="hero-ambient-orb" aria-hidden="true" />

            {/* Floating Stat Pill 1 */}
            <div className="floating-stat-pill pill-tr">
              <span className="floating-stat-val">{stat1.value}</span>
              <span className="floating-stat-sub">{stat1.label}</span>
            </div>

            {/* Floating Stat Pill 2 */}
            <div className="floating-stat-pill pill-ml">
              <span className="floating-stat-val">{stat2.value}</span>
              <span className="floating-stat-sub">{stat2.label}</span>
            </div>

            {/* Floating Stat Pill 3 */}
            <div className="floating-stat-pill pill-bl">
              <span className="floating-stat-val">{stat3.value}</span>
              <span className="floating-stat-sub">{stat3.label}</span>
            </div>

            {/* Central Portrait Image Box */}
            <div
              className="hero-avatar-wrapper"
              onClick={onOpenAdmin}
              title="Click to manage profile photo in Admin"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenAdmin && onOpenAdmin(); }}
            >
              <img
                src={displayPhoto}
                alt={personalInfo?.name || "Jitendra Choudhary"}
                className="hero-avatar-image"
                onError={() => setImgError(true)}
              />
            </div>

            {/* Floating Badge: Bottom-Right */}
            <div className="floating-stat-pill pill-br">
              <span className="floating-stat-val">{firstName.toUpperCase()}</span>
              <span className="floating-stat-sub">{personalInfo?.role || 'CSE • AI/ML DEV'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
