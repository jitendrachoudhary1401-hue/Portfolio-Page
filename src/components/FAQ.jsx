import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '../data/initialData';

export const FAQ = () => {
  const [openId, setOpenId] = useState('faq-1');

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="modern-section-wrapper">
      <div className="container">
        {/* Centered Header */}
        <div className="section-centered-header">
          <h2 className="section-centered-title">Frequently Asked Questions</h2>
          <p className="section-centered-subtitle">
            Common questions regarding my engineering focus, tech stack, and availability.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="modern-faq-container">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`modern-faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="modern-faq-question-btn"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon-toggle">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="modern-faq-answer-body">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
