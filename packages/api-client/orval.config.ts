import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: process.env.API_URL || 'http://localhost:3001/api/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api',
      schemas: './src/types',
      client: 'axios',
      mock: false,
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/mutator.ts',
          name: 'customInstance',
        },
      },
      prettier: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});

