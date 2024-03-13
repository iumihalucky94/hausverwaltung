import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';



// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/assets/styles/global.scss';`,
                // additionalData: `@import '@/assets/styles/tailwind.css';`,
            },
        },
    },
    plugins: [vue()],
    server: {
        // host: '192.168.0.77',
        // port: 5173,
        proxy: {
            "/api": {
                // target: "http://hausverwaltung.immg.tech/",
                target: "http://localhost:3000/",
                changeOrigin: true,
                pathRewrite: { '^/api/': '' },
                secure: false,
            },
        },
    }
})
