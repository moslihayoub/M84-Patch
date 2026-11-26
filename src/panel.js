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
  Disposition: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  Typographie: '<path d="M5 7V5h14v2M12 5v14M9 19h6"/>',
  'Fond & bordure': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 15l5-5 4 4 3-3 6 6"/>',
  'Formes & masques': '<path d="M4 6h16v8c-4 4-12 4-16 0z"/><circle cx="18" cy="18" r="3"/>',
  Effets: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4"/>',
  'Code { }': '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16"/>',
  Calque: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'
};

const CH = icon('<path d="M6 9l6 6 6-6"/>');
const PL = icon('<path d="M12 5v14M5 12h14"/>');

const field = (label, prop, val, type = 'text', scrub = false) =>
  `<label class="ax-f">${esc(label)}<input class="ax-i${scrub ? ' ax-scrub' : ''}" data-p="${esc(prop)}" type="${esc(type)}" value="${esc(val)}"></label>`;

const swatchBtn = (c, prop, active) =>
  `<button class="ax-c${active ? ' act' : ''}${c.c ? ' cu' : ''}" title="${esc(c.n)} : ${esc(c.v)}${c.c ? ' (clic droit : supprimer)' : ''}" data-sp="${esc(prop)}" data-sv="${esc(c.v)}" data-st="${esc(c.n)}"${c.g ? ' data-g="1"' : ''} style="background:${esc(c.v)}"></button>`;

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
    ? (gn ? gn + ' · ' : '') + 'Dégradé'
    : isTr
      ? 'Transparent'
      : (ai >= 0 ? pl[ai].n + ' · ' : '') + cur;
  const bgStyle = isGrad ? bi : cur;
  const ca = cur || '#3b82f6';
  const md = prop === 'borderColor' ? 'solid' : st.gmode;

  return `<div class="ax-cg">
    <div class="ax-ch"><span>${esc(label)}</span><em>${esc(nameLabel)}</em></div>
    <div class="ax-cr">
      <label class="ax-cur${isTr ? ' tr' : ''}" title="Couleur active : cliquer pour modifier"${bgStyle ? ` style="background:${esc(bgStyle)}"` : ''}>
        <input type="color" data-p="${esc(prop)}" value="${esc(cur || '#ffffff')}">
      </label>
      <div class="ax-chips">
        ${isBg ? `<button class="ax-c ax-none${isTr ? ' act' : ''}" title="Transparent" data-sp="${esc(prop)}" data-sv="transparent" data-st=""></button>` : ''}
        ${(open ? [] : rest.slice(0, isBg ? 3 : 4)).map(c => swatchBtn(c, prop, false)).join('')}
      </div>
      <button class="ax-cb pl" data-cadd="${esc(prop)}" title="Nouvelle couleur / dégradé">${PL}</button>
      <button class="ax-cb exp${open ? ' open' : ''}" data-cx="${esc(prop)}" title="${open ? 'Réduire' : 'Toutes les couleurs'}">${CH}</button>
    </div>
    ${open ? `<div class="ax-cgrid">${pl.map((c, i) => swatchBtn(c, prop, i === ai)).join('')}</div>` : ''}
    ${st.cgadd === prop ? `<div class="ax-add" data-mode="${esc(md)}">
      ${prop === 'borderColor' ? '' : `<div class="ax-seg"><button class="ax-b${md === 'solid' ? ' act' : ''}" data-nt="solid">Unie</button><button class="ax-b${md === 'grad' ? ' act' : ''}" data-nt="grad">Dégradé</button></div>`}
      <div class="ax-prev" data-prev style="background:${esc(md === 'grad' ? `linear-gradient(135deg, ${ca}, #ffffff)` : ca)}"></div>
      <div class="ax-r">
        <input class="ax-i" data-nc type="color" value="${esc(ca)}">
        <span class="ax-gr">→</span>
        <input class="ax-i ax-gr" data-nc2 type="color" value="#ffffff">
        <input class="ax-i ax-gr" data-ga type="number" value="135" title="Angle (°)">
      </div>
      <input class="ax-i" data-nn type="text" placeholder="Nom token (ex. bleu-accent)">
      <button class="ax-b pri" data-ncs="${esc(prop)}">Enregistrer</button>
    </div>` : ''}
  </div>`;
}

