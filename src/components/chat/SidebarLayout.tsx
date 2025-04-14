'use client';

import { useState } from 'react';
import { Character } from '@/lib/chat/types';
import { characters } from '@/lib/chat/characters';
import { motion, AnimatePresence } from 'framer-motion';
import { getCharacterTheme } from '@/lib/chat/character-themes';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarLayoutProps {
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  children: React.ReactNode;
} 
const sidebarVariants = {
  expanded: {
    width: "280px",
    opacity: 1,
    x: 0,
    transition: {
      type: "tween", 
      duration: 0.15,
      ease: "easeOut",
      opacity: { duration: 0.1 }
    }
  },
  collapsed: {
    width: 0,
    opacity: 0,
    x: -10,
    transition: {
      type: "tween",
      duration: 0.15,
      ease: "easeIn",
      opacity: { duration: 0.05 }
    }
  }
};
const collapsedSidebarVariants = {
  expanded: {
    width: "4rem",
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.15,
      ease: "easeOut",
      opacity: { duration: 0.1 }
    }
  },
  collapsed: {
    width: 0,
    opacity: 0,
    x: -10,
    transition: {
      type: "tween",
      duration: 0.15,
      ease: "easeIn",
      opacity: { duration: 0.05 }
    }
  }
};

const characterItemVariants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index * 0.03,
      duration: 0.1
    }
  })
};

export function SidebarLayout({ 
  selectedCharacter, 
  onSelectCharacter, 
  children 
}: SidebarLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleDesktopSidebar = () => {
    setDesktopSidebarOpen(!desktopSidebarOpen);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
        {(mobileMenuOpen || desktopSidebarOpen) && (
          <motion.aside 
            key="fullSidebar"
            className={`fixed md:relative h-full z-30 bg-black border-r border-zinc-800 overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}
            variants={sidebarVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
          >
            <div className="w-[280px] h-full flex flex-col overflow-x-hidden">
              <div className="h-12 sm:h-14 px-3 sm:px-4 flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-medium text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-zinc-400">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                  Characters
                </h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleDesktopSidebar}
                    className="hidden md:flex hover:bg-zinc-900"
                    aria-label="Close sidebar"
                  >
                    <ChevronLeft className="h-5 w-5 text-zinc-400" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleMobileMenu}
                    className="md:hidden hover:bg-zinc-900 h-7 w-7 sm:h-8 sm:w-8"
                    aria-label="Close sidebar"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
                  </Button>
                </div>
              </div>
              
              <div 
                className="p-2 sm:p-3 pt-1 space-y-1.5 sm:space-y-2 overflow-y-auto overflow-x-hidden flex-1"
              >
                {characters.map((character, index) => {
                  const theme = getCharacterTheme(character.id);
                  const isSelected = selectedCharacter?.id === character.id;
                  
                  return (
                    <motion.div
                      key={character.id}
                      custom={index}
                      variants={characterItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <button
                        className={`w-full p-2 sm:p-3 flex items-center rounded-lg transition-all ${
                          isSelected 
                            ? 'bg-zinc-900 ring-1 ring-zinc-700' 
                            : 'hover:bg-zinc-900/50'
                        }`}
                        onClick={() => {
                          onSelectCharacter(character);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center flex-1">
                          <div className="relative">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-zinc-800 flex items-center justify-center bg-zinc-900">
                              <img 
                                src={character.avatar} 
                                alt={character.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${character.name}`;
                                }}
                              />
                            </div>
                            {isSelected && (
                              <div className={`absolute -bottom-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-r ${theme.primary} ring-1 ring-black`}></div>
                            )}
                          </div>
                          <div className="ml-3 text-left">
                            <div className="text-xs sm:text-sm font-medium text-white">{character.name}</div>
                            <div className="text-[10px] sm:text-xs text-zinc-400 line-clamp-1">{character.description}</div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
        
        {!desktopSidebarOpen && (
          <motion.aside 
            key="collapsedSidebar"
            className="hidden md:flex flex-col sticky top-0 h-full w-16 bg-black border-r border-zinc-800 z-20 flex-shrink-0 overflow-x-hidden"
            variants={collapsedSidebarVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
          >
            <div className="h-14 px-4 flex justify-center items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDesktopSidebar}
                className="hover:bg-zinc-900"
                aria-label="Open sidebar"
              >
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </Button>
            </div>
            
            <div className="flex-1 p-3 flex flex-col items-center gap-4 overflow-y-auto overflow-x-hidden">
              {characters.map((character) => {
                const theme = getCharacterTheme(character.id);
                const isSelected = selectedCharacter?.id === character.id;
                
                return (
                  <button
                    key={character.id}
                    className={`relative p-1 rounded-full transition-all ${
                      isSelected 
                        ? `ring-2 ring-offset-2 ring-offset-black ring-zinc-700` 
                        : 'hover:bg-zinc-900/50'
                    }`}
                    onClick={() => onSelectCharacter(character)}
                    title={character.name}
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-zinc-800 flex items-center justify-center bg-zinc-900">
                      <img 
                        src={character.avatar} 
                        alt={character.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${character.name}`;
                        }}
                      />
                    </div>
                    {isSelected && (
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r ${theme.primary} ring-1 ring-black`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col h-full relative">
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

        <AnimatePresence>
          {!mobileMenuOpen && (
            <motion.div
              className="absolute top-0 left-0 z-30 md:hidden h-12 sm:h-14 px-3 sm:px-4 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-zinc-900 h-7 w-7 sm:h-8 sm:w-8"
                onClick={toggleMobileMenu}
                aria-label="Open sidebar"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
} 