import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  personalInfo as defaultPersonalInfo,
  initialProjects as defaultProjects,
  skillsData as defaultSkills,
  servicesData as defaultServices,
  statsData as defaultStats,
  faqData as defaultFaqs
} from '../data/initialData';

// LocalStorage Keys for instant zero-latency rendering
const KEYS = {
  PERSONAL_INFO: 'jitendra_portfolio_personal_info',
  PROJECTS: 'jitendra_portfolio_projects',
  SKILLS: 'jitendra_portfolio_skills',
  SERVICES: 'jitendra_portfolio_services',
  STATS: 'jitendra_portfolio_stats',
  FAQS: 'jitendra_portfolio_faqs'
};

const SETTINGS_COLL = 'settings';
const DOC_PERSONAL = 'personalInfo';
const DOC_PROJECTS = 'projectsData';
const DOC_SKILLS = 'skillsData';
const DOC_SERVICES = 'servicesData';
const DOC_STATS = 'statsData';
const DOC_FAQS = 'faqsData';

// Safe LocalStorage helpers
const readLocal = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`LocalStorage read failed for ${key}:`, err);
    return fallback;
  }
};

const writeLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('portfolio-data-updated'));
  } catch (err) {
    console.warn(`LocalStorage write failed for ${key}:`, err);
  }
};

// Initial getters
export const getInitialPortfolioData = () => ({
  personalInfo: readLocal(KEYS.PERSONAL_INFO, defaultPersonalInfo),
  projects: readLocal(KEYS.PROJECTS, defaultProjects),
  skills: readLocal(KEYS.SKILLS, defaultSkills),
  services: readLocal(KEYS.SERVICES, defaultServices),
  stats: readLocal(KEYS.STATS, defaultStats),
  faqs: readLocal(KEYS.FAQS, defaultFaqs)
});

/**
 * Subscribes to real-time Firestore portfolio updates with local fallback
 */
export const subscribeToPortfolioData = (onUpdate) => {
  // 1. Immediately emit latest cached data
  onUpdate(getInitialPortfolioData());

  if (!isFirebaseConfigured || !db) {
    const handleStorageChange = () => onUpdate(getInitialPortfolioData());
    window.addEventListener('portfolio-data-updated', handleStorageChange);
    return () => window.removeEventListener('portfolio-data-updated', handleStorageChange);
  }

  const unsubs = [];

  // Listen to personalInfo
  try {
    const unsubPersonal = onSnapshot(doc(db, SETTINGS_COLL, DOC_PERSONAL), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        writeLocal(KEYS.PERSONAL_INFO, data);
        onUpdate(getInitialPortfolioData());
      }
    }, (err) => console.warn('PersonalInfo snapshot error:', err));
    unsubs.push(unsubPersonal);
  } catch (e) {
    console.warn('Failed to listen to personalInfo:', e);
  }

  // Listen to projectsData
  try {
    const unsubProjects = onSnapshot(doc(db, SETTINGS_COLL, DOC_PROJECTS), (snap) => {
      if (snap.exists() && Array.isArray(snap.data().list)) {
        writeLocal(KEYS.PROJECTS, snap.data().list);
        onUpdate(getInitialPortfolioData());
      }
    }, (err) => console.warn('Projects snapshot error:', err));
    unsubs.push(unsubProjects);
  } catch (e) {
    console.warn('Failed to listen to projects:', e);
  }

  // Listen to skillsData
  try {
    const unsubSkills = onSnapshot(doc(db, SETTINGS_COLL, DOC_SKILLS), (snap) => {
      if (snap.exists() && Array.isArray(snap.data().list)) {
        writeLocal(KEYS.SKILLS, snap.data().list);
        onUpdate(getInitialPortfolioData());
      }
    }, (err) => console.warn('Skills snapshot error:', err));
    unsubs.push(unsubSkills);
  } catch (e) {
    console.warn('Failed to listen to skills:', e);
  }

  // Listen to servicesData
  try {
    const unsubServices = onSnapshot(doc(db, SETTINGS_COLL, DOC_SERVICES), (snap) => {
      if (snap.exists() && Array.isArray(snap.data().list)) {
        writeLocal(KEYS.SERVICES, snap.data().list);
        onUpdate(getInitialPortfolioData());
      }
    }, (err) => console.warn('Services snapshot error:', err));
    unsubs.push(unsubServices);
  } catch (e) {
    console.warn('Failed to listen to services:', e);
  }

  // Listen to statsData
  try {
    const unsubStats = onSnapshot(doc(db, SETTINGS_COLL, DOC_STATS), (snap) => {
      if (snap.exists() && Array.isArray(snap.data().list)) {
        writeLocal(KEYS.STATS, snap.data().list);
        onUpdate(getInitialPortfolioData());
      }
    }, (err) => console.warn('Stats snapshot error:', err));
    unsubs.push(unsubStats);
  } catch (e) {
    console.warn('Failed to listen to stats:', e);
  }

  // Listen to faqsData
  try {
    const unsubFaqs = onSnapshot(doc(db, SETTINGS_COLL, DOC_FAQS), (snap) => {
      if (snap.exists() && Array.isArray(snap.data().list)) {
        writeLocal(KEYS.FAQS, snap.data().list);
        onUpdate(getInitialPortfolioData());
      }
    }, (err) => console.warn('FAQs snapshot error:', err));
    unsubs.push(unsubFaqs);
  } catch (e) {
    console.warn('Failed to listen to faqs:', e);
  }

  return () => {
    unsubs.forEach((unsub) => {
      if (typeof unsub === 'function') unsub();
    });
  };
};

