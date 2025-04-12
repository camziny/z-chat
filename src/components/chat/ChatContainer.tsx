'use client';

import { useState, useEffect, useRef } from 'react';
import { Character, Message } from '@/lib/chat/types';
import { createMessage, loadChat, saveChat } from '@/lib/chat/utils';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getCharacterTheme } from '@/lib/chat/character-themes';
import { Sparkles } from 'lucide-react';
import { SidebarLayout } from './SidebarLayout';
import { characters } from '@/lib/chat/characters';

export function ChatContainer() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = loadChat();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      saveChat(messages);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    
    document.title = `${character.name} - Z Chat`;
    
    if (character) {
      const characterId = character.id.toLowerCase();
      const suggestedPrompts = getCharacterPrompts(characterId);
      
      const initialMessages = [
        createMessage(
          `Hi! I'm ${character.name}. What would you like to talk about?`,
          'assistant',
          character.id
        )
      ];
      
      if (suggestedPrompts.length > 0) {
        initialMessages.push(
          createMessage(
            `**Suggested questions:**\n${suggestedPrompts.join('\n')}`,
            'system',
            character.id
          )
        );
      }
      
      setMessages(initialMessages);
      
      setIsLoading(false);
    }
  };

  const getCharacterPrompts = (characterId: string): string[] => {
    const promptMap: Record<string, string[]> = {
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
    
    return promptMap[characterId] || [];
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedCharacter) return;

    const userMessage = createMessage(content, 'user', selectedCharacter.id);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => msg.content);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          characterId: selectedCharacter.id,
          history: history,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage = createMessage(
        data.response,
        'assistant',
        selectedCharacter.id
      );
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (selectedCharacter) {
      const characterId = selectedCharacter.id.toLowerCase();
      const suggestedPrompts = getCharacterPrompts(characterId);
      
      const initialMessages = [
        createMessage(
          `Hi! I'm ${selectedCharacter.name}. What would you like to talk about?`,
          'assistant',
          selectedCharacter.id
        )
      ];
      
      if (suggestedPrompts.length > 0) {
        initialMessages.push(
          createMessage(
            `**Suggested questions:**\n${suggestedPrompts.join('\n')}`,
            'system',
            selectedCharacter.id
          )
        );
      }
      
      setMessages(initialMessages);
    } else {
      setMessages([]);
    }
  };
  
  useEffect(() => {
    return () => {
      document.title = 'Z Chat';
    };
  }, []);

  return (
    <SidebarLayout
      selectedCharacter={selectedCharacter}
      onSelectCharacter={handleCharacterSelect}
    >
      <AnimatePresence>
        {selectedCharacter ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
          >
            {(() => {
              const theme = getCharacterTheme(selectedCharacter.id);
              return (
                <div className="flex flex-col h-full w-full">
                  <div className={`h-1 w-full bg-gradient-to-r ${theme.primary}`} />
                  
                  <div className="h-14 bg-black/95 backdrop-blur-sm border-b border-zinc-800 px-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-zinc-700 border border-zinc-800 flex-shrink-0 flex items-center justify-center bg-zinc-900">
                        <img 
                          src={selectedCharacter.avatar} 
                          alt={selectedCharacter.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${selectedCharacter.name}`;
                          }}
                        />
                      </div>
                      <span className="text-white font-medium">{selectedCharacter.name}</span>
                    </div>
                    
                    <div className="flex-1 flex justify-end">
                      {messages.length > 0 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleClearChat}
                          className={`rounded-md flex-shrink-0 h-8 py-0 text-xs bg-black/90 backdrop-blur-sm border ${theme.accent} text-zinc-200 hover:bg-zinc-900 hover:text-white transition-all duration-200 shadow-md flex items-center gap-1`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 min-w-[14px]">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Clear</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-black">
                    {messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-center text-zinc-500">
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        {messages.map((message) => (
                          <ChatMessage 
                            key={message.id} 
                            message={message} 
                            onSuggestedQuestionClick={handleSendMessage}
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-zinc-800 p-2 sm:p-3 bg-black">
                    <ChatInput 
                      onSend={handleSendMessage} 
                      isLoading={isLoading}
                      selectedCharacter={selectedCharacter} 
                    />
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col bg-black overflow-y-auto"
          >
            <div className="h-14 px-4 border-b border-zinc-800 flex items-center justify-center">
              <h3 className="text-lg font-medium text-white">Choose a Character</h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center p-4 sm:p-6 pb-8 sm:pb-12 md:pb-16">
              <div className="text-center max-w-md mb-6 sm:mb-8 pt-4">
                <Sparkles className="h-10 sm:h-12 w-10 sm:w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-6">
                  Select any character below to start a conversation
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl mb-8 sm:mb-12 md:mb-16">
                {characters.map((character) => {
                  const theme = getCharacterTheme(character.id);
                  
                  return (
                    <motion.div
                      key={character.id}
                      whileHover={{ scale: 1.03, translateY: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-zinc-950 border border-zinc-800/50 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:border-zinc-700/50 transition-all flex flex-col"
                      onClick={() => handleCharacterSelect(character)}
                    >
                      <div className={`h-2 w-full bg-gradient-to-r ${theme.primary}`} />
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full overflow-hidden border border-zinc-800/80 bg-black flex-shrink-0 ring-2 ring-zinc-900">
                            <img
                              src={character.avatar}
                              alt={character.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${character.name}`;
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white text-lg">{character.name}</h3>
                            <div className={`h-1 w-12 mt-1 rounded-full bg-gradient-to-r ${theme.primary}`} />
                          </div>
                        </div>
                        
                        <div className="mt-4 pb-2 flex-1">
                          <p className="text-zinc-300 text-sm">{character.description}</p>
                        </div>
                        
                        <div className="mt-auto">
                          <button className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 text-white hover:bg-opacity-80 transition-colors flex items-center justify-center gap-2`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                              <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                            </svg>
                            Chat Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarLayout>
  );
} 