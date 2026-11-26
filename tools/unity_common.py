"""Unity 프로젝트 읽기 전용 파서 공통 모듈.

- guid 색인 (Assets / Packages / Library/PackageCache 의 .meta)
- Unity YAML 문서 분리·파싱 (모든 스칼라는 문자열로 읽고 필요한 곳에서 숫자 변환)
- 중첩 PrefabInstance 확장 (수정사항·추가 컴포넌트·제거 컴포넌트 반영)
- 텍스처 .meta 해석 (spriteMode / border / PPU / maxTextureSize / 서브 스프라이트)
- 텍스처를 test-memo/public/unity 로 복사/변환 (maxTextureSize 축소 반영)

Unity 프로젝트에는 절대 쓰지 않는다.
"""
import copy
import json
import os
import re
import shutil
from pathlib import Path

import yaml

UNITY = Path("C:/Users/KLP/Desktop/Catchu/catchu_client")
OUT = Path("C:/Users/KLP/Desktop/Catchu/test-memo")
PUBLIC = OUT / "public"
DATA = OUT / "src" / "data"
CACHE = OUT / "tools" / ".cache"
CACHE.mkdir(parents=True, exist_ok=True)

MASK63 = 0x7FFFFFFFFFFFFFFF
BUILTIN_GUIDS = {
    "0000000000000000f000000000000000": "builtin_extra",
    "0000000000000000e000000000000000": "builtin_default",
}
BUILTIN_NAMES = {
    10905: "UISprite", 10907: "Background", 10909: "DropdownArrow", 10911: "Checkmark",
    10913: "Knob", 10915: "InputFieldBackground", 10917: "UIMask", 10754: "Default UI Material",
    10100: "Arial", 10102: "LegacyRuntime",
}
TEXTURE_EXTS = {".png", ".jpg", ".jpeg", ".psd", ".tga", ".tif", ".tiff", ".bmp", ".exr", ".gif"}


# ---------------------------------------------------------------- YAML
class _StrLoader(yaml.CSafeLoader if hasattr(yaml, "CSafeLoader") else yaml.SafeLoader):
    pass


# 모든 암묵 해석 제거 → 스칼라는 전부 문자열 (빈 값만 None)
_StrLoader.yaml_implicit_resolvers = {}
_StrLoader.add_implicit_resolver("tag:yaml.org,2002:null", re.compile(r"^(?:~|null|Null|NULL|)$"), ["~", "n", "N", ""])

_DOC_RE = re.compile(r"^--- !u!(\d+) &(-?\d+)( stripped)?[ \t]*$", re.M)


def yload(text):
    return yaml.load(text, Loader=_StrLoader)


def f(v, d=0.0):
    if v is None:
        return d
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def i(v, d=0):
    if v is None:
        return d
    try:
        return int(v)
    except (TypeError, ValueError):
        try:
            return int(float(v))
        except (TypeError, ValueError):
            return d


def num(v):
    """float 를 JSON 용으로 정리 (정수면 int, 아니면 6자리 반올림)."""
    x = round(float(v), 4)
    if abs(x - round(x)) < 1e-9:
        return int(round(x))
    return x


def parse_unity_file(path):
    """{fileID: {'cls': int, 'type': str, 'stripped': bool, 'd': dict}}"""
    text = Path(path).read_text(encoding="utf-8")
    objs = {}
    ms = list(_DOC_RE.finditer(text))
    for k, m in enumerate(ms):
        start = m.end()
        end = ms[k + 1].start() if k + 1 < len(ms) else len(text)
        body = yload(text[start:end]) or {}
        tname, d = next(iter(body.items())) if body else ("", {})
        objs[int(m.group(2))] = {"cls": int(m.group(1)), "type": tname, "stripped": bool(m.group(3)), "d": d or {}}
    return objs


# ---------------------------------------------------------------- guid index
_GUID_INDEX = None


