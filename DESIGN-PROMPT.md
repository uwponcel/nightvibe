# Night Vibe — Demo Website Build Prompt

> Feed this entire document to Claude to build the demo site.
> Demo built by Nord Studio as a pitch artifact for Night Vibe (Saint-Jérôme barbershop).
> If the client passes, the site doubles as a Nord Studio portfolio demo.

---

## 1. Business Facts (verified June 2026)

- **Name:** Night Vibe (sometimes written Night-Vibe Barbering)
- **Positioning:** "Les vrais Barbiers du Nord" (Instagram bio) · "La science de la lame" (legacy tagline)
- **Address:** 314 rue Saint-Georges, Saint-Jérôme, QC J7Z 5A5
- **Phone:** (450) 432-4774
- **Google rating:** 4,9 ★ — 141 avis
- **Instagram:** @nightvibe · **Facebook:** /boutiquenightvibe
- **Barbers (from legacy site — CONFIRM with client):** 2Saï (maître barbier depuis 2014), Sébastien Tremblay, Kevin Campos, Yan Bonneville
- **In-shop extras:** streetwear/urban clothing corner, grooming products, hip-hop atmosphere
- **Hours (CONFLICTING sources — use these as placeholder, flag for client):**
  - Lun : fermé · Mar–Ven : 10 h – 19 h · Sam : 10 h – 16 h · Dim : fermé
- **Known data gaps:** no public price list, no online booking platform, team roster unverified. Use `XX $` placeholders and a `tel:` CTA for booking.

**Language:** The entire site is in Québec French. No English version needed for the demo. Use proper QC typography: `19 h`, `4,9 ★`, non-breaking space before `$` amounts (`35 $`).

---

## 2. Tech Stack

- Vite + React 19 + TypeScript
- `animejs@^4` (v4 API: `import { animate, createTimeline, stagger, svg } from 'animejs'`)
- Plain CSS with custom properties (design tokens below). No Tailwind.
- Lucide React for icons. **No emoji icons anywhere.**
- Single-page site, anchor navigation. Static — no backend for the demo.
- Placeholder photography: dark moody barbershop shots (Unsplash), all `loading="lazy"` except hero, explicit `width`/`height` or `aspect-ratio` to prevent CLS.

---

## 3. Design Direction

**Style: exaggerated minimalism × cinematic dark.** The brand is literally "Night" — the site lives in near-black. Oversized typography is the hero. One accent color only. Blade-sharp edges: **zero border-radius on every element.** Depth comes from hairline borders and color inversion, never drop shadows.

### Design Tokens

