import gsap from 'gsap'
import layout from '../data/tutorial.layout.json'
import productSets from '../data/products.json'
import sprites from '../data/sprites.json'
import type { UNode } from '../unity/types'
import {
  NodeRegistry, buildTree, fitAll, setActive, setAnchoredPos, setImageSrc, setSizeDelta, setText, assetUrl, type UElement,
} from '../unity/rect'
import { GLSurface, SWAY_FRAG, GOLD_FRAG, PRODUCT_GLOW_FRAG, NORMALFX_FRAG, GLASS_FRAG, buildNormalMap, loadImage } from '../unity/gl'
import { ParticleLayer, resultLightEmitters } from './particles'
import { ButtonFx } from './button'
import { Joystick } from './joystick'
import { GoldConfetti } from './confetti'
import { playSound, Sounds } from './sound'
import { showToast } from './toast'
import { WinnerBanner } from './banner'

// UI_TutorialDrawing.cs 1:1 대응. 가입 전 체험: 실제 뽑기·주문·재화 API 를 호출하지 않는다.

interface Product { id?: string | number; image: string; imageUrl?: string; grade: string; brand: string; name: string; price: number }
interface ProductSet { main: Product; list_nine: Product[]; list_vip?: Product[] }

const Steps = { Intro: 0, Single: 1, Motion: 2, ReceiveSingle: 3, Complete: 4 } as const
type Steps = (typeof Steps)[keyof typeof Steps]

const wait = (s: number) => new Promise<void>((r) => setTimeout(r, s * 1000))
const tweenDone = (t: gsap.core.Animation) => new Promise<void>((r) => t.eventCallback('onComplete', () => r()))

function numberFormat(n: number) {
  return n === 0 ? '0' : n.toLocaleString('en-US')
}

function gradeIcon(grade: string) {
  return `unity/_Images/Icon/Icon_Grade${grade}.png`
}

function productSrc(p: Product) {
  return p.image || p.imageUrl || ''
}

export interface TutorialOptions {
  stage: HTMLElement
  stageHeight: number
  splashDone: Promise<void>
  /** 상품 받기·튜토리얼 종료: 체험 결과 상품(없으면 undefined)을 넘긴다. */
  onFinish: (product?: ResultProduct) => void
}

export interface ResultProduct { image: string; grade: string; brand: string; name: string; price: number }

export class Tutorial {
  private reg = new NodeRegistry()
  private root!: UElement
  private shake!: HTMLDivElement
  private zoom!: HTMLDivElement
  private step: Steps = Steps.Intro
  private exiting = false
  private products!: ProductSet
  private resultProduct!: Product
  private draw!: ButtonFx
  private order!: ButtonFx
  private joystick!: Joystick
  private banner?: WinnerBanner
  private guide?: gsap.core.Animation
  private fingerFade?: gsap.core.Tween
  private dummyGoldStop = false
  private surface?: GLSurface
  private sway?: GLSurface
  private swayRaf = 0
  private confetti?: GoldConfetti
  private clawClosedSrc: string | null = null
  private clawPos: [number, number] = [0, 0]
  private infoPos: [number, number] = [0, 0]
  private pricePos: [number, number] = [0, 0]
  private namePos: [number, number] = [0, 0]
  private opts: TutorialOptions
  private machineActive = true

  constructor(opts: TutorialOptions) {
    this.opts = opts
  }

  private g(name: string) {
    return this.reg.get(name)
  }