def guid_index():
    global _GUID_INDEX
    if _GUID_INDEX is not None:
        return _GUID_INDEX
    cache = CACHE / "guid_index.json"
    if cache.exists():
        _GUID_INDEX = json.loads(cache.read_text(encoding="utf-8"))
        return _GUID_INDEX
    idx = {}
    grx = re.compile(r"^guid:\s*([0-9a-f]{32})", re.M)
    for root in ("Assets", "Packages", "Library/PackageCache"):
        base = UNITY / root
        for dp, dn, fn in os.walk(base):
            for name in fn:
                if not name.endswith(".meta"):
                    continue
                p = os.path.join(dp, name)
                try:
                    with open(p, "r", encoding="utf-8", errors="ignore") as fh:
                        head = fh.read(400)
                except OSError:
                    continue
                m = grx.search(head)
                if m:
                    rel = os.path.relpath(p[:-5], UNITY).replace("\\", "/")
                    idx.setdefault(m.group(1), rel)
    cache.write_text(json.dumps(idx), encoding="utf-8")
    _GUID_INDEX = idx
    return idx


def guid_path(guid):
    if not guid:
        return None
    return guid_index().get(guid)


def asset_ref(ref):
    """{fileID, guid} → (path|None, fileID, builtin_name|None)"""
    if not isinstance(ref, dict):
        return None, 0, None
    fid = i(ref.get("fileID"))
    g = ref.get("guid")
    if fid == 0:
        return None, 0, None
    if g in BUILTIN_GUIDS:
        return None, fid, BUILTIN_NAMES.get(fid, f"{BUILTIN_GUIDS[g]}:{fid}")
    return guid_path(g), fid, None


# ---------------------------------------------------------------- prefab expansion
def _walk_refs(o, fn):
    """dict/list 안의 모든 {fileID:..} 참조에 fn(ref_dict) 적용."""
    if isinstance(o, dict):
        if "fileID" in o and len(o) <= 3 and set(o.keys()) <= {"fileID", "guid", "type"}:
            fn(o)
            return
        for v in o.values():
            _walk_refs(v, fn)
    elif isinstance(o, list):
        for v in o:
            _walk_refs(v, fn)


def _set_path(d, path, value, objref, issues):
    toks = path.split(".")
    cur = d
    k = 0
    while k < len(toks):
        t = toks[k]
        last = k == len(toks) - 1
        if t == "Array" and k + 1 < len(toks):
            nt = toks[k + 1]
            if not isinstance(cur, list):
                issues.append(f"array path on non-list: {path}")
                return
            if nt == "size":
                n = i(value)
                while len(cur) < n:
                    cur.append(copy.deepcopy(cur[-1]) if cur else None)
                del cur[n:]
                return
            m = re.match(r"data\[(\d+)\]", nt)
            idx = int(m.group(1))
            while len(cur) <= idx:
                cur.append(None)
            if k + 1 == len(toks) - 1:
                cur[idx] = objref if objref is not None else value
                return
            if cur[idx] is None:
                cur[idx] = {}
            cur = cur[idx]
            k += 2
            continue
        if not isinstance(cur, dict):
            issues.append(f"path on non-dict: {path}")
            return
        if last:
            cur[t] = objref if objref is not None else value
            return
        nxt = toks[k + 1]
        if t not in cur or cur[t] is None:
            cur[t] = [] if nxt == "Array" else {}
        cur = cur[t]
        k += 1


_EXPANDED = {}


