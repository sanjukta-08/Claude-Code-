# PROOF — Site

The product is the transformation. Paste a JD, watch it become real work under glass.

## Stack
- **React 18** + **Vite**
- **Tailwind CSS** (dark-only)
- **Framer Motion** (all animation)
- **Lenis** (smooth scroll)
- Fonts: **Outfit** (heads) · **Plus Jakarta Sans** (body) · **JetBrains Mono** (data)

## Run
```bash
npm install
npm run dev
```
Open http://localhost:5173.

## Design tokens
| token | value |
|---|---|
| `ink` (bg) | `#0A0E1A` |
| `gold` | `#FFC53D` |
| `bone` | `#E8EAF2` |
| `signal-green` | `#3DDC97` |
| `signal-red` | `#FF6B6B` |
| `signal-blue` | `#5B9CFF` |

## Sections
1. **Nav** — sticky, blurred-on-scroll, live challenge counter
2. **Hero** — operating-theatre JD → analyzing → challenge brief, ends in a SIGNED · SEALED stamp
3. **Problem** — count-up stats, Naval quote
4. **Mechanism** — Paste · Transform · Ship
5. **AIQ Score** — five dimensions with hover-reveal verified rubric
6. **Live Proof** — live counters + cert feed
7. **Dual CTA** — magnetic opposing poles (Hiring / Shipping)
8. **Footer** — system-operational status

## Interactions
- **Hero replay** — `↻ REPLAY` button in observation status bar
- **AIQ dimensions** — hover to reveal rubric
- **CTAs** — magnetic on cursor, repel each other on hover
- **Buttons** — `✓ SIGNED · TS` tooltip appears on hover

## File map
```
src/
  App.jsx
  main.jsx
  index.css
  lib/
    useLenis.js
    useTypewriter.js
    useCountUp.js        (+ useLiveTicker)
    useMagnetic.js
  components/
    Nav.jsx
    Hero.jsx
    Problem.jsx
    Mechanism.jsx
    AIQScore.jsx
    LiveProof.jsx
    DualCTA.jsx
    Footer.jsx
```
