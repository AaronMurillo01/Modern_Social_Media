import { Post, Comment } from '../types/post';
import { User } from '../types/auth';

export async function createPost(user: User, content: string, image?: string): Promise<Post> {
  return {
    id: Date.now().toString(),
    author: user,
    content,
    image,
    timestamp: new Date(),
    likes: [],
    comments: []
  };
}

export async function deletePost(postId: string): Promise<void> {
  // In a real app, this would make an API call
  return Promise.resolve();
}

export async function addComment(user: User, postId: string, content: string): Promise<Comment> {
  return {
    id: Date.now().toString(),
    author: user,
    content,
    timestamp: new Date()
  };
}

export async function togglePostLike(userId: string, postId: string): Promise<void> {
  // In a real app, this would make an API call
  return Promise.resolve();
}