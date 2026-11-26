(() => {
// === src/styles.js ===
const PAGE_CSS = `
html.apexui-on[data-apexm="pin"] body *:not(#apexui-host):not(#apexui-host *){cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cpath d='M4 24V13a9 9 0 119 9H4z' fill='%23f59e0b' stroke='%23111' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13 9.5v7M9.5 13h7' stroke='%23111' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E") 4 24,crosshair!important}
html.apexui-on[data-apexm="zone"] body *:not(#apexui-host):not(#apexui-host *),
html.apexui-on[data-apexm="shape"] body *:not(#apexui-host):not(#apexui-host *){cursor:crosshair!important}
html.apexui-on[data-apexm="text"] body *:not(#apexui-host):not(#apexui-host *){cursor:text!important}
`;
const SHADOW_CSS = `
:host{all:initial;position:fixed;inset:0;z-index:2147483640;pointer-events:none;font:12px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e4e4e7}
*,*::before,*::after{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
button,input,select,textarea{font:inherit;color:inherit}

.ax-tab{pointer-events:auto;position:fixed;right:0;top:45%;z-index:2147483640;writing-mode:vertical-rl;background:#18181b;color:#fff;border:1px solid #3f3f46;border-right:0;border-radius:10px 0 0 10px;padding:14px 8px;font:600 12px/1 system-ui;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35);display:flex;align-items:center;gap:6px;transition:background .15s}
.ax-tab:hover{background:#27272a}
.ax-tab .ax-dot{width:7px;height:7px;border-radius:50%;background:#0d99ff;display:inline-block}
.ax-root.on .ax-tab{display:none}

.ax-top{pointer-events:auto;position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:2147483642;display:none;align-items:center;gap:4px;padding:5px 6px;border-radius:12px;background:rgba(24,24,27,.96);backdrop-filter:blur(10px);color:#e4e4e7;border:1px solid #3f3f46;box-shadow:0 12px 32px rgba(0,0,0,.45);max-width:calc(100vw - 32px);flex-wrap:nowrap;overflow-x:auto}
.ax-root.on .ax-top{display:flex}
.ax-brand{font:700 11px/1 system-ui;letter-spacing:.04em;color:#7dd3fc;padding:0 6px 0 2px;white-space:nowrap;user-select:none}
.ax-grip{cursor:grab;color:#71717a;display:flex;padding:0 3px;align-items:center}
.ax-grip:active{cursor:grabbing}

.ax-subbar{pointer-events:auto;position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:2147483642;display:none;align-items:center;gap:4px;padding:4px 8px;border-radius:10px;background:rgba(24,24,27,.96);border:1px solid #3f3f46;box-shadow:0 8px 24px rgba(0,0,0,.35)}
.ax-subbar.show{display:flex}

.ax-pan{pointer-events:auto;position:fixed;top:12px;right:12px;bottom:12px;width:276px;z-index:2147483641;display:none;flex-direction:column;background:rgba(24,24,27,.97);backdrop-filter:blur(12px);color:#e4e4e7;border:1px solid #3f3f46;border-radius:16px;box-shadow:0 18px 48px rgba(0,0,0,.5);overflow-y:auto;overflow-x:hidden}
.ax-root.on .ax-pan{display:flex}
.ax-root.on .ax-pan.hid{display:none}
.ax-pan>*{flex:none}

.ax-b{background:transparent;color:#e4e4e7;border:0;border-radius:7px;padding:6px 9px;cursor:pointer;white-space:nowrap;font-size:12px;transition:background .12s,color .12s}
.ax-b:hover:not(:disabled){background:#27272a}
.ax-b.act{background:#0d99ff;color:#fff}
.ax-b.warn{background:#f59e0b;color:#111;font-weight:600}
.ax-b.pri{background:#0d99ff;color:#fff;font-weight:600}
.ax-b.pri:hover:not(:disabled){background:#2ea8ff}
.ax-b:disabled{opacity:.35;cursor:default}
.ax-b.ic{padding:6px;display:inline-flex;align-items:center;justify-content:center}
.ax-b.pri.ic{gap:6px;padding:6px 11px}
.ax-ic{width:17px;height:17px;display:block;flex:none}
.ax-sep{width:1px;height:18px;background:#3f3f46;margin:0 3px;flex:none}
.ax-n{padding:3px 9px;background:#27272a;border-radius:999px;color:#a1a1aa;font-size:11px;white-space:nowrap}

.ax-hd{display:flex;align-items:center;justify-content:space-between;padding:9px 10px 9px 14px;border-bottom:1px solid #27272a;position:sticky;top:0;background:#18181b;z-index:2}
.ax-hd strong{font-size:12px;letter-spacing:.02em}
.ax-s{padding:10px 12px}
.ax-s.ax-acc{margin:8px 10px 0;padding:0;border:1px solid #3f3f46;border-radius:12px;background:#1f1f23;overflow:hidden}
.ax-s.ax-acc:last-child{margin-bottom:12px}
.ax-ah{display:flex;align-items:center;gap:8px;width:100%;background:#27272d;border:0;color:#e4e4e7;cursor:pointer;padding:9px 12px;text-align:left}
.ax-ah:hover{background:#303038}
.ax-ah span{flex:1;font:600 12px/1.3 system-ui}
.ax-ah .ax-ic{width:15px;height:15px;color:#5cb8ff}
.ax-chev{transition:transform .15s;color:#a1a1aa!important}
.ax-s.shut .ax-chev{transform:rotate(-90deg)}
.ax-s.ax-acc:not(.shut) .ax-ah{border-bottom:1px solid #3f3f46}
.ax-ab{padding:11px}
.ax-s.shut .ax-ab{display:none}

.ax-g{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ax-g3{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.ax-f{display:flex;flex-direction:column;gap:3px;color:#a1a1aa;font-size:11px}
.ax-i{width:100%;background:#27272a;border:1px solid #3f3f46;color:#fff;border-radius:6px;padding:5px 7px;min-height:28px;font-size:12px;outline:none}
.ax-i:focus{border-color:#0d99ff}
textarea.ax-i{font:11.5px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical}
input[type=color].ax-i{padding:2px;height:28px;cursor:pointer}
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
input[type=number]{-moz-appearance:textfield}
select.ax-i{appearance:none;padding-right:24px;background:#27272a url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23a1a1aa' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat right 8px center}
.ax-scrub{cursor:ns-resize}

.ax-sel{font:600 11px ui-monospace,SFMono-Regular,Menlo,monospace;color:#7dd3fc;background:#27272a;border-radius:7px;padding:6px 8px;word-break:break-all;margin-bottom:8px;border:1px solid #3f3f46}
.ax-nav{display:flex;gap:4px}
.ax-nav .ax-b{flex:1;background:#27272a;padding:5px;font-size:11px}
.ax-seg{display:flex;background:#27272a;border-radius:6px;overflow:hidden;border:1px solid #3f3f46}
.ax-seg .ax-b{flex:1;border-radius:0;padding:5px 4px;font-size:11px}
.ax-wide{width:100%;margin-top:8px;background:#27272a;border:1px solid #3f3f46}
.ax-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ax-mvh{display:flex;justify-content:space-between;color:#a1a1aa;font-size:11px;margin:10px 0 5px}

.ax-empty{padding:24px 16px;color:#a1a1aa;text-align:center;line-height:1.6}
.ax-empty strong{display:block;color:#e4e4e7;font-size:13px;margin-bottom:6px}
.ax-art{width:144px;height:auto;display:block;margin:0 auto 14px}
.ax-empty kbd{background:#27272a;border:1px solid #3f3f46;border-radius:4px;padding:1px 5px;color:#e4e4e7;font-size:11px}

.ax-cg{margin-top:10px}.ax-ab>.ax-cg:first-child{margin-top:0}
.ax-ch{display:flex;justify-content:space-between;gap:8px;color:#a1a1aa;font-size:11px;margin-bottom:5px}
.ax-ch em{font-style:normal;color:#71717a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ax-cr{display:flex;align-items:center;gap:5px}
.ax-cur{position:relative;flex:none;width:28px;height:28px;border-radius:7px;border:2px solid #0d99ff;box-shadow:inset 0 0 0 2px #18181b;cursor:pointer;overflow:hidden}
.ax-cur input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;padding:0;border:0}
.ax-cur.tr,.ax-c.ax-none{background:conic-gradient(#3f3f46 25%,#27272a 0 50%,#3f3f46 0 75%,#27272a 0) 0 0/8px 8px}
.ax-chips{display:flex;gap:5px;flex:1;min-width:0;overflow:hidden;padding-left:6px;margin-left:1px;border-left:1px solid #3f3f46}
.ax-c{width:20px;height:20px;flex:none;border-radius:5px;border:1px solid #52525b;cursor:pointer;padding:0}
.ax-c.act{outline:2px solid #0d99ff;outline-offset:1px}
.ax-c.cu{border-style:dashed}
.ax-cb{flex:none;width:26px;height:26px;display:flex;align-items:center;justify-content:center;background:#3f3f46;border:1px solid #71717a;border-radius:7px;color:#fff;cursor:pointer;padding:0}
.ax-cb:hover{background:#52525b}
.ax-cb .ax-ic{width:15px;height:15px;transition:transform .15s}
.ax-cb.open .ax-ic{transform:rotate(180deg)}
.ax-cb.pl{background:#0d99ff;border-color:#0d99ff}
.ax-cgrid,.ax-add,.ax-fx{margin-top:8px;padding:8px;background:#2a2a30;border-radius:8px}
.ax-cgrid{display:flex;flex-wrap:wrap;gap:6px}
.ax-add{display:flex;flex-direction:column;gap:8px}
.ax-add .ax-r{display:flex;gap:6px;align-items:center}
.ax-add .ax-r .ax-i[type=color]{width:38px;flex:none}
.ax-add .ax-i[data-ga]{width:66px;flex:none}
.ax-add[data-mode="solid"] .ax-gr{display:none}
.ax-prev{height:22px;border-radius:5px;border:1px solid #52525b}
.ax-sw{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
.ax-sw button{width:18px;height:18px;border-radius:5px;border:1px solid #52525b;cursor:pointer;padding:0}

.ax-mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:6px}
.ax-mbtn{background:#27272a;border:1px solid #3f3f46;border-radius:7px;padding:6px 4px;color:#e4e4e7;font-size:10.5px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
.ax-mbtn:hover{border-color:#71717a;background:#303038}
.ax-mbtn.act{border-color:#0d99ff;background:rgba(13,153,255,.18);color:#fff}
.ax-mbtn svg{width:28px;height:20px;display:block}
.ax-shitem{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#2a2a30;border-radius:7px;margin-top:6px;font-size:11px}
.ax-shitem span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ax-badge{font-size:10px;padding:2px 6px;border-radius:999px;font-weight:600;cursor:pointer;border:0}
.ax-badge.guide{background:rgba(245,158,11,.2);color:#fbbf24}
.ax-badge.real{background:rgba(16,185,129,.2);color:#34d399}

.ax-hov,.ax-box,.ax-zone,.ax-frame{position:fixed;pointer-events:none;display:none}
.ax-hov{border:1.5px dashed #0d99ff;z-index:2147483638}
.ax-box{border:2px solid #0d99ff;z-index:2147483639}
.ax-tag{position:absolute;top:-22px;left:-2px;background:#0d99ff;color:#fff;font:600 10px ui-monospace,monospace;padding:3px 6px;border-radius:4px;white-space:nowrap}
.ax-h{position:absolute;width:9px;height:9px;background:#fff;border:2px solid #0d99ff;pointer-events:auto;border-radius:2px}
.ax-zone{border:1.5px dashed #0d99ff;background:rgba(13,153,255,.1);z-index:2147483639}
.ax-frame{border:1.5px dashed #f59e0b;background:rgba(245,158,11,.08);border-radius:4px;z-index:2147483637}
.ax-pin{pointer-events:auto;position:fixed;z-index:2147483639;width:24px;height:24px;border-radius:12px 12px 12px 2px;background:#f59e0b;color:#111;font:700 12px/24px system-ui;text-align:center;transform:translate(-4px,-24px);box-shadow:0 4px 10px rgba(0,0,0,.35);cursor:pointer;user-select:none}

.ax-svg{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483638;overflow:visible}

.ax-pop,.ax-mod{pointer-events:auto;position:fixed;z-index:2147483645;display:none;background:#18181b;color:#e4e4e7;border:1px solid #3f3f46;box-shadow:0 16px 40px rgba(0,0,0,.5)}
.ax-pop{width:256px;padding:10px;border-radius:11px;flex-direction:column;gap:8px}
.ax-pop.show{display:flex}
.ax-mod{inset:0;background:rgba(0,0,0,.65);align-items:center;justify-content:center;padding:20px;border:0}
.ax-mod.show{display:flex}
.ax-card{width:min(720px,100%);max-height:92vh;overflow:auto;background:#18181b;border:1px solid #3f3f46;border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px}
.ax-card textarea{width:100%;background:#0b0b0d;color:#e4e4e7;border:1px solid #3f3f46;border-radius:8px;padding:10px;font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;resize:vertical}
.ax-th{max-width:100%;max-height:90px;border-radius:6px;display:block;margin-top:4px;border:1px solid #3f3f46}

.ax-pan,.ax-card,.ax-card textarea,.ax-top{scrollbar-width:thin;scrollbar-color:#71717a transparent}
@media(max-width:1180px){.ax-lbl{display:none}}
@media(min-width:600px) and (max-width:899px){.ax-pan{width:248px}}
@media(max-width:599px){.ax-top{max-width:calc(100vw - 16px)}.ax-pan{top:auto;left:8px;right:8px;bottom:8px;width:auto;height:auto;max-height:46vh}}
`;

// === src/utils.js ===
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E")`;
const FONTS = [
  ['Inter', 'Inter, Arial, sans-serif'],
  ['Noto Sans Arabic', "'Noto Sans Arabic', sans-serif"],
  ['Noto Sans Tifinagh', "'Noto Sans Tifinagh', sans-serif"],
  ['Georgia (serif)', 'Georgia, serif'],
  ['Mono', 'ui-monospace, SFMono-Regular, Menlo, monospace'],
  ['System UI', 'system-ui, -apple-system, sans-serif']
];
const TEXT_STYLES = {
  h1: ['48px', '700', '1.15', '-0.02em'],
  h2: ['28px', '700', '1.2', '-0.015em'],
  h3: ['18px', '600', '1.3', '0'],
  body: ['16px', '400', '1.5', '0'],
  small: ['14px', '400', '1.5', '0'],
  cap: ['12px', '500', '1.4', '0.02em']
};
const MASK_PRESETS = [
  {
    id: 'arc-bottom',
    group: 'section',
    name: 'Bottom Arc',
    svg: '<path d="M2 2h24v12Q14 20 2 14z" fill="currentColor" opacity=".8"/>',
    build: d => `ellipse(${100 + d * 2}% ${100 - Math.min(d, 40)}% at 50% ${Math.min(d, 30)}%)`
  },
  {
    id: 'diag-bottom',
    group: 'section',
    name: 'Diagonal',
    svg: '<path d="M2 2h24v11L2 18z" fill="currentColor" opacity=".8"/>',
    build: d => `polygon(0 0, 100% 0, 100% ${100 - d}%, 0 100%)`
  },
  {
    id: 'chevron-bottom',
    group: 'section',
    name: 'Chevron',
    svg: '<path d="M2 2h24v11l-12 5-12-5z" fill="currentColor" opacity=".8"/>',
    build: d => `polygon(0 0, 100% 0, 100% ${100 - d}%, 50% 100%, 0 ${100 - d}%)`
  },
  {
    id: 'circle',
    group: 'media',
    name: 'Circle',
    svg: '<circle cx="14" cy="10" r="8" fill="currentColor" opacity=".8"/>',
    build: d => `circle(${Math.max(20, 50 - Math.round(d / 3))}% at 50% 50%)`
  },
  {
    id: 'pill',
    group: 'media',
    name: 'Pill',
    svg: '<rect x="3" y="4" width="22" height="12" rx="6" fill="currentColor" opacity=".8"/>',
    build: d => `inset(${Math.round(d / 4)}% 0 round 999px)`
  },
  {
    id: 'hexagon',
    group: 'media',
    name: 'Hexagon',
    svg: '<polygon points="14,2 24,6 24,14 14,18 4,14 4,6" fill="currentColor" opacity=".8"/>',
    build: () => 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)'
  },
  {
    id: 'diamond',
    group: 'media',
    name: 'Diamond',
    svg: '<polygon points="14,1 25,10 14,19 3,10" fill="currentColor" opacity=".8"/>',
    build: () => 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
  },
  {
    id: 'bevel',
    group: 'media',
    name: 'Bevel',
    svg: '<polygon points="6,2 22,2 26,6 26,14 22,18 6,18 2,14 2,6" fill="currentColor" opacity=".8"/>',
    build: d => {
      const c = Math.max(4, Math.min(30, d));
      return `polygon(${c}% 0%, ${100 - c}% 0%, 100% ${c}%, 100% ${100 - c}%, ${100 - c}% 100%, ${c}% 100%, 0% ${100 - c}%, 0% ${c}%)`;
    }
  },
  {
    id: 'blob',
    group: 'media',
    name: 'Blob',
    svg: '<path d="M14 2c6 0 11 3 10 8s-4 9-10 8-11-3-10-8 4-8 10-8z" fill="currentColor" opacity=".8"/>',
    build: () => 'polygon(18% 6%, 55% 2%, 88% 14%, 97% 48%, 85% 86%, 46% 98%, 12% 84%, 3% 44%)'
  }
];
const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');
const icon = d =>
  `<svg class="ax-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const isApexNode = el =>
  !el || el === document.body || el === document.documentElement || el.id === 'apexui-host' || !!el.closest?.('#apexui-host,[data-apexui]');
const getUniqueSelector = el => {
  if (!el || el.nodeType !== 1) return '';
  if (el.id && document.querySelectorAll('#' + CSS.escape(el.id)).length === 1) {
    return '#' + el.id;
  }
  const parts = [];
  let cur = el;
  while (cur && cur.nodeType === 1 && cur !== document.body && parts.length < 6) {
    let seg = cur.tagName.toLowerCase();
    const cls = [...cur.classList]
      .filter(c => !c.startsWith('ax-') && !c.startsWith('apexui-') && !c.startsWith('ve-'))
      .slice(0, 2);
    if (cls.length) seg += '.' + cls.map(c => CSS.escape(c)).join('.');
    const parent = cur.parentElement;
    if (parent) {
      const same = [...parent.children].filter(n => n.tagName === cur.tagName);
      if (same.length > 1) seg += `:nth-of-type(${same.indexOf(cur) + 1})`;
    }
    parts.unshift(seg);
    const candidate = parts.join(' > ');
    try {
      if (document.querySelectorAll(candidate).length === 1) return candidate;
    } catch (_) {}
    cur = parent;
  }
  return parts.join(' > ');
};
const readRootTokens = () => {
  const out = [];
  const seen = new Set();
  const cs = getComputedStyle(document.documentElement);
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.includes(':root')) {
          for (const prop of rule.style) {
            if (prop.startsWith('--') && !seen.has(prop)) {
              const val = cs.getPropertyValue(prop).trim();
              if (/^(#|rgb|hsl|oklch|oklab)/i.test(val)) {
                seen.add(prop);
                out.push([prop, val]);
              }
            }
          }
        }
      }
    } catch (_) {}
  }
  return out.slice(0, 24);
};
const rgbToHex = c => {
  const m = (c || '').match(/[\d.]+/g);
  if (!m || m.length < 3 || (m[3] !== undefined && +m[3] === 0)) return '#ffffff';
  return '#' + m.slice(0, 3).map(x => Math.round(+x).toString(16).padStart(2, '0')).join('');
};
const normalizeColor = v => {
  try {
    const tmp = document.createElement('i');
    tmp.setAttribute('data-apexui', '');
    tmp.style.color = v;
    document.body.appendChild(tmp);
    const c = getComputedStyle(tmp).color;
    tmp.remove();
    return rgbToHex(c);
  } catch (_) {
    return '#ffffff';
  }
};
const parseShadow = z => {
  if (!z || z === 'none') return { x: 0, y: 4, b: 12, s: 0, c: '#000000', o: 0.15 };
  const c = z.match(/rgba?\([^)]+\)/);
  const n = z.replace(/rgba?\([^)]+\)/, '').match(/-?[\d.]+/g) || [];
  const m = c ? c[0].match(/[\d.]+/g) : [0, 0, 0];
  return {
    x: +n[0] || 0,
    y: +n[1] || 0,
    b: +n[2] || 0,
    s: +n[3] || 0,
    c: rgbToHex(c ? c[0] : 'rgb(0,0,0)'),
    o: m[3] !== undefined ? +m[3] : 1
  };
};
const getUnionRect = nodes => {
  let l = 1e9, t = 1e9, r = -1e9, b = -1e9;
  nodes.forEach(n => {
    const q = n.getBoundingClientRect();
    l = Math.min(l, q.left);
    t = Math.min(t, q.top);
    r = Math.max(r, q.right);
    b = Math.max(b, q.bottom);
  });
  return { l, t, r, b };
};
const slugify = s =>
  String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// === src/state.js ===
const SKIP_TAGS = /^(SCRIPT|STYLE|LINK)$/;

const SAFE_COLOR_NAME = /^--[a-z0-9-]+$/i;
const SAFE_COLOR_VAL = /^(#[0-9a-f]{3,8}|rgba?\([^;{}<>]+\)|hsla?\([^;{}<>]+\)|linear-gradient\([^;{}<>]+\))$/i;
function createState() {
  const customColors = [];
  try {
    const saved = JSON.parse(localStorage.getItem('m84-patch-colors') || '[]');
    if (Array.isArray(saved)) {
      saved.slice(0, 40).forEach(c => {
        if (c && typeof c.n === 'string' && typeof c.v === 'string' && SAFE_COLOR_NAME.test(c.n) && SAFE_COLOR_VAL.test(c.v)) {
          customColors.push({ n: c.n, v: c.v, g: c.g ? 1 : 0 });
        }
      });
    }
  } catch (_) {}

  const liveStyleEl = document.createElement('style');
  liveStyleEl.setAttribute('data-apexui-live', '');
  document.head.appendChild(liveStyleEl);

  let codeIdSeq = 1;
  let shapeIdSeq = 1;

  const st = {
    on: false,
    preview: false,
    mode: 'select', // select | text | pin | zone | shape
    shapeKind: 'rect', // rect | arrow | line | ellipse
    shapeRole: 'guide', // guide | real
    sel: null,
    lock: false,
    shut: new Set(['Effects', 'Code { }', 'Layer']),
    cgx: new Set(),
    cgadd: null,
    gmode: 'solid',
    maskDepth: 12,
    gradMeta: new WeakMap(),

    styleDiffs: new Map(), // el -> { prop: { b, a } }
    textDiffs: new Map(),  // el -> { b, a }
    domMoves: [],          // [{ desc, active }]
    pins: [],              // [{ id, s, el, dx, dy, group, frame, n, imgs, node, active }]
    shapes: [],            // [{ id, kind, role, label, el, sel, rx, ry, rw, rh, active, prevClip }]
    masks: new Map(),      // el -> { preset, name, depth, clipPath }
    codeBlocks: new Map(), // el -> { id, css, js }
    customColors,

    undoStack: [], // [{ undo, redo }]
    redoStack: [],
    txOps: null,   // active transaction array when grouping multiple ops

    onChange: () => {}
  };

  const persistColors = () => {
    try {
      localStorage.setItem('m84-patch-colors', JSON.stringify(st.customColors));
    } catch (_) {}
  };

  const getPalette = () =>
    readRootTokens()
      .map(([n, v]) => ({ n, v, h: normalizeColor(v), c: 0, g: 0 }))
      .concat(
        st.customColors.map(c => ({
          n: c.n,
          v: c.v,
          h: c.g ? '#gradient' : normalizeColor(c.v),
          c: 1,
          g: c.g ? 1 : 0
        }))
      );

  const syncLiveCss = () => {
    const chunks = [];
    st.codeBlocks.forEach((entry, el) => {
      if (!entry.css.trim()) return;
      if (!el.dataset.apexId) el.dataset.apexId = entry.id;
      const scoped = entry.css
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
        .join(' ');
      if (scoped.includes('{')) {
        chunks.push(scoped.replace(/&/g, `[data-apex-id="${entry.id}"]`));
      } else {
        chunks.push(`[data-apex-id="${entry.id}"] { ${scoped} }`);
      }
    });
    liveStyleEl.textContent = chunks.join('\n');
  };

  const pushOp = op => {
    if (st.txOps) {
      st.txOps.push(op);
    } else {
      st.undoStack.push(op);
      st.redoStack.length = 0;
    }
  };

  const withTx = fn => {
    const prevTx = st.txOps;
    const ops = [];
    st.txOps = ops;
    try {
      fn();
    } finally {
      st.txOps = prevTx;
      if (ops.length === 1) {
        pushOp(ops[0]);
      } else if (ops.length > 1) {
        pushOp({
          undo: () => { for (let i = ops.length - 1; i >= 0; i--) ops[i].undo(); },
          redo: () => { for (let i = 0; i < ops.length; i++) ops[i].redo(); }
        });
      }
    }
    st.onChange();
  };

  const applyStyleRaw = (el, prop, val, label) => {
    if (!st.styleDiffs.has(el)) st.styleDiffs.set(el, {});
    const rec = st.styleDiffs.get(el);
    if (!rec[prop]) rec[prop] = { b: getComputedStyle(el)[prop] };
    el.style[prop] = val;
    const displayVal = label
      ? `var(${label}) (${val})`
      : /feTurbulence/.test(val)
        ? 'noise feTurbulence (bruit, opacité .18)'
        : val;
    rec[prop].a = displayVal || rec[prop].b;
    if (rec[prop].a === rec[prop].b || val === '') delete rec[prop];
    if (!Object.keys(rec).length) st.styleDiffs.delete(el);
  };

  const setStyle = (el, prop, val, label, record = true) => {
    if (!el) return;
    const needBorderStyle =
      (prop === 'borderWidth' || prop === 'borderColor') &&
      getComputedStyle(el).borderTopStyle === 'none';

    const doOne = (p, v, lab) => {
      const prevInline = el.style[p];
      const prevDiff = st.styleDiffs.get(el)?.[p] ? { ...st.styleDiffs.get(el)[p] } : null;
      applyStyleRaw(el, p, v, lab);
      if (record) {
        pushOp({
          undo: () => {
            el.style[p] = prevInline;
            if (prevDiff) {
              if (!st.styleDiffs.has(el)) st.styleDiffs.set(el, {});
              st.styleDiffs.get(el)[p] = { ...prevDiff };
            } else if (st.styleDiffs.has(el)) {
              delete st.styleDiffs.get(el)[p];
              if (!Object.keys(st.styleDiffs.get(el)).length) st.styleDiffs.delete(el);
            }
          },
          redo: () => applyStyleRaw(el, p, v, lab)
        });
      }
    };

    if (needBorderStyle && record && !st.txOps) {
      withTx(() => {
        doOne('borderStyle', 'solid');
        doOne(prop, val, label);
      });
    } else {
      if (needBorderStyle) doOne('borderStyle', 'solid');
      doOne(prop, val, label);
      if (!st.txOps) st.onChange();
    }
  };

  const setText = (el, before, after) => {
    if (before === after) return;
    const origBefore = st.textDiffs.get(el)?.b ?? before;
    const prevEntry = st.textDiffs.get(el) ? { ...st.textDiffs.get(el) } : null;
    const applyT = val => {
      el.textContent = val;
      if (val === origBefore) st.textDiffs.delete(el);
      else st.textDiffs.set(el, { b: origBefore, a: val });
    };
    applyT(after);
    pushOp({
      undo: () => {
        el.textContent = before;
        if (prevEntry) st.textDiffs.set(el, { ...prevEntry });
        else st.textDiffs.delete(el);
      },
      redo: () => applyT(after)
    });
    st.onChange();
  };

  const siblings = el =>
    [...(el.parentElement?.children || [])].filter(n => !isApexNode(n) && !SKIP_TAGS.test(n.tagName));

  const moveSibling = (el, delta) => {
    const par = el?.parentElement;
    if (!par) return;
    const list = siblings(el);
    const other = list[list.indexOf(el) + delta];
    if (!other) return;
    const nextRef = el.nextSibling;
    const entry = {
      desc: `\`${getUniqueSelector(el)}\` moved ${delta < 0 ? 'before' : 'after'} \`${getUniqueSelector(other)}\``,
      active: true
    };
    const redoFn = () => {
      delta < 0 ? par.insertBefore(el, other) : par.insertBefore(el, other.nextSibling);
      entry.active = true;
    };
    const undoFn = () => {
      par.insertBefore(el, nextRef);
      entry.active = false;
    };
    redoFn();
    st.domMoves.push(entry);
    pushOp({ undo: undoFn, redo: redoFn });
    st.onChange();
  };

  const reverseChildren = el => {
    if (!el) return;
    const kids = [...el.children].filter(n => !isApexNode(n) && !SKIP_TAGS.test(n.tagName));
    if (kids.length < 2) return;
    const anchor = kids[kids.length - 1].nextSibling;
    const entry = {
      desc: `order of ${kids.length} children inside \`${getUniqueSelector(el)}\` reversed`,
      active: true
    };
    const redoFn = () => {
      [...kids].reverse().forEach(n => el.insertBefore(n, anchor));
      entry.active = true;
    };
    const undoFn = () => {
      kids.forEach(n => el.insertBefore(n, anchor));
      entry.active = false;
    };
    redoFn();
    st.domMoves.push(entry);
    pushOp({ undo: undoFn, redo: redoFn });
    st.onChange();
  };

  const addPin = pin => {
    pin.active = true;
    st.pins.push(pin);
    pushOp({
      undo: () => {
        pin.active = false;
        pin.node.style.display = 'none';
        if (pin.frame) pin.frame.style.display = 'none';
      },
      redo: () => {
        pin.active = true;
      }
    });
    st.onChange();
  };

  const applyMask = (el, preset, depth) => {
    if (!el) return;
    const prevMask = st.masks.get(el) ? { ...st.masks.get(el) } : null;
    const clip = preset ? preset.build(depth) : '';
    withTx(() => {
      setStyle(el, 'clipPath', clip);
      const nextMask = preset ? { preset: preset.id, name: preset.name, depth, clipPath: clip } : null;
      if (nextMask) st.masks.set(el, nextMask);
      else st.masks.delete(el);
      pushOp({
        undo: () => {
          if (prevMask) st.masks.set(el, { ...prevMask });
          else st.masks.delete(el);
        },
        redo: () => {
          if (nextMask) st.masks.set(el, { ...nextMask });
          else st.masks.delete(el);
        }
      });
    });
  };

  const addShape = shape => {
    shape.id = 'sh-' + shapeIdSeq++;
    shape.active = true;
    st.shapes.push(shape);
    const applyRole = () => {
      if (shape.role === 'real' && shape.el) {
        shape.prevClip = shape.el.style.clipPath;
        if (shape.kind === 'ellipse') {
          shape.el.style.clipPath = 'ellipse(48% 48% at 50% 50%)';
        } else if (shape.kind === 'rect') {
          shape.el.style.clipPath = 'inset(4% round 12px)';
        }
      }
    };
    const revertRole = () => {
      if (shape.role === 'real' && shape.el) {
        shape.el.style.clipPath = shape.prevClip || '';
      }
    };
    applyRole();
    pushOp({
      undo: () => {
        shape.active = false;
        revertRole();
      },
      redo: () => {
        shape.active = true;
        applyRole();
      }
    });
    st.onChange();
  };

  const toggleShapeRole = id => {
    const sh = st.shapes.find(s => s.id === id && s.active);
    if (!sh) return;
    const prevRole = sh.role;
    const nextRole = prevRole === 'guide' ? 'real' : 'guide';
    const setRole = r => {
      if (sh.role === 'real' && sh.el && r === 'guide') {
        sh.el.style.clipPath = sh.prevClip || '';
      }
      sh.role = r;
      if (r === 'real' && sh.el) {
        sh.prevClip = sh.el.style.clipPath;
        sh.el.style.clipPath = sh.kind === 'ellipse'
          ? 'ellipse(48% 48% at 50% 50%)'
          : 'inset(4% round 12px)';
      }
    };
    setRole(nextRole);
    pushOp({ undo: () => setRole(prevRole), redo: () => setRole(nextRole) });
    st.onChange();
  };

  const removeShape = id => {
    const sh = st.shapes.find(s => s.id === id && s.active);
    if (!sh) return;
    const prevClip = sh.el ? sh.el.style.clipPath : '';
    const deactivate = () => {
      sh.active = false;
      if (sh.role === 'real' && sh.el) sh.el.style.clipPath = sh.prevClip || '';
    };
    const reactivate = () => {
      sh.active = true;
      if (sh.role === 'real' && sh.el) sh.el.style.clipPath = prevClip;
    };
    deactivate();
    pushOp({ undo: reactivate, redo: deactivate });
    st.onChange();
  };

  const setCodeBlock = (el, css, js) => {
    if (!el) return;
    const prev = st.codeBlocks.get(el) ? { ...st.codeBlocks.get(el) } : null;
    const id = prev?.id || 'axc' + codeIdSeq++;
    const next = css.trim() || js.trim() ? { id, css, js } : null;
    const applyCode = val => {
      if (val) {
        el.dataset.apexId = val.id;
        st.codeBlocks.set(el, { ...val });
      } else {
        delete el.dataset.apexId;
        st.codeBlocks.delete(el);
      }
      syncLiveCss();
    };
    applyCode(next);
    pushOp({
      undo: () => applyCode(prev),
      redo: () => applyCode(next)
    });
    st.onChange();
  };

  const undo = () => {
    const op = st.undoStack.pop();
    if (!op) return;
    op.undo();
    st.redoStack.push(op);
    st.onChange();
  };

  const redo = () => {
    const op = st.redoStack.pop();
    if (!op) return;
    op.redo();
    st.undoStack.push(op);
    st.onChange();
  };

  const resetAll = () => {
    while (st.undoStack.length) {
      const op = st.undoStack.pop();
      op.undo();
    }
    st.redoStack.length = 0;
    st.pins.forEach(p => {
      p.node.remove();
      p.frame?.remove();
    });
    st.pins.length = 0;
    st.shapes.length = 0;
    st.domMoves.length = 0;
    st.styleDiffs.clear();
    st.textDiffs.clear();
    st.masks.clear();
    st.codeBlocks.forEach((_, el) => delete el.dataset.apexId);
    st.codeBlocks.clear();
    syncLiveCss();
    st.onChange();
  };

  const countChanges = () => {
    let n = 0;
    st.styleDiffs.forEach(ps => (n += Object.keys(ps).length));
    n += st.textDiffs.size;
    n += st.pins.filter(p => p.active).length;
    n += st.domMoves.filter(m => m.active).length;
    n += st.shapes.filter(s => s.active).length;
    n += st.codeBlocks.size;
    return n;
  };

  return {
    st,
    persistColors,
    getPalette,
    withTx,
    setStyle,
    setText,
    siblings,
    moveSibling,
    reverseChildren,
    addPin,
    applyMask,
    addShape,
    toggleShapeRole,
    removeShape,
    setCodeBlock,
    undo,
    redo,
    resetAll,
    countChanges
  };
}

