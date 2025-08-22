// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    resolve: {
        // �ؼ�������˭���Ķ� import�����۵���ͬһ�� React/ReactDOM
        dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
        // ��ȷԤ������Щ����������ָ�� React ʵ��
        include: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
    },
    server: {
        port: 3000,
        strictPort: true,
    },
});
