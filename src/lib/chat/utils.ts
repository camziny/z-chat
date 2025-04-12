import { Message } from './types';

export function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export function createMessage(content: string, role: 'user' | 'assistant' | 'system', characterId: string): Message {
  return {
    id: generateId(),
    content,
    role,
    characterId,
    timestamp: new Date().toISOString(),
  };
}

export function saveChat(messages: Message[]) {
  try {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
}

export function loadChat(): Message[] {
  try {
    const saved = localStorage.getItem('chat-history');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
} 