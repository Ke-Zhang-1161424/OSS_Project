// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    resolve: {
        // 关键：不管谁从哪儿 import，都折叠到同一份 React/ReactDOM
        dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
        // 明确预构建这些依赖，避免指错 React 实例
        include: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
    },
    server: {
        port: 3000,
        strictPort: true,
    },
});
