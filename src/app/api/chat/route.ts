import { NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/chat/model-service';
import { getCharacterById } from '@/lib/chat/characters';
import { validateConfig } from '@/lib/config';

export async function POST(request: Request) {
  try {
    if (!validateConfig()) {
      return NextResponse.json(
        { error: 'API configuration is incomplete. Please check environment variables.' },
        { status: 500 }
      );
    }

    const { message, characterId, history = [] } = await request.json();

    if (!message || !characterId) {
      return NextResponse.json(
        { error: 'Message and character ID are required' },
        { status: 400 }
      );
    }

    const character = getCharacterById(characterId);
    
    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    const response = await getChatResponse(message, character, history);

    return NextResponse.json({ response, character });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to process chat request', details: errorMessage },
      { status: 500 }
    );
  }
} 