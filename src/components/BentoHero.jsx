import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/initialData';
import { subscribeToProfilePhoto } from '../services/profileService';

export const BentoHero = ({ onOpenAdmin, onBookCall }) => {
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
    <div className="bento-card bento-card-hero">
      {/* 01: Integrated Pill Header Nav */}
      <nav className="bento-hero-nav" aria-label="Hero pill navigation">
        <a 
          href="#hero" 
          className="bento-nav-pill-brand"
          onDoubleClick={onOpenAdmin}
          title="Jitendra Choudhary (Double-click for Admin)"
        >
          <span>JITENDRA CHOUDHARY</span>
        </a>

        <ul className="bento-nav-links">
          <li><a href="#projects" className="bento-nav-link">PROJECTS</a></li>
          <li><a href="#services" className="bento-nav-link">SERVICES</a></li>
          <li><a href="#testimonials" className="bento-nav-link">TESTIMONIALS</a></li>
          <li><a href="#faqs" className="bento-nav-link">FAQS</a></li>
        </ul>

        <button 
          onClick={onBookCall} 
          className="bento-btn-primary"
          aria-label="Book a call with Jitendra"
        >
          Book a call
        </button>
      </nav>

      {/* 02: Main Hero Body Grid */}
      <div className="bento-hero-main">
        {/* Left Column: Heading, Subtitle & CTAs */}
        <div className="bento-hero-copy">
          <p className="bento-hero-eyebrow">
            Hi! I'm <strong>Jitendra</strong>, building
          </p>
          <h1 className="bento-hero-title">
            Digital Experiences.
          </h1>
          <p className="bento-hero-sub">
            From prototypes to production-ready systems, I turn ideas into scalable, user-focused products with clean architectures and purposeful functionality.
          </p>

          <div className="bento-hero-ctas">
            <button onClick={onBookCall} className="bento-btn-primary">
              Let's Connect
            </button>
            <a href="#projects" className="bento-btn-secondary">
              See My Work
            </a>
          </div>
        </div>

        {/* Right Column: Studio Portrait with Radial Glow & Floating Stat Pills */}
        <div className="bento-portrait-showcase">
          {/* Ambient Blue Radial Glow */}
          <div className="bento-ambient-glow" aria-hidden="true" />

          {/* Floating Stat Pill 1 (Top-Left): 1M+ Coding Hours */}
          <div className="bento-stat-pill pos-top-left">
            <span className="bento-stat-num">1M+</span>
            <span className="bento-stat-lbl">Coding Hours</span>
          </div>

          {/* Floating Stat Pill 2 (Top-Right): 500+ Satisfied Peers */}
          <div className="bento-stat-pill pos-top-right">
            <span className="bento-stat-num">500+</span>
            <span className="bento-stat-lbl">Satisfied Peers</span>
          </div>

          {/* Portrait Image Frame */}
          <div 
            className="bento-portrait-img-box"
            onClick={onOpenAdmin}
            title="Click to update / upload profile photo in Admin"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenAdmin && onOpenAdmin(); }}
          >
            <img
              src={displayPhoto}
              alt="Jitendra Choudhary"
              className="bento-portrait-img"
              onError={() => setImgError(true)}
            />
          </div>

          {/* Floating Stat Pill 3 (Bottom-Left): 140+ Projects Completed */}
          <div className="bento-stat-pill pos-bottom-left">
            <span className="bento-stat-num">140+</span>
            <span className="bento-stat-lbl">Projects Completed</span>
          </div>

          {/* Floating Stat Pill 4 (Bottom-Right): 3+ Years of Experience */}
          <div className="bento-stat-pill pos-bottom-right">
            <span className="bento-stat-num">3+</span>
            <span className="bento-stat-lbl">Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};
