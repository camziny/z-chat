'use client';

import { Character } from '@/lib/chat/types';
import { characters } from '@/lib/chat/characters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { getCharacterTheme } from '@/lib/chat/character-themes';

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
  selectedId?: string;
}

export function CharacterSelect({ onSelect, selectedId }: CharacterSelectProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {characters.map((character, index) => {
        const theme = getCharacterTheme(character.id);
        return (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 h-full bg-neutral-900 backdrop-blur hover:bg-neutral-800 border-neutral-800 ${
                selectedId === character.id 
                  ? `ring-2 ring-offset-1 ring-offset-neutral-900 shadow-lg scale-[1.02]` 
                  : 'hover:scale-[1.02]'
              }`}
              onClick={() => onSelect(character)}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${theme.primary} rounded-t-lg`} />
              <CardHeader className="flex flex-col items-center pb-2 pt-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-800 ring-1 ring-neutral-700 flex items-center justify-center bg-neutral-850 mb-3">
                  <img 
                    src={character.avatar} 
                    alt={character.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${character.name}`;
                    }}
                  />
                </div>
                <div className="text-center">
                  <CardTitle className="text-lg text-white">{character.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm text-neutral-400">{character.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
} 