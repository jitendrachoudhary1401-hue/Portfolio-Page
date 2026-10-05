import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStrip } from './components/TechStrip';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Certificates } from './components/Certificates';
import { FAQ } from './components/FAQ';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { BookCallModal } from './components/BookCallModal';

import './styles/theme.css';
import './styles/components.css';
import './styles/modern-portfolio.css';
import './styles/admin.css';

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const handleOpenAdmin = () => setIsAdminOpen(true);
  const handleOpenBookCall = () => setIsBookCallOpen(true);

  return (
    <AuthProvider>
      <PortfolioProvider>
        <div className="portfolio-app">
        {/* Accessibility Skip Link */}
        <a href="#hero" className="skip-to-content">
          Skip to main content
        </a>

        {/* 01: Top Fixed Navigation Bar */}
        <Navbar 
          onOpenAdmin={handleOpenAdmin} 
          onBookCall={handleOpenBookCall} 
        />

        <main id="main-content">
          {/* 02: Full-Width Digital Experiences Hero */}
          <Hero 
            onOpenAdmin={handleOpenAdmin} 
            onBookCall={handleOpenBookCall} 
          />

          {/* 03: Core Technologies Strip */}
          <TechStrip />

          {/* 04: Recent Projects (2x2 Grid with Browser Mockup Frames) */}
          <Projects />

          {/* 05: Services Grid & Integrated Stats Counter Strip */}
          <Services />

          {/* 06: Process (01 Discovery, 02 Development, 03 Deployment + CTA) */}
          <Process 
            onBookCall={handleOpenBookCall} 
          />

          {/* 07: About Me (2-Column Bento: Profile Card + Bio + Stack + Timeline) */}
          <About 
            onOpenAdmin={handleOpenAdmin} 
            onBookCall={handleOpenBookCall} 
          />

          {/* 08: Verified Certificates & Credentials (Cloud-synced with Firestore) */}
          <Certificates 
            onOpenAdmin={handleOpenAdmin} 
          />

          {/* 09: Frequently Asked Questions (Interactive Accordion) */}
          <FAQ />

          {/* 10: Call to Action Banner ("Your vision, my expertise...") */}
          <CtaBanner 
            onBookCall={handleOpenBookCall} 
          />
        </main>

        {/* 11: Giant Typography Watermark Footer */}
        <Footer 
          onOpenAdmin={handleOpenAdmin} 
          onBookCall={handleOpenBookCall} 
        />

        {/* Book a Call / Connect Modal */}
        <BookCallModal 
          isOpen={isBookCallOpen} 
          onClose={() => setIsBookCallOpen(false)} 
        />

        {/* Admin Portal Modal (Profile Photo & Certificate Management) */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
        </div>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
