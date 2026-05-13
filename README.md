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

### Marketing
- `/` — home
- `/employer` — for hiring managers
- `/candidate` — for candidates
- `/signin` — enter the live platform

### Candidate app (after signin as candidate)
- `/app/challenges` — challenge board
- `/app/challenges/:id` — full brief + rubric
- `/app/challenges/:id/submit` — three-part submission form (deliverable, reflection, process trail)
- `/app/submissions/:id` — your AIQ score result with dimension breakdown + feedback
- `/app/me` — your AIQ vault — all challenges, scores, dimension averages

### Admin app (after signin as admin)
- `/admin` — dashboard
- `/admin/post` — paste a JD → AI generates a brief → sign & publish
- `/admin/challenges` — all challenges, filterable
- `/admin/challenges/:id` — submissions counter (live) / unlocked leaderboard (closed) / shortlist
- `/admin/talent-pool` — pre-scored candidates across all past challenges

## Try the full flow (5 minutes)
1. `npm run dev` → http://localhost:5173
2. Click **Enter the platform** → choose **Candidate**
3. Pick a challenge → click **Register & start** → fill the three parts → **Submit & seal**
4. Watch your AIQ score animate in. Visit `/app/me` to see your vault.
5. Sign out → sign back in as **Admin**
6. Open any closed challenge to see the leaderboard + pick a shortlist
7. Or click **+ Post a JD** to run the JD→Challenge generator yourself

All data lives in your browser (`localStorage`). To reset: open DevTools → Application → Local Storage → delete `proof.v1`.

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
