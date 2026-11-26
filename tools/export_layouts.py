"""UI_TutorialDrawing 및 중첩 프리팹 → src/data/*.layout.json + public/unity 텍스처.

실행: python -X utf8 tools/export_layouts.py
"""
import json
import math
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import unity_common as U  # noqa: E402
from unity_common import f, i, num, color  # noqa: E402

PREFABS = {
    "tutorial": "Assets/Resources/Prefabs/UI/Popup/UI_TutorialDrawing.prefab",
    "winnerBanner": "Assets/Resources/Prefabs/UI/Other/PlayMainWinnerBanner.prefab",
    "toast": "Assets/Resources/Prefabs/UI/Other/PlayToastColor.prefab",
}
EXCLUDE = {"tutorial": {"GO_Delivery", "GO_NavbarVisual"}}
BUILTIN_COMP = {223: "Canvas", 225: "CanvasGroup", 222: "CanvasRenderer", 95: "Animator", 82: "AudioSource",
                328: "VideoPlayer", 114: None, 224: None, 4: None}
# props 로 그대로 싣지 않을(덩치 큰) 클래스: 텍스처 참조만 refs 로 수집
NO_PROPS = {"ParticleImage", "GoldConfettiGraphic", "TextAnimator_TMP", "LoopHorizontalScrollRect",
            "LoopVerticalScrollRect", "TextMeshProUGUI", "Image", "RawImage", "Button", "TrueShadow",
            "Mask", "RectMask2D", "HorizontalLayoutGroup", "VerticalLayoutGroup", "GridLayoutGroup",
            "LayoutElement", "ContentSizeFitter", "GraphicRaycaster", "Toggle", "ToggleGroup",
            "Scrollbar", "ScrollRect", "DOTweenAnimation"}
SKIP_KEYS = {"m_ObjectHideFlags", "m_CorrespondingSourceObject", "m_PrefabInstance", "m_PrefabAsset",
             "m_GameObject", "m_Enabled", "m_EditorHideFlags", "m_Script", "m_Name", "m_EditorClassIdentifier"}

ISSUES = []
UNRESOLVED = []
SPRITE_SHEETS = {}
TEXT_ROWS = []


def vec(d, keys=("x", "y")):
    d = d or {}
    return [num(f(d.get(k))) for k in keys]


def quat_z(q):
    x, y, z, w = (f(q.get(k)) for k in ("x", "y", "z", "w"))
    return math.degrees(math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z)))


def note_sprite(si, where):
    if si is None:
        return None
    if si.get("unresolved") or si.get("builtin"):
        UNRESOLVED.append(f"{where}: {si.get('unresolved') or 'builtin ' + si['builtin']}")
    if si.get("src") and si.get("spriteRect"):
        SPRITE_SHEETS.setdefault(si["src"], set()).add(si.get("spriteName"))
    return si


def simplify(v, objs, where, refs):
    """custom MonoBehaviour 필드 축약: 참조는 자산 경로/로컬 이름으로"""
    if isinstance(v, dict):
        if "fileID" in v and set(v.keys()) <= {"fileID", "guid", "type"}:
            fid = i(v.get("fileID"))
            if fid == 0:
                return None
            if v.get("guid"):
                p, _, b = U.asset_ref(v)
                if b:
                    return "builtin:" + b
                if p and Path(p).suffix.lower() in U.TEXTURE_EXTS:
                    si = note_sprite(U.sprite_info(v, where), where)
                    refs[where] = si.get("src") if si else None
                    return si.get("src") if si else p
                return p or f"missing-guid:{v.get('guid')}"
            o = objs.get(fid)
            if o:
                go = objs.get(i((o["d"].get("m_GameObject") or {}).get("fileID"))) if o["cls"] != 1 else o
                nm = go["d"].get("m_Name") if go else "?"
                tn = U.script_class(o) if o["cls"] == 114 else o["type"]
                return f"local:{nm}:{tn}"
            return f"local:{fid}"
        return {k: simplify(x, objs, f"{where}.{k}", refs) for k, x in v.items() if k not in SKIP_KEYS}
    if isinstance(v, list):
        return [simplify(x, objs, f"{where}[{n}]", refs) for n, x in enumerate(v)]
    if isinstance(v, str):
        try:
            x = float(v)
            return num(x) if math.isfinite(x) and re.fullmatch(r"-?[0-9.]+(e-?[0-9]+)?", v.strip()) else v
        except ValueError:
            return v
    return v


