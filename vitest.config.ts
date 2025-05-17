import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        browser: {
            provider: 'playwright',
            enabled: true,
            instances: [{ browser: 'chromium' }],
        },
    },
    resolve: {
        alias: {
            '@components/': `${resolve(__dirname, 'src', 'components')}/`,
            '@data/': `${resolve(__dirname, 'electron', 'main', 'database')}/`,
        },
    },
});
