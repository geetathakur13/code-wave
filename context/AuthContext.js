'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc, setDoc, getDoc, serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '@/lib/firebase';

// --- Local (offline) auth helpers ---------------------------------------
// When Firebase is not configured, keep the UX identical by persisting a
// tiny user database in localStorage. This is obviously not secure and is
// only for local development / demo use.
const LOCAL_USER_KEY = 'studyhouse_local_user';
const LOCAL_USERS_DB = 'studyhouse_local_users';

function loadLocalUsers() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(LOCAL_USERS_DB) || '{}'); }
  catch { return {}; }
}
function saveLocalUsers(u) {
  try { localStorage.setItem(LOCAL_USERS_DB, JSON.stringify(u)); } catch {}
}
function makeAuthError(code, message) {
  const err = new Error(message);
  err.code = code;
  return err;
}
// --------------------------------------------------------------------------

const AuthContext = createContext({
  user: null, loading: true,
  signUp: async () => {}, signIn: async () => {},
  signInWithGoogle: async () => {}, signOut: async () => {},
  resetPassword: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth state (Firebase) or load persisted local user.
  useEffect(() => {
    // --- Local / offline mode -----------------------------------------
    if (!isFirebaseConfigured || !auth) {
      try {
        const raw = localStorage.getItem(LOCAL_USER_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch {}
      setLoading(false);
      return;
    }

    // --- Firebase mode ------------------------------------------------
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) { setUser(null); setLoading(false); return; }
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid));
        if (snap.exists()) {
          setUser({ uid: fbUser.uid, ...snap.data() });
        } else {
          const profile = {
            name: fbUser.displayName || '',
            email: fbUser.email || '',
            photoURL: fbUser.photoURL || '',
            role: 'student',
            createdAt: serverTimestamp(),
          };
          await setDoc(doc(db, 'users', fbUser.uid), profile);
          setUser({ uid: fbUser.uid, ...profile });
        }
      } catch (e) {
        console.error('[StudyHouse] Firestore user profile error:', e);
        setUser({
          uid: fbUser.uid,
          name: fbUser.displayName || '',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || '',
          role: 'student',
        });
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Persist the locally-authenticated user across reloads.
  const setLocalUser = (u) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(u));
      else localStorage.removeItem(LOCAL_USER_KEY);
    } catch {}
  };

  // --- Public methods -------------------------------------------------
  const signUp = async (email, password, name) => {
    if (isFirebaseConfigured && auth && db) {
      const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(fbUser, { displayName: name });
      await setDoc(doc(db, 'users', fbUser.uid), {
        name, email, photoURL: '', role: 'student', createdAt: serverTimestamp(),
      });
      return;
    }
    // Local mode
    if (!email || !email.includes('@')) throw makeAuthError('auth/invalid-email', 'Please enter a valid email address.');
    if (!password || password.length < 6) throw makeAuthError('auth/weak-password', 'Password must be at least 6 characters.');
    const users = loadLocalUsers();
    if (users[email.toLowerCase()]) throw makeAuthError('auth/email-already-in-use', 'An account with this email already exists.');
    const profile = {
      uid: 'local-' + Math.random().toString(36).slice(2, 12),
      name: name || email.split('@')[0],
      email, photoURL: '', role: 'student',
      createdAt: Date.now(),
      _password: password, // stored locally for demo only
    };
    users[email.toLowerCase()] = profile;
    saveLocalUsers(users);
    const { _password, ...publicProfile } = profile;
    setLocalUser(publicProfile);
  };

  const signIn = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, password);
      return;
    }
    // Local mode
    const users = loadLocalUsers();
    const u = users[(email || '').toLowerCase()];
    if (!u || u._password !== password) {
      throw makeAuthError('auth/invalid-credential', 'Invalid email or password.');
    }
    const { _password, ...publicProfile } = u;
    setLocalUser(publicProfile);
  };

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider && db) {
      const { user: fbUser } = await signInWithPopup(auth, googleProvider);
      const snap = await getDoc(doc(db, 'users', fbUser.uid));
      if (!snap.exists()) {
        await setDoc(doc(db, 'users', fbUser.uid), {
          name: fbUser.displayName || '',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || '',
          role: 'student',
          createdAt: serverTimestamp(),
        });
      }
      return;
    }
    // Local mode: drop into a guest account
    const guest = {
      uid: 'local-guest-' + Math.random().toString(36).slice(2, 10),
      name: 'Guest User',
      email: 'guest@studyhouse.local',
      photoURL: '',
      role: 'student',
      createdAt: Date.now(),
    };
    setLocalUser(guest);
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
      return;
    }
    setLocalUser(null);
  };

  const resetPassword = async (email) => {
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
      return;
    }
    // Local mode: just verify the account exists; no real email to send.
    const users = loadLocalUsers();
    if (!users[(email || '').toLowerCase()]) {
      throw makeAuthError('auth/user-not-found', 'No account with this email.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
