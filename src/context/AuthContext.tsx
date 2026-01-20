/**
 * Auth Context för att hantera användarautentisering
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@services/firebase';
import { User } from '@types/index';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lyssna på autentiseringsändringar
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await loadUserData(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserData = async (firebaseUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        setUser({
          id: firebaseUser.uid,
          ...userDoc.data(),
        } as User);
      }
    } catch (error) {
      console.error('Kunde inte ladda användardata:', error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Uppdatera profil med namn
      await updateProfile(userCredential.user, { displayName: name });

      // Skapa användardokument i Firestore
      const newUser: User = {
        id: userCredential.user.uid,
        email,
        name,
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      setUser(newUser);
    } catch (error: any) {
      console.error('Registreringsfel:', error);
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await loadUserData(userCredential.user);
    } catch (error: any) {
      console.error('Inloggningsfel:', error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Utloggningsfel:', error);
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      await setDoc(doc(db, 'users', user.id), data, { merge: true });
      setUser({ ...user, ...data });
    } catch (error: any) {
      console.error('Kunde inte uppdatera profil:', error);
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth måste användas inom en AuthProvider');
  }
  return context;
};
