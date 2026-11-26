import { useEffect, useState } from 'react'
import { assetUrl } from './unity/rect'
import './StorePopup.css'

// 상품 받기 / 튜토리얼 종료 후 캐치유 앱 설치를 안내하는 팝업.
// 체험 결과를 실제 당첨처럼 표현하지 않는다(가입 전 체험).
export const APP_STORE = 'https://apps.apple.com/kr/app/id1512653202'
export const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.KLP.RZG'

export type Platform = 'ios' | 'android' | 'other'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M16.37 12.62c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.59 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.3-3.52zM14.2 6.16c.6-.73 1.01-1.75.9-2.76-.87.04-1.93.58-2.55 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.57-1.23z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#34A853" d="M3.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.2.9.4 1.2l9.4-9.7z" />
      <path fill="#FBBC04" d="M16.2 15.2 13 12l3.2-3.2 3.9 2.2c1.1.6 1.1 1.7 0 2.3z" />
      <path fill="#4285F4" d="M16.2 15.2 13 12l-9.4 9.7c.4.4 1 .4 1.7.1z" />
      <path fill="#EA4335" d="M16.2 8.8 5.3 2.2c-.7-.4-1.3-.3-1.7.1L13 12z" />
    </svg>
  )
}

interface Props {
  platform: Platform
}

// 닫기 버튼 없이 스토어 이동만 제공한다(바깥 탭으로도 닫히지 않음).
export default function StorePopup({ platform }: Props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const stores = [
    { key: 'ios', label: 'App Store에서 받기', href: APP_STORE, icon: <AppleIcon /> },
    { key: 'android', label: 'Google Play에서 받기', href: PLAY_STORE, icon: <PlayIcon /> },
  ]
  // 기기 스토어를 첫 번째(주 버튼)로 둔다. PC 는 두 버튼을 같은 비중으로 보여준다.
  const ordered = platform === 'android' ? [stores[1], stores[0]] : stores
  const primaryKey = platform === 'other' ? null : platform

  return (
    <div className={'sp-backdrop' + (show ? ' on' : '')}>
      <div className="sp-card" role="dialog" aria-modal="true" aria-labelledby="sp-title">
        <div className="sp-hero">
          <div className="sp-glow" />
          <img className="sp-appicon-lg" src={assetUrl('icon-192.png')} alt="캐치유" />
        </div>

        {/* 의미 단위(진짜 뽑기를 / 시작해 보세요)가 줄 사이에서 끊기지 않게 줄바꿈 없는 공백을 쓴다. */}
        <h2 id="sp-title" className="sp-title">캐치유 앱에서 진짜{' '}뽑기를 시작해{' '}보세요</h2>
        <p className="sp-desc">앱을 설치하고 가입하면 바로 이어서 즐길 수 있어요.</p>

        <div className="sp-actions">
          {ordered.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target={platform === 'other' ? '_blank' : undefined}
              rel="noreferrer"
              className={'sp-store' + (primaryKey === null || primaryKey === s.key ? ' primary' : ' secondary')}
            >
              <span className="sp-store-icon">{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        <div className="sp-footer">
          <img src={assetUrl('icon-192.png')} alt="" />
          <span>CATCH U</span>
        </div>
      </div>
    </div>
  )
}
