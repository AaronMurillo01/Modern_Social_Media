import React, { useState } from 'react';
import { Image, Smile, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CreatePost() {
  const [content, setContent] = useState('');
  const { addPost } = useApp();

  const handlePost = () => {
    if (content.trim()) {
      addPost(content);
      setContent('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-none focus:ring-0 resize-none h-20 placeholder-gray-400"
          />
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                <Image size={20} />
                <span className="text-sm">Photo</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500">
                <Smile size={20} />
                <span className="text-sm">Feeling</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                <MapPin size={20} />
                <span className="text-sm">Location</span>
              </button>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePost}
              disabled={!content.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}