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

## Routes
- `/` — home (full marketing site)
- `/employer` — deep-link page for hiring managers
- `/candidate` — deep-link page for candidates

## Home sections
1. **Nav** — sticky, blurred-on-scroll, live challenge counter, router links
2. **Hero** — operating-theatre JD → analyzing → challenge brief. Cycles through 4 role pairs (PM, ENG, DSG, OPS). Replay any time. Pair indicator pills.
3. **Problem** — count-up stats, Naval quote
4. **Mechanism** — Paste · Transform · Ship
5. **Pipeline** — Linear-style scroll-pinned storytelling: 320vh sticky section that progresses JD → Analyze → Brief → Score as you scroll. Connector lines fill, score counts up to 742, SEALED stamp lands.
6. **AIQ Score** — five dimensions with hover-reveal verified rubric
7. **Live Proof** — live counters + cert feed
8. **Dual CTA** — magnetic opposing poles deep-linking to /employer and /candidate
9. **Footer** — system-operational status

## Page sections
**`/employer`** — Hero with parsed JD console · 3-step flow · time-saved stats · pricing tiers · closing CTA
**`/candidate`** — Hero with AIQ profile sample · 3-step flow · ownership stats · live open challenges · closing CTA

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
