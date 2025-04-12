const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
};

export function validateConfig() {
  if (!config.openai.apiKey) {
    console.error('OPENAI_API_KEY is not set in environment variables');
    return false;
  }
  return true;
}

export default config; 