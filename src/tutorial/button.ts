import gsap from 'gsap'
import { GLSurface, BUTTON_FRAG, loadImage } from '../unity/gl'
import { assetUrl, setAnchoredPos, type UElement } from '../unity/rect'
import { playSound, Sounds, unlockAudio } from './sound'

const GLOW = { soft: 40, softA: 0.5, core: 10, coreA: 0.6 }

// Unity Button(SpriteSwap) + PlayButtonPress + PlayButtonActivationShine + TutorialButtonGlow 를 한 캔버스로 그린다.
export class ButtonFx {
  el: UElement
  label: UElement
  labelBaseY: number
  interactable = false
  private pressed = false
  private gl: GLSurface | null = null
  private sprites: { normal?: HTMLImageElement; pressed?: HTMLImageElement; lock?: HTMLImageElement } = {}
  private progress = 1
  private intensity = 0
  private wipe?: gsap.core.Tween
  private glowColor: [number, number, number] = [151 / 255, 101 / 255, 255 / 255]
  onClick: () => void = () => {}

  constructor(el: UElement, label: UElement, labelBaseY: number) {
    this.el = el
    this.label = label
    this.labelBaseY = labelBaseY
    setAnchoredPos(label, label.unode.pos[0], labelBaseY)
    el.style.cursor = 'pointer'
    el.addEventListener('pointerdown', (e) => {
      unlockAudio()
      if (!this.interactable) return
      e.preventDefault()
      this.pressed = true
      setAnchoredPos(this.label, this.label.unode.pos[0], this.labelBaseY - 10)
      playSound(Sounds.playSelect, 1)
      this.draw()
    })
    const release = (fire: boolean) => {
      if (!this.pressed) return
      this.pressed = false
      setAnchoredPos(this.label, this.label.unode.pos[0], this.labelBaseY)
      this.draw()
      if (fire && this.interactable) this.onClick()
    }
    el.addEventListener('pointerup', () => release(true))
    el.addEventListener('pointercancel', () => release(false))
  }

  async init() {
    const n = this.el.unode
    const [normal, pressed, lock] = await Promise.all([
      n.image?.src ? loadImage(assetUrl(n.image.src)) : undefined,
      n.button?.pressed ? loadImage(assetUrl(n.button.pressed)) : undefined,
      n.button?.disabled ? loadImage(assetUrl(n.button.disabled)) : undefined,
    ])
    this.sprites = { normal, pressed, lock }
    this.gl = new GLSurface(BUTTON_FRAG, this.el.rectW, this.el.rectH)
    const w = this.el.rectW, h = this.el.rectH
    this.gl.set('_ShineDirection', [Math.SQRT1_2 * w, -Math.SQRT1_2 * h])
    this.gl.set('_GlowColor', this.glowColor)
    if (this.el.imageLayer) this.el.imageLayer.style.visibility = 'hidden'
    this.gl.fallback = this.el.imageLayer
    this.el.insertBefore(this.gl.canvas, this.el.imageLayer?.nextSibling ?? this.el.firstChild)
    this.draw()
  }

  private current() {
    if (!this.interactable) return this.sprites.lock ?? this.sprites.normal
    return this.pressed ? this.sprites.pressed ?? this.sprites.normal : this.sprites.normal
  }

  draw() {
    const gl = this.gl
    if (!gl) return
    const cur = this.current()
    if (cur) gl.setTexture('_MainTex', cur)
    gl.set('_Progress', this.progress)
    gl.set('_Intensity', this.intensity)
    gl.draw()
    // TrueShadow soft(size 40, a .95i) + core(size 10, 흰색 쪽 55%, a i)
    const [r, g, b] = this.glowColor.map((v) => Math.round(v * 255))
    const cr = Math.round(r + (255 - r) * 0.55), cg = Math.round(g + (255 - g) * 0.55), cb = Math.round(b + (255 - b) * 0.55)
    const i = this.intensity
    // TrueShadow 는 size 를 블러 지름으로 쓰고(cutout: 버튼 아래는 비움) core 는 Screen 블렌드라 밝게 더해진다.
    // Unity 렌더(fx_glow) 실측 기준으로 맞춘 값: soft σ≈size/2, core 는 흰쪽 색을 낮은 알파로.
    gl.canvas.style.filter =
      i > 0.001
        ? `drop-shadow(0 0 ${GLOW.soft}px rgba(${r},${g},${b},${GLOW.softA * i})) drop-shadow(0 0 ${GLOW.core}px rgba(${cr},${cg},${cb},${GLOW.coreA * i}))`
        : ''
  }

  /** LockButtons: 흑백(잠금) 스프라이트, 글로우 해제 */
  lock() {
    this.interactable = false
    this.wipe?.kill()
    this.progress = 1
    this.intensity = 0
    this.draw()
  }

  /** ActivateGuideButton: 잠금 → 활성 대각 와이프 0.4s Linear */
  activate() {
    const from = this.sprites.lock ?? this.sprites.normal
    this.interactable = true
    if (from && this.gl) this.gl.setTexture('_FromTex', from)
    this.progress = 0
    this.wipe?.kill()
    const state = { p: 0 }
    this.wipe = gsap.to(state, {
      p: 1, duration: 0.4, ease: 'none',
      onUpdate: () => { this.progress = state.p; this.draw() },
      onComplete: () => { this.progress = 1; this.draw() },
    })
    this.draw()
  }

  /** 더 이상 보이지 않는 버튼의 WebGL 컨텍스트를 반환한다. */
  release() {
    this.wipe?.kill()
    this.gl?.dispose()
    this.gl = null
    if (this.el.imageLayer) this.el.imageLayer.style.visibility = 'visible'
  }

  /** 검수용: 활성화 와이프를 특정 진행값에 고정 */
  setWipe(p: number) {
    const from = this.sprites.lock ?? this.sprites.normal
    this.interactable = true
    if (from && this.gl) this.gl.setTexture('_FromTex', from)
    this.progress = p
    this.draw()
  }

  setGuideProgress(v: number) {
    this.intensity = v
    this.draw()
  }
}
