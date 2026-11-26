"""링크 미리보기(Open Graph) 이미지 1200x630 생성.

usage: python tools/make_og.py <게임화면 1080x2160 캡처.png>
- 배경: 인트로(Video_Splash) 첫 프레임 보라 #573E78 그라디언트
- 왼쪽: 캐치유 앱 아이콘 + 로고 + 문구(게임 안 문구 그대로 사용)
- 오른쪽: 실제 뽑기 기계 화면(휴대폰 모양으로 둥글게)
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
UNITY = Path('C:/Users/KLP/Desktop/Catchu/catchu_client/Assets')
FONT_B = str(UNITY / 'Fonts/Noto_Update/Pretendard-Bold.ttf')
FONT_M = str(UNITY / 'Fonts/Noto_Update/Pretendard-Medium.ttf')
W, H = 1200, 630

shot = Image.open(sys.argv[1]).convert('RGB').crop((0, 0, 1080, 2160))

# 배경 그라디언트 (위 밝은 보라 → 아래 진한 보라)
bg = Image.new('RGB', (W, H))
top, bottom = (0x6B, 0x4C, 0x96), (0x3A, 0x28, 0x55)
px = bg.load()
for y in range(H):
    t = y / (H - 1)
    c = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    for x in range(W):
        px[x, y] = c
# 오른쪽 위 은은한 빛
glow = Image.new('L', (W, H), 0)
ImageDraw.Draw(glow).ellipse((700, -220, 1320, 400), fill=110)
glow = glow.filter(ImageFilter.GaussianBlur(120))
bg = Image.composite(Image.new('RGB', (W, H), (0xC9, 0xB6, 0xFF)), bg, glow)

# 오른쪽: 기계 화면 (상단 로고~버튼 영역), 휴대폰 카드 모양
phone_w, phone_h = 330, 588
crop = shot.crop((0, 0, 1080, round(1080 * phone_h / phone_w)))
crop = crop.resize((phone_w, phone_h), Image.LANCZOS)
mask = Image.new('L', (phone_w, phone_h), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, phone_w - 1, phone_h - 1), radius=34, fill=255)
px0, py0 = 820, (H - phone_h) // 2 + 6
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
ImageDraw.Draw(shadow).rounded_rectangle((px0 - 4, py0 + 10, px0 + phone_w + 4, py0 + phone_h + 18), radius=38, fill=(20, 8, 40, 150))
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
bg = bg.convert('RGBA')
bg.alpha_composite(shadow)
bg.paste(crop, (px0, py0), mask)
ImageDraw.Draw(bg).rounded_rectangle((px0, py0, px0 + phone_w - 1, py0 + phone_h - 1), radius=34, outline=(255, 255, 255, 90), width=3)

# 왼쪽: 앱 아이콘 + 로고 + 문구
d = ImageDraw.Draw(bg)
icon = Image.open(UNITY / '_Images/Logo/CatchULogo.png').convert('RGBA').resize((112, 112), Image.LANCZOS)
bg.alpha_composite(icon, (72, 92))
logo = Image.open(UNITY / '_Images/Logo/Image_CatchuLogo.png').convert('RGBA')
lw = 230
logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
# 로고를 흰색으로
white = Image.new('RGBA', logo.size, (255, 255, 255, 255))
white.putalpha(logo.getchannel('A'))
bg.alpha_composite(white, (208, 92 + (112 - white.height) // 2))

f_title = ImageFont.truetype(FONT_B, 64)
f_sub = ImageFont.truetype(FONT_M, 30)
f_chip = ImageFont.truetype(FONT_B, 26)
d.text((72, 250), '지금 무료로', font=f_title, fill=(255, 255, 255))
d.text((72, 328), '뽑기를 체험해 보세요!', font=f_title, fill=(255, 255, 255))
d.text((74, 428), '명품이 가득한 캐치유 뽑기 기계를 직접 움직여 보세요', font=f_sub, fill=(226, 216, 255))

# CTA 칩
cx, cy, cw, ch = 72, 500, 250, 62
d.rounded_rectangle((cx, cy, cx + cw, cy + ch), radius=31, fill=(255, 255, 255))
label = '무료 뽑기 시작 ›'
tw = d.textlength(label, font=f_chip)
d.text((cx + (cw - tw) / 2, cy + 14), label, font=f_chip, fill=(0x61, 0x4A, 0xD8))

out = ROOT / 'public/og-image.jpg'
bg.convert('RGB').save(out, quality=88, optimize=True, progressive=True)
print(out, out.stat().st_size)
