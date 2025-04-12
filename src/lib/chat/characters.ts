import { Character } from './types';

export const characters: Character[] = [
  {
    id: 'patrick-star',
    name: 'Patrick Star',
    modelId: 'ft:gpt-4o-2024-08-06:personal:patrickbot:BLGm1okv',
    avatar: '/avatars/patrick-star.webp',
    description: 'Lovable starfish from Bikini Bottom',
  },
  {
    id: 'butters-stotch',
    name: 'Butters Leopold Stotch',
    modelId: 'ft:gpt-4o-2024-08-06:personal:buttersstotch:BLZeMbzP',
    avatar: '/avatars/butters-stotch.webp',
    description: 'Sweet, naive, and easily manipulated fourth-grader from South Park',
  },
  {
    id: 'dwight-schrute',
    name: 'Dwight Schrute',
    modelId: 'ft:gpt-4o-2024-08-06:personal:dwightschrute:BLZc7clI',
    avatar: '/avatars/dwight-schrute.png',
    description: 'Eccentric Assistant to the Regional Manager at Dunder Mifflin',
  },
  {
    id: 'ted-lasso',
    name: 'Ted Lasso',
    modelId: 'ft:gpt-4o-2024-08-06:personal:tedlasso:BLZe4B0K',
    avatar: '/avatars/ted-lasso.jpg',
    description: 'Optimistic American football coach turned English soccer manager',
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find(character => character.id === id);
} 