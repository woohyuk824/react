"""전체 파이프라인 실행. PyYAML·Pillow·fontTools(+brotli) 가 모두 있는 파이썬으로 실행할 것.
예: C:/Users/KLP/AppData/Local/Programs/Python/Python310/python.exe -X utf8 tools/run_all.py
"""
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
for mod in ("yaml", "PIL", "fontTools", "brotli"):
    try:
        __import__(mod)
    except ImportError:
        print(f"[warn] {mod} 없음 ({sys.executable})")
for s in ("export_layouts.py", "export_media.py", "export_products.py", "make_report.py"):
    print(f"== {s}")
    r = subprocess.run([sys.executable, "-X", "utf8", str(HERE / s)] + sys.argv[1:])
    if r.returncode:
        sys.exit(r.returncode)
