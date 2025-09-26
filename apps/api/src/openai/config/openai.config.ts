import { registerAs } from '@nestjs/config';

export interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  defaultModel?: string;
  maxRetries?: number;
}

export default registerAs(
  'openai',
  (): OpenAIConfig => ({
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: process.env.OPENAI_BASE_URL,
    timeout: parseInt(process.env.OPENAI_TIMEOUT || '60000'),
    defaultModel: process.env.OPENAI_DEFAULT_MODEL || 'gpt-3.5-turbo',
    maxRetries: parseInt(process.env.OPENAI_MAX_RETRIES || '3'),
  }),
);
