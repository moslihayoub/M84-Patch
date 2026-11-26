export const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E")`;

export const FONTS = [
  ['Inter', 'Inter, Arial, sans-serif'],
  ['Noto Sans Arabic', "'Noto Sans Arabic', sans-serif"],
  ['Noto Sans Tifinagh', "'Noto Sans Tifinagh', sans-serif"],
  ['Georgia (serif)', 'Georgia, serif'],
  ['Mono', 'ui-monospace, SFMono-Regular, Menlo, monospace'],
  ['System UI', 'system-ui, -apple-system, sans-serif']
];

export const TEXT_STYLES = {
  h1: ['48px', '700', '1.15', '-0.02em'],
  h2: ['28px', '700', '1.2', '-0.015em'],
  h3: ['18px', '600', '1.3', '0'],
  body: ['16px', '400', '1.5', '0'],
  small: ['14px', '400', '1.5', '0'],
  cap: ['12px', '500', '1.4', '0.02em']
};

export const MASK_PRESETS = [
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

export const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const icon = d =>
  `<svg class="ax-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

export const isApexNode = el =>
  !el || el === document.body || el === document.documentElement || el.id === 'apexui-host' || !!el.closest?.('#apexui-host,[data-apexui]');

export const getUniqueSelector = el => {
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

export const readRootTokens = () => {
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

export const rgbToHex = c => {
  const m = (c || '').match(/[\d.]+/g);
  if (!m || m.length < 3 || (m[3] !== undefined && +m[3] === 0)) return '#ffffff';
  return '#' + m.slice(0, 3).map(x => Math.round(+x).toString(16).padStart(2, '0')).join('');
};

export const normalizeColor = v => {
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

export const parseShadow = z => {
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

export const getUnionRect = nodes => {
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

export const slugify = s =>
  String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
