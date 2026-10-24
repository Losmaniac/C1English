import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Relative asset paths so the same build works at "/" (local preview) and at
  // "/C1English/" (GitHub Pages). The app has no client-side routing, so this
  // is safe.
  base: './',
  // The app must contain no network calls at all: no module-preload polyfill,
  // no remote assets, no runtime fetch. Everything ships in the precache.
  build: {
    modulePreload: { polyfill: false },
    target: 'es2022',
    rollupOptions: {
      output: {
        // The optional sync SDK gets its own chunk, so a local-only build never
        // downloads it and the service worker can leave it out of the precache.
        manualChunks: (id: string) =>
          id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')
            ? 'sync-firebase'
            : undefined,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      // 'prompt' keeps a running study session intact when an update ships.
      registerType: 'prompt',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'English C1 Practice',
        short_name: 'English C1',
        description:
          'Offline-first C1 English practice: advanced grammar, vocabulary, collocations and idioms with spaced review.',
        lang: 'en',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f7f4ee',
        theme_color: '#1f3a34',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        // Sync needs a connection anyway, so the SDK chunk stays out of the
        // offline precache: the app itself remains ~420 KiB installed.
        globIgnores: ['**/sync-firebase-*.js'],
        // No runtime caching of remote origins: the app ships everything it needs.
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
      devOptions: { enabled: false },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    // A developer's .env.local must not switch sync on inside tests: they assert the local-only build.
    env: {
      VITE_FIREBASE_API_KEY: '',
      VITE_FIREBASE_AUTH_DOMAIN: '',
      VITE_FIREBASE_PROJECT_ID: '',
      VITE_FIREBASE_APP_ID: '',
    },
  },
});
