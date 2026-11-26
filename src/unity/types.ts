// tools/ 의 추출 스크립트가 Unity 프리팹 YAML에서 만든 노드 형식.
export type Vec2 = [number, number]

export interface ImageData {
  src: string | null
  type?: 'Simple' | 'Sliced' | 'Tiled' | 'Filled'
  color?: string
  alpha?: number
  ppuMul?: number
  border?: [number, number, number, number] // left, bottom, right, top (sprite px)
  texSize?: Vec2
  spriteRect?: [number, number, number, number] // x, y(top), w, h
  preserveAspect?: boolean
  fillCenter?: boolean
  materialPath?: string
}

export interface TextData {
  text: string
  weight?: 'Bold' | 'Medium' | 'Regular'
  size: number
  autoSize?: boolean
  sizeMin?: number
  sizeMax?: number
  color?: string
  alpha?: number
  hAlign?: 'left' | 'center' | 'right'
  vAlign?: 'top' | 'middle' | 'bottom' | 'geometry'
  wrap?: boolean
  lineSpacing?: number
  charSpacing?: number
}

export interface UNode {
  name: string
  active: boolean
  aMin: Vec2
  aMax: Vec2
  pos: Vec2
  size: Vec2
  pivot: Vec2
  rotZ?: number
  scale?: Vec2
  image?: ImageData
  rawImage?: { src: string | null; color?: string; alpha?: number; uvRect?: [number, number, number, number] }
  text?: TextData
  canvasGroup?: { alpha: number }
  mask?: { kind: 'Mask' | 'RectMask2D'; showGraphic?: boolean }
  layoutGroup?: {
    kind: 'H' | 'V' | 'Grid'
    spacing?: number
    padding?: [number, number, number, number]
    childAlign?: number
  }
  layoutElement?: { minW?: number; minH?: number; prefW?: number; prefH?: number; ignore?: boolean }
  sizeFitter?: { h?: number; v?: number }
  components?: string[]
  button?: { transition?: number; pressed?: string; disabled?: string; highlighted?: string }
  children?: UNode[]
}
