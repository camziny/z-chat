'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { HelpCircle, Info } from 'lucide-react';

export function Instructions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-neutral-800 shadow-lg bg-neutral-900/90 backdrop-blur-sm">
        <CardHeader className="border-b border-neutral-800">
          <CardTitle className="flex items-center gap-2 text-white text-xl">
            <Info className="h-5 w-5 text-neutral-400" />
            How It Works
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Chat with your favorite tv characters
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-neutral-300 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-neutral-400" />
              Choose a Character
            </h3>
            <p className="text-sm text-neutral-400 pl-6">
              Select one of the available TV show characters above to start chatting with them. 
              Each character has their own unique personality and responses.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-neutral-400" />
              Available Characters
            </h3>
            <ul className="text-sm text-neutral-400 pl-6 space-y-1">
              <li><span className="text-neutral-200 font-medium">Patrick Star</span> - The lovable starfish from SpongeBob SquarePants</li>
              <li><span className="text-neutral-200 font-medium">Butters Stotch</span> - The innocent and naive boy from South Park</li>
              <li><span className="text-neutral-200 font-medium">Dwight Schrute</span> - Assistant (to the) Regional Manager from The Office</li>
              <li><span className="text-neutral-200 font-medium">Ted Lasso</span> - The optimistic coach from Ted Lasso</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-neutral-400" />
              Start Chatting
            </h3>
            <p className="text-sm text-neutral-400 pl-6">
              Type your message in the chat box and press Enter to send. The character
              will respond based on their personality and the context of your conversation.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 