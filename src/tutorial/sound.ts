import { assetUrl } from '../unity/rect'

// Unity Sound_Main 큐 대응. 브라우저는 첫 사용자 입력 전 소리 재생을 막으므로
// 첫 pointerdown 에서 오디오를 깨운다(스플래시 영상은 무음 자동재생).
let unlocked = false
const cache = new Map<string, HTMLAudioElement>()

export function unlockAudio() {
  if (unlocked) return
  unlocked = true
  for (const a of cache.values()) {
    a.muted = true
    a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false }).catch(() => { a.muted = false })
  }
}

export function isAudioUnlocked() {
  return unlocked
}

function get(src: string, volume: number) {
  let a = cache.get(src)
  if (!a) {
    a = new Audio(assetUrl(src))
    a.preload = 'auto'
    a.volume = volume
    cache.set(src, a)
  }
  return a
}

export const Sounds = {
  drawMove: 'unity/sound/Sound_DrawMove.m4a',
  playSelect: 'unity/sound/Sound_PlaySelect.m4a',
}

export function preloadSounds() {
  get(Sounds.drawMove, 0.5)
  get(Sounds.playSelect, 1)
}

/** 같은 소스를 Stop 후 다시 Play (DrawingClawSound / PlaySelectSound 동작) */
export function playSound(src: string, volume = 1) {
  if (!unlocked) return
  const a = get(src, volume)
  a.volume = volume
  a.pause()
  a.currentTime = 0
  a.play().catch(() => {})
}
