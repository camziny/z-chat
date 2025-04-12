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
          className="flex justify-center my-3 sm:my-4"
        >
          <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-2.5 sm:p-3 shadow-lg max-w-[95%] sm:max-w-[90%]">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-amber-400/80" />
              <span className="text-sm font-medium text-zinc-300">Suggested questions:</span>
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {questions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto py-1.5 sm:py-2 px-3 justify-start text-left text-xs sm:text-sm hover:bg-zinc-800 text-zinc-300 hover:text-white"
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
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6`}
    >
      <div className={`flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full overflow-hidden border border-zinc-800 ${!isUser && 'ring-1 ring-zinc-700'} flex items-center justify-center bg-zinc-900`}>
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
            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm ${
              isUser 
                ? 'bg-zinc-800 text-white rounded-tr-none' 
                : 'bg-black border border-zinc-800 text-zinc-100 rounded-tl-none'
            }`}
          >
            <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
          </div>
          <span className={`text-[10px] sm:text-xs text-zinc-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {isUser ? 'You' : character?.name} • {formattedTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 