def collect_tex_refs(d, objs, where, refs):
    def walk(o, p):
        if isinstance(o, dict):
            if "fileID" in o and set(o.keys()) <= {"fileID", "guid", "type"}:
                if o.get("guid"):
                    pth, _, _ = U.asset_ref(o)
                    if pth and Path(pth).suffix.lower() in U.TEXTURE_EXTS:
                        si = note_sprite(U.sprite_info(o, p), p)
                        refs[p] = si.get("src") if si else None
                return
            for k, x in o.items():
                if k not in SKIP_KEYS:
                    walk(x, f"{p}.{k}")
        elif isinstance(o, list):
            for n, x in enumerate(o):
                walk(x, f"{p}[{n}]")
    walk(d, where)


MATERIALS = {}


def material_path(ref):
    p, fid, b = U.asset_ref(ref)
    if fid == 0:
        return None
    if p and p.endswith(".mat") and p not in MATERIALS:
        MATERIALS[p] = export_material(p)
    return p or ("builtin:" + b if b else None)


def export_material(p):
    """머티리얼 셰이더·프로퍼티 요약 + 텍스처 내보내기 → materials.json"""
    try:
        objs = U.parse_unity_file(U.UNITY / p)
    except Exception as e:  # noqa: BLE001
        ISSUES.append(f"material parse 실패 {p}: {e}")
        return {}
    m = next((o["d"] for o in objs.values() if o["cls"] == 21), {})
    sp, sfid, sb = U.asset_ref(m.get("m_Shader"))
    sh_name = None
    if sp and sp.endswith(".shader"):
        try:
            import re as _re
            mm = _re.search(r'Shader\s+"([^"]+)"', (U.UNITY / sp).read_text(encoding="utf-8", errors="ignore"))
            sh_name = mm.group(1) if mm else None
        except OSError:
            pass
    out = {"shader": sp or (f"builtin:{sb}" if sb else None), "shaderName": sh_name}
    kw = m.get("m_ValidKeywords") or m.get("m_ShaderKeywords")
    if kw:
        out["keywords"] = kw
    sv = m.get("m_SavedProperties") or {}
    tex = {}
    for e in sv.get("m_TexEnvs") or []:
        for k, v in e.items():
            si = U.sprite_info(v.get("m_Texture"), f"{p}.{k}") if isinstance(v, dict) else None
            if si:
                ent = {"src": si.get("src")}
                if si.get("texSize"):
                    ent["texSize"] = si["texSize"]
                sc, of = vec(v.get("m_Scale")), vec(v.get("m_Offset"))
                if sc != [1, 1]:
                    ent["scale"] = sc
                if of != [0, 0]:
                    ent["offset"] = of
                if not si.get("src"):
                    ent["unresolved"] = si.get("unresolved") or si.get("builtin")
                    UNRESOLVED.append(f"material {p}.{k}: {ent['unresolved']}")
                tex[k] = ent
    out["textures"] = tex
    out["floats"] = {k: num(f(v)) for e in sv.get("m_Floats") or [] for k, v in e.items()}
    out["colors"] = {k: list(color(v)) for e in sv.get("m_Colors") or [] for k, v in e.items()}
    return out


