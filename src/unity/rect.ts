import type { UNode, ImageData, TextData } from './types'

// Unity RectTransform(앵커·피벗·anchoredPosition·sizeDelta, y 위쪽)을 CSS 절대 배치로 옮긴다.
// 한 번 DOM을 만들고 이후 변경(활성·스프라이트·문구·트윈)은 Unity처럼 노드를 직접 조작한다.

const BASE = import.meta.env.BASE_URL

export function assetUrl(src: string): string {
  return BASE + src.replace(/^\/+/, '')
}

export interface UElement extends HTMLDivElement {
  unode: UNode
  /** 부모 기준 크기 (px) */
  rectW: number
  rectH: number
  /** 이미지 레이어(스프라이트 교체용) */
  imageLayer?: HTMLDivElement
  textLayer?: HTMLSpanElement
}

export class NodeRegistry {
  private byPath = new Map<string, UElement>()
  private byName = new Map<string, UElement[]>()

  add(path: string, el: UElement) {
    this.byPath.set(path, el)
    const list = this.byName.get(el.unode.name) ?? []
    list.push(el)
    this.byName.set(el.unode.name, list)
  }

  /** 경로 끝부분 일치(예: "Button_Draw/GO_PlayInfo/Text_PlayInfo") 또는 고유 이름 */
  get(key: string): UElement {
    const exact = this.byPath.get(key)
    if (exact) return exact
    if (!key.includes('/')) {
      const list = this.byName.get(key)
      if (list && list.length > 0) return list[0]
    }
    for (const [p, el] of this.byPath) if (p.endsWith('/' + key)) return el
    throw new Error('Unity node not found: ' + key)
  }

  find(key: string): UElement | undefined {
    try {
      return this.get(key)
    } catch {
      return undefined
    }
  }
}

