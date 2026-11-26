import gsap from 'gsap'
import { assetUrl, TMP_ITALIC_SHEAR, TMP_SPACING_EM } from '../unity/rect'

// 토스트 문구는 TMP Italic(fontStyle 2): 기준선 기준 shear 0.15
const SKEW = (Math.atan(TMP_ITALIC_SHEAR) * 180) / Math.PI

// ToastManager.PlayToastUpTracked(title, sub, Purple, posY): PlayToastColor 프리팹.
// 0.1s 대기 → scaleX 0→1 0.2s → 1.5s 유지 → 알파 1→0 0.2s → 제거 (총 ≈2.0s)
export function showToast(root: HTMLElement, title: string, sub: string, posY: number, hold = false): Promise<void> {
  return new Promise((resolve) => {
    const el = document.createElement('div')
    Object.assign(el.style, {
      position: 'absolute', left: '0', width: '1080px', minHeight: '224px',
      top: '50%', transform: `translateY(calc(-50% - ${posY}px)) scaleX(0)`,
      // Image_BG VerticalLayoutGroup: padding 상하 44, spacing 8, 문구 폭 948
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      padding: '44px 66px', gap: '8px',
      backgroundImage: `url("${assetUrl('unity/_Images/Content/Toast/Image_GradientToastPurple.png')}")`,
      backgroundSize: '100% 100%', pointerEvents: 'none', zIndex: '40',
      fontFamily: 'Pretendard, sans-serif', color: '#fff', textAlign: 'center',
    })
    // 제목 TrueShadow: size 16, #C1B4FD a0.8
    const t = document.createElement('div')
    t.textContent = title
    Object.assign(t.style, { fontSize: '52px', fontWeight: '700', lineHeight: '1.355', letterSpacing: TMP_SPACING_EM + 'em', transform: `skewX(-${SKEW}deg)`, transformOrigin: '50% 78%', textShadow: '0 0 16px rgba(193,180,253,0.8)' })
    el.appendChild(t)
    if (sub) {
      const s = document.createElement('div')
      s.textContent = sub
      Object.assign(s.style, { fontSize: '40px', fontWeight: '500', lineHeight: '1.355', letterSpacing: TMP_SPACING_EM + 'em', transform: `skewX(-${SKEW}deg)`, transformOrigin: '50% 78%' })
      el.appendChild(s)
    }
    root.appendChild(el)
    const st = { sx: 0 }
    const apply = () => { el.style.transform = `translateY(calc(-50% - ${posY}px)) scaleX(${st.sx})` }
    if (hold) { st.sx = 1; apply(); return }
    const tl = gsap.timeline({ onComplete: () => { el.remove(); resolve() } })
    tl.to(st, { sx: 1, duration: 0.2, ease: 'power1.out', onUpdate: apply }, 0.1)
    tl.to(el, { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0.3 + 1.5)
  })
}