```css
:root {
  /* color */
  --bg-deep: #0A0A0B;        /* page base — never pure #000 */
  --bg-panel: #101012;       /* cards, elevated surfaces */
  --fg: #F2F2F0;             /* off-white text */
  --fg-muted: #8A8F98;       /* secondary text */
  --accent: #E8442E;         /* signal red — CTA + highlights ONLY */
  --hairline: rgba(255,255,255,0.10);
  --seam: rgba(255,255,255,0.18); /* the diagonal "blade seam" motif */

  /* type */
  --font-display: 'Inter', sans-serif;       /* 700–800, tracking -0.04em, uppercase */
  --font-body: 'Inter', sans-serif;          /* 400–500 */
  --font-quote: 'Playfair Display', serif;   /* italic, pull-quotes ONLY */
  --font-mono: 'JetBrains Mono', monospace;  /* prices, hours, labels, uppercase tracking-widest */

  /* scale */
  --type-hero: clamp(3rem, 11vw, 10rem);
  --type-h2: clamp(2rem, 5vw, 3.5rem);
  --space-section: clamp(6rem, 12vh, 10rem);
  --radius: 0;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Accent discipline:** red appears on the primary CTA, the live "ouvert/fermé" dot, hover states, and at most one word per section. Everything else is monochrome.

**The seam motif:** the logo's diagonal interlock line recurs across the site — section dividers are full-bleed 1px diagonal-cut lines (use `clip-path` on a 2px element), service cards get a diagonal seam on hover, the gallery uses one diagonally-clipped feature image. This ties every section back to the intro animation.

**Contrast check:** `--fg` on `--bg-deep` ≈ 17:1. `--fg-muted` on `--bg-deep` ≥ 4.6:1. `--accent` on `--bg-deep` ≥ 4.5:1 — verify, adjust lightness if needed.

---

## 4. Signature Intro — "The Lock & The Reveal"

The N monogram is two interlocking strokes separated by a diagonal seam. The intro exploits this:

**Phase 1 — Lock (0 → 1.4 s)**
1. Solid `--bg-deep` overlay covers the viewport (`position: fixed`, z-index 1000).
2. The logo is an inline SVG rebuilt as **two path groups**: `#n-upper` (top-left stroke) and `#n-lower` (bottom-right stroke).
3. `#n-upper` starts off-screen top-left (`translate(-60vw, -60vh)`), `#n-lower` off-screen bottom-right. Both slide along the seam's diagonal axis toward center — duration 900 ms, easing `outExpo`.
4. **The snap:** on arrival, the assembled mark scales 1.04 → 1.0 in 120 ms and a 1px white flash runs along the seam line (animate a gradient line's opacity 0 → 1 → 0, 180 ms). This is the "click" of the lock.
5. Wordmark `NIGHT VIBE` staggers in under the mark, per-letter `translateY(20px) → 0` + opacity, `stagger(28)`, 500 ms.

**Phase 2 — Reveal (1.4 → 2.6 s)**
6. The overlay is actually **two vertical panels** (left half / right half of the viewport, both `--bg-deep`). The logo halves and wordmark letters are distributed so the seam between panels passes through the logo's own diagonal seam.
7. Both panels slide apart horizontally — left panel `translateX(-100%)`, right `translateX(100%)` — 1000 ms, `outExpo`, with the logo halves traveling on their respective panels. **The same seam that locked the logo now unlocks the site.**
8. Hero content beneath is already rendered (no pop-in). As panels part, hero headline letters stagger up 200 ms into the reveal so motion overlaps.

**Rules**
- Total ≤ 2.8 s. Click/tap/keypress skips instantly to end-state.
- Plays once per session (`sessionStorage.nv_intro_seen`).
- `prefers-reduced-motion: reduce` → replace everything with a 300 ms crossfade.
- Animate `transform`/`opacity` only. `will-change: transform` on panels, removed after.
- The page never blocks: content behind is real DOM, scroll locked only during the 2.8 s.

```ts
// sketch — animejs v4
import { animate, createTimeline, stagger } from 'animejs';

const tl = createTimeline({ defaults: { ease: 'outExpo' } });
tl.add('#n-upper', { x: ['-60vw', 0], y: ['-60vh', 0], duration: 900 })
  .add('#n-lower', { x: ['60vw', 0], y: ['60vh', 0], duration: 900 }, 0)
  .add('#logo-lockup', { scale: [1.04, 1], duration: 120 })
  .add('.seam-flash', { opacity: [0, 1, 0], duration: 180 }, '-=60')
  .add('.wordmark-letter', { y: [20, 0], opacity: [0, 1], delay: stagger(28), duration: 500 }, '-=100')
  .add('.panel-left',  { x: '-100%', duration: 1000 }, '+=250')
  .add('.panel-right', { x: '100%',  duration: 1000 }, '<')
  .add('.hero-line', { y: [40, 0], opacity: [0, 1], delay: stagger(60), duration: 600 }, '-=800');
```

**Logo asset:** vectorize the provided N mark into clean SVG. Two `<g>` groups split along the diagonal seam. White fill on dark. Keep the official proportions exactly — no recoloring beyond white/off-white.

---

## 5. Page Structure (single page, in order)

### 5.1 Nav
Fixed top, transparent over hero → gains `--bg-deep`/95 + blur + bottom hairline after 80 px scroll. Left: small N mark (SVG, 28px). Right: anchor links `Services · Équipe · Le mur · Avis · Infos` + red CTA button `Réserver` (`tel:+14504324774`). Mobile: hamburger → full-screen overlay menu, links stagger in (anime.js, 40 ms), close on anchor click.

### 5.2 Hero
Full viewport (`min-height: 100dvh`). Background: dark barbershop photo, 35% opacity under a `--bg-deep` gradient — type must stay 4.5:1.
- Overline (mono, uppercase, letterspaced): `BARBERSHOP — SAINT-JÉRÔME`
- H1 (display, var(--type-hero), 3 stacked lines): `LES VRAIS / BARBIERS / DU NORD.` — the word `NORD` in `--accent`.
- Sub (body, muted): `La science de la lame. Coupes, barbes et lignes parfaites depuis 2014.`
- CTAs: primary red `Réserver une chaise` (tel link) + ghost `Voir les services` (anchor).
- Trust strip (mono, small): `4,9 ★ — 141 AVIS GOOGLE` + live dot: red pulsing dot + `OUVERT EN CE MOMENT` / gray `FERMÉ — RÉOUVERTURE MAR 10 H` computed from hours table.
- Bottom edge: thin marquee ticker (CSS animation, pausable, hidden under reduced-motion): `COUPE — BARBE À LA LAME — LIGNE-UP — COUPE ENFANT — TAPER — DESIGN —` on loop, separated by small N marks.

### 5.3 Services — `LA SCIENCE DE LA LAME`
Grid of zero-radius cards on `--bg-panel`, 1px hairline borders. Each: service name (display), description line (muted), price right-aligned in mono (`35 $` placeholders, footnote `* prix à confirmer`). Hover: instant invert (white bg, black text, `transition: none`) — the brutalist snap. Services: Coupe classique · Coupe + barbe · Barbe à la lame · Ligne-up / contours · Coupe enfant (12 ans et moins) · Design / gravures. Scroll-reveal: cards `translateY(32px) → 0` + fade, stagger 50 ms, triggered by IntersectionObserver at 20% visibility, once.

### 5.4 Équipe — `LES BARBIERS`
4 cards: photo (b/w filter, `grayscale(1)`, hover → `grayscale(0)` 300 ms), name (display), title (mono, muted): 2Saï — Maître barbier · Sébastien Tremblay · Kevin Campos · Yan Bonneville. Add `IG` icon link per barber (placeholder `#` is forbidden — link the shop IG instead).

### 5.5 Le Mur — gallery
Masonry-ish CSS grid (`grid-template-rows: masonry` fallback: column count), 8–10 placeholder cuts. One oversized image diagonally clipped (seam motif). Caption strip: `@nightvibe — suivez les coupes de la semaine` linking to Instagram.

### 5.6 Avis — `ILS NOUS FONT CONFIANCE`
Dark section. One giant pull-quote at a time (Playfair italic, clamp 1.5–2.5rem), auto-rotating every 6 s with crossfade (pausable on hover, accessible buttons prev/next). 3 paraphrased-from-real reviews (FR):
- « Attention aux détails incroyable. Ils prennent le temps de comprendre exactement ce que tu veux. »
- « Ambiance hip-hop, place propre, coupe parfaite à chaque fois. »
- « Les vrais pros du Nord. Je ne vais plus nulle part ailleurs. »
Below: mono line `4,9 ★ SUR GOOGLE — 141 AVIS VÉRIFIÉS`.

### 5.7 La Boutique
Short split section: left text (`Streetwear et produits coiffants, directement au shop.`), right product/clothing photo. No e-commerce in demo — line `Disponible en boutique — 314 St-Georges`.

### 5.8 Infos — hours, map, contact
Two-column. Left: hours table in mono (rows separated by hairlines, current day highlighted with red dot). Right: static dark-styled map image of 314 rue Saint-Georges (placeholder), address, `tel:` and `mailto:` links, big red CTA `Appelez pour réserver — (450) 432-4774`.

### 5.9 Footer
Hairline top. Small N mark · `NIGHT VIBE — SAINT-JÉRÔME` · social icons (Instagram, Facebook — real URLs) · mono line `© 2026 Night Vibe. Démo conçue par Nord Studio.`

---

## 6. Motion System (global)

- All micro-interactions 150–300 ms; section reveals ≤ 600 ms; easing `--ease-out-expo` enter, `ease-in` exit (exits ~65% of enter duration).
- One reveal pattern site-wide: `opacity 0→1` + `translateY(32px)→0`, stagger 40–60 ms for groups. No competing effects.
- Transforms/opacity only. Never animate width/height/top/left.
- Every animation gated behind `prefers-reduced-motion` check — reduced gets opacity-only 200 ms fades, marquee/pulse static.
- Buttons: scale 0.97 press feedback, 120 ms. Cursor pointer on everything clickable.

## 7. Accessibility & Quality Bar

- Lang `fr-CA`, semantic landmarks, h1→h2→h3 hierarchy, skip-link.
- Focus rings visible (2px `--accent` offset 2px) — never removed.
- Touch targets ≥ 44px. Tel/anchor CTAs real links, not divs.
- Alt text on all photos (FR). Icon-only buttons get `aria-label`.
- Contrast: every text/bg pair ≥ 4.5:1 (verify accent + muted).
- `meta` title: `Night Vibe — Barbiers à Saint-Jérôme | Coupe & barbe à la lame` + description FR + OG image (logo on dark).
- No layout shift: reserve all media space. Lighthouse target ≥ 95 perf/a11y.
- Test at 375px, 768px, 1024px, 1440px. No horizontal scroll anywhere.

## 8. What NOT to Do

- No border-radius. No drop shadows. No emoji. No stock "barber pole" clichés.
- No fake data presented as real: prices marked `à confirmer`, no invented awards.
- No `#` dead links — every link goes somewhere real or is omitted.
- No autoplaying sound, no parallax heavier than 100 ms jank budget.
- Don't recolor or distort the logo. White on dark only.
