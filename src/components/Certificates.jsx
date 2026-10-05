import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ExternalLink, 
  Search, 
  PlusCircle, 
  Building,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { subscribeToCertificates } from '../services/certificateService';
import { useAuth } from '../context/AuthContext';
import { CertificateModal } from './CertificateModal';

export const Certificates = ({ onOpenAdmin }) => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCertificates(
      (certs) => {
        setCertificates(certs || []);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching certificates:', error);
        setLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const categories = ['All', 'AI/ML', 'Web Development', 'Programming', 'Cloud', 'General'];

  const filteredCertificates = certificates.filter((cert) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (cert.category && cert.category.toLowerCase() === activeCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      cert.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="certificates" className="modern-section-wrapper">
      <div className="container">
        {/* Centered Section Header */}
        <div className="section-centered-header">
          <h2 className="section-centered-title">Certificates &amp; Credentials</h2>
          <p className="section-centered-subtitle">
            Verified academic milestones and technical certifications synced with Cloud Firestore.
          </p>
        </div>

        {/* Toolbar: Category Filters & Search */}
        <div className="modern-cert-toolbar">
          <div className="modern-filter-pills" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`modern-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="modern-search-box">
            <Search size={15} color="#64748B" />
            <input
              type="text"
              className="modern-search-input"
              placeholder="Filter credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter certificates"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="modern-certificates-grid">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert) => (
              <div key={cert.id} className="modern-cert-card">
                <div className="cert-card-top-row">
                  <span className="cert-issuer-badge">
                    <Building size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {cert.organization}
                  </span>
                  {cert.issueDate && <span className="cert-date-text">{cert.issueDate}</span>}
                </div>

                <h3 className="cert-card-title">{cert.title}</h3>

                {cert.description && (
                  <p className="cert-card-desc">{cert.description}</p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="cert-skills-tags">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="cert-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="cert-card-actions">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="cert-action-btn primary"
                  >
                    <FileCheck size={14} />
                    <span>View Proof</span>
                  </button>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-action-btn secondary"
                      aria-label="Verify Certificate Link"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="cert-empty-state">
              <ShieldCheck size={36} color="#3B82F6" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ color: '#FFFFFF', marginBottom: '8px' }}>Verified Credentials Repository</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 16px' }}>
                Technical certifications and event credentials are ready to be managed via Cloud Firestore.
              </p>
              <button
                onClick={onOpenAdmin}
                className="hero-btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                <PlusCircle size={14} style={{ marginRight: '6px' }} />
                <span>Open Admin Portal</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
