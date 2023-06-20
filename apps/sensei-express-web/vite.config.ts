import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import postcssNesting from 'postcss-nesting';

type ViteConfigInput = { mode: string; command: string };

// https://vitejs.dev/config/
const viteConfig = (args: ViteConfigInput) => {
    const generateScopedName = args.mode === 'production' ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:4]';

    return defineConfig({
        server: {
            port: 5050,
        },
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@components': path.resolve(__dirname, './src/components'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@providers': path.resolve(__dirname, './src/providers'),
                '@routes': path.resolve(__dirname, './src/routes'),
                '@lib': path.resolve(__dirname, './src/lib'),
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
