# Scrapers

| File | Owner | Cost | Run |
|---|---|---|---|
| `nais_scraper.py` | Nishant run, Ayush/Aditya manage | free | `python -m scrapers.nais_scraper run --states NY,CA` |
| `ib_scraper.py` | Nishant | ~$0.50/1k via Apify | `python -m scrapers.ib_scraper run --regions UAE,IN` |
| `khda_scraper.py` | Nishant | $49/mo Browse AI | `python -m scrapers.khda_scraper khda` |
| `google_maps_scraper.py` | Nishant | $0.50/1k | `python -m scrapers.google_maps_scraper search "international schools Dubai"` |

All scrapers output CSV into `data/raw/`. Feed into Clay waterfall next:

```bash
python -m enrichment.waterfall --in data/raw/nais.csv --out data/enriched.csv
```
