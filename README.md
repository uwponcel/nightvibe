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

## Photos & logo

Vraies photos du shop dans `public/photos/`, générées par
`scripts/process-assets.py` (recadrage, redimensionnement, compression) à
partir des originaux. Le logo officiel (`public/logo-white.png`, blanc sur
transparent) est extrait de l'avatar Facebook ; `public/og.png` sert de
favicon et d'image OG.

## Notes

- Intro rejouable en console : `window.__nvIntroReplay()`
- Prix et horaires : placeholders, à confirmer avec le client
- Noms des barbiers : « Nom du barbier » + handle Instagram, à confirmer
  (seul 2Saï est identifié)
