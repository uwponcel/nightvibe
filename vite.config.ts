import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Served from a subpath on nordstudio.io as a Nord Studio demo.
  base: '/demos/barbier-boreal/',
  plugins: [react()],
});
