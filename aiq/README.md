# AIQ Lite — Human-AI Intelligence Assessment

A self-contained product measuring human-AI intelligence with the **AJIR framework**
(Agency · Judgment · Impact · Resilience). Three static HTML pages, no build step —
open `index.html` in a browser or host the folder on any static server.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Marketing landing — explains AJIR, the three assessment levels (L1/L2/L3), score decay, and the team offering. |
| `aiq-lite.html` | The assessment itself. Personalises scenarios by sector group × role tier, runs the L1 self-report (and optional L2 micro-challenge), scores against the AJIR rubric, and issues a credential with a shareable code. |
| `aiq-team-dashboard.html` | Employer aggregate view. Ingests individual share codes and renders the five rubric outputs plus a function × sub-dimension heatmap. |

## The AJIR framework

| Construct | Weight | Sub-dimensions |
|---|---|---|
| **A**gency | 35% | A1 Directional Intelligence (20%) · A2 Collaboration Architecture (15%) |
| **J**udgment | 35% | J1 Critical Discernment (20%) · J2 Ethical Calibration (15%) |
| **I**mpact | 15% | I1 Value Attribution (15%) |
| **R**esilience | 15% | R1 Adaptive Velocity (15%) |

Each sub-dimension is scored from four question types — Scenario (×1.2), Behavioural
Anchor (×0.9), Contextual Scenario (×1.2), Forced-Choice calibration (×0.75) — normalised
to 0–100. The overall **AIQ Index** is the weighted composite of the four constructs.
At **L2**, a 10-minute function-specific micro-challenge is blended in 60/40.

Maturity tiers: Passive (0–20) · Exploring (21–40) · Practising (41–60) ·
Proficient (61–80) · Multiplier (81–100). Scores decay intentionally
(L1 90 days · L2 180 days · L3 12 months).

## How scores flow to the dashboard

On the results screen, each respondent gets a base64 **share code** encoding their
scores, sub-dimensions, sector, function, level and expiry. The dashboard ingests them
three ways:

1. **Share link** — the results page links to `aiq-team-dashboard.html?add=<code>`.
2. **Paste** — codes can be pasted (one per line) into the dashboard's input.
3. **Same browser** — assessments completed locally are read from `localStorage` automatically.

All data is stored client-side in `localStorage` (`aiq_dash`, `aiq_all`, `aiq_<team>`).
There is no backend — this is a faithful, fully functional prototype of the product.

### The five team outputs (rubric §6)

1. Average AIQ, benchmarked against the dominant sector's P25 / median / P75 with maturity tier.
2. Tier distribution across the five maturity tiers.
3. **pAIn** — the lowest team sub-dimension and the function it hits hardest.
4. **gAIn** — the highest team sub-dimension, as the foundation to build from.
5. **AInterventions** — the bottom three sub-dimensions mapped to named actions, ranked by gap and targeted to the weakest function.

Plus a function × sub-dimension construct-gap heatmap and a member roster.

Use **Load sample team data** on the dashboard to preview all outputs with an 8-person team.
