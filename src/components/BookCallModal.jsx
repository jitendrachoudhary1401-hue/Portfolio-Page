import React, { useState } from 'react';
import { X, Calendar, Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/initialData';
import { submitContactMessage } from '../services/contactService';

export const BookCallModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSending(true);
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message || 'Discussion request via Book a Call'
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bento-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bento-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="bento-modal-header">
          <h3 className="bento-modal-title">Book a Call / Connect</h3>
          <button className="bento-modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={16} />
          </button>
        </div>

        <div className="bento-modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 14px' }} />
              <h4 style={{ color: '#FFFFFF', marginBottom: '8px' }}>Request Received!</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.86rem', lineHeight: '1.5' }}>
                Thank you! I will get back to you shortly at <strong>{formData.email}</strong>.
              </p>
              <button 
                className="bento-btn-primary" 
                style={{ marginTop: '20px', width: '100%' }}
                onClick={() => { setSubmitted(false); onClose(); }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="bento-modal-desc">
                Have a project idea, open role, or collaboration in mind? Schedule a quick discussion or send a direct note.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '0.85rem'
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '0.85rem'
                  }}
                />
                <textarea
                  placeholder="What would you like to discuss? (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    resize: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="bento-btn-primary"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  {sending ? 'Sending...' : 'Schedule Discussion'}
                  <ArrowRight size={15} />
                </button>
              </form>

              <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748B', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Or Connect Directly
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <a
                    href="mailto:jitendrachoudhary1401@gmail.com"
                    className="bento-modal-channel-card"
                  >
                    <div className="bento-channel-icon-wrap">
                      <Mail size={16} />
                    </div>
                    <div className="bento-channel-info">
                      <span className="bento-channel-name">Direct Email</span>
                      <span className="bento-channel-sub">Write to inbox</span>
                    </div>
                  </a>

                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-modal-channel-card"
                  >
                    <div className="bento-channel-icon-wrap">
                      <MessageSquare size={16} />
                    </div>
                    <div className="bento-channel-info">
                      <span className="bento-channel-name">GitHub</span>
                      <span className="bento-channel-sub">Open-Source</span>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
