import { useState, useCallback } from 'react';
import { Post } from '../types/post';
import { User } from '../types/auth';
import * as postService from '../services/posts';

export function usePosts(initialPosts: Post[] = []) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = useCallback(async (user: User, content: string, image?: string) => {
    const newPost = await postService.createPost(user, content, image);
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    await postService.deletePost(postId);
    setPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  const toggleLike = useCallback(async (userId: string, postId: string) => {
    await postService.togglePostLike(userId, postId);
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(userId);
        return {
          ...post,
          likes: hasLiked
            ? post.likes.filter(id => id !== userId)
            : [...post.likes, userId]
        };
      }
      return post;
    }));
  }, []);

  const addComment = useCallback(async (user: User, postId: string, content: string) => {
    const newComment = await postService.addComment(user, postId, content);
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
  }, []);

  return {
    posts,
    addPost,
    deletePost,
    toggleLike,
    addComment,
  };
}