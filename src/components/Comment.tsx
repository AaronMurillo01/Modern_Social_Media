import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CommentProps {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

export function Comment({ author, content, timestamp }: CommentProps) {
  return (
    <div className="flex space-x-3 py-3">
      <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg px-4 py-2">
          <div className="font-medium text-sm">{author.name}</div>
          <p className="text-sm text-gray-800">{content}</p>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {formatDistanceToNow(timestamp)} ago
        </div>
      </div>
    </div>
  );
}