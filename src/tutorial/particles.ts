import { assetUrl } from '../unity/rect'

// AssetKits ParticleImage 의 결과 화면 광원(GO_LightEffect) 설정만 옮긴 최소 이미터.
// shape Circle, emitOnSurface, rate/초, prewarm, 수명 동안 알파 그라디언트·크기 커브 적용.
// startSpeed 는 ParticleImage 단위(×100 px/s)로 본다.

type Key = [number, number]
export interface EmitterCfg {
  sprite: string
  rate: number
  lifetime: number
  size: [number, number]
  speed: number
  color: [number, number, number, number]
  alpha: Key[]
  sizeCurve: Key[]
  radius: number
  prewarm: boolean
  randomRotation?: boolean
  additive?: boolean
}

function curve(keys: Key[], t: number) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1]
      const [t1, v1] = keys[i]
      return v0 + ((v1 - v0) * (t - t0)) / Math.max(1e-6, t1 - t0)
    }
  }
  return keys[keys.length - 1][1]
}

interface P { born: number; x: number; y: number; vx: number; vy: number; size: number; rot: number }

export class Emitter {
  private cfg: EmitterCfg
  private img = new Image()
  private ps: P[] = []
  private acc = 0
  private t = 0

  constructor(cfg: EmitterCfg) {
    this.cfg = cfg
    this.img.src = assetUrl(cfg.sprite)
    if (cfg.prewarm) for (let i = 0; i < cfg.lifetime * 60; i++) this.step(1 / 60)
  }

  private spawn() {
    const a = Math.random() * Math.PI * 2
    const r = this.cfg.radius
    const sp = this.cfg.speed * 100
    this.ps.push({
      born: this.t, x: Math.cos(a) * r, y: Math.sin(a) * r, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
      size: this.cfg.size[0] + Math.random() * (this.cfg.size[1] - this.cfg.size[0]),
      rot: this.cfg.randomRotation ? Math.random() * Math.PI * 2 : 0,
    })
  }

  step(dt: number) {
    this.t += dt
    this.acc += dt * this.cfg.rate
    while (this.acc >= 1) { this.acc -= 1; this.spawn() }
    for (const p of this.ps) { p.x += p.vx * dt; p.y += p.vy * dt }
    this.ps = this.ps.filter((p) => this.t - p.born < this.cfg.lifetime)
  }

  draw(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
    if (!this.img.complete) return
    const c = this.cfg
    ctx.globalCompositeOperation = c.additive ? 'lighter' : 'source-over'
    for (const p of this.ps) {
      const life = (this.t - p.born) / c.lifetime
      const a = curve(c.alpha, life) * c.color[3]
      const s = p.size * curve(c.sizeCurve, life)
      ctx.globalAlpha = Math.max(0, Math.min(1, a))
      ctx.save()
      ctx.translate(cx + p.x, cy - p.y)
      if (p.rot) ctx.rotate(p.rot)
      ctx.drawImage(this.img, -s / 2, -s / 2, s, s)
      ctx.restore()
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }
}

/** GO_LightEffect 묶음 (GO_LightEffect, PI_Light, Particle Image ×2) */
export function resultLightEmitters(): Emitter[] {
  return [
    new Emitter({ sprite: 'unity/_Images/Effect/Effect_Ellipse.png', rate: 2, lifetime: 4, size: [600, 600], speed: 0,
      color: [255, 231, 153, 1], alpha: [[0, 1], [1, 0]], sizeCurve: [[0, 1], [1, 2]], radius: 0, prewarm: false }),
    new Emitter({ sprite: 'unity/_Images/Effect/Effect_Light.png', rate: 3, lifetime: 4, size: [500, 500], speed: 0,
      color: [255, 255, 255, 0.392], alpha: [[0, 0], [0.291, 1], [0.312, 1], [0.4, 0], [1, 0]], sizeCurve: [[0, 1], [0.5, 2], [1, 1]],
      radius: 0, prewarm: true, randomRotation: true, additive: true }),
    new Emitter({ sprite: 'unity/_Images/Effect/Effect_SliderLight.png', rate: 10, lifetime: 1, size: [30, 60], speed: 2,
      color: [255, 255, 255, 0.502], alpha: [[0, 1], [0.5, 1], [1, 0]], sizeCurve: [[0, 1], [1, 1]], radius: 200, prewarm: true }),
    new Emitter({ sprite: 'unity/_Images/Effect/Effect_Star.png', rate: 10, lifetime: 1, size: [80, 100], speed: 2,
      color: [255, 255, 255, 0.502], alpha: [[0, 1], [0.5, 1], [1, 0]], sizeCurve: [[0, 1], [1, 1]], radius: 200, prewarm: true }),
  ]
}

export class ParticleLayer {
  canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private raf = 0
  private last = 0
  private w: number
  private h: number
  private emitters: Emitter[]

  constructor(w: number, h: number, emitters: Emitter[]) {
    this.w = w
    this.h = h
    this.emitters = emitters
    this.canvas = document.createElement('canvas')
    this.canvas.width = w
    this.canvas.height = h
    Object.assign(this.canvas.style, { position: 'absolute', left: '0', top: '0', width: w + 'px', height: h + 'px', pointerEvents: 'none' })
    this.ctx = this.canvas.getContext('2d')!
  }

  start() {
    this.last = performance.now()
    const tick = (now: number) => {
      this.raf = requestAnimationFrame(tick)
      const dt = Math.min(0.1, (now - this.last) / 1000)
      this.last = now
      this.ctx.clearRect(0, 0, this.w, this.h)
      for (const e of this.emitters) { e.step(dt); e.draw(this.ctx, this.w / 2, this.h / 2) }
    }
    this.raf = requestAnimationFrame(tick)
  }

  stop() {
    cancelAnimationFrame(this.raf)
  }
}