  async init() {
    const { stage, stageHeight } = this.opts
    this.shake = document.createElement('div')
    this.zoom = document.createElement('div')
    for (const d of [this.shake, this.zoom]) Object.assign(d.style, { position: 'absolute', inset: '0' })
    this.shake.appendChild(this.zoom)
    stage.appendChild(this.shake)
    this.root = buildTree(structuredClone(layout) as unknown as UNode, 1080, stageHeight, this.reg)
    this.zoom.appendChild(this.root)
    await document.fonts.ready
    fitAll(this.root)

    // 랜덤 세트를 한 번만 고르고 모든 체험 단계에서 같은 상품들을 사용한다.
    const valid = (productSets as unknown as ProductSet[]).filter(
      (p) => p && p.main && p.list_nine?.length === 9 && p.list_nine.every(Boolean),
    )
    if (valid.length === 0) {
      this.skip()
      return
    }
    const forced = new URLSearchParams(location.search).get('set')
    this.products = forced !== null ? valid[Number(forced) % valid.length] : valid[Math.floor(Math.random() * valid.length)]
    const candidates = [this.products.main, ...(this.products.list_vip ?? []), ...this.products.list_nine]
    const luxury = candidates.filter((p) => p && ['V', 'SV', 'SSV'].includes(p.grade))
    this.resultProduct = luxury.length > 0 ? luxury[forced !== null ? 0 : Math.floor(Math.random() * luxury.length)] : this.products.main

    const ticket = this.reg.find('Text_DrawTicket')
    if (ticket) setText(ticket, '2장')

    this.clawClosedSrc = this.g('Image_Claw').unode.image?.src ?? null
    this.clawPos = [...this.g('RT_ClawDown').unode.pos]
    this.infoPos = [...this.g('CG_ProductInfo').unode.pos]
    this.pricePos = [...this.g('CG_Price').unode.pos]
    this.namePos = [...this.g('Text_Name').unode.pos]

    // 버튼 (PlayInfo 한 줄 기준 y: Draw 8, Order 10)
    this.draw = new ButtonFx(this.g('Button_Draw'), this.g('Button_Draw/GO_PlayInfo'), 8)
    this.order = new ButtonFx(this.g('Button_Order'), this.g('Button_Order/GO_PlayInfo'), 10)
    this.draw.onClick = () => this.onDraw()
    this.order.onClick = () => this.onReceive()
    await Promise.all([this.draw.init(), this.order.init()])

    // 조이스틱
    const stickEl = this.g('GO_DrawingJoyStick')
    const sheet = stickEl.unode.image?.src ?? ''
    const frames = ((sprites as unknown as Record<string, { rect: [number, number, number, number] }[]>)[sheet] ?? []).map((f) => f.rect)
    this.joystick = new Joystick(
      stickEl, this.g('RT_Claw'), [this.g('RT_ClawHand'), this.g('Image_Claw')], frames,
      (rect) => {
        if (stickEl.unode.image) stickEl.unode.image.spriteRect = rect
        setImageSrc(stickEl, sheet)
      },
    )
    this.joystick.onWallImpact = (side) => this.wallImpact(side)

    // 더미 5개
    for (let i = 0; i < 5; i++) {
      const d = this.g(`RawImage_Dummy0${i + 1}`)
      setImageSrc(d, productSrc(this.products.list_nine[i]))
      d.style.opacity = '0'
    }

    void this.startAmbient()

    setActive(this.g('GO_Result'), false)
    const skip = this.g('Button_TutorialSkip')
    setActive(skip, true)
    skip.style.cursor = 'pointer'
    skip.addEventListener('click', () => this.skip())
    const count = this.reg.find('Button_Count')
    if (count) setActive(count, false)
    const snap = new URLSearchParams(location.search).get('snap')
    if (snap) {
      await this.applySnap(snap)
      return
    }
    this.lockButtons()
    this.corIntro()
  }

