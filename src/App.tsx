import { useEffect, useRef, useState } from 'react'
import { Tutorial, type ResultProduct } from './tutorial/controller'
import StorePopup from './StorePopup'
import { preloadSounds, unlockAudio } from './tutorial/sound'
import { assetUrl } from './unity/rect'
import './App.css'

function platform(): 'ios' | 'android' | 'other' {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

/** Unity CanvasScaler: 기준 1080x2160, 폭 기준(match 0). PC 는 1:2 세로 화면으로 맞춘다. */
function useStage() {
  const calc = () => {
    if (new URLSearchParams(location.search).has('snap')) return { w: 1080, h: 2160, scale: 1, virtualH: 2160 }
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = platform() === 'other' ? Math.min(vw, vh / 2) : vw
    const scale = w / 1080
    return { w, h: vh, scale, virtualH: vh / scale }
  }
  const [s, setS] = useState(calc)
  useEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

export default function App() {
  const stage = useStage()
  const stageRef = useRef<HTMLDivElement>(null)
  // 검수용: ?nosplash 이면 스플래시 영상을 건너뛴다.
  const [splash, setSplash] = useState(() => !new URLSearchParams(location.search).has('nosplash'))
  const [splashFade, setSplashFade] = useState(false)
  // 상품 받기 팝업: null = 닫힘, { product } = 열림 (튜토리얼 종료 시 product 없음)
  const [popup, setPopup] = useState<{ product?: ResultProduct } | null>(() => (new URLSearchParams(location.search).get('snap') === 'popup' ? { product: undefined } : null))
  const splashResolve = useRef<() => void>(() => {})

  useEffect(() => {
    preloadSounds()
    const el = stageRef.current
    if (!el) return
    const splashDone = new Promise<void>((r) => (splashResolve.current = r))
    const tutorial = new Tutorial({
      stage: el,
      stageHeight: stage.virtualH,
      splashDone,
      onFinish: (product) => setPopup({ product }),
    })
    void tutorial.init()
    if (new URLSearchParams(location.search).has('nosplash')) splashResolve.current()
    return () => tutorial.dispose()
    // 화면 크기가 바뀌어도 진행 중인 튜토리얼은 다시 만들지 않는다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Splash.cs: 영상 종료 → 0.5s 페이드 → is_splash false
  const endSplash = () => {
    if (splashFade) return
    setSplashFade(true)
    setTimeout(() => {
      setSplash(false)
      splashResolve.current()
    }, 500)
  }

  return (
    <div className="viewport" onPointerDown={unlockAudio}>
      <div
        className="frame"
        style={{ width: stage.w, height: stage.h }}
      >
        <div
          ref={stageRef}
          className="stage"
          style={{ width: 1080, height: stage.virtualH, transform: `scale(${stage.scale})` }}
        />
        {splash && (
          <div className={'splash' + (splashFade ? ' fade' : '')}>
            <video
              src={assetUrl('unity/video/Video_Splash.mp4')}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={endSplash}
              onError={endSplash}
              onStalled={() => setTimeout(endSplash, 8000)}
            />
          </div>
        )}
        {popup && <StorePopup platform={platform()} />}
      </div>
    </div>
  )
}