export function renderPanel(pan, api) {
  const { st, siblings } = api;
  if (!st.on) return;
  const scrollTop = pan.scrollTop;
  const header = `<div class="ax-hd"><strong>M84 Patch · Propriétés</strong><button class="ax-b ic" data-act="hidepan" title="Masquer le panneau">${icon('<path d="M6 6l12 12M18 6L6 18"/>')}</button></div>`;

  if (!st.sel || !document.contains(st.sel)) {
    const activeShapes = st.shapes.filter(s => s.active);
    const shapesList = activeShapes.length
      ? `<div class="ax-s" style="text-align:left;border-top:1px solid #27272a"><strong style="font-size:11px;color:#a1a1aa">FORMES SUR LA PAGE (${activeShapes.length})</strong>${activeShapes
          .map(
            (sh, idx) => `<div class="ax-shitem"><span>#${idx + 1} ${esc(sh.kind)}${sh.label ? ' · ' + esc(sh.label) : ''}</span><button class="ax-badge ${esc(sh.role)}" data-shrole="${esc(sh.id)}" title="Basculer Guide / Réel">${sh.role === 'real' ? 'Réel' : 'Guide'}</button><button class="ax-b ic" data-shrm="${esc(sh.id)}" title="Supprimer">${icon('<path d="M6 6l12 12M18 6L6 18"/>')}</button></div>`
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
        <strong>Aucun élément sélectionné</strong>
        Cliquez un élément pour l’éditer.<br><br>
        <kbd>V</kbd> sélection · <kbd>T</kbd> texte · <kbd>C</kbd> note<br>
        <kbd>Z</kbd> zone · <kbd>S</kbd> formes · <kbd>P</kbd> aperçu<br>
        <kbd>Flèches</kbd> déplacer · <kbd>Alt+Flèches</kbd> ordre
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
      ${field('Largeur', 'width', Math.round(r.width) + 'px', 'text', true)}
      ${field('Hauteur', 'height', Math.round(r.height) + 'px', 'text', true)}
      ${field('Padding', 'padding', cs.padding)}
      ${field('Marge', 'margin', cs.margin)}
      ${isFlexGrid ? field('Espacement', 'gap', cs.gap, 'text', true) : ''}
      ${field('Échelle (%)', 'scale', cs.scale === 'none' ? 100 : Math.round(parseFloat(cs.scale) * 100), 'number', true)}
    </div>
    <label class="ax-f" style="flex-direction:row;gap:6px;margin-top:8px;align-items:center">
      <input type="checkbox" data-lock ${st.lock ? 'checked' : ''}>Proportions verrouillées
    </label>
    <div class="ax-mvh"><span>Ordre dans le parent</span><span>${sibIdx + 1}/${sibs.length}</span></div>
    <div class="ax-seg">
      <button class="ax-b" data-mv="-1" ${sibIdx < 1 ? 'disabled' : ''} title="Alt+${isHoriz ? '←' : '↑'}">${isHoriz ? '←' : '↑'} Avant</button>
      <button class="ax-b" data-mv="1" ${sibIdx >= sibs.length - 1 ? 'disabled' : ''} title="Alt+${isHoriz ? '→' : '↓'}">Après ${isHoriz ? '→' : '↓'}</button>
    </div>
    <button class="ax-b ax-wide" data-mvf ${kidCount < 2 ? 'disabled' : ''}>⇄ Inverser les ${kidCount} enfants</button>
  `;

  // Typography
  const ff = cs.fontFamily.replace(/["']/g, '');
  const typoHtml = `
    <label class="ax-f" style="margin-bottom:8px">Police
      <select class="ax-i" data-p="fontFamily">
        ${FONTS.map(([n, v]) => `<option value="${esc(v)}" ${ff.startsWith(v.replace(/["']/g, '').split(',')[0]) ? 'selected' : ''}>${esc(n)}</option>`).join('')}
      </select>
    </label>
    <label class="ax-f" style="margin-bottom:8px">Style de texte
      <select class="ax-i" data-ts>
        <option value="">Personnalisé</option>
        <option value="h1">Titre H1 · 48</option>
        <option value="h2">Titre H2 · 28</option>
        <option value="h3">Titre H3 · 18</option>
        <option value="body">Corps · 16</option>
        <option value="small">Petit · 14</option>
        <option value="cap">Légende · 12</option>
      </select>
    </label>
    <div class="ax-g">
      ${field('Taille (px)', 'fontSize', parseInt(cs.fontSize, 10) || 16, 'number', true)}
      ${field('Interligne', 'lineHeight', cs.lineHeight === 'normal' ? '1.4' : cs.lineHeight, 'text', true)}
      ${field('Lettres', 'letterSpacing', cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing, 'text', true)}
      <label class="ax-f">Graisse
        <select class="ax-i" data-p="fontWeight">
          <option value="400" ${weight === '400' ? 'selected' : ''}>Regular</option>
          <option value="500" ${weight === '500' ? 'selected' : ''}>Medium</option>
          <option value="600" ${weight === '600' ? 'selected' : ''}>Semibold</option>
          <option value="700" ${weight === '700' ? 'selected' : ''}>Bold</option>
        </select>
      </label>
    </div>
    <div class="ax-seg" style="margin:8px 0">
      ${['left', 'center', 'right'].map(a => `<button class="ax-b${cs.textAlign === a ? ' act' : ''}" data-p="textAlign" data-v="${a}">${{ left: 'Gauche', center: 'Centre', right: 'Droite' }[a]}</button>`).join('')}
    </div>
    ${renderColorGroup(api, 'color', 'Couleur du texte')}
  `;

  // Fill & Border
  const fillHtml = `
    ${renderColorGroup(api, 'backgroundColor', 'Fond')}
    <div class="ax-g" style="margin-top:8px">
      ${field('Rayon (px / % / full)', 'borderRadius', cs.borderRadius, 'text', true)}
      ${field('Bordure (px)', 'borderWidth', parseInt(cs.borderTopWidth, 10) || 0, 'number', true)}
    </div>
    <div class="ax-seg" style="margin:8px 0">
      ${[['0', '0'], ['8px', '8'], ['9999px', 'Full'], ['50%', '50%']].map(([v, l]) => `<button class="ax-b" data-p="borderRadius" data-v="${v}">${l}</button>`).join('')}
    </div>
    ${renderColorGroup(api, 'borderColor', 'Couleur bordure')}
  `;

  // Shapes & Masks
  const curMask = st.masks.get(sel);
  const depth = curMask ? curMask.depth : st.maskDepth;
  const activeShapes = st.shapes.filter(s => s.active);
  const shapesHtml = `
    <div class="ax-f">Masques de section (clip-path %)</div>
    <div class="ax-mgrid">
      ${MASK_PRESETS.filter(m => m.group === 'section').map(m => `<button class="ax-mbtn${curMask?.preset === m.id ? ' act' : ''}" data-mask="${esc(m.id)}"><svg viewBox="0 0 28 20">${m.svg}</svg>${esc(m.name)}</button>`).join('')}
    </div>
    <div class="ax-f" style="margin-top:10px">Masques image / carte</div>
    <div class="ax-mgrid">
      ${MASK_PRESETS.filter(m => m.group === 'media').map(m => `<button class="ax-mbtn${curMask?.preset === m.id ? ' act' : ''}" data-mask="${esc(m.id)}"><svg viewBox="0 0 28 20">${m.svg}</svg>${esc(m.name)}</button>`).join('')}
    </div>
    ${curMask ? `<label class="ax-f" style="margin-top:8px">Intensité / Courbure (${depth}%)<input class="ax-i" type="range" min="2" max="40" value="${depth}" data-mdepth></label><button class="ax-b ax-wide" data-mask-clear>Retirer le masque</button>` : ''}
    ${activeShapes.length ? `<div class="ax-mvh" style="margin-top:12px"><span>Formes dessinées (${activeShapes.length})</span><span>Guide / Réel</span></div>${activeShapes.map((sh, i) => `<div class="ax-shitem"><span>#${i + 1} ${esc(sh.kind)}${sh.label ? ' · ' + esc(sh.label) : ''}</span><button class="ax-badge ${esc(sh.role)}" data-shrole="${esc(sh.id)}" title="Basculer Guide / Réel">${sh.role === 'real' ? 'Réel' : 'Guide'}</button><button class="ax-b ic" data-shrm="${esc(sh.id)}" title="Supprimer">${icon('<path d="M6 6l12 12M18 6L6 18"/>')}</button></div>`).join('')}` : ''}
  `;

  // Effects
  const hasSh = cs.boxShadow !== 'none';
  const bl = parseFloat((cs.filter.match(/blur\(([\d.]+)/) || [0, 0])[1]);
  const bb = parseFloat(((cs.backdropFilter || '').match(/blur\(([\d.]+)/) || [0, 0])[1]);
  const nz = /feTurbulence/.test(sel.style.backgroundImage);
  const sd = parseShadow(cs.boxShadow);
  const sws = `<div class="ax-sw">${readRootTokens().map(([k, v]) => `<button title="${esc(k)}" data-ssw="${esc(normalizeColor(v))}" style="background:${esc(v)}"></button>`).join('')}</div>`;
  const fxCard = (title, key, body) =>
    `<div class="ax-fx"><div class="ax-row"><strong>${esc(title)}</strong><button class="ax-b ic" data-rm="${esc(key)}" title="Supprimer">${icon('<path d="M5 12h14"/>')}</button></div>${body}</div>`;

  const effectsHtml = `
    <div class="ax-row">
      <span style="color:#a1a1aa;font-size:11px">Ajouter un effet</span>
      <select class="ax-i" style="width:auto" data-addfx>
        <option value="">+ Ajouter</option>
        ${hasSh ? '' : '<option value="sh">Ombre portée</option>'}
        ${bl ? '' : '<option value="bl">Flou du calque</option>'}
        ${bb ? '' : '<option value="bb">Flou d’arrière-plan</option>'}
        ${nz ? '' : '<option value="nz">Bruit (noise)</option>'}
      </select>
    </div>
    ${hasSh ? fxCard('Ombre portée', 'sh', `<div class="ax-g3" style="margin-top:6px">${['x', 'y', 'b', 's'].map((k, n) => `<label class="ax-f">${['X', 'Y', 'Flou', 'Étal.'][n]}<input class="ax-i ax-scrub" data-sh="${k}" type="number" value="${sd[k]}"></label>`).join('')}</div><div class="ax-g" style="margin-top:8px"><label class="ax-f">Couleur<input class="ax-i" data-sh="c" type="color" value="${esc(sd.c)}"></label><label class="ax-f">Opacité<input class="ax-i" data-sh="o" type="range" min="0" max="1" step=".05" value="${sd.o}"></label></div>${sws}`) : ''}
    ${bl ? fxCard('Flou du calque', 'bl', `<label class="ax-f" style="margin-top:6px">Flou (px)<input class="ax-i ax-scrub" data-fx="filter" type="number" min="0" value="${bl}"></label>`) : ''}
    ${bb ? fxCard('Flou d’arrière-plan', 'bb', `<label class="ax-f" style="margin-top:6px">Flou (px)<input class="ax-i ax-scrub" data-fx="backdropFilter" type="number" min="0" value="${bb}"></label>`) : ''}
    ${nz ? fxCard('Bruit (noise)', 'nz', '<span style="color:#a1a1aa;font-size:11px">Grain SVG superposé au fond.</span>') : ''}
  `;

  // Code { }
  const codeEntry = st.codeBlocks.get(sel) || { css: '', js: '' };
  const codeHtml = `
    <label class="ax-f">CSS live (scopé à l’élément)
      <textarea class="ax-i" data-code-css rows="4" placeholder="transition: transform .2s ease;\n&:hover { transform: translateY(-2px); }">${esc(codeEntry.css)}</textarea>
    </label>
    <label class="ax-f" style="margin-top:8px">Spec JS / Animation (exportée, sans eval)
      <textarea class="ax-i" data-code-js rows="3" placeholder="Ex. : Stagger fade-up à l’entrée viewport (respecter prefers-reduced-motion)">${esc(codeEntry.js)}</textarea>
    </label>
    <div class="ax-row" style="margin-top:8px">
      <button class="ax-b" data-code-clear>Effacer</button>
      <button class="ax-b pri" data-code-save>Appliquer &amp; inclure</button>
    </div>
  `;

  // Layer
  const layerHtml = `
    <label class="ax-f">Opacité
      <input class="ax-i" data-p="opacity" type="range" min="0" max="1" step=".05" value="${esc(cs.opacity)}">
    </label>
    <button class="ax-b ax-wide" data-act="hide">${sel.style.display === 'none' ? 'Afficher' : 'Masquer'} l’élément</button>
  `;

  pan.innerHTML =
    header +
    `<div class="ax-s">
      <div class="ax-sel">${esc(getUniqueSelector(sel))}</div>
      <div class="ax-nav">
        <button class="ax-b" data-nav="up" title="Parent">↑ Parent</button>
        <button class="ax-b" data-nav="down" title="Enfant">↓ Enfant</button>
        <button class="ax-b" data-nav="prev" title="Précédent">←</button>
        <button class="ax-b" data-nav="next" title="Suivant">→</button>
      </div>
    </div>` +
    renderAccordion(st, 'Disposition', layoutHtml) +
    renderAccordion(st, 'Typographie', typoHtml) +
    renderAccordion(st, 'Fond & bordure', fillHtml) +
    renderAccordion(st, 'Formes & masques', shapesHtml) +
    renderAccordion(st, 'Effets', effectsHtml) +
    renderAccordion(st, 'Code { }', codeHtml) +
    renderAccordion(st, 'Calque', layerHtml);

  pan.scrollTop = scrollTop;
}
