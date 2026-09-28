import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ExternalLink, 
  Search, 
  PlusCircle, 
  Calendar, 
  Building,
  FileCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { subscribeToCertificates } from '../services/certificateService';
import { isFirebaseConfigured } from '../services/firebase';
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
        setCertificates(certs);
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
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="certificates" className="section-wrapper" style={{ background: 'rgba(18, 23, 34, 0.25)' }}>
      <div className="container">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-tag">06 // Verified Credentials</span>
              <h2 className="section-title">Certificates & Licenses</h2>
              <p className="section-desc">
                Verified technical credentials and certifications stored and managed through Cloud Firestore and Firebase Storage.
              </p>
            </div>

            <button
              onClick={onOpenAdmin}
              className="btn btn-secondary btn-sm"
              title="Admin Certificate Portal"
            >
              <PlusCircle size={15} color="#4F8CFF" />
              <span>{currentUser ? 'Manage Certificates' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>

        {/* Firebase Environment Status Notice (if not yet configured in .env) */}
        {!isFirebaseConfigured && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={18} color="#F59E0B" />
              <span style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Firebase backend ready: add your credentials in <code>.env</code> for live Cloud Firestore & Storage syncing, or use Admin Portal.
              </span>
            </div>
            <button
              onClick={onOpenAdmin}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              Setup Guide
            </button>
          </div>
        )}

        {/* Toolbar: Category Filters & Search */}
        <div className="cert-toolbar">
          <div className="cert-filter-pills" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="cert-search-box">
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              className="cert-search-input"
              placeholder="Search by title, issuer, skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search certificates"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert) => (
              <div key={cert.id} className="cert-card">
                <div>
                  <div className="cert-card-top">
                    <span className="cert-org-badge">
                      <Building size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {cert.organization}
                    </span>
                    <span className="cert-date">{cert.issueDate}</span>
                  </div>

                  <h3 className="cert-title">{cert.title}</h3>

                  {cert.description && <p className="cert-desc">{cert.description}</p>}

                  {cert.skills && cert.skills.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      {cert.skills.slice(0, 3).map((skill, sIdx) => (
                        <span key={sIdx} className="badge" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="badge" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="cert-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedCert(cert)}
                    style={{ flex: 1 }}
                  >
                    <FileCheck size={14} />
                    <span>View Certificate</span>
                  </button>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      title="Verify Official Credential"
                      aria-label={`Verify ${cert.title}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cert-card">
              <div className="empty-cert-icon">
                <Award size={28} />
              </div>
              <h3 className="empty-cert-title">
                {searchQuery || activeCategory !== 'All'
                  ? 'No matching certificates found'
                  : 'Certificates Database Initialized'}
              </h3>
              <p className="empty-cert-desc">
                {searchQuery || activeCategory !== 'All'
                  ? 'Try adjusting your search criteria or selecting a different category filter.'
                  : 'Real certificates can be published dynamically via the Admin Portal to Firebase Cloud Firestore and Firebase Storage.'}
              </p>
              <button onClick={onOpenAdmin} className="btn btn-primary btn-sm">
                <PlusCircle size={15} />
                <span>Upload First Certificate</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