def load_expanded(path, issues=None):
    """프리팹을 읽고 중첩 PrefabInstance 를 모두 펼친 객체 맵을 반환 (deep copy)."""
    issues = issues if issues is not None else []
    key = str(path)
    if key in _EXPANDED:
        objs, iss = _EXPANDED[key]
        issues.extend(iss)
        return copy.deepcopy(objs)
    my_issues = []
    raw = parse_unity_file(UNITY / path)
    objs = {k: v for k, v in raw.items() if not v["stripped"] and v["cls"] != 1001}
    alias = {}
    instance_roots = {}  # newRootTransformId -> (pi, src_path)
    for pid, pobj in raw.items():
        if pobj["cls"] != 1001:
            continue
        pd = pobj["d"]
        src_guid = (pd.get("m_SourcePrefab") or {}).get("guid")
        src_path = guid_path(src_guid)
        if not src_path or not (UNITY / src_path).exists():
            my_issues.append(f"{path}: PrefabInstance {pid} 원본 없음 guid={src_guid}")
            continue
        src = load_expanded(src_path, my_issues)
        nid = lambda s: (pid ^ (s & 0xFFFFFFFFFFFFFFFF)) & MASK63
        srcids = set(src.keys())

        def remap(ref, srcids=srcids, nid=nid):
            fid = i(ref.get("fileID"))
            if not ref.get("guid") and fid in srcids:
                ref["fileID"] = str(nid(fid))

        newobjs = {}
        for sid, so in src.items():
            so = copy.deepcopy(so)
            _walk_refs(so["d"], remap)
            so["srcId"] = sid
            so.setdefault("prefab", None)
            newobjs[nid(sid)] = so
        mod = pd.get("m_Modification") or {}
        # 제거된 컴포넌트/게임오브젝트
        for rc in mod.get("m_RemovedComponents") or []:
            t = nid(i(rc.get("fileID")))
            newobjs.pop(t, None)
            for o in newobjs.values():
                if o["cls"] == 1:
                    o["d"]["m_Component"] = [c for c in o["d"].get("m_Component") or [] if i(c["component"]["fileID"]) != t]
        for rg in mod.get("m_RemovedGameObjects") or []:
            my_issues.append(f"{path}: m_RemovedGameObjects 존재(미처리) {rg}")
        # 수정사항
        for m in mod.get("m_Modifications") or []:
            tg = m.get("target") or {}
            t = nid(i(tg.get("fileID")))
            if t not in newobjs:
                my_issues.append(f"{path}: 수정 대상 없음 {tg} {m.get('propertyPath')}")
                continue
            oref = m.get("objectReference") or {}
            objref = None
            if i(oref.get("fileID")) != 0:
                objref = dict(oref)
            _set_path(newobjs[t]["d"], m.get("propertyPath"), m.get("value"), objref, my_issues)
        # 루트 Transform 부모 연결
        tp = mod.get("m_TransformParent") or {}
        for k2, o in newobjs.items():
            if o["cls"] in (224, 4) and i((o["d"].get("m_Father") or {}).get("fileID")) == 0:
                o["d"]["m_Father"] = {"fileID": tp.get("fileID")}
                instance_roots[k2] = src_path
                go = i(o["d"]["m_GameObject"]["fileID"])
                if go in newobjs:
                    newobjs[go]["prefab"] = src_path
        objs.update(newobjs)
    # stripped → 펼친 객체 id
    for sid, so in raw.items():
        if so["stripped"]:
            pi = i((so["d"].get("m_PrefabInstance") or {}).get("fileID"))
            cs = i((so["d"].get("m_CorrespondingSourceObject") or {}).get("fileID"))
            alias[sid] = (pi ^ (cs & 0xFFFFFFFFFFFFFFFF)) & MASK63

    def fix(ref):
        fid = i(ref.get("fileID"))
        if not ref.get("guid") and fid in alias:
            ref["fileID"] = str(alias[fid])

    for o in objs.values():
        _walk_refs(o["d"], fix)
    # 호스트에서 추가한 컴포넌트 / 자식
    for oid, o in raw.items():
        if o["stripped"] or o["cls"] == 1001:
            continue
        d = objs[oid]["d"]
        go = i((d.get("m_GameObject") or {}).get("fileID"))
        if go and go in objs and objs[go]["cls"] == 1:
            comps = objs[go]["d"].setdefault("m_Component", [])
            if not any(i(c["component"]["fileID"]) == oid for c in comps):
                comps.append({"component": {"fileID": str(oid)}})
        if o["cls"] in (224, 4):
            fa = i((d.get("m_Father") or {}).get("fileID"))
            if fa and fa in objs:
                ch = objs[fa]["d"].setdefault("m_Children", [])
                if not any(i(c.get("fileID")) == oid for c in ch):
                    ch.append({"fileID": str(oid)})
    _EXPANDED[key] = (objs, my_issues)
    issues.extend(my_issues)
    return copy.deepcopy(objs)


