# -*- coding: utf-8 -*-
"""
把 Noto Sans SC 可变字体子集化，产出 assets/fonts/weibo-sans.woff2。

为什么要内嵌字体：卡片原本的字体栈是 PingFang SC / HarmonyOS Sans SC / MiSans /
Hiragino Sans GB / Microsoft YaHei，前四个在 Windows 上都不存在，会静默回落到
微软雅黑（横画末端上翘、字面偏宽），一眼不像真机截图。

用法：
    pip install fonttools brotli
    python tools/build_font.py

依赖本机存在 Noto Sans SC 可变字体（Windows 通常自带）：
    C:\\Windows\\Fonts\\NotoSansSC-VF.ttf
其他平台可从 https://fonts.google.com/noto/specimen/Noto+Sans+SC 下载后改 SRC。

产出：assets/fonts/weibo-sans.woff2（约 1.9 MB）
保留 wght 轴(100-900)，这样 400/500/600 都能精准渲染。
字符集：GB2312 全集(6763 汉字 + 全角符号) + ASCII + 常用标点 + 少量网络用字。
"""
import os
from fontTools import subset
from fontTools.ttLib import TTFont

SRC = r"C:\Windows\Fonts\NotoSansSC-VF.ttf"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "fonts")
OUT = os.path.abspath(os.path.join(OUT_DIR, "weibo-sans.woff2"))

chars = set()

# 1) ASCII 可见字符
chars |= {chr(c) for c in range(0x20, 0x7F)}
# 2) GB2312 全集
for hi in range(0xA1, 0xFF):
    for lo in range(0xA1, 0xFF):
        try:
            chars.add(bytes([hi, lo]).decode("gb2312"))
        except UnicodeDecodeError:
            pass
# 3) 中文标点与常用符号
for lo, hi in [
    (0x00A0, 0x00FF),   # Latin-1 补充（·、°、×、÷ 等）
    (0x2000, 0x206F),   # 通用标点（–—''""…‰）
    (0x20A0, 0x20BF),   # 货币符号
    (0x2190, 0x21FF),   # 箭头
    (0x2460, 0x24FF),   # 带圈数字
    (0x25A0, 0x25FF),   # 几何图形
    (0x2600, 0x26FF),   # 杂项符号
    (0x3000, 0x303F),   # CJK 标点
    (0xFE10, 0xFE1F),   # 竖排标点
    (0xFF00, 0xFFEF),   # 全角形式
]:
    chars |= {chr(c) for c in range(lo, hi + 1)}
# 4) 高频但不在 GB2312 的常见字
chars |= set("囧怼叕淼焱垚犇骉鑫森喆昶昇珩璟璐瑜瑾萱宸昊昱晗曦煜炜烨")
# 5) 微博 UI 里出现的隐藏字符
chars |= set("\u200b\u200c\u200d\u00a0\u3000")

text = "".join(sorted(chars))
print("目标字符数:", len(text))

os.makedirs(OUT_DIR, exist_ok=True)

args = [
    SRC,
    "--output-file=" + OUT,
    "--flavor=woff2",
    "--text=" + text,
    "--layout-features=kern,liga,clig,calt,locl,ccmp,mark,mkmk,palt,halt,tnum,pnum,zero,case",
    # 保留全部 name 记录，OFL 要求版权与许可声明随字体分发
    "--name-IDs=*",
    "--drop-tables+=DSIG",
    "--no-hinting",
    "--desubroutinize",
    "--recalc-bounds",
    "--recalc-average-width",
]
# 默认即保留全部可变轴(gvar/fvar)，不 pin 实例
subset.main(args)

size = os.path.getsize(OUT)
print("输出:", OUT)
print("woff2 体积: %.2f MB" % (size / 1024 / 1024))

f = TTFont(OUT, lazy=True)
print("子集字形数:", f["maxp"].numGlyphs)
print("保留轴:", [a.axisTag for a in f["fvar"].axes] if "fvar" in f else "无")
cmap = f.getBestCmap()
probe = "微博正文测试九宫格评论转发"
missing = [c for c in probe if ord(c) not in cmap]
print("探针缺字:", missing if missing else "无")
