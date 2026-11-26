---
name: m84-patch
description: Éditeur visuel UI open-source (M84 Patch v2, Shadow DOM, créé par Moslih84) pour artefacts HTML et extension Chrome MV3 (localhost + prod), et protocole d'application du "# Patch visuel UI" exporté. Utiliser dès qu'on construit une maquette HTML à itérer, qu'on mentionne "M84 Patch", "M84 Patch", "mode édition", "Edit UI", ou qu'on colle un "# Patch visuel UI".
---

# M84 Patch — Visual UI Patcher (v2 · Open Source by Moslih84)

Outil visuel autonome (isolé en **Shadow DOM**, zéro dépendance externe) permettant de sélectionner, déplacer, redimensionner, masquer, annoter et styliser visuellement n'importe quelle page web ou artefact HTML, puis d'exporter un **`# Patch visuel UI`** agnostique (compatible Claude, Antigravity, Cursor, ChatGPT).

## 2 modes d'utilisation

1. **Extension Chrome MV3 (recommandé pour `localhost`, Next.js, Vite et sites live/prod)**
   - Dossier prêt à charger : `dist/chrome-extension` (après `npm run build`)
   - Dans Chrome : `chrome://extensions` → activer *Mode développeur* → *Charger l'extension non empaquetée* → sélectionner `dist/chrome-extension`.
   - Clic sur l'icône **M84 Patch** ou `Alt+E` sur n'importe quel onglet (`localhost` ou prod). Zéro pollution dans le repo Git.

2. **Snippet HTML autonome (artefacts Claude.ai / prototypes mono-fichier)**
   - Insérer le contenu de `m84-patch.html` (`<script data-m84-patch>...</script>`) avant `</body>`.
   - Déclarer les couleurs de la page comme variables CSS sur `:root` (`--brand-900: #0B3D2A`…) pour qu'elles apparaissent automatiquement en pastilles.
   - Omettre uniquement sur demande explicite (*"version finale / prod / sans éditeur"*).

## Fonctions incluses (v2)

- **Isolation Shadow DOM** : les styles de la page (Tailwind, CSS global) ne cassent jamais l'éditeur.
- **Toolbar déplaçable** : Sélection (`V`), Texte (`T`), Annotation (`C`), Zone (`Z`), Formes Guide/Réel (`S`), Aperçu interactif (`P` ou maintenir `Espace`), Undo/Redo transactionnel (`Ctrl+Z` / `Ctrl+Maj+Z`), Reset, Panneau, Patch UI.
- **Panneau flottant responsive** (accordéons) :
  - **Disposition** : largeur, hauteur, padding, marge, gap, échelle `%`, proportions verrouillées, ordre DOM (`Avant / Après`, `Inverser`, `Alt+Flèches`).
  - **Typographie** : police, styles `H1`–`Légende`, taille, interligne, lettres, graisse, alignement, couleur/dégradé.
  - **Fond & bordure** : couleurs `:root`, transparent, création de tokens unis ou dégradés (`localStorage` protégé), rayon (`0`/`8`/`Full`/`50%`), bordure.
  - **Formes & masques** : presets `clip-path` responsives en `%` (bas de section : Arc, Diagonale, Chevron ; médias : Cercle, Pilule, Hexagone, Losange, Biseau, Blob) + formes dessinées (`Cadre`, `Flèche`, `Ligne`, `Ellipse`) avec bascule **`Guide` / `Réel`**.
  - **Effets** : ombre portée paramétrable + swatches `:root`, flou du calque, flou d'arrière-plan, bruit SVG.
  - **Code `{ }`** : CSS live scopé à l'élément + spec JS / Animation exportée (sans `eval`, 100 % compatible CSP / MV3).
  - **Calque** : opacité, masquer/afficher.

## Protocole d'application d'un `# Patch visuel UI`

Quand l'utilisateur colle un `# Patch visuel UI` :
1. **Zéro `style=""` inline** : traduire chaque changement dans la feuille de style, les classes Tailwind ou les tokens `:root` du projet.
2. **Intention > pixels bruts** : les déplacements, dimensions et espacements sont des repères visuels à traduire sur la grille du projet (grille 8 px, responsive mobile-first, WCAG 2.1 AA).
3. **Unification par rôle** : si une typo, couleur, ombre, rayon ou espacement change sur un élément, l'étendre à tous les éléments de même rôle via le token ou composant partagé.
4. **`## Ordre des éléments`** : réordonner dans le markup HTML/JSX (ou via `order` / `grid-area` si pertinent en responsive) en préservant l'ordre de lecture clavier/mobile.
5. **`## Nouvelles couleurs / dégradés`** : déclarer chaque entrée comme token dans `:root` (dégradé texte = `background-image` + `background-clip: text` + `color: transparent`) et son équivalent dark mode si présent.
6. **`## Formes & masques (Guide / Réel)`** : implémenter les masques `Réel` en `clip-path` responsives (`%` / SVG `objectBoundingBox`) et traiter les formes `Guide` comme des spécifications visuelles de mise en page.
7. **`## Snippets Code { }`** : intégrer le CSS dans les feuilles du projet avec les tokens existants ; pour les specs JS/animation, respecter impérativement `@media (prefers-reduced-motion: reduce)`.
8. **`## Annotations`** : traiter chaque annotation et image jointe comme une demande de modification fonctionnelle ou visuelle.

## Prompt prêt à coller (autre projet / Claude.ai)

> Ajoute à cet artefact HTML l'éditeur visuel `M84 Patch` : insère le bloc `<script data-m84-patch>` fourni avant `</body>`, déclare toutes les couleurs de la page en variables CSS sur `:root`, et garde le reste inchangé. Quand je colle un `# Patch visuel UI`, applique-le dans le CSS et les tokens (jamais d'inline), respecte le design system, unifie les styles de même rôle, puis republie.
