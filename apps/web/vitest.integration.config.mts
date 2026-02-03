import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts',
        include: ['**/*.integration.test.{ts,tsx}'],
        alias: {
            '@repo/ui/components/ui/button': path.resolve(__dirname, './testing/mocks/ui-components.tsx'),
            '@repo/ui/components/ui/form': path.resolve(__dirname, './testing/mocks/ui-components.tsx'),
            '@repo/ui/components/ui/input': path.resolve(__dirname, './testing/mocks/ui-components.tsx'),
            '@repo/ui/components/ui/use-toast': path.resolve(__dirname, './testing/mocks/ui-components.tsx'),
            '@repo/database/client/web': path.resolve(__dirname, './testing/mocks/ui-components.tsx'),
        },
    },
    define: {
        'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify('http://127.0.0.1:54321'),
        'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify('sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'),
    }
});
