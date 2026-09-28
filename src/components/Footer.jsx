import React from 'react';
import { Terminal, Shield, Lock, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/initialData';
import { useAuth } from '../context/AuthContext';

export const Footer = ({ onOpenAdmin }) => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Terminal size={16} color="#4F8CFF" />
            <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {personalInfo.name}
            </strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              • {personalInfo.role}
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            {personalInfo.tagline} • Built with React, Vite & Firebase.
          </p>
        </div>

        <ul className="footer-nav">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={onOpenAdmin}
            className="admin-nav-btn"
            style={{ fontSize: '0.78rem', padding: '5px 10px' }}
          >
            {currentUser ? <Shield size={13} color="#10B981" /> : <Lock size={13} />}
            <span>{currentUser ? 'Admin Panel' : 'Admin Login'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="btn btn-secondary btn-sm"
            aria-label="Scroll to top"
            style={{ padding: '6px 10px' }}
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '8px' }}>
        <span>&copy; {currentYear} {personalInfo.name}. All verified portfolio information preserved.</span>
        <span>Minimal Tech — Professional + Developer</span>
      </div>
    </footer>
  );
};