// === src/export.js ===
function generatePatchPrompt(st, freeNote = '') {
  const title = document.title || location.pathname || 'UI Page';
  const out = [
    `# Visual UI Patch — ${title}`,
    '',
    'Important: these visual edits (offsets, sizes, spacing, masks, guides) express design intent — do NOT copy raw pixels or write inline `style=""` attributes. Apply them cleanly in source stylesheets, Tailwind classes, `:root` tokens, and reusable components following project specs, 8px spacing grid, mobile-first responsiveness, and WCAG 2.1 AA. Unify styles: if typography, color, radius, shadow, or spacing changes on one element, propagate it to all elements sharing the same role via tokens or shared classes rather than creating one-off exceptions.',
    ''
  ];

  const note = freeNote.trim();
  if (note) {
    out.push('## Design Intent', note, '');
  }

  if (st.styleDiffs.size) {
    const lines = [];
    st.styleDiffs.forEach((ps, el) => {
      const entries = Object.entries(ps);
      if (!entries.length) return;
      lines.push(`- \`${getUniqueSelector(el)}\``);
      entries.forEach(([prop, diff]) => {
        const cssProp = prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
        lines.push(`  - ${cssProp}: ${diff.b} → ${diff.a}`);
      });
    });
    if (lines.length) out.push('## Styles', ...lines, '');
  }

  if (st.textDiffs.size) {
    out.push('## Copy / Text');
    st.textDiffs.forEach((diff, el) => {
      out.push(`- \`${getUniqueSelector(el)}\`: "${diff.b}" → "${diff.a}"`);
    });
    out.push('');
  }

  const activeMoves = st.domMoves.filter(m => m.active);
  if (activeMoves.length) {
    out.push('## DOM Order (Reordering)');
    activeMoves.forEach(m => out.push('- ' + m.desc));
    out.push('');
  }

  if (st.customColors.length) {
    out.push('## New Colors / Gradients (declare as :root tokens)');
    st.customColors.forEach(c => out.push(`- \`${c.n}\`: ${c.v}`));
    out.push('');
  }

  const activeShapes = st.shapes.filter(s => s.active);
  if (st.masks.size || activeShapes.length) {
    out.push('## Shapes & Masks (Guide / Real)');
    st.masks.forEach((m, el) => {
      out.push(`- [Real · Mask ${m.name}] on \`${getUniqueSelector(el)}\`: \`clip-path: ${m.clipPath}\` (adapt responsively)`);
    });
    activeShapes.forEach((sh, idx) => {
      const roleTag = sh.role === 'real' ? 'Real' : 'Guide';
      const target = sh.sel ? ` on \`${sh.sel}\`` : '';
      const dims = `${Math.round(sh.rw)}×${Math.round(sh.rh)}px`;
      const desc = sh.label ? ` — ${sh.label}` : '';
      out.push(`- #${idx + 1} [${roleTag} · ${sh.kind}]${target} (${dims})${desc}`);
    });
    out.push('');
  }

  if (st.codeBlocks.size) {
    out.push('## Code { } Snippets (use :root tokens & respect prefers-reduced-motion)');
    st.codeBlocks.forEach((entry, el) => {
      out.push(`- \`${getUniqueSelector(el)}\``);
      if (entry.css.trim()) {
        out.push('  ```css', ...entry.css.trim().split('\n').map(l => '  ' + l), '  ```');
      }
      if (entry.js.trim()) {
        out.push('  ```js', ...entry.js.trim().split('\n').map(l => '  ' + l), '  ```');
      }
    });
    out.push('');
  }

  const activePins = st.pins.filter(p => p.active);
  if (activePins.length) {
    out.push('## Annotations (Element / Zone)');
    let imgIdx = 0;
    activePins.forEach((p, i) => {
      const imgRefs = p.imgs.map(() => ` [attached image #${++imgIdx}]`).join('');
      const target = p.group ? `zone (${p.group.length} elements) \`${p.s}\`` : `\`${p.s}\``;
      out.push(`- #${i + 1} on ${target}: ${p.n}${imgRefs}`);
    });
    out.push('');
  }

  return out.join('\n').trim();
}

