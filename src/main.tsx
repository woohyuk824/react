import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import './index.css'
import App from './App.tsx'

// 검수용(?auto): 헤드리스 브라우저는 화면 갱신이 없으면 requestAnimationFrame 을 멈추므로 타이머로 대체한다.
if (new URLSearchParams(location.search).has('auto')) {
  window.requestAnimationFrame = (cb: FrameRequestCallback) => window.setTimeout(() => cb(performance.now()), 16)
  window.cancelAnimationFrame = (id: number) => window.clearTimeout(id)
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.sleep()
  gsap.ticker.wake()
}

// 튜토리얼은 Unity 팝업처럼 한 번만 생성되는 명령형 화면이라 StrictMode 이중 실행을 쓰지 않는다.
createRoot(document.getElementById('root')!).render(<App />)
