import { User } from './auth';

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: Date;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'message';
  user: User;
  read: boolean;
  timestamp: Date;
  content: string;
}