// === src/panel.js ===
const SECTION_ICONS = {
  Layout: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  Typography: '<path d="M5 7V5h14v2M12 5v14M9 19h6"/>',
  'Fill & Border': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 15l5-5 4 4 3-3 6 6"/>',
  'Shapes & Masks': '<path d="M4 6h16v8c-4 4-12 4-16 0z"/><circle cx="18" cy="18" r="3"/>',
  Effects: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4"/>',
  'Code { }': '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16"/>',
  Layer: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'
};

const CH = icon('<path d="M6 9l6 6 6-6"/>');
const PL = icon('<path d="M12 5v14M5 12h14"/>');

const field = (label, prop, val, type = 'text', scrub = false) =>
  `<label class="ax-f">${esc(label)}<input class="ax-i${scrub ? ' ax-scrub' : ''}" data-p="${esc(prop)}" type="${esc(type)}" value="${esc(val)}"></label>`;

const swatchBtn = (c, prop, active) =>
  `<button class="ax-c${active ? ' act' : ''}${c.c ? ' cu' : ''}" title="${esc(c.n)}: ${esc(c.v)}${c.c ? ' (right-click to delete)' : ''}" data-sp="${esc(prop)}" data-sv="${esc(c.v)}" data-st="${esc(c.n)}"${c.g ? ' data-g="1"' : ''} style="background:${esc(c.v)}"></button>`;

