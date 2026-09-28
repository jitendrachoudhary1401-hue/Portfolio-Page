import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { compressImageToBase64 } from './certificateService';

const PROFILE_DOC = 'settings';
const PROFILE_SUB = 'profile';
const LOCAL_PROFILE_KEY = 'jitendra_portfolio_profile_photo';

export const getLocalProfilePhoto = () => {
  try {
    return localStorage.getItem(LOCAL_PROFILE_KEY) || '/profile.jpg';
  } catch {
    return '/profile.jpg';
  }
};

export const saveLocalProfilePhoto = (photoUrl) => {
  try {
    localStorage.setItem(LOCAL_PROFILE_KEY, photoUrl);
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
};

/**
 * Subscribes to live profile photo updates
 */
export const subscribeToProfilePhoto = (onUpdate) => {
  const localPhoto = getLocalProfilePhoto();
  onUpdate(localPhoto);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, PROFILE_DOC, PROFILE_SUB);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists() && docSnap.data().photoUrl) {
          const remoteUrl = docSnap.data().photoUrl;
          saveLocalProfilePhoto(remoteUrl);
          onUpdate(remoteUrl);
        }
      }, (err) => {
        console.warn('Profile photo subscribe warning:', err);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('Profile photo listener fallback:', err);
    }
  }

  const handleStorage = () => onUpdate(getLocalProfilePhoto());
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
};

/**
 * Updates profile photo directly into Firestore as compressed WebP (100% Free)
 */
export const updateProfilePhoto = async (fileOrUrl) => {
  let photoUrl = '';

  if (typeof fileOrUrl === 'string') {
    photoUrl = fileOrUrl;
  } else if (fileOrUrl instanceof File) {
    // Compress to lightweight WebP data URL
    photoUrl = await compressImageToBase64(fileOrUrl, 800, 0.85);
  }

  saveLocalProfilePhoto(photoUrl);
  window.dispatchEvent(new Event('storage'));

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, PROFILE_DOC, PROFILE_SUB);
    await setDoc(docRef, { photoUrl, updatedAt: new Date().toISOString() }, { merge: true });
  }

  return photoUrl;
};
