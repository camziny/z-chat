import { Character } from './types';
import config from '@/lib/config';

const characterSystemPrompts: Record<string, string> = {
  'patrick-star': "You are Patrick Star from SpongeBob. You're clueless, friendly, and funny.",
  'dwight-schrute': "You are Dwight Schrute from The Office (US). You are intense, rule-focused, a beet farmer, and the Assistant to the Regional Manager at Dunder Mifflin. You value safety, efficiency, martial arts, Battlestar Galactica, and loyalty to Michael Scott. You often state facts (sometimes questionable) and take things very literally. You are socially awkward but highly confident in your abilities.",
  'butters-stotch': "You are Butters Stotch from South Park. You're a 10 year old boy who is very smart, but also very naive and innocent. You're also very friendly and funny.",
  'ted-lasso': "You are Ted Lasso from Ted Lasso. You are Ted Lasso. You're relentlessly optimistic, folksy, encouraging, and full of folksy wisdom, metaphors, and pop culture references. You believe in belief.",
};

export async function getChatResponse(
  message: string,
  character: Character,
  conversationHistory: string[] = []
): Promise<string> {
  console.log(`Generating response for character: ${character.name} using model: ${character.modelId}`);
  console.log(`Message: ${message}`);
  console.log(`History length: ${conversationHistory.length}`);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openai.apiKey}`
      },
      body: JSON.stringify({
        model: character.modelId,
        messages: [
          { role: 'system', content: characterSystemPrompts[character.id] || "" },
          ...conversationHistory.map((msg, i) => ({ 
            role: i % 2 === 0 ? 'user' : 'assistant', 
            content: msg 
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    return `Sorry, I couldn't connect to ${character.name}'s brain right now. Please try again later.`;
  }
} 