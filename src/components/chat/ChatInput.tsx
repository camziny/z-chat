'use client';

import { useState, FormEvent, KeyboardEvent, useEffect, useRef } from 'react';
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
    "Which way is east?",
  ],
  'butters-stotch': [
    "Sing me a song, Butters",
    "What do you think about Cartman?"

  ],
  'dwight-schrute': [
    "How do you feel about Michael Scott?",
    "Who is the laziest person in the office?",
    "What's the best prank to play on Jim?",
    "What kind of car do you drive?",
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
  const [isMobile, setIsMobile] = useState(false);
  const mobileCheckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      if (mobileCheckRef.current) {
        const isVisible = window.getComputedStyle(mobileCheckRef.current).display !== 'none';
        setIsMobile(isVisible);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMobile) return;
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 sm:gap-2">
      <div ref={mobileCheckRef} className="block md:hidden h-0 w-0 p-0 m-0 overflow-hidden" aria-hidden="true" />
      <div className="flex items-center justify-between">
        {prompts.length > 0 && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 sm:h-7 text-[10px] sm:text-xs flex items-center gap-1 px-1.5 sm:px-2 text-zinc-400 hover:text-zinc-300"
              >
                <Lightbulb className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400/70" />
                <span className="hidden sm:inline">Suggested questions</span>
                <span className="sm:hidden">Suggested questions</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 p-1.5 sm:p-2 bg-zinc-900 border-zinc-700 rounded-lg shadow-xl"
              align="start"
              sideOffset={5}
            >
              <div className="grid grid-cols-1 gap-1">
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto py-1.5 px-2.5 justify-start text-left text-xs bg-transparent hover:bg-zinc-800 text-zinc-300 w-full rounded-md"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        {!isMobile && (
          <span className="text-[9px] sm:text-xs text-zinc-500 mr-1 sm:mr-2">
            Shift+Enter for new line
          </span>
        )}
      </div>
      
      <div className="relative">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[40px] sm:min-h-[60px] md:min-h-[80px] pr-10 sm:pr-12 resize-none rounded-xl bg-black border-zinc-800 focus-visible:ring-zinc-700 text-zinc-200 placeholder:text-zinc-500 text-xs sm:text-sm"
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          size="icon"
          className="absolute bottom-1.5 right-1.5 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-zinc-800 text-white shadow-md hover:bg-zinc-700 transition-all duration-300"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
          ) : (
            <SendIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </Button>
      </div>
    </form>
  );
} 