def img_block(d, objs, where):
    blk = {}
    si = note_sprite(U.sprite_info(d.get("m_Sprite"), where), where)
    blk["src"] = si.get("src") if si else None
    blk["type"] = ["Simple", "Sliced", "Tiled", "Filled"][i(d.get("m_Type"))]
    blk["color"], blk["alpha"] = color(d.get("m_Color"))
    blk["ppuMul"] = num(f(d.get("m_PixelsPerUnitMultiplier"), 1.0))
    if si and si.get("src"):
        if si.get("border"):
            blk["border"] = si["border"]
            if si["border"] != si["borderSrc"]:
                blk["borderSrc"] = si["borderSrc"]
        blk["texSize"] = si["texSize"]
        if si["srcSize"] != si["texSize"]:
            blk["srcSize"] = si["srcSize"]
        if si.get("spriteRect"):
            blk["spriteRect"] = si["spriteRect"]
            blk["spriteName"] = si["spriteName"]
        if si["ppu"] != 100:
            blk["ppu"] = num(si["ppu"])
    if si and si.get("builtin"):
        blk["builtin"] = si["builtin"]
    blk["preserveAspect"] = i(d.get("m_PreserveAspect")) == 1
    blk["fillCenter"] = i(d.get("m_FillCenter"), 1) == 1
    if blk["type"] == "Filled":
        blk["fill"] = {"method": i(d.get("m_FillMethod")), "amount": num(f(d.get("m_FillAmount"), 1)),
                       "origin": i(d.get("m_FillOrigin")), "clockwise": i(d.get("m_FillClockwise")) == 1}
    mp = material_path(d.get("m_Material"))
    if mp:
        blk["materialPath"] = mp
    if i(d.get("m_RaycastTarget")) == 1:
        blk["raycast"] = True
    return blk


def weight_of(fontpath, style):
    nm = Path(fontpath).stem if fontpath else ""
    w = "Regular"
    for cand in ("ExtraBold", "SemiBold", "Bold", "Medium", "Light", "Thin", "Black", "Regular"):
        if cand.lower() in nm.lower():
            w = cand
            break
    if style & 1 and w in ("Regular", "Medium"):
        w = "Bold"
    return w, nm


H_ALIGN = {1: "left", 2: "center", 4: "right", 8: "justified", 16: "flush", 32: "geometry"}
V_ALIGN = {256: "top", 512: "middle", 1024: "bottom", 2048: "baseline", 4096: "geometry", 8192: "capline"}


def text_block(d, where):
    fp, _, _ = U.asset_ref(d.get("m_fontAsset"))
    style = i(d.get("m_fontStyle"))
    w, fname = weight_of(fp, style)
    t = d.get("m_text")
    blk = {"text": "" if t is None else str(t), "weight": w, "size": num(f(d.get("m_fontSize"), 36)),
           "autoSize": i(d.get("m_enableAutoSizing")) == 1}
    if blk["autoSize"]:
        blk["sizeMin"] = num(f(d.get("m_fontSizeMin")))
        blk["sizeMax"] = num(f(d.get("m_fontSizeMax")))
    blk["color"], blk["alpha"] = color(d.get("m_fontColor") or d.get("m_Color"))
    gc, ga = color(d.get("m_Color"))
    if (gc, ga) != (blk["color"], blk["alpha"]):
        blk["vertexColor"] = gc
        blk["vertexAlpha"] = ga
    ha = d.get("m_HorizontalAlignment")
    va = d.get("m_VerticalAlignment")
    if ha is None:
        ta = i(d.get("m_textAlignment"), 514)
        ha, va = ta & 0xFF, ta & 0xFF00
    blk["hAlign"] = H_ALIGN.get(i(ha), str(ha))
    blk["vAlign"] = V_ALIGN.get(i(va), str(va))
    if d.get("m_TextWrappingMode") is not None:
        blk["wrap"] = i(d.get("m_TextWrappingMode")) in (1, 2)
    else:
        blk["wrap"] = i(d.get("m_enableWordWrapping")) == 1
    blk["overflow"] = i(d.get("m_overflowMode"))
    blk["lineSpacing"] = num(f(d.get("m_lineSpacing")))
    blk["charSpacing"] = num(f(d.get("m_characterSpacing")))
    if f(d.get("m_wordSpacing")):
        blk["wordSpacing"] = num(f(d.get("m_wordSpacing")))
    if style:
        blk["fontStyle"] = style
    if fname and fname not in ("Pretendard-Bold", "Pretendard-Medium", "Pretendard-Regular"):
        blk["fontAsset"] = fp
    smr = d.get("m_sharedMaterial") or {}
    if smr.get("guid") and smr.get("guid") != (d.get("m_fontAsset") or {}).get("guid"):
        blk["fontMaterial"] = material_path(smr)
    mg = d.get("m_margin") or {}
    mgv = [num(f(mg.get(k))) for k in ("x", "y", "z", "w")]
    if any(mgv):
        blk["margin"] = mgv  # [left, top, right, bottom]
    if i(d.get("m_enableVertexGradient")) == 1:
        g = d.get("m_fontColorGradient") or {}
        blk["gradient"] = {k: color(g.get(k))[0] for k in ("topLeft", "topRight", "bottomLeft", "bottomRight")}
    if i(d.get("m_isRichText"), 1) == 0:
        blk["richText"] = False
    TEXT_ROWS.append((where, blk["text"]))
    return blk


