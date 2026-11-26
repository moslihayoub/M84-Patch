# M84 Patch — Project Status

> **Dernière mise à jour** : 2026-11-26 11:23 UTC
> **Version** : `2.0.0` (Open Source · Licence MIT)
> **Auteur** : [Moslih84](https://moslih84.vercel.app)
> **Site Live** : https://m84patch.vercel.app · **GitHub** : https://github.com/moslihayoub/M84-Patch
> **Statut** : En ligne sur Vercel + GitHub Open Source + Projet enregistré dans Antigravity (`M84 Patch`)

## Architecture du projet (`standalone_projects/m84-patch`)
- `src/` : Code modulaire (`styles.js`, `utils.js`, `state.js`, `export.js`, `panel.js`, `app.js`), interface isolée dans un **Shadow DOM**.
- `build.mjs` : Compilation zéro-dépendance vers :
  - `dist/chrome-extension/` (Extension Chrome MV3, `activeTab` + `scripting`, icônes PNG 16/48/128, raccourci `Alt+E`).
  - `dist/claude-skill/` (`SKILL.md`, `m84-patch.html`, `m84-patch-skill.zip`).
  - `~/.gemini/config/skills/m84-patch/` (Skill global Antigravity).
  - `demo/index.html` & `docs/demo.html` (Playground interactif Product Designer).
- `docs/` : **Landing Page Open-Source** (`docs/index.html`, prête pour GitHub Pages) + 4 captures réelles (`docs/assets/step-1-open.png` → `step-4-patch.png`).
- Documentation : `README.md`, `HISTORY.md`, `STATUS.md`, `LICENSE` (MIT).

## Changelog
- **2026-11-25** : Création v2.0.0 — Refactoring modulaire + Shadow DOM, Undo/Redo transactionnel, sélecteurs CSS uniques, mode Preview (`P` / `Espace`), Formes & Masques (`Guide`/`Réel` + 9 presets `clip-path` %), Bloc Code `{ }` (CSS live scopé + spec JS sans `eval`), build dual Extension Chrome MV3 + Skill `.zip`.
- **2026-11-26** : Fix build cross-platform (`build.mjs` ZIP pur Node.js sans PowerShell + sync skill conditionnel) pour déploiement Linux/Vercel CI sur `m84patch.vercel.app`.
- **2026-11-26** : Audit sécurité & confidentialité complet — suppression de toute référence projet/client, suppression des chemins locaux Windows, durcissement XSS (validation stricte MIME/DataURL images collées + DOM API sans `insertAdjacentHTML`, validation stricte `localStorage`), ajout CSP/HSTS/Permissions-Policy dans `vercel.json`, purge de l'historique Git (commit unique propre avec email noreply).
- **2026-11-26** : Passage complet de la solution **M84 Patch** en **Anglais** (`src/`, Extension Chrome MV3, Playground, Skill, 4 nouvelles captures) + **Landing Page bilingue EN (`LTR`) / الدارجة المغربية (`RTL`)** avec détection automatique de la langue système (`navigator.languages`) et sélecteur `EN | الدارجة`. Poussé sur GitHub & déployé sur Vercel.
- **2026-11-26** : URL auteur mise à jour vers `https://moslih84.vercel.app`, ajout favicon SVG (`docs/favicon.svg`) + `apple-touch-icon.png` + `theme-color`, enregistrement officiel du projet **M84 Patch** dans Antigravity (`~/.gemini/config/projects/`) et dans le registre global `GEMINI.md`.
