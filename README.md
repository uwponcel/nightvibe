# Night Vibe — Demo

Site démo pour Night Vibe (barbershop, Saint-Jérôme, QC). Conçu par Nord Studio.

## Stack

- Vite + React 19 + TypeScript
- anime.js v4 (intro « Lock & Reveal »)
- CSS custom properties, zéro dépendance UI

## Dev

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de production
npm run start      # sert dist/ (Railway)
```

## Déploiement

Railway (Nixpacks). `railway.json` définit build + start. Le serveur statique
(`serve`) écoute sur `$PORT`.

## Photos

Les photos actuelles sont des placeholders (picsum, niveaux de gris). Pour les
remplacer : déposer les vraies photos dans `public/photos/` et mettre à jour
les chemins dans `src/components/Sections.tsx` (helper `photo()`) et le fond
de héros dans `src/App.css` (`.hero-bg`).

## Notes

- Intro rejouable en console : `window.__nvIntroReplay()`
- Prix et horaires : placeholders, à confirmer avec le client
