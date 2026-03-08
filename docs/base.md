

# regle de base en vrac

CSS custom properties pour les tokens + styles scoped dans les composants


# Token Css
/**
 * ============================================================
 * QUANT UI — Design Tokens
 * 
 * ============================================================
 *
 * Conventions :
 *   --surface-*   : fonds et couches
 *   --text-*      : couleurs de texte
 *   --color-*     : couleurs sémantiques métier
 *   --border-*    : bordures
 *   --spacing-*   : espacements
 *   --radius-*    : border-radius
 *   --font-*      : typographie
 *   --transition-*: animations
 */

:root,
{

  /* ── PRIMITIVES (ne pas utiliser directement dans les composants) ── */
  --_blue-100: #cae8ff;
  --_blue-300: #79c0ff;
  --_blue-500: #58a6ff;
  --_blue-700: #1f6feb;
  --_green-300: #56d364;
  --_green-500: #3fb950;
  --_green-700: #238636;
  --_red-300:  #ffa198;
  --_red-500:  #f85149;
  --_red-700:  #da3633;
  --_yellow-400: #e3b341;
  --_yellow-500: #d29922;
  --_gray-100: #e6edf3;
  --_gray-300: #b1bac4;
  --_gray-500: #8b949e;
  --_gray-700: #484f58;
  --_gray-800: #30363d;
  --_gray-900: #21262d;
  --_gray-950: #161b22;
  --_gray-1000: #0d1117;

  /* ── SURFACES ── */
  --surface-base:     var(--_gray-1000);  /* fond principal de l'app */
  --surface-raised:   var(--_gray-950);   /* cards, panels, sidebars */
  --surface-overlay:  var(--_gray-900);   /* modals, dropdowns, tooltips */
  --surface-subtle:   var(--_gray-800);   /* hover states, selected rows */
  --surface-inset:    #090d13;            /* inputs, code blocks */

  /* ── TEXTE ── */
  --text-primary:   var(--_gray-100);     /* contenu principal */
  --text-secondary: var(--_gray-500);     /* labels, métadonnées */
  --text-muted:     var(--_gray-700);     /* placeholders, désactivé */
  --text-inverse:   var(--_gray-1000);    /* texte sur fond clair */
  --text-link:      var(--_blue-500);

  /* ── FINANCE — couleurs métier ── */
  --color-profit:   var(--_green-500);    /* PnL positif, long */
  --color-loss:     var(--_red-500);      /* PnL négatif, short */
  --color-neutral:  var(--_gray-500);     /* flat, inchangé */
  --color-signal:   var(--_blue-500);     /* alertes, highlights, CTA */
  --color-warning:  var(--_yellow-500);   /* drawdown, attention */

  /* Backgrounds doux pour badges/chips (sans écraser le texte) */
  --color-profit-bg:  color-mix(in srgb, var(--_green-500) 12%, transparent);
  --color-loss-bg:    color-mix(in srgb, var(--_red-500)   12%, transparent);
  --color-signal-bg:  color-mix(in srgb, var(--_blue-500)  12%, transparent);
  --color-warning-bg: color-mix(in srgb, var(--_yellow-500) 12%, transparent);

  /* ── BORDERS ── */
  --border-subtle:  rgba(255, 255, 255, 0.05);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-strong:  rgba(255, 255, 255, 0.16);
  --border-focus:   var(--_blue-700);

  /* ── SPACING (base 4px) ── */
  --spacing-1:  4px;
  --spacing-2:  8px;
  --spacing-3:  12px;
  --spacing-4:  16px;
  --spacing-6:  24px;
  --spacing-8:  32px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* ── BORDER RADIUS ── */
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-full: 9999px;

  /* ── TYPOGRAPHIE ── */
  --font-sans:    'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  --font-size-xs:   11px;
  --font-size-sm:   12px;
  --font-size-base: 14px;   /* dense par défaut, adapté aux dashboards */
  --font-size-md:   15px;
  --font-size-lg:   16px;
  --font-size-xl:   20px;
  --font-size-2xl:  24px;

  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-tight:  1.2;
  --line-height-normal: 1.5;
  --line-height-loose:  1.75;

  /* ── OMBRES ── */
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.6);
  --shadow-glow-profit:  0 0 12px color-mix(in srgb, var(--_green-500) 30%, transparent);
  --shadow-glow-loss:    0 0 12px color-mix(in srgb, var(--_red-500)   30%, transparent);

  /* ── TRANSITIONS ── */
  --transition-fast:   80ms ease;
  --transition-base:  150ms ease;
  --transition-slow:  300ms ease;

  /* ── Z-INDEX ── */
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-overlay:  200;
  --z-modal:    300;
  --z-toast:    400;
}

