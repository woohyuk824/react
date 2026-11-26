import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// 광고 유입 주소(/ad 등): 같은 화면을 하위 폴더에 복사하고 <base href="../"> 로 리소스를 상위에서 읽는다.
// 채널을 늘리려면 배열에 이름만 추가한다. (예: 'insta', 'youtube')
const CHANNEL_PATHS = ['ad']

function channelPages(): Plugin {
  return {
    name: 'channel-pages',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const html = readFileSync(resolve(dist, 'index.html'), 'utf8')
      for (const name of CHANNEL_PATHS) {
        mkdirSync(resolve(dist, name), { recursive: true })
        writeFileSync(resolve(dist, name, 'index.html'), html.replace('<head>', '<head>\n    <base href="../" />'))
      }
    },
  }
}

// 상대 경로(base './')로 빌드해야 Capacitor 앱·GitHub Pages 하위 경로에서도 리소스를 찾는다.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    channelPages(),
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
