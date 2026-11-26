import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve(import.meta.dirname);
const DIST_EXT = path.join(ROOT, 'dist', 'chrome-extension');
const DIST_SKILL = path.join(ROOT, 'dist', 'claude-skill');
const SKILLS_PARENT = path.join(os.homedir(), '.gemini', 'config', 'skills');
const GLOBAL_SKILL = fs.existsSync(SKILLS_PARENT) ? path.join(SKILLS_PARENT, 'm84-patch') : null;
const DEMO_DIR = path.join(ROOT, 'demo');

const MODULE_ORDER = [
  'src/styles.js',
  'src/utils.js',
  'src/state.js',
  'src/export.js',
  'src/panel.js',
  'src/app.js'
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function bundleModules({ autoOpen = false } = {}) {
  const parts = MODULE_ORDER.map(rel => {
    const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // Strip ES import/export statements cleanly
    const cleaned = raw
      .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
      .replace(/^\s*export\s+(default\s+)?/gm, '');
    return `// === ${rel} ===\n${cleaned.trim()}\n`;
  });

  const bootCall = autoOpen
    ? `const start = () => { bootApexUI(); window.__apexuiToggle?.(true); };`
    : `const start = () => { bootApexUI(); };`;

  return `(() => {\n${parts.join('\n')}\n${bootCall}\nif (document.body) start(); else document.addEventListener('DOMContentLoaded', start);\n})();\n`;
}

// Pure Node PNG generator (dark rounded-like tile with bright cyan/blue "A" mark)
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crcBuf]);
}

function createIconPng(size) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  const r = size * 0.22;
  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < size; x++) {
      const idx = rowStart + 1 + x * 4;
      // Rounded square mask
      const dx = Math.max(r - x, 0, x - (size - 1 - r));
      const dy = Math.max(r - y, 0, y - (size - 1 - r));
      const inside = dx * dx + dy * dy <= r * r;
      if (!inside) {
        raw[idx] = raw[idx + 1] = raw[idx + 2] = raw[idx + 3] = 0;
        continue;
      }
      // Draw geometric M84 Patch chevron/A glyph in #0d99ff + #7dd3fc accent
      const nx = x / size;
      const ny = y / size;
      const leftLeg = Math.abs(nx - (0.5 - (ny - 0.2) * 0.45)) < 0.095 && ny > 0.2 && ny < 0.82;
      const rightLeg = Math.abs(nx - (0.5 + (ny - 0.2) * 0.45)) < 0.095 && ny > 0.2 && ny < 0.82;
      const cross = Math.abs(ny - 0.62) < 0.065 && nx > 0.32 && nx < 0.68;
      if (leftLeg || rightLeg || cross) {
        raw[idx] = 13;
        raw[idx + 1] = 153;
        raw[idx + 2] = 255;
        raw[idx + 3] = 255;
      } else {
        raw[idx] = 24;
        raw[idx + 1] = 24;
        raw[idx + 2] = 27;
        raw[idx + 3] = 255;
      }
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', zlib.deflateSync(raw)),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
}

