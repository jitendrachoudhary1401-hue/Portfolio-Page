import React from 'react';
import { servicesData, statsData } from '../data/initialData';

export const Services = () => {
  // SVG Wireframe illustrations matching the exact wireframe aesthetic of the screenshot
  const renderWireframeIcon = (type) => {
    switch (type) {
      case 'code':
        return (
          <div className="service-wireframe-box">
            <svg viewBox="0 0 100 80" className="wireframe-svg" fill="none" stroke="currentColor">
              {/* Outer Window */}
              <rect x="5" y="5" width="90" height="70" rx="8" strokeWidth="2" strokeOpacity="0.4" />
              {/* Header dots */}
              <circle cx="16" cy="16" r="2.5" fill="currentColor" fillOpacity="0.6" />
              <circle cx="24" cy="16" r="2.5" fill="currentColor" fillOpacity="0.6" />
              <circle cx="32" cy="16" r="2.5" fill="currentColor" fillOpacity="0.6" />
              <line x1="5" y1="26" x2="95" y2="26" strokeWidth="1.5" strokeOpacity="0.25" />
              {/* Code Brackets in the center */}
              <path d="M38 42L28 50L38 58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M62 42L72 50L62 58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="53" y1="38" x2="47" y2="62" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
            </svg>
          </div>
        );
      case 'devices':
        return (
          <div className="service-wireframe-box">
            <svg viewBox="0 0 100 80" className="wireframe-svg" fill="none" stroke="currentColor">
              {/* Tablet Wireframe */}
              <rect x="18" y="10" width="46" height="60" rx="6" strokeWidth="2" strokeOpacity="0.5" />
              <circle cx="41" cy="64" r="2" fill="currentColor" fillOpacity="0.6" />
              {/* Phone Wireframe overlapping */}
              <rect x="52" y="24" width="30" height="46" rx="5" strokeWidth="2" fill="#0A0F1E" />
              <circle cx="67" cy="65" r="1.5" fill="currentColor" fillOpacity="0.8" />
              <line x1="59" y1="29" x2="75" y2="29" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
            </svg>
          </div>
        );
      case 'monitor':
      default:
        return (
          <div className="service-wireframe-box">
            <svg viewBox="0 0 100 80" className="wireframe-svg" fill="none" stroke="currentColor">
              {/* Laptop Screen */}
              <rect x="14" y="12" width="72" height="46" rx="5" strokeWidth="2" strokeOpacity="0.5" />
              {/* Laptop Base */}
              <path d="M6 62L94 62C92 65 86 66 84 66L16 66C14 66 8 65 6 62Z" strokeWidth="1.8" strokeOpacity="0.7" fill="#0A0F1E" />
              {/* Inner System / AI Sparkle */}
              <circle cx="50" cy="35" r="6" strokeWidth="1.8" strokeOpacity="0.8" />
              <path d="M50 21V25M50 45V49M36 35H40M60 35H64" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section id="services" className="modern-section-wrapper">
      <div className="container">
        {/* Centered Header */}
        <div className="section-centered-header">
          <h2 className="section-centered-title">Services</h2>
          <p className="section-centered-subtitle">
            Specialized engineering, software development, and modern product architecture.
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="modern-services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="modern-service-card">
              <div className="service-card-wireframe">
                {renderWireframeIcon(service.icon)}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Row underneath Services */}
        <div className="modern-stats-counter-strip">
          {statsData.map((stat, idx) => (
            <div key={idx} className="modern-stat-item">
              <div className="stat-value-display">{stat.value}</div>
              <div className="stat-label-display">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
