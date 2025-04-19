import { resolve } from 'path';

import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

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
    },
});
