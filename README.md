# 微博截图工坊 · 轻享版

在浏览器里生成与**微博轻享版（手机端）**高度一致的帖子截图，一键导出 3× 高清 PNG。

纯前端、单页应用，**所有内容只在本机处理，不上传任何数据**。

---

## 特性

**版式还原**

- 402pt 逻辑宽度（iPhone 17 Pro 参考宽度），与真机截图 1:1 对齐
- 正文 16px / 行高 1.45，段间距、图文间距按真机实测校准
- 两种版式：详情页 / 信息流
- 明暗双主题
- 会员皇冠、置顶标记、关注按钮、查看翻译 · 编辑历史等细节可开关

**字体**

- 内嵌 Noto Sans SC 子集（族名 `Weibo Sans`），不依赖系统字体
- 因此在 Windows / macOS / Linux 上导出的字形完全一致
- 保留可变字重轴，昵称用的 600 字重是真实字重，不是伪粗体

**排版细节**

- 连排全角标点挤压：`草莓！！！` 不会散成 `草莓！ ！ ！`（模拟 iOS 排版）
- 长文「全文」折叠，按可见行数在折点处截断
- `@用户`、`#话题#`、链接自动着色

**内容模块**

- 九宫格配图，1 / 2 / 3 / 4 / 9 张自动布局
- 转发卡（嵌套灰卡形式，保留原帖头像、昵称、正文、配图）
- 评论区，每条可单独加「博主回复」灰卡
- 点赞 / 评论 / 转发数据，支持 `1.2万` 这类缩写

**导出**

- 3× / 2× / 1× 可选，超大卡片自动降低倍率以免超出 canvas 上限
- 可下载 PNG，或直接复制到剪贴板
- `Ctrl/Cmd + S` 快捷导出，`Ctrl/Cmd + Z` 撤销
- 草稿自动保存在本机 `localStorage`

---

## 快速开始

直接用浏览器打开 `index.html` 即可，无需安装任何东西。

如需通过本地服务器访问（推荐，行为与线上一致）：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000/index.html`。

`demo.html` 是场景审查页，把 10 个典型状态并排渲染出来，方便核对细节。
它内嵌了 iframe，**必须用本地服务器打开**，`file://` 下会被浏览器按 opaque origin 拦掉。

---

## 目录结构

```
.
├── index.html              编辑器主页面
├── demo.html               场景审查页（10 个典型状态并排）
├── assets/
│   ├── app.js              状态模型、渲染、导出、草稿与撤销
│   ├── style.css           编辑器 UI + 卡片皮肤（保真区）
│   ├── og-cover.png        分享封面 1200×630
│   ├── fonts/
│   │   ├── weibo-sans.woff2  Noto Sans SC 子集，约 1.9 MB
│   │   └── OFL.txt           字体许可证（SIL OFL 1.1）
│   └── vendor/
│       └── html2canvas.min.js
└── tools/
    └── build_font.py       字体子集化脚本
```

---

## 字体

`assets/fonts/weibo-sans.woff2` 是 **Noto Sans SC** 的子集，采用 [SIL Open Font License 1.1](assets/fonts/OFL.txt) 授权，可自由分发与商用。

- 版权：© 2014-2021 Adobe，Reserved Font Name `Source`
- 子集范围：GB2312 全集 + ASCII + 中文标点 + 常用符号
- 保留 `wght 100-900` 可变轴与 `tnum` 等数字特性
- 子集族名改为 `Weibo Sans`，未使用保留名 `Source`（符合 OFL 第 3 条）

重新生成：

```bash
pip install fonttools brotli
python tools/build_font.py
```

需本机存在 `C:\Windows\Fonts\NotoSansSC-VF.ttf`，其他平台可自行下载 Noto Sans SC 后修改脚本里的 `SRC`。

---

## 已知限制

- **配图不会随草稿保存**。文字、头像、各项设置会存进 `localStorage`，配图不会 —— 刷新页面后需要重新添加图片。这么做是为了避免 base64 大图撑爆 `localStorage` 的 5 MB 配额。
- **九宫格内图片顺序不能调整**，只能删除后按顺序重新添加。
- **生僻字会回落到系统字体**。子集覆盖 GB2312 的 6763 个汉字（日常用字 99% 以上），但「珺」「玥」这类人名常用字不在其中，会回落到系统字体，可能与全文字形略有差异。如需完全覆盖，把字符集扩到 GBK 全集即可，代价是字体体积从 1.9 MB 涨到约 5.5 MB。
- 需要较新的 Chrome / Edge / Safari。`html2canvas` 与 `Intl` 相关特性在老旧浏览器上可能不正常。

---

## 说明

本项目仅供个人学习与排版研究使用。生成的图片会带上与真实微博界面高度一致的样式，
请勿用于伪造他人言论、制造虚假信息等用途。
