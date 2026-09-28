import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { submitContactMessage } from '../services/certificateService';
import { isFirebaseConfigured } from '../services/firebase';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required fields (Name, Email, and Message).' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, text: '' });

    try {
      if (isFirebaseConfigured) {
        await submitContactMessage(formData);
        setStatus({
          type: 'success',
          text: 'Thank you! Your message was securely recorded in the portfolio database. Jitendra will review and get in touch.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // If Firebase is not yet wired in .env, launch direct mailto client
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        window.location.href = mailtoUrl;
        setStatus({
          type: 'success',
          text: 'Opening your default email client to send the message directly.'
        });
      }
    } catch (err) {
      console.error('Contact error:', err);
      setStatus({
        type: 'error',
        text: 'Failed to record message. Please feel free to email directly.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-wrapper" style={{ background: 'rgba(18, 23, 34, 0.25)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">09 // Communication</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-desc">
            Open for technical collaborations, developer discussions, and student community initiatives.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Communication Channels */}
          <div className="contact-channels">
            <div className="channel-card">
              <div className="channel-icon">
                <Mail size={22} />
              </div>
              <div>
                <div className="channel-label">Direct Communication</div>
                <div className="channel-val">Available for Discussion & Inquiries</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Use the verified message form or connect via professional networks
                </div>
              </div>
            </div>

            <a
              href="https://github.com/jitendrachoudhary1401-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card"
            >
              <div className="channel-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>
                <GithubIcon size={22} />
              </div>
              <div>
                <div className="channel-label">Open Source & Code</div>
                <div className="channel-val">github.com/jitendrachoudhary1401-hue</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  View repositories, project code, and development
                </div>
              </div>
            </a>

            <div className="channel-card">
              <div className="channel-icon" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8' }}>
                <LinkedinIcon size={22} />
              </div>
              <div>
                <div className="channel-label">Professional Network</div>
                <div className="channel-val">LinkedIn Network</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Connect for professional updates, hackathons, and opportunities
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Working Message Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <MessageSquare size={18} color="#4F8CFF" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Send a Direct Message
              </h3>
            </div>

            {status.text && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.88rem',
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                color: status.type === 'success' ? '#34D399' : '#F87171',
                border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
              }}>
                {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{status.text}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Full Name *</label>
              <input
                id="contact-name"
                type="text"
                required
                className="form-input"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email Address *</label>
              <input
                id="contact-email"
                type="email"
                required
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="form-input"
                placeholder="Topic of discussion or inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Message *</label>
              <textarea
                id="contact-message"
                required
                className="form-textarea"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ marginTop: '8px' }}
            >
              <Send size={15} />
              <span>{submitting ? 'Transmitting Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
