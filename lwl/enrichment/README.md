# Enrichment — Clay Waterfall

```
Apollo (org + people) → LinkedIn verify → Hunter domain search → Clearbit fallback
```

First non-null email wins. `source` column tracks the hit.

| File | What |
|---|---|
| `apollo_client.py` | Org enrich + people search + add-to-sequence. Respects `APOLLO_DAILY_REVEAL_LIMIT` (50/day) |
| `hunter_client.py` | Domain search + email verify |
| `clearbit_client.py` | Org size + revenue fallback |
| `waterfall.py` | The orchestrator. `python -m enrichment.waterfall --in raw.csv --out enriched.csv` |
| `clay_template.csv` | Header-only template matching Clay 5-region tabs spec |

## Cost

| Tool | Cost |
|---|---|
| Apollo | included in plan, 50 reveals/day cap |
| Hunter | $49/mo Starter |
| Clearbit | $99/mo or pay-as-you-go |
| Clay | $149–$800/mo depending on credits |
