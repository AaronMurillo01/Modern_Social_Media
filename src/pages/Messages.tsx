import React, { useState, useEffect, useMemo } from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { MessageList } from '../components/MessageList';
import { MessageInput } from '../components/MessageInput';
import { SearchInput } from '../components/SearchInput';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types/message';
import * as messageService from '../services/messages';
import { profiles } from '../data/profiles';

export function Messages() {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(profiles[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (currentUser) {
      messageService.getConversations(currentUser.id).then(setConversations);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && selectedUser) {
      const conversationId = [currentUser.id, selectedUser.id.toString()]
        .sort()
        .join('-');
      messageService.getMessages(conversationId).then(setMessages);
    }
  }, [currentUser, selectedUser]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSendMessage = async (content: string) => {
    if (!currentUser || !selectedUser) return;

    const newMessage = await messageService.sendMessage({
      senderId: currentUser.id,
      receiverId: selectedUser.id.toString(),
      content
    });

    setMessages(prev => [...prev, newMessage]);
  };

  if (!currentUser) return null;

  return (
    <div className="flex h-[calc(100vh-5rem)] -mt-6">
      {/* Contacts Sidebar */}
      <div className="w-full md:w-80 border-r bg-white overflow-y-auto">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Messages</h2>
          <div className="mb-4">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search contacts..."
            />
          </div>
          <div className="space-y-2">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => setSelectedUser(profile)}
                  className={`cursor-pointer rounded-lg transition-colors ${
                    selectedUser.id === profile.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <ProfileCard
                    avatar={profile.avatar}
                    name={profile.name}
                    subtitle="Click to view conversation"
                    timestamp="2m ago"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No contacts found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50">
        {selectedUser ? (
          <>
            <div className="border-b bg-white p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>
            </div>

            <MessageList
              messages={messages}
              currentUser={currentUser}
              otherUser={{
                id: selectedUser.id.toString(),
                name: selectedUser.name,
                avatar: selectedUser.avatar,
                email: ''
              }}
            />

            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}