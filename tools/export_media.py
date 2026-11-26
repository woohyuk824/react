"""영상·사운드·폰트 → public/unity/{video,sound,fonts}

- 영상: ffmpeg 있으면 -c copy -movflags +faststart 리먹스, 없으면 그대로 복사
- 사운드: ffmpeg 있으면 AAC 192k .m4a, 없으면 .wav 복사
- 폰트: ttf 복사 + fontTools 있으면 woff2 서브셋(한글 음절·ASCII·Latin-1·기본 문장부호)
실행: python -X utf8 tools/export_media.py
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from unity_common import UNITY, PUBLIC, CACHE  # noqa: E402

VIDEOS = ["Assets/_Video/Video_Splash.mp4", "Assets/_Video/Video_Drawing.mp4"]
SOUNDS = ["Assets/_Sound/Play/Drawing/Sound_DrawMove.wav", "Assets/_Sound/Play/Common/Sound_PlaySelect.wav"]
FONTS = ["Assets/Fonts/Noto_Update/Pretendard-Bold.ttf", "Assets/Fonts/Noto_Update/Pretendard-Medium.ttf",
         "Assets/Fonts/Noto_Update/Pretendard-Regular.ttf"]
# 한글 음절, ASCII, Latin-1, 일반 문장부호(…·‘’“”–— 등), ₩, 한글 자모 호환(ㄱ-ㅣ)
UNICODES = "U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20A9,U+2190-2193,U+3000-303F,U+3131-318E,U+AC00-D7A3,U+FF01-FF5E"

man = {}
ff = shutil.which("ffmpeg")


def rec(dst, src, note):
    man[str(dst.relative_to(PUBLIC)).replace("\\", "/")] = {"source": src, "bytes": dst.stat().st_size, "note": note}


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
    return r.returncode == 0, r.stderr[-800:]


def main():
    (PUBLIC / "unity/video").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "unity/sound").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "unity/fonts").mkdir(parents=True, exist_ok=True)
    issues = []
    for v in VIDEOS:
        src = UNITY / v
        dst = PUBLIC / "unity/video" / Path(v).name
        if ff:
            ok, err = run([ff, "-y", "-v", "error", "-i", str(src), "-map", "0", "-c", "copy", "-movflags", "+faststart", str(dst)])
            if ok:
                rec(dst, v, "ffmpeg stream copy + faststart")
                continue
            issues.append(f"faststart 실패 {v}: {err}")
        shutil.copyfile(src, dst)
        rec(dst, v, "copy as-is")
    for s in SOUNDS:
        src = UNITY / s
        if ff:
            dst = PUBLIC / "unity/sound" / (Path(s).stem + ".m4a")
            ok, err = run([ff, "-y", "-v", "error", "-i", str(src), "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", str(dst)])
            if ok:
                rec(dst, s, "AAC 192k 48kHz")
                continue
            issues.append(f"aac 실패 {s}: {err}")
        dst = PUBLIC / "unity/sound" / Path(s).name
        shutil.copyfile(src, dst)
        rec(dst, s, "wav fallback (ffmpeg 없음/실패)")
    try:
        from fontTools import subset
        have_ft = True
    except ImportError:
        have_ft = False
        issues.append("fontTools 없음 → woff2 미생성")
    for fnt in FONTS:
        src = UNITY / fnt
        dst = PUBLIC / "unity/fonts" / Path(fnt).name
        shutil.copyfile(src, dst)
        rec(dst, fnt, "ttf copy")
        if have_ft:
            w2 = dst.with_suffix(".woff2")
            subset.main([str(src), f"--unicodes={UNICODES}", "--flavor=woff2", f"--output-file={w2}",
                         "--layout-features=*", "--no-hinting", "--desubroutinize"])
            rec(w2, fnt, f"woff2 subset {UNICODES}")
    (CACHE / "media_manifest.json").write_text(json.dumps({"files": man, "issues": issues, "ffmpeg": ff},
                                                          ensure_ascii=False, indent=1), encoding="utf-8")
    for k, v in man.items():
        print(k, v["bytes"], v["note"][:40])
    for x in issues:
        print("ISSUE", x)


if __name__ == "__main__":
    main()
