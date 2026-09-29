import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { faqData } from '../data/initialData';

export const BentoFaq = () => {
  const [openId, setOpenId] = useState('faq-1');

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faqs" className="bento-card bento-card-faq">
      <div className="bento-faq-header">
        <h2 className="bento-section-title">Frequently Asked Questions</h2>
        <p className="bento-section-sub">
          Answers to common questions about my work and process.
        </p>
      </div>

      <div className="bento-faq-list">
        {faqData.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className={`bento-faq-item ${isOpen ? 'active' : ''}`}>
              <button
                className="bento-faq-question-btn"
                onClick={() => toggleItem(faq.id)}
                aria-expanded={isOpen}
              >
                <span className="bento-faq-q-text">{faq.question}</span>
                <span className="bento-faq-toggle-icon">
                  {isOpen ? <X size={15} /> : <Plus size={15} />}
                </span>
              </button>

              {isOpen && (
                <div className="bento-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