# ---------------------------------------------------------------- script names
def script_class(mb):
    d = mb["d"]
    p, _, _ = asset_ref(d.get("m_Script"))
    if p and p.endswith(".cs"):
        return Path(p).stem
    ident = d.get("m_EditorClassIdentifier") or ""
    if ident:
        return re.split(r"[.:]", ident)[-1]
    g = (d.get("m_Script") or {}).get("guid")
    if p:
        return Path(p).stem
    return f"MissingScript({g})"


# ---------------------------------------------------------------- textures
_META = {}


def tex_meta(path):
    if path in _META:
        return _META[path]
    mp = UNITY / (path + ".meta")
    info = {"spriteMode": 0, "border": [0, 0, 0, 0], "ppu": 100.0, "maxSize": 2048, "sprites": [], "fidNames": {}}
    if mp.exists():
        m = yload(mp.read_text(encoding="utf-8")) or {}
        ti = m.get("TextureImporter") or {}
        info["spriteMode"] = i(ti.get("spriteMode"))
        b = ti.get("spriteBorder") or {}
        info["border"] = [f(b.get("x")), f(b.get("y")), f(b.get("z")), f(b.get("w"))]
        info["ppu"] = f(ti.get("spritePixelsToUnits"), 100.0)
        mx = i(ti.get("maxTextureSize"), 2048)
        plat = ti.get("platformSettings") or []
        for ps in plat:
            bt = ps.get("buildTarget")
            if bt == "DefaultTexturePlatform":
                mx = i(ps.get("maxTextureSize"), mx)
        for ps in plat:
            if ps.get("buildTarget") == "Android" and i(ps.get("overridden")) == 1:
                mx = min(mx, i(ps.get("maxTextureSize"), mx))
        info["maxSize"] = mx
        ss = (ti.get("spriteSheet") or {}).get("sprites") or []
        for s in ss:
            r = s.get("rect") or {}
            sb = s.get("border") or {}
            info["sprites"].append({
                "name": s.get("name"), "internalID": i(s.get("internalID")),
                "rect": [f(r.get("x")), f(r.get("y")), f(r.get("width")), f(r.get("height"))],
                "border": [f(sb.get("x")), f(sb.get("y")), f(sb.get("z")), f(sb.get("w"))],
            })
        for e in (ti.get("nameFileIdTable") or {}).items() if isinstance(ti.get("nameFileIdTable"), dict) else []:
            info["fidNames"][i(e[1])] = e[0]
        fr = ti.get("fileIDToRecycleName")
        if isinstance(fr, dict):
            for k, v in fr.items():
                info["fidNames"][i(k)] = v
        info["meta"] = True
    _META[path] = info
    return info


def public_rel(path):
    """Assets 기준 상대 경로 → 'unity/<...>' (공백→_ , 특수 확장자 → .png)"""
    p = path
    if p.startswith("Assets/"):
        p = p[len("Assets/"):]
    else:
        p = "_pkg/" + p.split("/", 2)[-1] if p.startswith("Library/PackageCache/") else "_pkg/" + p
    p = p.replace(" ", "_")
    ext = Path(p).suffix.lower()
    if ext not in (".png", ".jpg", ".jpeg"):
        p = str(Path(p).with_suffix(".png")).replace("\\", "/")
    return "unity/" + p


MANIFEST = {}  # public rel → info


