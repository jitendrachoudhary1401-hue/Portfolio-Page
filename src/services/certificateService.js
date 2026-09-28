import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';

const CERT_COLLECTION = 'certificates';
const LOCAL_STORAGE_KEY = 'jitendra_portfolio_certificates';

// Helper to get local fallback certificates
const getLocalCertificates = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalCertificates = (certs) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certs));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
};

/**
 * Compresses an image file in the browser using HTML5 Canvas
 * Produces a lightweight Base64 WebP/JPEG data URL (~40KB-120KB)
 * Fits easily into Cloud Firestore's 1MB document limit for 100% FREE storage!
 */
export const compressImageToBase64 = (file, maxDimension = 1200, quality = 0.78) => {
  return new Promise((resolve, reject) => {
    // If it's a PDF, read as Data URL directly
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP if supported, fallback to JPEG
        const dataUrl = canvas.toDataURL('image/webp', quality) || canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        // Fallback to raw data url
        resolve(event.target.result);
      };
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Subscribes to real-time certificate updates from Firestore (or local fallback).
 */
export const subscribeToCertificates = (onUpdate, onError) => {
  if (isFirebaseConfigured && db) {
    try {
      const certsQuery = query(
        collection(db, CERT_COLLECTION),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        certsQuery,
        (snapshot) => {
          const certs = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          onUpdate(certs);
        },
        (error) => {
          console.error('Firestore subscription error:', error);
          if (onError) onError(error);
          onUpdate(getLocalCertificates());
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('Firestore subscription fallback:', err);
      onUpdate(getLocalCertificates());
      return () => {};
    }
  } else {
    const local = getLocalCertificates();
    onUpdate(local);

    const handleStorageChange = () => {
      onUpdate(getLocalCertificates());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }
};

/**
 * Handles certificate document storage:
 * 1. If an image file is provided, compresses it to a lightweight data URL
 *    and saves directly into Firestore (100% FREE, no paid Firebase Storage bucket needed!).
 * 2. If user provides an external URL (Google Drive, GitHub, etc.), uses it directly.
 * 3. If Firebase Storage is available and working, optionally uploads there.
 */
export const processCertificateDocument = async (file, directUrl, onProgress) => {
  if (directUrl && directUrl.trim()) {
    return directUrl.trim();
  }

  if (!file) return '';

  if (onProgress) onProgress(30);

  // Compress image locally in browser to lightweight WebP data URL
  // This bypasses any need for paid Firebase Storage plans!
  try {
    const compressedDataUrl = await compressImageToBase64(file);
    if (onProgress) onProgress(100);
    return compressedDataUrl;
  } catch (err) {
    console.warn('Compression error, attempting fallback:', err);
    const rawDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    if (onProgress) onProgress(100);
    return rawDataUrl;
  }
};

/**
 * Adds a new certificate to Firestore (or local persistence).
 */
export const addCertificate = async (certificateData, file, onProgress) => {
  let fileUrl = certificateData.fileUrl || '';
  let fileType = '';

  if (file) {
    fileType = file.type;
    fileUrl = await processCertificateDocument(file, certificateData.fileUrl, onProgress);
  }

  const payload = {
    title: certificateData.title.trim(),
    organization: certificateData.organization.trim(),
    issueDate: certificateData.issueDate || '',
    category: certificateData.category || 'General',
    description: certificateData.description?.trim() || '',
    verificationUrl: certificateData.verificationUrl?.trim() || '',
    skills: Array.isArray(certificateData.skills)
      ? certificateData.skills
      : (certificateData.skills || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
    fileUrl,
    fileType,
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, CERT_COLLECTION), {
      ...payload,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...payload };
  } else {
    const local = getLocalCertificates();
    const newCert = {
      id: 'local_' + Date.now(),
      ...payload,
      createdAt: new Date().toISOString()
    };
    saveLocalCertificates([newCert, ...local]);
    window.dispatchEvent(new Event('storage'));
    return newCert;
  }
};

/**
 * Updates an existing certificate in Firestore.
 */
export const updateCertificate = async (id, certificateData, newFile, onProgress) => {
  let fileUrl = certificateData.fileUrl || '';
  let fileType = certificateData.fileType || '';

  if (newFile) {
    fileType = newFile.type;
    fileUrl = await processCertificateDocument(newFile, certificateData.fileUrl, onProgress);
  }

  const payload = {
    title: certificateData.title.trim(),
    organization: certificateData.organization.trim(),
    issueDate: certificateData.issueDate || '',
    category: certificateData.category || 'General',
    description: certificateData.description?.trim() || '',
    verificationUrl: certificateData.verificationUrl?.trim() || '',
    skills: Array.isArray(certificateData.skills)
      ? certificateData.skills
      : (certificateData.skills || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
    fileUrl,
    fileType,
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db && !id.startsWith('local_')) {
    const docRef = doc(db, CERT_COLLECTION, id);
    await updateDoc(docRef, payload);
    return { id, ...payload };
  } else {
    const local = getLocalCertificates();
    const updated = local.map((c) => (c.id === id ? { ...c, ...payload } : c));
    saveLocalCertificates(updated);
    window.dispatchEvent(new Event('storage'));
    return { id, ...payload };
  }
};

/**
 * Deletes a certificate.
 */
export const deleteCertificate = async (id, fileUrl) => {
  if (isFirebaseConfigured && storage && fileUrl && fileUrl.includes('firebasestorage.googleapis.com')) {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef).catch((e) => console.warn('File delete warning:', e));
    } catch (e) {
      console.warn('Storage delete warning:', e);
    }
  }

  if (isFirebaseConfigured && db && !id.startsWith('local_')) {
    const docRef = doc(db, CERT_COLLECTION, id);
    await deleteDoc(docRef);
  } else {
    const local = getLocalCertificates();
    const filtered = local.filter((c) => c.id !== id);
    saveLocalCertificates(filtered);
    window.dispatchEvent(new Event('storage'));
  }
};

/**
 * Submits a contact inquiry to Firestore 'contacts' collection.
 */
export const submitContactMessage = async ({ name, email, subject, message }) => {
  const contactData = {
    name: name.trim(),
    email: email.trim(),
    subject: (subject || 'Portfolio Inquiry').trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: serverTimestamp()
    });
  }
  return true;
};
