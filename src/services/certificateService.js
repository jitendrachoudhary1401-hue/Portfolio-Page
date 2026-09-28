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
 * Subscribes to real-time certificate updates from Firestore (or local fallback).
 * @param {Function} onUpdate Callback function with updated array of certificates
 * @param {Function} onError Error callback
 * @returns {Function} Unsubscribe function
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
          // Fallback to local storage on error
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
    // When Firebase credentials are not yet entered in .env, use local fallback
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
 * Uploads a certificate file (Image or PDF) to Firebase Storage with progress tracking.
 * @param {File} file The file to upload
 * @param {Function} onProgress Progress callback (0-100)
 * @returns {Promise<string>} Download URL of the uploaded file
 */
export const uploadCertificateFile = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!isFirebaseConfigured || !storage) {
      // In local mode without Firebase, create an object URL or base64
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `certificates/${Date.now()}_${safeName}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('Storage upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

/**
 * Adds a new certificate to Firestore (or local persistence).
 */
export const addCertificate = async (certificateData, file, onProgress) => {
  let fileUrl = certificateData.fileUrl || '';
  let fileType = '';

  if (file) {
    fileType = file.type;
    fileUrl = await uploadCertificateFile(file, onProgress);
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
    fileUrl = await uploadCertificateFile(newFile, onProgress);
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
 * Deletes a certificate and its associated storage asset if available.
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
