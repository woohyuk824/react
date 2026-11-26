// GoldConfettiGraphic (GO_GoldConfetti/GoldFoil) 의 조각 생성·운동 식을 canvas 2D 로 옮긴다.
// 곡면 리본 메시는 회전에 따른 단축(cos) 과 앞/뒷면 명암으로 근사한다.

// System.Random 과 같은 수열은 아니므로 시드 고정 의사난수로 분포만 맞춘다.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CFG = {
  count: 112, seed: 74209, burstSpeed: 1450, duration: 4.8, pieceScale: 1.3, fallSpeedScale: 3.7,
  fallResponse: 4, upwardSpeed: 1150, flutterScale: 0.5, spinDamping: 0.85, depthScale: 0.4, ribbonLengthScale: 0.8,
}
const GOLD = [255, 219, 153] // _Gold (1,.86,.6)
const HIGHLIGHT = [255, 245, 219] // _HighlightColor (1,.96,.86)
const EDGE = [255, 240, 194] // _EdgeColor (1,.94,.76)

interface Piece {
  vx: number; vy: number; sx: number; sy: number
  ax: number; ay: number; az: number; spx: number; spy: number; spz: number
  w: number; len: number; curl: number; depth: number; drag: number; fall: number
  phase: number; delay: number; life: number; tint: number; persp: number
}

function smooth(x: number) {
  const t = Math.min(1, Math.max(0, x))
  return t * t * (3 - 2 * t)
}

export class GoldConfetti {
  canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private pieces: Piece[] = []
  private start = 0
  private raf = 0
  private w: number
  private h: number

  constructor(w: number, h: number) {
    this.w = w
    this.h = h
    this.canvas = document.createElement('canvas')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    this.canvas.width = w * dpr
    this.canvas.height = h * dpr
    Object.assign(this.canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' })
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.scale(dpr, dpr)
    const U = mulberry32(CFG.seed)
    const R = (a: number, b: number) => a + (b - a) * U()
    for (let i = 0; i < CFG.count; i++) {
      const a = R(0, Math.PI * 2)
      const speed = CFG.burstSpeed * R(0.65, 1.25)
      const dist = R(0, 9)
      const type = U()
      let w: number, len: number
      if (type < 0.12) { w = R(7, 19); len = R(45, 70) * CFG.ribbonLengthScale }
      else if (type < 0.4) { w = R(7, 13); len = R(28, 44) }
      else { w = R(7, 13); len = R(13, 27) }
      let curl = R(-3.5, 3.5)
      if (Math.abs(curl) < 0.4) curl = Math.sign(curl || 1) * 0.4
      R(-0.7, 0.7) // twist
      const depth = R(-180, 350)
      this.pieces.push({
        vx: Math.cos(a) * speed, vy: Math.sin(a) * speed * 0.9 + CFG.upwardSpeed,
        sx: Math.cos(a) * dist, sy: Math.sin(a) * dist,
        ax: R(0, 360), ay: R(0, 360), az: R(0, 360),
        spx: R(90, 330), spy: R(-250, 250), spz: R(-170, 170),
        w, len, curl, depth, drag: R(1.65, 2.65), fall: R(130, 240), phase: R(0, Math.PI * 2),
        delay: R(0, 0.09), life: CFG.duration * R(0.7, 1), tint: R(0.83, 1),
        persp: 900 / (900 + depth * CFG.depthScale),
      })
    }
    this.pieces.sort((p, q) => q.depth - p.depth)
  }

  play() {
    cancelAnimationFrame(this.raf)
    this.start = performance.now()
    const tick = () => {
      const t = (performance.now() - this.start) / 1000
      this.render(t)
      if (t < CFG.duration) this.raf = requestAnimationFrame(tick)
      else this.ctx.clearRect(0, 0, this.w, this.h)
    }
    this.raf = requestAnimationFrame(tick)
  }

  stop() {
    cancelAnimationFrame(this.raf)
    this.ctx.clearRect(0, 0, this.w, this.h)
  }

  private render(t: number) {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.w, this.h)
    const unit = Math.min(this.w, this.h) / 1080
    const cx = this.w / 2, cy = this.h / 2
    for (const p of this.pieces) {
      const age = t - p.delay
      if (age <= 0) continue
      const travel = (1 - Math.exp(-p.drag * age)) / p.drag
      const resp = CFG.fallResponse
      const fall = p.fall * CFG.fallSpeedScale * (age - (1 - Math.exp(-resp * age)) / resp)
      const flutter = 1 - Math.exp(-2 * age)
      let x = p.sx + p.vx * travel
      let y = p.sy + p.vy * travel
      x += (Math.sin(3 * age + p.phase) - Math.sin(p.phase)) * 26 * flutter * CFG.flutterScale
      y -= fall
      y += Math.sin(2.3 * age + p.phase) * 9 * flutter * CFG.flutterScale
      const alpha = smooth(age / 0.035) * (1 - smooth((age - p.life + 0.7) / 0.7))
      if (alpha <= 0.001) continue
      const spin = (1 - Math.exp(-CFG.spinDamping * age)) / CFG.spinDamping + 0.3 * age
      const rx = ((p.ax + p.spx * spin) * Math.PI) / 180
      const ry = ((p.ay + p.spy * spin) * Math.PI) / 180
      const rz = ((p.az + p.spz * spin) * Math.PI) / 180
      const k = p.persp * unit * CFG.pieceScale
      const fw = Math.cos(ry) // 폭 방향 단축
      const fl = Math.cos(rx) // 길이 방향 단축
      const facing = Math.abs(fw * fl)
      const col = facing > 0.75 ? HIGHLIGHT : facing < 0.25 ? EDGE : GOLD
      const shade = (0.55 + 0.45 * facing) * p.tint
      ctx.save()
      ctx.translate(cx + x * unit, cy - y * unit)
      ctx.rotate(-rz)
      ctx.globalAlpha = alpha
      ctx.fillStyle = `rgb(${col[0] * shade},${col[1] * shade},${col[2] * shade})`
      const hw = (p.w * k * Math.max(0.08, Math.abs(fw))) / 2
      const hl = (p.len * k * Math.max(0.08, Math.abs(fl))) / 2
      // 곡면 리본: 길이 방향으로 휜 사각형
      const bend = p.curl * hl * 0.12 * Math.sin(spin * 2 + p.phase)
      ctx.beginPath()
      ctx.moveTo(-hw, -hl)
      ctx.quadraticCurveTo(-hw + bend, 0, -hw, hl)
      ctx.lineTo(hw, hl)
      ctx.quadraticCurveTo(hw + bend, 0, hw, -hl)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
  }
}
