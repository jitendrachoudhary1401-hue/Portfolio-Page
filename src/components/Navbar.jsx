import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Lock, ExternalLink, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = ({ onOpenAdmin, onBookCall }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { currentUser } = useAuth();
  const { personalInfo } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        'hero',
        'projects',
        'services',
        'process',
        'about',
        'certificates',
        'faq',
        'contact'
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'FAQ', href: '#faq', id: 'faq' }
  ];

  return (
    <header className={`navbar modern-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#hero" className="brand-logo" aria-label="Home">
          <span className="brand-name-main">{personalInfo?.name?.toUpperCase() || 'JITENDRA CHOUDHARY'}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Nav Actions: Book a Call Pill & Admin Button */}
        <div className="nav-actions">
          <button
            onClick={onBookCall}
            className="navbar-pill-cta"
            aria-label="Book a call with Jitendra"
          >
            Book a call
          </button>

          <button
            onClick={onOpenAdmin}
            className="admin-nav-icon-btn"
            title={currentUser ? `Logged in as ${currentUser.email}` : "Admin Portal / Cloud Manager"}
            aria-label="Admin Portal"
          >
            {currentUser ? <Shield size={16} color="#10B981" /> : <Lock size={15} />}
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookCall && onBookCall();
            }}
            className="navbar-pill-cta mobile-cta-btn"
          >
            Book a call
          </button>
        </div>
      )}
    </header>
  );
};
