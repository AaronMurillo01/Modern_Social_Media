import { Message, Conversation } from '../types/message';
import { User } from '../types/auth';

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: "Hey! How's your project coming along?",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '1',
    content: "Are we still meeting tomorrow?",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false
  }
];

export async function getConversations(userId: string): Promise<Conversation[]> {
  // Group messages by conversation
  const conversations = mockMessages.reduce((acc: { [key: string]: Message[] }, message) => {
    const conversationId = [message.senderId, message.receiverId].sort().join('-');
    if (!acc[conversationId]) {
      acc[conversationId] = [];
    }
    acc[conversationId].push(message);
    return acc;
  }, {});

  return Object.entries(conversations).map(([id, messages]) => ({
    id,
    participants: id.split('-'),
    lastMessage: messages[messages.length - 1],
    unreadCount: messages.filter(m => m.receiverId === userId && !m.read).length
  }));
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const [user1, user2] = conversationId.split('-');
  return mockMessages.filter(m => 
    (m.senderId === user1 && m.receiverId === user2) ||
    (m.senderId === user2 && m.receiverId === user1)
  );
}

export async function sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'read'>): Promise<Message> {
  const newMessage: Message = {
    ...message,
    id: Date.now().toString(),
    timestamp: new Date(),
    read: false
  };
  mockMessages.push(newMessage);
  return newMessage;
}

export async function markAsRead(messageIds: string[]): Promise<void> {
  messageIds.forEach(id => {
    const message = mockMessages.find(m => m.id === id);
    if (message) {
      message.read = true;
    }
  });
}