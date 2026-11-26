import {
  esc,
  icon,
  getUniqueSelector,
  readRootTokens,
  rgbToHex,
  normalizeColor,
  parseShadow,
  FONTS,
  MASK_PRESETS
} from './utils.js';

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

export function renderPanel(pan, api) {
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