function rgba(hex: string | undefined, alpha = 1): string {
  const h = (hex ?? '#FFFFFF').replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function isWhite(hex?: string) {
  return !hex || hex.toUpperCase() === '#FFFFFF'
}

/** 부모 크기 기준으로 노드의 CSS 박스를 계산한다. */
export function computeRect(n: UNode, pw: number, ph: number) {
  const w = (n.aMax[0] - n.aMin[0]) * pw + n.size[0]
  const h = (n.aMax[1] - n.aMin[1]) * ph + n.size[1]
  const refX = (n.aMin[0] + (n.aMax[0] - n.aMin[0]) * n.pivot[0]) * pw
  const refY = (n.aMin[1] + (n.aMax[1] - n.aMin[1]) * n.pivot[1]) * ph
  const pivotX = refX + n.pos[0]
  const pivotY = refY + n.pos[1]
  const left = pivotX - n.pivot[0] * w
  const bottom = pivotY - n.pivot[1] * h
  return { left, top: ph - (bottom + h), w, h, pivotX, pivotY }
}

export function applyRect(el: UElement, pw: number, ph: number) {
  const n = el.unode
  const r = computeRect(n, pw, ph)
  el.rectW = r.w
  el.rectH = r.h
  el.style.left = r.left + 'px'
  el.style.top = r.top + 'px'
  el.style.width = r.w + 'px'
  el.style.height = r.h + 'px'
  el.style.transformOrigin = `${n.pivot[0] * 100}% ${(1 - n.pivot[1]) * 100}%`
}

/** 앵커 기준 anchoredPosition 을 다시 쓴다 (DOAnchorPos 대응). */
export function setAnchoredPos(el: UElement, x: number, y: number) {
  el.unode.pos = [x, y]
  const parent = el.parentElement as UElement | null
  applyRect(el, parent?.rectW ?? 1080, parent?.rectH ?? 2160)
}

export function setSizeDelta(el: UElement, w: number, h: number) {
  el.unode.size = [w, h]
  const parent = el.parentElement as UElement | null
  applyRect(el, parent?.rectW ?? 1080, parent?.rectH ?? 2160)
  for (const c of Array.from(el.children)) if ((c as UElement).unode) relayout(c as UElement)
}

function relayout(el: UElement) {
  const parent = el.parentElement as UElement | null
  applyRect(el, parent?.rectW ?? 1080, parent?.rectH ?? 2160)
  for (const c of Array.from(el.children)) if ((c as UElement).unode) relayout(c as UElement)
}

export function setActive(el: UElement, on: boolean) {
  el.unode.active = on
  el.style.display = on ? (el.unode.text ? 'flex' : '') : 'none'
}

export function setImageSrc(el: UElement, src: string | null) {
  if (!el.unode.image) el.unode.image = { src }
  else el.unode.image.src = src
  paintImage(el)
}

export function setText(el: UElement, text: string) {
  if (el.textLayer) el.textLayer.textContent = text
  if (el.unode.text) el.unode.text.text = text
  fitContent(el)
}

/** ContentSizeFitter PreferredSize: 문구 크기에 맞춰 sizeDelta 를 갱신한다. */
export function fitContent(el: UElement) {
  const f = el.unode.sizeFitter
  const span = el.textLayer
  if (!f || !span || (f.h !== 2 && f.v !== 2)) return
  const w = f.h === 2 ? span.offsetWidth : el.unode.size[0]
  const h = f.v === 2 ? span.offsetHeight : el.unode.size[1]
  if (w === 0 && h === 0) return
  setSizeDelta(el, w, h)
}

export function fitAll(root: HTMLElement) {
  root.querySelectorAll<UElement>('[data-u]').forEach((el) => fitContent(el))
  layoutAll(root)
}

type LG = { kind: 'H' | 'V' | 'Grid'; spacing?: number; padding?: [number, number, number, number]; childAlign?: number; controlW?: boolean; controlH?: boolean }

/** 레이아웃 요소의 선호 크기 (LayoutElement → 문구 크기 → sizeDelta) */
function preferred(el: UElement): [number, number] {
  const le = el.unode.layoutElement
  const span = el.textLayer
  const w = le?.prefW ?? (span ? span.offsetWidth : el.unode.size[0])
  const h = le?.prefH ?? (span ? span.offsetHeight : el.unode.size[1])
  return [Math.max(w, le?.minW ?? 0), Math.max(h, le?.minH ?? 0)]
}

/** Horizontal/VerticalLayoutGroup: 활성 자식을 선호 크기로 쌓고 childAlign 으로 정렬한다. */
export function layoutGroup(el: UElement) {
  const g = el.unode.layoutGroup as LG | undefined
  if (!g || g.kind === 'Grid') return
  const kids = Array.from(el.children).filter((c) => (c as UElement).unode?.active && !(c as UElement).unode.layoutElement?.ignore) as UElement[]
  const [pl, pr, pt, pb] = g.padding ?? [0, 0, 0, 0]
  const sp = g.spacing ?? 0
  const sizes = kids.map((k) => {
    const [pw, ph] = preferred(k)
    return [g.controlW === false ? k.unode.size[0] : pw, g.controlH === false ? k.unode.size[1] : ph] as [number, number]
  })
  const vertical = g.kind === 'V'
  const mainTotal = sizes.reduce((a, s) => a + (vertical ? s[1] : s[0]), 0) + sp * Math.max(0, kids.length - 1)
  const crossMax = sizes.reduce((a, s) => Math.max(a, vertical ? s[0] : s[1]), 0)
  // ContentSizeFitter PreferredSize 를 그룹에 적용
  const f = el.unode.sizeFitter
  if (f?.h === 2 || f?.v === 2) {
    const w = f.h === 2 ? (vertical ? crossMax : mainTotal) + pl + pr : el.unode.size[0]
    const h = f.v === 2 ? (vertical ? mainTotal : crossMax) + pt + pb : el.unode.size[1]
    el.unode.size = [w, h]
    const parent = el.parentElement as UElement | null
    applyRect(el, parent?.rectW ?? 1080, parent?.rectH ?? 2160)
  }
  const W = el.rectW, H = el.rectH
  const align = g.childAlign ?? 0
  const col = align % 3, row = Math.floor(align / 3) // 0 왼/위, 1 가운데, 2 오른/아래
  let cursor = vertical
    ? pt + (H - pt - pb - mainTotal) * (row / 2)
    : pl + (W - pl - pr - mainTotal) * (col / 2)
  kids.forEach((k, i) => {
    const [w, h] = sizes[i]
    const left = vertical ? pl + (W - pl - pr - w) * (col / 2) : cursor
    const top = vertical ? cursor : pt + (H - pt - pb - h) * (row / 2)
    cursor += (vertical ? h : w) + sp
    k.unode.aMin = [0, 1]
    k.unode.aMax = [0, 1]
    k.unode.size = [w, h]
    k.unode.pos = [left + k.unode.pivot[0] * w, -(top + (1 - k.unode.pivot[1]) * h)]
    applyRect(k, W, H)
  })
}

export function layoutAll(root: HTMLElement) {
  root.querySelectorAll<UElement>('[data-u]').forEach((el) => layoutGroup(el))
}

function paintImage(el: UElement) {
  const img = el.unode.image
  const layer = el.imageLayer
  if (!img || !layer) return
  const alpha = img.alpha ?? 1
  layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;'
  if (!img.src) {
    // 스프라이트 없는 Image 는 색 사각형으로 그린다.
    layer.style.background = rgba(img.color, alpha)
    return
  }
  const url = `url("${assetUrl(img.src)}")`
  const tinted = !isWhite(img.color)

  // AX/Circles 원형 템플릿 스프라이트: 반지름 = 한 변/2 ÷ ppuMul 인 둥근 사각형 + 색
  const circle = /Circles\/Circle_?@_?(\d+)x\d+/i.exec(img.src)
  if (circle) {
    const k = 1 / (img.ppuMul ?? 1)
    layer.style.background = rgba(img.color, alpha)
    layer.style.borderRadius = img.type === 'Sliced' ? `${(Number(circle[1]) / 2) * k}px` : '50%'
    return
  }

  if (img.type === 'Sliced' && img.border) {
    const [l, b, r, t] = img.border
    const k = 1 / (img.ppuMul ?? 1)
    const slice = `${t} ${r} ${b} ${l}`
    const widths = `${t * k}px ${r * k}px ${b * k}px ${l * k}px`
    if (tinted || isTemplateSprite(img.src)) {
      // 흰 템플릿 스프라이트 + 색: 스프라이트 모양을 마스크로 쓰고 색을 채운다.
      layer.style.background = rgba(img.color, 1)
      layer.style.setProperty('-webkit-mask-box-image', `${url} ${slice} fill / ${widths} stretch`)
      layer.style.setProperty('mask-border', `${url} ${slice} fill / ${widths} stretch`)
      layer.style.opacity = String(alpha)
    } else {
      layer.style.borderStyle = 'solid'
      layer.style.borderImage = `${url} ${slice} ${img.fillCenter === false ? '' : 'fill'} / ${widths} stretch`
      layer.style.opacity = String(alpha)
    }
    return
  }

  let size = '100% 100%'
  let pos = '0 0'
  if (img.spriteRect && img.texSize) {
    // 시트의 서브 스프라이트: 해당 영역만 노드 크기에 맞춘다.
    const [sx, sy, sw, sh] = img.spriteRect
    const [tw, th] = img.texSize
    size = `${(tw / sw) * 100}% ${(th / sh) * 100}%`
    pos = `${(sx / Math.max(1, tw - sw)) * 100}% ${(sy / Math.max(1, th - sh)) * 100}%`
  } else if (img.preserveAspect) {
    size = 'contain'
    pos = 'center'
  }
  layer.style.backgroundImage = url
  layer.style.backgroundSize = size
  layer.style.backgroundPosition = pos
  layer.style.backgroundRepeat = 'no-repeat'
  if (tinted) {
    layer.style.backgroundColor = rgba(img.color, 1)
    layer.style.backgroundBlendMode = 'multiply'
    layer.style.setProperty('-webkit-mask-image', url)
    layer.style.setProperty('mask-image', url)
    layer.style.setProperty('-webkit-mask-size', size)
    layer.style.setProperty('mask-size', size)
    layer.style.setProperty('-webkit-mask-position', pos)
    layer.style.setProperty('mask-position', pos)
    layer.style.setProperty('-webkit-mask-repeat', 'no-repeat')
    layer.style.setProperty('mask-repeat', 'no-repeat')
  }
  layer.style.opacity = String(alpha)
}

function isTemplateSprite(src: string) {
  return /Circles\//i.test(src) || /Image_Button\.png$/i.test(src)
}

const WEIGHT = { Bold: 700, Medium: 500, Regular: 400 } as const

/** Pretendard TMP 에셋 normalSpacingOffset -2.5 (em/100) → 모든 문구 자간 -0.025em. 크기는 fontSize 그대로. */
export const TMP_SPACING_EM = -0.025
/** TMP italicStyle 15 → 기준선 기준 0.15 기울임 */
export const TMP_ITALIC_SHEAR = 0.15

function paintText(el: UElement, t: TextData) {
  const span = document.createElement('span')
  span.textContent = t.text
  const box = el.style
  box.display = 'flex'
  box.alignItems =
    t.vAlign === 'top' ? 'flex-start' : t.vAlign === 'bottom' ? 'flex-end' : 'center'
  box.justifyContent =
    t.hAlign === 'left' ? 'flex-start' : t.hAlign === 'right' ? 'flex-end' : 'center'
  const s = span.style
  s.fontFamily = 'Pretendard, sans-serif'
  s.fontWeight = String(WEIGHT[t.weight ?? 'Regular'])
  s.fontSize = t.size + 'px'
  // TMP Pretendard FaceInfo: LineHeight 42 / PointSize 31
  s.lineHeight = String((42 / 31) * (1 + (t.lineSpacing ?? 0) / 100))
  s.color = rgba(t.color, t.alpha ?? 1)
  s.textAlign = t.hAlign ?? 'center'
  s.whiteSpace = t.wrap === false || fitsContent(el.unode) ? 'nowrap' : 'pre-wrap'
  s.wordBreak = 'keep-all' // TMP 는 한글 단어 중간에서 줄바꿈하지 않는다(overflow 0 = 넘침 허용)
  s.letterSpacing = TMP_SPACING_EM + (t.charSpacing ?? 0) / 100 + 'em'
  const m = (t as TextData & { margin?: [number, number, number, number] }).margin
  if (m) s.padding = `${m[1]}px ${m[2]}px ${m[3]}px ${m[0]}px` // TMP margin l,t,r,b
  s.pointerEvents = 'none'
  s.position = 'relative'
  el.textLayer = span
  el.appendChild(span)
}

function fitsContent(n: UNode) {
  return (n.sizeFitter?.h ?? 0) === 2 || n.size[0] === 0
}

let uid = 0

export function buildTree(
  n: UNode,
  pw: number,
  ph: number,
  reg: NodeRegistry,
  path = '',
): UElement {
  const el = document.createElement('div') as UElement
  el.unode = n
  el.dataset.u = n.name
  el.dataset.uid = String(uid++)
  el.style.position = 'absolute'
  applyRect(el, pw, ph)
  if (!n.active) el.style.display = 'none'

  const tr: string[] = []
  if (n.rotZ) tr.push(`rotate(${-n.rotZ}deg)`)
  if (n.scale && (n.scale[0] !== 1 || n.scale[1] !== 1)) tr.push(`scale(${n.scale[0]},${n.scale[1]})`)
  if (tr.length) el.style.transform = tr.join(' ')

  // Unity 레이캐스트 규칙: raycastTarget 인 Graphic·Button·조이스틱만 터치를 받고 나머지는 통과시킨다.
  // (예: GO_Finger 는 raycast 꺼짐 → 손가락 아래 버튼이 눌린다)
  const comps = n.components ?? []
  const raycast =
    (n.image as ImageData & { raycast?: boolean } | undefined)?.raycast === true ||
    (n.text as TextData & { raycast?: boolean } | undefined)?.raycast === true ||
    comps.includes('Button') || comps.includes('DrawingJoyStick')
  el.style.pointerEvents = raycast ? 'auto' : 'none'

  if (n.canvasGroup) el.style.opacity = String(n.canvasGroup.alpha)
  if (n.mask) {
    el.style.overflow = 'hidden'
    // 원형 Sliced 스프라이트 마스크는 둥근 모서리로 자른다.
    const img = n.image
    const circle = img?.src ? /Circles\/Circle_?@_?(\d+)x\d+/i.exec(img.src) : null
    if (n.mask.kind === 'Mask' && circle) {
      el.style.borderRadius = img?.type === 'Sliced' ? `${Number(circle[1]) / 2 / (img.ppuMul ?? 1)}px` : '50%'
    } else if (n.mask.kind === 'Mask' && img?.type === 'Sliced' && img.border) {
      el.style.borderRadius = img.border[0] / (img.ppuMul ?? 1) + 'px'
    } else if (n.mask.kind === 'Mask' && img?.src) {
      // 스프라이트 알파 모양으로 자식을 자른다.
      const url = `url("${assetUrl(img.src)}")`
      el.style.setProperty('-webkit-mask-image', url)
      el.style.setProperty('mask-image', url)
      el.style.setProperty('-webkit-mask-size', '100% 100%')
      el.style.setProperty('mask-size', '100% 100%')
    }
  }

  const graphic = n.image ?? (n.rawImage ? { ...n.rawImage, type: 'Simple' as const } : undefined)
  const hideGraphic = n.mask && n.mask.showGraphic === false
  if (graphic && !hideGraphic) {
    if (!n.image) n.image = graphic as ImageData
    el.imageLayer = document.createElement('div')
    el.appendChild(el.imageLayer)
    paintImage(el)
  }
  if (n.text) paintText(el, n.text)
  if (!n.active) el.style.display = 'none'

  // 정적 TrueShadow (켜진 것만): size → 블러, angle/dist → 오프셋(Unity angle 90 = 아래)
  const shadows = (n as UNode & { trueShadows?: { enabled: boolean; size: number; angle: number; dist: number; color: string; alpha: number }[] })
    .trueShadows?.filter((s) => s.enabled && s.size > 0)
  if (shadows?.length) {
    const f = shadows
      .map((s) => {
        const rad = (s.angle * Math.PI) / 180
        return `drop-shadow(${Math.cos(rad) * s.dist}px ${Math.sin(rad) * s.dist}px ${s.size / 2}px ${rgba(s.color, s.alpha)})`
      })
      .join(' ')
    const target = el.imageLayer ?? el.textLayer
    if (target) target.style.filter = f
  }

  // UILayerBlur: 뒤 화면 블러 + 색 tint 비율
  const layerBlur = (n as UNode & { props?: { UILayerBlur?: { radius?: number; tint?: number } } }).props?.UILayerBlur
  if (layerBlur && el.imageLayer && n.image && !n.image.src) {
    el.imageLayer.style.background = rgba(n.image.color, layerBlur.tint ?? 1)
    el.style.setProperty('backdrop-filter', `blur(${layerBlur.radius ?? 0}px)`)
    el.style.setProperty('-webkit-backdrop-filter', `blur(${layerBlur.radius ?? 0}px)`)
  }

  const myPath = path + '/' + n.name
  reg.add(myPath, el)
  for (const c of n.children ?? []) el.appendChild(buildTree(c, el.rectW, el.rectH, reg, myPath))
  return el
}
