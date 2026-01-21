/**
 * Auth Context för att hantera användarautentisering
 * OBS: Använder mock-data för MVP/demo. Byt till Firebase senare.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

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
    // Simulera laddning av användarsession
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // Mock signup - simulera delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date(),
    };

    setUser(newUser);
    console.log('Mock signup success:', newUser);
  };

  const signIn = async (email: string, password: string) => {
    // Mock signin - simulera delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: 'Demo User',
      createdAt: new Date(),
    };

    setUser(mockUser);
    console.log('Mock signin success:', mockUser);
  };

  const logout = async () => {
    // Mock logout - simulera delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    console.log('Mock logout success');
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;

    // Mock update - simulera delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({ ...user, ...data });
    console.log('Mock profile update success:', { ...user, ...data });
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
