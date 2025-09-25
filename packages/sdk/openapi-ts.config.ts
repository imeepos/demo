import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'http://localhost:3000/api/openapi.json',
  output: 'src/generated',
  plugins: [
    {
      asClass: false,
      include: '^(?!.*(test|spec|mock)).*$',
      name: '@hey-api/typescript',
    },
    {
      asClass: false,
      name: '@hey-api/sdk',
    },
  ],
});
