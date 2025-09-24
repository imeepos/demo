export interface User {
  id: string;
  name: string;
  email: string;
}

export type Theme = 'light' | 'dark';

export interface AppConfig {
  theme: Theme;
  apiUrl: string;
}
