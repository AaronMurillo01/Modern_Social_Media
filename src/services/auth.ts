import { LoginCredentials, SignupCredentials, User, ProfileUpdateData } from '../types/auth';

const mockAuthDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  await mockAuthDelay();
  if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
    return {
      id: '1',
      email: credentials.email,
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Software developer and tech enthusiast',
      location: 'San Francisco, CA',
      website: 'https://example.com'
    };
  }
  throw new Error('Invalid credentials');
}

export async function signupUser(credentials: SignupCredentials): Promise<User> {
  await mockAuthDelay();
  return {
    id: Date.now().toString(),
    email: credentials.email,
    name: credentials.name,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
}

export async function updateUserProfile(userId: string, data: ProfileUpdateData): Promise<User> {
  await mockAuthDelay();
  return {
    id: userId,
    ...data,
    email: 'demo@example.com', // In a real app, this would come from the backend
    avatar: data.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  };
}