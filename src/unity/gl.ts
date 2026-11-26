// Unity UI 셰이더를 WebGL 로 옮겨 그리기 위한 최소 헬퍼.
// 각 효과는 노드 크기와 같은 canvas 를 노드의 이미지 레이어 자리에 겹쳐 그린다.

const VERT = `
attribute vec2 a;
varying vec2 uv;
void main(){ uv = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`

export type Uniform = number | [number, number] | [number, number, number] | [number, number, number, number]

export class GLSurface {
  canvas: HTMLCanvasElement
  gl: WebGLRenderingContext
  prog: WebGLProgram
  private tex = new Map<string, { t: WebGLTexture; unit: number }>()
  private uniforms = new Map<string, Uniform>()

  constructor(frag: string, w: number, h: number, dpr = Math.min(2, window.devicePixelRatio || 1)) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = Math.max(1, Math.round(w * dpr))
    this.canvas.height = Math.max(1, Math.round(h * dpr))
    Object.assign(this.canvas.style, {
      position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none',
    })
    const gl = this.canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true })
    if (!gl) throw new Error('WebGL unavailable')
    this.gl = gl
    const p = gl.createProgram()!
    for (const [type, src] of [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, 'precision highp float;\nvarying vec2 uv;\n' + frag]] as const) {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
      gl.attachShader(p, s)
    }
    gl.linkProgram(p)
    this.prog = p
    gl.useProgram(p)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(p, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    // 휴대폰은 동시에 유지할 수 있는 WebGL 컨텍스트 수가 적다. 브라우저가 컨텍스트를 회수하면
    // 캔버스가 비므로, 숨겨 두었던 원본 이미지(fallback)를 다시 보여 준다.
    this.canvas.addEventListener('webglcontextlost', () => {
      this.lost = true
      this.canvas.style.visibility = 'hidden'
      if (this.fallback) this.fallback.style.visibility = 'visible'
    })
  }

  /** 컨텍스트를 잃었을 때 다시 보여 줄 원본 이미지 레이어 */
  fallback?: HTMLElement
  lost = false

  /** 같은 컨텍스트를 다른 크기의 노드에 재사용할 때 캔버스 해상도를 바꾼다. */
  resize(w: number, h: number, dpr = Math.min(2, window.devicePixelRatio || 1)) {
    this.canvas.width = Math.max(1, Math.round(w * dpr))
    this.canvas.height = Math.max(1, Math.round(h * dpr))
  }

  setTexture(name: string, source: TexImageSource) {
    const gl = this.gl
    let entry = this.tex.get(name)
    if (!entry) {
      entry = { t: gl.createTexture()!, unit: this.tex.size }
      this.tex.set(name, entry)
    }
    gl.activeTexture(gl.TEXTURE0 + entry.unit)
    gl.bindTexture(gl.TEXTURE_2D, entry.t)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  }

  set(name: string, v: Uniform) {
    this.uniforms.set(name, v)
  }

  draw() {
    const gl = this.gl
    if (this.lost || gl.isContextLost()) return
    gl.useProgram(this.prog)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    for (const [name, e] of this.tex) {
      gl.activeTexture(gl.TEXTURE0 + e.unit)
      gl.bindTexture(gl.TEXTURE_2D, e.t)
      gl.uniform1i(gl.getUniformLocation(this.prog, name), e.unit)
    }
    for (const [name, v] of this.uniforms) {
      const l = gl.getUniformLocation(this.prog, name)
      if (!l) continue
      if (typeof v === 'number') gl.uniform1f(l, v)
      else if (v.length === 2) gl.uniform2fv(l, v)
      else if (v.length === 3) gl.uniform3fv(l, v)
      else gl.uniform4fv(l, v)
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  dispose() {
    this.canvas.remove()
    this.gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// ---------------------------------------------------------------------------
// DrawingThemeShine.shader + TutorialButtonIllumination.shader
// 이전 스프라이트 → 현재 스프라이트 대각 와이프(금색 띠) 위에 조명 세기를 얹는다.
export const BUTTON_FRAG = `
uniform sampler2D _MainTex;
uniform sampler2D _FromTex;
uniform float _Progress;      // 1 = 와이프 완료
uniform vec2 _ShineDirection;  // (sin45*w, -cos45*h)
uniform float _Intensity;
uniform vec3 _GlowColor;
void main(){
  vec4 to = texture2D(_MainTex, uv);
  vec4 from = texture2D(_FromTex, uv);
  vec2 d = _ShineDirection;
  float pos = (dot(uv, d) - min(0.0, d.x) - min(0.0, d.y)) / (abs(d.x) + abs(d.y));
  float edge = mix(-0.15, 1.15, _Progress);
  float reveal = 1.0 - smoothstep(edge - 0.035, edge + 0.035, pos);
  vec4 fp = vec4(from.rgb * from.a, from.a);
  vec4 tp = vec4(to.rgb * to.a, to.a);
  vec4 c = mix(fp, tp, reveal);
  float shine = (_Progress < 1.0) ? 1.0 - smoothstep(0.0, 0.09, abs(pos - edge)) : 0.0;
  c.rgb += vec3(1.0, 0.76, 0.32) * shine * 0.8 * c.a;
  // 조명 (screen 블렌드)
  float i = clamp(_Intensity, 0.0, 1.0);
  vec3 rgb = c.a > 0.0 ? c.rgb / c.a : vec3(0.0);
  float L = dot(rgb, vec3(0.2126, 0.7152, 0.0722));
  vec3 neon = _GlowColor * (0.48 + L * 0.75);
  vec3 lit = 1.0 - (1.0 - rgb) * (1.0 - neon * i * 0.8);
  rgb = mix(rgb, lit, i);
  gl_FragColor = vec4(rgb * c.a, c.a);
}`

// ---------------------------------------------------------------------------
// PlayMainDrawingProductSway.shader (휨 + 샤인)
export const SWAY_FRAG = `
uniform sampler2D _MainTex;
uniform float _Fit;
uniform float _Bend;
uniform float _ShineProgress;
uniform vec2 _ShineDirection;
uniform vec3 _ShineColor;
uniform float _ShineWidth;
uniform float _ShineStrength;
void main(){
  vec2 p = uv;
  p.x = (p.x - 0.5) / _Fit + 0.5;
  p.x -= _Bend * p.y * p.y;
  if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) { gl_FragColor = vec4(0.0); return; }
  vec4 c = texture2D(_MainTex, p);
  vec2 d = _ShineDirection;
  float pos = (dot(p, d) - min(0.0, d.x) - min(0.0, d.y)) / (abs(d.x) + abs(d.y));
  float edge = mix(-0.15, 1.15, _ShineProgress);
  vec3 rgb = c.rgb + _ShineColor * (1.0 - smoothstep(0.0, _ShineWidth, abs(pos - edge))) * _ShineStrength;
  gl_FragColor = vec4(rgb * c.a, c.a);
}`

// ---------------------------------------------------------------------------
// SurfaceFx.shader GoldShine (_BrightGold=1). _NormalTex 는 CPU 에서 만든 노멀맵.
export const GOLD_FRAG = `
uniform sampler2D _MainTex;
uniform sampler2D _NormalTex;
uniform float _P;          // elapsed / duration
uniform vec4 _Shine;       // strength, width, dirX, dirY
void main(){
  vec4 c = texture2D(_MainTex, uv);
  vec3 n = texture2D(_NormalTex, uv).xyz * 2.0 - 1.0;
  n = normalize(vec3(n.xy, n.z + 0.15));
  vec3 view = vec3(0.0, 0.0, 1.0);
  vec3 r = reflect(-view, n);
  vec3 light = normalize(vec3(0.0, 0.6, 0.85));
  float spec = pow(clamp(dot(n, normalize(light + view)), 0.0, 1.0), 32.0);
  float band = exp(-pow((r.x + 0.4 * r.y) / 0.18, 2.0));
  float diff = clamp(dot(n, light), 0.0, 1.0);
  vec3 gold = vec3(1.0, 0.76, 0.43) * (0.20 + 0.36 * diff + 0.55 * band) + vec3(1.0, 0.97, 0.87) * 0.55 * spec;
  float phase = min(floor(3.0 * _P), 2.0);
  float lp = clamp(3.0 * _P - phase, 0.0, 1.0);
  vec2 dir = _Shine.zw;
  float sweep = mix(-1.5, 1.5, smoothstep(0.08, 0.92, lp));
  float surface = 1.45 * dot(uv - 0.5, dir) + 0.28 * dot(r.xy, dir);
  float edge = smoothstep(sweep - 0.04, sweep + 0.04, surface);
  float coat = phase < 0.5 ? 1.0 - edge : (phase < 1.5 ? 1.0 : edge);
  float d = surface - sweep;
  float glint = pow(clamp(dot(n, normalize(normalize(vec3(-0.6 * sweep, 0.35, 1.0)) + view)), 0.0, 1.0), 24.0);
  float w = _Shine.y;
  vec3 shine = vec3(1.0, 0.89, 0.60) * (0.55 * exp(-pow(d / w, 2.0)) + exp(-pow(d / (w * 0.24), 2.0)) * glint)
    * smoothstep(0.02, 0.15, lp) * (1.0 - smoothstep(0.85, 0.98, lp)) * _Shine.x;
  vec3 rgb = mix(c.rgb, gold, coat) + shine;
  gl_FragColor = vec4(rgb * c.a, c.a);
}`

// ---------------------------------------------------------------------------
// ResultProductGlow.shader (Mat_ResultProductGlow: _Intensity 1.15, _GlowColor #FFF2D1, _HaloColor #B099FF)
export const PRODUCT_GLOW_FRAG = `
uniform float _Intensity;
uniform vec3 _GlowColor;
uniform vec3 _HaloColor;
float SoftRay(vec2 p, vec2 axis){
  float along = abs(dot(p, axis));
  float across = abs(dot(p, vec2(-axis.y, axis.x)));
  float beam = clamp(1.0 - across / (0.022 + along * 0.095), 0.0, 1.0);
  beam *= beam; beam *= beam;
  return beam * exp2(-along * along * 4.5);
}
void main(){
  vec2 p = (uv - 0.5) * 2.0;
  p *= vec2(0.96, 1.04);
  float r2 = dot(p, p);
  float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float border = smoothstep(0.0, 0.12, edge) * (1.0 - smoothstep(0.63, 1.05, r2));
  float halo = exp2(-r2 * 2.8) * 0.22;
  float pearl = exp2(-(p.x * p.x * 4.0 + p.y * p.y * 5.5)) * 0.32;
  float bloom = exp2(-(p.x * p.x * 2.0 + p.y * p.y * 22.0)) * 0.085;
  float rays = SoftRay(p, vec2(0.97437, 0.22495)) * 0.70;
  rays += SoftRay(p, vec2(0.73135, 0.68200)) * 0.48;
  rays += SoftRay(p, vec2(0.29237, 0.95630)) * 0.64;
  rays += SoftRay(p, vec2(-0.22495, 0.97437)) * 0.46;
  rays += SoftRay(p, vec2(-0.68200, 0.73135)) * 0.58;
  rays += SoftRay(p, vec2(-0.95630, 0.29237)) * 0.38;
  rays *= smoothstep(0.018, 0.10, r2) * 0.12;
  float strength = border * _Intensity;
  float alpha = clamp((halo + pearl + bloom + rays) * strength, 0.0, 1.0);
  vec3 light = _HaloColor * halo + _GlowColor * (pearl + bloom + rays);
  gl_FragColor = vec4(light * strength * 1.65, alpha);
}`

// ---------------------------------------------------------------------------
// ImageNormalFx.shader: 노멀맵 조명 (diffuse + spec), _Light 는 4s 주기로 흔들린다.
export const NORMALFX_FRAG = `
uniform sampler2D _MainTex;
uniform sampler2D _NormalTex;
uniform vec3 _Light;
uniform float _Strength;
void main(){
  vec4 col = texture2D(_MainTex, uv);
  vec3 n = normalize(texture2D(_NormalTex, uv).xyz * 2.0 - 1.0);
  vec3 light = normalize(_Light + vec3(0.0, 0.0, 0.0001));
  float diffuse = clamp(dot(n, light), 0.0, 1.0);
  float spec = pow(clamp(dot(n, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 28.0) * 0.38;
  col.rgb *= mix(1.0, 0.55 + diffuse * 0.7, _Strength);
  col.rgb += vec3(1.0, 0.92, 0.78) * spec * _Strength;
  gl_FragColor = vec4(col.rgb * col.a, col.a);
}`

// GlassShine.shader: 알파 = sat(a * _Strength * (1 - _Pulse + _Pulse * pulse))
export const GLASS_FRAG = `
uniform sampler2D _MainTex;
uniform float _Reflection;
void main(){
  vec4 c = texture2D(_MainTex, uv);
  float a = clamp(c.a * _Reflection, 0.0, 1.0);
  gl_FragColor = vec4(c.rgb * a, a);
}`

/** SurfaceFx 노멀 생성: height = 1 - luma*a, Sobel, n = normalize(-5x,-5y,1), 5탭 가우시안 2회 (최대 512px) */
export function buildNormalMap(img: HTMLImageElement): HTMLCanvasElement {
  const scale = Math.min(1, 512 / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.max(1, Math.round(img.naturalWidth * scale))
  const h = Math.max(1, Math.round(img.naturalHeight * scale))
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const ctx = cv.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(img, 0, 0, w, h)
  const src = ctx.getImageData(0, 0, w, h).data
  const height = new Float32Array(w * h)
  for (let i = 0; i < w * h; i++) {
    const a = src[i * 4 + 3] / 255
    const l = (0.299 * src[i * 4] + 0.587 * src[i * 4 + 1] + 0.114 * src[i * 4 + 2]) / 255
    height[i] = 1 - l * a
  }
  const H = (x: number, y: number) => height[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))]
  let nx = new Float32Array(w * h)
  let ny = new Float32Array(w * h)
  let nz = new Float32Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const gx = H(x + 1, y - 1) + 2 * H(x + 1, y) + H(x + 1, y + 1) - H(x - 1, y - 1) - 2 * H(x - 1, y) - H(x - 1, y + 1)
      // 이미지 y 는 아래로 증가 → Unity uv(y 위) 기준으로 부호를 뒤집는다.
      const gy = -(H(x - 1, y + 1) + 2 * H(x, y + 1) + H(x + 1, y + 1) - H(x - 1, y - 1) - 2 * H(x, y - 1) - H(x + 1, y - 1))
      const vx = -5 * gx, vy = -5 * gy, vz = 1
      const len = Math.hypot(vx, vy, vz)
      const i = y * w + x
      nx[i] = vx / len; ny[i] = vy / len; nz[i] = vz / len
    }
  // Mat_Blur: 5탭 분리 가우시안(1.384615 / 3.230769 텍셀 × smoothness 2), 가로→세로 2회, 쌍선형 샘플.
  // Unity 는 인코딩된(0~1) 노멀을 블러한 뒤 다시 정규화하지 않는다.
  const weights = [0.227027, 0.316216, 0.07027]
  const offs = [0, 1.384615 * 2, 3.230769 * 2]
  const sample = (arr: Float32Array, fx: number, fy: number) => {
    const cx = Math.min(w - 1, Math.max(0, fx)), cy = Math.min(h - 1, Math.max(0, fy))
    const x0 = Math.floor(cx), y0 = Math.floor(cy)
    const x1 = Math.min(w - 1, x0 + 1), y1 = Math.min(h - 1, y0 + 1)
    const tx = cx - x0, ty = cy - y0
    const a = arr[y0 * w + x0] * (1 - tx) + arr[y0 * w + x1] * tx
    const b = arr[y1 * w + x0] * (1 - tx) + arr[y1 * w + x1] * tx
    return a * (1 - ty) + b * ty
  }
  const blur = (arr: Float32Array, dx: number, dy: number) => {
    const out = new Float32Array(w * h)
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let s = arr[y * w + x] * weights[0]
        for (let k = 1; k < 3; k++)
          s += (sample(arr, x + dx * offs[k], y + dy * offs[k]) + sample(arr, x - dx * offs[k], y - dy * offs[k])) * weights[k]
        out[y * w + x] = s
      }
    return out
  }
  // 인코딩 값(0~1)으로 바꿔 블러한다.
  for (let i = 0; i < w * h; i++) { nx[i] = nx[i] * 0.5 + 0.5; ny[i] = ny[i] * 0.5 + 0.5; nz[i] = nz[i] * 0.5 + 0.5 }
  for (let pass = 0; pass < 2; pass++) {
    nx = blur(blur(nx, 1, 0), 0, 1)
    ny = blur(blur(ny, 1, 0), 0, 1)
    nz = blur(blur(nz, 1, 0), 0, 1)
  }
  const out = ctx.createImageData(w, h)
  for (let i = 0; i < w * h; i++) {
    out.data[i * 4] = nx[i] * 255
    out.data[i * 4 + 1] = ny[i] * 255
    out.data[i * 4 + 2] = nz[i] * 255
    out.data[i * 4 + 3] = 255
  }
  ctx.putImageData(out, 0, 0)
  return cv
}
