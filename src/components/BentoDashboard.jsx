import React, { useState } from 'react';
import { BentoHero } from './BentoHero';
import { BentoExperienceTestimonials } from './BentoExperienceTestimonials';
import { BentoServicesStats } from './BentoServicesStats';
import { BentoFaq } from './BentoFaq';
import { BookCallModal } from './BookCallModal';

export const BentoDashboard = ({ onOpenAdmin }) => {
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <section id="hero" className="bento-master-section">
      <div className="bento-master-container">
        {/* Master Bento Grid Frame */}
        <div className="bento-frame">
          {/* Quadrant 1 (Top-Left): Hero Card */}
          <BentoHero
            onOpenAdmin={onOpenAdmin}
            onBookCall={() => setBookCallOpen(true)}
          />

          {/* Quadrant 2 (Top-Right): Experience & Testimonials */}
          <BentoExperienceTestimonials
            onBookCall={() => setBookCallOpen(true)}
          />

          {/* Quadrant 3 (Bottom-Left): Services & Stat Counter */}
          <BentoServicesStats />

          {/* Quadrant 4 (Bottom-Right): FAQs Accordion */}
          <BentoFaq />
        </div>
      </div>

      {/* Book a Call / Connect Modal */}
      <BookCallModal
        isOpen={bookCallOpen}
        onClose={() => setBookCallOpen(false)}
      />
    </section>
  );
};
