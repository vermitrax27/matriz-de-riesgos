import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: `assets/entry.js`,
        chunkFileNames: `assets/entry-chunk.js`,
        // Esta es la versión correcta y única de assetFileNames
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/entry.css';
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
    },
  },
})