import React from 'react';
import { servicesData, statsData } from '../data/initialData';

export const BentoServicesStats = () => {
  return (
    <div id="services" className="bento-card bento-card-services">
      {/* 01: Three Service / Domain Cards with Custom Vector Line Icons */}
      <div className="bento-services-grid">
        {/* Service 1: Web Development */}
        <div className="bento-service-card">
          <div className="bento-service-icon-box" aria-hidden="true">
            <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="64" height="48" rx="6" stroke="#38BDF8" strokeWidth="2" fill="rgba(56, 189, 248, 0.04)" />
              <circle cx="9" cy="8" r="2.2" fill="#38BDF8" />
              <circle cx="16" cy="8" r="2.2" fill="#38BDF8" />
              <circle cx="23" cy="8" r="2.2" fill="#38BDF8" />
              <line x1="2" y1="14" x2="66" y2="14" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.6" />
              <path d="M26 23L19 31L26 39" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M42 23L49 31L42 39" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="37" y1="21" x2="31" y2="41" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="bento-service-title">{servicesData[0]?.title || 'Web Development'}</h3>
          <p className="bento-service-desc">
            {servicesData[0]?.description || 'Build fast, scalable, and modern web apps tailored for performance and impact.'}
          </p>
        </div>

        {/* Service 2: Cross-Platform Development */}
        <div className="bento-service-card">
          <div className="bento-service-icon-box" aria-hidden="true">
            <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Desktop / Tablet in back */}
              <rect x="20" y="4" width="44" height="32" rx="4" stroke="#38BDF8" strokeWidth="1.8" fill="rgba(56, 189, 248, 0.04)" />
              <line x1="36" y1="36" x2="48" y2="36" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <line x1="42" y1="36" x2="42" y2="42" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <line x1="32" y1="42" x2="52" y2="42" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              {/* Smartphone in front */}
              <rect x="8" y="16" width="20" height="32" rx="3.5" stroke="#38BDF8" strokeWidth="2" fill="#0A0F1E" />
              <circle cx="18" cy="43.5" r="1.5" fill="#38BDF8" />
              <line x1="14" y1="19.5" x2="22" y2="19.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="bento-service-title">{servicesData[1]?.title || 'Cross-Platform Development'}</h3>
          <p className="bento-service-desc">
            {servicesData[1]?.description || 'Create seamless experiences across web, mobile, and desktop with unified architectures.'}
          </p>
        </div>

        {/* Service 3: UI/UX & AI Systems */}
        <div className="bento-service-card">
          <div className="bento-service-icon-box" aria-hidden="true">
            <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Laptop screen */}
              <rect x="10" y="7" width="48" height="32" rx="3.5" stroke="#38BDF8" strokeWidth="2" fill="rgba(56, 189, 248, 0.04)" />
              {/* Laptop base */}
              <path d="M4 39C4 37.8954 4.89543 37 6 37H62C63.1046 37 64 37.8954 64 39V41C64 42.1046 63.1046 43 62 43H6C4.89543 43 4 42.1046 4 41V39Z" stroke="#38BDF8" strokeWidth="1.8" fill="#0A0F1E" />
              {/* Pointer Cursor Arrow */}
              <path d="M30 16L39 25L34 26L37 31L34 32.5L31 27.5L28 30L30 16Z" fill="#38BDF8" stroke="#070B16" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="bento-service-title">{servicesData[2]?.title || 'UI/UX Design'}</h3>
          <p className="bento-service-desc">
            {servicesData[2]?.description || 'Design intuitive, conversion-driven interfaces that users love to interact with.'}
          </p>
        </div>
      </div>

      {/* 02: Integrated 4-Column Stat Counter Strip */}
      <div className="bento-stat-counter-strip">
        {statsData.map((stat, idx) => (
          <div key={idx} className="bento-counter-item">
            <span className="bento-counter-val">{stat.value}</span>
            <span className="bento-counter-lbl">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
