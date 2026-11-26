import { getUniqueSelector, readRootTokens, normalizeColor, isApexNode } from './utils.js';

const SKIP_TAGS = /^(SCRIPT|STYLE|LINK)$/;

const SAFE_COLOR_NAME = /^--[a-z0-9-]+$/i;
const SAFE_COLOR_VAL = /^(#[0-9a-f]{3,8}|rgba?\([^;{}<>]+\)|hsla?\([^;{}<>]+\)|linear-gradient\([^;{}<>]+\))$/i;

export function createState() {
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
