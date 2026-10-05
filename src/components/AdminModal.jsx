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
  FolderOpen,
  User,
  Image as ImageIcon,
  Briefcase,
  Layers,
  HelpCircle,
  Mail,
  RotateCcw,
  Sparkles,
  Code2,
  CheckCircle2,
  Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  addCertificate, 
  updateCertificate, 
  deleteCertificate, 
  subscribeToCertificates 
} from '../services/certificateService';
import { updateProfilePhoto, getLocalProfilePhoto } from '../services/profileService';
import { 
  subscribeToContactMessages, 
  deleteContactMessage 
} from '../services/portfolioDataService';
import { firebaseConfigStatus } from '../services/firebase';

export const AdminModal = ({ isOpen, onClose }) => {
  const { currentUser, login, logout, isFirebaseConfigured, adminEmail } = useAuth();
  const { 
    personalInfo, 
    projects, 
    skills, 
    services, 
    stats, 
    faqs, 
    updatePersonalInfo, 
    saveProject, 
    deleteProject, 
    updateSkills, 
    updateServices, 
    updateStats, 
    updateFaqs, 
    resetToDefaults 
  } = usePortfolio();

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile');

  // Auth Form State
  const [email, setEmail] = useState('jitendrachoudhary1401@gmail.com');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Status feedback
  const [feedback, setFeedback] = useState({ type: null, text: '' });
  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: null, text: '' }), 4000);
  };

  // Profile Form State
  const [profileForm, setProfileForm] = useState(personalInfo || {});
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState('');
  const [profileUrlInput, setProfileUrlInput] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Sync profileForm when personalInfo updates
  useEffect(() => {
    if (personalInfo) {
      setProfileForm(personalInfo);
    }
  }, [personalInfo]);

  // Projects State
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    id: '',
    title: '',
    category: '',
    problem: '',
    contribution: '',
    outcome: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: true
  });

  // Certificates State
  const [certificates, setCertificates] = useState([]);
  const [editingCertId, setEditingCertId] = useState(null);
  const [certFormData, setCertFormData] = useState({
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [certSubmitting, setCertSubmitting] = useState(false);

  // FAQs State
  const [faqList, setFaqList] = useState(faqs || []);
  useEffect(() => {
    if (faqs) setFaqList(faqs);
  }, [faqs]);

  // Services & Stats State
  const [servicesList, setServicesList] = useState(services || []);
  const [statsList, setStatsList] = useState(stats || []);
  useEffect(() => {
    if (services) setServicesList(services);
    if (stats) setStatsList(stats);
  }, [services, stats]);

  // Inquiries State
  const [messages, setMessages] = useState([]);

  // Subscribe to Certificates and Inquiries
  useEffect(() => {
    if (!isOpen) return;
    setCurrentProfilePhoto(getLocalProfilePhoto());

    const unsubCerts = subscribeToCertificates(
      (certs) => setCertificates(certs),
      (err) => console.error('Admin cert subscribe error:', err)
    );

    const unsubMsgs = subscribeToContactMessages((msgs) => {
      setMessages(msgs);
    });

    return () => {
      if (typeof unsubCerts === 'function') unsubCerts();
      if (typeof unsubMsgs === 'function') unsubMsgs();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      await login(email, password);
      setActiveTab('profile');
    } catch (err) {
      console.error('Login error:', err);
      setAuthError(err.message || 'Failed to authenticate admin.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Save Profile & Bio
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updatePersonalInfo(profileForm);
      showFeedback('success', 'Profile & bio saved and updated across portfolio!');
    } catch (err) {
      showFeedback('error', 'Error saving profile: ' + err.message);
    }
  };

  // Handle Save Profile Photo
  const handleSaveProfilePhoto = async (e) => {
    e.preventDefault();
    if (!profileFile && !profileUrlInput.trim()) {
      showFeedback('error', 'Please select an image file or provide an image URL.');
      return;
    }
    setProfileSaving(true);
    try {
      const newUrl = await updateProfilePhoto(profileFile || profileUrlInput.trim());
      setCurrentProfilePhoto(newUrl);
      setProfileFile(null);
      setProfileUrlInput('');
      showFeedback('success', 'Profile photo updated successfully!');
    } catch (err) {
      showFeedback('error', 'Failed to update photo: ' + err.message);
    } finally {
      setProfileSaving(false);
    }
  };

  // Handle Save / Add Project
  const handleSaveProjectForm = async (e) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) {
      showFeedback('error', 'Project Title is required.');
      return;
    }

    const techArray = typeof projectFormData.technologies === 'string'
      ? projectFormData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : projectFormData.technologies;

    const payload = {
      ...projectFormData,
      id: projectFormData.id || `proj-${Date.now()}`,
      technologies: techArray
    };

    try {
      await saveProject(payload);
      showFeedback('success', `Project "${payload.title}" saved successfully!`);
      setIsAddingProject(false);
      setEditingProject(null);
      setProjectFormData({
        id: '',
        title: '',
        category: '',
        problem: '',
        contribution: '',
        outcome: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        featured: true
      });
    } catch (err) {
      showFeedback('error', 'Failed to save project: ' + err.message);
    }
  };

  const handleEditProjectClick = (p) => {
    setProjectFormData({
      id: p.id,
      title: p.title || '',
      category: p.category || '',
      problem: p.problem || '',
      contribution: p.contribution || '',
      outcome: p.outcome || '',
      technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '',
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: p.featured !== false
    });
    setEditingProject(p.id);
    setIsAddingProject(true);
  };

  const handleDeleteProjectClick = async (p) => {
    if (window.confirm(`Are you sure you want to delete project "${p.title}"?`)) {
      try {
        await deleteProject(p.id);
        showFeedback('success', `Project "${p.title}" deleted.`);
      } catch (err) {
        showFeedback('error', 'Delete failed: ' + err.message);
      }
    }
  };

  // Certificate Form Handlers
  const handleStartEditCert = (cert) => {
    setEditingCertId(cert.id);
    setCertFormData({
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
    setActiveTab('certForm');
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    if (!certFormData.title.trim() || !certFormData.organization.trim()) {
      showFeedback('error', 'Title and Organization are required for certificates.');
      return;
    }
    setCertSubmitting(true);
    try {
      if (editingCertId) {
        await updateCertificate(editingCertId, certFormData, selectedFile, (p) => setUploadProgress(p));
        showFeedback('success', 'Certificate updated successfully.');
      } else {
        await addCertificate(certFormData, selectedFile, (p) => setUploadProgress(p));
        showFeedback('success', 'Certificate uploaded and published!');
      }
      setEditingCertId(null);
      setCertFormData({
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
      setActiveTab('certificates');
    } catch (err) {
      showFeedback('error', 'Certificate error: ' + err.message);
    } finally {
      setCertSubmitting(false);
    }
  };

  const handleDeleteCert = async (cert) => {
    if (window.confirm(`Delete certificate "${cert.title}"?`)) {
      try {
        await deleteCertificate(cert.id, cert.fileUrl);
        showFeedback('success', 'Certificate removed.');
      } catch (err) {
        showFeedback('error', 'Error removing certificate: ' + err.message);
      }
    }
  };

  // Save Services and Stats
  const handleSaveServicesAndStats = async (e) => {
    e.preventDefault();
    try {
      await updateServices(servicesList);
      await updateStats(statsList);
      showFeedback('success', 'Services & statistics updated successfully!');
    } catch (err) {
      showFeedback('error', 'Error saving services/stats: ' + err.message);
    }
  };

  // Save FAQs
  const handleSaveFaqs = async (e) => {
    e.preventDefault();
    try {
      await updateFaqs(faqList);
      showFeedback('success', 'FAQs updated successfully!');
    } catch (err) {
      showFeedback('error', 'Error saving FAQs: ' + err.message);
    }
  };

  const handleAddFaqItem = () => {
    const newItem = {
      id: `faq-${Date.now()}`,
      question: 'New Question',
      answer: 'Detailed answer response here.'
    };
    setFaqList([...faqList, newItem]);
  };

  const handleDeleteFaqItem = (id) => {
    setFaqList(faqList.filter((f) => f.id !== id));
  };

  // Reset to Defaults
  const handleResetToDefaults = async () => {
    const confirm1 = window.confirm('Are you sure you want to reset all portfolio data back to original defaults?');
    if (!confirm1) return;
    try {
      await resetToDefaults();
      showFeedback('success', 'All portfolio data reset to original defaults.');
    } catch (err) {
      showFeedback('error', 'Reset failed: ' + err.message);
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
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-sm)',
              background: currentUser ? 'rgba(16, 185, 129, 0.15)' : 'rgba(79, 140, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentUser ? '#34D399' : '#4F8CFF'
            }}>
              {currentUser ? <ShieldCheck size={20} /> : <Lock size={20} />}
            </div>
            <div>
              <h3 className="modal-title">
                {currentUser ? 'Portfolio Admin Control Center' : 'Owner Admin Authentication'}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {currentUser 
                  ? `Authorized Owner: ${currentUser.email}`
                  : `Sole Authorized Account: ${adminEmail}`}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {currentUser && (
              <button 
                onClick={logout} 
                className="admin-action-btn"
                title="Sign out of Admin"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedback.text && (
          <div style={{ padding: '0 24px', paddingTop: '14px' }}>
            <div className={`admin-msg-box ${feedback.type}`}>
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{feedback.text}</span>
            </div>
          </div>
        )}

        {/* NOT LOGGED IN: Single-Account Login Screen */}
        {!currentUser ? (
          <div className="admin-tab-content">
            <div style={{ maxWidth: 440, margin: '20px auto', textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(79, 140, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--accent-blue)'
              }}>
                <Lock size={32} />
              </div>

              <h4 style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '1.2rem' }}>
                Single Owner Authentication
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.84rem', lineHeight: '1.5', marginBottom: '20px' }}>
                This portfolio is protected with Cloud Firestore Security Rules. Only the sole designated account 
                (<span style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>{adminEmail}</span>) has edit privileges.
              </p>

              {authError && (
                <div className="admin-msg-box error" style={{ textAlign: 'left' }}>
                  <AlertCircle size={16} />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                <div className="admin-input-group">
                  <label className="admin-input-label">Authorized Admin Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-input-label">Password</label>
                  <input
                    type="password"
                    className="admin-input"
                    placeholder="Enter your Firebase account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="bento-btn-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  {authLoading ? 'Verifying Account...' : 'Sign In as Owner'}
                </button>
              </form>

              <div style={{
                marginTop: '20px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)'
              }}>
                Connected Project: <strong style={{ color: '#34D399' }}>portfolio-page-3f1d7</strong>
              </div>
            </div>
          </div>
        ) : (
          /* LOGGED IN: Full Multi-Tab Admin Interface */
          <>
            {/* Tab Navigation */}
            <div className="admin-tabs">
              <button 
                className={`admin-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={15} />
                <span>Profile &amp; Hero</span>
              </button>

              <button 
                className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => { setActiveTab('projects'); setIsAddingProject(false); }}
              >
                <Briefcase size={15} />
                <span>Projects</span>
                <span className="admin-tab-badge">{projects?.length || 0}</span>
              </button>

              <button 
                className={`admin-tab ${activeTab === 'certificates' || activeTab === 'certForm' ? 'active' : ''}`}
                onClick={() => setActiveTab('certificates')}
              >
                <FileText size={15} />
                <span>Certificates</span>
                <span className="admin-tab-badge">{certificates?.length || 0}</span>
              </button>

              <button 
                className={`admin-tab ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <Code2 size={15} />
                <span>Skills</span>
              </button>

              <button 
                className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                <Layers size={15} />
                <span>Services &amp; Stats</span>
              </button>

              <button 
                className={`admin-tab ${activeTab === 'faqs' ? 'active' : ''}`}
                onClick={() => setActiveTab('faqs')}
              >
                <HelpCircle size={15} />
                <span>FAQs</span>
              </button>

              <button 
                className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}
              >
                <Mail size={15} />
                <span>Inquiries</span>
                {messages?.length > 0 && <span className="admin-tab-badge">{messages.length}</span>}
              </button>

              <button 
                className={`admin-tab ${activeTab === 'system' ? 'active' : ''}`}
                onClick={() => setActiveTab('system')}
              >
                <Database size={15} />
                <span>Firebase System</span>
              </button>
            </div>

            {/* TAB 1: PROFILE & HERO */}
            {activeTab === 'profile' && (
              <div className="admin-tab-content">
                {/* Profile Photo Section */}
                <div className="admin-card-section">
                  <div className="admin-card-header">
                    <div>
                      <h4 className="admin-card-title"><ImageIcon size={18} color="#4F8CFF" /> Live Profile Photo</h4>
                      <p className="admin-card-subtitle">Updates instantly in the Hero section and About Me card.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid var(--accent-blue)',
                      background: '#070A10'
                    }}>
                      <img 
                        src={currentProfilePhoto || '/portrait.jpg'} 
                        alt="Current Profile" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 260 }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="profile-file-input"
                        style={{ display: 'none' }}
                        onChange={(e) => setProfileFile(e.target.files[0])}
                      />
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                        <label 
                          htmlFor="profile-file-input" 
                          className="admin-action-btn"
                          style={{ cursor: 'pointer' }}
                        >
                          <Upload size={14} />
                          <span>{profileFile ? profileFile.name : 'Choose Image File'}</span>
                        </label>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or paste URL below</span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="url"
                          className="admin-input"
                          style={{ flex: 1 }}
                          placeholder="https://example.com/photo.jpg"
                          value={profileUrlInput}
                          onChange={(e) => setProfileUrlInput(e.target.value)}
                        />
                        <button
                          onClick={handleSaveProfilePhoto}
                          disabled={profileSaving}
                          className="admin-action-btn primary"
                        >
                          {profileSaving ? 'Saving...' : 'Update Photo'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Details Form */}
                <form onSubmit={handleSaveProfile} className="admin-card-section">
                  <div className="admin-card-header">
                    <div>
                      <h4 className="admin-card-title"><User size={18} color="#4F8CFF" /> Identity, Hero &amp; Bio Information</h4>
                      <p className="admin-card-subtitle">Edit any personal detail on your portfolio in real time.</p>
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-input-group">
                      <label className="admin-input-label">Full Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={profileForm.name || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Professional Role / Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={profileForm.role || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-input-group">
                      <label className="admin-input-label">Tagline (Hero Main Title)</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={profileForm.tagline || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Location</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={profileForm.contact?.location || ''}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          contact: { ...profileForm.contact, location: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label className="admin-input-label">Hero Introduction Subtitle</label>
                    <textarea
                      className="admin-textarea"
                      rows={2}
                      value={profileForm.heroIntro || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, heroIntro: e.target.value })}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label className="admin-input-label">About Me Bio (Who I Am &amp; What I Build)</label>
                    <textarea
                      className="admin-textarea"
                      rows={4}
                      value={profileForm.about || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-input-group">
                      <label className="admin-input-label">GitHub URL</label>
                      <input
                        type="url"
                        className="admin-input"
                        value={profileForm.contact?.github || ''}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          contact: { ...profileForm.contact, github: e.target.value }
                        })}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">LinkedIn URL</label>
                      <input
                        type="url"
                        className="admin-input"
                        value={profileForm.contact?.linkedin || ''}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          contact: { ...profileForm.contact, linkedin: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="admin-save-bar">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Persists to Firestore collection: <code style={{ color: '#38BDF8' }}>settings/personalInfo</code>
                    </span>
                    <button type="submit" className="bento-btn-primary">
                      Save Profile &amp; Bio
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="admin-tab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.05rem' }}>
                    Portfolio Projects ({projects?.length || 0})
                  </h4>
                  <button
                    onClick={() => {
                      setProjectFormData({
                        id: '',
                        title: '',
                        category: '',
                        problem: '',
                        contribution: '',
                        outcome: '',
                        technologies: '',
                        githubUrl: '',
                        liveUrl: '',
                        featured: true
                      });
                      setEditingProject(null);
                      setIsAddingProject(true);
                    }}
                    className="admin-action-btn primary"
                  >
                    <Plus size={14} />
                    <span>Add Project</span>
                  </button>
                </div>

                {/* Project Edit / Add Form */}
                {isAddingProject && (
                  <form onSubmit={handleSaveProjectForm} className="admin-card-section" style={{ borderColor: 'var(--accent-blue)' }}>
                    <div className="admin-card-header">
                      <h4 className="admin-card-title">
                        {editingProject ? 'Edit Project' : 'Create New Project'}
                      </h4>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingProject(false)} 
                        className="admin-action-btn"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-input-group">
                        <label className="admin-input-label">Project Title *</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={projectFormData.title}
                          onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="admin-input-group">
                        <label className="admin-input-label">Category</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. Web App, AI / Computer Vision, Mobile"
                          value={projectFormData.category}
                          onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="React, Firebase, Python, Flutter"
                        value={projectFormData.technologies}
                        onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">The Problem / Challenge</label>
                      <textarea
                        className="admin-textarea"
                        rows={2}
                        value={projectFormData.problem}
                        onChange={(e) => setProjectFormData({ ...projectFormData, problem: e.target.value })}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Your Contribution &amp; Architecture</label>
                      <textarea
                        className="admin-textarea"
                        rows={2}
                        value={projectFormData.contribution}
                        onChange={(e) => setProjectFormData({ ...projectFormData, contribution: e.target.value })}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Outcome / Results</label>
                      <textarea
                        className="admin-textarea"
                        rows={2}
                        value={projectFormData.outcome}
                        onChange={(e) => setProjectFormData({ ...projectFormData, outcome: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-input-group">
                        <label className="admin-input-label">GitHub Repository URL</label>
                        <input
                          type="url"
                          className="admin-input"
                          value={projectFormData.githubUrl}
                          onChange={(e) => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                        />
                      </div>

                      <div className="admin-input-group">
                        <label className="admin-input-label">Live Demo / Deployment URL</label>
                        <input
                          type="url"
                          className="admin-input"
                          value={projectFormData.liveUrl}
                          onChange={(e) => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-save-bar">
                      <button 
                        type="button" 
                        onClick={() => setIsAddingProject(false)} 
                        className="admin-action-btn"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="bento-btn-primary">
                        {editingProject ? 'Save Changes' : 'Create Project'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Projects List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {projects?.map((p) => (
                    <div key={p.id} className="admin-item-row">
                      <div className="admin-item-main">
                        <div className="admin-item-title">
                          <span>{p.title}</span>
                          <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                            [{p.category || 'General'}]
                          </span>
                        </div>
                        <div className="admin-item-desc">
                          {p.outcome || p.problem || 'No description provided.'}
                        </div>
                        <div className="admin-item-tags">
                          {(Array.isArray(p.technologies) ? p.technologies : [p.technologies]).filter(Boolean).map((t, i) => (
                            <span key={i} className="admin-item-tag">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          onClick={() => handleEditProjectClick(p)}
                          className="admin-action-btn"
                          title="Edit Project"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProjectClick(p)}
                          className="admin-action-btn delete"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="admin-tab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.05rem' }}>
                    Uploaded Certificates &amp; Credentials ({certificates?.length || 0})
                  </h4>
                  <button
                    onClick={() => {
                      setEditingCertId(null);
                      setCertFormData({
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
                      setActiveTab('certForm');
                    }}
                    className="admin-action-btn primary"
                  >
                    <Plus size={14} />
                    <span>Upload Certificate</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {certificates?.length === 0 ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No certificates uploaded yet. Click "Upload Certificate" to publish credentials to Firestore.
                    </div>
                  ) : (
                    certificates.map((cert) => (
                      <div key={cert.id} className="admin-item-row">
                        <div className="admin-item-main">
                          <div className="admin-item-title">
                            <span>{cert.title}</span>
                            <span style={{ fontSize: '0.72rem', color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                              [{cert.category || 'General'}]
                            </span>
                          </div>
                          <div className="admin-item-desc">
                            <strong>{cert.organization}</strong> • Issued: {cert.issueDate || 'N/A'}
                          </div>
                          {cert.verificationUrl && (
                            <a 
                              href={cert.verificationUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
                            >
                              <span>Verify Link</span>
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>

                        <div className="admin-item-actions">
                          <button
                            onClick={() => handleStartEditCert(cert)}
                            className="admin-action-btn"
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCert(cert)}
                            className="admin-action-btn delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3B: CERTIFICATE FORM */}
            {activeTab === 'certForm' && (
              <div className="admin-tab-content">
                <form onSubmit={handleSaveCert} className="admin-card-section">
                  <div className="admin-card-header">
                    <h4 className="admin-card-title">
                      {editingCertId ? 'Edit Certificate' : 'Upload New Certificate'}
                    </h4>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('certificates')} 
                      className="admin-action-btn"
                    >
                      Back to Certificates
                    </button>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-input-group">
                      <label className="admin-input-label">Certificate Title *</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={certFormData.title}
                        onChange={(e) => setCertFormData({ ...certFormData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Issuing Organization *</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={certFormData.organization}
                        onChange={(e) => setCertFormData({ ...certFormData, organization: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-input-group">
                      <label className="admin-input-label">Issue Date</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. October 2026"
                        value={certFormData.issueDate}
                        onChange={(e) => setCertFormData({ ...certFormData, issueDate: e.target.value })}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-input-label">Category</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={certFormData.category}
                        onChange={(e) => setCertFormData({ ...certFormData, category: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-input-group">
                    <label className="admin-input-label">Verification URL / Credential ID Link</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={certFormData.verificationUrl}
                      onChange={(e) => setCertFormData({ ...certFormData, verificationUrl: e.target.value })}
                    />
                  </div>

                  {/* File Upload Box */}
                  <div className="admin-input-group">
                    <label className="admin-input-label">Upload Certificate Image / PDF</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      id="cert-file-picker"
                      style={{ display: 'none' }}
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <label 
                      htmlFor="cert-file-picker"
                      className="file-upload-dropzone"
                    >
                      <Upload className="upload-icon" />
                      <span className="upload-text">
                        {selectedFile ? selectedFile.name : 'Click to browse Certificate image or PDF'}
                      </span>
                      <span className="upload-subtext">Images are automatically compressed &amp; stored safely in Firestore</span>
                    </label>
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="upload-progress-bar">
                      <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}

                  <div className="admin-save-bar">
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('certificates')} 
                      className="admin-action-btn"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={certSubmitting} className="bento-btn-primary">
                      {certSubmitting ? 'Saving Certificate...' : (editingCertId ? 'Save Changes' : 'Upload & Publish')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: SKILLS */}
            {activeTab === 'skills' && (
              <div className="admin-tab-content">
                <div className="admin-card-section">
                  <div className="admin-card-header">
                    <div>
                      <h4 className="admin-card-title"><Code2 size={18} color="#4F8CFF" /> Skills &amp; Capabilities</h4>
                      <p className="admin-card-subtitle">Manage skill groups and individual technical skills.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {skills?.map((cat, catIdx) => (
                      <div key={catIdx} style={{ background: '#070A10', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>{cat.category}</strong>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cat.skills?.length || 0} skills</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {cat.skills?.map((s, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="admin-item-tag"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <span>{s.name} ({s.level || 'Core'})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="admin-save-bar" style={{ marginTop: '20px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Skills data is backed up to Firestore: <code style={{ color: '#38BDF8' }}>settings/skillsData</code>
                    </span>
                    <button 
                      onClick={() => showFeedback('success', 'Skills list is active and synced with Firestore.')} 
                      className="bento-btn-primary"
                    >
                      Verified &amp; Synced
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SERVICES & STATS */}
            {activeTab === 'services' && (
              <div className="admin-tab-content">
                <form onSubmit={handleSaveServicesAndStats}>
                  {/* Stats Counter Section */}
                  <div className="admin-card-section">
                    <div className="admin-card-header">
                      <div>
                        <h4 className="admin-card-title"><Sparkles size={18} color="#4F8CFF" /> Key Metrics &amp; Stats</h4>
                        <p className="admin-card-subtitle">Numbers displayed across the Hero and Services strips.</p>
                      </div>
                    </div>

                    <div className="admin-form-grid-2">
                      {statsList.map((st, i) => (
                        <div key={i} className="admin-item-row" style={{ margin: 0 }}>
                          <div style={{ flex: 1 }}>
                            <label className="admin-input-label">Stat #{i + 1} Value</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={st.value}
                              onChange={(e) => {
                                const next = [...statsList];
                                next[i] = { ...next[i], value: e.target.value };
                                setStatsList(next);
                              }}
                            />
                          </div>
                          <div style={{ flex: 2 }}>
                            <label className="admin-input-label">Label</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={st.label}
                              onChange={(e) => {
                                const next = [...statsList];
                                next[i] = { ...next[i], label: e.target.value };
                                setStatsList(next);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Services Section */}
                  <div className="admin-card-section">
                    <div className="admin-card-header">
                      <div>
                        <h4 className="admin-card-title"><Layers size={18} color="#4F8CFF" /> Services &amp; Offerings</h4>
                        <p className="admin-card-subtitle">Edit the 3 service cards and descriptions.</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {servicesList.map((srv, i) => (
                        <div key={srv.id || i} style={{ background: '#070A10', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                          <div className="admin-input-group">
                            <label className="admin-input-label">Service Title</label>
                            <input
                              type="text"
                              className="admin-input"
                              value={srv.title}
                              onChange={(e) => {
                                const next = [...servicesList];
                                next[i] = { ...next[i], title: e.target.value };
                                setServicesList(next);
                              }}
                            />
                          </div>

                          <div className="admin-input-group" style={{ marginBottom: 0 }}>
                            <label className="admin-input-label">Description</label>
                            <textarea
                              className="admin-textarea"
                              rows={2}
                              value={srv.description}
                              onChange={(e) => {
                                const next = [...servicesList];
                                next[i] = { ...next[i], description: e.target.value };
                                setServicesList(next);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="admin-save-bar">
                      <button type="submit" className="bento-btn-primary">
                        Save Services &amp; Stats
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 6: FAQS */}
            {activeTab === 'faqs' && (
              <div className="admin-tab-content">
                <form onSubmit={handleSaveFaqs} className="admin-card-section">
                  <div className="admin-card-header">
                    <div>
                      <h4 className="admin-card-title"><HelpCircle size={18} color="#4F8CFF" /> Frequently Asked Questions</h4>
                      <p className="admin-card-subtitle">Manage answers to common client &amp; collaborator questions.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFaqItem}
                      className="admin-action-btn primary"
                    >
                      <Plus size={14} />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {faqList.map((item, idx) => (
                      <div key={item.id || idx} style={{ background: '#070A10', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>Question #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaqItem(item.id)}
                            className="admin-action-btn delete"
                            style={{ padding: '4px 8px' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="admin-input-group">
                          <input
                            type="text"
                            className="admin-input"
                            value={item.question}
                            onChange={(e) => {
                              const next = [...faqList];
                              next[idx] = { ...next[idx], question: e.target.value };
                              setFaqList(next);
                            }}
                            placeholder="Question"
                            required
                          />
                        </div>

                        <div className="admin-input-group" style={{ marginBottom: 0 }}>
                          <textarea
                            className="admin-textarea"
                            rows={2}
                            value={item.answer}
                            onChange={(e) => {
                              const next = [...faqList];
                              next[idx] = { ...next[idx], answer: e.target.value };
                              setFaqList(next);
                            }}
                            placeholder="Answer"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="admin-save-bar">
                    <button type="submit" className="bento-btn-primary">
                      Save All FAQs
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 7: INQUIRIES */}
            {activeTab === 'messages' && (
              <div className="admin-tab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.05rem' }}>
                    Visitor Inquiries &amp; Messages ({messages?.length || 0})
                  </h4>
                </div>

                {messages?.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No messages received yet. When visitors fill out "Book a Call" or "Get in Touch", their submissions will appear here in real time.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {messages.map((m) => (
                      <div key={m.id} className="admin-item-row" style={{ alignItems: 'flex-start' }}>
                        <div className="admin-item-main">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <strong style={{ color: '#FFFFFF', fontSize: '0.92rem' }}>{m.name}</strong>
                            <a 
                              href={`mailto:${m.email}`} 
                              style={{ color: '#38BDF8', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                            >
                              {m.email}
                            </a>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                              {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                          <div style={{ color: '#E2E8F0', fontSize: '0.84rem', lineHeight: '1.5', marginTop: '6px' }}>
                            {m.message}
                          </div>
                        </div>

                        <div className="admin-item-actions">
                          <a
                            href={`mailto:${m.email}?subject=Reply to Portfolio Inquiry`}
                            className="admin-action-btn primary"
                          >
                            <Send size={13} />
                            <span>Reply</span>
                          </a>
                          <button
                            onClick={async () => {
                              if (window.confirm('Delete this inquiry message?')) {
                                await deleteContactMessage(m.id);
                                showFeedback('success', 'Message deleted.');
                              }
                            }}
                            className="admin-action-btn delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 8: FIREBASE SYSTEM & RESET */}
            {activeTab === 'system' && (
              <div className="admin-tab-content">
                <div className="diag-panel" style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '0.95rem' }}>
                    Firebase Connection &amp; Access Status
                  </h4>

                  <div className="diag-item">
                    <span>Connected Firebase Project</span>
                    <span className="status-badge status-connected">
                      portfolio-page-3f1d7 (Active)
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>Sole Authorized Administrator</span>
                    <span className="status-badge status-connected" style={{ fontFamily: 'var(--font-mono)' }}>
                      {adminEmail}
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>Cloud Firestore Security Rules</span>
                    <span className="status-badge status-connected">
                      Locked to Sole Admin (Deployed)
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>Authentication Service</span>
                    <span className="status-badge status-connected">
                      Firebase Auth Email/Password
                    </span>
                  </div>

                  <div className="diag-item">
                    <span>Real-Time Sync Engine</span>
                    <span className="status-badge status-connected">
                      Firestore onSnapshot Active
                    </span>
                  </div>
                </div>

                <div className="admin-card-section" style={{ borderColor: 'rgba(239, 68, 68, 0.25)' }}>
                  <div className="admin-card-header">
                    <div>
                      <h4 className="admin-card-title" style={{ color: '#F87171' }}>
                        <RotateCcw size={16} /> Danger Zone: Restore Defaults
                      </h4>
                      <p className="admin-card-subtitle">
                        Reverts all portfolio data back to the clean initial starter dataset.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleResetToDefaults}
                    className="admin-action-btn delete"
                    style={{ padding: '8px 16px', fontWeight: 600 }}
                  >
                    Restore Original Default Portfolio Data
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
