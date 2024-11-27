import React from 'react';
import { format } from 'date-fns';
import { Message } from '../types/message';
import { User } from '../types/auth';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
}

export function MessageList({ messages, currentUser, otherUser }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === currentUser.id;
        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[75%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <img
                src={isOwnMessage ? currentUser.avatar : otherUser.avatar}
                alt={isOwnMessage ? currentUser.name : otherUser.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div
                className={`rounded-lg px-4 py-2 ${
                  isOwnMessage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                  {format(message.timestamp, 'HH:mm')}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}