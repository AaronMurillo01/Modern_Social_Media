import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from './Comment';
import { useApp } from '../context/AppContext';

interface PostProps {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: Date;
  likes: string[];
  comments: Array<{
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: Date;
  }>;
}

export function Post({ id, author, content, image, timestamp, likes, comments }: PostProps) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { currentUser, toggleLike, addComment, deletePost } = useApp();

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(id, commentText);
      setCommentText('');
    }
  };

  const hasLiked = likes.includes(currentUser.id);
  const isOwnPost = author.id === currentUser.id;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4 relative">
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Delete this post?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePost(id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
            <p className="text-sm text-gray-500">{formatDistanceToNow(timestamp)} ago</p>
          </div>
        </div>
        {isOwnPost ? (
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={20} />
          </button>
        )}
      </div>
      
      <p className="text-gray-800 mb-4">{content}</p>
      
      {image && (
        <div className="mb-4 -mx-4 md:mx-0">
          <img src={image} alt="Post content" className="w-full object-cover max-h-96 md:rounded-lg" />
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t">
        <button 
          className={`flex items-center space-x-2 ${
            hasLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
          onClick={() => toggleLike(id)}
        >
          <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
          <span>{likes.length}</span>
        </button>
        <button 
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
          onClick={() => setIsCommenting(!isCommenting)}
        >
          <MessageCircle size={20} />
          <span>{comments.length}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
          <Share2 size={20} />
        </button>
      </div>

      {isCommenting && (
        <div className="mt-4 border-t pt-4">
          <div className="flex space-x-3">
            <img
              src={currentUser.avatar}
              alt="Your avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 flex">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-100 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment();
                  }
                }}
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}