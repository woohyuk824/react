import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// 상대 경로(base './')로 빌드해야 Capacitor 앱(file 스킴)에서도 리소스를 찾는다.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: '테스트메모',
        short_name: '테스트메모',
        description: '간단한 메모 앱',
        lang: 'ko',
        start_url: './',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffb800',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
