import React from 'react';
import { X, ExternalLink, Calendar, Award, Building, FileText, CheckCircle } from 'lucide-react';

export const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const isPdf = certificate.fileUrl && (certificate.fileType === 'application/pdf' || certificate.fileUrl.toLowerCase().includes('.pdf'));

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '6px' }}>
              {certificate.category || 'Certification'}
            </span>
            <h3 className="modal-title">{certificate.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close certificate viewer">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Certificate Document / Media Preview */}
          {certificate.fileUrl ? (
            <div style={{
              background: '#080A0E',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              maxHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {isPdf ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <FileText size={48} color="#4F8CFF" />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Document stored in PDF format
                  </p>
                  <a
                    href={certificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Open PDF in Full Viewer</span>
                  </a>
                </div>
              ) : (
                <img
                  src={certificate.fileUrl}
                  alt={`${certificate.title} Certificate Document`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '380px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  loading="lazy"
                />
              )}
            </div>
          ) : null}

          {/* Issuer & Date Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div className="card" style={{ padding: '16px' }}>
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building size={13} />
                <span>Issuing Organization</span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                {certificate.organization}
              </div>
            </div>

            <div className="card" style={{ padding: '16px' }}>
              <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={13} />
                <span>Issue Date</span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                {certificate.issueDate || 'Verified'}
              </div>
            </div>
          </div>

          {/* Description */}
          {certificate.description && (
            <div>
              <div className="detail-label">Credential Summary</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.92rem', marginTop: '6px' }}>
                {certificate.description}
              </p>
            </div>
          )}

          {/* Skills / Tags */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div>
              <div className="detail-label">Verified Competencies</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {certificate.skills.map((skill, idx) => (
                  <span key={idx} className="badge">
                    <CheckCircle size={12} color="#10B981" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={14} />
              <span>Verify Official Credential</span>
            </a>
          )}
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
