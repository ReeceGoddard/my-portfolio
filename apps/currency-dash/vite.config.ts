import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import postcssNesting from 'postcss-nesting';

type ViteConfigInput = { mode: string; command: string };

// https://vitejs.dev/config/
const viteConfig = (args: ViteConfigInput) => {
    const generateScopedName = args.mode === 'production' ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:4]';

    return defineConfig({
        plugins: [react()],
        server: {
            watch: {
                usePolling: true,
            },
            host: true,
            strictPort: true,
            port: 5173,
        },
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
            postcss: {
                plugins: [postcssNesting],
            },
        },
    });
};

export default viteConfig;
