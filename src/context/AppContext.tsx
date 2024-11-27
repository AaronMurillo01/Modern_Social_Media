import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: Date;
  likes: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'message';
  user: User;
  read: boolean;
  timestamp: Date;
  content: string;
}

interface AppContextType {
  currentUser: User;
  posts: Post[];
  notifications: Notification[];
  messages: number;
  addPost: (content: string, image?: string) => void;
  deletePost: (postId: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const currentUser: User = {
  id: 'current-user',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        id: 'sarah',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: 'Just finished a great hike in the mountains! The view was absolutely breathtaking. 🏔️',
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: [],
      comments: []
    },
    {
      id: '2',
      author: {
        id: 'alex',
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: "Just launched my new project! After months of hard work, it's finally live. Would love to hear your thoughts! 🚀",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: [],
      comments: []
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: {
        id: 'john',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      content: 'liked your post'
    },
    {
      id: '2',
      type: 'comment',
      user: {
        id: 'jane',
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      read: false,
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      content: 'commented on your post'
    }
  ]);

  const addPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      image,
      timestamp: new Date(),
      likes: [],
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(currentUser.id);
        const newLikes = hasLiked
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        
        if (!hasLiked) {
          setNotifications([{
            id: Date.now().toString(),
            type: 'like',
            user: currentUser,
            read: false,
            timestamp: new Date(),
            content: 'liked your post'
          }, ...notifications]);
        }
        
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: currentUser,
          content,
          timestamp: new Date()
        };
        
        setNotifications([{
          id: Date.now().toString(),
          type: 'comment',
          user: currentUser,
          read: false,
          timestamp: new Date(),
          content: 'commented on your post'
        }, ...notifications]);
        
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      posts,
      notifications,
      messages: 5,
      addPost,
      deletePost,
      toggleLike,
      addComment,
      markNotificationAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}