export type Character = {
  id: string;
  name: string;
  modelId: string;
  avatar: string;
  description: string;
};

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  characterId: string;
  timestamp: string;
}

export type ChatSession = {
  id: string;
  messages: Message[];
  characterId: string;
}; 