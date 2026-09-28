import React from 'react';
import { ArrowRight, Mail, Terminal as TerminalIcon, Code2, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/initialData';

export const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left Column: Introduction & CTAs */}
        <div className="hero-content">
          <div className="hero-greeting">
            <TerminalIcon size={16} />
            <span>&gt; hello, I'm</span>
          </div>

          <h1 className="hero-name">
            JITENDRA<br />CHOUDHARY
          </h1>

          <div>
            <span className="hero-role-badge">
              <Code2 size={16} />
              {personalInfo.role}
            </span>
          </div>

          <h2 className="hero-tagline">{personalInfo.tagline}</h2>

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
