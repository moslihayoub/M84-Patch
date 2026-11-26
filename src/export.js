import { getUniqueSelector } from './utils.js';

export function generatePatchPrompt(st, freeNote = '') {
  const title = document.title || location.pathname || 'Page UI';
  const out = [
    `# Patch visuel UI — ${title}`,
    '',
    'Important : ces modifications sont des indications visuelles (déplacements, tailles, espacements, masques, guides) qui expriment mon intention, pas des valeurs à copier en pixels ni en `style=""` inline. Applique-les proprement dans le code source (CSS / Tailwind / tokens `:root` / composants) en respectant : specs du projet, design system, grille de 8 px, responsive mobile-first et WCAG 2.1 AA. Unifie les styles : si une typographie, couleur, rayon, ombre ou espacement change sur un élément, étends le changement à tous les éléments de même rôle via le token ou la classe partagée plutôt que de créer des exceptions.',
    ''
  ];

  const note = freeNote.trim();
  if (note) {
    out.push('## Intention', note, '');
  }

  if (st.styleDiffs.size) {
    const lines = [];
    st.styleDiffs.forEach((ps, el) => {
      const entries = Object.entries(ps);
      if (!entries.length) return;
      lines.push(`- \`${getUniqueSelector(el)}\``);
      entries.forEach(([prop, diff]) => {
        const cssProp = prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
        lines.push(`  - ${cssProp} : ${diff.b} → ${diff.a}`);
      });
    });
    if (lines.length) out.push('## Styles', ...lines, '');
  }

  if (st.textDiffs.size) {
    out.push('## Textes');
    st.textDiffs.forEach((diff, el) => {
      out.push(`- \`${getUniqueSelector(el)}\` : « ${diff.b} » → « ${diff.a} »`);
    });
    out.push('');
  }

  const activeMoves = st.domMoves.filter(m => m.active);
  if (activeMoves.length) {
    out.push('## Ordre des éléments (déplacements)');
    activeMoves.forEach(m => out.push('- ' + m.desc));
    out.push('');
  }

  if (st.customColors.length) {
    out.push('## Nouvelles couleurs / dégradés (à déclarer comme tokens :root)');
    st.customColors.forEach(c => out.push(`- \`${c.n}\` : ${c.v}`));
    out.push('');
  }

  const activeShapes = st.shapes.filter(s => s.active);
  if (st.masks.size || activeShapes.length) {
    out.push('## Formes & masques (Guide / Réel)');
    st.masks.forEach((m, el) => {
      out.push(`- [Réel · Masque ${m.name}] sur \`${getUniqueSelector(el)}\` : \`clip-path: ${m.clipPath}\` (adapter en responsive)`);
    });
    activeShapes.forEach((sh, idx) => {
      const roleTag = sh.role === 'real' ? 'Réel' : 'Guide';
      const target = sh.sel ? ` sur \`${sh.sel}\`` : '';
      const dims = `${Math.round(sh.rw)}×${Math.round(sh.rh)}px`;
      const desc = sh.label ? ` — ${sh.label}` : '';
      out.push(`- #${idx + 1} [${roleTag} · ${sh.kind}]${target} (${dims})${desc}`);
    });
    out.push('');
  }

  if (st.codeBlocks.size) {
    out.push('## Snippets Code { } (respecter les tokens :root et prefers-reduced-motion)');
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
    out.push('## Annotations (ancrées à l’élément / zones)');
    let imgIdx = 0;
    activePins.forEach((p, i) => {
      const imgRefs = p.imgs.map(() => ` [image jointe n°${++imgIdx}]`).join('');
      const target = p.group ? `la zone (${p.group.length} éléments) \`${p.s}\`` : `\`${p.s}\``;
      out.push(`- #${i + 1} sur ${target} : ${p.n}${imgRefs}`);
    });
    out.push('');
  }

  return out.join('\n').trim();
}
