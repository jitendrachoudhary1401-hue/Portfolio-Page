import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

// Check if Firebase credentials are fully configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your-api-key-here' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your-project-id'
);

export const firebaseConfigStatus = {
  apiKey: Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your-api-key-here'),
  authDomain: Boolean(firebaseConfig.authDomain && !firebaseConfig.authDomain.includes('your-project-id')),
  projectId: Boolean(firebaseConfig.projectId && firebaseConfig.projectId !== 'your-project-id'),
  storageBucket: Boolean(firebaseConfig.storageBucket && !firebaseConfig.storageBucket.includes('your-project-id')),
  appId: Boolean(firebaseConfig.appId && firebaseConfig.appId !== 'your-app-id'),
  isReady: isFirebaseConfigured
};

let app = null;
let auth = null;
let db = null;
let storage = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { app, auth, db, storage };
export default app;
