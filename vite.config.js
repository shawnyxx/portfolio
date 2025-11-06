import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Include additional HTML entry so Vite builds the App Store page and resolves /src imports
  build: {
    rollupOptions: {
      input: {
        // Main entry point - this is critical for Cloudflare Pages
        main: resolve(__dirname, 'index.html'),
        // Additional pages
        'app-store': resolve(__dirname, 'src/apps/app-store/index.html'),
        'app-creator': resolve(__dirname, 'src/apps/app-creator/index.html')
      }
    }
  }
});
