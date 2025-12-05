import { nextJsConfig } from '@workspace/eslint-config/next-js';

export default [
    ...nextJsConfig,
    {
        rules: {
            // Отключаем правило для App Router (в App Router шрифты загружаются через next/font/google в layout)
            '@next/next/no-page-custom-font': 'off',
        },
    },
];