  // ---------------------------------------------------------------- 검수 스냅샷
  /** ?snap=machine|result : Unity 프리팹 정적 렌더와 같은 상태를 애니메이션 없이 만든다(픽셀 대조용). */
  private async applySnap(kind: string) {
    this.dummyGoldStop = true
    this.joystick.setPaused(true)
    setAnchoredPos(this.g('RT_Claw'), -210, this.g('RT_Claw').unode.pos[1])
    for (let i = 0; i < 5; i++) this.g(`RawImage_Dummy0${i + 1}`).style.opacity = '1'
    this.draw.interactable = true
    this.draw.draw()
    if (kind === 'glow') {
      this.draw.setGuideProgress(1)
      const finger = this.g('GO_Finger')
      finger.unode.aMin = [0.5, 0.5]; finger.unode.aMax = [0.5, 0.5]; finger.unode.pivot = [0.5, 0.5]; finger.unode.size = [300, 300]
      setAnchoredPos(finger, -90, -415)
      this.root.appendChild(finger)
      setActive(finger, true)
      finger.style.opacity = '1'
    }
    if (kind === 'wipe') this.draw.setWipe(0.5)
    if (kind === 'ui') {
      const bannerEl = this.reg.find('GO_WinnerBanner')
      if (bannerEl) { this.banner = new WinnerBanner(bannerEl); this.banner.initTutorial(); this.banner.pause() }
      void showToast(this.root, '무료 뽑기를 체험해 보세요', '(체험 상품은 랜덤하게 배치됩니다)', 248, true)
    }
    if (kind.startsWith('gold')) {
      const p = Number(kind.slice(4)) / 100
      const d = this.g('RawImage_Dummy01')
      const img = await loadImage(assetUrl(productSrc(this.products.list_nine[0])))
      const fx = new GLSurface(GOLD_FRAG, d.rectW, d.rectH)
      fx.setTexture('_MainTex', img)
      fx.setTexture('_NormalTex', buildNormalMap(img))
      fx.set('_Shine', [3, 0.16, Math.cos((-20 * Math.PI) / 180), Math.sin((-20 * Math.PI) / 180)])
      fx.set('_P', p)
      fx.draw()
      d.appendChild(fx.canvas)
      if (d.imageLayer) d.imageLayer.style.visibility = 'hidden'
    }
    if (kind !== 'result' && kind !== 'resultfx') return
    this.machineActive = false
    setActive(this.g('GO_Machine'), false)
    setActive(this.g('GO_Result'), true)
    const p = this.resultProduct
    setAnchoredPos(this.g('CG_ProductInfo'), this.infoPos[0], this.infoPos[1] - 124)
    setAnchoredPos(this.g('CG_Price'), this.pricePos[0], this.pricePos[1] - 124)
    const image = this.g('RawImage_Product')
    setImageSrc(image, productSrc(p))
    image.style.opacity = '1'
    setImageSrc(this.g('RawImage_Grade'), gradeIcon(p.grade))
    setText(this.g('Text_Brand'), p.brand)
    setText(this.g('Text_Name'), p.name)
    setText(this.g('Text_Price'), numberFormat(p.price) + '원')
    this.order.interactable = true
    this.order.draw()
    if (kind === 'resultfx') {
      // 결과 광원(ResultProductGlow) + 상품 스키닝 셰이더를 샤인 0.5 에 고정
      this.snapShine = 0.5
      await this.showProductGlow(image)
      await this.startSkinning(image, image.unode.pos[0], image.unode.pos[1])
    }
  }
  private snapShine?: number

  // ---------------------------------------------------------------- 상시 효과
  private ambientRaf = 0
  private clawFx?: { fx: GLSurface; src: string | null }

  /** ImageNormalFx(Image_Front, Image_Claw: 4s 조명 흔들림) + GlassShine(Image_Glass: 4.5s 펄스) */
  private async startAmbient() {
    const front = this.g('Image_Front')
    const glass = this.g('Image_Glass')
    const frontNormalSrc = 'unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBGNormal.png'
    const [frontImg, frontNormal, glassImg] = await Promise.all([
      loadImage(assetUrl(front.unode.image!.src!)),
      loadImage(assetUrl(frontNormalSrc)),
      loadImage(assetUrl(glass.unode.image!.src!)),
    ]).catch(() => [undefined, undefined, undefined] as const)
    let frontFx: GLSurface | undefined
    if (frontImg && frontNormal) {
      frontFx = new GLSurface(NORMALFX_FRAG, front.rectW, front.rectH)
      frontFx.setTexture('_MainTex', frontImg)
      frontFx.setTexture('_NormalTex', frontNormal)
      frontFx.set('_Strength', 1)
      front.appendChild(frontFx.canvas)
      if (front.imageLayer) front.imageLayer.style.visibility = 'hidden'
    }
    let glassFx: GLSurface | undefined
    if (glassImg) {
      glassFx = new GLSurface(GLASS_FRAG, glass.rectW, glass.rectH)
      glassFx.setTexture('_MainTex', glassImg)
      glass.appendChild(glassFx.canvas)
      if (glass.imageLayer) glass.imageLayer.style.visibility = 'hidden'
    }
    await this.refreshClawFx()
    const start = performance.now()
    const tick = () => {
      this.ambientRaf = requestAnimationFrame(tick)
      if (!this.machineActive) return
      // 검수 스냅샷은 Unity SampleLight(0) 과 같은 t=0 에 고정한다.
      const t = new URLSearchParams(location.search).has('snap') ? 0 : (performance.now() - start) / 1000
      const phase = (t / 4) * Math.PI * 2
      const light: [number, number, number] = [0.15 + Math.sin(phase) * 0.5, 0.6 + Math.cos(phase) * 0.5 * 0.35, 0.4]
      if (frontFx) { frontFx.set('_Light', light); frontFx.draw() }
      if (this.clawFx) { this.clawFx.fx.set('_Light', light); this.clawFx.fx.draw() }
      if (glassFx) {
        const pulse = 0.5 + 0.5 * Math.sin((t * Math.PI * 2) / 4.5)
        glassFx.set('_Reflection', 2.8 * (1 - 0.6 + 0.6 * pulse))
        glassFx.draw()
      }
    }
    tick()
  }