/**
 * Updates Personal & Hero information
 */
export const updatePersonalInfo = async (newInfo) => {
  writeLocal(KEYS.PERSONAL_INFO, newInfo);
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, SETTINGS_COLL, DOC_PERSONAL);
    await setDoc(docRef, { ...newInfo, updatedAt: new Date().toISOString() }, { merge: true });
  }
};

/**
 * Updates the entire projects list
 */
export const updateProjectsList = async (projects) => {
  writeLocal(KEYS.PROJECTS, projects);
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, SETTINGS_COLL, DOC_PROJECTS);
    await setDoc(docRef, { list: projects, updatedAt: new Date().toISOString() });
  }
};

/**
 * Adds or updates a single project
 */
export const saveProjectItem = async (projectData) => {
  const current = readLocal(KEYS.PROJECTS, defaultProjects);
  let updated;
  if (projectData.id) {
    const idx = current.findIndex((p) => p.id === projectData.id);
    if (idx !== -1) {
      updated = [...current];
      updated[idx] = { ...current[idx], ...projectData };
    } else {
      updated = [projectData, ...current];
    }
  } else {
    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    updated = [newProject, ...current];
  }
  await updateProjectsList(updated);
};

/**
 * Deletes a project
 */
export const deleteProjectItem = async (projectId) => {
  const current = readLocal(KEYS.PROJECTS, defaultProjects);
  const updated = current.filter((p) => p.id !== projectId);
  await updateProjectsList(updated);
};

/**
 * Updates Skills list
 */
export const updateSkillsList = async (skills) => {
  writeLocal(KEYS.SKILLS, skills);
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, SETTINGS_COLL, DOC_SKILLS);
    await setDoc(docRef, { list: skills, updatedAt: new Date().toISOString() });
  }
};

/**
 * Updates Services list
 */
export const updateServicesList = async (services) => {
  writeLocal(KEYS.SERVICES, services);
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, SETTINGS_COLL, DOC_SERVICES);
    await setDoc(docRef, { list: services, updatedAt: new Date().toISOString() });
  }
};

/**
 * Updates Stats list
 */
export const updateStatsList = async (stats) => {
  writeLocal(KEYS.STATS, stats);
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, SETTINGS_COLL, DOC_STATS);
    await setDoc(docRef, { list: stats, updatedAt: new Date().toISOString() });
  }
};

/**
 * Updates FAQs list
 */
export const updateFaqsList = async (faqs) => {
  writeLocal(KEYS.FAQS, faqs);
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, SETTINGS_COLL, DOC_FAQS);
    await setDoc(docRef, { list: faqs, updatedAt: new Date().toISOString() });
  }
};

/**
 * Reset all portfolio data to default initial data
 */
export const resetPortfolioToDefaults = async () => {
  writeLocal(KEYS.PERSONAL_INFO, defaultPersonalInfo);
  writeLocal(KEYS.PROJECTS, defaultProjects);
  writeLocal(KEYS.SKILLS, defaultSkills);
  writeLocal(KEYS.SERVICES, defaultServices);
  writeLocal(KEYS.STATS, defaultStats);
  writeLocal(KEYS.FAQS, defaultFaqs);

  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, SETTINGS_COLL, DOC_PERSONAL), defaultPersonalInfo);
    await setDoc(doc(db, SETTINGS_COLL, DOC_PROJECTS), { list: defaultProjects });
    await setDoc(doc(db, SETTINGS_COLL, DOC_SKILLS), { list: defaultSkills });
    await setDoc(doc(db, SETTINGS_COLL, DOC_SERVICES), { list: defaultServices });
    await setDoc(doc(db, SETTINGS_COLL, DOC_STATS), { list: defaultStats });
    await setDoc(doc(db, SETTINGS_COLL, DOC_FAQS), { list: defaultFaqs });
  }
};

/**
 * Real-time listener for incoming contact messages (Admin only)
 */
export const subscribeToContactMessages = (onMessages) => {
  if (!isFirebaseConfigured || !db) {
    onMessages([]);
    return () => {};
  }

  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      onMessages(msgs);
    }, (err) => {
      console.warn('Contact messages listener error:', err);
      onMessages([]);
    });
  } catch (err) {
    console.warn('Contact listener initialization error:', err);
    return () => {};
  }
};

/**
 * Delete a contact message (Admin only)
 */
export const deleteContactMessage = async (messageId) => {
  if (!isFirebaseConfigured || !db) return;
  const docRef = doc(db, 'contacts', messageId);
  await deleteDoc(docRef);
};
