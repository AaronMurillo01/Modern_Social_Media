import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, LoginCredentials, SignupCredentials, User, ProfileUpdateData } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAuthDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await mockAuthDelay();
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          bio: 'Software developer and tech enthusiast',
          location: 'San Francisco, CA',
          website: 'https://example.com'
        };
        setState({ user, isAuthenticated: true, isLoading: false, error: null });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await mockAuthDelay();
      const user: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      };
      setState({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await mockAuthDelay();
      if (state.user) {
        const updatedUser: User = {
          ...state.user,
          ...data,
        };
        setState(prev => ({
          ...prev,
          user: updatedUser,
          isLoading: false,
          error: null,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}