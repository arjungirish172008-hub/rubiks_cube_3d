import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths so it can be deployed on GitHub Pages, Netlify, or any subpath
  server: {
    host: true, // Exposes on local network so friends on same Wi-Fi can play
    port: 5173
  }
});
