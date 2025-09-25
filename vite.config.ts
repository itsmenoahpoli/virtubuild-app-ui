import { defineConfig } from 'vite';
import { resolve } from 'path';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@/app/shared/utils/types'],
  },
});
