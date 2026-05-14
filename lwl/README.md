# LWL Full Agent Network

End-to-end school discovery → paid student funnel. 7 layers, 25 agents, ~$0.07 per school profiled.

```
Sources → Scraping → Enrichment → Intelligence → Routing → Outreach → Conversion
```

Open `diagram.html` in a browser for the visual map. Click any node for owner, cost, file references.

## Stack

| Layer | Tools |
|---|---|
| Sources | IB World, NAIS, Apollo DB (270M), Google Maps, KHDA/COBIS/BSO |
| Scraping | n8n, Apify, Browse AI, Python |
| Enrichment | Clay waterfall (Apollo → LinkedIn → Hunter → Clearbit) |
| Intelligence | Claude API (sonnet-4), LCS scorer 0–100 |
| Registry | Supabase (Anjali — one school, one programme) |
| Routing | 3 tiers (≥70 / 40–69 / <40), Slack alerts |
| Outreach | Apollo sequences, WhatsApp BSP, Bland.ai, Tavus, ManyChat |
| Conversion | Masterclass (Zoom/JotForm), 48hr codes, Stripe + Razorpay, Brevo |

## Quick start

```bash
cd lwl
cp .env.example .env            # fill in API keys
make install                    # python + node deps
make migrate                    # supabase schema
make dev                        # start FastAPI hub on :8000
```

Then in n8n:
1. Import `workflows/n8n/01-ib-schools-scraper.json`
2. Import `workflows/n8n/02-school-intelligence-agent.json`
3. Set credentials (Apollo, Hunter, Claude, Slack, Sheets) in n8n UI
4. Activate workflows

## Pipeline funnel (per cycle)

| Stage | Volume |
|---|---|
| Available schools | 7,000+ |
| Scraped | 1,500 |
| Verified | 800 |
| Tier 1 + Tier 2 | 200 |
| Masterclass registrations | 40 |
| Paid (~1% honest math) | ~3 |
| Goal (5,000 paid students) | × ~500 cycles |

## Module index

| Path | What |
|---|---|
| `workflows/n8n/` | 5 n8n workflow JSONs |
| `scrapers/` | nais_scraper.py + 3 supporting scrapers |
| `enrichment/` | Clay waterfall logic + Apollo/Hunter clients |
| `intelligence/` | Claude research agent + LCS scorer |
| `registry/` | Supabase schema + Anjali dedup bot |
| `routing/` | Tier router + Slack alerts |
| `outreach/` | Apollo, WhatsApp/Bland, Tavus Priya, ManyChat |
| `conversion/` | Masterclass, 48hr codes, Stripe, Razorpay, Brevo |
| `api/` | FastAPI hub that ties it all together |

## Ownership (per the diagram)

- **Nishant** — Apify, n8n workflows, API integrations, Sheets write
- **Ayush** — NAIS East/NE, growth ads
- **Aditya** — NAIS South/Asia/LatAm, growth ads
- **Abhijeet** — Tier 1 SLA (4hr), Apollo sequences, Sheets read
- **Anjali** — Central registry, programme lock, all teams clear with her first
- **Tasia** — Research Fellowship masterclass
- **Dr. JoJo** — Future Doctors FDSP masterclass

## Honest notes

- **Yale Camp is US-only** — Middle East fully excluded. The router enforces this.
- **48hr discount is hard** — no extensions. Urgency IS the mechanic.
- **~1% conversion** is the realistic masterclass → paid number, not 10%.
- **Apollo daily limit**: 50 email reveals/day. Batch carefully.
- **Anjali is the gatekeeper**. Every outreach batch dedupes through her first.
