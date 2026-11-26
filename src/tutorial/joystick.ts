import gsap from 'gsap'
import { setAnchoredPos, type UElement } from '../unity/rect'
import { unlockAudio } from './sound'

// DrawingJoyStick (DrawingType.all, is_guide false, inertia true).
export class Joystick {
  private claw: UElement
  private hands: UElement[]
  private frames: [number, number, number, number][]
  private setFrame: (rect: [number, number, number, number]) => void
  private dir = 0
  private strong = false
  private manual = false
  private lastInput = performance.now()
  private auto?: gsap.core.Tween
  private autoRunning = false
  private playMotion = false
  private paused = false
  private angle = 0
  private swingSpeed = 0
  private prevSpeed = 0
  private prevX = 0
  private atWall = 0
  private raf = 0
  private last = performance.now()
  onWallImpact: (side: number) => void = () => {}

  constructor(
    stick: UElement, claw: UElement, hands: UElement[],
    frames: [number, number, number, number][],
    setFrame: (rect: [number, number, number, number]) => void,
  ) {
    this.claw = claw
    this.hands = hands
    this.frames = frames
    this.setFrame = setFrame
    setAnchoredPos(claw, 0, claw.unode.pos[1])
    this.prevX = 0
    this.showFrame()
    stick.style.touchAction = 'none'
    stick.style.cursor = 'grab'
    const onMove = (e: PointerEvent) => {
      const r = stick.getBoundingClientRect()
      const scale = r.width / stick.rectW
      const lx = (e.clientX - (r.left + r.width / 2)) / scale
      this.dir = lx < -30 ? -1 : lx > 30 ? 1 : 0
      this.strong = Math.abs(lx) > 100
      this.showFrame()
    }
    stick.addEventListener('pointerdown', (e) => {
      unlockAudio()
      if (this.playMotion) return
      stick.setPointerCapture(e.pointerId)
      this.manual = true
      this.stopAuto()
      onMove(e)
    })
    stick.addEventListener('pointermove', (e) => { if (stick.hasPointerCapture(e.pointerId)) onMove(e) })
    const up = () => { this.dir = 0; this.strong = false; this.lastInput = performance.now(); this.showFrame() }
    stick.addEventListener('pointerup', up)
    stick.addEventListener('pointercancel', up)
    this.raf = requestAnimationFrame(this.tick)
  }

  private showFrame() {
    // 0 좌강 1 좌약 2 중앙 3 우약 4 우강
    const idx = this.dir === 0 ? 2 : this.dir < 0 ? (this.strong ? 0 : 1) : this.strong ? 4 : 3
    const f = this.frames[idx]
    if (f) this.setFrame(f)
  }

  private stopAuto() {
    this.auto?.kill()
    this.auto = undefined
    this.autoRunning = false
  }

  private startAuto() {
    this.autoRunning = true
    const x = this.claw.unode.pos[0]
    const first = x >= 0 ? 400 : -400
    const state = { x }
    const moveTo = (target: number, duration: number, then: () => void) => {
      this.auto = gsap.to(state, {
        x: target, duration, ease: 'sine.inOut',
        onUpdate: () => setAnchoredPos(this.claw, state.x, this.claw.unode.pos[1]),
        onComplete: then,
      })
    }
    const loop = (to: number) => moveTo(to, 800 / 180, () => loop(-to))
    moveTo(first, Math.abs(first - x) / 180, () => loop(-first))
  }

  setPlayMotion(on: boolean) {
    this.playMotion = on
    if (on) {
      this.stopAuto()
      this.dir = 0
      this.angle = 0
      this.swingSpeed = 0
      this.applyAngle()
      this.showFrame()
    }
  }

  setPaused(p: boolean) {
    this.paused = p
    if (p) this.auto?.pause()
    else this.auto?.resume()
  }

  private applyAngle() {
    for (const h of this.hands) h.style.transform = `rotate(${-this.angle}deg)`
  }

  private tick = (now: number) => {
    this.raf = requestAnimationFrame(this.tick)
    const frameDt = Math.min(0.1, (now - this.last) / 1000)
    this.last = now
    if (this.paused || frameDt <= 0) return
    let x = this.claw.unode.pos[0]
    if (!this.playMotion) {
      if (this.dir !== 0) {
        x = Math.max(-400, Math.min(400, x + this.dir * 300 * frameDt))
        setAnchoredPos(this.claw, x, this.claw.unode.pos[1])
      }
      if (!this.manual && !this.autoRunning && now - this.lastInput > 3000) this.startAuto()
      // 벽 충돌: 수동 이력 있음 + 자동 아님 + ±400 첫 접촉
      const side = x >= 400 ? 1 : x <= -400 ? -1 : 0
      if (side !== 0 && side !== this.atWall && this.manual && !this.autoRunning) {
        this.swingSpeed += side * 300 * 0.28
        this.onWallImpact(side)
      }
      this.atWall = side
    }
    // 진자 물리
    const speed = (x - this.prevX) / frameDt
    this.prevX = x
    if (!this.playMotion) {
      this.swingSpeed -= (speed - this.prevSpeed) * 0.18
      this.swingSpeed = Math.max(-180, Math.min(180, this.swingSpeed))
      this.prevSpeed = speed
      let remain = frameDt
      while (remain > 1e-6) {
        const dt = Math.min(1 / 120, remain)
        remain -= dt
        this.swingSpeed += (-45 * this.angle - 4 * this.swingSpeed) * dt
        this.angle += this.swingSpeed * dt
        if (Math.abs(this.angle) > 25) {
          this.angle = Math.sign(this.angle) * 25
          this.swingSpeed *= -0.35
        }
      }
      this.applyAngle()
    }
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    this.stopAuto()
  }
}
