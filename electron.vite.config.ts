import { resolve } from 'path';

import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

const pathAlias = {
    '@components/': `${resolve(__dirname, 'src', 'components')}/`,
    '@data/': `${resolve(__dirname, 'electron', 'main', 'database')}/`,
};

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        // vite config options
        build: {
            outDir: 'dist/main',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'electron/main/main.ts'),
                },
            },
        },
        resolve: {
            alias: pathAlias,
        },
    },
    preload: {
        // vite config options
        plugins: [externalizeDepsPlugin()],
        build: {
            outDir: 'dist/preload',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'electron/preload/preload.ts'),
                },
            },
        },
    },
    renderer: {
        root: '.',
        // vite config options
        build: {
            outDir: 'dist/renderer',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'index.html'),
                },
            },
        },
        resolve: {
            alias: pathAlias,
        },
    },
});
