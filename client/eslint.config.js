// eslint.config.js (ESLint v9 flat config, React + TS + Vite，简化稳定版)
import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    // 1) JS 推荐规则
    js.configs.recommended,

    // 2) 针对 TS/TSX 源码
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['dist', 'node_modules'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                // 不启用 type-aware 解析，避免 "project" 带来的路径问题
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
    },

    // 3) 对配置/构建脚本等启用 Node 全局，避免 'process' 未定义
    {
        files: ['eslint.config.js', 'vite.config.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
    },
];
