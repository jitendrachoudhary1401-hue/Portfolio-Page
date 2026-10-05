import React from 'react';
import { Shield, Lock, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/initialData';
import { useAuth } from '../context/AuthContext';

export const Footer = ({ onOpenAdmin, onBookCall }) => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="modern-footer-section">
      {/* Ambient Blue Halo behind Watermark */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="container footer-content-container">
        {/* Giant Watermark Typography matching the screenshot */}
        <div className="footer-giant-watermark" aria-hidden="true">
          JITENDRA CHOUDHARY
        </div>

        {/* Navigation Links */}
        <ul className="footer-nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>

        {/* Social Icons Row */}
        <div className="footer-social-row">
          {personalInfo.contact.github && (
            <a
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {personalInfo.contact.linkedin && (
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
          )}
          <button
            onClick={onBookCall}
            className="footer-social-circle"
            aria-label="Contact / Book a Call"
          >
            <Mail size={18} />
          </button>
        </div>

        {/* Bottom Legal & Admin Row */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </span>

          <div className="footer-bottom-actions">
            <button
              onClick={onOpenAdmin}
              className="footer-admin-link"
              title="Admin Portal"
            >
              {currentUser ? <Shield size={12} color="#10B981" /> : <Lock size={12} />}
              <span>{currentUser ? 'Admin (Active)' : 'Admin'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="footer-scroll-top-btn"
              aria-label="Scroll to top of page"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
