import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './', // This is crucial for offline use
  build: {
    // Ensure the output is compatible with older browsers just in case
    target: 'esnext',
    assetsInlineLimit: 100000000, // Try to inline everything
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false, // Don't split CSS
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: undefined,
      },
    },
  },
});