def layout_group(cls, d):
    kind = {"HorizontalLayoutGroup": "H", "VerticalLayoutGroup": "V", "GridLayoutGroup": "Grid"}[cls]
    p = d.get("m_Padding") or {}
    blk = {"kind": kind}
    if kind == "Grid":
        blk["spacing"] = vec(d.get("m_Spacing"))
        blk["cellSize"] = vec(d.get("m_CellSize"))
        blk["startCorner"] = i(d.get("m_StartCorner"))
        blk["startAxis"] = i(d.get("m_StartAxis"))
        blk["constraint"] = i(d.get("m_Constraint"))
        blk["constraintCount"] = i(d.get("m_ConstraintCount"))
    else:
        blk["spacing"] = num(f(d.get("m_Spacing")))
    blk["padding"] = [i(p.get("m_Left")), i(p.get("m_Right")), i(p.get("m_Top")), i(p.get("m_Bottom"))]
    blk["childAlign"] = i(d.get("m_ChildAlignment"))
    if kind != "Grid":
        blk["controlW"] = i(d.get("m_ChildControlWidth")) == 1
        blk["controlH"] = i(d.get("m_ChildControlHeight")) == 1
        blk["expandW"] = i(d.get("m_ChildForceExpandWidth")) == 1
        blk["expandH"] = i(d.get("m_ChildForceExpandHeight")) == 1
        if i(d.get("m_ChildScaleWidth")) or i(d.get("m_ChildScaleHeight")):
            blk["scaleW"] = i(d.get("m_ChildScaleWidth")) == 1
            blk["scaleH"] = i(d.get("m_ChildScaleHeight")) == 1
        blk["reverse"] = i(d.get("m_ReverseArrangement")) == 1
    return blk


BLEND = ["Normal", "Additive", "Screen", "Multiply"]