  /** 집게 스프라이트(열림/닫힘)가 바뀌면 노멀맵을 다시 만든다. */
  private async refreshClawFx() {
    const claw = this.g('Image_Claw')
    const src = claw.unode.image?.src ?? null
    if (this.clawFx?.src === src) return
    this.clawFx?.fx.dispose()
    this.clawFx = undefined
    if (!src) return
    const img = await loadImage(assetUrl(src)).catch(() => undefined)
    if (!img) return
    const fx = new GLSurface(NORMALFX_FRAG, claw.rectW, claw.rectH)
    fx.setTexture('_MainTex', img)
    fx.setTexture('_NormalTex', buildNormalMap(img))
    fx.set('_Strength', 1)
    fx.set('_Light', [0.15, 0.6, 0.4])
    fx.draw()
    claw.appendChild(fx.canvas)
    if (claw.imageLayer) claw.imageLayer.style.visibility = 'hidden'
    this.clawFx = { fx, src }
  }

  /** GO_Result 활성화 시 GO_LightEffect 파티클(OnEnable 재생) */
  private startResultLight() {
    const host = this.reg.find('GO_LightEffect')
    if (!host || this.resultLight) return
    const size = 1400
    this.resultLight = new ParticleLayer(size, size, resultLightEmitters())
    this.resultLight.canvas.style.left = `${host.rectW / 2 - size / 2}px`
    this.resultLight.canvas.style.top = `${host.rectH / 2 - size / 2}px`
    host.appendChild(this.resultLight.canvas)
    this.resultLight.start()
  }
  private resultLight?: ParticleLayer

  // ---------------------------------------------------------------- 단계 안내
  private lockButtons() {
    this.guide?.kill()
    this.guide = undefined
    this.fingerFade?.kill()
    setActive(this.g('GO_Finger'), false)
    this.draw.lock()
    this.order.lock()
  }

  private async corIntro() {
    await this.opts.splashDone
    await this.entryProducts()
    const bannerEl = this.reg.find('GO_WinnerBanner')
    if (bannerEl) {
      this.banner = new WinnerBanner(bannerEl)
      this.banner.initTutorial()
    }
    this.dummyGold()
    await Promise.race([
      showToast(this.root, '무료 뽑기를 체험해 보세요', '(체험 상품은 랜덤하게 배치됩니다)', 248),
      wait(6),
    ])
    await this.corGuide(Steps.Single, 'draw')
    // 검수용: ?auto=1 이면 안내 후 1초 뒤 자동으로 [무료 뽑기]
    if (new URLSearchParams(location.search).has('auto')) setTimeout(() => this.onDraw(), 1000)
  }

