// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//       }
//     }
//   }
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'BharatSeva AI',
        short_name: 'BharatSeva',
        description: 'Citizen Service Platform',
        theme_color: '#ffffff',
        display: 'standalone', // Makes it feel native
        orientation: 'portrait', // Locks to portrait
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Ensures offline.html is used when the app is offline
        navigateFallback: 'offline.html',
        // CRITICAL: Prevents your Spring Boot API calls from being 
        // intercepted by the offline page
        navigateFallbackDenylist: [/^\/api/], 
      }
    })
  ]
});