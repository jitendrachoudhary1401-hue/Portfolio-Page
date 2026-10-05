import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Code2 } from 'lucide-react';
import { personalInfo } from '../data/initialData';
import { subscribeToProfilePhoto } from '../services/profileService';

export const Hero = ({ onOpenAdmin, onBookCall }) => {
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

  return (
    <section id="hero" className="modern-hero-section">
      {/* Background ambient lighting */}
      <div className="hero-radial-halo" aria-hidden="true" />

      <div className="container hero-container-grid">
        {/* Left Column: Heading, Subtitle & Action Buttons */}
        <div className="hero-left-content">
          <p className="hero-eyebrow">
            Hi, I'm <span className="hero-highlight-name">Jitendra</span>, I build
          </p>
          <h1 className="hero-main-title">
            Digital Experiences.
          </h1>
          <p className="hero-subtitle">
            A passionate Computer Science &amp; Engineering (AI/ML) student focused on crafting clean, user-friendly software experiences, robust cross-platform applications, and intelligent systems.
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

            {/* Floating Stat Pill 1: Top-Right (100% Quality & Code Integrity) */}
            <div className="floating-stat-pill pill-tr">
              <span className="floating-stat-val">100%</span>
              <span className="floating-stat-sub">Code Integrity</span>
            </div>

            {/* Floating Stat Pill 2: Middle-Left (140+ Problems & Commits) */}
            <div className="floating-stat-pill pill-ml">
              <span className="floating-stat-val">140+</span>
              <span className="floating-stat-sub">Problems &amp; Commits</span>
            </div>

            {/* Floating Stat Pill 3: Bottom-Left (3+ Years Tech Exploration) */}
            <div className="floating-stat-pill pill-bl">
              <span className="floating-stat-val">3+</span>
              <span className="floating-stat-sub">Years Tech Journey</span>
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
                alt="Jitendra Choudhary"
                className="hero-avatar-image"
                onError={() => setImgError(true)}
              />
            </div>

            {/* Floating Badge: Bottom-Right (Jitendra / CSE & AI/ML Developer) */}
            <div className="floating-stat-pill pill-br">
              <span className="floating-stat-val">JITENDRA</span>
              <span className="floating-stat-sub">CSE • AI/ML DEV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