def build_node(objs, tid, path, excl, depth=0):
    tr = objs[tid]
    td = tr["d"]
    goid = i(td["m_GameObject"]["fileID"])
    go = objs[goid]
    gd = go["d"]
    name = str(gd.get("m_Name") or "")
    where = f"{path}/{name}"
    n = {"name": name, "active": i(gd.get("m_IsActive"), 1) == 1}
    if go.get("prefab"):
        n["prefab"] = go["prefab"]
    if tr["cls"] == 224:
        n["aMin"] = vec(td.get("m_AnchorMin"))
        n["aMax"] = vec(td.get("m_AnchorMax"))
        n["pos"] = vec(td.get("m_AnchoredPosition"))
        n["size"] = vec(td.get("m_SizeDelta"))
        n["pivot"] = vec(td.get("m_Pivot"))
    else:
        n["transform"] = "Transform"
        n["pos"] = vec(td.get("m_LocalPosition"))
    rz = quat_z(td.get("m_LocalRotation") or {})
    if abs(rz) > 1e-4:
        n["rotZ"] = num(rz)
    sc = td.get("m_LocalScale") or {}
    sx, sy = f(sc.get("x"), 1), f(sc.get("y"), 1)
    if abs(sx - 1) > 1e-6 or abs(sy - 1) > 1e-6:
        n["scale"] = [num(sx), num(sy)]
    comps = []
    refs = {}
    props = {}
    disabled = []
    shadows = []
    for c in gd.get("m_Component") or []:
        cid = i(c["component"]["fileID"])
        co = objs.get(cid)
        if co is None:
            ISSUES.append(f"{where}: 컴포넌트 {cid} 없음")
            continue
        if co["cls"] in (224, 4):
            continue
        d = co["d"]
        if co["cls"] == 114:
            cls = U.script_class(co)
        else:
            cls = BUILTIN_COMP.get(co["cls"]) or co["type"]
        comps.append(cls)
        en = i(d.get("m_Enabled"), 1) == 1
        if not en:
            disabled.append(cls)
        cw = f"{where}::{cls}"
        if cls == "Image":
            n["image"] = img_block(d, objs, cw)
        elif cls == "RawImage":
            si = note_sprite(U.sprite_info(d.get("m_Texture"), cw), cw)
            blk = {"src": si.get("src") if si else None}
            if si and si.get("src"):
                blk["texSize"] = si["texSize"]
                if si["srcSize"] != si["texSize"]:
                    blk["srcSize"] = si["srcSize"]
            if si and si.get("unresolved"):
                blk["unresolved"] = si["unresolved"]
            blk["color"], blk["alpha"] = color(d.get("m_Color"))
            uv = d.get("m_UVRect") or {}
            blk["uvRect"] = [num(f(uv.get(k), dv)) for k, dv in (("x", 0), ("y", 0), ("width", 1), ("height", 1))]
            mp = material_path(d.get("m_Material"))
            if mp:
                blk["materialPath"] = mp
            n["rawImage"] = blk
        elif cls == "TextMeshProUGUI":
            n["text"] = text_block(d, cw)
        elif cls == "Text":
            fd = d.get("m_FontData") or {}
            c_, a_ = color(d.get("m_Color"))
            n["text"] = {"text": str(d.get("m_Text") or ""), "weight": "Regular", "size": num(f(fd.get("m_FontSize"), 14)),
                         "color": c_, "alpha": a_, "legacy": True}
        elif cls == "CanvasGroup":
            n["canvasGroup"] = {"alpha": num(f(d.get("m_Alpha"), 1))}
            if i(d.get("m_Interactable"), 1) == 0 or i(d.get("m_BlocksRaycasts"), 1) == 0:
                n["canvasGroup"]["interactable"] = i(d.get("m_Interactable"), 1) == 1
                n["canvasGroup"]["blocksRaycasts"] = i(d.get("m_BlocksRaycasts"), 1) == 1
        elif cls == "Mask":
            n["mask"] = {"kind": "Mask", "showGraphic": i(d.get("m_ShowMaskGraphic"), 1) == 1}
        elif cls == "RectMask2D":
            n["mask"] = {"kind": "RectMask2D", "showGraphic": True}
            pd_ = d.get("m_Padding") or {}
            pv = [num(f(pd_.get(k))) for k in ("x", "y", "z", "w")]
            if any(pv):
                n["mask"]["padding"] = pv
            sv = vec(d.get("m_Softness"))
            if any(sv):
                n["mask"]["softness"] = sv
        elif cls in ("HorizontalLayoutGroup", "VerticalLayoutGroup", "GridLayoutGroup"):
            n["layoutGroup"] = layout_group(cls, d)
        elif cls == "LayoutElement":
            le = {}
            for k, src in (("minW", "m_MinWidth"), ("minH", "m_MinHeight"), ("prefW", "m_PreferredWidth"),
                           ("prefH", "m_PreferredHeight"), ("flexW", "m_FlexibleWidth"), ("flexH", "m_FlexibleHeight")):
                v = f(d.get(src), -1)
                if v != -1:
                    le[k] = num(v)
            if i(d.get("m_IgnoreLayout")) == 1:
                le["ignore"] = True
            n["layoutElement"] = le
        elif cls == "ContentSizeFitter":
            n["sizeFitter"] = {"h": i(d.get("m_HorizontalFit")), "v": i(d.get("m_VerticalFit"))}
        elif cls == "TrueShadow":
            c_, a_ = color(d.get("color"))
            shadows.append({"enabled": en, "size": num(f(d.get("size"))), "spread": num(f(d.get("spread"))),
                            "angle": num(f(d.get("offsetAngle"))), "dist": num(f(d.get("offsetDistance"))),
                            "color": c_, "alpha": a_, "blend": BLEND[i(d.get("blendMode"))] if i(d.get("blendMode")) < 4 else i(d.get("blendMode")),
                            "inset": i(d.get("inset")) == 1, "cutout": i(d.get("cutout")) == 1,
                            "useCasterAlpha": i(d.get("useCasterAlpha"), 1) == 1,
                            "ignoreCasterColor": i(d.get("ignoreCasterColor")) == 1})
        elif cls == "Button":
            ss = d.get("m_SpriteState") or {}
            b = {"transition": i(d.get("m_Transition"))}
            for k, src in (("pressed", "m_PressedSprite"), ("disabled", "m_DisabledSprite"),
                           ("highlighted", "m_HighlightedSprite"), ("selected", "m_SelectedSprite")):
                si = note_sprite(U.sprite_info(ss.get(src), f"{cw}.{src}"), f"{cw}.{src}")
                if si and si.get("src"):
                    b[k] = si["src"]
            if b["transition"] == 1:
                cs = d.get("m_Colors") or {}
                b["colors"] = {k: color(cs.get(src)) for k, src in (("normal", "m_NormalColor"), ("pressed", "m_PressedColor"),
                                                                     ("disabled", "m_DisabledColor"), ("highlighted", "m_HighlightedColor"))}
                b["fadeDuration"] = num(f(cs.get("m_FadeDuration"), 0.1))
            if i(d.get("m_Interactable"), 1) == 0:
                b["interactable"] = False
            n["button"] = b
        elif cls == "Canvas":
            cv = {"renderMode": i(d.get("m_RenderMode")), "overrideSorting": i(d.get("m_OverrideSorting")) == 1}
            if cv["overrideSorting"]:
                cv["sortingOrder"] = i(d.get("m_SortingOrder"))
            n["canvas"] = cv
        if co["cls"] == 114 and cls not in NO_PROPS and cls not in ("GraphicRaycaster",):
            sd = {k: v for k, v in d.items() if k not in U_SKIP}
            if sd:
                props[cls] = simplify(sd, objs, cw, refs)
        elif co["cls"] == 114:
            if cls not in ("Image", "RawImage", "Button"):
                collect_tex_refs(d, objs, cw, refs)
    if shadows:
        n["trueShadows"] = shadows
    n["components"] = comps
    if disabled:
        n["disabledComponents"] = disabled
    if props:
        n["props"] = props
    if refs:
        n["refs"] = {k.split("::", 1)[1] if "::" in k else k: v for k, v in refs.items()}
    if "Missing Prefab" in name:
        UNRESOLVED.append(f"{where}: Missing Prefab 자리표시")
    kids = []
    for ch in td.get("m_Children") or []:
        cid = i(ch.get("fileID"))
        if cid not in objs:
            ISSUES.append(f"{where}: 자식 transform {cid} 없음")
            continue
        cgo = objs[i(objs[cid]["d"]["m_GameObject"]["fileID"])]
        if depth == 0 and str(cgo["d"].get("m_Name")) in excl:
            continue
        kids.append(build_node(objs, cid, where, excl, depth + 1))
    if kids:
        n["children"] = kids
    return n