def export_texture(path, user=None):
    """텍스처 1개를 public/unity 로 내보내고 정보 반환.
    반환: {'src', 'texSize', 'srcSize', 'scale'(sx,sy)} 또는 None"""
    from PIL import Image as PILImage
    if not path or Path(path).suffix.lower() not in TEXTURE_EXTS:
        return None
    rel = public_rel(path)
    if rel in MANIFEST:
        if user and user not in MANIFEST[rel]["users"]:
            MANIFEST[rel]["users"].append(user)
        return MANIFEST[rel]["_info"]
    srcp = UNITY / path
    if not srcp.exists():
        return None
    meta = tex_meta(path)
    dst = PUBLIC / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    with PILImage.open(srcp) as im:
        im.load()
        sw, sh = im.size
        mx = meta["maxSize"]
        scale = 1.0
        if max(sw, sh) > mx:
            scale = mx / max(sw, sh)
        nw, nh = max(1, round(sw * scale)), max(1, round(sh * scale))
        ext = Path(path).suffix.lower()
        if scale < 1.0:
            out = im.resize((nw, nh), PILImage.LANCZOS)
            if dst.suffix.lower() in (".jpg", ".jpeg"):
                out.convert("RGB").save(dst, quality=92, optimize=True)
            else:
                out.save(dst, optimize=True)
        elif ext in (".png", ".jpg", ".jpeg"):
            shutil.copyfile(srcp, dst)
        else:
            im.save(dst, optimize=True)
    info = {"src": rel, "texSize": [nw, nh], "srcSize": [sw, sh], "scale": (nw / sw, nh / sh)}
    MANIFEST[rel] = {"source": path, "bytes": dst.stat().st_size, "srcSize": [sw, sh], "outSize": [nw, nh],
                     "maxTextureSize": meta["maxSize"], "downscaled": scale < 1.0,
                     "converted": ext not in (".png", ".jpg", ".jpeg"), "users": [user] if user else [], "_info": info}
    return info


def sprite_info(ref, user=None):
    """Sprite/Texture 참조 해석 → dict(src, texSize, spriteRect?, border?, ppu, srcSize, builtin?, unresolved?)"""
    path, fid, builtin = asset_ref(ref)
    if fid == 0:
        return None
    if builtin:
        return {"src": None, "builtin": builtin}
    if not path:
        return {"src": None, "unresolved": f"guid {ref.get('guid')} 없음"}
    if Path(path).suffix.lower() not in TEXTURE_EXTS:
        return {"src": None, "unresolved": f"텍스처 아님: {path}", "assetPath": path}
    tex = export_texture(path, user)
    if not tex:
        return {"src": None, "unresolved": f"파일 없음: {path}"}
    meta = tex_meta(path)
    sx, sy = tex["scale"]
    out = {"src": tex["src"], "texSize": tex["texSize"], "srcSize": tex["srcSize"], "ppu": meta["ppu"]}
    border = meta["border"]
    if fid not in (21300000, 2800000) and meta["sprites"]:
        sp = next((s for s in meta["sprites"] if s["internalID"] == fid), None)
        if sp is None:
            nm = meta["fidNames"].get(fid)
            sp = next((s for s in meta["sprites"] if s["name"] == nm), None)
        if sp is None:
            out["unresolved"] = f"서브 스프라이트 fileID {fid} 미해석"
        else:
            x, y, w, h = sp["rect"]
            H = tex["srcSize"][1]
            out["spriteRect"] = [num(x * sx), num((H - (y + h)) * sy), num(w * sx), num(h * sy)]
            out["spriteName"] = sp["name"]
            border = sp["border"]
    if any(border):
        out["borderSrc"] = [num(b) for b in border]
        out["border"] = [num(border[0] * sx), num(border[1] * sy), num(border[2] * sx), num(border[3] * sy)]
    return out


def color(c):
    c = c or {}
    r, g, b, a = (f(c.get(k), 1.0) for k in ("r", "g", "b", "a"))
    hx = "#%02X%02X%02X" % tuple(max(0, min(255, round(v * 255))) for v in (r, g, b))
    return hx, num(a)
