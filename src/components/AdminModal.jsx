import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  FileText, 
  ExternalLink,
  LogOut,
  Database,
  Key,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  addCertificate, 
  updateCertificate, 
  deleteCertificate, 
  subscribeToCertificates 
} from '../services/certificateService';
import { firebaseConfigStatus } from '../services/firebase';

export const AdminModal = ({ isOpen, onClose }) => {
  const { currentUser, login, logout, isFirebaseConfigured } = useAuth();
  
  // UI Tabs
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' | 'form' | 'config' | 'rules'
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Certificate Management State
  const [certificates, setCertificates] = useState([]);
  const [editingCertId, setEditingCertId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Certificate Form Data
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    issueDate: '',
    category: 'General',
    description: '',
    verificationUrl: '',
    skills: '',
    fileUrl: '',
    fileType: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Subscribe to certificates
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = subscribeToCertificates(
      (certs) => setCertificates(certs),
      (err) => console.error('Admin cert subscribe error:', err)
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      await login(email, password);
      setActiveTab('manage');
    } catch (err) {
      console.error('Login error:', err);
      setAuthError(err.message || 'Failed to authenticate admin.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Prepare Edit Mode
  const handleStartEdit = (cert) => {
    setEditingCertId(cert.id);
    setFormData({
      title: cert.title || '',
      organization: cert.organization || '',
      issueDate: cert.issueDate || '',
      category: cert.category || 'General',
      description: cert.description || '',
      verificationUrl: cert.verificationUrl || '',
      skills: Array.isArray(cert.skills) ? cert.skills.join(', ') : cert.skills || '',
      fileUrl: cert.fileUrl || '',
      fileType: cert.fileType || ''
    });
    setSelectedFile(null);
    setUploadProgress(0);
    setFormError('');
    setFormSuccess('');
    setActiveTab('form');
  };

  // Reset Form
  const resetForm = () => {
    setEditingCertId(null);
    setFormData({
      title: '',
      organization: '',
      issueDate: '',
      category: 'General',
      description: '',
      verificationUrl: '',
      skills: '',
      fileUrl: '',
      fileType: ''
    });
    setSelectedFile(null);
    setUploadProgress(0);
    setFormError('');
    setFormSuccess('');
  };

  // Handle Certificate Submit (Create or Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.organization.trim()) {
      setFormError('Certificate Title and Organization are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    setFormSuccess('');

    try {
      if (editingCertId) {
        await updateCertificate(
          editingCertId,
          formData,
          selectedFile,
          (progress) => setUploadProgress(progress)
        );
        setFormSuccess('Certificate updated successfully.');
      } else {
        await addCertificate(
          formData,
          selectedFile,
          (progress) => setUploadProgress(progress)
        );
        setFormSuccess('Certificate uploaded and published successfully.');
      }
      setTimeout(() => {
        resetForm();
        setActiveTab('manage');
      }, 1200);
    } catch (err) {
      console.error('Submit error:', err);
      setFormError(err.message || 'Failed to save certificate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Certificate
  const handleDeleteCert = async (cert) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${cert.title}"?`);
    if (!confirmDelete) return;

    try {
      await deleteCertificate(cert.id, cert.fileUrl);
    } catch (err) {
      alert('Error deleting certificate: ' + err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-container admin-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: currentUser ? 'rgba(16, 185, 129, 0.15)' : 'rgba(79, 140, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentUser ? '#34D399' : '#4F8CFF'
            }}>
              {currentUser ? <ShieldCheck size={18} /> : <Lock size={18} />}
            </div>
            <div>
              <h3 className="modal-title">
                {currentUser ? 'Admin Certificate Portal' : 'Admin Authentication'}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {currentUser ? `Authenticated: ${currentUser.email}` : 'Firebase Auth & Cloud Firestore'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {currentUser && (
              <button 
                onClick={logout} 
                className="btn btn-secondary btn-sm"
                title="Sign out of admin"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            )}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close Admin Modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation if Logged In */}
        {currentUser ? (
          <div className="admin-tabs">
            <button 
              className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}
              onClick={() => { resetForm(); setActiveTab('manage'); }}
            >
              <FolderOpen size={15} />
              <span>Certificates ({certificates.length})</span>
            </button>

            <button 
              className={`admin-tab ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => { resetForm(); setActiveTab('form'); }}
            >
              <Plus size={15} />
              <span>{editingCertId ? 'Edit Certificate' : 'Add New Certificate'}</span>
            </button>

            <button 
              className={`admin-tab ${activeTab === 'config' ? 'active' : ''}`}
              onClick={() => setActiveTab('config')}
            >
              <Database size={15} />
              <span>Firebase Status</span>
            </button>
          </div>
        ) : null}

        <div className="modal-body">
          {/* Unauthenticated View: Login Form */}
          {!currentUser ? (
            <div>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Authenticate to upload, update, and manage your verified credentials via Firebase Cloud Firestore & Storage.
                </p>

                {authError && (
                  <div style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#F87171',
                    fontSize: '0.86rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={16} />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="admin-email">Admin Email</label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={authLoading}
                  style={{ marginTop: '6px' }}
                >
                  <Lock size={15} />
                  <span>{authLoading ? 'Verifying Credentials...' : 'Sign In as Admin'}</span>
                </button>
              </form>

              {/* Firebase Status Helper */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    // FIREBASE CONFIGURATION STATUS
                  </span>
                  <span className={`status-badge ${isFirebaseConfigured ? 'status-connected' : 'status-missing'}`}>
                    {isFirebaseConfigured ? 'Firebase Connected' : 'Env Keys Missing (.env)'}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Add your Firebase project keys to <code>.env</code> (using <code>.env.example</code> as template) to connect your live Firebase Authentication, Cloud Firestore, and Firebase Storage.
                </p>
              </div>
            </div>
          ) : (
            /* Authenticated Views */
            <div>
              {/* TAB 1: MANAGE CERTIFICATES */}
              {activeTab === 'manage' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Published Credentials ({certificates.length})
                    </div>
                    <button 
                      onClick={() => { resetForm(); setActiveTab('form'); }} 
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={14} />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  {certificates.length === 0 ? (
                    <div style={{
                      padding: '36px 20px',
                      textAlign: 'center',
                      background: '#0E131C',
                      border: '1px dashed var(--border-subtle)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <FileText size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>No certificates added yet</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                        Click "Add Certificate" above to upload your first certificate image/PDF and save to Firestore.
                      </p>
                    </div>
                  ) : (
                    <div className="admin-cert-list">
                      {certificates.map((cert) => (
                        <div key={cert.id} className="admin-cert-row">
                          <div className="admin-cert-info">
                            <span className="admin-cert-title">{cert.title}</span>
                            <div className="admin-cert-meta">
                              <span>{cert.organization}</span>
                              <span>•</span>
                              <span>{cert.category}</span>
                              {cert.issueDate && (
                                <>
                                  <span>•</span>
                                  <span>{cert.issueDate}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="admin-cert-actions">
                            <button
                              onClick={() => handleStartEdit(cert)}
                              className="btn btn-secondary btn-sm"
                              title="Edit certificate details"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCert(cert)}
                              className="btn btn-danger btn-sm"
                              title="Delete certificate"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ADD / EDIT CERTIFICATE FORM */}
              {activeTab === 'form' && (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600 }}>
                      {editingCertId ? 'Edit Certificate Details' : 'Add New Certificate'}
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => { resetForm(); setActiveTab('manage'); }}
                      className="btn btn-secondary btn-sm"
                    >
                      Back to List
                    </button>
                  </div>

                  {formError && (
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#F87171',
                      fontSize: '0.86rem'
                    }}>
                      {formError}
                    </div>
                  )}

                  {formSuccess && (
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#34D399',
                      fontSize: '0.86rem'
                    }}>
                      {formSuccess}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Certificate Title *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Deep Learning Specialization"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Issuing Organization *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Coursera / DeepLearning.AI / Google"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Issue Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. August 2026"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        className="form-input"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="AI/ML">AI/ML</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Programming">Programming</option>
                        <option value="Cloud">Cloud & DevOps</option>
                        <option value="General">General Technical</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Verification / Credential URL</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://coursera.org/verify/..."
                      value={formData.verificationUrl}
                      onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Skills / Tags (Comma separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Python, Neural Networks, PyTorch"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description / Summary</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Summary of skills acquired and course content..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {/* Document Options: Direct Link OR File Upload */}
                  <div className="form-group">
                    <label className="form-label">Certificate Document Link / Image URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="e.g. Google Drive link, Imgur, GitHub raw link..."
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    />
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Optional: Paste a direct image/PDF URL or select a file below.
                    </span>
                  </div>

                  {/* File Upload Dropzone */}
                  <div className="form-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label className="form-label" style={{ margin: 0 }}>Upload Certificate Image (PNG/JPG/WEBP) or PDF</label>
                      <span className="badge badge-accent" style={{ fontSize: '0.72rem' }}>100% Free (No Paid Storage Needed)</span>
                    </div>

                    <label className="file-upload-dropzone" htmlFor="cert-file-input">
                      <Upload className="upload-icon" />
                      <span className="upload-text">
                        {selectedFile ? selectedFile.name : formData.fileUrl && formData.fileUrl.startsWith('data:') ? 'Current Image Attached (Click to replace)' : 'Click to select Certificate Image or PDF'}
                      </span>
                      <span className="upload-subtext">
                        Automatically compressed and stored directly into Cloud Firestore for free!
                      </span>
                      <input
                        id="cert-file-input"
                        type="file"
                        accept="image/*,application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                      />
                    </label>

                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="upload-progress-bar">
                        <div 
                          className="upload-progress-fill" 
                          style={{ width: `${uploadProgress}%` }} 
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => { resetForm(); setActiveTab('manage'); }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      <Check size={16} />
                      <span>{isSubmitting ? 'Saving...' : editingCertId ? 'Update Certificate' : 'Publish Certificate'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: FIREBASE DIAGNOSTICS & SETUP */}
              {activeTab === 'config' && (
                <div className="diag-panel">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>
                      Firebase Environment Integration
                    </h4>
                    <span className={`status-badge ${isFirebaseConfigured ? 'status-connected' : 'status-missing'}`}>
                      {isFirebaseConfigured ? 'Connected & Active' : 'Setup Required'}
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>API Key (VITE_FIREBASE_API_KEY)</span>
                    <span className={`status-badge ${firebaseConfigStatus.apiKey ? 'status-connected' : 'status-missing'}`}>
                      {firebaseConfigStatus.apiKey ? 'Configured' : 'Missing'}
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>Project ID (VITE_FIREBASE_PROJECT_ID)</span>
                    <span className={`status-badge ${firebaseConfigStatus.projectId ? 'status-connected' : 'status-missing'}`}>
                      {firebaseConfigStatus.projectId ? 'Configured' : 'Missing'}
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>Storage Bucket (VITE_FIREBASE_STORAGE_BUCKET)</span>
                    <span className={`status-badge ${firebaseConfigStatus.storageBucket ? 'status-connected' : 'status-missing'}`}>
                      {firebaseConfigStatus.storageBucket ? 'Configured' : 'Missing'}
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>App ID (VITE_FIREBASE_APP_ID)</span>
                    <span className={`status-badge ${firebaseConfigStatus.appId ? 'status-connected' : 'status-missing'}`}>
                      {firebaseConfigStatus.appId ? 'Configured' : 'Missing'}
                    </span>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <div className="detail-label" style={{ marginBottom: '6px' }}>Setup Instructions:</div>
                    <ol style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.6' }}>
                      <li>Create a Firebase Project at <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)' }}>console.firebase.google.com</a>.</li>
                      <li>Go to <strong>Authentication</strong> &rarr; Enable <strong>Email/Password</strong> provider &rarr; Add your admin user.</li>
                      <li>Go to <strong>Firestore Database</strong> &rarr; Create database. Apply rules from <code>firestore.rules</code>.</li>
                      <li>Go to <strong>Storage</strong> &rarr; Enable Storage bucket. Apply rules from <code>storage.rules</code>.</li>
                      <li>Copy your web app config into <code>.env</code> in the project root.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
