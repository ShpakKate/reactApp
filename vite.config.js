import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        svgr({ exportAsDefault: true }),
        react(),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
        ],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
    build: {
        target: 'es2015',
        // minify: false,
        // rollupOptions: {
        //     output: {
        //         interop: 'esModule',
        //     },
        //     manualChunks: (id, { getModuleInfo }) => {
        //         if (id.includes('node_modules')) {
        //             return `vendor.${id.split('node_modules/')[1].split('/')[0]}`;
        //         }
        //     },
        // },
    },
    esbuild: {
        target: 'es2015',
    },
});