U_SKIP = SKIP_KEYS | {"m_Material", "m_Color", "m_RaycastTarget", "m_RaycastPadding", "m_Maskable", "m_OnCullStateChanged"}


def export_prefab(path, excl=()):
    issues = []
    objs = U.load_expanded(path, issues)
    ISSUES.extend(issues)
    roots = [k for k, o in objs.items() if o["cls"] in (224, 4) and i((o["d"].get("m_Father") or {}).get("fileID")) == 0]
    assert len(roots) == 1, (path, roots)
    return build_node(objs, roots[0], "", set(excl))


def main():
    U.DATA.mkdir(parents=True, exist_ok=True)
    out = {}
    out["tutorial"] = export_prefab(PREFABS["tutorial"], EXCLUDE["tutorial"])
    out["winnerBanner"] = export_prefab(PREFABS["winnerBanner"])
    # 배너 셀: 배너 안 PrefabInstance 의 원본
    cell_path = None
    for o in U.parse_unity_file(U.UNITY / PREFABS["winnerBanner"]).values():
        if o["cls"] == 1001:
            cell_path = U.guid_path(o["d"]["m_SourcePrefab"]["guid"])
            break
    out["winnerBannerCell"] = export_prefab(cell_path)
    out["toast"] = export_prefab(PREFABS["toast"])
    for k, v in out.items():
        (U.DATA / f"{k}.layout.json").write_text(json.dumps(v, ensure_ascii=False, indent=1), encoding="utf-8")

    # 추가 지정 자산
    extra = [
        ("Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png", "joystick sheet"),
        ("Assets/_Images/Content/Toast/Image_GradientToastPurple.png", "toast purple bg"),
    ]
    icon_dir = U.UNITY / "Assets/_Images/Icon"
    for p in sorted(icon_dir.glob("Icon_Grade*.png")):
        extra.append((f"Assets/_Images/Icon/{p.name}", "grade icon"))
    for p, why in extra:
        if not U.export_texture(p, why):
            UNRESOLVED.append(f"추가 자산 없음: {p}")

    # sprites.json : 멀티 스프라이트 시트 전체 rect (meta 순서)
    sheets = {}
    joy = "Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png"
    sheet_paths = {joy}
    for rel, m in U.MANIFEST.items():
        if U.tex_meta(m["source"])["spriteMode"] == 2:
            sheet_paths.add(m["source"])
    for sp in sorted(sheet_paths):
        meta = U.tex_meta(sp)
        tex = U.export_texture(sp)
        sx, sy = tex["scale"]
        H = tex["srcSize"][1]
        lst = []
        for s in meta["sprites"]:
            x, y, w, h = s["rect"]
            e = {"name": s["name"], "rect": [num(x * sx), num((H - (y + h)) * sy), num(w * sx), num(h * sy)]}
            if any(s["border"]):
                e["border"] = [num(s["border"][0] * sx), num(s["border"][1] * sy), num(s["border"][2] * sx), num(s["border"][3] * sy)]
            lst.append(e)
        sheets[tex["src"]] = lst
    (U.DATA / "materials.json").write_text(json.dumps(MATERIALS, ensure_ascii=False, indent=1), encoding="utf-8")
    (U.DATA / "sprites.json").write_text(json.dumps(sheets, ensure_ascii=False, indent=1), encoding="utf-8")

    man = {k: {kk: vv for kk, vv in v.items() if kk != "_info"} for k, v in U.MANIFEST.items()}
    (U.CACHE / "layout_manifest.json").write_text(json.dumps({
        "textures": man, "issues": ISSUES, "unresolved": sorted(set(UNRESOLVED)),
        "cellPrefab": cell_path,
    }, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"textures={len(man)} issues={len(ISSUES)} unresolved={len(set(UNRESOLVED))}")
    for s in ISSUES[:30]:
        print("ISSUE", s)
    for s in sorted(set(UNRESOLVED))[:60]:
        print("UNRES", s)


if __name__ == "__main__":
    main()
