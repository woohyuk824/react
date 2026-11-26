"""DataSO.asset drawTutorialResult → src/data/products.json + public/products/<파일>

실행: python -X utf8 tools/export_products.py  (이미 받은 이미지는 건너뜀, --force 로 재다운로드)
"""
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unity_common as U  # noqa: E402

SO = "Assets/ScriptableObjects/DataSO.asset"
UA = "Mozilla/5.0 (compatible; asset-export/1.0)"


def prod(p, failed):
    p = p or {}
    url = p.get("image") or ""
    fn = Path(urllib.parse.urlparse(url).path).name if url else ""
    out = {"id": U.i(p.get("id")) if p.get("id") not in (None, "") else None,
           "image": f"products/{fn}" if fn else None, "imageUrl": url or None,
           "grade": p.get("grade"), "brand": p.get("brand"), "name": p.get("name"),
           "price": U.i(p.get("price"))}
    if p.get("subgrade") not in (None, ""):
        out["subgrade"] = U.i(p.get("subgrade"))
    if fn in failed:
        out["image"] = None
    return out


def main():
    force = "--force" in sys.argv
    objs = U.parse_unity_file(U.UNITY / SO)
    d = next(o["d"] for o in objs.values() if "drawTutorialResult" in o["d"])
    sets = d["drawTutorialResult"]
    urls = []
    for s in sets:
        for p in [s.get("main")] + (s.get("list_nine") or []) + (s.get("list_vip") or []):
            u = (p or {}).get("image")
            if u and u not in urls:
                urls.append(u)
    dst_dir = U.PUBLIC / "products"
    dst_dir.mkdir(parents=True, exist_ok=True)
    failed, files = {}, {}
    for u in urls:
        fn = Path(urllib.parse.urlparse(u).path).name
        dst = dst_dir / fn
        if dst.exists() and dst.stat().st_size > 0 and not force:
            files[fn] = {"url": u, "bytes": dst.stat().st_size, "cached": True}
            continue
        for attempt in range(3):
            try:
                req = urllib.request.Request(u, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=30) as r:
                    data = r.read()
                dst.write_bytes(data)
                files[fn] = {"url": u, "bytes": len(data)}
                failed.pop(fn, None)
                break
            except Exception as e:  # noqa: BLE001
                failed[fn] = f"{u}: {type(e).__name__} {e}"
                time.sleep(1.0)
    out = []
    for k, s in enumerate(sets):
        out.append({"set": k, "main": prod(s.get("main"), failed),
                    "list_nine": [prod(p, failed) for p in s.get("list_nine") or []],
                    "list_vip": [prod(p, failed) for p in s.get("list_vip") or []]})
    U.DATA.mkdir(parents=True, exist_ok=True)
    (U.DATA / "products.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    (U.CACHE / "products_manifest.json").write_text(json.dumps({"files": files, "failed": failed, "uniqueUrls": len(urls),
                                                                "sets": [(len(s.get('list_nine') or []), len(s.get('list_vip') or [])) for s in sets]},
                                                               ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"sets={len(out)} unique={len(urls)} ok={len(files)} failed={len(failed)}")
    for v in failed.values():
        print("FAIL", v)


if __name__ == "__main__":
    main()
