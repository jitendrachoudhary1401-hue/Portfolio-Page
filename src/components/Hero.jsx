import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Terminal as TerminalIcon, Code2, Sparkles, User, Camera } from 'lucide-react';
import { personalInfo } from '../data/initialData';
import { subscribeToProfilePhoto } from '../services/profileService';

export const Hero = ({ onOpenAdmin }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProfilePhoto((url) => {
      setPhotoUrl(url);
      setImgError(false);
    });
    return () => unsub && unsub();
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left Column: Introduction, Name + Animated Portrait, & CTAs */}
        <div className="hero-content">
          <div className="hero-greeting">
            <TerminalIcon size={15} />
            <span>&gt; hello, I'm</span>
            <span className="hero-role-badge" style={{ marginBottom: 0 }}>
              <Code2 size={14} />
              {personalInfo.role}
            </span>
          </div>

          {/* Name & Animated Portrait Frame Side-by-Side */}
          <div className="hero-name-and-image-container">
            <div className="hero-name-col">
              <h1 className="hero-name">
                JITENDRA<br />CHOUDHARY
              </h1>
              <h2 className="hero-tagline">{personalInfo.tagline}</h2>
            </div>

            {/* Animated Portrait Frame on the Right Side of Name */}
            <div className="hero-portrait-showcase">
              <div 
                className="hero-portrait-frame" 
                onClick={onOpenAdmin} 
                title="Click to manage/update profile photo"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenAdmin && onOpenAdmin(); }}
              >
                {/* Tech Corner Brackets */}
                <span className="hero-tech-bracket bracket-tl" />
                <span className="hero-tech-bracket bracket-tr" />
                <span className="hero-tech-bracket bracket-bl" />
                <span className="hero-tech-bracket bracket-br" />

                {/* Floating Tech Chips */}
                <div className="hero-floating-pill pill-top">
                  <Sparkles size={11} color="#38BDF8" />
                  <span>CSE • AI/ML</span>
                </div>

                <div className="hero-floating-pill pill-bottom">
                  <Code2 size={11} color="#8B5CF6" />
                  <span>Flutter • Python</span>
                </div>

                {/* Inner Image Container */}
                <div className="hero-portrait-inner">
                  {photoUrl && !imgError ? (
                    <img
                      src={photoUrl}
                      alt="Jitendra Choudhary"
                      className="hero-portrait-img"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="hero-portrait-fallback">
                      <div className="hero-portrait-initials">JC</div>
                      <span className="hero-fallback-text">Photo Space</span>
                      <span className="hero-fallback-sub">
                        <Camera size={11} style={{ display: 'inline', marginRight: '3px' }} />
                        Upload
                      </span>
                    </div>
                  )}
                </div>

                {/* Active Radar Status Pill */}
                <div className="hero-portrait-status">
                  <span className="status-radar-dot" />
                  <span>Active & Building</span>
                </div>
              </div>
            </div>
          </div>

          <p className="hero-intro">{personalInfo.heroIntro}</p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Mail size={16} />
              <span>Connect</span>
            </a>
          </div>
        </div>

        {/* Right Column: Restrained Developer Terminal */}
        <div className="hero-terminal-wrapper">
          <div className="terminal-card" role="region" aria-label="Developer Information Terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <span className="terminal-title">{personalInfo.terminal.user}</span>
              <div style={{ width: 40 }} />
            </div>

            <div className="terminal-body">
              <div className="term-cmd">$ whoami</div>
              <div className="term-out">&gt; {personalInfo.terminal.whoami}</div>

              <div className="term-cmd">$ currently_learning</div>
              <div className="term-out">&gt; <span className="term-accent">{personalInfo.terminal.currentlyLearning}</span></div>

              <div className="term-cmd">$ exploring</div>
              {personalInfo.terminal.exploring.map((item, idx) => (
                <div key={idx} className="term-out">&gt; {item}</div>
              ))}

              <div className="term-cmd">$ status</div>
              <div className="term-out">
                &gt; {personalInfo.terminal.status}
                <span className="cursor-blink" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
