import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';

export const ADMIN_EMAIL = 'jitendrachoudhary1401@gmail.com';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setCurrentUser(user);
          setAuthError(null);
        } else {
          // If any unauthorized user logs in, forcefully sign them out
          console.warn('Unauthorized user detected, signing out:', user.email);
          await signOut(auth);
          setCurrentUser(null);
          setAuthError(`Access restricted. Only the designated portfolio administrator (${ADMIN_EMAIL}) is permitted.`);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Auth state error:', error);
      setAuthError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase Authentication is not configured yet. Please configure your .env file with Firebase credentials.');
    }
    
    // Strict pre-check on email
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      const err = new Error(`Access Denied: Only the portfolio owner (${ADMIN_EMAIL}) is authorized to sign in to the Admin Panel.`);
      setAuthError(err.message);
      throw err;
    }

    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      if (user.email && user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth);
        throw new Error(`Unauthorized: ${user.email} is not authorized to edit this portfolio.`);
      }
      setCurrentUser(user);
      return user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isSoleAdmin = Boolean(
    currentUser && 
    currentUser.email && 
    currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  const value = {
    currentUser,
    isAdmin: isSoleAdmin,
    adminEmail: ADMIN_EMAIL,
    loading,
    authError,
    login,
    logout,
    isFirebaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

