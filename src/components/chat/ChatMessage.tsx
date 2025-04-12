'use client';

import { Message } from '@/lib/chat/types';
import { getCharacterById } from '@/lib/chat/characters';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: Message;
  onSuggestedQuestionClick?: (question: string) => void;
}

export function ChatMessage({ message, onSuggestedQuestionClick }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const character = message.role === 'assistant' ? getCharacterById(message.characterId) : null;
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  
  if (isSystem) {
    const content = message.content;
    if (content.startsWith('**Suggested questions:**')) {
      const questions = content.replace('**Suggested questions:**', '').trim().split('\n');
      
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center my-2 sm:my-3"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-md w-[85%] sm:w-auto sm:min-w-[300px] sm:max-w-[450px]">
            <div className="p-2 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-medium text-zinc-200">Suggested Questions</span>
              </div>
            </div>
            <div className="p-2">
              {questions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto w-full text-left justify-start py-1.5 px-2 text-xs hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md mb-1 last:mb-0"
                  onClick={() => onSuggestedQuestionClick?.(question)}
                >
                  {question.trim()}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4`}
    >
      <div className={`flex items-start gap-1.5 sm:gap-2 max-w-[90%] sm:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full overflow-hidden border border-zinc-800 ${!isUser && 'ring-1 ring-zinc-700'} flex items-center justify-center bg-zinc-900`}>
          {isUser ? (
            <img 
              src="/avatars/user.png" 
              alt="You"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f1f5f9"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.style.backgroundColor = "#1e293b";
                }
                e.currentTarget.style.objectFit = "contain";
                e.currentTarget.style.padding = "2px";
              }} 
            />
          ) : (
            <img 
              src={character?.avatar || ''} 
              alt={character?.name || 'Assistant'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${character?.name}`;
              }} 
            />
          )}
        </div>
        
        <div className="flex flex-col">
          <div 
            className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl shadow-sm ${
              isUser 
                ? 'bg-zinc-800 text-white rounded-tr-none' 
                : 'bg-black border border-zinc-800 text-zinc-100 rounded-tl-none'
            }`}
          >
            <p className="text-xs leading-relaxed">{message.content}</p>
          </div>
          <span className={`text-[9px] sm:text-[10px] text-zinc-500 mt-0.5 sm:mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {isUser ? 'You' : character?.name} • {formattedTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 