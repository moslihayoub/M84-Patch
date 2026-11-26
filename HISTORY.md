# Historique du projet — M84 Patch

Ce document retrace l'évolution complète de **M84 Patch**, depuis le prototype initial dans Claude.ai jusqu'à sa version open-source v2.0.

---

## Genèse — Prototype initial (v0.1 → v1.0)
- **Contexte** : Création d'une maquette web mobile-first / WCAG 2.1 AA. Besoin exprimé par **Moslih84** de manipuler visuellement une maquette HTML sans écrire des dizaines de prompts descriptifs.
- **v0.1** : Premier `<script data-visual-editor>` minimal (sélection, pins, export markdown).
- **v1.0** : Refonte en éditeur type Figma / Claude Design :
  - Toolbar flottante déplaçable (`V`, `T`, `C`, `Z`), panneau droit arrondi responsive, scrub numérique au clic-glissé (`Maj = ×10`).
  - Lecture automatique des variables CSS `:root` (texte, fond, bordure, ombre).
  - Effets Figma (`+ Ajouter` : Ombre portée paramétrable, Flou calque, Flou arrière-plan, Bruit SVG).
  - Annotations ancrées + sélection par **Zone (`Z`)** avec collage d'images (`Ctrl+V`).
  - Fix initialisation asynchrone `DOMContentLoaded` (`appendChild` sur `body` null) et breakpoints zoom Windows 125 %.

## Itération v1.1 (`ui-visual-editor`)
- Ajout des **accordéons avec icônes**, scrollbar fine et illustration SVG d'état vide.
- **Couleurs groupées** : pastille active mise en évidence, création de couleurs unies ou **dégradés** (fond et texte), persistance `localStorage` protégée par `try/catch`.
- **Réordonnancement DOM** dans Disposition (`Avant / Après`, `Inverser les enfants`, `Alt+Flèches`).
- **Limites identifiées** : monolithe de 50 KB sur 255 lignes minifiées, Undo/Redo incomplet sur actions multi-propriétés, pas d'isolation CSS (conflits sur Tailwind/prod), modules Formes/Masques et Code `{ }` non livrés.

## Refonte Open-Source v2.0 — M84 Patch (2026-11-25 → 2026-11-26)
- **Architecture modulaire** (`src/styles.js`, `src/utils.js`, `src/state.js`, `src/export.js`, `src/panel.js`, `src/app.js`) + `build.mjs` zéro dépendance.
- **Double cible de distribution** :
  - **Extension Chrome Manifest V3** (`dist/chrome-extension/`, permissions minimales `activeTab` + `scripting`, icônes PNG générées) pour `localhost` (Next.js, Vite, React) et sites live/prod.
  - **Skill autonome** (`dist/claude-skill/m84-patch-skill.zip` + sync global `~/.gemini/config/skills/m84-patch/`).
- **Isolation 100 % Shadow DOM** (`#apexui-host`).
- **Core fiabilisé** : Undo/Redo transactionnel (`withTx`), sélecteurs CSS uniques (`getUniqueSelector`), échappement HTML (`esc`), mode **Aperçu (`P` / maintenir `Espace`)**.
- **Nouvelles fonctionnalités v2** :
  - **Formes & Masques (`S`)** : 9 presets `clip-path` responsives en `%` + formes vectorielles dessinées avec bascule **`Guide` / `Réel`**.
  - **Bloc Code `{ }`** : CSS live scopé + spec JS/Animation exportée sans `eval` (conforme MV3 & CSP).
- **Publication Open-Source (MIT)** : Rebranding **M84 Patch**, Playground interactif enrichi (`demo/index.html` & `docs/demo.html`), Landing Page open-source (`docs/index.html`) avec captures réelles étape par étape et crédit **Moslih84**.
