import { defineConfig } from 'orval';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/openapi.json';

export default defineConfig({
    api: {
        input: {
            target: API_URL,
            validation: false, // Отключаем валидацию для более устойчивой работы
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