Quelques choix importants :
Primitives préfixées --_ — convention pour signaler "usage interne uniquement, ne pas utiliser dans les composants". Les composants n'utilisent que les tokens sémantiques (--color-profit, --surface-raised, etc.).
color-mix() pour les backgrounds de badges — ça génère automatiquement une version transparente de la couleur sans avoir à hardcoder une valeur RGBA. Si tu changes --_green-500, le badge profit se met à jour tout seul.
Font size base à 14px — dashboards denses, c'est le standard Bloomberg/TradingView. 16px c'est pour les sites de contenu.

# Performance composants
Pour des composants ultra-rapides à charger :

Pas de runtime CSS-in-JS — uniquement CSS statique
<style scoped> sur chaque composant — pas de fuite, tree-shakeable
Pas de transitions inutiles — uniquement là où ça apporte de l'info (ex: flash rouge/vert sur update de prix)
defineAsyncComponent pour les composants lourds (charts, modals)



# Base Styles — Reset & Typography

Deux fichiers globaux à importer **une seule fois** dans `main.ts`, après les tokens.

```ts
// main.ts
import './tokens/midnight.css'
import './base/reset.css'
import './base/typography.css'
```

---

## reset.css

Neutralise les incohérences entre navigateurs. Une seule règle de base : tout part de zéro, on reconstruit avec nos tokens.

**Ce qu'il doit couvrir :**

- `box-sizing: border-box` sur tout — évite les surprises de calcul de largeur
- Suppression des `margin` / `padding` par défaut (`body`, `h1-h6`, `p`, `ul`, `ol`, etc.)
- `line-height` normalisé sur `body`
- `img`, `video`, `svg` en `display: block` — évite l'espace fantôme sous les images
- `input`, `button`, `select` héritent de `font-family` — les navigateurs ne le font pas par défaut
- Suppression du style par défaut des listes (`list-style: none`)
- `color-scheme: dark` pour que les scrollbars et UI natives du navigateur s'adaptent

**Ce qu'il ne doit PAS faire :**

- Appliquer des couleurs ou des fonts — c'est le rôle de typography.css
- Être opinionated sur les composants — juste neutraliser

---

## typography.css

Applique les tokens de fonte sur les éléments HTML de base. Tout ce qui est défini ici n'a pas besoin d'être répété dans les composants.

**Ce qu'il doit couvrir :**

- `body` : `font-family`, `font-size`, `color`, `background`, `line-height`
- `h1` → `h6` : tailles avec `--font-size-*`, `font-weight`, `line-height: tight`
- `p` : `line-height: normal`, `color: var(--text-primary)`
- `code`, `pre`, `kbd` : `font-family: var(--font-mono)`, `font-size: var(--font-size-sm)`
- `strong` : `font-weight: var(--font-weight-semibold)`
- `a` : `color: var(--text-link)`, pas de soulignement par défaut
- `small` : `font-size: var(--font-size-sm)`, `color: var(--text-secondary)`
- Selection (`::selection`) : background avec `--color-signal` en transparence

**Priorité pour le quant :**

`code` et `pre` sont critiques — les valeurs numériques, tickers, et résultats de calcul doivent être en `font-mono` avec `font-variant-numeric: tabular-nums` pour que les chiffres s'alignent proprement dans les tableaux et listes.

---

## Ordre d'import final

```
midnight.css       → variables CSS custom properties
reset.css          → neutralisation navigateur
typography.css     → styles HTML de base
components/...     → composants Vue
```

Chaque couche dépend de la précédente. Ne jamais inverser l'ordre.