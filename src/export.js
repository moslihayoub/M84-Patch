import { getUniqueSelector } from './utils.js';

export function generatePatchPrompt(st, freeNote = '') {
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
