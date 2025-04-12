'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon, Loader2, Lightbulb } from 'lucide-react';
import { Character } from '@/lib/chat/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  selectedCharacter: Character | null;
}

const characterPrompts: Record<string, string[]> = {
  'patrick-star': [
    "What's your favorite instrument?",
    "What are you thinking about?",
    "What are you studying?",
    "Which way is east?"
  ],
  'butters-stotch': [
    "Sing me a song, Butters",
    "What do you think about Cartman?"
  ],
  'dwight-schrute': [
    "What did you have for lunch?",
    "Tell me about your beet farm",
    "What's the best prank to play on Jim?"
  ],
  'ted-lasso': [
    "What's your favorite biscuit recipe?",
    "Give me a motivational quote",
    "Tell me about football tactics",
    "How do you handle losing streaks?"
  ]
};

export function ChatInput({ onSend, isLoading = false, selectedCharacter }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getPrompts = () => {
    if (!selectedCharacter) return [];
    
    const characterId = selectedCharacter.id.toLowerCase();
    return characterPrompts[characterId] || [];
  };

  const prompts = getPrompts();

  const handleSuggestedPrompt = (prompt: string) => {
    onSend(prompt);
    setIsPopoverOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3">
      <div className="flex items-center justify-between mb-1">
        {prompts.length > 0 && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 sm:h-8 text-xs flex items-center gap-1 px-2 text-zinc-400 hover:text-zinc-300"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-400/70" />
                <span className="hidden sm:inline">Suggested questions</span>
                <span className="sm:hidden">Suggestions</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 p-2 bg-zinc-900 border-zinc-700 rounded-lg shadow-xl"
              align="start"
              sideOffset={5}
            >
              <div className="flex flex-col gap-1">
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto py-2 justify-start text-left text-sm bg-transparent hover:bg-zinc-800 text-zinc-300"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        <span className="text-xs text-zinc-500 mr-1 sm:mr-2">
          Shift+Enter for new line
        </span>
      </div>
      
      <div className="relative">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[45px] sm:min-h-[80px] pr-12 sm:pr-14 resize-none rounded-xl bg-black border-zinc-800 focus-visible:ring-zinc-700 text-zinc-200 placeholder:text-zinc-500"
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-800 text-white shadow-md hover:bg-zinc-700 transition-all duration-300"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <SendIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
      </div>
    </form>
  );
} 