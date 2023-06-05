import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

type ViteConfigInput = { mode: string; command: string };

// https://vitejs.dev/config/
const viteConfig = (args: ViteConfigInput) => {
    const generateScopedName = args.mode === 'production' ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:4]';

    return defineConfig({
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname, './assets'),
                '@services': path.resolve(__dirname, './services'),
            },
        },
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName,
                hashPrefix: 'prefix',
            },
        },
        plugins: [react()],
    });
};

export default viteConfig;
