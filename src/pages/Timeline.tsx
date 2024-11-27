import React from 'react';
import { CreatePost } from '../components/CreatePost';
import { Post } from '../components/Post';
import { useApp } from '../context/AppContext';

export function Timeline() {
  const { posts } = useApp();
  
  return (
    <div className="space-y-6">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}