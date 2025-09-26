/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT?: string;
  readonly VITE_ENABLE_MOCK: string;
  readonly VITE_ENABLE_DEVTOOLS: string;
  readonly VITE_DEBUG_PERFORMANCE: string;
  readonly VITE_DEBUG_RENDERING: string;
  readonly VITE_ANALYTICS_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
