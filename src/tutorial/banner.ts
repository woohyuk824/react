import gsap from 'gsap'
import { setSizeDelta, TMP_SPACING_EM, type UElement } from '../unity/rect'

// PlayMainWinnerBanner.InitTutorial + PlayMainWinnerBannerCell.
// 튜토리얼 데이터는 하드코딩 3건 (서버 호출 없음), 시각 = 현재 - N분 (HH:mm).
const ROWS = [
  { nick: '캐치회원', price: 890000, minutes: 60 },
  { nick: '행운회원', price: 1500000, minutes: 12 },
  { nick: '캐치유회원', price: 350000, minutes: 3 },
]

const measureCtx = document.createElement('canvas').getContext('2d')!
// 배너 인스턴스 오버라이드: Text_Info Medium 40, Text_Time Regular 36 (TMP 자간 -0.025em 포함)
const INFO_SIZE = 40
const TIME_SIZE = 36
function textWidth(text: string, weight: number) {
  const size = weight === 500 ? INFO_SIZE : TIME_SIZE
  measureCtx.font = `${weight} ${size}px Pretendard, sans-serif`
  return measureCtx.measureText(text).width + [...text].length * size * TMP_SPACING_EM
}

function hhmm(minutesAgo: number) {
  if (new URLSearchParams(location.search).has('snap')) return '10:00' // 검수 스냅샷 고정 시각
  const d = new Date(Date.now() - minutesAgo * 60000)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

interface Row { el: HTMLDivElement; info: HTMLSpanElement; time: HTMLSpanElement; width: number }

export class WinnerBanner {
  private el: UElement
  private clip: HTMLDivElement
  private rows: Row[] = []
  private index = 0
  private timer = 0
  private tl?: gsap.core.Timeline

  constructor(el: UElement) {
    this.el = el
    el.style.opacity = '0'
    el.style.pointerEvents = 'none' // 튜토리얼: blocksRaycasts false
    // 프리팹의 RT_Clip 이하를 직접 구성한다.
    for (const c of Array.from(el.children)) if (c !== el.imageLayer) c.remove()
    this.clip = document.createElement('div')
    Object.assign(this.clip.style, { position: 'absolute', inset: '0', overflow: 'hidden' })
    el.appendChild(this.clip)
    for (let i = 0; i < 2; i++) {
      const row = document.createElement('div')
      Object.assign(row.style, {
        position: 'absolute', left: '0', right: '0', top: '50%', height: '56px', marginTop: '-28px',
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', whiteSpace: 'nowrap',
        fontFamily: 'Pretendard, sans-serif', color: '#fff', lineHeight: '56px', letterSpacing: TMP_SPACING_EM + 'em',
      })
      const info = document.createElement('span')
      info.style.fontWeight = '500'
      info.style.fontSize = INFO_SIZE + 'px'
      const time = document.createElement('span')
      time.style.fontWeight = '400'
      time.style.fontSize = TIME_SIZE + 'px'
      row.append(info, time)
      this.clip.appendChild(row)
      this.rows.push({ el: row, info, time, width: 0 })
    }
  }

  private maxWidth() {
    const parent = this.el.parentElement as UElement | null
    return Math.min(800, (parent?.rectW ?? 1080) - 96)
  }

  private fill(row: Row, i: number) {
    const d = ROWS[i % ROWS.length]
    const suffix = ` 님 ${d.price.toLocaleString('en-US')}원 당첨`
    const time = hhmm(d.minutes)
    const timeW = textWidth(time, 400)
    const infoLimit = this.maxWidth() - 64 - 28 - timeW
    let nick = d.nick
    if (textWidth(nick + suffix, 500) > infoLimit) {
      let end = nick.length
      while (end > 3 && textWidth(nick.slice(0, end) + '…' + suffix, 500) > infoLimit) end--
      nick = nick.slice(0, end) + '…'
    }
    row.info.textContent = nick + suffix
    row.time.textContent = time
    row.width = Math.min(infoLimit, textWidth(row.info.textContent, 500)) + timeW + 28 + 64
  }

  initTutorial() {
    const [a, b] = this.rows
    this.fill(a, 0)
    a.el.style.transform = 'translateY(0)'
    a.el.style.opacity = '1'
    b.el.style.opacity = '0'
    setSizeDelta(this.el, a.width, 64)
    this.el.style.transformOrigin = '50% 50%'
    gsap.fromTo(this.el, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(1.70158)' })
    gsap.fromTo(this.el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' })
    this.index = 0
    this.timer = window.setInterval(() => this.next(), 5000)
  }

  private next() {
    const cur = this.rows[this.index % 2]
    const nxt = this.rows[(this.index + 1) % 2]
    this.index++
    this.fill(nxt, this.index)
    const w = { v: this.el.unode.size[0] }
    this.tl = gsap.timeline()
    // 현재 행: 아래로 빠짐 (Unity y 0→-64 → CSS +64)
    this.tl.to(cur.el, { y: 64, opacity: 0, duration: 0.16, ease: 'power2.in' })
    this.tl.to(w, { v: nxt.width, duration: 0.12, ease: 'sine.out', onUpdate: () => setSizeDelta(this.el, w.v, 64) })
    this.tl.fromTo(nxt.el, { y: -64, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' })
  }

  pause() {
    window.clearInterval(this.timer)
    this.tl?.pause()
  }

  dispose() {
    this.pause()
  }
}
