import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:3011/api/openapi.json',
  output: 'src/generated',
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/sdk',
      client: '@hey-api/client-axios',
    },
  ],
});
