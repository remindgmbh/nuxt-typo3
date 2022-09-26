import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [Vue(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: [
            './test/setup-files/app',
            './test/setup-files/resize-observer',
        ],
    },
})
