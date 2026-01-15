import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthResponse } from '../services/types';
import { authService } from '../services/DataRegistry';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, name: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await authService.signIn(email, password);
    if (response.user) {
      setUser(response.user);
    }
    return response;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const response = await authService.signUp(email, password, name);
    if (response.user) {
      setUser(response.user);
    }
    return response;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
