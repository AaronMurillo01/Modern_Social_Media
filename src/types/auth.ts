export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface ProfileUpdateData {
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
}