  private async corGuide(next: Steps, which: 'draw' | 'order') {
    this.step = Steps.Intro
    this.lockButtons()
    const btn = which === 'draw' ? this.draw : this.order
    if (which === 'draw') {
      this.step = next
      btn.activate()
    }
    await wait(0.5)
    if (which === 'draw' && this.step !== next) return
    this.step = next
    if (which !== 'draw') btn.activate()
    await wait(0.8)
    if (this.step !== next || this.exiting) return

    const finger = this.g('GO_Finger')
    finger.unode.aMin = [0.5, 0.5]
    finger.unode.aMax = [0.5, 0.5]
    finger.unode.pivot = [0.5, 0.5]
    finger.unode.size = [300, 300]
    const lowerY = which === 'order' ? -718 : -415
    const fx = which === 'order' ? -80 : -90
    setAnchoredPos(finger, fx, lowerY + 20)
    this.root.appendChild(finger) // SetAsLastSibling
    setActive(finger, true)
    finger.style.opacity = '0'
    this.fingerFade = gsap.to(finger, { opacity: 1, duration: 0.3, ease: 'power1.out' })
    const state = { v: 0 }
    this.guide = gsap.to(state, {
      v: 1, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true,
      onUpdate: () => {
        setAnchoredPos(finger, fx, lowerY + 20 * (1 - state.v))
        btn.setGuideProgress(state.v)
      },
    })
  }

  // ---------------------------------------------------------------- 뽑기 연출
  private onDraw() {
    if (this.step !== Steps.Single) return
    this.step = Steps.Motion
    void this.corDraw()
  }

  private wallImpact(impact: number) {
    const s = { v: 0 }
    gsap.to(s, {
      v: 1, duration: 0.28, ease: 'none',
      onUpdate: () => {
        const v = s.v
        const r = Math.cos(5 * Math.PI * v) * (1 - v) * (1 - v) * impact
        this.shake.style.transform = `translate(${7 * r}px, ${-1.5 * r}px) rotate(${-0.18 * r}deg)`
      },
      onComplete: () => { this.shake.style.transform = '' },
    })
  }

  private async corDraw() {
    this.lockButtons()
    this.joystick.setPlayMotion(true)
    const clawImg = this.g('Image_Claw')
    setImageSrc(clawImg, 'unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawOpen.png')
    void this.refreshClawFx()
    playSound(Sounds.drawMove, 0.5)
    const down = this.g('RT_ClawDown')
    const s = { y: this.clawPos[1] }
    await tweenDone(gsap.to(s, {
      y: this.clawPos[1] - 600, duration: 0.55, ease: 'power1.in',
      onUpdate: () => setAnchoredPos(down, this.clawPos[0], s.y),
    }))
    setImageSrc(clawImg, this.clawClosedSrc)
    void this.refreshClawFx()
    await wait(0.25)

    // DrawingResultTransition: 집게 손 기준 ×3 줌 + 블러 3 → 12
    const hand = this.g('RT_ClawHand').getBoundingClientRect()
    const zr = this.zoom.getBoundingClientRect()
    const scale = zr.width / 1080
    const fx = (hand.left + hand.width / 2 - zr.left) / scale
    const fy = (hand.top + hand.height * 0.5 - zr.top) / scale
    this.zoom.style.transformOrigin = `${fx}px ${fy}px`
    const z = { t: 0 }
    await tweenDone(gsap.to(z, {
      t: 1, duration: 0.3, ease: 'none',
      onUpdate: () => {
        const e = z.t * z.t * (3 - 2 * z.t)
        const ss = (x: number) => { const c = Math.min(1, Math.max(0, x)); return c * c * (3 - 2 * c) }
        const soft = ss(2 * e), blurred = ss(2 * e - 1)
        this.zoom.style.transform = `scale(${1 + 2 * e})`
        this.zoom.style.filter = `blur(${6 * soft + 18 * blurred}px)`
      },
    }))

    // 결과 영상
    this.machineActive = false
    this.joystick.setPaused(true)
    this.banner?.pause()
    this.resetResultImage()
    setActive(this.g('GO_Machine'), false)
    setActive(this.g('GO_Result'), true)
    this.startResultLight()
    const title = this.reg.find('Text_TutorialTitle')
    if (title) setActive(title, false)
    setActive(this.g('Button_TutorialSkip'), false) // allowSkip false
    await this.playResultVideo(() => {
      // 첫 프레임 표시 직후 확대 캡처 제거 (페이드 없음)
      this.zoom.style.transform = ''
      this.zoom.style.filter = ''
    })
    setActive(this.g('Button_TutorialSkip'), true)

    const p = this.resultProduct
    setAnchoredPos(this.g('CG_ProductInfo'), this.infoPos[0], this.infoPos[1] - 124)
    setAnchoredPos(this.g('CG_Price'), this.pricePos[0], this.pricePos[1] - 124)
    setAnchoredPos(this.g('Text_Name'), this.namePos[0], this.namePos[1])
    const image = this.g('RawImage_Product')
    setActive(image, true)
    image.style.opacity = '0'
    try {
      await Promise.race([loadImage(assetUrl(productSrc(p))), wait(8)])
      setImageSrc(image, productSrc(p))
    } catch {
      /* 실패 시 빈 상태 유지 */
    }
    setImageSrc(this.g('RawImage_Grade'), gradeIcon(p.grade))
    setText(this.g('Text_Brand'), p.brand)
    setText(this.g('Text_Name'), p.name)
    setText(this.g('Text_Price'), numberFormat(p.price) + '원')
    await this.revealProduct(image)
    await wait(1.2)
    await this.corGuide(Steps.ReceiveSingle, 'order')
    // 검수용: ?auto=1 이면 안내 후 1.5초 뒤 자동으로 [상품 받기]
    if (new URLSearchParams(location.search).has('auto')) setTimeout(() => this.onReceive(), 1500)
  }

