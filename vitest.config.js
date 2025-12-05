import { defineConfig } from 'vitest/config';

// Vitest configuration for unit testing
export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        exclude: ['node_modules/**', 'e2e/**', '*.config.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/**', 'tests/**', 'e2e/**', '*.config.js']
        }
    }
});
