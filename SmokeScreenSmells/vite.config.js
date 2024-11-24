import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    include: ['@square/web-sdk']  // Ensure @square/web-sdk is included in the optimization
  },
  
  build: {
    commonjsOptions: {
      include: [/node_modules/],  // Include all node_modules for CommonJS compatibility
    }
  },
  
  // This section is optional if you are not using SSR (Server-Side Rendering)
  ssr: {
    noExternal: ['@square/web-sdk']  // Prevent Vite from processing @square/web-sdk as an external module
  },
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  },
});
