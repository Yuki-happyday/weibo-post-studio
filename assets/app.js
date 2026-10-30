/* =========================================================
   微博截图工坊 · 轻享版
   纯前端 · 本地渲染 · 无任何数据上传
   参考基线：微博轻享版 iOS 402pt，3x 截图取样
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- 图标（描边 1.5，21px） ---------------- */
  const S = 'width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
  const I_LIKE = `<svg ${S}><path d="M7.6 10.6V20H4.7a1.2 1.2 0 0 1-1.2-1.2v-7a1.2 1.2 0 0 1 1.2-1.2h2.9Z"/><path d="M7.6 10.6l3.7-6.3a2.35 2.35 0 0 1 3.2 3l-.9 3.3h4a2.1 2.1 0 0 1 2.1 2.5l-.85 5.1A2.1 2.1 0 0 1 16.75 20H7.6"/></svg>`;
  const I_CMT = `<svg ${S}><path d="M20 11.4c0 3.7-3.6 6.7-8 6.7-.95 0-1.9-.15-2.75-.42L5.2 19.2l.85-3.2C4.75 14.7 4 13.1 4 11.4 4 7.7 7.6 4.7 12 4.7s8 3 8 6.7Z"/><path d="M8.6 9.4h6.8M8.6 12.6h4.4"/></svg>`;
  const I_RP = `<svg ${S}><path d="M14.2 3.6h6.2v6.2"/><path d="M20.4 3.6 12.3 11.7"/><path d="M18.4 13.9v4.6a1.9 1.9 0 0 1-1.9 1.9H5.5a1.9 1.9 0 0 1-1.9-1.9V7.5a1.9 1.9 0 0 1 1.9-1.9h4.3"/></svg>`;
  const I_SHARE = `<svg ${S}><circle cx="17.8" cy="5.6" r="2.5"/><circle cx="6.2" cy="12" r="2.5"/><circle cx="17.8" cy="18.4" r="2.5"/><path d="M8.4 10.8l7 -3.9M8.4 13.2l7 3.9"/></svg>`;
  const I_SORT = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h9M4 12h6M4 17h3"/><path d="M17.5 5.5v13"/><path d="M14.2 15.2l3.3 3.3 3.3-3.3"/></svg>';
  const I_UP = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5"/><path d="M5.5 11.5 12 5l6.5 6.5"/></svg>';
  const I_CROWN = '<svg width="13" height="13" viewBox="0 0 24 24"><path d="M3.4 7.6l4.2 3.2L12 4.2l4.4 6.6 4.2-3.2-1.7 9.6a1.4 1.4 0 0 1-1.4 1.1H6.5a1.4 1.4 0 0 1-1.4-1.1L3.4 7.6Z" fill="#f5b400" stroke="#e0a200" stroke-width="1" stroke-linejoin="round"/></svg>';
  const I_CHEV = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
  const I_LIKE_SM = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.6 10.6V20H4.7a1.2 1.2 0 0 1-1.2-1.2v-7a1.2 1.2 0 0 1 1.2-1.2h2.9Z"/><path d="M7.6 10.6l3.7-6.3a2.35 2.35 0 0 1 3.2 3l-.9 3.3h4a2.1 2.1 0 0 1 2.1 2.5l-.85 5.1A2.1 2.1 0 0 1 16.75 20H7.6"/></svg>';
  const I_RP_SM = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.2 3.6h6.2v6.2"/><path d="M20.4 3.6 12.3 11.7"/><path d="M18.4 13.9v4.6a1.9 1.9 0 0 1-1.9 1.9H5.5a1.9 1.9 0 0 1-1.9-1.9V7.5a1.9 1.9 0 0 1 1.9-1.9h4.3"/></svg>';
  const I_CMT_SM = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.4c0 3.7-3.6 6.7-8 6.7-.95 0-1.9-.15-2.75-.42L5.2 19.2l.85-3.2C4.75 14.7 4 13.1 4 11.4 4 7.7 7.6 4.7 12 4.7s8 3 8 6.7Z"/></svg>';

  /* ---------------- 工具 ---------------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* 微博的 @ 与 #话题# 和 X 完全不同：
     - 话题是成对的 #文字#，单个 # 不高亮
     - @ 支持中文昵称，但不是邮箱的一部分 */
  const RE_TOK = /(https?:\/\/[^\s<]+)|(#([^#\s<>]{1,30})#)|(@[\u4e00-\u9fa5A-Za-z0-9_\-]{1,20})/g;

  /* 连排感叹号/问号挤压，模拟 iOS 的标点连排。
     为什么只收 ！？：浏览器对「。，、；：」的连排本来就有原生挤压
     （3 连只占 2 字宽，实测见 _dev/punct_width.html），再压一次会把句号叠成一个黑点。
     偏偏 ！和 ？ 属于不可压缩类，3 连仍是满 3 字宽，在真机上是紧贴的 —— 这才是要补的差。
     右引号/右括号一并纳入挤压块，否则「啊！！！”」的引号享受不到负字距，会甩出老远。
     不要在整段 HTML 上跑，会写进 <span> 标签内部，只在纯文本片段上调用。 */
  const RE_TIGHT = /([！？]{2,}[”’）】」』》〉〕]*)/g;
  const TIGHT_PROBE = /[！？]{2}/;
  function tightPunct(s) {
    if (!TIGHT_PROBE.test(s)) return s;
    return s.replace(RE_TIGHT, '<span class="w-tight">$1</span>');
  }

  function linkify(raw) {
    const text = String(raw == null ? '' : raw);
    const safe = esc(text);
    let out = '', last = 0, m;
    RE_TOK.lastIndex = 0;
    while ((m = RE_TOK.exec(safe))) {
      const start = m.index;
      if (m[3] !== undefined) {
        out += tightPunct(safe.slice(last, start)) + '<span class="w-lnk">' + m[2] + '</span>';
        last = start + m[2].length; /* m[2] 已含首尾两个 # */
        continue;
      }
      if (m[4] !== undefined) {
        const prev = safe[start - 1] || '';
        /* 邮箱里的 @ 不是提及：原样输出，绝不能直接跳过——
           跳过会连同 start 之前的正文一起丢掉 */
        if (/[A-Za-z0-9._%+\-]/.test(prev)) {
          out += tightPunct(safe.slice(last, start)) + m[4];
          last = start + m[4].length;
          continue;
        }
      }
      out += tightPunct(safe.slice(last, start)) + '<span class="w-lnk">' + m[0] + '</span>';
      last = start + m[0].length;
    }
    out += tightPunct(safe.slice(last));
    return out;
  }

  function fmtNum(v) {
    const s = String(v == null ? '' : v).trim();
    if (!s) return '';
    if (!/^\d+(\.\d+)?$/.test(s)) return s;          /* 用户自己写了「2.8万」 */
    const n = parseFloat(s);
    if (n < 10000) return String(n % 1 === 0 ? n : n.toFixed(1));
    if (n < 100000000) {
      const w = n / 10000;
      return (w >= 100 ? Math.round(w) : (Math.round(w * 10) / 10)) + '万';
    }
    const y = n / 100000000;
    return (Math.round(y * 10) / 10) + '亿';
  }

  function hashColor(str) {
    let h = 0;
    const s = String(str || '微博');
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
    return 'hsl(' + h + ',42%,58%)';
  }

  let toastTimer = 0;
  function toast(msg, err) {
    const el = $('#toast');
    el.textContent = msg;
    el.className = 'toast on' + (err ? ' err' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.className = 'toast' + (err ? ' err' : ''); }, 2200);
  }

  /* ---------------- 状态 ---------------- */
  const KEY = 'weibo-post-studio-v1';

  function uid() { return 'c' + Math.random().toString(36).slice(2, 9); }

  const DEFAULTS = {
    layout: 'detail',            /* detail | feed */
    theme: 'light',
    width: 402,
    name: '示例博主',
    avatar: '',
    crown: true,
    pinned: false,
    showFollow: true,
    text: '把这条微博的发文流程重新捋了一遍：先写正文，再配图，最后检查换行。\n\n排版这件事，细节比想象中重要——行距、段间距、标点全角半角，差一点就不像。\n\n#微博排版# 这个坑我踩过，欢迎交流。',
    fold: false,
    time: '5-24 10:14',
    device: 'iPhone 17 Pro',
    location: '北京',
    showTrans: true,
    nLike: '384',
    nComment: '28',
    nRepost: '3',
    sortLabel: '按热度',
    showComments: true,
    showCommentBox: false,
    repost: { enabled: false, name: '微博管理员', avatar: '', time: '5-24 09:02', text: '这是一条被转发的原帖内容。' },
    comments: [{
      id: uid(), name: '寿巴文火炼金', avatar: '', text: '23年是好年份，羡慕。',
      time: '5-24 12:55', from: '广东', likes: '20',
      reply: { enabled: true, text: '法考元年才值得羡慕，自由且洒脱-：23年开始慢慢收紧了', more: '共 4 条回复' }
    }, {
      id: uid(), name: '一只小法条', avatar: '', text: '这段我反复看了三遍，属实是真实写照。',
      time: '5-24 13:20', from: '北京', likes: '6',
      reply: { enabled: false, text: '', more: '' }
    }]
  };

  let model = load();
  let media = [];                /* [{src,w,h}] 主帖配图，不入草稿 */
  let rpMedia = [];              /* 原帖配图，不入草稿 */

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULTS);
      const saved = JSON.parse(raw);
      const m = Object.assign(clone(DEFAULTS), saved);
      m.repost = Object.assign(clone(DEFAULTS.repost), saved.repost || {});
      m.comments = Array.isArray(saved.comments)
        ? saved.comments.map(c => Object.assign({ id: uid(), avatar: '', reply: { enabled: false, text: '', more: '' } }, c))
        : clone(DEFAULTS.comments);
      return m;
    } catch (e) { return clone(DEFAULTS); }
  }

  let persistTimer = 0;
  function persist() {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      try {
        const c = clone(model);
        c.media = undefined;            /* 配图不进草稿，否则 5MB 秒爆 */
        localStorage.setItem(KEY, JSON.stringify(c));
      } catch (e) { /* 配额满了就算了，不打断使用 */ }
    }, 320);
  }

  /* ---------------- 撤销 ---------------- */
  const MAX_UNDO = 40;
  let history = [], hIdx = -1, lastSnap = '';
  let snapTimer = 0;

  /* 打字时每个字符都入栈的话，40 格历史只够撤回 40 个字符。
     这里把连续输入合并：停顿 600ms 才落一个撤销点，一次撤回退掉整段输入。 */
  function snapTyping() {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => { snapTimer = 0; snap(); }, 600);
  }
  function flushSnap() {
    if (!snapTimer) return;
    clearTimeout(snapTimer); snapTimer = 0; snap();
  }

  function snap() {
    const c = clone(model); c.media = undefined;
    const s = JSON.stringify(c);
    if (s === lastSnap) return;
    history = history.slice(0, hIdx + 1);
    history.push(s);
    if (history.length > MAX_UNDO + 1) history.shift();
    hIdx = history.length - 1;
    lastSnap = s;
    $('#btnUndo').disabled = hIdx <= 0;
  }
  function undo() {
    flushSnap();
    if (hIdx <= 0) return;
    hIdx--;
    const saved = JSON.parse(history[hIdx]);
    model = Object.assign(clone(DEFAULTS), saved);
    model.repost = Object.assign(clone(DEFAULTS.repost), saved.repost || {});
    lastSnap = history[hIdx];
    bindAll();
    render();
    persist();
    $('#btnUndo').disabled = hIdx <= 0;
    toast('已撤销');
  }

  /* ---------------- 图片处理 ---------------- */
  function readFile(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  function loadImg(src) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => res(im);
      im.onerror = rej;
      im.src = src;
    });
  }

  /* 方形裁剪 + 压到 320px，存草稿用（base64 原图会撑爆 localStorage） */
  async function squareDataUrl(file, size) {
    const src = await readFile(file);
    const im = await loadImg(src);
    const s = Math.min(im.naturalWidth, im.naturalHeight);
    const sx = (im.naturalWidth - s) / 2, sy = (im.naturalHeight - s) / 2;
    const box = size || 320;
    const cv = document.createElement('canvas');
    cv.width = cv.height = box;
    const cx = cv.getContext('2d');
    cx.drawImage(im, sx, sy, s, s, 0, 0, box, box);
    return cv.toDataURL('image/webp', 0.86).indexOf('data:image/webp') === 0
      ? cv.toDataURL('image/webp', 0.86)
      : cv.toDataURL('image/jpeg', 0.86);
  }

  /* 配图：长边压到 1600，不裁 */
  async function fitDataUrl(file, maxEdge) {
    const src = await readFile(file);
    const im = await loadImg(src);
    const max = maxEdge || 1600;
    let w = im.naturalWidth, h = im.naturalHeight;
    if (Math.max(w, h) > max) {
      const k = max / Math.max(w, h);
      w = Math.round(w * k); h = Math.round(h * k);
    }
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    cv.getContext('2d').drawImage(im, 0, 0, w, h);
    const out = cv.toDataURL('image/jpeg', 0.86);
    return { src: out, w, h };
  }

  /* ---------------- 渲染 ---------------- */
  const postEl = () => $('#post');

  /* 按「可见行数」折叠：用当前卡片宽度估每行字数，超过 5 行就截断并挂「… 全文」 */
  function foldText(t, width) {
    const s = String(t || '');
    const perLine = Math.max(10, Math.floor((Math.max(240, width || 402) - 28) / 16));
    const maxLines = 5;
    const paras = s.split('\n');
    const needOf = p => Math.max(1, Math.ceil(p.length / perLine));
    const total = paras.reduce((sum, p) => sum + needOf(p), 0);
    if (total <= maxLines) return null;
    let used = 0;
    const out = [];
    for (const p of paras) {
      const need = needOf(p);
      if (used + need <= maxLines) { out.push(p); used += need; continue; }
      const rest = maxLines - used;
      if (rest > 0) out.push(p.slice(0, rest * perLine));
      break;
    }
    return out.join('\n').replace(/\s+$/, '');
  }

  function repostHtml(m) {
    if (!m.repost || !m.repost.enabled) return '';
    const r = m.repost;
    return `<div class="w-rp">
      <div class="w-rp-h">
        <div class="w-rp-av" data-av="repost"></div>
        <span class="w-rp-n">${esc(r.name || '原博主')}</span>
        <span class="w-rp-t">${esc(r.time || '')}</span>
      </div>
      <div class="w-rp-x">${linkify(r.text)}</div>
      ${gridHtml(rpMedia, 'rmi', Math.min(model.width - 28 - 22 - 2, 206))}
    </div>`;
  }

  /* list 用哪个数组、tag 决定 data-mi / data-rmi、cw 是可用内容宽 */
  function gridHtml(list, tag, cw) {
    const n = list.length;
    if (!n) return '';
    const cols = (n === 2 || n === 4) ? 2 : (n === 1 ? 1 : 3);
    const gap = 3;
    const cell = Math.floor((Math.max(120, cw) - gap * (cols - 1)) / cols);
    let cells = '';
    for (let i = 0; i < n; i++) {
      const size = n === 1 ? '' : ` style="width:${cell}px;height:${cell}px"`;
      cells += `<div class="w-cell" data-${tag}="${i}"${size}></div>`;
    }
    return `<div class="w-grid n${n}">${cells}</div>`;
  }

  function actsHtml(m, detail) {
    const like = fmtNum(m.nLike), cmt = fmtNum(m.nComment), rp = fmtNum(m.nRepost);
    if (detail) {
      return `<div class="w-acts">
        <span class="w-act detail">${I_LIKE}</span>
        <span class="w-act detail">${I_CMT}</span>
        <span class="w-act detail">${I_RP}</span>
        <span class="w-act detail">${I_SHARE}</span>
      </div>`;
    }
    return `<div class="w-acts">
      <span class="w-act">${I_LIKE}${like ? `<span class="w-num">${esc(like)}</span>` : ''}</span>
      <span class="w-act">${I_CMT}${cmt ? `<span class="w-num">${esc(cmt)}</span>` : ''}</span>
      <span class="w-act">${I_RP}${rp ? `<span class="w-num">${esc(rp)}</span>` : ''}</span>
      <span class="w-act">${I_SHARE}</span>
    </div>`;
  }

  function tabsHtml(m) {
    const like = fmtNum(m.nLike), cmt = fmtNum(m.nComment), rp = fmtNum(m.nRepost);
    return `<div class="w-tabs">
      <span class="w-tab">赞${like ? `<span class="w-num">${esc(like)}</span>` : ''}</span>
      <span class="w-tab on">评论${cmt ? `<span class="w-num">${esc(cmt)}</span>` : ''}</span>
      <span class="w-tab r">转发${rp ? `<span class="w-num">${esc(rp)}</span>` : ''}</span>
    </div>`;
  }

  function commentHtml(m, c, i) {
    const r = c.reply || {};
    const like = fmtNum(c.likes);
    const reply = (r.enabled && (r.text || r.more)) ? `<div class="w-creply">
        ${r.text ? `<p><span class="w-lnk">${esc(m.name)}</span><span class="w-bozhu">博主</span>：${linkify(r.text)}</p>` : ''}
        ${r.more ? `<span class="w-morereply">${esc(r.more)}${I_CHEV}</span>` : ''}
      </div>` : '';
    return `<div class="w-cmt" data-ci="${i}">
      <div class="w-cav" data-av="comment"></div>
      <div class="w-cmain">
        <div class="w-cname">${esc(c.name || '')}</div>
        <div class="w-ctext">${linkify(c.text || '')}</div>
        ${reply}
        <div class="w-cfoot">
          ${c.time ? `<span>${esc(c.time)}</span>` : ''}
          ${c.from ? `<span class="w-cfrom">来自 ${esc(c.from)}</span>` : ''}
          <span class="w-cright">
            ${like ? `<span class="w-clike">${esc(like)}${I_LIKE_SM}</span>` : ''}
            ${I_RP_SM}${I_CMT_SM}
          </span>
        </div>
      </div>
    </div>`;
  }

  function postHtml() {
    const m = model;
    const detail = m.layout === 'detail';
    let h = '';

    if (m.pinned) h += `<div class="w-zhiding">${I_UP}置顶</div>`;

    h += `<div class="w-head">
      <div class="w-av"><div class="w-av-in" data-av="main"></div></div>
      <div class="w-id">
        <div class="w-name"><b>${esc(m.name || '')}</b>${m.crown ? I_CROWN : ''}</div>
        <div class="w-sub">
          ${m.time ? `<span>${esc(m.time)}</span>` : ''}
          ${m.device ? `<span>${esc(m.device)}</span>` : ''}
        </div>
      </div>
      ${m.showFollow ? '<span class="w-follow">关注</span>' : ''}
    </div>`;

    const hasText = String(m.text || '').trim() !== '';
    let body = '';
    if (!hasText) {
      body = '';
    } else if (m.fold) {
      const cut = foldText(m.text, m.width);
      body = cut === null
        ? `<div class="w-text">${linkify(m.text)}</div>`
        : `<div class="w-text">${linkify(cut)}<span class="w-more">… 全文</span></div>`;
    } else {
      body = `<div class="w-text">${linkify(m.text)}</div>`;
    }
    h += body + repostHtml(m) + gridHtml(media, 'mi', m.width - 28);

    const metaL = (detail && m.showTrans) ? '<span class="w-meta-l">查看翻译 · 编辑历史</span>' : '';
    const metaR = (detail && m.location) ? `<span class="w-meta-r">发布于 ${esc(m.location)}</span>` : '';
    if (metaL || metaR) h += `<div class="w-meta">${metaL}${metaR}</div>`;

    h += actsHtml(m, detail);

    if (detail) {
      h += '<div class="w-band"></div>' + tabsHtml(m);
      if (m.showComments && m.comments.length) {
        if (m.sortLabel) h += `<div class="w-sort">${I_SORT}${esc(m.sortLabel)}</div>`;
        h += '<div class="w-comments">' + m.comments.map((c, i) => commentHtml(m, c, i)).join('') + '</div>';
      }
      if (m.showCommentBox) {
        h += `<div class="w-cbox"><div class="w-cav" data-av="cbox"></div><span class="w-cbox-t">写评论…</span></div>`;
      }
    }
    return h;
  }

  /* 图片一律走 <img> + 属性赋值，绝不拼进 innerHTML（base64 里的引号会截断属性） */
  const imgCache = new Map();

  function cacheImg(key, src) {
    let im = imgCache.get(key);
    if (!im) {
      if (imgCache.size > 80) imgCache.clear();   /* 换图多时别无限堆 */
      im = new Image(); im.src = src; imgCache.set(key, im);
    }
    return im;
  }

  function paintAvatar(box, src, name, cls) {
    if (!box) return;
    box.innerHTML = '';
    if (src) {
      /* key 必须用完整 src：只取长度/尾部片段时，两张不同但等长的图会撞成同一张 */
      box.appendChild(cacheImg('av:' + src, src));
    } else {
      box.textContent = String(name || '微').trim().slice(0, 1);
      box.style.background = hashColor(name);
    }
  }

  function paint() {
    const m = model;
    const root = postEl();

    paintAvatar($('[data-av="main"]', root), m.avatar, m.name);
    paintAvatar($('[data-av="repost"]', root), m.repost && m.repost.avatar, m.repost && m.repost.name);
    paintAvatar($('[data-av="cbox"]', root), '', '');

    $$('.w-cmt', root).forEach((el, i) => {
      const c = m.comments[i];
      if (!c) return;
      paintAvatar($('[data-av="comment"]', el), c.avatar, c.name);
    });

    $$('.w-cell', root).forEach(cell => {
      const isRp = cell.dataset.rmi !== undefined;
      const i = +(isRp ? cell.dataset.rmi : cell.dataset.mi);
      const item = (isRp ? rpMedia : media)[i];
      /* 无效项宁可不放图，也别塞一个 src="undefined" 的坏 img：
         坏图既会让 html2canvas 画错，也会让 imgsReady 等到天荒地老 */
      if (!item || !item.src) return;
      cell.appendChild(cacheImg((isRp ? 'rd:' : 'md:') + item.src, item.src));
    });
  }

  function render() {
    const root = postEl();
    root.dataset.theme = model.theme;
    root.dataset.layout = model.layout;
    root.style.width = model.width + 'px';
    root.innerHTML = postHtml();
    paint();
    $('.card-shadow').classList.toggle('is-dark', model.theme === 'dark');

    const w = root.offsetWidth, hgt = root.offsetHeight;
    $('#stageSize').textContent = w + ' × ' + hgt;
    const cn = (model.text || '').length;
    $('#charCount').textContent = String(cn);
    /* 微博正文上限 2000 字，超了发不出去，先在这里提醒 */
    $('#charCount').parentNode.classList.toggle('over', cn > 2000);
  }

  /* ---------------- 编辑器绑定 ---------------- */
  function bindAll() {
    $$('[data-model]').forEach(el => {
      const k = el.dataset.model;
      if (el.type === 'checkbox') el.checked = !!model[k];
      else el.value = model[k] == null ? '' : model[k];
    });
    $$('[data-rf]').forEach(el => {
      const k = el.dataset.rf;
      if (el.type === 'checkbox') el.checked = !!model.repost[k];
      else el.value = model.repost[k] == null ? '' : model.repost[k];
    });
    $('#repostToggle').checked = !!model.repost.enabled;
    $('#repostBox').hidden = !model.repost.enabled;

    $('#widthRange').value = model.width;
    $('#widthVal').textContent = model.width;

    $$('#layoutSeg button').forEach(b => b.classList.toggle('on', b.dataset.layout === model.layout));
    $$('#themeSeg button').forEach(b => b.classList.toggle('on', b.dataset.theme === model.theme));

    renderPreviewAvatar(model.avatar);
    renderRepostAvatar(model.repost.avatar);
    renderMediaEditor();
    rebuildCommentEditor();
    $('#btnUndo').disabled = hIdx <= 0;
  }

  function bindInputs() {
    $$('[data-model]').forEach(el => {
      const k = el.dataset.model;
      const ev = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(ev, () => {
        model[k] = el.type === 'checkbox' ? el.checked : el.value;
        render();
        persist();
        if (ev === 'input' && el.type !== 'checkbox') snapTyping(); else snap();
      });
    });

    $$('[data-rf]').forEach(el => {
      const k = el.dataset.rf;
      const ev = (el.type === 'checkbox') ? 'change' : 'input';
      el.addEventListener(ev, () => {
        model.repost[k] = el.type === 'checkbox' ? el.checked : el.value;
        render();
        persist();
        if (ev === 'input' && el.type !== 'checkbox') snapTyping(); else snap();
      });
    });

    $('#repostToggle').addEventListener('change', e => {
      model.repost.enabled = e.target.checked;
      $('#repostBox').hidden = !e.target.checked;
      render(); persist(); snap();
    });

    $('#widthRange').addEventListener('input', e => {
      model.width = +e.target.value;
      $('#widthVal').textContent = model.width;
      render(); persist();
    });
    $('#widthRange').addEventListener('change', () => snap());

    $$('#layoutSeg button').forEach(b => b.addEventListener('click', () => {
      model.layout = b.dataset.layout;
      $$('#layoutSeg button').forEach(x => x.classList.toggle('on', x === b));
      render(); persist(); snap();
    }));

    $$('#themeSeg button').forEach(b => b.addEventListener('click', () => {
      model.theme = b.dataset.theme;
      $$('#themeSeg button').forEach(x => x.classList.toggle('on', x === b));
      render(); persist(); snap();
    }));

    /* 头像 */
    const pickAvatar = () => $('#avatarFile').click();
    $('#avatarPick').addEventListener('click', pickAvatar);
    $('#avatarPick').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickAvatar(); } });
    $('#avatarFile').addEventListener('change', async e => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      try {
        model.avatar = await squareDataUrl(f, 320);
        renderPreviewAvatar(model.avatar);
        render(); persist(); snap();
      } catch (err) { toast('头像处理失败，换张图试试', true); }
      e.target.value = '';
    });
    $('#avatarClear').addEventListener('click', () => {
      model.avatar = '';
      renderPreviewAvatar('');
      render(); persist(); snap();
    });

    /* 转发原帖头像 */
    const pickRp = () => $('#repostAvatarFile').click();
    $('#repostAvatarPick').addEventListener('click', pickRp);
    $('#repostAvatarPick').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickRp(); } });
    $('#repostAvatarFile').addEventListener('change', async e => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      try {
        model.repost.avatar = await squareDataUrl(f, 240);
        renderRepostAvatar(model.repost.avatar);
        render(); persist(); snap();
      } catch (err) { toast('头像处理失败', true); }
      e.target.value = '';
    });
    $('#repostAvatarClear').addEventListener('click', () => {
      model.repost.avatar = '';
      renderRepostAvatar('');
      render(); persist(); snap();
    });

    /* 配图 */
    bindMediaAdd('#btnAddMedia', '#mediaFile', 'main');
    bindMediaAdd('#btnAddRpMedia', '#rpMediaFile', 'repost');

    $('#btnUndo').addEventListener('click', undo);
    $('#btnClear').addEventListener('click', () => {
      const keep = { theme: model.theme, width: model.width, layout: model.layout };
      model = clone(DEFAULTS);
      model.name = ''; model.text = ''; model.time = ''; model.device = '';
      model.location = ''; model.nLike = ''; model.nComment = ''; model.nRepost = '';
      model.comments = []; model.avatar = '';
      model.repost = { enabled: false, name: '', avatar: '', verified: false, time: '', text: '' };
      media = []; rpMedia = []; renderRpMediaEditor();
      Object.assign(model, keep);
      bindAll(); render(); persist(); snap();
      toast('已清空');
    });
    $('#btnReset').addEventListener('click', () => {
      model = clone(DEFAULTS);
      media = []; rpMedia = []; renderRpMediaEditor();
      bindAll(); render(); persist(); snap();
      toast('已恢复示例');
    });
  }

  /* 主帖 / 原帖两套配图共用一套上传逻辑 */
  async function addFiles(files, kind) {
    const list = kind === 'repost' ? rpMedia : media;
    const imgs = Array.from(files || []).filter(f => f && /^image\//.test(f.type));
    if (!imgs.length) { toast('只能添加图片文件', true); return; }
    const room = 9 - list.length;
    if (room <= 0) { toast('最多 9 张，先删掉几张再加', true); return; }

    const over = imgs.length > room;
    toast('正在处理图片…');
    const failed = [];
    for (const f of imgs.slice(0, room)) {
      try { list.push(await fitDataUrl(f, 1600)); }
      catch (err) { failed.push(f.name || '图片'); }
    }
    if (kind === 'repost') renderRpMediaEditor(); else renderMediaEditor();
    render(); snap();

    /* 失败不再静默：HEIC / 超大图浏览器解码不了，用户得知道 */
    if (failed.length) {
      toast(failed.length + ' 张读取失败（HEIC 等格式无法解码），请先转成 JPG 或 PNG', true);
    } else if (over) {
      toast('已添加 ' + room + ' 张，超出 9 张上限的部分未加入', true);
    } else {
      toast('已添加 ' + (imgs.length - failed.length) + ' 张');
    }
  }

  function bindMediaAdd(btnSel, fileSel, kind) {
    const add = $(btnSel), inp = $(fileSel);
    if (!add || !inp) return;
    add.addEventListener('click', () => inp.click());
    inp.addEventListener('change', async e => {
      await addFiles(e.target.files, kind);
      e.target.value = '';
    });
  }

  /* 截图工具和微信里的图，最顺手的路径是 Ctrl+V 或直接拖进来 */
  function bindDropPaste() {
    const hot = [$('#stage'), $('.editor')].filter(Boolean);

    hot.forEach(box => {
      let depth = 0;
      box.addEventListener('dragenter', e => {
        if (!Array.from(e.dataTransfer.types || []).includes('Files')) return;
        depth++; e.preventDefault(); box.classList.add('drop-on');
      });
      box.addEventListener('dragover', e => {
        if (!Array.from(e.dataTransfer.types || []).includes('Files')) return;
        e.preventDefault(); e.dataTransfer.dropEffect = 'copy';
      });
      box.addEventListener('dragleave', () => {
        depth = Math.max(0, depth - 1);
        if (!depth) box.classList.remove('drop-on');
      });
      box.addEventListener('drop', async e => {
        if (!e.dataTransfer || !e.dataTransfer.files.length) return;
        e.preventDefault(); depth = 0; box.classList.remove('drop-on');
        await addFiles(e.dataTransfer.files, 'main');
      });
    });

    document.addEventListener('paste', async e => {
      const items = Array.from((e.clipboardData && e.clipboardData.items) || []);
      const files = items.filter(it => it.kind === 'file' && /^image\//.test(it.type))
        .map(it => it.getAsFile()).filter(Boolean);
      if (!files.length) return;          /* 纯文本粘贴不拦 */
      e.preventDefault();
      await addFiles(files, 'main');
    });
  }

  function renderPreviewAvatar(src) {
    const el = $('#avatarPreview');
    el.style.backgroundImage = src ? `url("${src}")` : '';
    el.textContent = src ? '' : '微';
    el.style.background = src ? '' : hashColor(model.name);
    if (src) el.style.backgroundImage = `url("${src}")`;
    $('#avatarClear').hidden = !src;
  }

  function renderRepostAvatar(src) {
    const el = $('#repostAvatarPick');
    el.style.backgroundImage = src ? `url("${src}")` : '';
    el.textContent = src ? '' : '原';
  }

  function renderMediaEditor() { paintMediaEditor($('#mediaGrid'), media, 'main'); }
  function renderRpMediaEditor() { paintMediaEditor($('#rpMediaGrid'), rpMedia, 'repost'); }

  function paintMediaEditor(box, list, kind) {
    if (!box) return;
    box.innerHTML = '';
    list.forEach((it, i) => {
      const cell = document.createElement('div');
      cell.className = 'media-cell';
      const im = document.createElement('img');
      im.src = it.src;
      cell.appendChild(im);
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'media-del';
      del.title = '删除';
      del.innerHTML = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      del.addEventListener('click', () => {
        list.splice(i, 1);
        if (kind === 'repost') renderRpMediaEditor(); else renderMediaEditor();
        render(); snap();
      });
      const idx = document.createElement('span');
      idx.className = 'media-idx';
      idx.textContent = String(i + 1);
      cell.appendChild(del);
      cell.appendChild(idx);
      box.appendChild(cell);
    });
  }

  /* ---------------- 评论区编辑器 ---------------- */
  function rebuildCommentEditor() {
    const box = $('#cmtList');
    box.innerHTML = '';
    model.comments.forEach((c, i) => {
      const item = document.createElement('div');
      item.className = 'cmt-item';
      item.dataset.ci = String(i);

      const row = document.createElement('div');
      row.className = 'cmt-row';
      const thumb = document.createElement('div');
      thumb.className = 'cmt-thumb';
      if (c.avatar) {
        const im = document.createElement('img');
        im.src = c.avatar;
        thumb.appendChild(im);
      } else { thumb.textContent = String(c.name || '评').slice(0, 1); thumb.style.background = hashColor(c.name); }

      const meta = document.createElement('div');
      meta.className = 'cmt-meta';
      const b = document.createElement('b');
      b.textContent = c.name || '（未命名）';
      const sp = document.createElement('span');
      sp.textContent = (c.text || '').slice(0, 24) || '（空评论）';
      meta.appendChild(b); meta.appendChild(sp);

      const caret = document.createElement('button');
      caret.type = 'button';
      caret.className = 'cmt-btn';
      caret.innerHTML = '<svg class="cmt-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'cmt-btn del';
      del.title = '删除这条评论';
      del.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      del.addEventListener('click', ev => {
        ev.stopPropagation();
        model.comments.splice(i, 1);
        rebuildCommentEditor();
        render(); persist(); snap();
      });

      row.appendChild(thumb); row.appendChild(meta); row.appendChild(caret); row.appendChild(del);
      row.addEventListener('click', () => item.classList.toggle('open'));

      const body = document.createElement('div');
      body.className = 'cmt-body';
      body.innerHTML = `
        <div class="cmt-av">
          <div class="cmt-thumb" data-cav></div>
          <div class="cmt-av-links">
            <button type="button" class="link" data-cup>上传头像</button>
            <button type="button" class="link" data-cclr>清除</button>
          </div>
        </div>
        <label class="field"><span>昵称</span><input type="text" data-cf="name" maxlength="30" placeholder="路人甲"></label>
        <label class="field"><span>正文</span><textarea data-cf="text" rows="2" placeholder="评论内容"></textarea></label>
        <div class="field-row">
          <label class="field"><span>时间</span><input type="text" data-cf="time" placeholder="5-24 12:55"></label>
          <label class="field"><span>来自</span><input type="text" data-cf="from" placeholder="广东"></label>
        </div>
        <label class="field"><span>赞数</span><input type="text" data-cf="likes" inputmode="numeric" placeholder="20"></label>
        <label class="switch"><input type="checkbox" data-cfr="enabled"><span class="track"><i></i></span><span class="switch-txt">加一条「博主回复」</span></label>
        <label class="field"><span>博主回复正文</span><textarea data-cfr="text" rows="2" placeholder="博主回复的内容"></textarea></label>
        <label class="field"><span>回复入口文案</span><input type="text" data-cfr="more" placeholder="共 4 条回复"></label>
      `;

      const cav = $('[data-cav]', body);
      if (c.avatar) {
        const im = document.createElement('img');
        im.src = c.avatar;
        cav.appendChild(im);
      } else { cav.textContent = String(c.name || '评').slice(0, 1); cav.style.background = hashColor(c.name); }

      const file = document.createElement('input');
      file.type = 'file'; file.accept = 'image/*'; file.hidden = true;
      body.appendChild(file);

      $('[data-cup]', body).addEventListener('click', () => file.click());
      $('[data-cclr]', body).addEventListener('click', () => {
        c.avatar = '';
        rebuildCommentEditor();
        render(); persist(); snap();
      });
      file.addEventListener('change', async ev => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        try {
          c.avatar = await squareDataUrl(f, 240);
          rebuildCommentEditor();
          render(); persist(); snap();
        } catch (err) { toast('头像处理失败', true); }
        ev.target.value = '';
      });

      $$('[data-cf]', body).forEach(el => {
        const k = el.dataset.cf;
        el.value = c[k] == null ? '' : c[k];
        el.addEventListener('input', () => {
          c[k] = el.value;
          const bb = $('.cmt-meta b', row), ss = $('.cmt-meta span', row);
          bb.textContent = c.name || '（未命名）';
          ss.textContent = (c.text || '').slice(0, 24) || '（空评论）';
          render(); persist(); snapTyping();
        });
      });

      c.reply = c.reply || { enabled: false, text: '', more: '' };
      $$('[data-cfr]', body).forEach(el => {
        const k = el.dataset.cfr;
        if (el.type === 'checkbox') el.checked = !!c.reply[k];
        else el.value = c.reply[k] == null ? '' : c.reply[k];
        el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
          c.reply[k] = el.type === 'checkbox' ? el.checked : el.value;
          render(); persist(); snap();
        });
      });

      item.appendChild(row);
      item.appendChild(body);
      box.appendChild(item);
    });
  }

  function bindComments() {
    $('#btnAddComment').addEventListener('click', () => {
      model.comments.push({
        id: uid(), name: '新评论', avatar: '', text: '这里写评论内容',
        time: '5-24 12:00', from: '北京', likes: '',
        reply: { enabled: false, text: '', more: '' }
      });
      rebuildCommentEditor();
      render(); persist(); snap();
      const items = $$('.cmt-item');
      if (items.length) { items[items.length - 1].classList.add('open'); }
    });
  }

  /* ---------------- 导出 ---------------- */
  /* 等卡片里的图解码完。这里踩过坑，必须按下面写：
     ① complete 为 true 但 naturalWidth 为 0 —— 图已经加载失败（坏图、src="undefined"）。
        error 事件在设置 src 的那一刻就异步触发过了，此刻再挂 onload/onerror 监听，
        等到的是一个永远不会再来的事件 → 导出永久卡死、界面毫无反应。
        所以只要 complete 就当作「已有结论」，放行。
     ② 没有 src 的 <img> 根本不会触发 load/error，同样不能等。 */
  function imgsReady() {
    const list = $$('img', postEl());
    if (!list.length) return Promise.resolve();
    return Promise.all(list.map(im => {
      if (im.complete) return Promise.resolve();
      if (!im.getAttribute('src')) return Promise.resolve();
      return new Promise(res => {
        const done = () => res();
        im.addEventListener('load', done, { once: true });
        im.addEventListener('error', done, { once: true });
        setTimeout(done, 6000);   /* 兜底：解码卡住也别把导出拖死 */
      });
    }));
  }

  /* 字体就绪门闸。
     @font-face 用的是 font-display:block，字体没到之前正文是不可见的；
     html2canvas 又是自己用 canvas 逐字绘制的，不会替我们等字体。
     两件事叠在一起就会出现"导出图是回落字形、但屏幕上是对的"。
     这里显式 load 一次把字重 400/500/600 都拉进来，再等 fonts.ready。 */
  const FONT_STACK = '16px "Weibo Sans"';
  let fontPromise = null;
  function fontsReady() {
    if (fontPromise) return fontPromise;
    fontPromise = (async () => {
      if (!document.fonts || !document.fonts.load) return;
      try {
        await Promise.all([400, 500, 600, 700].map(w =>
          document.fonts.load(w + ' ' + FONT_STACK, '微博正文Aa0123')
        ));
        await document.fonts.ready;
      } catch (e) { /* 字体缺失时按回落栈继续，不阻断导出 */ }
    })();
    return fontPromise;
  }
  fontsReady();

  function safeScale(el, want) {
    const w = el.offsetWidth, h = el.offsetHeight;
    const MAX_SIDE = 16000, MAX_AREA = 1.2e8;
    let s = want;
    if (Math.max(w, h) * s > MAX_SIDE) s = MAX_SIDE / Math.max(w, h);
    if (w * s * h * s > MAX_AREA) s = Math.sqrt(MAX_AREA / (w * h));
    return {
      scale: Math.max(0.5, Math.floor(s * 100) / 100),
      capped: s < want
    };
  }

  async function capture(scale) {
    const el = postEl();
    await Promise.all([imgsReady(), fontsReady()]);
    const want = scale || +$('#scaleSel').value || 3;
    const { scale: s, capped } = safeScale(el, want);
    const bg = model.theme === 'dark' ? '#191919' : '#ffffff';

    if (typeof html2canvas === 'function') {
      try {
        /* 加超时：html2canvas 遇到解码失败的图会在内部无限等，不抛错也不返回，
           表现就是「点了导出，界面没反应」。超过 20 秒就判定失败走 SVG 兜底。 */
        const cv = await Promise.race([
          html2canvas(el, {
            scale: s,
            backgroundColor: bg,
            useCORS: false,
            allowTaint: false,
            logging: false,
            width: el.offsetWidth,
            height: el.offsetHeight,
            windowWidth: el.offsetWidth,
            windowHeight: el.offsetHeight
          }),
          new Promise((_, rej) => setTimeout(() => rej(new Error('html2canvas timeout')), 20000))
        ]);
        if (!blankCheck(cv)) return { canvas: cv, capped, scale: s };
      } catch (e) { /* 走兜底 */ }
    }
    const cv = await captureBySvg(el, s, bg);
    return { canvas: cv, capped, scale: s };
  }

  /* 区域统计判白：字间本来就是白的，单点采样会误判 */
  function blankCheck(cv) {
    const cx = cv.getContext('2d');
    const w = cv.width, h = cv.height;
    const bw = Math.min(120, w), bh = Math.min(120, h);
    let ink = 0, total = 0;
    for (let y = 0; y < h; y += bh) {
      for (let x = 0; x < w; x += bw) {
        const d = cx.getImageData(x, y, Math.min(bw, w - x), Math.min(bh, h - y)).data;
        for (let i = 0; i < d.length; i += 4) {
          total++;
          if (d[i] < 245 || d[i + 1] < 245 || d[i + 2] < 245) ink++;
        }
      }
    }
    return total ? ink / total < 0.0005 : true;
  }

  function captureBySvg(el, scale, bg) {
    return new Promise((res, rej) => {
      const w = el.offsetWidth, h = el.offsetHeight;
      const clone = el.cloneNode(true);
      const css = Array.from(document.styleSheets).map(ss => {
        try { return Array.from(ss.cssRules).map(r => r.cssText).join('\n'); } catch (e) { return ''; }
      }).join('\n');
      const html = new XMLSerializer().serializeToString(clone);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml"><style>${css}</style>${html}</div>
        </foreignObject></svg>`;
      const img = new Image();
      img.onload = () => {
        const cv = document.createElement('canvas');
        cv.width = Math.round(w * scale); cv.height = Math.round(h * scale);
        const cx = cv.getContext('2d');
        cx.fillStyle = bg; cx.fillRect(0, 0, cv.width, cv.height);
        cx.drawImage(img, 0, 0, cv.width, cv.height);
        res(cv);
      };
      img.onerror = () => rej(new Error('兜底渲染也失败了'));
      /* 含坏图的 SVG 有时既不触发 load 也不触发 error，卡在这里连报错都没有 */
      setTimeout(() => rej(new Error('兜底渲染超时')), 15000);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  }

  function stamp() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  }

  async function download() {
    const btn = $('#btnDownload');
    btn.disabled = true;
    try {
      const { canvas, capped, scale } = await capture();
      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      if (!blob) throw new Error('生成图片失败');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `weibo-${stamp()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      toast(capped ? `已导出 ${scale}×（原尺寸过大，已自动降低清晰度）` : `已导出 ${scale}× · ${canvas.width}×${canvas.height}`);
    } catch (e) {
      toast('导出失败：' + (e && e.message ? e.message : '未知错误'), true);
    } finally {
      btn.disabled = false;
    }
  }

  async function copyImage() {
    try {
      const { canvas } = await capture();
      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      if (!blob) throw new Error('no blob');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      toast('图片已复制到剪贴板');
    } catch (e) {
      toast('复制失败，请用「下载 PNG」', true);
    }
  }

  /* ---------------- 启动 ---------------- */
  function bindTop() {
    $('#btnDownload').addEventListener('click', download);
    $('#btnCopy').addEventListener('click', copyImage);

    window.addEventListener('keydown', e => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); download(); }
      if (mod && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        const t = e.target.tagName;
        if (t === 'INPUT' || t === 'TEXTAREA') return;  /* 让输入框自己撤销 */
        e.preventDefault(); undo();
      }
    });

    if (/Mac|iPhone|iPad/.test(navigator.platform || '')) $('#kbdKey').textContent = '⌘';
  }

  /* 故意暴露，别删：headless 逻辑探针用 */
  window.WeiboStudio = {
    capture, render, undo, snapshot: snap,
    get model() { return model; },
    get media() { return media; },
    get rpMedia() { return rpMedia; },
    setMedia(list, which) {
      if (which === 'repost') { rpMedia = list || []; renderRpMediaEditor(); }
      else { media = list || []; renderMediaEditor(); }
      render();
    },
    postHtml,
    _linkify: linkify,
    _fmt: fmtNum
  };

  function boot() {
    bindInputs();
    bindComments();
    bindAll();
    bindTop();
    bindDropPaste();
    render();
    snap();
    persist();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