  private resetResultImage() {
    const info = this.reg.find('GO_DrawingResultProductInfo')
    if (info) setActive(info, false)
    this.stopSkinning()
    const image = this.g('RawImage_Product')
    setImageSrc(image, null)
    image.style.opacity = '0'
    this.g('RawImage_ProductGlow').style.opacity = '0'
    const multiple = this.reg.find('RT_Multiple')
    if (multiple) multiple.style.opacity = '0'
    setImageSrc(this.g('RawImage_Grade'), null)
    for (const t of ['Text_Brand', 'Text_Name', 'Text_Price']) setText(this.g(t), '')
  }

  /** PlayMainDrawingResultVideo (isTutorial, allowSkip false) */
  private playResultVideo(onFirstFrame: () => void) {
    return new Promise<void>((resolve) => {
      const overlay = document.createElement('div')
      Object.assign(overlay.style, { position: 'absolute', inset: '0', background: '#000', overflow: 'hidden', zIndex: '50', visibility: 'hidden' })
      const video = document.createElement('video')
      video.src = assetUrl('unity/video/Video_Drawing.mp4')
      video.playsInline = true
      video.muted = true
      video.preload = 'auto'
      Object.assign(video.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' })
      overlay.appendChild(video)
      this.opts.stage.appendChild(overlay)
      let done = false
      const finish = () => {
        if (done) return
        done = true
        video.pause()
        const f = { t: 0 }
        gsap.to(f, {
          t: 1, duration: 0.2, ease: 'none',
          onUpdate: () => { const x = f.t; overlay.style.opacity = String(1 - x * x * (3 - 2 * x)) },
          onComplete: () => { overlay.remove(); resolve() },
        })
      }
      let shown = false
      const present = () => {
        if (shown) return
        shown = true
        overlay.style.visibility = 'visible'
        video.muted = false // 사용자가 [무료 뽑기]를 눌렀으므로 소리 재생 허용
        // UV 줌 5→1, 0.3s easeOutCubic
        gsap.fromTo(video, { scale: 5 }, { scale: 1, duration: 0.3, ease: 'power2.out' })
        onFirstFrame()
      }
      const v = video as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(present)
      else video.addEventListener('playing', present, { once: true })
      video.addEventListener('ended', finish)
      video.addEventListener('error', () => { present(); finish() })
      const timeout = setTimeout(() => { if (!shown) { present(); finish() } }, 5000)
      video.addEventListener('playing', () => clearTimeout(timeout), { once: true })
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => { present(); finish() })
      })
      video.addEventListener('loadedmetadata', () => {
        setTimeout(finish, (video.duration + 5) * 1000)
      })
    })
  }

  /** COR_EntryProducts: 아래 160 에서 순차 상승 + 페이드 */
  private async entryProducts() {
    const tl = gsap.timeline()
    for (let i = 0; i < 5; i++) {
      const d = this.g(`RawImage_Dummy0${i + 1}`)
      const [x, y] = d.unode.pos
      const s = { y: y - 160 }
      setAnchoredPos(d, x, s.y)
      tl.to(s, { y, duration: 0.45, ease: 'power2.out', onUpdate: () => setAnchoredPos(d, x, s.y) }, i * 0.08)
      tl.to(d, { opacity: 1, duration: 0.25, ease: 'power1.out' }, i * 0.08)
    }
    await tweenDone(tl)
  }

  /** COR_DummyGold: 더미 1→5 순서로 5.5s 골드 샤인, 무한 반복 (기계 화면에서만) */
  private async dummyGold() {
    const normals = new Map<number, { img: HTMLImageElement; normal: HTMLCanvasElement }>()
    let i = 0
    while (!this.dummyGoldStop) {
      if (!this.machineActive) { await wait(0.2); continue }
      const d = this.g(`RawImage_Dummy0${i + 1}`)
      let entry = normals.get(i)
      if (!entry) {
        try {
          const img = await loadImage(assetUrl(productSrc(this.products.list_nine[i])))
          entry = { img, normal: buildNormalMap(img) }
          normals.set(i, entry)
        } catch {
          i = (i + 1) % 5
          await wait(0.1)
          continue
        }
      }
      const fx = new GLSurface(GOLD_FRAG, d.rectW, d.rectH)
      fx.setTexture('_MainTex', entry.img)
      fx.setTexture('_NormalTex', entry.normal)
      fx.set('_Shine', [3, 0.16, Math.cos((-20 * Math.PI) / 180), Math.sin((-20 * Math.PI) / 180)])
      d.appendChild(fx.canvas)
      if (d.imageLayer) d.imageLayer.style.visibility = 'hidden'
      this.surface = fx
      const start = performance.now()
      await new Promise<void>((resolve) => {
        const tick = () => {
          const p = (performance.now() - start) / 5500
          if (p >= 1 || this.dummyGoldStop) return resolve()
          if (this.machineActive) {
            fx.set('_P', p)
            fx.draw()
          }
          requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
      if (d.imageLayer) d.imageLayer.style.visibility = ''
      fx.dispose()
      this.surface = undefined
      i = (i + 1) % 5
    }
  }

  /** RawImage_ProductGlow: 상품 rect ×1.55, ResultProductGlow 셰이더, 상품 중심에 맞춘다. */
  private async showProductGlow(image: UElement) {
    const glow = this.g('RawImage_ProductGlow')
    setSizeDelta(glow, image.unode.size[0] * 1.55, image.unode.size[1] * 1.55)
    if (!glow.querySelector('canvas')) {
      const gfx = new GLSurface(PRODUCT_GLOW_FRAG, glow.rectW, glow.rectH)
      gfx.set('_Intensity', 1.15)
      gfx.set('_GlowColor', [1, 0xf2 / 255, 0xd1 / 255])
      gfx.set('_HaloColor', [0xb0 / 255, 0x99 / 255, 1])
      gfx.draw()
      if (glow.imageLayer) glow.imageLayer.style.display = 'none'
      glow.appendChild(gfx.canvas)
    }
    setAnchoredPos(glow, image.unode.pos[0], image.unode.pos[1])
    glow.style.opacity = '1'
    return glow
  }

  /** COR_RevealProduct + StartProductSkinning + 골드 컨페티 */
  private async revealProduct(image: UElement) {
    const [tx, ty] = image.unode.pos
    const glow = await this.showProductGlow(image)
    glow.style.opacity = '0'
    const s = { y: ty - 160 }
    setAnchoredPos(image, tx, s.y)
    image.style.opacity = '0'
    const tl = gsap.timeline()
    tl.to(s, { y: ty, duration: 0.65, ease: 'power2.out', onUpdate: () => { setAnchoredPos(image, tx, s.y); setAnchoredPos(glow, tx, s.y) } }, 0)
    tl.to(image, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0)
    tl.to(glow, { opacity: 1, duration: 0.55, ease: 'sine.out' }, 0)
    await tweenDone(tl)
    await this.startSkinning(image, tx, ty)
    const conf = this.g('GO_GoldConfetti')
    setAnchoredPos(conf, conf.unode.pos[0], ty)
    if (!this.confetti) {
      this.confetti = new GoldConfetti(conf.rectW, conf.rectH)
      conf.appendChild(this.confetti.canvas)
    }
    this.confetti.stop()
    this.confetti.play()
  }

  private async startSkinning(image: UElement, x: number, y: number) {
    this.stopSkinning()
    const src = image.unode.image?.src
    if (!src) return
    const img = await loadImage(assetUrl(src)).catch(() => undefined)
    if (!img) return
    const [w, h] = image.unode.size
    const holder = document.createElement('div')
    Object.assign(holder.style, { position: 'absolute', top: '0', height: '100%', left: `${-w * 0.06}px`, width: `${w * 1.12}px`, pointerEvents: 'none' })
    const fx = new GLSurface(SWAY_FRAG, w * 1.12, h)
    fx.setTexture('_MainTex', img)
    fx.set('_Fit', 1 / 1.12)
    fx.set('_ShineDirection', [Math.SQRT1_2 * w * (1 / 1.12), -Math.SQRT1_2 * h])
    fx.set('_ShineColor', [1, 0.88, 0.65])
    fx.set('_ShineWidth', 0.09)
    fx.set('_ShineStrength', 0.8)
    holder.appendChild(fx.canvas)
    image.appendChild(holder)
    if (image.imageLayer) image.imageLayer.style.visibility = 'hidden'
    this.sway = fx
    const glow = this.g('RawImage_ProductGlow')
    const start = performance.now()
    const tick = () => {
      this.swayRaf = requestAnimationFrame(tick)
      const t = (performance.now() - start) / 1000
      let dy = 0
      let bend = 0
      if (t < 0.8) {
        const p = t / 0.8
        dy = Math.sin(p * Math.PI) * 8
        bend = Math.sin(p * Math.PI * 2) * (1 - p) * 0.065
      } else {
        const p = ((t - 0.8) % 3.6) / 3.6
        dy = Math.sin(p * Math.PI * 2) * 10
      }
      if (this.snapShine !== undefined) { dy = 0; bend = 0 }
      setAnchoredPos(image, x, y + dy)
      setAnchoredPos(glow, x, y + dy)
      // PlayMainShine: 1.4s Linear 진행 + 2s 휴지
      const c = t % 3.4
      fx.set('_ShineProgress', this.snapShine ?? (c < 1.4 ? c / 1.4 : 1.2))
      fx.set('_Bend', bend)
      fx.draw()
    }
    tick()
  }

  private stopSkinning() {
    cancelAnimationFrame(this.swayRaf)
    if (this.sway) {
      this.sway.canvas.parentElement?.remove()
      this.sway.dispose()
      this.sway = undefined
      const image = this.g('RawImage_Product')
      if (image.imageLayer) image.imageLayer.style.visibility = ''
    }
  }

  // ---------------------------------------------------------------- 상품 받기
  private onReceive() {
    if (this.step !== Steps.ReceiveSingle || this.exiting) return
    this.step = Steps.Complete
    this.lockButtons()
    this.skip()
  }

  private skip() {
    if (this.exiting) return
    this.exiting = true
    this.opts.onFinish(this.step === Steps.Complete && this.resultProduct ? { image: assetUrl(productSrc(this.resultProduct)), grade: this.resultProduct.grade, brand: this.resultProduct.brand, name: this.resultProduct.name, price: this.resultProduct.price } : undefined)
    // 스토어 이동 후 돌아왔을 때 다시 누를 수 있도록 종료 플래그를 풀어 둔다.
    setTimeout(() => { this.exiting = false; if (this.step === Steps.Complete) this.step = Steps.ReceiveSingle; this.order.interactable = true; this.order.draw() }, 1500)
  }

  dispose() {
    this.dummyGoldStop = true
    cancelAnimationFrame(this.ambientRaf)
    this.resultLight?.stop()
    this.joystick?.dispose()
    this.banner?.dispose()
    this.stopSkinning()
    this.surface?.dispose()
    this.confetti?.stop()
    gsap.killTweensOf('*')
    this.shake?.remove()
  }
}
