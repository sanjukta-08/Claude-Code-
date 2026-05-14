# Runbook

## First-time setup

```bash
cd lwl
cp .env.example .env       # fill in keys
make install               # python venv + deps
make migrate               # apply Supabase schema
docker compose up -d n8n   # start n8n on :5678
make dev                   # FastAPI hub on :8000
```

In n8n UI (`http://localhost:5678`):
1. Settings → Import — pick each file from `workflows/n8n/`
2. Add credentials: Slack OAuth, Google Sheets OAuth
3. Set env vars on n8n container (or use `WEBHOOK_URL` from your tunnel)
4. Activate workflows

## Daily ops

| Time | What | Owner |
|---|---|---|
| 06:00 Mon | n8n WF1 IB scraper auto-runs | Nishant |
| 09:00 daily | n8n WF5 Brevo cross-sell cron | auto |
| Continuous | n8n WF2 webhook receives intel requests | auto |
| Continuous | n8n WF3 webhook receives Stripe/Razorpay | auto |
| Continuous | n8n WF4 webhook receives JotForm regs | auto |
| Weekly | `python -m registry.anjali audit-copy lwl/` | Anjali |
| Monthly | Re-score Tier 3 parking: `make score in=parking.csv` | Nishant |

## Single-school intel (manual)

```bash
curl -X POST http://localhost:8000/intel \
  -H "x-internal-secret: $HUB_INTERNAL_SECRET" \
  -H "content-type: application/json" \
  -d '{"school_name":"Dubai International Academy","domain":"dia.ae","country":"UAE"}'
```

Returns 30-field profile + LCS + tier in ~6s.

## Manual masterclass kickoff

```bash
# After Tasia/Dr.JoJo end the Zoom:
curl -X POST http://localhost:8000/masterclass/drop-codes \
  -H "x-internal-secret: $HUB_INTERNAL_SECRET" \
  -d '{"masterclass_date":"2026-05-21","programme":"Research"}'

# 2hrs later, kick Bland.ai for no-shows:
curl -X POST http://localhost:8000/masterclass/bland-recover \
  -H "x-internal-secret: $HUB_INTERNAL_SECRET" \
  -d '{"masterclass_date":"2026-05-21","programme":"Research"}'
```

## Anjali dedup before any outreach batch

```bash
python -m registry.anjali check-batch data/enriched.csv
```

Prints: `Clear to outreach: N · Locked (skipped): M`.

## Emergency: pause everything

```bash
# n8n
curl -X POST http://localhost:5678/rest/workflows/$WF_ID/deactivate

# Pause Apollo sequences
# Set APOLLO_DAILY_REVEAL_LIMIT=0 in env, restart hub
```

## Diagram

```bash
make diagram   # opens lwl/diagram.html locally
```

Or just open `lwl/diagram.html` in any browser.
