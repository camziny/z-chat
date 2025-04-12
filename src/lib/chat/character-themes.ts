type CharacterTheme = {
  primary: string;
  secondary: string;
  accent: string;
};

export const characterThemes: Record<string, CharacterTheme> = {
  'patrick-star': {
    primary: 'from-pink-500/30 to-pink-600/30',
    secondary: 'bg-black',
    accent: 'border-pink-500/30',
  },
  'butters-stotch': {
    primary: 'from-amber-500/30 to-amber-600/30',
    secondary: 'bg-black',
    accent: 'border-amber-500/30',
  },
  'dwight-schrute': {
    primary: 'from-emerald-500/30 to-emerald-600/30',
    secondary: 'bg-black',
    accent: 'border-emerald-500/30',
  },
  'ted-lasso': {
    primary: 'from-blue-500/30 to-blue-600/30',
    secondary: 'bg-black',
    accent: 'border-blue-500/30',
  },
};

export function getCharacterTheme(characterId: string): CharacterTheme {
  return characterThemes[characterId] || {
    primary: 'from-zinc-500/30 to-zinc-600/30',
    secondary: 'bg-black',
    accent: 'border-zinc-400/30',
  };
} 