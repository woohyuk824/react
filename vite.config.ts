import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// 상대 경로(base './')로 빌드해야 Capacitor 앱·GitHub Pages 하위 경로에서도 리소스를 찾는다.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-32.png', 'apple-touch-icon.png'],
      manifest: {
        name: '캐치유',
        short_name: '캐치유',
        description: '캐치유 무료 뽑기 체험',
        lang: 'ko',
        start_url: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#573e78',
        theme_color: '#573e78',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
