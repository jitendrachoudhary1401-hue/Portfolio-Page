import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { BentoDashboard } from './components/BentoDashboard';
import { IdentityStrip } from './components/IdentityStrip';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { LearningJourney } from './components/LearningJourney';
import { Certificates } from './components/Certificates';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { CurrentlyBuilding } from './components/CurrentlyBuilding';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

import './styles/theme.css';
import './styles/components.css';
import './styles/bento.css';
import './styles/admin.css';

export function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="portfolio-app">
        {/* Skip to Content for Accessibility */}
        <a href="#hero" className="skip-to-content">
          Skip to main content
        </a>

        {/* 01: Sticky Navigation Bar on Scroll */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        <main id="main-content">
          {/* 02: Master Bento Showcase (Pixel-Perfect to Reference Design) */}
          <BentoDashboard onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* 03: Quick Identity Strip */}
          <IdentityStrip />

          {/* 04: About Me */}
          <About onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* 05: Skills & Tech Stack */}
          <Skills />

          {/* 06: Featured Projects */}
          <Projects />

          {/* 07: Experience & Community Involvement */}
          <Experience />

          {/* 08: Learning & Development Journey */}
          <LearningJourney />

          {/* 09: Certificates (Cloud Firestore + Storage Integrated) */}
          <Certificates onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* 10: Honors & Achievements */}
          <Achievements />

          {/* 11: Education */}
          <Education />

          {/* 12: Currently Building */}
          <CurrentlyBuilding />

          {/* 13: Contact & Message Transmit */}
          <Contact />
        </main>

        {/* 14: Minimal Technical Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* 15: Admin & Certificate Management Modal */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
