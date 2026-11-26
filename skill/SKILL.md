---
name: m84-patch
description: Open-source Visual UI Editor (M84 Patch v2, Shadow DOM, by Moslih84) for standalone HTML artifacts and Chrome Extension MV3 (localhost + live sites), plus the protocol to apply exported "# Visual UI Patch" prompts. Use whenever building an HTML mockup to iterate on, when "M84 Patch" or "Edit UI" is mentioned, or when a "# Visual UI Patch" / "# Patch visuel UI" prompt is pasted.
---

# M84 Patch — Visual UI Patcher (v2 · Open Source by Moslih84)

Self-contained visual UI editor (100% **Shadow DOM**, zero external dependencies) letting Product Designers, UX/UI Designers, and Vibecoders visually tweak any web page or HTML artifact and export a clean, LLM-agnostic **`# Visual UI Patch`** (works with ChatGPT/GPT, Claude, Antigravity, Cursor, Windsurf, Copilot, Gemini, etc.).

## 2 Ways to Use

1. **Chrome Extension MV3 (recommended for `localhost`, Next.js, Vite, React & live sites)**
   - Load unpacked folder: `dist/chrome-extension` (after `npm run build`).
   - Open `chrome://extensions` → enable *Developer mode* → *Load unpacked* → select `dist/chrome-extension`.
   - Click the **M84 Patch** icon or press `Alt+E` on any tab. Zero Git pollution.

2. **Standalone HTML Snippet (Claude.ai artifacts / single-file prototypes)**
   - Insert `m84-patch.html` (`<script data-m84-patch>...</script>`) before `</body>`.
   - Declare page colors as CSS custom properties on `:root` (`--brand-600: #0d99ff`…) so they appear automatically as clickable swatches.
   - Omit only when asked for a "final / production / editor-free" build.

## Key Features (v2)

- **Shadow DOM isolation**: never conflicts with Tailwind or host CSS.
- **Draggable toolbar**: Select (`V`), Text (`T`), Pin Note (`C`), Zone (`Z`), Guide/Real Shapes (`S`), Interactive Preview (`P` or hold `Space`), Transactional Undo/Redo (`Ctrl+Z` / `Ctrl+Shift+Z`), Reset, Panel toggle, Patch UI export.
- **Responsive floating panel** (accordions): Layout (including DOM reorder `Alt+Arrows` & Reverse children), Typography, Fill & Border (`:root` tokens + solid/gradient builder), Shapes & Masks (9 responsive `%` `clip-path` presets + drawn shapes with `Guide`/`Real` toggle), Effects (Drop Shadow, Layer Blur, Backdrop Blur, SVG Noise), Code `{ }` (scoped live CSS + zero-eval JS/animation spec), Layer.

## Protocol for Applying a `# Visual UI Patch`

When the user pastes a `# Visual UI Patch` (or `# Patch visuel UI`):
1. **Zero inline `style=""`**: apply every change cleanly in stylesheets, Tailwind classes, or `:root` tokens.
2. **Intent over raw pixels**: translate offsets, sizes, and spacing onto the project's 8px grid, mobile-first layout, and WCAG 2.1 AA contrast rules.
3. **Unify by role**: if typography, color, radius, shadow, or spacing changes on one element, propagate it to all elements sharing that role via tokens or shared classes.
4. **`## DOM Order`**: reorder in HTML/JSX (or CSS `order`/`grid-area` when cleaner responsively) while keeping logical mobile/keyboard reading order.
5. **`## New Colors / Gradients`**: declare each as a `:root` token (text gradient = `background-image` + `background-clip: text` + `color: transparent`) and dark-mode counterpart if present.
6. **`## Shapes & Masks (Guide / Real)`**: implement `Real` masks as responsive `%` `clip-path` / SVG `objectBoundingBox` and treat `Guide` shapes as layout specs.
7. **`## Code { } Snippets`**: integrate CSS with project tokens; for JS/animation specs, always respect `@media (prefers-reduced-motion: reduce)`.
8. **`## Annotations`**: treat every note and attached image as a design/functional change request.
