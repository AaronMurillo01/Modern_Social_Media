import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}