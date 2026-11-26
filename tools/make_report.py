"""manifest 들을 모아 src/data/assets-report.md 작성 + 산출물 검증.

검증: 모든 JSON 파싱, layout/materials/sprites/products 가 참조하는 public 경로 존재 여부.
실행: python -X utf8 tools/make_report.py  (실패 시 exit 1)
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from unity_common import PUBLIC, DATA, CACHE  # noqa: E402


def load(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))


def kb(n):
    return f"{n / 1024:,.1f} KB" if n < 1024 * 1024 else f"{n / 1048576:,.2f} MB"


def collect_srcs(o, acc):
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str) and (v.startswith("unity/") or v.startswith("products/")) and k != "imageUrl":
                acc.add(v)
            else:
                collect_srcs(v, acc)
    elif isinstance(o, list):
        for v in o:
            if isinstance(v, str) and v.startswith("unity/"):
                acc.add(v)
            else:
                collect_srcs(v, acc)


def main():
    lay = load(CACHE / "layout_manifest.json")
    med = load(CACHE / "media_manifest.json")
    pro = load(CACHE / "products_manifest.json")
    errors = []
    jsons = sorted(DATA.glob("*.json"))
    parsed = {}
    for j in jsons:
        try:
            parsed[j.name] = load(j)
        except Exception as e:  # noqa: BLE001
            errors.append(f"JSON 파싱 실패 {j.name}: {e}")
    refs = set()
    for name, o in parsed.items():
        if name == "sprites.json":
            refs.update(o.keys())
        collect_srcs(o, refs)
    missing = sorted(r for r in refs if not (PUBLIC / r).exists())
    errors += [f"public 에 없음: {m}" for m in missing]

    L = ["# assets-report", "", "생성: tools/run_all.py (Unity 프로젝트 catchu_client 읽기 전용 export)", ""]
    total = sum(p.stat().st_size for p in PUBLIC.rglob("*") if p.is_file())
    unity_total = sum(p.stat().st_size for p in (PUBLIC / "unity").rglob("*") if p.is_file())
    prod_total = sum(p.stat().st_size for p in (PUBLIC / "products").rglob("*") if p.is_file())
    L += [f"- public/ 전체: **{kb(total)}** (unity/ {kb(unity_total)}, products/ {kb(prod_total)})",
          f"- 검증: JSON {len(parsed)}개 파싱, 참조 경로 {len(refs)}개 중 누락 {len(missing)}개", ""]

    L += ["## 1. 데이터 파일 (src/data)", "", "| file | size |", "|---|---|"]
    for j in jsons + sorted(DATA.glob("*.md")):
        L.append(f"| {j.name} | {kb(j.stat().st_size)} |")

    L += ["", "## 2. 텍스처 (public/unity, 레이아웃·추가 지정)", "",
          "| public path | source | size | src px → out px | note |", "|---|---|---|---|---|"]
    for k, v in sorted(lay["textures"].items()):
        note = []
        if v["downscaled"]:
            note.append(f"maxTextureSize {v['maxTextureSize']} 로 LANCZOS 축소")
        if v["converted"]:
            note.append("PNG 변환")
        if v["users"] and not v["users"][0].startswith("/"):
            note.append(v["users"][0])
        L.append(f"| {k} | {v['source']} | {kb(v['bytes'])} | {v['srcSize'][0]}x{v['srcSize'][1]} → {v['outSize'][0]}x{v['outSize'][1]} | {'; '.join(note)} |")

    L += ["", "## 3. 영상·사운드·폰트", "", "| public path | source | size | note |", "|---|---|---|---|"]
    for k, v in sorted(med["files"].items()):
        L.append(f"| {k} | {v['source']} | {kb(v['bytes'])} | {v['note']} |")

    L += ["", "## 4. 상품 이미지 (public/products)", "",
          f"- drawTutorialResult 세트 {len(pro['sets'])}개, 고유 URL {pro['uniqueUrls']}개, 성공 {len(pro['files'])}, 실패 {len(pro['failed'])}", ""]
    L += ["| file | size | url |", "|---|---|---|"]
    for k, v in sorted(pro["files"].items()):
        L.append(f"| products/{k} | {kb(v['bytes'])} | {v['url']} |")
    for k, v in pro["failed"].items():
        L.append(f"| products/{k} | 실패 | {v} |")

    L += ["", "## 5. 미해결 / 주의", ""]
    notes = list(lay["unresolved"]) + list(lay["issues"]) + list(med["issues"])
    notes += [
        "GO_Delivery/GO_FingerPoint: Missing Prefab (guid 13f794b97e812c041a575936ab6f0caf) — 프로젝트에 원본 없음. GO_Delivery 는 export 제외 서브트리라 레이아웃에 없음.",
        "RawImage_ProductGlow: m_Texture 비어 있음(fileID 0). 셰이더 CatchU/UI/Result Product Glow(Assets/_Effects/ParticleImage/GoldConfetti/ResultProductGlow.shader)가 절차적으로 그림 → 텍스처 없음. 머티리얼 값은 materials.json.",
        "ParticleImage(파티클)·GoldConfettiGraphic·TextAnimator_TMP 는 props 미포함(덩치 큼), 참조 텍스처만 node.refs 로 export.",
        "커스텀 셰이더 머티리얼(GlassShine, TutorialGuideShine, ResultProductGlow 등)은 웹에서 별도 재현 필요 — 경로·float·color 는 materials.json.",
        "UI_TutorialDrawing.dummyFx(SurfaceFx_DrawingGoldShine.prefab), mat_productMotion 은 경로만 props 에 기록, 레이아웃 미export.",
        "Image_DrawJoyStick: 2560x512 → 2048x410, 서브 스프라이트 rect 는 소수(409.6) 그대로. Image_DrawClawLine 6x2160 → 6x2048(반올림).",
        "Icon_GradeC 파일명이 소문자 'icon_GradeC.png' (원본 그대로). 대소문자 구분 서버에서 경로 주의.",
        "Unity의 실제 축소 크기는 이 스크립트의 반올림과 1px 다를 수 있음.",
    ]
    if errors:
        notes = [f"**검증 오류** {e}" for e in errors] + notes
    L += [f"- {n}" for n in notes]
    (DATA / "assets-report.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    print(f"public total={total} unity={unity_total} products={prod_total} refs={len(refs)} missing={len(missing)} errors={len(errors)}")
    for e in errors:
        print("ERR", e)
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
