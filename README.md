# Barbier Boréal — Démo

Site démo (barbershop fictif, Laurentides) conçu par Nord Studio. Publié comme
démo cliquable sur `nordstudio.io/demos/barbier-boreal/`. Aucune donnée réelle :
marque, équipe, adresse, téléphone et photos sont fictifs ou sous licence libre.

## Stack

- Vite + React 19 + TypeScript
- anime.js v4 (intro « Lock & Reveal »)
- CSS custom properties, zéro dépendance UI

## Dev

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de production
npm run preview    # sert dist/ localement
```

`vite.config.ts` fixe `base: '/demos/barbier-boreal/'` : le build est servi
depuis ce sous-chemin sur nordstudio.io. Pour un déploiement autonome à la
racine, repasser `base` à `/`.

## Publication de la démo

Après un `npm run build`, copier le contenu de `dist/` (sauf logos PNG
inutilisés) vers `nordstudio/public/demos/barbier-boreal/`. La pastille
« Démo · Nord Studio » et les balises SEO sont injectées côté nordstudio via
les marqueurs `<!-- @demo-footer -->` / `<!-- @demo-meta ... -->`.

## Photos

Photos de barbershop sous licence libre (Unsplash) dans `public/photos/`,
résolues via `import.meta.env.BASE_URL` (voir `photo()` dans `src/data.ts`).
Le logo est un glyphe SVG inline (`src/components/LogoMark.tsx`) ; le favicon
est un data-URI SVG dans `index.html`.

## Notes

- Intro rejouable : effacer `sessionStorage.nv_intro_seen` puis recharger.
- Prix et horaires : valeurs de démonstration.