function renderAccordion(st, title, bodyHtml) {
  const shut = st.shut.has(title) ? ' shut' : '';
  const ic = SECTION_ICONS[title] || '<circle cx="12" cy="12" r="3"/>';
  return `<div class="ax-s ax-acc${shut}">
    <button class="ax-ah" data-acc="${esc(title)}">${icon(ic)}<span>${esc(title)}</span><svg class="ax-ic ax-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="ax-ab">${bodyHtml}</div>
  </div>`;
}

function renderColorGroup(api, prop, label) {
  const { st, getPalette } = api;
  const sel = st.sel;
  const cs = getComputedStyle(sel);
  const raw = prop === 'borderColor' ? cs.borderTopColor : cs[prop];
  const m = raw.match(/[\d.]+/g) || [];
  const bi = sel.style.backgroundImage;
  const isGrad = /gradient/.test(bi) && (prop === 'backgroundColor' || (prop === 'color' && sel.style.backgroundClip === 'text'));
  const isTr = !isGrad && (raw === 'transparent' || (m[3] !== undefined && +m[3] === 0));
  const cur = isTr || isGrad ? '' : rgbToHex(raw);
  const pl = getPalette().filter(c => !c.g || prop !== 'borderColor');
  const gn = (st.gradMeta.get(sel) || {})[prop];
  const ai = isGrad ? pl.findIndex(c => c.n === gn) : pl.findIndex(c => c.h === cur);
  const open = st.cgx.has(prop);
  const rest = pl.filter((_, i) => i !== ai);
  const isBg = prop === 'backgroundColor';
  const nameLabel = isGrad
    ? (gn ? gn + ' · ' : '') + 'Gradient'
    : isTr
      ? 'Transparent'
      : (ai >= 0 ? pl[ai].n + ' · ' : '') + cur;
  const bgStyle = isGrad ? bi : cur;
  const ca = cur || '#3b82f6';
  const md = prop === 'borderColor' ? 'solid' : st.gmode;

  return `<div class="ax-cg">
    <div class="ax-ch"><span>${esc(label)}</span><em>${esc(nameLabel)}</em></div>
    <div class="ax-cr">
      <label class="ax-cur${isTr ? ' tr' : ''}" title="Active color: click to pick"${bgStyle ? ` style="background:${esc(bgStyle)}"` : ''}>
        <input type="color" data-p="${esc(prop)}" value="${esc(cur || '#ffffff')}">
      </label>
      <div class="ax-chips">
        ${isBg ? `<button class="ax-c ax-none${isTr ? ' act' : ''}" title="Transparent" data-sp="${esc(prop)}" data-sv="transparent" data-st=""></button>` : ''}
        ${(open ? [] : rest.slice(0, isBg ? 3 : 4)).map(c => swatchBtn(c, prop, false)).join('')}
      </div>
      <button class="ax-cb pl" data-cadd="${esc(prop)}" title="New color / gradient">${PL}</button>
      <button class="ax-cb exp${open ? ' open' : ''}" data-cx="${esc(prop)}" title="${open ? 'Collapse' : 'Show all colors'}">${CH}</button>
    </div>
    ${open ? `<div class="ax-cgrid">${pl.map((c, i) => swatchBtn(c, prop, i === ai)).join('')}</div>` : ''}
    ${st.cgadd === prop ? `<div class="ax-add" data-mode="${esc(md)}">
      ${prop === 'borderColor' ? '' : `<div class="ax-seg"><button class="ax-b${md === 'solid' ? ' act' : ''}" data-nt="solid">Solid</button><button class="ax-b${md === 'grad' ? ' act' : ''}" data-nt="grad">Gradient</button></div>`}
      <div class="ax-prev" data-prev style="background:${esc(md === 'grad' ? `linear-gradient(135deg, ${ca}, #ffffff)` : ca)}"></div>
      <div class="ax-r">
        <input class="ax-i" data-nc type="color" value="${esc(ca)}">
        <span class="ax-gr">→</span>
        <input class="ax-i ax-gr" data-nc2 type="color" value="#ffffff">
        <input class="ax-i ax-gr" data-ga type="number" value="135" title="Angle (°)">
      </div>
      <input class="ax-i" data-nn type="text" placeholder="Token name (e.g. brand-accent)">
      <button class="ax-b pri" data-ncs="${esc(prop)}">Save Token</button>
    </div>` : ''}
  </div>`;
}
function renderPanel(pan, api) {
  const { st, siblings } = api;
  if (!st.on) return;
  const scrollTop = pan.scrollTop;
  const header = `<div class="ax-hd"><strong>M84 Patch · Properties</strong><button class="ax-b ic" data-act="hidepan" title="Hide panel">${icon('<path d="M6 6l12 12M18 6L6 18"/>')}</button></div>`;

  if (!st.sel || !document.contains(st.sel)) {
    const activeShapes = st.shapes.filter(s => s.active);
    const shapesList = activeShapes.length
      ? `<div class="ax-s" style="text-align:left;border-top:1px solid #27272a"><strong style="font-size:11px;color:#a1a1aa">DRAWN SHAPES (${activeShapes.length})</strong>${activeShapes
          .map(
            (sh, idx) => `<div class="ax-shitem"><span>#${idx + 1} ${esc(sh.kind)}${sh.label ? ' · ' + esc(sh.label) : ''}</span><button class="ax-badge ${esc(sh.role)}" data-shrole="${esc(sh.id)}" title="Toggle Guide / Real">${sh.role === 'real' ? 'Real' : 'Guide'}</button><button class="ax-b ic" data-shrm="${esc(sh.id)}" title="Delete">${icon('<path d="M6 6l12 12M18 6L6 18"/>')}</button></div>`
          )
          .join('')}</div>`
      : '';
    pan.innerHTML =
      header +
      `<div class="ax-empty">
        <svg class="ax-art" viewBox="0 0 160 120" fill="none" aria-hidden="true">
          <rect x="34" y="26" width="92" height="62" rx="10" stroke="#52525b" stroke-width="1.5" stroke-dasharray="4 4"/>
          <rect x="34" y="26" width="92" height="62" rx="10" fill="#27272a" opacity=".55"/>
          <path d="M48 44h44M48 56h28" stroke="#52525b" stroke-width="3" stroke-linecap="round"/>
          <rect x="30" y="22" width="8" height="8" rx="2" fill="#18181b" stroke="#0d99ff" stroke-width="1.5"/>
          <rect x="122" y="22" width="8" height="8" rx="2" fill="#18181b" stroke="#0d99ff" stroke-width="1.5"/>
          <rect x="30" y="84" width="8" height="8" rx="2" fill="#18181b" stroke="#0d99ff" stroke-width="1.5"/>
          <rect x="122" y="84" width="8" height="8" rx="2" fill="#18181b" stroke="#0d99ff" stroke-width="1.5"/>
          <path d="M100 62l24 11-10 3-4 10z" fill="#0d99ff" stroke="#18181b" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        <strong>No element selected</strong>
        Click any element on the page to inspect &amp; tweak.<br><br>
        <kbd>V</kbd> select · <kbd>T</kbd> text · <kbd>C</kbd> pin<br>
        <kbd>Z</kbd> zone · <kbd>S</kbd> shapes · <kbd>P</kbd> preview<br>
        <kbd>Arrows</kbd> nudge · <kbd>Alt+Arrows</kbd> reorder
      </div>` +
      shapesList;
    return;
  }

  const sel = st.sel;
  const cs = getComputedStyle(sel);
  const r = sel.getBoundingClientRect();
  const weight = cs.fontWeight >= 700 ? '700' : cs.fontWeight >= 600 ? '600' : cs.fontWeight >= 500 ? '500' : '400';
  const isFlexGrid = /flex|grid/.test(cs.display);

  // DOM order controls
  const sibs = siblings(sel);
  const sibIdx = sibs.indexOf(sel);
  const parCs = sel.parentElement ? getComputedStyle(sel.parentElement) : null;
  const isHoriz =
    parCs &&
    ((/flex/.test(parCs.display) && /^row/.test(parCs.flexDirection)) ||
      (/grid/.test(parCs.display) && parCs.gridTemplateColumns.split(' ').length > 1));
  const kidCount = [...sel.children].filter(c => !c.closest?.('#apexui-host,[data-apexui]') && !/^(SCRIPT|STYLE|LINK)$/.test(c.tagName)).length;

  const layoutHtml = `
    <div class="ax-g">
      ${field('Width', 'width', Math.round(r.width) + 'px', 'text', true)}
      ${field('Height', 'height', Math.round(r.height) + 'px', 'text', true)}
      ${field('Padding', 'padding', cs.padding)}
      ${field('Margin', 'margin', cs.margin)}
      ${isFlexGrid ? field('Gap', 'gap', cs.gap, 'text', true) : ''}
      ${field('Scale (%)', 'scale', cs.scale === 'none' ? 100 : Math.round(parseFloat(cs.scale) * 100), 'number', true)}
    </div>
    <label class="ax-f" style="flex-direction:row;gap:6px;margin-top:8px;align-items:center">
      <input type="checkbox" data-lock ${st.lock ? 'checked' : ''}>Lock aspect ratio
    </label>
    <div class="ax-mvh"><span>Order in parent</span><span>${sibIdx + 1}/${sibs.length}</span></div>
    <div class="ax-seg">
      <button class="ax-b" data-mv="-1" ${sibIdx < 1 ? 'disabled' : ''} title="Alt+${isHoriz ? '←' : '↑'}">${isHoriz ? '←' : '↑'} Before</button>
      <button class="ax-b" data-mv="1" ${sibIdx >= sibs.length - 1 ? 'disabled' : ''} title="Alt+${isHoriz ? '→' : '↓'}">After ${isHoriz ? '→' : '↓'}</button>
    </div>
    <button class="ax-b ax-wide" data-mvf ${kidCount < 2 ? 'disabled' : ''}>⇄ Reverse ${kidCount} children</button>
  `;

  // Typography
  const ff = cs.fontFamily.replace(/["']/g, '');
  const typoHtml = `
    <label class="ax-f" style="margin-bottom:8px">Font Family
      <select class="ax-i" data-p="fontFamily">
        ${FONTS.map(([n, v]) => `<option value="${esc(v)}" ${ff.startsWith(v.replace(/["']/g, '').split(',')[0]) ? 'selected' : ''}>${esc(n)}</option>`).join('')}
      </select>
    </label>
    <label class="ax-f" style="margin-bottom:8px">Text Style
      <select class="ax-i" data-ts>
        <option value="">Custom</option>
        <option value="h1">Heading H1 · 48</option>
        <option value="h2">Heading H2 · 28</option>
        <option value="h3">Heading H3 · 18</option>
        <option value="body">Body · 16</option>
        <option value="small">Small · 14</option>
        <option value="cap">Caption · 12</option>
      </select>
    </label>
    <div class="ax-g">
      ${field('Size (px)', 'fontSize', parseInt(cs.fontSize, 10) || 16, 'number', true)}
      ${field('Line Height', 'lineHeight', cs.lineHeight === 'normal' ? '1.4' : cs.lineHeight, 'text', true)}
      ${field('Tracking', 'letterSpacing', cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing, 'text', true)}
      <label class="ax-f">Weight
        <select class="ax-i" data-p="fontWeight">
          <option value="400" ${weight === '400' ? 'selected' : ''}>Regular</option>
          <option value="500" ${weight === '500' ? 'selected' : ''}>Medium</option>
          <option value="600" ${weight === '600' ? 'selected' : ''}>Semibold</option>
          <option value="700" ${weight === '700' ? 'selected' : ''}>Bold</option>
        </select>
      </label>
    </div>
    <div class="ax-seg" style="margin:8px 0">
      ${['left', 'center', 'right'].map(a => `<button class="ax-b${cs.textAlign === a ? ' act' : ''}" data-p="textAlign" data-v="${a}">${{ left: 'Left', center: 'Center', right: 'Right' }[a]}</button>`).join('')}
    </div>
    ${renderColorGroup(api, 'color', 'Text Color')}
  `;

  // Fill & Border
  const fillHtml = `
    ${renderColorGroup(api, 'backgroundColor', 'Background Fill')}
    <div class="ax-g" style="margin-top:8px">
      ${field('Radius (px / % / full)', 'borderRadius', cs.borderRadius, 'text', true)}
      ${field('Border (px)', 'borderWidth', parseInt(cs.borderTopWidth, 10) || 0, 'number', true)}
    </div>
    <div class="ax-seg" style="margin:8px 0">
      ${[['0', '0'], ['8px', '8'], ['9999px', 'Full'], ['50%', '50%']].map(([v, l]) => `<button class="ax-b" data-p="borderRadius" data-v="${v}">${l}</button>`).join('')}
    </div>
    ${renderColorGroup(api, 'borderColor', 'Border Color')}
  `;

  // Shapes & Masks
  const curMask = st.masks.get(sel);
  const depth = curMask ? curMask.depth : st.maskDepth;
  const activeShapes = st.shapes.filter(s => s.active);
  const shapesHtml = `
    <div class="ax-f">Section masks (responsive clip-path %)</div>
    <div class="ax-mgrid">
      ${MASK_PRESETS.filter(m => m.group === 'section').map(m => `<button class="ax-mbtn${curMask?.preset === m.id ? ' act' : ''}" data-mask="${esc(m.id)}"><svg viewBox="0 0 28 20">${m.svg}</svg>${esc(m.name)}</button>`).join('')}
    </div>
    <div class="ax-f" style="margin-top:10px">Media / Card masks</div>
    <div class="ax-mgrid">
      ${MASK_PRESETS.filter(m => m.group === 'media').map(m => `<button class="ax-mbtn${curMask?.preset === m.id ? ' act' : ''}" data-mask="${esc(m.id)}"><svg viewBox="0 0 28 20">${m.svg}</svg>${esc(m.name)}</button>`).join('')}
    </div>
    ${curMask ? `<label class="ax-f" style="margin-top:8px">Depth / Curve (${depth}%)<input class="ax-i" type="range" min="2" max="40" value="${depth}" data-mdepth></label><button class="ax-b ax-wide" data-mask-clear>Remove Mask</button>` : ''}
    ${activeShapes.length ? `<div class="ax-mvh" style="margin-top:12px"><span>Drawn shapes (${activeShapes.length})</span><span>Guide / Real</span></div>${activeShapes.map((sh, i) => `<div class="ax-shitem"><span>#${i + 1} ${esc(sh.kind)}${sh.label ? ' · ' + esc(sh.label) : ''}</span><button class="ax-badge ${esc(sh.role)}" data-shrole="${esc(sh.id)}" title="Toggle Guide / Real">${sh.role === 'real' ? 'Real' : 'Guide'}</button><button class="ax-b ic" data-shrm="${esc(sh.id)}" title="Delete">${icon('<path d="M6 6l12 12M18 6L6 18"/>')}</button></div>`).join('')}` : ''}
  `;

  // Effects
  const hasSh = cs.boxShadow !== 'none';
  const bl = parseFloat((cs.filter.match(/blur\(([\d.]+)/) || [0, 0])[1]);
  const bb = parseFloat(((cs.backdropFilter || '').match(/blur\(([\d.]+)/) || [0, 0])[1]);
  const nz = /feTurbulence/.test(sel.style.backgroundImage);
  const sd = parseShadow(cs.boxShadow);
  const sws = `<div class="ax-sw">${readRootTokens().map(([k, v]) => `<button title="${esc(k)}" data-ssw="${esc(normalizeColor(v))}" style="background:${esc(v)}"></button>`).join('')}</div>`;
  const fxCard = (title, key, body) =>
    `<div class="ax-fx"><div class="ax-row"><strong>${esc(title)}</strong><button class="ax-b ic" data-rm="${esc(key)}" title="Remove">${icon('<path d="M5 12h14"/>')}</button></div>${body}</div>`;

  const effectsHtml = `
    <div class="ax-row">
      <span style="color:#a1a1aa;font-size:11px">Add effect</span>
      <select class="ax-i" style="width:auto" data-addfx>
        <option value="">+ Add</option>
        ${hasSh ? '' : '<option value="sh">Drop Shadow</option>'}
        ${bl ? '' : '<option value="bl">Layer Blur</option>'}
        ${bb ? '' : '<option value="bb">Backdrop Blur</option>'}
        ${nz ? '' : '<option value="nz">SVG Noise</option>'}
      </select>
    </div>
    ${hasSh ? fxCard('Drop Shadow', 'sh', `<div class="ax-g3" style="margin-top:6px">${['x', 'y', 'b', 's'].map((k, n) => `<label class="ax-f">${['X', 'Y', 'Blur', 'Spread'][n]}<input class="ax-i ax-scrub" data-sh="${k}" type="number" value="${sd[k]}"></label>`).join('')}</div><div class="ax-g" style="margin-top:8px"><label class="ax-f">Color<input class="ax-i" data-sh="c" type="color" value="${esc(sd.c)}"></label><label class="ax-f">Opacity<input class="ax-i" data-sh="o" type="range" min="0" max="1" step=".05" value="${sd.o}"></label></div>${sws}`) : ''}
    ${bl ? fxCard('Layer Blur', 'bl', `<label class="ax-f" style="margin-top:6px">Blur (px)<input class="ax-i ax-scrub" data-fx="filter" type="number" min="0" value="${bl}"></label>`) : ''}
    ${bb ? fxCard('Backdrop Blur', 'bb', `<label class="ax-f" style="margin-top:6px">Blur (px)<input class="ax-i ax-scrub" data-fx="backdropFilter" type="number" min="0" value="${bb}"></label>`) : ''}
    ${nz ? fxCard('SVG Noise', 'nz', '<span style="color:#a1a1aa;font-size:11px">Subtle SVG grain overlay.</span>') : ''}
  `;

  // Code { }
  const codeEntry = st.codeBlocks.get(sel) || { css: '', js: '' };
  const codeHtml = `
    <label class="ax-f">Live Scoped CSS
      <textarea class="ax-i" data-code-css rows="4" placeholder="transition: transform .2s ease;\n&:hover { transform: translateY(-2px); }">${esc(codeEntry.css)}</textarea>
    </label>
    <label class="ax-f" style="margin-top:8px">JS / Animation Spec (exported, zero eval)
      <textarea class="ax-i" data-code-js rows="3" placeholder="e.g. Stagger fade-up on viewport enter (respect prefers-reduced-motion)">${esc(codeEntry.js)}</textarea>
    </label>
    <div class="ax-row" style="margin-top:8px">
      <button class="ax-b" data-code-clear>Clear</button>
      <button class="ax-b pri" data-code-save>Apply &amp; Include</button>
    </div>
  `;

  // Layer
  const layerHtml = `
    <label class="ax-f">Opacity
      <input class="ax-i" data-p="opacity" type="range" min="0" max="1" step=".05" value="${esc(cs.opacity)}">
    </label>
    <button class="ax-b ax-wide" data-act="hide">${sel.style.display === 'none' ? 'Show' : 'Hide'} element</button>
  `;

  pan.innerHTML =
    header +
    `<div class="ax-s">
      <div class="ax-sel">${esc(getUniqueSelector(sel))}</div>
      <div class="ax-nav">
        <button class="ax-b" data-nav="up" title="Parent">↑ Parent</button>
        <button class="ax-b" data-nav="down" title="Child">↓ Child</button>
        <button class="ax-b" data-nav="prev" title="Previous">←</button>
        <button class="ax-b" data-nav="next" title="Next">→</button>
      </div>
    </div>` +
    renderAccordion(st, 'Layout', layoutHtml) +
    renderAccordion(st, 'Typography', typoHtml) +
    renderAccordion(st, 'Fill & Border', fillHtml) +
    renderAccordion(st, 'Shapes & Masks', shapesHtml) +
    renderAccordion(st, 'Effects', effectsHtml) +
    renderAccordion(st, 'Code { }', codeHtml) +
    renderAccordion(st, 'Layer', layerHtml);

  pan.scrollTop = scrollTop;
}

// === src/app.js ===
function bootApexUI() {
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

const start = () => { bootApexUI(); window.__apexuiToggle?.(true); };
if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