function buildDemoHtml(scriptBlock) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>M84 Patch — Interactive Visual Playground</title>
  <style>
    :root {
      --bg-page: #f8fafc;
      --bg-surface: #ffffff;
      --bg-dark: #0b1120;
      --brand-900: #0f172a;
      --brand-600: #0d99ff;
      --brand-500: #38bdf8;
      --accent-500: #10b981;
      --warn-500: #f59e0b;
      --purple-500: #8b5cf6;
      --text-main: #0f172a;
      --text-muted: #475569;
      --border-soft: #e2e8f0;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, system-ui, -apple-system, sans-serif; background: var(--bg-page); color: var(--text-main); line-height: 1.55; }
    a { color: inherit; text-decoration: none; }
    .container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
    .topbar { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-soft); }
    .topbar-inner { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 16px; }
    .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 16px; letter-spacing: -0.02em; }
    .logo-mark { width: 32px; height: 32px; border-radius: 9px; background: var(--brand-900); color: var(--brand-600); display: grid; place-items: center; font-weight: 800; font-size: 13px; }
    nav { display: flex; gap: 24px; font-size: 14px; font-weight: 500; color: var(--text-muted); }
    nav a:hover { color: var(--brand-900); }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; border: 0; cursor: pointer; transition: transform .15s, background .15s; }
    .btn-primary { background: var(--brand-600); color: #fff; }
    .btn-primary:hover { background: #0284c7; transform: translateY(-1px); }
    .btn-ghost { background: transparent; border: 1px solid var(--border-soft); color: var(--brand-900); }
    .btn-ghost:hover { background: #f1f5f9; }
    .hero { background: radial-gradient(circle at 20% 20%, #1e293b, var(--bg-dark) 70%); color: #fff; padding: 80px 0 92px; }
    .hero-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center; }
    .pill { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px; background: rgba(13,153,255,.15); color: #7dd3fc; font-size: 12px; font-weight: 600; margin-bottom: 18px; border: 1px solid rgba(13,153,255,.3); }
    .hero h1 { font-size: 46px; line-height: 1.1; margin: 0 0 16px; letter-spacing: -0.03em; }
    .hero p { font-size: 17px; color: #cbd5e1; margin: 0 0 28px; max-width: 540px; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 18px; padding: 24px; backdrop-filter: blur(8px); }
    .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 16px; }
    .kpi { background: rgba(15,23,42,.7); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 14px; }
    .kpi strong { display: block; font-size: 24px; color: #fff; }
    .kpi span { font-size: 12px; color: #94a3b8; }
    .section { padding: 68px 0; }
    .section-head { max-width: 640px; margin-bottom: 36px; }
    .section-head h2 { font-size: 30px; margin: 0 0 10px; letter-spacing: -0.02em; }
    .section-head p { margin: 0; color: var(--text-muted); font-size: 16px; }
    .bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .card { background: var(--bg-surface); border: 1px solid var(--border-soft); border-radius: 16px; padding: 24px; box-shadow: 0 6px 20px rgba(15,23,42,.04); display: flex; flex-direction: column; gap: 12px; }
    .media { height: 148px; border-radius: 12px; display: flex; align-items: flex-end; padding: 14px; color: #fff; font-weight: 700; font-size: 13px; }
    .m-blue { background: linear-gradient(135deg, var(--brand-600), var(--purple-500)); }
    .m-green { background: linear-gradient(135deg, var(--accent-500), var(--brand-600)); }
    .m-amber { background: linear-gradient(135deg, var(--warn-500), #ef4444); }
    .card h3 { margin: 0; font-size: 18px; }
    .card p { margin: 0; color: var(--text-muted); font-size: 14px; }
    .pricing { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .plan { background: var(--bg-surface); border: 1px solid var(--border-soft); border-radius: 18px; padding: 28px; }
    .plan.featured { border: 2px solid var(--brand-600); box-shadow: 0 14px 36px rgba(13,153,255,.12); }
    .price { font-size: 36px; font-weight: 800; margin: 12px 0; }
    .checklist { list-style: none; padding: 0; margin: 16px 0 24px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: var(--text-muted); }
    footer { border-top: 1px solid var(--border-soft); padding: 32px 0; color: var(--text-muted); font-size: 13px; }
    .foot-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    @media (max-width: 860px) { .hero-grid, .bento, .pricing { grid-template-columns: 1fr; } .hero h1 { font-size: 34px; } }
  </style>
</head>
<body>
  <header class="topbar" id="demo-header">
    <div class="container topbar-inner">
      <a class="logo" href="../docs/index.html">
        <span class="logo-mark">M84</span>
        <span>M84 Patch Playground</span>
      </a>
      <nav>
        <a href="#features">Components</a>
        <a href="#pricing">Cards &amp; Order</a>
        <a href="../docs/index.html">Landing Page</a>
      </nav>
      <button class="btn btn-primary" id="demo-cta-top" onclick="window.__apexuiToggle && window.__apexuiToggle(true)">Open M84 Patch</button>
    </div>
  </header>

  <section class="hero" id="demo-hero">
    <div class="container hero-grid">
      <div>
        <span class="pill">Live Sandbox · Press Alt+E</span>
        <h1 id="hero-title">Test every M84 Patch tool on a real interface.</h1>
        <p id="hero-subtitle">Select this headline, apply a Bottom Arc mask on the Hero, reorder cards, or inject live CSS in Code { } — then copy your clean # Visual UI Patch.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" id="hero-cta-primary" onclick="window.__apexuiToggle && window.__apexuiToggle(true)">Launch Editor (Alt+E)</button>
          <a class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.25)" href="#features">Explore Blocks</a>
        </div>
      </div>
      <div class="hero-card" id="hero-metrics-card">
        <strong style="font-size:14px;color:#7dd3fc">Design System Telemetry (Demo)</strong>
        <div class="kpi-grid">
          <div class="kpi"><strong>9</strong><span>:root Tokens detected</span></div>
          <div class="kpi"><strong>0</strong><span>Inline styles in prod</span></div>
          <div class="kpi"><strong>9</strong><span>Responsive % Masks</span></div>
          <div class="kpi"><strong>100%</strong><span>Shadow DOM Isolated</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="features">
    <div class="container">
      <div class="section-head">
        <h2>Product &amp; UX/UI Designer Playground</h2>
        <p>Each card below tests a real scenario: :root tokens, image masks, DOM reordering, zone annotations, and Code { } snippets.</p>
      </div>
      <div class="bento" id="bento-grid">
        <article class="card" id="card-tokens">
          <div class="media m-blue">Try: Circle / Blob Mask</div>
          <h3>:root Tokens &amp; Gradients</h3>
          <p>Click this card and open Fill &amp; Border to test :root color swatches and custom gradient creation.</p>
        </article>
        <article class="card" id="card-shapes">
          <div class="media m-green">Try: Guide / Real Shapes (S)</div>
          <h3>Responsive Shapes &amp; Masks</h3>
          <p>Press S to draw an arrow or Guide frame, or apply a responsive clip-path mask to the media block above.</p>
        </article>
        <article class="card" id="card-code">
          <div class="media m-amber">Try: Code { } &amp; Zone (Z)</div>
          <h3>Live CSS &amp; Zone Notes</h3>
          <p>Drag a Zone (Z) across multiple cards for a grouped note, or test hover CSS inside the Code { } accordion.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="pricing" style="padding-top:12px">
    <div class="container">
      <div class="section-head">
        <h2>DOM Order &amp; Typography Stress Test</h2>
        <p>Select a card and press Alt+← / Alt+→ (or Reverse children on the grid) to reorder blocks live.</p>
      </div>
      <div class="pricing" id="pricing-grid">
        <div class="plan" id="plan-skill">
          <span style="font-size:12px;font-weight:700;color:var(--brand-600)">AI SKILL · CLAUDE / ANTIGRAVITY</span>
          <div class="price">Free · MIT</div>
          <p style="color:var(--text-muted);margin:0">Self-contained &lt;script data-m84-patch&gt; block for standalone HTML artifacts and rapid prototypes.</p>
          <ul class="checklist">
            <li>✓ Works inside sandboxed HTML iframes</li>
            <li>✓ Built-in # Visual UI Patch protocol</li>
            <li>✓ Zero external dependencies</li>
          </ul>
          <button class="btn btn-ghost">Test Secondary Button</button>
        </div>
        <div class="plan featured" id="plan-ext">
          <span style="font-size:12px;font-weight:700;color:var(--accent-500)">CHROME EXTENSION MV3</span>
          <div class="price">Open Source</div>
          <p style="color:var(--text-muted);margin:0">Works on localhost (Next.js, Vite, React) and any live staging or production website in 1 click.</p>
          <ul class="checklist">
            <li>✓ 100% Shadow DOM CSS isolation</li>
            <li>✓ Minimal permissions (activeTab + scripting)</li>
            <li>✓ Interactive Preview (P / hold Space)</li>
          </ul>
          <button class="btn btn-primary">Test Primary CTA</button>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container foot-row">
      <span><strong>M84 Patch</strong> — Interactive Visual Playground (v2.0.0)</span>
      <span>Created by <a href="https://moslih84.com" target="_blank" rel="noopener noreferrer" style="color:var(--brand-600);font-weight:600">Moslih84</a> · MIT License</span>
    </div>
  </footer>

${scriptBlock}
</body>
</html>
`;
}

// Pure Node cross-platform ZIP writer (Windows / macOS / Linux / Vercel CI)
function createZipBuffer(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const raw = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
    const compressed = zlib.deflateRawSync(raw);
    const crc = crc32(raw);

    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(8, 8); // deflate
    lh.writeUInt16LE(0, 10);
    lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(compressed.length, 18);
    lh.writeUInt32LE(raw.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    localParts.push(lh, nameBuf, compressed);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(8, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(compressed.length, 20);
    cd.writeUInt32LE(raw.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    centralParts.push(cd, nameBuf);

    offset += lh.length + nameBuf.length + compressed.length;
  }
  const centralBuf = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralBuf, eocd]);
}

function main() {
  // Clean dist folders to avoid stale artifacts
  if (fs.existsSync(DIST_EXT)) fs.rmSync(DIST_EXT, { recursive: true, force: true });
  if (fs.existsSync(DIST_SKILL)) fs.rmSync(DIST_SKILL, { recursive: true, force: true });
  ensureDir(DIST_EXT);
  ensureDir(path.join(DIST_EXT, 'icons'));
  ensureDir(DIST_SKILL);
  if (GLOBAL_SKILL) ensureDir(GLOBAL_SKILL);
  ensureDir(DEMO_DIR);

  // 1. Build Chrome Extension MV3
  const extCode = bundleModules({ autoOpen: true });
  fs.writeFileSync(path.join(DIST_EXT, 'm84-patch-content.js'), extCode, 'utf8');
  fs.copyFileSync(path.join(ROOT, 'chrome-ext', 'manifest.json'), path.join(DIST_EXT, 'manifest.json'));
  fs.copyFileSync(path.join(ROOT, 'chrome-ext', 'background.js'), path.join(DIST_EXT, 'background.js'));
  [16, 48, 128].forEach(sz => {
    fs.writeFileSync(path.join(DIST_EXT, 'icons', `icon${sz}.png`), createIconPng(sz));
  });

  // 2. Build Standalone HTML Skill + cross-platform .zip
  const htmlCode = bundleModules({ autoOpen: false });
  const scriptBlock = `<script data-m84-patch>\n${htmlCode}</script>\n`;
  const skillMd = fs.readFileSync(path.join(ROOT, 'skill', 'SKILL.md'), 'utf8');
  fs.writeFileSync(path.join(DIST_SKILL, 'm84-patch.html'), scriptBlock, 'utf8');
  fs.writeFileSync(path.join(DIST_SKILL, 'SKILL.md'), skillMd, 'utf8');

  const zipPath = path.join(DIST_SKILL, 'm84-patch-skill.zip');
  const zipBuf = createZipBuffer([
    { name: 'SKILL.md', data: skillMd },
    { name: 'm84-patch.html', data: scriptBlock }
  ]);
  fs.writeFileSync(zipPath, zipBuf);

  // 3. Sync Global Antigravity Skill (local Windows dev machine only)
  if (GLOBAL_SKILL) {
    fs.writeFileSync(path.join(GLOBAL_SKILL, 'SKILL.md'), skillMd, 'utf8');
    fs.writeFileSync(path.join(GLOBAL_SKILL, 'm84-patch.html'), scriptBlock, 'utf8');
  }

  // 4. Build Demo Sandbox (demo/index.html + docs/demo.html for GitHub Pages & Vercel)
  const demoHtml = buildDemoHtml(scriptBlock);
  fs.writeFileSync(path.join(DEMO_DIR, 'index.html'), demoHtml, 'utf8');
  ensureDir(path.join(ROOT, 'docs'));
  fs.writeFileSync(
    path.join(ROOT, 'docs', 'demo.html'),
    demoHtml.replace(/\.\.\/docs\/index\.html/g, './index.html'),
    'utf8'
  );

  console.log(`M84 Patch build OK:`);
  console.log(`  - Chrome Ext MV3 : ${DIST_EXT} (${(extCode.length / 1024).toFixed(1)} KB)`);
  console.log(`  - Skill HTML     : ${path.join(DIST_SKILL, 'm84-patch.html')} (${(scriptBlock.length / 1024).toFixed(1)} KB)`);
  console.log(`  - Skill ZIP      : ${zipPath} (${(zipBuf.length / 1024).toFixed(1)} KB)`);
  if (GLOBAL_SKILL) console.log(`  - Global Skill   : ${GLOBAL_SKILL}`);
  console.log(`  - Demo Sandbox   : ${path.join(DEMO_DIR, 'index.html')}`);
}

main();
