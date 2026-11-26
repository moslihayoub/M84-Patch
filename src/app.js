import { PAGE_CSS, SHADOW_CSS } from './styles.js';
import {
  esc,
  icon,
  isApexNode,
  getUniqueSelector,
  getUnionRect,
  slugify,
  NOISE_SVG,
  TEXT_STYLES,
  MASK_PRESETS
} from './utils.js';
import { createState } from './state.js';
import { renderPanel } from './panel.js';
import { generatePatchPrompt } from './export.js';

export function bootApexUI() {
  if (window.__apexui) return;
  window.__apexui = true;

  const pageStyle = document.createElement('style');
  pageStyle.setAttribute('data-apexui', '');
  pageStyle.textContent = PAGE_CSS;
  document.head.appendChild(pageStyle);

  const host = document.createElement('div');
  host.id = 'apexui-host';
  host.setAttribute('data-apexui', '');
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });
  const styleEl = document.createElement('style');
  styleEl.textContent = SHADOW_CSS;
  shadow.appendChild(styleEl);

  const root = document.createElement('div');
  root.className = 'ax-root';
  shadow.appendChild(root);

  const mk = (tag, cls, html = '') => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };
  const ib = (attrs, title, d, extra = '') =>
    `<button class="ax-b ic ${extra}" ${attrs} title="${esc(title)}" aria-label="${esc(title)}">${icon(d)}</button>`;

  const tab = mk('button', 'ax-tab', '<span class="ax-dot"></span>M84 Patch (Alt+E)');

  const top = mk(
    'div',
    'ax-top',
    `<span class="ax-grip" data-grip title="Drag toolbar">${icon('<path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01"/>')}</span>` +
      `<span class="ax-brand">M84 Patch</span>` +
      ib('data-m="select"', 'Select (V)', '<path d="M5 3l14 7-6 2-2 6z"/>', 'act') +
      ib('data-m="text"', 'Text (T)', '<path d="M5 6V4h14v2M12 4v16M9 20h6"/>') +
      ib('data-m="pin"', 'Pin Note (C)', '<path d="M4 5h16v11H9l-5 4z"/>') +
      ib('data-m="zone"', 'Zone: group elements (Z)', '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><rect x="9" y="9" width="6" height="6" rx="1"/>') +
      ib('data-m="shape"', 'Shapes Guide / Real (S)', '<rect x="3" y="3" width="8" height="8" rx="1.5"/><circle cx="16.5" cy="16.5" r="4.5"/><path d="M13 7l6 6"/>') +
      ib('data-a="preview"', 'Interactive Preview (P / hold Space)', '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>') +
      `<i class="ax-sep"></i>` +
      ib('data-a="undo"', 'Undo (Ctrl+Z)', '<path d="M9 14L4 9l5-5M4 9h10a6 6 0 010 12h-3"/>') +
      ib('data-a="redo"', 'Redo (Ctrl+Shift+Z)', '<path d="M15 14l5-5-5-5M20 9H10a6 6 0 000 12h3"/>') +
      ib('data-a="reset"', 'Reset all', '<path d="M4 4v6h6M5.5 15a8 8 0 105-9"/>') +
      ib('data-a="panel"', 'Toggle properties panel', '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M15 4v16"/>') +
      `<i class="ax-sep"></i><span class="ax-n" data-n>0 edits</span>` +
      `<button class="ax-b pri ic" data-a="export" title="Generate UI Patch">${icon('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>')}<span class="ax-lbl">Patch UI</span></button>` +
      ib('data-a="close"', 'Close (Alt+E)', '<path d="M6 6l12 12M18 6L6 18"/>')
  );

  const subbar = mk(
    'div',
    'ax-subbar',
    `<button class="ax-b act" data-sk="rect">Frame</button>` +
      `<button class="ax-b" data-sk="arrow">Arrow</button>` +
      `<button class="ax-b" data-sk="line">Line</button>` +
      `<button class="ax-b" data-sk="ellipse">Ellipse</button>` +
      `<i class="ax-sep"></i>` +
      `<button class="ax-b warn" data-sr="guide">Guide</button>` +
      `<button class="ax-b" data-sr="real">Real</button>`
  );

  const pan = mk('div', 'ax-pan');
  const hov = mk('div', 'ax-hov');
  const box = mk(
    'div',
    'ax-box',
    '<span class="ax-tag"></span><i class="ax-h" data-c="nw" style="left:-5px;top:-5px;cursor:nwse-resize"></i><i class="ax-h" data-c="ne" style="right:-5px;top:-5px;cursor:nesw-resize"></i><i class="ax-h" data-c="sw" style="left:-5px;bottom:-5px;cursor:nesw-resize"></i><i class="ax-h" data-c="se" style="right:-5px;bottom:-5px;cursor:nwse-resize"></i>'
  );
  const zb = mk('div', 'ax-zone');
  const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLayer.setAttribute('class', 'ax-svg');

  const pop = mk(
    'div',
    'ax-pop',
    '<strong style="color:#fbbf24">Anchored Element Note</strong><textarea class="ax-i" rows="3" placeholder="Add a note… (Ctrl+V to paste an image)"></textarea><div data-th></div><div class="ax-row"><button class="ax-b" data-pc>Cancel</button><button class="ax-b pri" data-ps>Add</button></div>'
  );

  const mod = mk(
    'div',
    'ax-mod',
    `<div class="ax-card">
      <div class="ax-row"><strong style="font-size:14px">M84 Patch · Visual UI Patch (GPT / Claude / Antigravity / Cursor…)</strong><button class="ax-b" data-mc>✕</button></div>
      <label class="ax-f">Design intent (optional)<textarea data-note rows="2" placeholder="e.g. cleaner hierarchy, more breathing room, higher CTA contrast…"></textarea></label>
      <textarea data-out rows="15" readonly></textarea>
      <div data-imgs style="display:flex;flex-wrap:wrap;gap:6px"></div>
      <div class="ax-row"><span data-ms style="color:#a1a1aa">Copy and paste into any AI coding assistant.</span><button class="ax-b pri" data-cp>Copy Patch Prompt</button></div>
    </div>`
  );

  [tab, top, subbar, pan, svgLayer, hov, box, zb, pop, mod].forEach(n => root.appendChild(n));

  const api = createState();
  const { st } = api;

  let pendingImgs = [];
  let pendingPin = null;
  let drag = null;
  let scrub = null;
  let tdrag = null;
  let zoneDrag = null;
  let shapeDrag = null;
  let spacePreview = false;

  const isInteractive = () => st.on && !st.preview && !spacePreview;

  const renderShapesOverlay = () => {
    if (!st.on) {
      svgLayer.innerHTML = '';
      return;
    }
    const defs = `<defs><marker id="ax-arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1l9 4-9 4z" fill="#f59e0b"/></marker><marker id="ax-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 1l9 4-9 4z" fill="#10b981"/></marker></defs>`;
    const items = [];
    const drawOne = (sh, idx) => {
      const isGuide = sh.role === 'guide';
      const stroke = isGuide ? '#f59e0b' : '#10b981';
      const fill = isGuide ? 'rgba(245,158,11,.10)' : 'rgba(16,185,129,.12)';
      const dash = isGuide ? 'stroke-dasharray="6 4"' : '';
      let x1 = sh.x1, y1 = sh.y1, x2 = sh.x2, y2 = sh.y2;
      if (sh.el && document.contains(sh.el)) {
        const br = sh.el.getBoundingClientRect();
        x1 = br.left + sh.ox1;
        y1 = br.top + sh.oy1;
        x2 = br.left + sh.ox2;
        y2 = br.top + sh.oy2;
      }
      const lx = Math.min(x1, x2), ty = Math.min(y1, y2), w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
      if (sh.kind === 'rect') {
        items.push(`<rect x="${lx}" y="${ty}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2" ${dash}/>`);
      } else if (sh.kind === 'ellipse') {
        items.push(`<ellipse cx="${lx + w / 2}" cy="${ty + h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${dash}/>`);
      } else if (sh.kind === 'line') {
        items.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2.5" ${dash}/>`);
      } else if (sh.kind === 'arrow') {
        items.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2.5" marker-end="url(#${isGuide ? 'ax-arr-g' : 'ax-arr-r'})" ${dash}/>`);
      }
      if (idx >= 0) {
        const tag = `#${idx + 1} ${isGuide ? 'Guide' : 'Real'}${sh.label ? ' · ' + sh.label : ''}`;
        items.push(`<text x="${lx + 4}" y="${Math.max(14, ty - 6)}" fill="${stroke}" font-size="11" font-weight="700" font-family="system-ui,sans-serif">${esc(tag)}</text>`);
      }
    };

    st.shapes.filter(s => s.active).forEach((sh, i) => drawOne(sh, i));
    if (shapeDrag) {
      drawOne(
        {
          kind: st.shapeKind,
          role: st.shapeRole,
          x1: shapeDrag.x1,
          y1: shapeDrag.y1,
          x2: shapeDrag.x2,
          y2: shapeDrag.y2
        },
        -1
      );
    }
    svgLayer.innerHTML = defs + items.join('');
  };

  const placePin = p => {
    if (!p.active || !st.on) {
      p.node.style.display = 'none';
      if (p.frame) p.frame.style.display = 'none';
      return;
    }
    if (p.group) {
      const g = p.group.filter(n => document.contains(n));
      if (!g.length) {
        p.node.style.display = p.frame.style.display = 'none';
        return;
      }
      const u = getUnionRect(g);
      Object.assign(p.frame.style, {
        display: 'block',
        left: u.l - 4 + 'px',
        top: u.t - 4 + 'px',
        width: u.r - u.l + 8 + 'px',
        height: u.b - u.t + 8 + 'px'
      });
      p.node.style.left = u.l - 4 + 'px';
      p.node.style.top = u.t - 4 + 'px';
      p.node.style.display = '';
      return;
    }
    if (!document.contains(p.el)) {
      p.node.style.display = 'none';
      return;
    }
    const r = p.el.getBoundingClientRect();
    p.node.style.left = r.left + p.dx + 'px';
    p.node.style.top = r.top + p.dy + 'px';
    p.node.style.display = '';
  };

  const syncOverlays = () => {
    st.pins.forEach(placePin);
    renderShapesOverlay();
    if (!isInteractive() || !st.sel || !document.contains(st.sel)) {
      box.style.display = 'none';
      return;
    }
    const r = st.sel.getBoundingClientRect();
    Object.assign(box.style, {
      display: 'block',
      left: r.left + 'px',
      top: r.top + 'px',
      width: r.width + 'px',
      height: r.height + 'px'
    });
    box.querySelector('.ax-tag').textContent = `${st.sel.tagName.toLowerCase()} · ${Math.round(r.width)}×${Math.round(r.height)}`;
  };

  const updateToolbar = () => {
    const cnt = api.countChanges();
    top.querySelector('[data-n]').textContent = cnt + (cnt === 1 ? ' edit' : ' edits');
    top.querySelector('[data-a="undo"]').disabled = !st.undoStack.length;
    top.querySelector('[data-a="redo"]').disabled = !st.redoStack.length;
    top.querySelector('[data-a="preview"]').classList.toggle('warn', st.preview || spacePreview);
    subbar.classList.toggle('show', st.on && st.mode === 'shape' && !st.preview);
  };

  api.st.onChange = () => {
    updateToolbar();
    syncOverlays();
    if (!scrub) renderPanel(pan, api);
  };

  const select = el => {
    st.sel = el;
    syncOverlays();
    renderPanel(pan, api);
  };

  const setMode = m => {
    st.mode = m;
    st.preview = false;
    document.documentElement.dataset.apexm = m;
    top.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('act', b.dataset.m === m));
    updateToolbar();
    syncOverlays();
  };

  const toggle = force => {
    st.on = typeof force === 'boolean' ? force : !st.on;
    document.documentElement.classList.toggle('apexui-on', st.on);
    root.classList.toggle('on', st.on);
    if (!st.on) {
      hov.style.display = box.style.display = zb.style.display = 'none';
      pop.classList.remove('show');
      subbar.classList.remove('show');
      delete document.documentElement.dataset.apexm;
    } else {
      document.documentElement.dataset.apexm = st.preview ? 'preview' : st.mode;
      renderPanel(pan, api);
    }
    updateToolbar();
    setTimeout(syncOverlays, 30);
  };

  window.__apexuiToggle = toggle;
  if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
    chrome.runtime.onMessage.addListener(msg => {
      if (msg?.type === 'APEXUI_TOGGLE') toggle();
    });
  }

  tab.onclick = () => toggle(true);

  top.onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.m) {
      setMode(b.dataset.m);
      return;
    }
    const a = b.dataset.a;
    if (a === 'close') toggle(false);
    if (a === 'panel') pan.classList.toggle('hid');
    if (a === 'preview') {
      st.preview = !st.preview;
      document.documentElement.dataset.apexm = st.preview ? 'preview' : st.mode;
      hov.style.display = 'none';
      updateToolbar();
      syncOverlays();
    }
    if (a === 'undo') api.undo();
    if (a === 'redo') api.redo();
    if (a === 'reset') api.resetAll();
    if (a === 'export') {
      mod.querySelector('[data-out]').value = generatePatchPrompt(st, mod.querySelector('[data-note]').value);
      mod.classList.add('show');
      const im = st.pins.filter(p => p.active).flatMap(p => p.imgs);
      const imgsBox = mod.querySelector('[data-imgs]');
      imgsBox.textContent = '';
      if (im.length) {
        const hint = document.createElement('div');
        hint.style.cssText = 'width:100%;color:#a1a1aa;font-size:11px';
        hint.textContent = 'Attached images: right-click → Copy image, then paste them into your AI chat in order.';
        imgsBox.appendChild(hint);
        im.forEach((u, k) => {
          const fig = document.createElement('figure');
          fig.style.margin = '0';
          const img = document.createElement('img');
          img.className = 'ax-th';
          img.src = u;
          const cap = document.createElement('figcaption');
          cap.style.cssText = 'font-size:10px;color:#a1a1aa';
          cap.textContent = 'n°' + (k + 1);
          fig.append(img, cap);
          imgsBox.appendChild(fig);
        });
      }
    }
  };

  subbar.onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.sk) {
      st.shapeKind = b.dataset.sk;
      subbar.querySelectorAll('[data-sk]').forEach(x => x.classList.toggle('act', x === b));
    }
    if (b.dataset.sr) {
      st.shapeRole = b.dataset.sr;
      subbar.querySelectorAll('[data-sr]').forEach(x => {
        x.classList.remove('act', 'warn');
        if (x === b) x.classList.add(st.shapeRole === 'guide' ? 'warn' : 'act');
      });
    }
  };

  // Gradient / color helpers
  const clearGrad = prop => {
    if (!st.sel) return;
    if (prop === 'backgroundColor' && /gradient/.test(st.sel.style.backgroundImage)) {
      api.setStyle(st.sel, 'backgroundImage', 'none');
    } else if (prop === 'color' && st.sel.style.backgroundClip === 'text') {
      api.setStyle(st.sel, 'backgroundImage', 'none');
      api.setStyle(st.sel, 'backgroundClip', 'border-box');
    }
  };

  const applyGrad = (prop, val, name) => {
    if (!st.sel) return;
    api.withTx(() => {
      if (prop === 'backgroundColor') {
        api.setStyle(st.sel, 'backgroundImage', val, name);
      } else if (prop === 'color') {
        api.setStyle(st.sel, 'backgroundImage', val, name);
        api.setStyle(st.sel, 'backgroundClip', 'text');
        api.setStyle(st.sel, 'color', 'transparent');
      }
      st.gradMeta.set(st.sel, Object.assign({}, st.gradMeta.get(st.sel), { [prop]: name }));
    });
  };

  const buildGradCss = form => {
    const q = s => form.querySelector(s).value;
    return form.dataset.mode === 'grad'
      ? `linear-gradient(${parseFloat(q('[data-ga]')) || 0}deg, ${q('[data-nc]')}, ${q('[data-nc2]')})`
      : q('[data-nc]');
  };

  const updateShadow = () => {
    const q = k => pan.querySelector('[data-sh="' + k + '"]')?.value;
    const h = q('c') || '#000000';
    const rgb = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)).join(',');
    api.setStyle(st.sel, 'boxShadow', `${q('x')}px ${q('y')}px ${q('b')}px ${q('s')}px rgba(${rgb},${q('o')})`);
  };

  // Panel events
  pan.addEventListener('contextmenu', e => {
    const b = e.target.closest('.ax-c.cu');
    if (!b) return;
    e.preventDefault();
    const i = st.customColors.findIndex(c => c.n === b.dataset.st);
    if (i >= 0) {
      st.customColors.splice(i, 1);
      api.persistColors();
      renderPanel(pan, api);
    }
  });

  pan.addEventListener('input', e => {
    const t = e.target;
    const addForm = t.closest('.ax-add');
    if (addForm) {
      addForm.querySelector('[data-prev]').style.background = buildGradCss(addForm);
      return;
    }
    if (!st.sel) return;
    if (t.dataset.mdepth !== undefined) {
      const depth = parseInt(t.value, 10) || 12;
      st.maskDepth = depth;
      const cur = st.masks.get(st.sel);
      const preset = MASK_PRESETS.find(m => m.id === cur?.preset);
      if (preset) api.applyMask(st.sel, preset, depth);
      return;
    }
    if (t.dataset.ts !== undefined) {
      const preset = TEXT_STYLES[t.value];
      if (preset) {
        api.withTx(() => {
          api.setStyle(st.sel, 'fontSize', preset[0]);
          api.setStyle(st.sel, 'fontWeight', preset[1]);
          api.setStyle(st.sel, 'lineHeight', preset[2]);
          api.setStyle(st.sel, 'letterSpacing', preset[3]);
        });
      }
      return;
    }
    if (t.dataset.addfx !== undefined) {
      const v = t.value;
      if (v === 'sh') api.setStyle(st.sel, 'boxShadow', '0px 4px 12px 0px rgba(0,0,0,.15)');
      if (v === 'bl') api.setStyle(st.sel, 'filter', 'blur(4px)');
      if (v === 'bb') api.setStyle(st.sel, 'backdropFilter', 'blur(8px)');
      if (v === 'nz') api.setStyle(st.sel, 'backgroundImage', NOISE_SVG);
      return;
    }
    if (t.dataset.sh) {
      updateShadow();
      return;
    }
    if (t.dataset.fx) {
      const v = parseFloat(t.value) || 0;
      api.setStyle(st.sel, t.dataset.fx, v ? `blur(${v}px)` : 'none');
      return;
    }
    if (!t.dataset.p || t.tagName === 'BUTTON' || t.type === 'text' || t.type === 'number') return;
    if (t.type === 'color') {
      api.withTx(() => {
        clearGrad(t.dataset.p);
        api.setStyle(st.sel, t.dataset.p, t.value);
      });
    } else {
      api.setStyle(st.sel, t.dataset.p, t.value);
    }
  });

  pan.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.lock !== undefined) {
      st.lock = t.checked;
      return;
    }
    if (!st.sel || !t.dataset.p || !(t.type === 'text' || t.type === 'number')) return;
    const p = t.dataset.p;
    let v = t.value.trim();
    if (p === 'scale') v = String((parseFloat(v) || 100) / 100);
    else if (v.toLowerCase() === 'full') v = '9999px';
    else if (t.type === 'number' || /^-?\d+(\.\d+)?$/.test(v)) {
      v = p === 'lineHeight' ? String(parseFloat(v)) : parseFloat(v) + 'px';
    }
    if ((p === 'width' || p === 'height') && st.lock) {
      const r = st.sel.getBoundingClientRect();
      const ratio = r.width / (r.height || 1);
      const num = parseFloat(v);
      api.withTx(() => {
        api.setStyle(st.sel, p, v);
        if (p === 'width') api.setStyle(st.sel, 'height', Math.round(num / ratio) + 'px');
        else api.setStyle(st.sel, 'width', Math.round(num * ratio) + 'px');
      });
    } else {
      api.setStyle(st.sel, p, v);
    }
  });

  pan.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.act === 'hidepan') {
      pan.classList.add('hid');
      return;
    }
    if (b.dataset.acc) {
      const k = b.dataset.acc;
      st.shut.has(k) ? st.shut.delete(k) : st.shut.add(k);
      b.closest('.ax-s').classList.toggle('shut');
      return;
    }
    if (b.dataset.shrole) {
      api.toggleShapeRole(b.dataset.shrole);
      return;
    }
    if (b.dataset.shrm) {
      api.removeShape(b.dataset.shrm);
      return;
    }
    if (!st.sel) return;

    if (b.dataset.mv) {
      api.moveSibling(st.sel, +b.dataset.mv);
      return;
    }
    if (b.dataset.mvf !== undefined) {
      api.reverseChildren(st.sel);
      return;
    }
    if (b.dataset.mask) {
      const preset = MASK_PRESETS.find(m => m.id === b.dataset.mask);
      if (preset) api.applyMask(st.sel, preset, st.maskDepth);
      return;
    }
    if (b.dataset.maskClear !== undefined) {
      api.applyMask(st.sel, null, st.maskDepth);
      return;
    }
    if (b.dataset.codeSave !== undefined) {
      const css = pan.querySelector('[data-code-css]')?.value || '';
      const js = pan.querySelector('[data-code-js]')?.value || '';
      api.setCodeBlock(st.sel, css, js);
      return;
    }
    if (b.dataset.codeClear !== undefined) {
      api.setCodeBlock(st.sel, '', '');
      return;
    }
    if (b.dataset.cx) {
      const p = b.dataset.cx;
      st.cgx.has(p) ? st.cgx.delete(p) : st.cgx.add(p);
      renderPanel(pan, api);
      return;
    }
    if (b.dataset.cadd) {
      const p = b.dataset.cadd;
      st.cgadd = st.cgadd === p ? null : p;
      renderPanel(pan, api);
      return;
    }
    if (b.dataset.nt) {
      st.gmode = b.dataset.nt;
      const fm = b.closest('.ax-add');
      fm.dataset.mode = st.gmode;
      fm.querySelectorAll('[data-nt]').forEach(x => x.classList.toggle('act', x === b));
      fm.querySelector('[data-prev]').style.background = buildGradCss(fm);
      return;
    }
    if (b.dataset.ncs) {
      const fm = b.closest('.ax-add');
      const isGrad = fm.dataset.mode === 'grad';
      const val = buildGradCss(fm);
      const rawName = slugify(fm.querySelector('[data-nn]').value);
      const used = api.getPalette().map(c => c.n);
      let name = '--' + (rawName || (isGrad ? 'degrade-' : 'couleur-') + (st.customColors.length + 1));
      let idx = 2;
      while (used.includes(name)) name = '--' + (rawName || 'couleur') + '-' + idx++;
      st.customColors.push({ n: name, v: val, g: isGrad ? 1 : 0 });
      api.persistColors();
      st.cgadd = null;
      if (isGrad) applyGrad(b.dataset.ncs, val, name);
      else {
        api.withTx(() => {
          clearGrad(b.dataset.ncs);
          api.setStyle(st.sel, b.dataset.ncs, val, name);
        });
      }
      return;
    }
    if (b.dataset.g && b.dataset.sp) {
      applyGrad(b.dataset.sp, b.dataset.sv, b.dataset.st);
      return;
    }
    if (b.dataset.sp) {
      api.withTx(() => {
        clearGrad(b.dataset.sp);
        api.setStyle(st.sel, b.dataset.sp, b.dataset.sv, b.dataset.st);
      });
      return;
    }
    if (b.dataset.rm) {
      const map = { sh: ['boxShadow', 'none'], bl: ['filter', 'none'], bb: ['backdropFilter', 'none'], nz: ['backgroundImage', ''] };
      const q = map[b.dataset.rm];
      if (q) api.setStyle(st.sel, q[0], q[1]);
      return;
    }
    if (b.dataset.ssw) {
      const inp = pan.querySelector('[data-sh="c"]');
      if (inp) {
        inp.value = b.dataset.ssw;
        updateShadow();
      }
      return;
    }
    if (b.dataset.p && b.dataset.v !== undefined) {
      api.setStyle(st.sel, b.dataset.p, b.dataset.v);
      return;
    }
    if (b.dataset.act === 'hide') {
      api.setStyle(st.sel, 'display', st.sel.style.display === 'none' ? '' : 'none');
      return;
    }
    if (b.dataset.nav) {
      const n = b.dataset.nav;
      const target =
        n === 'up'
          ? st.sel.parentElement
          : n === 'down'
            ? st.sel.firstElementChild
            : n === 'prev'
              ? st.sel.previousElementSibling
              : st.sel.nextElementSibling;
      if (target && !isApexNode(target)) select(target);
    }
  });

  // Annotations popup
  const PIN_TITLE = 'Anchored Element Note';
  const closePop = () => {
    zb.style.display = 'none';
    pop.querySelector('strong').textContent = PIN_TITLE;
    pendingImgs.length = 0;
    pop.querySelector('[data-th]').innerHTML = '';
    pop.querySelector('textarea').value = '';
    pendingPin = null;
    pop.classList.remove('show');
  };

  const savePop = () => {
    const note = pop.querySelector('textarea').value.trim();
    if (pendingPin && pendingPin.isShape) {
      pendingPin.shape.label = note;
      api.addShape(pendingPin.shape);
      closePop();
      return;
    }
    if ((note || pendingImgs.length) && pendingPin) {
      const activeCount = st.pins.filter(p => p.active).length + 1;
      const node = mk('div', 'ax-pin', String(activeCount));
      node.title = note || '(image)';
      root.appendChild(node);
      const group = pendingPin.group || null;
      const frame = group ? mk('div', 'ax-frame') : null;
      if (frame) root.appendChild(frame);
      api.addPin({
        s: pendingPin.s,
        el: group ? group[0] : pendingPin.el,
        dx: pendingPin.dx || 0,
        dy: pendingPin.dy || 0,
        group,
        frame,
        n: note || '(image)',
        imgs: pendingImgs.splice(0),
        node
      });
    }
    closePop();
  };

  pop.onclick = e => {
    if (e.target.hasAttribute('data-pc')) closePop();
    if (e.target.hasAttribute('data-ps')) savePop();
  };
  pop.querySelector('textarea').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      savePop();
    }
    if (e.key === 'Escape') closePop();
  });
  const SAFE_IMG_MIME = /^image\/(png|jpeg|webp|gif)$/i;
  pop.addEventListener('paste', e => {
    for (const it of e.clipboardData?.items || []) {
      if (SAFE_IMG_MIME.test(it.type)) {
        const file = it.getAsFile();
        if (!file || file.size > 5 * 1024 * 1024) continue;
        e.preventDefault();
        const fr = new FileReader();
        fr.onload = () => {
          if (typeof fr.result !== 'string' || !/^data:image\/(png|jpeg|webp|gif);base64,/i.test(fr.result)) return;
          pendingImgs.push(fr.result);
          const img = document.createElement('img');
          img.className = 'ax-th';
          img.src = fr.result;
          pop.querySelector('[data-th]').appendChild(img);
        };
        fr.readAsDataURL(file);
      }
    }
  });

  // Export modal
  mod.onclick = e => {
    if (e.target === mod || e.target.hasAttribute('data-mc')) mod.classList.remove('show');
    if (e.target.hasAttribute('data-cp')) {
      const ta = mod.querySelector('[data-out]');
      const ms = mod.querySelector('[data-ms]');
      const ok = () => (ms.textContent = '✓ Copied! Paste it into GPT, Claude, Antigravity, or Cursor.');
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(ta.value).then(ok).catch(() => {
          ta.select();
          document.execCommand('copy');
          ok();
        });
      } else {
        ta.select();
        document.execCommand('copy');
        ok();
      }
    }
  };
  mod.querySelector('[data-note]').addEventListener('input', () => {
    mod.querySelector('[data-out]').value = generatePatchPrompt(st, mod.querySelector('[data-note]').value);
  });

  // Inline text edit
  const editText = el => {
    const before = el.textContent.trim();
    el.contentEditable = 'true';
    el.focus();
    const done = () => {
      el.contentEditable = 'false';
      const after = el.textContent.trim();
      if (after !== before) api.setText(el, before, after);
      el.removeEventListener('blur', done);
      syncOverlays();
    };
    el.addEventListener('blur', done);
  };

  // Drag toolbar & scrub numeric inputs
  top.addEventListener('mousedown', e => {
    if (!e.target.closest('[data-grip]')) return;
    e.preventDefault();
    const r = top.getBoundingClientRect();
    tdrag = { x: e.clientX - r.left, y: e.clientY - r.top };
    Object.assign(top.style, { transform: 'none', left: r.left + 'px', top: r.top + 'px', maxWidth: 'none' });
  });

  pan.addEventListener('mousedown', e => {
    const t = e.target;
    if (t.tagName !== 'INPUT' || !t.classList.contains('ax-scrub')) return;
    const m = t.value.trim().match(/^(-?[\d.]+)(px|%|em)?$/);
    if (m) {
      scrub = {
        t,
        y: e.clientY,
        v: parseFloat(m[1]),
        u: m[2] || '',
        on: false,
        step: t.dataset.p === 'lineHeight' ? 0.05 : 1
      };
    }
  });

  // Resize handles inside Shadow DOM
  box.addEventListener('mousedown', e => {
    const h = e.target.closest('.ax-h');
    if (!h || !st.sel || !isInteractive()) return;
    e.preventDefault();
    const r = st.sel.getBoundingClientRect();
    drag = {
      k: 'resize',
      el: st.sel,
      c: h.dataset.c,
      x: e.clientX,
      y: e.clientY,
      w: r.width,
      h: r.height,
      ratio: r.width / (r.height || 1),
      prevW: st.sel.style.width,
      prevH: st.sel.style.height
    };
  });

  // Document-level interactions
  const targetFromEvent = e => {
    const path = e.composedPath?.() || [];
    if (path.includes(host)) return null;
    return e.target;
  };

  document.addEventListener(
    'mousedown',
    e => {
      if (!isInteractive()) return;
      const t = targetFromEvent(e);
      if (!t || isApexNode(t)) return;
      if (st.mode === 'zone' && e.button === 0) {
        e.preventDefault();
        zoneDrag = { x: e.clientX, y: e.clientY };
        return;
      }
      if (st.mode === 'shape' && e.button === 0) {
        e.preventDefault();
        shapeDrag = { x1: e.clientX, y1: e.clientY, x2: e.clientX, y2: e.clientY, target: t };
        return;
      }
      if (st.mode === 'select' && st.sel && st.sel.contains(t)) {
        const m = (st.sel.style.transform || '').match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
        drag = {
          k: 'move',
          el: st.sel,
          x: e.clientX,
          y: e.clientY,
          tx: m ? +m[1] : 0,
          ty: m ? +m[2] : 0,
          prevTransform: st.sel.style.transform
        };
      }
    },
    true
  );

  window.addEventListener('mousemove', e => {
    if (tdrag) {
      top.style.left = Math.max(0, Math.min(innerWidth - 80, e.clientX - tdrag.x)) + 'px';
      top.style.top = Math.max(0, Math.min(innerHeight - 40, e.clientY - tdrag.y)) + 'px';
      return;
    }
    if (scrub) {
      const d = scrub.y - e.clientY;
      if (!scrub.on && Math.abs(d) < 4) return;
      if (!scrub.on) {
        scrub.on = true;
        scrub.t.blur();
        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
      }
      let n = Math.round((scrub.v + d * scrub.step * (e.shiftKey ? 10 : 1)) * 100) / 100;
      if (scrub.t.dataset.fx) n = Math.max(0, n);
      scrub.t.value = n + scrub.u;
      scrub.t.dispatchEvent(new Event(scrub.t.dataset.sh || scrub.t.dataset.fx ? 'input' : 'change', { bubbles: true }));
      return;
    }
    if (!isInteractive()) return;
    if (zoneDrag) {
      Object.assign(zb.style, {
        display: 'block',
        left: Math.min(zoneDrag.x, e.clientX) + 'px',
        top: Math.min(zoneDrag.y, e.clientY) + 'px',
        width: Math.abs(e.clientX - zoneDrag.x) + 'px',
        height: Math.abs(e.clientY - zoneDrag.y) + 'px'
      });
      return;
    }
    if (shapeDrag) {
      shapeDrag.x2 = e.clientX;
      shapeDrag.y2 = e.clientY;
      renderShapesOverlay();
      return;
    }
    if (drag) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (drag.k === 'resize') {
        drag.moved = true;
        const w = Math.max(24, drag.w + (drag.c.includes('e') ? dx : -dx));
        const h = e.shiftKey || st.lock ? Math.round(w / drag.ratio) : Math.max(16, drag.h + (drag.c.includes('s') ? dy : -dy));
        drag.el.style.width = Math.round(w) + 'px';
        drag.el.style.height = Math.round(h) + 'px';
        drag.finalW = Math.round(w) + 'px';
        drag.finalH = Math.round(h) + 'px';
        syncOverlays();
      } else if (drag.moved || Math.abs(dx) + Math.abs(dy) > 3) {
        drag.moved = true;
        drag.finalTransform = `translate(${Math.round(drag.tx + dx)}px, ${Math.round(drag.ty + dy)}px)`;
        drag.el.style.transform = drag.finalTransform;
        syncOverlays();
      }
      return;
    }
    const t = document.elementFromPoint(e.clientX, e.clientY);
    if (!t || isApexNode(t) || t === st.sel) {
      hov.style.display = 'none';
      return;
    }
    const r = t.getBoundingClientRect();
    Object.assign(hov.style, {
      display: 'block',
      left: r.left + 'px',
      top: r.top + 'px',
      width: r.width + 'px',
      height: r.height + 'px'
    });
  });

  window.addEventListener('mouseup', e => {
    if (scrub && scrub.on) {
      document.body.style.cursor = document.body.style.userSelect = '';
      renderPanel(pan, api);
    }
    scrub = null;
    tdrag = null;

    if (drag) {
      const d = drag;
      drag = null;
      if (d.moved) {
        if (d.k === 'resize') {
          d.el.style.width = d.prevW;
          d.el.style.height = d.prevH;
          api.withTx(() => {
            api.setStyle(d.el, 'width', d.finalW);
            api.setStyle(d.el, 'height', d.finalH);
          });
        } else if (d.k === 'move') {
          d.el.style.transform = d.prevTransform;
          api.setStyle(d.el, 'transform', d.finalTransform);
        }
      }
    }

    if (zoneDrag) {
      const r = {
        l: Math.min(zoneDrag.x, e.clientX),
        t: Math.min(zoneDrag.y, e.clientY),
        r: Math.max(zoneDrag.x, e.clientX),
        b: Math.max(zoneDrag.y, e.clientY)
      };
      zoneDrag = null;
      if (r.r - r.l < 8 && r.b - r.t < 8) {
        zb.style.display = 'none';
        return;
      }
      const all = [...document.body.querySelectorAll('*')].filter(n => {
        if (isApexNode(n) || /^(SCRIPT|STYLE|LINK|BR)$/.test(n.tagName)) return false;
        const b = n.getBoundingClientRect();
        return b.width > 0 && b.height > 0 && b.left >= r.l - 2 && b.right <= r.r + 2 && b.top >= r.t - 2 && b.bottom <= r.b + 2;
      });
      const setAll = new Set(all);
      let g = all.filter(n => {
        for (let p = n.parentElement; p; p = p.parentElement) if (setAll.has(p)) return false;
        return true;
      });
      if (!g.length) {
        const c = document.elementFromPoint((r.l + r.r) / 2, (r.t + r.b) / 2);
        if (c && !isApexNode(c)) g = [c];
      }
      if (!g.length) {
        zb.style.display = 'none';
        return;
      }
      const u = getUnionRect(g);
      Object.assign(zb.style, {
        display: 'block',
        left: u.l - 4 + 'px',
        top: u.t - 4 + 'px',
        width: u.r - u.l + 8 + 'px',
        height: u.b - u.t + 8 + 'px'
      });
      pendingPin = { s: g.map(getUniqueSelector).join(' + '), group: g };
      pop.querySelector('strong').textContent = `Zone Note · ${g.length} element${g.length > 1 ? 's' : ''}`;
      Object.assign(pop.style, {
        left: Math.min(e.clientX + 10, innerWidth - 270) + 'px',
        top: Math.min(e.clientY + 10, innerHeight - 190) + 'px'
      });
      pop.classList.add('show');
      pop.querySelector('textarea').focus();
    }

    if (shapeDrag) {
      const sd = shapeDrag;
      shapeDrag = null;
      const w = Math.abs(sd.x2 - sd.x1);
      const h = Math.abs(sd.y2 - sd.y1);
      if (w < 8 && h < 8) {
        renderShapesOverlay();
        return;
      }
      const el = sd.target && !isApexNode(sd.target) ? sd.target : null;
      const br = el ? el.getBoundingClientRect() : { left: 0, top: 0 };
      const shape = {
        kind: st.shapeKind,
        role: st.shapeRole,
        label: '',
        el,
        sel: el ? getUniqueSelector(el) : '',
        x1: sd.x1,
        y1: sd.y1,
        x2: sd.x2,
        y2: sd.y2,
        ox1: sd.x1 - br.left,
        oy1: sd.y1 - br.top,
        ox2: sd.x2 - br.left,
        oy2: sd.y2 - br.top,
        rw: w,
        rh: h
      };
      pendingPin = { isShape: true, shape };
      pop.querySelector('strong').textContent = `${st.shapeRole === 'real' ? 'Real' : 'Guide'} Shape (${st.shapeKind}) · Label (optional)`;
      Object.assign(pop.style, {
        left: Math.min(e.clientX + 10, innerWidth - 270) + 'px',
        top: Math.min(e.clientY + 10, innerHeight - 170) + 'px'
      });
      pop.classList.add('show');
      pop.querySelector('textarea').focus();
      renderShapesOverlay();
    }
  });

  document.addEventListener(
    'click',
    e => {
      if (!isInteractive()) return;
      const t = targetFromEvent(e);
      if (!t || isApexNode(t)) return;
      e.preventDefault();
      e.stopPropagation();
      if (st.mode === 'zone' || st.mode === 'shape') return;
      if (st.mode === 'pin') {
        const br = t.getBoundingClientRect();
        pendingPin = { s: getUniqueSelector(t), el: t, dx: e.clientX - br.left, dy: e.clientY - br.top };
        pop.querySelector('strong').textContent = PIN_TITLE;
        Object.assign(pop.style, {
          left: Math.min(e.clientX + 10, innerWidth - 270) + 'px',
          top: Math.min(e.clientY + 10, innerHeight - 160) + 'px'
        });
        pop.classList.add('show');
        pop.querySelector('textarea').focus();
        return;
      }
      select(t);
      if (st.mode === 'text') editText(t);
    },
    true
  );

  document.addEventListener(
    'dblclick',
    e => {
      if (!isInteractive()) return;
      const t = targetFromEvent(e);
      if (!t || isApexNode(t)) return;
      e.preventDefault();
      select(t);
      editText(t);
    },
    true
  );

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    const active = shadow.activeElement || document.activeElement;
    const typing = active && (/INPUT|TEXTAREA|SELECT/.test(active.tagName) || active.isContentEditable);
    if (e.altKey && k === 'e') {
      e.preventDefault();
      toggle();
      return;
    }
    if (!st.on) return;
    if ((e.ctrlKey || e.metaKey) && k === 'z') {
      e.preventDefault();
      e.shiftKey ? api.redo() : api.undo();
      return;
    }
    if (typing) return;
    if (k === ' ' && !spacePreview) {
      e.preventDefault();
      spacePreview = true;
      hov.style.display = 'none';
      updateToolbar();
      syncOverlays();
      return;
    }
    if (k === 'v') setMode('select');
    if (k === 't') setMode('text');
    if (k === 'c') setMode('pin');
    if (k === 'z') setMode('zone');
    if (k === 's') setMode('shape');
    if (k === 'p') {
      st.preview = !st.preview;
      updateToolbar();
      syncOverlays();
    }
    if (k === 'escape') {
      st.sel = null;
      syncOverlays();
      renderPanel(pan, api);
    }
    if (st.sel && e.altKey && k.startsWith('arrow')) {
      e.preventDefault();
      api.moveSibling(st.sel, k === 'arrowleft' || k === 'arrowup' ? -1 : 1);
      return;
    }
    if (st.sel && k.startsWith('arrow')) {
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      const m = (st.sel.style.transform || '').match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      let x = m ? +m[1] : 0;
      let y = m ? +m[2] : 0;
      if (k === 'arrowleft') x -= step;
      if (k === 'arrowright') x += step;
      if (k === 'arrowup') y -= step;
      if (k === 'arrowdown') y += step;
      api.setStyle(st.sel, 'transform', `translate(${x}px, ${y}px)`);
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === ' ' && spacePreview) {
      spacePreview = false;
      updateToolbar();
      syncOverlays();
    }
  });

  window.addEventListener('scroll', syncOverlays, true);
  window.addEventListener('resize', syncOverlays);
  updateToolbar();
}
